"use client";

import React from 'react';
import TextArea from '../common/TextArea';
import Card from '../common/Card';

interface CommentsSectionProps {
  liked: string;
  improvements: string;
  onLikedChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onImprovementsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors: {
    liked?: string;
    improvements?: string;
  };
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  liked,
  improvements,
  onLikedChange,
  onImprovementsChange,
  errors,
}) => {
  return (
    <Card title="Phản hồi tự do">
      <div className="space-y-6">
        <TextArea
          id="liked"
          name="liked"
          label="Bạn thích nhất điều gì ở giảng viên này?"
          value={liked}
          onChange={onLikedChange}
          rows={4}
          error={errors.liked}
        />

        <TextArea
          id="improvements"
          name="improvements"
          label="Bạn muốn giảng viên cải thiện điều gì?"
          value={improvements}
          onChange={onImprovementsChange}
          rows={4}
          error={errors.improvements}
        />
      </div>
    </Card>
  );
};

export default CommentsSection;
