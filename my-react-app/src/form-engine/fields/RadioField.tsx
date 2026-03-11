import { Controller } from 'react-hook-form';
import type { FieldComponentProps } from '@form-engine/types';

const RadioField = ({ field, control, error }: FieldComponentProps) => (
    <Controller
        name={field.name}
        control={control}
        rules={field.validation}
        defaultValue=""
        render={({ field: fieldProps }) => (
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{field.label}</p>
                    {field.validation?.required && <span className="text-red-400">*</span>}
                </div>

                <div className="space-y-2">
                    {field.options?.map((o) => (
                        <label key={o.value} className="flex gap-3 items-center cursor-pointer hover:opacity-80 transition">
                            <input
                                type="radio"
                                value={o.value}
                                checked={fieldProps.value === o.value}
                                onChange={(e) => fieldProps.onChange(e.target.value)}
                                className="w-4 h-4 bg-slate-700 border border-slate-600 accent-purple-500 focus:ring-2 focus:ring-purple-500"
                            />
                            <span className="text-white text-sm">{o.label}</span>
                        </label>
                    ))}
                </div>

                {error && (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                        <span>⚠</span>
                        {error.message}
                    </p>
                )}
            </div>
        )}
    />
);

export default RadioField;
