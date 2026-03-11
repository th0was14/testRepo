import { fieldRegistry } from '@form-engine/registry/fieldRegistry';
import type { FieldComponentProps } from '@form-engine/types';

export default function FieldRenderer({ field, control, error }: FieldComponentProps) {
    const Component = fieldRegistry[field.type] as any;

    if (!Component) {
        return <div className="text-red-500">Unsupported field: {field.type}</div>;
    }

    return <Component field={field} control={control} error={error} />;
}
