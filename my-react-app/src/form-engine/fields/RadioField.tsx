import type { FieldComponentProps } from "@form-engine/types";

const RadioField = ({ field, register }: FieldComponentProps) => (
  <div>
    <p className="mb-3 text-sm font-medium text-white">{field.label}</p>

    {field.options?.map((o) => (
      <label
        key={o.value}
        className="flex gap-3 items-center mb-2 cursor-pointer"
      >
        <input
          type="radio"
          value={o.value}
          {...register(field.name as never)}
          className="w-4 h-4 bg-slate-700 border border-slate-600 accent-purple-500 focus:ring-2 focus:ring-purple-500"
        />
        <span className="text-white">{o.label}</span>
      </label>
    ))}
  </div>
);

export default RadioField;
