"use client";

import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import { Course } from '../../types';
import { getCourses, addCourse, updateCourse, deleteCourse } from '../../firebase/services';

const CourseManager: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [newCourseName, setNewCourseName] = useState('');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editName, setEditName] = useState('');
  
  useEffect(() => {
    fetchCourses();
  }, []);
  
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const coursesData = await getCourses();
      setCourses(coursesData);
      setError(null);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCourseName.trim()) {
      return;
    }
    
    try {
      const newCourse = await addCourse({ name: newCourseName.trim() });
      setCourses([...courses, newCourse]);
      setNewCourseName('');
    } catch (err) {
      console.error('Error adding course:', err);
      setError('Failed to add course. Please try again later.');
    }
  };
  
  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setEditName(course.name);
  };
  
  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingCourse || !editName.trim()) {
      return;
    }
    
    try {
      await updateCourse(editingCourse.id, { name: editName.trim() });
      setCourses(
        courses.map((course) =>
          course.id === editingCourse.id
            ? { ...course, name: editName.trim() }
            : course
        )
      );
      setEditingCourse(null);
      setEditName('');
    } catch (err) {
      console.error('Error updating course:', err);
      setError('Failed to update course. Please try again later.');
    }
  };
  
  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      return;
    }
    
    try {
      await deleteCourse(id);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (err) {
      console.error('Error deleting course:', err);
      setError('Failed to delete course. Please try again later.');
    }
  };
  
  const handleCancelEdit = () => {
    setEditingCourse(null);
    setEditName('');
  };
  
  if (loading && courses.length === 0) {
    return <div className="text-center py-4">Loading...</div>;
  }
  
  return (
    <Card title="Quản lý khóa học">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="mb-6">
        <form onSubmit={handleAddCourse} className="flex items-end space-x-2">
          <div className="flex-grow">
            <Input
              id="newCourseName"
              name="newCourseName"
              label="Tên khóa học mới"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="primary">
            Thêm
          </Button>
        </form>
      </div>
      
      <div className="space-y-4">
        {courses.length === 0 ? (
          <p className="text-gray-500 text-center">Chưa có khóa học nào.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="border border-gray-200 rounded-md p-4 flex justify-between items-center"
            >
              {editingCourse?.id === course.id ? (
                <form
                  onSubmit={handleUpdateCourse}
                  className="flex-grow flex items-center space-x-2"
                >
                  <div className="flex-grow">
                    <Input
                      id={`edit-${course.id}`}
                      name={`edit-${course.id}`}
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" variant="primary" size="sm">
                      Lưu
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCancelEdit}
                    >
                      Hủy
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <span className="text-gray-800">{course.name}</span>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEditCourse(course)}
                    >
                      Sửa
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default CourseManager;
