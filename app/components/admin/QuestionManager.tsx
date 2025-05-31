"use client";

import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import Card from '../common/Card';
import { Question } from '../../types';
import { 
  getQuestions, 
  addQuestion, 
  updateQuestion, 
  deleteQuestion 
} from '../../firebase/services';

const QuestionManager: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionCategory, setNewQuestionCategory] = useState<Question['category']>('professionalKnowledge');
  const [newQuestionOrder, setNewQuestionOrder] = useState(1);
  
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [editText, setEditText] = useState('');
  const [editCategory, setEditCategory] = useState<Question['category']>('professionalKnowledge');
  const [editOrder, setEditOrder] = useState(1);
  
  useEffect(() => {
    fetchQuestions();
  }, []);
  
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const questionsData = await getQuestions();
      setQuestions(questionsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load questions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newQuestionText.trim()) {
      return;
    }
    
    try {
      const newQuestion = await addQuestion({ 
        text: newQuestionText.trim(),
        category: newQuestionCategory,
        order: newQuestionOrder
      });
      
      setQuestions([...questions, newQuestion]);
      setNewQuestionText('');
      setNewQuestionCategory('professionalKnowledge');
      setNewQuestionOrder(1);
    } catch (err) {
      console.error('Error adding question:', err);
      setError('Failed to add question. Please try again later.');
    }
  };
  
  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setEditText(question.text);
    setEditCategory(question.category);
    setEditOrder(question.order);
  };
  
  const handleUpdateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingQuestion || !editText.trim()) {
      return;
    }
    
    try {
      await updateQuestion(editingQuestion.id, { 
        text: editText.trim(),
        category: editCategory,
        order: editOrder
      });
      
      setQuestions(
        questions.map((question) =>
          question.id === editingQuestion.id
            ? { 
                ...question, 
                text: editText.trim(),
                category: editCategory,
                order: editOrder
              }
            : question
        )
      );
      
      setEditingQuestion(null);
      setEditText('');
      setEditCategory('professionalKnowledge');
      setEditOrder(1);
    } catch (err) {
      console.error('Error updating question:', err);
      setError('Failed to update question. Please try again later.');
    }
  };
  
  const handleDeleteQuestion = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
      return;
    }
    
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (err) {
      console.error('Error deleting question:', err);
      setError('Failed to delete question. Please try again later.');
    }
  };
  
  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setEditText('');
    setEditCategory('professionalKnowledge');
    setEditOrder(1);
  };
  
  const categoryOptions = [
    { value: 'professionalKnowledge', label: 'Chuyên môn giảng viên' },
    { value: 'teachingMethods', label: 'Phương pháp giảng dạy' },
    { value: 'communication', label: 'Giao tiếp & tương tác' },
    { value: 'learningOutcomes', label: 'Kết quả học tập' }
  ];
  
  const getCategoryLabel = (category: Question['category']) => {
    const option = categoryOptions.find(opt => opt.value === category);
    return option ? option.label : category;
  };
  
  if (loading && questions.length === 0) {
    return <div className="text-center py-4">Loading...</div>;
  }
  
  return (
    <Card title="Quản lý câu hỏi đánh giá">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="mb-6">
        <form onSubmit={handleAddQuestion} className="space-y-4">
          <Input
            id="newQuestionText"
            name="newQuestionText"
            label="Nội dung câu hỏi mới"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            required
          />
          
          <Select
            id="newQuestionCategory"
            name="newQuestionCategory"
            label="Danh mục"
            options={categoryOptions}
            value={newQuestionCategory}
            onChange={(e) => setNewQuestionCategory(e.target.value as Question['category'])}
            required
          />
          
          <Input
            id="newQuestionOrder"
            name="newQuestionOrder"
            label="Thứ tự hiển thị"
            type="number"
            value={newQuestionOrder.toString()}
            onChange={(e) => setNewQuestionOrder(parseInt(e.target.value) || 1)}
            required
          />
          
          <Button type="submit" variant="primary">
            Thêm câu hỏi
          </Button>
        </form>
      </div>
      
      <div className="space-y-4">
        {questions.length === 0 ? (
          <p className="text-gray-500 text-center">Chưa có câu hỏi nào.</p>
        ) : (
          <div>
            {categoryOptions.map(category => {
              const categoryQuestions = questions.filter(q => q.category === category.value);
              
              if (categoryQuestions.length === 0) return null;
              
              return (
                <div key={category.value} className="mb-6">
                  <h3 className="text-lg font-medium text-[#fc5d01] mb-3">{category.label}</h3>
                  
                  {categoryQuestions
                    .sort((a, b) => a.order - b.order)
                    .map((question) => (
                      <div
                        key={question.id}
                        className="border border-gray-200 rounded-md p-4 mb-3 flex justify-between items-center"
                      >
                        {editingQuestion?.id === question.id ? (
                          <form
                            onSubmit={handleUpdateQuestion}
                            className="w-full space-y-4"
                          >
                            <Input
                              id={`edit-${question.id}`}
                              name={`edit-${question.id}`}
                              label="Nội dung câu hỏi"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              required
                            />
                            
                            <Select
                              id={`edit-category-${question.id}`}
                              name={`edit-category-${question.id}`}
                              label="Danh mục"
                              options={categoryOptions}
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value as Question['category'])}
                              required
                            />
                            
                            <Input
                              id={`edit-order-${question.id}`}
                              name={`edit-order-${question.id}`}
                              label="Thứ tự hiển thị"
                              type="number"
                              value={editOrder.toString()}
                              onChange={(e) => setEditOrder(parseInt(e.target.value) || 1)}
                              required
                            />
                            
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
                            <div className="flex-grow">
                              <div className="text-gray-800">{question.text}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                Thứ tự: {question.order}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => handleEditQuestion(question)}
                              >
                                Sửa
                              </Button>
                              <Button
                                type="button"
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteQuestion(question.id)}
                              >
                                Xóa
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuestionManager;
