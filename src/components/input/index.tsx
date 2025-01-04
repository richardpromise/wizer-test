import React from "react";

interface Props {
  label: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<Props> = ({
  label,
  placeholder,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={label}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={label}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:border-b-4 focus:border-b-purple-500 focus:outline-none bg-gray-50 text-gray-900"
      />
    </div>
  );
};

export default InputField;
