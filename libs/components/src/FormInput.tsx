import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  type?: string;
  placeholder?: string;
  step?: string;
  min?: string | number;
  rows?: number;
  className?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  step,
  min,
  rows,
  className = "",
}: FormInputProps<T>) {
  const isTextarea = type === "textarea";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={className}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          {isTextarea ? (
            <textarea
              {...field}
              rows={rows}
              placeholder={placeholder}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
          ) : (
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              step={step}
              min={min}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
          {error && (
            <p className="mt-1 text-sm text-red-600">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
