"use client";

import React from 'react';
import Card from '../common/Card';
import Checkbox from '../common/Checkbox';
import { SharingPreferences } from '../../types';

interface ExperienceSharingSectionProps {
  sharingPreferences: SharingPreferences;
  onSharingPreferencesChange: (preferences: SharingPreferences) => void;
}

const ExperienceSharingSection: React.FC<ExperienceSharingSectionProps> = ({
  sharingPreferences,
  onSharingPreferencesChange
}) => {
  const handleAgreedToShareChange = (checked: boolean) => {
    const newPreferences: SharingPreferences = {
      agreedToShare: checked,
      allowFacebookShare: checked, // Auto set to true if agreed
      allowGoogleShare: checked    // Auto set to true if agreed
    };
    onSharingPreferencesChange(newPreferences);
  };

  return (
    <Card 
      variant="glass" 
      animate={true}
      className="animate-fadeIn stagger-3"
      icon={
        <div className="w-8 h-8 flex items-center justify-center bg-[#fc5d01] rounded-full animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        </div>
      }
      title="Chia sẻ trải nghiệm"
    >
      <div className="space-y-6">
        <div className="animate-fadeIn">
          <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
            Trải nghiệm của bạn có thể giúp ích cho những học viên khác trong việc lựa chọn khóa học và giảng viên phù hợp.
          </p>
          
          <div className="bg-gradient-to-r from-[#fedac2] to-[#fdbc94] p-4 rounded-lg border-l-4 border-[#fc5d01] mb-4">
            <Checkbox
              id="agreedToShare"
              name="agreedToShare"
              label="Tôi đồng ý chia sẻ trải nghiệm của mình lên các nền tảng xã hội"
              checked={sharingPreferences.agreedToShare}
              onChange={(e) => handleAgreedToShareChange(e.target.checked)}
              className="text-gray-800 font-medium"
            />
          </div>

          <div className="mt-4 p-3 bg-[#ffac7b] bg-opacity-20 rounded-lg border border-[#ffac7b]">
            <p className="text-xs text-gray-600 leading-relaxed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Thông tin cá nhân của bạn sẽ được bảo mật. Chỉ nội dung đánh giá và tên sẽ được chia sẻ.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExperienceSharingSection;
