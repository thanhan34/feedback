"use client";

import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import { Teacher } from '../../types';
import { getTeachers, addTeacher, updateTeacher, deleteTeacher } from '../../firebase/services';

const TeacherManager: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [newTeacherName, setNewTeacherName] = useState('');
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editName, setEditName] = useState('');
  
  useEffect(() => {
    fetchTeachers();
  }, []);
  
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const teachersData = await getTeachers();
      setTeachers(teachersData);
      setError(null);
    } catch (err) {
      console.error('Error fetching teachers:', err);
      setError('Failed to load teachers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTeacherName.trim()) {
      return;
    }
    
    try {
      const newTeacher = await addTeacher({ name: newTeacherName.trim() });
      setTeachers([...teachers, newTeacher]);
      setNewTeacherName('');
    } catch (err) {
      console.error('Error adding teacher:', err);
      setError('Failed to add teacher. Please try again later.');
    }
  };
  
  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setEditName(teacher.name);
  };
  
  const handleUpdateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingTeacher || !editName.trim()) {
      return;
    }
    
    try {
      await updateTeacher(editingTeacher.id, { name: editName.trim() });
      setTeachers(
        teachers.map((teacher) =>
          teacher.id === editingTeacher.id
            ? { ...teacher, name: editName.trim() }
            : teacher
        )
      );
      setEditingTeacher(null);
      setEditName('');
    } catch (err) {
      console.error('Error updating teacher:', err);
      setError('Failed to update teacher. Please try again later.');
    }
  };
  
  const handleDeleteTeacher = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa giảng viên này?')) {
      return;
    }
    
    try {
      await deleteTeacher(id);
      setTeachers(teachers.filter((teacher) => teacher.id !== id));
    } catch (err) {
      console.error('Error deleting teacher:', err);
      setError('Failed to delete teacher. Please try again later.');
    }
  };
  
  const handleCancelEdit = () => {
    setEditingTeacher(null);
    setEditName('');
  };
  
  if (loading && teachers.length === 0) {
    return <div className="text-center py-4">Loading...</div>;
  }
  
  return (
    <Card title="Quản lý giảng viên">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="mb-6">
        <form onSubmit={handleAddTeacher} className="flex items-end space-x-2">
          <div className="flex-grow">
            <Input
              id="newTeacherName"
              name="newTeacherName"
              label="Tên giảng viên mới"
              value={newTeacherName}
              onChange={(e) => setNewTeacherName(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="primary">
            Thêm
          </Button>
        </form>
      </div>
      
      <div className="space-y-4">
        {teachers.length === 0 ? (
          <p className="text-gray-500 text-center">Chưa có giảng viên nào.</p>
        ) : (
          teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="border border-gray-200 rounded-md p-4 flex justify-between items-center"
            >
              {editingTeacher?.id === teacher.id ? (
                <form
                  onSubmit={handleUpdateTeacher}
                  className="flex-grow flex items-center space-x-2"
                >
                  <div className="flex-grow">
                    <Input
                      id={`edit-${teacher.id}`}
                      name={`edit-${teacher.id}`}
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
                  <span className="text-gray-800">{teacher.name}</span>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEditTeacher(teacher)}
                    >
                      Sửa
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteTeacher(teacher.id)}
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

export default TeacherManager;
