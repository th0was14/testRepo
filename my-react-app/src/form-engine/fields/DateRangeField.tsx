import { Controller } from 'react-hook-form';
import type { FieldComponentProps } from '@form-engine/types';

const DateRangeField = ({ field, control, error }: FieldComponentProps) => (
    <Controller
        name={field.name}
        control={control}
        rules={field.validation}
        defaultValue={{ from: '', to: '' }}
        render={({ field: fieldProps }) => {
            const value = fieldProps.value || { from: '', to: '' };

            return (
                <div className="space-y-2">
                    {field.label && (
                        <label className="block text-sm font-medium text-white">
                            {field.label}
                            {field.validation?.required && <span className="text-red-400 ml-1">*</span>}
                        </label>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <input
                                type="date"
                                value={value.from}
                                onChange={(e) => fieldProps.onChange({ ...value, from: e.target.value })}
                                className={`w-full px-3 py-2 bg-slate-700 border rounded text-white focus:outline-none focus:ring-1 transition ${
                                    error
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                        : 'border-slate-600 focus:border-purple-500 focus:ring-purple-500'
                                }`}
                            />
                            <p className="text-xs text-slate-400 mt-1">From</p>
                        </div>

                        <div>
                            <input
                                type="date"
                                value={value.to}
                                onChange={(e) => fieldProps.onChange({ ...value, to: e.target.value })}
                                className={`w-full px-3 py-2 bg-slate-700 border rounded text-white focus:outline-none focus:ring-1 transition ${
                                    error
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                        : 'border-slate-600 focus:border-purple-500 focus:ring-purple-500'
                                }`}
                            />
                            <p className="text-xs text-slate-400 mt-1">To</p>
                        </div>
                    </div>

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

export default DateRangeField;
