import type { FieldComponentProps } from "@form-engine/types";

const SelectField = ({ field, register }: FieldComponentProps) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-white">
      {field.label}
    </label>

    <select
      {...register(field.name as never)}
      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
    >
      <option value="" className="bg-slate-700">
        Select
      </option>

      {field.options?.map((o) => (
        <option key={o.value} value={o.value} className="bg-slate-700">
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
