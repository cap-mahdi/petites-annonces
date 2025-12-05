import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface FormCheckboxProps<T extends FieldValues> {
  name: FieldPath<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
}

export function MyAppFormCheckbox<T extends FieldValues>({
  name,
  control,
  label,
}: FormCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field } }) => (
        <label className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <input
            {...field}
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
          />
          <span className="text-sm font-semibold text-gray-700 select-none">
            {label}
          </span>
        </label>
      )}
    />
  );
}
