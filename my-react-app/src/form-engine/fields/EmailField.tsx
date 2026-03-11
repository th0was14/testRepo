import { Controller } from 'react-hook-form';
import type { FieldComponentProps } from '@form-engine/types';

const EmailField = ({ field, control, error }: FieldComponentProps) => (
    <Controller
        name={field.name}
        control={control}
        rules={{
            ...field.validation,
            pattern: field.validation?.pattern || {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
            },
        }}
        defaultValue=""
        render={({ field: fieldProps }) => (
            <div className="space-y-2">
                {field.label && (
                    <label className="block text-sm font-medium text-white">
                        {field.label}
                        {field.validation?.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                )}

                <input
                    {...fieldProps}
                    type="email"
                    placeholder={field.placeholder || 'exemple@mail.com'}
                    className={`w-full px-3 py-2 bg-slate-700 border rounded text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition ${
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

export default EmailField;
