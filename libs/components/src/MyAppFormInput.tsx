import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
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
            <label className="block text-sm font-bold text-gray-800 mb-3">
              {label}
            </label>
            {isTextarea ? (
              <textarea
                {...field}
                value={value ?? ""}
                onChange={handleChange}
                rows={rows}
                placeholder={placeholder}
                className={`h-auto w-full px-5 py-5 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 cursor-text resize-none bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-400 ${
                  error
                    ? "border-red-400 focus:ring-red-100 focus:border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
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
                className={` w-full px-5 py-2 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 cursor-text bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-400  ${
                  error
                    ? "border-red-400 focus:ring-red-100 focus:border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
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
