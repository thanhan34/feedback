"use client";

import React, { useState, useEffect } from 'react';
import Card from '../common/Card';

import TextArea from '../common/TextArea';
import { getRandomTemplate } from '../../utils/reviewTemplates';

interface PersonalizedReviewSectionProps {
  teacherName: string;
  courseName: string;
  target?: string;
  scores: number[];
  googleReviewLink?: string;
  facebookReviewLink?: string;
  agreedToShare?: boolean;
}

const PersonalizedReviewSection: React.FC<PersonalizedReviewSectionProps> = ({
  teacherName,
  courseName,
  target = "điểm cao",
  scores,
  googleReviewLink = "https://g.page/r/CXK9M8j2s65zEAE/review",
  facebookReviewLink = "https://www.facebook.com/PTE.Intensive.VN/reviews",
  agreedToShare = false
}) => {
  const [showReview, setShowReview] = useState(false);
  const [personalizedReview, setPersonalizedReview] = useState('');
  const [editableReview, setEditableReview] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Kiểm tra xem tất cả điểm đánh giá có phải là 5 không và người dùng đã đồng ý chia sẻ
  useEffect(() => {
    const allFiveStars = scores.length > 0 && scores.every(score => score === 5);
    const shouldShow = allFiveStars && agreedToShare;
    setShowReview(shouldShow);
    
    if (shouldShow) {
      // Lấy mẫu review ngẫu nhiên dựa trên thông tin có sẵn
      const personalized = getRandomTemplate(teacherName, courseName, target);
      
      setPersonalizedReview(personalized);
      setEditableReview(personalized);
    }
  }, [scores, teacherName, courseName, target, agreedToShare]);

  // Xử lý sao chép nội dung
  const handleCopyReview = () => {
    navigator.clipboard.writeText(editableReview)
      .then(() => {
        setCopySuccess(true);
        setCurrentStep(2);
        setTimeout(() => setCopySuccess(false), 3000);
      })
      .catch(err => {
        console.error('Không thể sao chép: ', err);
      });
  };

  if (!showReview) {
    return null;
  }

  // Tạo review mới
  const handleCreateNewReview = () => {
    // Lấy mẫu review ngẫu nhiên dựa trên thông tin có sẵn
    const personalized = getRandomTemplate(teacherName, courseName, target);
    setPersonalizedReview(personalized);
    setEditableReview(personalized);
  };

  const handlePlatformClick = (platform: string) => {
    setCurrentStep(3);
    const url = platform === 'google' ? googleReviewLink : facebookReviewLink;
    window.open(url, '_blank');
  };

  return (
    <Card 
      variant="glass" 
      animate={true}
      className="animate-fadeIn stagger-6"
      icon={
        <div className="w-8 h-8 flex items-center justify-center bg-[#fc5d01] rounded-full animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
      }
      title="🎉 Gợi ý review cho bạn"
    >
      <div className="space-y-8">
        {/* Enhanced Congratulations Message */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] p-8 rounded-2xl shadow-2xl">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12 animate-pulse delay-1000"></div>
          
          <div className="relative z-10">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#fc5d01]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
                  🎉 Xuất sắc! Bạn đã đánh giá 5 sao!
                  <span className="ml-2 text-yellow-300">⭐⭐⭐⭐⭐</span>
                </h3>
                <p className="text-white text-opacity-95 text-base leading-relaxed mb-4">
                  Trải nghiệm tuyệt vời của bạn là động lực lớn cho chúng tôi! 
                  Hãy chia sẻ cảm nhận này để giúp những học viên khác tìm được khóa học phù hợp.
                </p>
                <div className="flex items-center space-x-2 text-white text-opacity-90">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">Chỉ mất 2 phút để chia sẻ review của bạn!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-step Guide */}
        <div className="bg-gradient-to-r from-[#fedac2] to-[#ffffff] p-6 rounded-xl border-2 border-[#fdbc94] shadow-lg">
          <h4 className="text-xl font-bold text-[#fc5d01] mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Hướng dẫn chia sẻ review - 3 bước đơn giản
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              currentStep >= 1 ? 'bg-[#fc5d01] border-[#fc5d01] text-white' : 'bg-white border-[#fdbc94] text-gray-700'
            }`}>
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${
                  currentStep >= 1 ? 'bg-white text-[#fc5d01]' : 'bg-[#fc5d01] text-white'
                }`}>
                  1
                </div>
                <h5 className="font-semibold">Sao chép nội dung</h5>
              </div>
              <p className="text-sm opacity-90">
                Chỉnh sửa và sao chép nội dung review phù hợp với trải nghiệm của bạn
              </p>
            </div>

            {/* Step 2 */}
            <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              currentStep >= 2 ? 'bg-[#fc5d01] border-[#fc5d01] text-white' : 'bg-white border-[#fdbc94] text-gray-700'
            }`}>
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${
                  currentStep >= 2 ? 'bg-white text-[#fc5d01]' : 'bg-[#fc5d01] text-white'
                }`}>
                  2
                </div>
                <h5 className="font-semibold">Chọn nền tảng</h5>
              </div>
              <p className="text-sm opacity-90">
                Nhấn vào Google hoặc Facebook để mở trang review
              </p>
            </div>

            {/* Step 3 */}
            <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              currentStep >= 3 ? 'bg-[#fc5d01] border-[#fc5d01] text-white' : 'bg-white border-[#fdbc94] text-gray-700'
            }`}>
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${
                  currentStep >= 3 ? 'bg-white text-[#fc5d01]' : 'bg-[#fc5d01] text-white'
                }`}>
                  3
                </div>
                <h5 className="font-semibold">Dán và đăng</h5>
              </div>
              <p className="text-sm opacity-90">
                Dán nội dung đã sao chép và đăng review của bạn
              </p>
            </div>
          </div>
        </div>

        {/* Review Generation Section */}
        <div className="bg-white rounded-xl border-2 border-[#fdbc94] shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#ffac7b] to-[#fd7f33] px-6 py-4">
            <div className="flex justify-between items-center">
              <h4 className="text-white font-semibold text-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Gợi ý nội dung review
              </h4>
              <button
                type="button"
                onClick={handleCreateNewReview}
                className="bg-[#fc5d01] bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center text-sm font-medium shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Tạo mới
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Suggested Review */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#fc5d01]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                💡 Nội dung gợi ý dành riêng cho bạn:
              </label>
              <div className="bg-gradient-to-r from-[#fedac2] to-[#ffffff] p-5 border-2 border-[#fdbc94] rounded-xl text-gray-800 text-sm leading-relaxed shadow-inner">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#fc5d01] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    {personalizedReview}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Editable Review */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#fc5d01]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                ✏️ Chỉnh sửa theo phong cách của bạn:
              </label>
              <TextArea
                id="editableReview"
                name="editableReview"
                value={editableReview}
                onChange={(e) => setEditableReview(e.target.value)}
                rows={6}
                className="w-full border-2 border-[#fdbc94] focus:border-[#fc5d01] focus:ring-2 focus:ring-[#fc5d01] focus:ring-opacity-20 rounded-xl resize-none text-sm leading-relaxed"
                placeholder="Chỉnh sửa nội dung review theo ý bạn..."
              />
              <div className="mt-2 text-xs text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Số ký tự: {editableReview.length} | Khuyến nghị: 100-300 ký tự cho review hiệu quả
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="bg-gradient-to-br from-[#ffffff] via-[#fedac2] to-[#fdbc94] p-6 rounded-xl border-2 border-[#fdbc94] shadow-lg">
          <h4 className="text-xl font-bold text-[#fc5d01] mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Chia sẻ review ngay bây giờ
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <button
              type="button"
              onClick={handleCopyReview}
              className={`flex items-center justify-center px-6 py-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                copySuccess 
                  ? 'bg-green-50 border-green-300 text-green-700 shadow-lg' 
                  : 'bg-white border-[#fdbc94] text-gray-700 hover:border-[#fc5d01] hover:bg-[#fedac2] shadow-md hover:shadow-lg'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <div className="text-center">
                <div className="font-semibold">
                  {copySuccess ? '✅ Đã sao chép!' : '📋 Sao chép'}
                </div>
                <div className="text-xs opacity-75">Bước 1</div>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => handlePlatformClick('google')}
              className={`flex items-center justify-center px-6 py-4 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white rounded-xl hover:from-[#fd7f33] hover:to-[#fc5d01] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                currentStep >= 2 ? 'animate-pulse ring-4 ring-yellow-300 ring-opacity-75' : ''
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="text-center">
                <div className="font-semibold">🌟 Google</div>
                <div className="text-xs opacity-90">Review nhanh</div>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => handlePlatformClick('facebook')}
              className={`flex items-center justify-center px-6 py-4 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white rounded-xl hover:from-[#fd7f33] hover:to-[#fc5d01] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                currentStep >= 2 ? 'animate-pulse ring-4 ring-yellow-300 ring-opacity-75' : ''
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <div className="text-center">
                <div className="font-semibold">📘 Facebook</div>
                <div className="text-xs opacity-90">Chia sẻ rộng</div>
              </div>
            </button>
          </div>
          
          {/* Enhanced Tips Section */}
          <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl border border-[#ffac7b] shadow-inner">
            <h5 className="font-bold text-[#fc5d01] mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              💡 Mẹo chia sẻ review hiệu quả:
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <span className="text-[#fc5d01] font-bold">1.</span>
                <span><strong>Sao chép trước:</strong> Nhấn &quot;Sao chép&quot; để lưu nội dung vào clipboard</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-[#fc5d01] font-bold">2.</span>
                <span><strong>Mở trang mới:</strong> Nhấn Google/Facebook để mở tab mới</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-[#fc5d01] font-bold">3.</span>
                <span><strong>Dán nội dung:</strong> Nhấn Ctrl+V (hoặc Cmd+V) để dán</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-[#fc5d01] font-bold">4.</span>
                <span><strong>Thêm cảm xúc:</strong> Có thể thêm emoji để review sinh động hơn</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-[#ffac7b] bg-opacity-20 rounded-lg border border-[#ffac7b]">
              <p className="text-xs text-gray-600 leading-relaxed flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-[#fc5d01]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  <strong>Lưu ý quan trọng:</strong> Hãy đảm bảo nội dung review phản ánh đúng trải nghiệm thực tế của bạn. 
                  Review chân thực sẽ giúp ích nhiều hơn cho cộng đồng học viên.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PersonalizedReviewSection;
