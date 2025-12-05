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

export function MyAppFormInput<T extends FieldValues>({
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
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => {
        const handleChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          const newValue = e.target.value;
          if (type === "number") {
            onChange(newValue === "" ? undefined : Number(newValue));
          } else {
            onChange(newValue);
          }
        };

        return (
          <div className={className}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {label}
            </label>
            {isTextarea ? (
              <textarea
                {...field}
                value={value ?? ""}
                onChange={handleChange}
                rows={rows}
                placeholder={placeholder}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-text resize-none ${
                  error
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
              />
            ) : (
              <input
                {...field}
                type={type}
                value={value ?? ""}
                onChange={handleChange}
                placeholder={placeholder}
                step={step}
                min={min}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-text ${
                  error
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
              />
            )}
            {error && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
