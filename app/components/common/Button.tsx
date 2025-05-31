"use client";

import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  children,
}) => {
  const baseClasses = 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[#fc5d01] text-white hover:bg-[#fd7f33] focus:ring-[#fc5d01]',
    secondary: 'bg-[#ffac7b] text-white hover:bg-[#fdbc94] focus:ring-[#ffac7b]',
    outline: 'bg-transparent text-[#fc5d01] border border-[#fc5d01] hover:bg-[#fedac2] focus:ring-[#fc5d01]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
