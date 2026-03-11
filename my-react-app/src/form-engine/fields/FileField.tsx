import { Controller } from 'react-hook-form';
import type { FieldComponentProps } from '@form-engine/types';

const FileField = ({ field, control, error }: FieldComponentProps) => (
    <Controller
        name={field.name}
        control={control}
        rules={field.validation}
        defaultValue={null}
        render={({ field: fieldProps }) => {
            const accept = (field as any).accept || '*';
            const maxSize = (field as any).maxSize; // in bytes

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file && maxSize && file.size > maxSize) {
                    // Validation error will be caught by the form validation
                    return;
                }
                fieldProps.onChange(file || null);
            };

            return (
                <div className="space-y-2">
                    {field.label && (
                        <label className="block text-sm font-medium text-white">
                            {field.label}
                            {field.validation?.required && <span className="text-red-400 ml-1">*</span>}
                        </label>
                    )}

                    <div className="relative">
                        <input
                            type="file"
                            onChange={handleChange}
                            accept={accept}
                            className={`w-full px-3 py-2 bg-slate-700 border rounded text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:outline-none focus:ring-1 transition cursor-pointer ${
                                error
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                    : 'border-slate-600 focus:border-purple-500 focus:ring-purple-500'
                            }`}
                        />
                    </div>

                    {fieldProps.value && <p className="text-xs text-slate-400">Selected: {(fieldProps.value as File).name}</p>}

                    {maxSize && <p className="text-xs text-slate-400">Max size: {(maxSize / 1024 / 1024).toFixed(2)} MB</p>}

                    {error && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                            <span>⚠</span>
                            {error.message}
                        </p>
                    )}
                </div>
            );
        }}
    />
);

export default FileField;
