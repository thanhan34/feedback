"use client";

import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Select from '../common/Select';
import Checkbox from '../common/Checkbox';
import Button from '../common/Button';
import { Feedback, Teacher, Course } from '../../types';
import { 
  getFeedbacks, 
  getFeedbacksByTeacher, 
  getFeedbacksByCourse, 

  getTeachers,
  getCourses
} from '../../firebase/services';

const FeedbackTable: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [teacherFilter, setTeacherFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [anonymousFilter, setAnonymousFilter] = useState<boolean | null>(null);
  
  // Expanded feedback details
  const [expandedFeedbackId, setExpandedFeedbackId] = useState<string | null>(null);
  
  useEffect(() => {
    fetchInitialData();
  }, []);
  
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [feedbacksData, teachersData, coursesData] = await Promise.all([
        getFeedbacks(),
        getTeachers(),
        getCourses()
      ]);
      
      setFeedbacks(feedbacksData);
      setTeachers(teachersData);
      setCourses(coursesData);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const applyFilters = async () => {
    try {
      setLoading(true);
      let filteredFeedbacks: Feedback[] = [];
      
      if (teacherFilter && courseFilter) {
        // If both filters are applied, get all feedbacks and filter manually
        const allFeedbacks = await getFeedbacks();
        filteredFeedbacks = allFeedbacks.filter(
          (feedback) => 
            feedback.teacherId === teacherFilter && 
            feedback.courseId === courseFilter
        );
      } else if (teacherFilter) {
        filteredFeedbacks = await getFeedbacksByTeacher(teacherFilter);
      } else if (courseFilter) {
        filteredFeedbacks = await getFeedbacksByCourse(courseFilter);
      } else {
        filteredFeedbacks = await getFeedbacks();
      }
      
      // Apply anonymous filter if set
      if (anonymousFilter !== null) {
        filteredFeedbacks = filteredFeedbacks.filter(
          (feedback) => feedback.isAnonymous === anonymousFilter
        );
      }
      
      setFeedbacks(filteredFeedbacks);
      setError(null);
    } catch (err) {
      console.error('Error applying filters:', err);
      setError('Failed to apply filters. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const resetFilters = () => {
    setTeacherFilter('');
    setCourseFilter('');
    setAnonymousFilter(null);
    fetchInitialData();
  };
  
  const toggleExpandFeedback = (id: string) => {
    if (expandedFeedbackId === id) {
      setExpandedFeedbackId(null);
    } else {
      setExpandedFeedbackId(id);
    }
  };
  
  const getTeacherName = (teacherId: string) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher ? teacher.name : 'Unknown Teacher';
  };
  
  const getCourseName = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.name : 'Unknown Course';
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const calculateAverageRating = (feedback: Feedback) => {
    const { scores } = feedback;
    const allScores = [
      scores.professionalKnowledge.clearExplanations,
      scores.professionalKnowledge.upToDateKnowledge,
      scores.teachingMethods.suitableForStudents,
      scores.teachingMethods.diverseMethods,
      scores.communication.friendlyAttitude,
      scores.communication.listeningSkills,
      scores.learningOutcomes.progressFelt,
      scores.learningOutcomes.achievedGoals
    ];
    
    const sum = allScores.reduce((acc, score) => acc + score, 0);
    return (sum / allScores.length).toFixed(1);
  };
  
  if (loading && feedbacks.length === 0) {
    return <div className="text-center py-4">Loading...</div>;
  }
  
  return (
    <Card title="Đánh giá từ học viên">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            id="teacherFilter"
            name="teacherFilter"
            label="Lọc theo giảng viên"
            placeholder="Tất cả giảng viên"
            options={[
              { value: '', label: 'Tất cả giảng viên' },
              ...teachers.map((teacher) => ({
                value: teacher.id,
                label: teacher.name
              }))
            ]}
            value={teacherFilter}
            onChange={(e) => setTeacherFilter(e.target.value)}
          />
          
          <Select
            id="courseFilter"
            name="courseFilter"
            label="Lọc theo khóa học"
            placeholder="Tất cả khóa học"
            options={[
              { value: '', label: 'Tất cả khóa học' },
              ...courses.map((course) => ({
                value: course.id,
                label: course.name
              }))
            ]}
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          />
          
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lọc theo ẩn danh
            </label>
            <div className="flex space-x-4 mt-2">
              <Checkbox
                id="anonymousYes"
                name="anonymousYes"
                label="Ẩn danh"
                checked={anonymousFilter === true}
                onChange={() => setAnonymousFilter(true)}
              />
              <Checkbox
                id="anonymousNo"
                name="anonymousNo"
                label="Không ẩn danh"
                checked={anonymousFilter === false}
                onChange={() => setAnonymousFilter(false)}
              />
              <Checkbox
                id="anonymousAll"
                name="anonymousAll"
                label="Tất cả"
                checked={anonymousFilter === null}
                onChange={() => setAnonymousFilter(null)}
              />
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button type="button" variant="primary" onClick={applyFilters}>
            Áp dụng bộ lọc
          </Button>
          <Button type="button" variant="outline" onClick={resetFilters}>
            Đặt lại bộ lọc
          </Button>
        </div>
      </div>
      
      {feedbacks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Không có đánh giá nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giảng viên
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khóa học
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đánh giá TB
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ẩn danh
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks.map((feedback) => (
                <React.Fragment key={feedback.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTeacherName(feedback.teacherId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getCourseName(feedback.courseId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#fedac2] text-[#fc5d01]">
                        {calculateAverageRating(feedback)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(feedback.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {feedback.isAnonymous ? 'Có' : 'Không'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => toggleExpandFeedback(feedback.id)}
                        className="text-[#fc5d01] hover:text-[#fd7f33]"
                      >
                        {expandedFeedbackId === feedback.id ? 'Ẩn' : 'Xem'}
                      </button>
                    </td>
                  </tr>
                  
                  {expandedFeedbackId === feedback.id && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 bg-gray-50">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Đánh giá chuyên môn</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>
                                  Giải đáp rõ ràng và dễ hiểu: {feedback.scores.professionalKnowledge.clearExplanations}/5
                                  {feedback.scores.professionalKnowledge.clearExplanationsReason && (
                                    <div className="ml-2 mt-1 text-xs italic text-gray-600 bg-gray-100 p-1 rounded">
                                      Lý do: {feedback.scores.professionalKnowledge.clearExplanationsReason}
                                    </div>
                                  )}
                                </li>
                                <li>
                                  Nắm vững nội dung và kiến thức cập nhật: {feedback.scores.professionalKnowledge.upToDateKnowledge}/5
                                  {feedback.scores.professionalKnowledge.upToDateKnowledgeReason && (
                                    <div className="ml-2 mt-1 text-xs italic text-gray-600 bg-gray-100 p-1 rounded">
                                      Lý do: {feedback.scores.professionalKnowledge.upToDateKnowledgeReason}
                                    </div>
                                  )}
                                </li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Phương pháp giảng dạy</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>
                                  Phù hợp với nhu cầu học viên: {feedback.scores.teachingMethods.suitableForStudents}/5
                                  {feedback.scores.teachingMethods.suitableForStudentsReason && (
                                    <div className="ml-2 mt-1 text-xs italic text-gray-600 bg-gray-100 p-1 rounded">
                                      Lý do: {feedback.scores.teachingMethods.suitableForStudentsReason}
                                    </div>
                                  )}
                                </li>
                                <li>
                                  Sử dụng nhiều phương pháp để giải thích: {feedback.scores.teachingMethods.diverseMethods}/5
                                  {feedback.scores.teachingMethods.diverseMethodsReason && (
                                    <div className="ml-2 mt-1 text-xs italic text-gray-600 bg-gray-100 p-1 rounded">
                                      Lý do: {feedback.scores.teachingMethods.diverseMethodsReason}
                                    </div>
                                  )}
                                </li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Giao tiếp & tương tác</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>
                                  Thái độ thân thiện, dễ tiếp cận: {feedback.scores.communication.friendlyAttitude}/5
                                  {feedback.scores.communication.friendlyAttitudeReason && (
                                    <div className="ml-2 mt-1 text-xs italic text-gray-600 bg-gray-100 p-1 rounded">
                                      Lý do: {feedback.scores.communication.friendlyAttitudeReason}
                                    </div>
                                  )}
                                </li>
                                <li>
                                  Biết lắng nghe học viên: {feedback.scores.communication.listeningSkills}/5
                                  {feedback.scores.communication.listeningSkillsReason && (
                                    <div className="ml-2 mt-1 text-xs italic text-gray-600 bg-gray-100 p-1 rounded">
                                      Lý do: {feedback.scores.communication.listeningSkillsReason}
                                    </div>
                                  )}
                                </li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Kết quả học tập</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>
                                  Học viên có cảm thấy tiến bộ không?: {feedback.scores.learningOutcomes.progressFelt}/5
                                  {feedback.scores.learningOutcomes.progressFeltReason && (
                                    <div className="ml-2 mt-1 text-xs italic text-gray-600 bg-gray-100 p-1 rounded">
                                      Lý do: {feedback.scores.learningOutcomes.progressFeltReason}
                                    </div>
                                  )}
                                </li>
                                <li>
                                  Có giúp đạt được mục tiêu học tập không?: {feedback.scores.learningOutcomes.achievedGoals}/5
                                  {feedback.scores.learningOutcomes.achievedGoalsReason && (
                                    <div className="ml-2 mt-1 text-xs italic text-gray-600 bg-gray-100 p-1 rounded">
                                      Lý do: {feedback.scores.learningOutcomes.achievedGoalsReason}
                                    </div>
                                  )}
                                </li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-700">Điều học viên thích nhất</h4>
                            <p className="text-sm bg-white p-3 border rounded">{feedback.comments.liked || 'Không có phản hồi'}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-700">Điều học viên muốn cải thiện</h4>
                            <p className="text-sm bg-white p-3 border rounded">{feedback.comments.improvements || 'Không có phản hồi'}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default FeedbackTable;
