"use client";

import React from 'react';
import Container from '../common/Container';
import FeedbackForm from '../feedback/FeedbackForm';
import Image from 'next/image';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fedac2]/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="decorative-dot w-40 h-40 top-20 left-[5%] animate-float stagger-1"></div>
      <div className="decorative-dot w-24 h-24 top-40 right-[10%] animate-float stagger-3"></div>
      <div className="decorative-dot w-32 h-32 bottom-20 left-[15%] animate-float stagger-2"></div>
      <div className="decorative-dot w-20 h-20 bottom-40 right-[5%] animate-float stagger-4"></div>
      
      <Container className="py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section with Enhanced Animation */}
          <div className="mb-12 text-center">
            <div className="inline-block p-2 bg-[#fedac2] rounded-full mb-5 shadow-lg animate-scaleIn">
              <div className="bg-[#fc5d01] rounded-full p-3 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold gradient-text mb-4 animate-fadeIn">
              Đánh giá giảng viên
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto animate-fadeIn stagger-1">
              Hãy chia sẻ ý kiến của bạn để giúp chúng tôi cải thiện chất lượng giảng dạy
            </p>
          </div>
          
          {/* Feedback Form Section */}
          <div className="glass-effect rounded-2xl shadow-xl p-10 mb-16 card-hover animate-scaleIn stagger-2">
            <div className="mb-8 flex items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-[#fc5d01] rounded-full mr-4 shadow-lg animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold gradient-text">
                Form đánh giá
              </h2>
            </div>
            <FeedbackForm />
          </div>                   
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
