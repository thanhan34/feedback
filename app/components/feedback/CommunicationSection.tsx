"use client";

import React, { useState } from 'react';
import Rating from '../common/Rating';
import Card from '../common/Card';

interface CommunicationSectionProps {
  friendlyAttitude: number;
  listeningSkills: number;
  onFriendlyAttitudeChange: (value: number) => void;
  onListeningSkillsChange: (value: number) => void;
  onFriendlyAttitudeReasonChange?: (reason: string) => void;
  onListeningSkillsReasonChange?: (reason: string) => void;
  errors: {
    friendlyAttitude?: string;
    listeningSkills?: string;
  };
}

const CommunicationSection: React.FC<CommunicationSectionProps> = ({
  friendlyAttitude,
  listeningSkills,
  onFriendlyAttitudeChange,
  onListeningSkillsChange,
  onFriendlyAttitudeReasonChange,
  onListeningSkillsReasonChange,
  errors,
}) => {
  const [friendlyAttitudeReason, setFriendlyAttitudeReason] = useState('');
  const [listeningSkillsReason, setListeningSkillsReason] = useState('');
  const [reasonErrors] = useState({
    friendlyAttitude: '',
    listeningSkills: ''
  });

  const handleFriendlyAttitudeChange = (value: number) => {
    onFriendlyAttitudeChange(value);
    if (value === 5) {
      setFriendlyAttitudeReason('');
      if (onFriendlyAttitudeReasonChange) {
        onFriendlyAttitudeReasonChange('');
      }
    }
  };

  const handleListeningSkillsChange = (value: number) => {
    onListeningSkillsChange(value);
    if (value === 5) {
      setListeningSkillsReason('');
      if (onListeningSkillsReasonChange) {
        onListeningSkillsReasonChange('');
      }
    }
  };
  
  const handleFriendlyAttitudeReasonChange = (reason: string) => {
    setFriendlyAttitudeReason(reason);
    if (onFriendlyAttitudeReasonChange) {
      onFriendlyAttitudeReasonChange(reason);
    }
  };
  
  const handleListeningSkillsReasonChange = (reason: string) => {
    setListeningSkillsReason(reason);
    if (onListeningSkillsReasonChange) {
      onListeningSkillsReasonChange(reason);
    }
  };

  return (
    <Card title="Giao tiếp & tương tác">
      <div className="space-y-6">
        <Rating
          id="friendlyAttitude"
          name="friendlyAttitude"
          label="Thái độ thân thiện, dễ tiếp cận"
          value={friendlyAttitude}
          onChange={handleFriendlyAttitudeChange}
          required
          error={errors.friendlyAttitude}
          reasonRequired={true}
          reason={friendlyAttitudeReason}
          onReasonChange={handleFriendlyAttitudeReasonChange}
          reasonError={reasonErrors.friendlyAttitude}
        />

        <Rating
          id="listeningSkills"
          name="listeningSkills"
          label="Biết lắng nghe học viên"
          value={listeningSkills}
          onChange={handleListeningSkillsChange}
          required
          error={errors.listeningSkills}
          reasonRequired={true}
          reason={listeningSkillsReason}
          onReasonChange={handleListeningSkillsReasonChange}
          reasonError={reasonErrors.listeningSkills}
        />
      </div>
    </Card>
  );
};

export default CommunicationSection;
