import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "right",
  fullWidth = false,
  disabled = false,
  ...props
}) => {
  const buttonClass = clsx(
    "flex items-center justify-center gap-2 font-medium rounded-lg focus:outline-none transition",
    {
      "bg-[#8158F3] text-white hover:bg-[#9B7AF5]":
        variant === "primary" && !disabled,
      "bg-white border border-gray-300 text-gray-900 hover:bg-gray-100":
        variant === "secondary" && !disabled,
      "bg-gray-400 text-white cursor-not-allowed opacity-100": disabled,
      "p-[8px_16px] text-sm": size === "small",
      "p-[10px_18px] text-base": size === "medium",
      "px-6 py-3 text-lg": size === "large",
      "w-full": fullWidth,
      "flex-row": iconPosition === "left",
      "flex-row-reverse": iconPosition === "right",
    }
  );
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={buttonClass}
      disabled={disabled}
      {...props}
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
