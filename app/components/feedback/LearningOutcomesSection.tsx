"use client";

import React, { useState } from 'react';
import Rating from '../common/Rating';
import Card from '../common/Card';

interface LearningOutcomesSectionProps {
  progressFelt: number;
  achievedGoals: number;
  onProgressFeltChange: (value: number) => void;
  onAchievedGoalsChange: (value: number) => void;
  onProgressFeltReasonChange?: (reason: string) => void;
  onAchievedGoalsReasonChange?: (reason: string) => void;
  errors: {
    progressFelt?: string;
    achievedGoals?: string;
  };
}

const LearningOutcomesSection: React.FC<LearningOutcomesSectionProps> = ({
  progressFelt,
  achievedGoals,
  onProgressFeltChange,
  onAchievedGoalsChange,
  onProgressFeltReasonChange,
  onAchievedGoalsReasonChange,
  errors,
}) => {
  const [progressFeltReason, setProgressFeltReason] = useState('');
  const [achievedGoalsReason, setAchievedGoalsReason] = useState('');
  const [reasonErrors] = useState({
    progressFelt: '',
    achievedGoals: ''
  });

  const handleProgressFeltChange = (value: number) => {
    onProgressFeltChange(value);
    if (value === 5) {
      setProgressFeltReason('');
      if (onProgressFeltReasonChange) {
        onProgressFeltReasonChange('');
      }
    }
  };

  const handleAchievedGoalsChange = (value: number) => {
    onAchievedGoalsChange(value);
    if (value === 5) {
      setAchievedGoalsReason('');
      if (onAchievedGoalsReasonChange) {
        onAchievedGoalsReasonChange('');
      }
    }
  };
  
  const handleProgressFeltReasonChange = (reason: string) => {
    setProgressFeltReason(reason);
    if (onProgressFeltReasonChange) {
      onProgressFeltReasonChange(reason);
    }
  };
  
  const handleAchievedGoalsReasonChange = (reason: string) => {
    setAchievedGoalsReason(reason);
    if (onAchievedGoalsReasonChange) {
      onAchievedGoalsReasonChange(reason);
    }
  };

  return (
    <Card title="Kết quả học tập">
      <div className="space-y-6">
        <Rating
          id="progressFelt"
          name="progressFelt"
          label="Học viên có cảm thấy tiến bộ không?"
          value={progressFelt}
          onChange={handleProgressFeltChange}
          required
          error={errors.progressFelt}
          reasonRequired={true}
          reason={progressFeltReason}
          onReasonChange={handleProgressFeltReasonChange}
          reasonError={reasonErrors.progressFelt}
        />

        <Rating
          id="achievedGoals"
          name="achievedGoals"
          label="Có giúp đạt được mục tiêu học tập không?"
          value={achievedGoals}
          onChange={handleAchievedGoalsChange}
          required
          error={errors.achievedGoals}
          reasonRequired={true}
          reason={achievedGoalsReason}
          onReasonChange={handleAchievedGoalsReasonChange}
          reasonError={reasonErrors.achievedGoals}
        />
      </div>
    </Card>
  );
};

export default LearningOutcomesSection;
