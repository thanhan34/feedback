import { addTeacher, addCourse, addQuestion } from '../firebase/services';
import { Question } from '../types';

/**
 * Initialize the database with sample data
 * This function should be called once to set up the initial data
 */
export const initializeDatabase = async () => {
  try {
    console.log('Initializing database with sample data...');
    
    // Add sample teachers
    const teachers = [
      { name: 'Nguyễn Văn A' },
      { name: 'Trần Thị B' },
      { name: 'Lê Văn C' },
      { name: 'Phạm Thị D' },
      { name: 'Hoàng Văn E' }
    ];
    
    // Add sample courses
    const courses = [
      { name: 'PTE Intensive' },
      { name: 'IELTS Academic' },
      { name: 'IELTS General' },
      { name: 'Giao tiếp cơ bản' },
      { name: 'Giao tiếp nâng cao' },
      { name: 'Business English' }
    ];
    
    // Add sample questions
    const questions: Omit<Question, 'id'>[] = [
      // Professional Knowledge
      { 
        text: 'Giải đáp rõ ràng và dễ hiểu', 
        category: 'professionalKnowledge' as const, 
        order: 1 
      },
      { 
        text: 'Nắm vững nội dung và kiến thức cập nhật', 
        category: 'professionalKnowledge' as const, 
        order: 2 
      },
      
      // Teaching Methods
      { 
        text: 'Phù hợp với nhu cầu học viên', 
        category: 'teachingMethods' as const, 
        order: 1 
      },
      { 
        text: 'Sử dụng nhiều phương pháp để giải thích', 
        category: 'teachingMethods' as const, 
        order: 2 
      },
      
      // Communication
      { 
        text: 'Thái độ thân thiện, dễ tiếp cận', 
        category: 'communication' as const, 
        order: 1 
      },
      { 
        text: 'Biết lắng nghe học viên', 
        category: 'communication' as const, 
        order: 2 
      },
      
      // Learning Outcomes
      { 
        text: 'Học viên có cảm thấy tiến bộ không?', 
        category: 'learningOutcomes' as const, 
        order: 1 
      },
      { 
        text: 'Có giúp đạt được mục tiêu học tập không?', 
        category: 'learningOutcomes' as const, 
        order: 2 
      }
    ];
    
    // Add teachers to database
    for (const teacher of teachers) {
      await addTeacher(teacher);
      console.log(`Added teacher: ${teacher.name}`);
    }
    
    // Add courses to database
    for (const course of courses) {
      await addCourse(course);
      console.log(`Added course: ${course.name}`);
    }
    
    // Add questions to database
    for (const question of questions) {
      await addQuestion(question);
      console.log(`Added question: ${question.text}`);
    }
    
    console.log('Database initialization completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error initializing database:', error);
    return { success: false, error };
  }
};
