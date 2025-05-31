"use client";

import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  name: string;
  label?: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  required = false,
  error,
  placeholder,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-[#fc5d01] ml-1">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-[#fc5d01] focus:border-[#fc5d01] bg-white`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
