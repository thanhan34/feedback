"use client";

import React from 'react';

interface TextAreaProps {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  error?: string;
  rows?: number;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  rows = 4,
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
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={`w-full px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-[#fc5d01] focus:border-[#fc5d01]`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextArea;
