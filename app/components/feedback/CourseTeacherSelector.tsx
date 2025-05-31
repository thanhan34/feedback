"use client";

import React, { useState, useEffect } from 'react';
import Select from '../common/Select';
import Card from '../common/Card';
import { Teacher, Course } from '../../types';
import { getTeachers, getCourses } from '../../firebase/services';

interface CourseTeacherSelectorProps {
  teacherId: string;
  courseId: string;
  onTeacherChange: (teacherId: string) => void;
  onCourseChange: (courseId: string) => void;
  errors: {
    teacherId?: string;
    courseId?: string;
  };
}

const CourseTeacherSelector: React.FC<CourseTeacherSelectorProps> = ({
  teacherId,
  courseId,
  onTeacherChange,
  onCourseChange,
  errors,
}) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [teachersData, coursesData] = await Promise.all([
          getTeachers(),
          getCourses(),
        ]);
        setTeachers(teachersData);
        setCourses(coursesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load teachers and courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTeacherChange(e.target.value);
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCourseChange(e.target.value);
  };

  if (loading) {
    return (
      <Card 
        variant="glass" 
        animate={true}
        icon={
          <div className="w-8 h-8 flex items-center justify-center bg-[#fc5d01] rounded-full animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        }
        title="Thông tin khóa học"
      >
        <div className="text-center py-4">Loading...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card 
        variant="glass" 
        animate={true}
        icon={
          <div className="w-8 h-8 flex items-center justify-center bg-[#fc5d01] rounded-full animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        }
        title="Thông tin khóa học"
      >
        <div className="text-red-500 py-4">{error}</div>
      </Card>
    );
  }

  return (
    <Card 
      variant="glass" 
      animate={true}
      icon={
        <div className="w-8 h-8 flex items-center justify-center bg-[#fc5d01] rounded-full animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      }
      title="Thông tin khóa học"
    >
      <div className="space-y-4">
        <Select
          id="teacher"
          name="teacher"
          label="Giảng viên của bạn là ai?"
          placeholder="Chọn giảng viên"
          options={teachers.map((teacher) => ({
            value: teacher.id,
            label: teacher.name,
          }))}
          value={teacherId}
          onChange={handleTeacherChange}
          required
          error={errors.teacherId}
        />

        <Select
          id="course"
          name="course"
          label="Khóa học bạn tham gia là gì?"
          placeholder="Chọn khóa học"
          options={courses.map((course) => ({
            value: course.id,
            label: course.name,
          }))}
          value={courseId}
          onChange={handleCourseChange}
          required
          error={errors.courseId}
        />
      </div>
    </Card>
  );
};

export default CourseTeacherSelector;
