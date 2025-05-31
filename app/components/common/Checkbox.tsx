"use client";

import React from 'react';

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-[#fc5d01] focus:ring-[#fc5d01] border-gray-300 rounded"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
