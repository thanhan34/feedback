"use client";

import React, { useState } from 'react';
import Rating from '../common/Rating';
import Card from '../common/Card';

interface TeachingMethodsSectionProps {
  suitableForStudents: number;
  diverseMethods: number;
  onSuitableForStudentsChange: (value: number) => void;
  onDiverseMethodsChange: (value: number) => void;
  onSuitableForStudentsReasonChange?: (reason: string) => void;
  onDiverseMethodsReasonChange?: (reason: string) => void;
  errors: {
    suitableForStudents?: string;
    diverseMethods?: string;
  };
}

const TeachingMethodsSection: React.FC<TeachingMethodsSectionProps> = ({
  suitableForStudents,
  diverseMethods,
  onSuitableForStudentsChange,
  onDiverseMethodsChange,
  onSuitableForStudentsReasonChange,
  onDiverseMethodsReasonChange,
  errors,
}) => {
  const [suitableForStudentsReason, setSuitableForStudentsReason] = useState('');
  const [diverseMethodsReason, setDiverseMethodsReason] = useState('');
  const [reasonErrors] = useState({
    suitableForStudents: '',
    diverseMethods: ''
  });

  const handleSuitableForStudentsChange = (value: number) => {
    onSuitableForStudentsChange(value);
    if (value === 5) {
      setSuitableForStudentsReason('');
      if (onSuitableForStudentsReasonChange) {
        onSuitableForStudentsReasonChange('');
      }
    }
  };

  const handleDiverseMethodsChange = (value: number) => {
    onDiverseMethodsChange(value);
    if (value === 5) {
      setDiverseMethodsReason('');
      if (onDiverseMethodsReasonChange) {
        onDiverseMethodsReasonChange('');
      }
    }
  };
  
  const handleSuitableForStudentsReasonChange = (reason: string) => {
    setSuitableForStudentsReason(reason);
    if (onSuitableForStudentsReasonChange) {
      onSuitableForStudentsReasonChange(reason);
    }
  };
  
  const handleDiverseMethodsReasonChange = (reason: string) => {
    setDiverseMethodsReason(reason);
    if (onDiverseMethodsReasonChange) {
      onDiverseMethodsReasonChange(reason);
    }
  };

  return (
    <Card title="Đánh giá phương pháp giảng dạy">
      <div className="space-y-6">
        <Rating
          id="suitableForStudents"
          name="suitableForStudents"
          label="Phù hợp với nhu cầu học viên"
          value={suitableForStudents}
          onChange={handleSuitableForStudentsChange}
          required
          error={errors.suitableForStudents}
          reasonRequired={true}
          reason={suitableForStudentsReason}
          onReasonChange={handleSuitableForStudentsReasonChange}
          reasonError={reasonErrors.suitableForStudents}
        />

        <Rating
          id="diverseMethods"
          name="diverseMethods"
          label="Sử dụng nhiều phương pháp để giải thích"
          value={diverseMethods}
          onChange={handleDiverseMethodsChange}
          required
          error={errors.diverseMethods}
          reasonRequired={true}
          reason={diverseMethodsReason}
          onReasonChange={handleDiverseMethodsReasonChange}
          reasonError={reasonErrors.diverseMethods}
        />
      </div>
    </Card>
  );
};

export default TeachingMethodsSection;
