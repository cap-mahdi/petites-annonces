import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface FormCheckboxProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
}

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  label,
}: FormCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field } }) => (
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            {...field}
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </label>
      )}
    />
  );
}
