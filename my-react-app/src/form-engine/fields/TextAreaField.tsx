import { Controller } from 'react-hook-form';
import type { FieldComponentProps } from '@form-engine/types';

const TextAreaField = ({ field, control, error }: FieldComponentProps) => (
    <Controller
        name={field.name}
        control={control}
        rules={field.validation}
        defaultValue=""
        render={({ field: fieldProps }) => (
            <div className="space-y-2">
                {field.label && (
                    <label className="block text-sm font-medium text-white">
                        {field.label}
                        {field.validation?.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                )}

                <textarea
                    {...fieldProps}
                    placeholder={field.placeholder}
                    rows={field.rows || 4}
                    className={`w-full px-3 py-2 bg-slate-700 border rounded text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition resize-vertical ${
                        error
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-slate-600 focus:border-purple-500 focus:ring-purple-500'
                    }`}
                />

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

export default TextAreaField;
