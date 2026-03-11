import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildSchema } from '@form-engine/buildSchema';
import FieldRenderer from '@form-engine/FieldRenderer';
import type { FormConfig, FieldConfig } from '@form-engine/types';
import { useApiMutation } from '@/hooks/useApi';

interface FormEngineProps {
    config: FormConfig;
}

export default function FormEngine({ config }: FormEngineProps) {
    const schema = buildSchema(config);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: zodResolver(schema),
    });

    const values = watch();

    const { mutate, isPending, error, isSuccess } = useApiMutation<unknown, FieldValues>(async (data) => {
        const response = await fetch(config.endpoint, {
            method: config.method || 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    });

    const isVisible = (field: FieldConfig): boolean => {
        if (!field.visibleWhen) return true;

        const visibleWhen = field.visibleWhen as { field: string; equals: unknown } | { all: Array<{ field: string; equals: unknown }> };

        if ('all' in visibleWhen) {
            // Handle { all: [{field, equals}, ...] }
            return visibleWhen.all.every((condition) => values[condition.field] === condition.equals);
        }

        // Handle { field, equals }
        const depValue = values[visibleWhen.field];
        return depValue === visibleWhen.equals;
    };

    const onSubmit = (data: FieldValues) => {
        mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {config.sections.map((section) => (
                <div key={section.title}>
                    <h2 className="text-lg font-bold mb-4 text-white">{section.title}</h2>

                    <div className={`grid grid-cols-${section.grid || 1} gap-4`}>
                        {section.fields.map((field) => {
                            if (!isVisible(field)) return null;

                            const error = errors[field.name];

                            return <FieldRenderer key={field.name} field={field} control={control} error={error} />;
                        })}
                    </div>
                </div>
            ))}

            {error && <div className="p-4 bg-red-500/10 border border-red-500 rounded text-red-400">{error.message}</div>}

            {isSuccess && <div className="p-4 bg-green-500/10 border border-green-500 rounded text-green-400">Form submitted successfully!</div>}

            <button
                type="submit"
                disabled={isPending}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                {isPending ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
}
