"use client";

import React, { useState } from 'react';
import PersonalizedReviewSection from './PersonalizedReviewSection';
import Card from '../common/Card';
import Button from '../common/Button';
import Select from '../common/Select';
import Input from '../common/Input';
import Rating from '../common/Rating';

const PersonalizedReviewExample: React.FC = () => {
  const [teacherName, setTeacherName] = useState('Nguyễn Văn A');
  const [courseName, setCourseName] = useState('PTE Academic');
  const [target, setTarget] = useState('65+');
  const [scores, setScores] = useState([5, 5, 5, 5, 5]);

  // Danh sách giảng viên mẫu
  const teachers = [
    { id: '1', name: 'Nguyễn Văn A' },
    { id: '2', name: 'Trần Thị B' },
    { id: '3', name: 'Lê Văn C' },
  ];

  // Danh sách khóa học mẫu
  const courses = [
    { id: '1', name: 'PTE Academic' },
    { id: '2', name: 'IELTS' },
    { id: '3', name: 'Giao tiếp' },
  ];

  // Cập nhật điểm đánh giá
  const handleRatingChange = (index: number, value: number) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  // Đặt tất cả điểm về 5 sao
  const setAllFiveStars = () => {
    setScores([5, 5, 5, 5, 5]);
  };

  // Đặt một số điểm không phải 5 sao
  const setMixedRatings = () => {
    setScores([5, 4, 5, 3, 5]);
  };

  return (
    <div className="space-y-6">
      <Card title="Thông tin đánh giá">
        <div className="space-y-4">
          <Select
            id="teacher"
            name="teacher"
            label="Giảng viên"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            options={teachers.map(teacher => ({
              value: teacher.name,
              label: teacher.name
            }))}
          />

          <Select
            id="course"
            name="course"
            label="Khóa học"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            options={courses.map(course => ({
              value: course.name,
              label: course.name
            }))}
          />

          <Input
            id="target"
            name="target"
            label="Mục tiêu điểm số"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Ví dụ: 65+, 79+, v.v."
          />
        </div>
      </Card>

      <Card title="Đánh giá">
        <div className="space-y-4">
          {['Chuyên môn', 'Phương pháp', 'Giao tiếp', 'Kết quả', 'Tổng thể'].map((category, index) => (
            <div key={index}>
              <Rating
                id={`rating-${index}`}
                name={`rating-${index}`}
                label={`Đánh giá ${category}`}
                value={scores[index]}
                onChange={(value) => handleRatingChange(index, value)}
              />
            </div>
          ))}

          <div className="flex space-x-2 mt-4">
            <Button
              type="button"
              variant="primary"
              onClick={setAllFiveStars}
            >
              Đặt tất cả 5 sao
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={setMixedRatings}
            >
              Đặt điểm hỗn hợp
            </Button>
          </div>
        </div>
      </Card>

      <PersonalizedReviewSection
        teacherName={teacherName}
        courseName={courseName}
        target={target}
        scores={scores}
        googleReviewLink="https://g.page/r/CXK9M8j2s65zEAE/review"
        facebookReviewLink="https://www.facebook.com/PTE.Intensive.VN/reviews"
        agreedToShare={true}
      />
    </div>
  );
};

export default PersonalizedReviewExample;
