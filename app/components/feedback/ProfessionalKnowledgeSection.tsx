"use client";

import React, { useState } from 'react';
import Rating from '../common/Rating';
import Card from '../common/Card';

interface ProfessionalKnowledgeSectionProps {
  clearExplanations: number;
  upToDateKnowledge: number;
  onClearExplanationsChange: (value: number) => void;
  onUpToDateKnowledgeChange: (value: number) => void;
  onClearExplanationsReasonChange?: (reason: string) => void;
  onUpToDateKnowledgeReasonChange?: (reason: string) => void;
  errors: {
    clearExplanations?: string;
    upToDateKnowledge?: string;
  };
}

const ProfessionalKnowledgeSection: React.FC<ProfessionalKnowledgeSectionProps> = ({
  clearExplanations,
  upToDateKnowledge,
  onClearExplanationsChange,
  onUpToDateKnowledgeChange,
  onClearExplanationsReasonChange,
  onUpToDateKnowledgeReasonChange,
  errors,
}) => {
  const [clearExplanationsReason, setClearExplanationsReason] = useState('');
  const [upToDateKnowledgeReason, setUpToDateKnowledgeReason] = useState('');
  const [reasonErrors] = useState({
    clearExplanations: '',
    upToDateKnowledge: ''
  });

  const handleClearExplanationsChange = (value: number) => {
    onClearExplanationsChange(value);
    if (value === 5) {
      setClearExplanationsReason('');
      if (onClearExplanationsReasonChange) {
        onClearExplanationsReasonChange('');
      }
    }
  };

  const handleUpToDateKnowledgeChange = (value: number) => {
    onUpToDateKnowledgeChange(value);
    if (value === 5) {
      setUpToDateKnowledgeReason('');
      if (onUpToDateKnowledgeReasonChange) {
        onUpToDateKnowledgeReasonChange('');
      }
    }
  };
  
  const handleClearExplanationsReasonChange = (reason: string) => {
    setClearExplanationsReason(reason);
    if (onClearExplanationsReasonChange) {
      onClearExplanationsReasonChange(reason);
    }
  };
  
  const handleUpToDateKnowledgeReasonChange = (reason: string) => {
    setUpToDateKnowledgeReason(reason);
    if (onUpToDateKnowledgeReasonChange) {
      onUpToDateKnowledgeReasonChange(reason);
    }
  };

  // Icon for the section
  const sectionIcon = (
    <div className="w-8 h-8 flex items-center justify-center bg-[#fc5d01] rounded-full animate-pulse">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
  );

  return (
    <Card 
      title="Đánh giá chuyên môn giảng viên" 
      icon={sectionIcon}
      variant="glass"
      animate={true}
      className="mb-8"
    >
      <div className="space-y-8 py-2">
        <div className="animate-fadeIn stagger-1">
          <Rating
            id="clearExplanations"
            name="clearExplanations"
            label="Giải đáp rõ ràng và dễ hiểu"
            value={clearExplanations}
            onChange={handleClearExplanationsChange}
            required
            error={errors.clearExplanations}
            reasonRequired={true}
            reason={clearExplanationsReason}
            onReasonChange={handleClearExplanationsReasonChange}
            reasonError={reasonErrors.clearExplanations}
          />
        </div>

        <div className="animate-fadeIn stagger-2">
          <Rating
            id="upToDateKnowledge"
            name="upToDateKnowledge"
            label="Nắm vững nội dung và kiến thức cập nhật"
            value={upToDateKnowledge}
            onChange={handleUpToDateKnowledgeChange}
            required
            error={errors.upToDateKnowledge}
            reasonRequired={true}
            reason={upToDateKnowledgeReason}
            onReasonChange={handleUpToDateKnowledgeReasonChange}
            reasonError={reasonErrors.upToDateKnowledge}
          />
        </div>
      </div>
    </Card>
  );
};

export default ProfessionalKnowledgeSection;
