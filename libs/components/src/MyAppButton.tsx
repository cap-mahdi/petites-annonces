import React from "react";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "link";
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const MyAppButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  children,
}) => {
  const baseStyles =
    "px-8 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:active:scale-100";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 cursor-pointer hover:scale-105",
    secondary:
      "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 cursor-pointer hover:scale-105",
    danger:
      "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 cursor-pointer hover:scale-105",
    link: "bg-transparent shadow-none hover:shadow-none px-0 py-0 hover:scale-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variant !== "link" ? baseStyles : ""} ${
        variantStyles[variant]
      } ${className}`}
    >
      {children || label}
    </button>
  );
};
