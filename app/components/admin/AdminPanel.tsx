"use client";

import React, { useState } from 'react';
import Container from '../common/Container';
import Card from '../common/Card';
import Button from '../common/Button';
import TeacherManager from './TeacherManager';
import CourseManager from './CourseManager';
import FeedbackTable from './FeedbackTable';
import QuestionManager from './QuestionManager';

type AdminTab = 'teachers' | 'courses' | 'feedbacks' | 'questions';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('feedbacks');
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'teachers':
        return <TeacherManager />;
      case 'courses':
        return <CourseManager />;
      case 'feedbacks':
        return <FeedbackTable />;
      case 'questions':
        return <QuestionManager />;
      default:
        return <FeedbackTable />;
    }
  };
  
  return (
    <Container className="py-8">
      <Card title="Trang quản trị">
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            type="button"
            variant={activeTab === 'feedbacks' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('feedbacks')}
          >
            Đánh giá
          </Button>
          <Button
            type="button"
            variant={activeTab === 'questions' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('questions')}
          >
            Câu hỏi
          </Button>
          <Button
            type="button"
            variant={activeTab === 'teachers' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('teachers')}
          >
            Giảng viên
          </Button>
          <Button
            type="button"
            variant={activeTab === 'courses' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('courses')}
          >
            Khóa học
          </Button>
        </div>
      </Card>
      
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </Container>
  );
};

export default AdminPanel;
