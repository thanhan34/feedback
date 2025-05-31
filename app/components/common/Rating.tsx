"use client";

import React, { useState, useEffect } from 'react';

interface RatingProps {
  id: string;
  name: string;
  label?: string;
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
  error?: string;
  className?: string;
  reasonRequired?: boolean;
  reason?: string;
  onReasonChange?: (reason: string) => void;
  reasonError?: string;
  animate?: boolean;
}

const Rating: React.FC<RatingProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  error,
  className = '',
  reasonRequired = true,
  reason = '',
  onReasonChange,
  reasonError,
  animate = true,
}) => {
  const stars = [1, 2, 3, 4, 5];
  const [showReasonField, setShowReasonField] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  
  // Star descriptions for tooltip
  const starDescriptions = [
    '',
    'Không hài lòng',
    'Tạm được',
    'Tốt',
    'Rất tốt',
    'Xuất sắc'
  ];
  
  // Update showReasonField when value changes
  useEffect(() => {
    if (reasonRequired) {
      setShowReasonField(value > 0 && value < 5);
    }
  }, [value, reasonRequired]);

  return (
    <div className={`mb-6 ${className} ${animate ? 'animate-fadeIn' : ''}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-base font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-[#fc5d01] ml-1">*</span>}
        </label>
      )}
      <div className="flex items-center mb-1 relative">
        <div className="flex space-x-1">
          {stars.map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="focus:outline-none rating-star group relative"
              aria-label={`Rate ${star} out of 5`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={star <= (hoveredStar || value) ? '#fc5d01' : 'none'}
                stroke={star <= (hoveredStar || value) ? 'none' : '#d1d5db'}
                className="w-10 h-10 cursor-pointer transition-all duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {starDescriptions[star]}
                </div>
                <div className="w-2 h-2 bg-gray-800 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
              </div>
            </button>
          ))}
        </div>
        
        <input
          type="hidden"
          id={id}
          name={name}
          value={value}
          required={required}
        />
        
        {value > 0 && (
          <div className="ml-4 text-sm text-gray-600 animate-fadeIn">
            <span className="font-medium">{starDescriptions[value]}</span>
            <span className="ml-1">({value}/5)</span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 animate-fadeIn">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
      
      {showReasonField && onReasonChange && (
        <div className="mt-3 animate-fadeIn">
          <label 
            htmlFor={`${id}-reason`} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Lý do đánh giá dưới 5 sao<span className="text-[#fc5d01] ml-1">*</span>
          </label>
          <div className="relative">
            <textarea
              id={`${id}-reason`}
              name={`${id}-reason`}
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              required
              rows={2}
              className={`w-full px-4 py-3 border ${
                reasonError ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:outline-none focus:ring-[#fc5d01] focus:border-[#fc5d01] transition-all duration-200`}
              placeholder="Vui lòng cho biết lý do"
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {reason.length} ký tự
            </div>
          </div>
          {reasonError && (
            <p className="mt-1 text-sm text-red-600 animate-fadeIn">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {reasonError}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Rating;
