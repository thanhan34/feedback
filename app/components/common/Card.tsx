"use client";

import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'glass' | 'gradient';
  animate?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  className = '', 
  icon, 
  variant = 'default',
  animate = false
}) => {
  const baseClasses = "rounded-xl overflow-hidden transition-all duration-300";
  
  const variantClasses = {
    default: "bg-white shadow-md hover:shadow-lg",
    glass: "glass-effect shadow-lg hover:shadow-xl",
    gradient: "bg-gradient-to-r from-[#fedac2] to-[#fdbc94] shadow-lg hover:shadow-xl"
  };
  
  const animationClass = animate ? "animate-scaleIn" : "";
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${animationClass} ${className} card-hover`}>
      {title && (
        <div className={`px-6 py-4 ${variant === 'gradient' ? 'bg-white/30' : 'bg-[#fedac2]'} border-b ${variant === 'gradient' ? 'border-white/20' : 'border-[#fdbc94]'} flex items-center`}>
          {icon && <div className="mr-3">{icon}</div>}
          <h3 className={`text-xl font-bold ${variant === 'gradient' ? 'text-white' : 'gradient-text'}`}>{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;
