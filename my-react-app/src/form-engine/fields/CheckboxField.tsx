import type { FieldComponentProps } from "@form-engine/types";

const CheckboxField = ({ field, register }: FieldComponentProps) => (
  <label className="flex gap-3 items-center cursor-pointer">
    <input
      type="checkbox"
      {...register(field.name as never)}
      className="w-4 h-4 bg-slate-700 border border-slate-600 rounded accent-purple-500 focus:ring-2 focus:ring-purple-500"
    />
    <span className="text-white">{field.label}</span>
  </label>
);

export default CheckboxField;
