"use client";

import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Rating from '../common/Rating';
import TextArea from '../common/TextArea';
import { getRandomTemplate } from '../../utils/reviewTemplates';

const ReviewGenerator: React.FC = () => {
  const [teacherName, setTeacherName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [target, setTarget] = useState('');
  const [generatedReview, setGeneratedReview] = useState('');
  const [editableReview, setEditableReview] = useState('');
  const [ratings, setRatings] = useState(Array(8).fill(5));
  const [copySuccess, setCopySuccess] = useState(false);

  const handleRatingChange = (index: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  const setAllFiveStars = () => {
    setRatings(Array(8).fill(5));
  };

  const generateReview = () => {
    // Only generate review if all ratings are 5
    if (!ratings.every(r => r === 5)) {
      alert('Vui lòng đánh giá 5 sao cho tất cả các mục để tạo review');
      return;
    }
    
    const review = getRandomTemplate(teacherName, courseName, target);
    setGeneratedReview(review);
    setEditableReview(review);
  };

  const handleCopyReview = () => {
    navigator.clipboard.writeText(editableReview)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Không thể sao chép: ', err);
      });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            id="teacherName"
            name="teacherName"
            label="Tên giảng viên"
            placeholder="Nhập tên giảng viên"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
          />
        </div>
        
        <div>
          <Input
            id="courseName"
            name="courseName"
            label="Tên khóa học"
            placeholder="Nhập tên khóa học"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Input
          id="target"
          name="target"
          label="Mục tiêu điểm số"
          placeholder="Ví dụ: 65+, 79+, v.v."
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Đánh giá</h3>
        <p className="text-sm text-gray-600 mb-3">
          Tất cả các mục phải được đánh giá 5 sao để tạo review
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Giải đáp rõ ràng',
            'Kiến thức cập nhật',
            'Phù hợp với học viên',
            'Đa dạng phương pháp',
            'Thái độ thân thiện',
            'Lắng nghe học viên',
            'Cảm thấy tiến bộ',
            'Đạt mục tiêu học tập'
          ].map((category, index) => (
            <div key={index}>
              <Rating
                id={`rating-${index}`}
                name={`rating-${index}`}
                label={category}
                value={ratings[index]}
                onChange={(value) => handleRatingChange(index, value)}
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={setAllFiveStars}
          >
            Đặt tất cả 5 sao
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={generateReview}
          className="w-full md:w-auto"
        >
          Tạo review
        </Button>
        
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => {
            // Generate random data
            const randomTeachers = [
              'Nguyễn Văn A',
              'Trần Thị B',
              'Lê Văn C',
              'Phạm Thị D',
              'Hoàng Văn E'
            ];
            
            const randomCourses = [
              'PTE Academic',
              'IELTS',
              'Giao tiếp',
              'Business English',
              'TOEIC'
            ];
            
            const randomTargets = [
              '65+',
              '79+',
              '90+',
              '7.0',
              '8.0'
            ];
            
            // Set random values
            const randomTeacher = randomTeachers[Math.floor(Math.random() * randomTeachers.length)];
            const randomCourse = randomCourses[Math.floor(Math.random() * randomCourses.length)];
            const randomTarget = randomTargets[Math.floor(Math.random() * randomTargets.length)];
            
            setTeacherName(randomTeacher);
            setCourseName(randomCourse);
            setTarget(randomTarget);
            setRatings(Array(8).fill(5));
            
            // Generate review with random data
            const review = getRandomTemplate(randomTeacher, randomCourse, randomTarget);
            setGeneratedReview(review);
            setEditableReview(review);
          }}
          className="w-full md:w-auto"
        >
          Tạo review ngẫu nhiên
        </Button>
      </div>
      
      {generatedReview && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">Review được tạo</h3>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setTeacherName('');
                setCourseName('');
                setTarget('');
                setGeneratedReview('');
                setEditableReview('');
                setRatings(Array(8).fill(5));
              }}
              className="flex items-center"
            >
              <span className="mr-1">🔄</span>
              Tạo mới
            </Button>
          </div>
          
          <div className="bg-[#fedac2] p-4 rounded-md">
            <p className="text-[#fc5d01] font-medium mb-2">
              Gợi ý review:
            </p>
            <div className="bg-white p-3 border border-[#fdbc94] rounded-md text-sm text-gray-700">
              {generatedReview}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-1">Chỉnh sửa review của bạn:</p>
            <TextArea
              id="editableReview"
              name="editableReview"
              value={editableReview}
              onChange={(e) => setEditableReview(e.target.value)}
              rows={5}
              className="bg-white border-[#fdbc94] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCopyReview}
              className="flex items-center"
            >
              <span className="mr-1">📋</span>
              {copySuccess ? 'Đã sao chép!' : 'Sao chép nội dung'}
            </Button>
            
            <Button
              type="button"
              variant="primary"
              onClick={() => window.open('https://g.page/r/CQxR-OQvJOFsEAI/review', '_blank')}
              className="flex items-center"
            >
              <span className="mr-1">✍️</span>
              Viết review trên Google
            </Button>
            
            <Button
              type="button"
              variant="primary"
              onClick={() => window.open('https://www.facebook.com/PTEIntensive/reviews/', '_blank')}
              className="flex items-center"
            >
              <span className="mr-1">✍️</span>
              Viết review trên Facebook
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewGenerator;
