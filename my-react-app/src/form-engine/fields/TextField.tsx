import type { FieldComponentProps } from "@form-engine/types";

const TextField = ({ field, register, error }: FieldComponentProps) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-white">
      {field.label}
    </label>

    <input
      type={field.type || "text"}
      {...register(field.name as never)}
      placeholder={field.placeholder}
      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
    />

    {error && <p className="mt-1 text-sm text-red-400">{error.message}</p>}
  </div>
);

export default TextField;
