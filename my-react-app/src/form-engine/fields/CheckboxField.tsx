import { Controller } from 'react-hook-form';
import type { FieldComponentProps } from '@form-engine/types';

const CheckboxField = ({ field, control, error }: FieldComponentProps) => (
    <Controller
        name={field.name}
        control={control}
        rules={field.validation}
        defaultValue={false}
        render={({ field: fieldProps }) => (
            <div className="space-y-2">
                <label className="flex gap-3 items-center cursor-pointer hover:opacity-80 transition">
                    <input
                        type="checkbox"
                        checked={fieldProps.value === true}
                        onChange={(e) => fieldProps.onChange(e.target.checked)}
                        className="w-4 h-4 bg-slate-700 border border-slate-600 rounded accent-purple-500 focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-white text-sm">{field.label}</span>
                </label>

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

export default CheckboxField;
