import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';
import { Teacher, Course, Feedback, Question } from '../types';

// Teachers Collection
export const addTeacher = async (teacher: Omit<Teacher, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'teachers'), teacher);
    return { id: docRef.id, ...teacher };
  } catch (error) {
    console.error('Error adding teacher: ', error);
    throw error;
  }
};

export const getTeachers = async (): Promise<Teacher[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'teachers'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Teacher));
  } catch (error) {
    console.error('Error getting teachers: ', error);
    throw error;
  }
};

export const getTeacherById = async (id: string): Promise<Teacher | null> => {
  try {
    const teacherRef = doc(db, 'teachers', id);
    const teacherSnap = await getDoc(teacherRef);
    
    if (teacherSnap.exists()) {
      return {
        id: teacherSnap.id,
        ...teacherSnap.data()
      } as Teacher;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting teacher by ID: ', error);
    throw error;
  }
};

export const updateTeacher = async (id: string, data: Partial<Teacher>) => {
  try {
    const teacherRef = doc(db, 'teachers', id);
    await updateDoc(teacherRef, data);
    return { id, ...data };
  } catch (error) {
    console.error('Error updating teacher: ', error);
    throw error;
  }
};

export const deleteTeacher = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'teachers', id));
    return id;
  } catch (error) {
    console.error('Error deleting teacher: ', error);
    throw error;
  }
};

// Courses Collection
export const addCourse = async (course: Omit<Course, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'courses'), course);
    return { id: docRef.id, ...course };
  } catch (error) {
    console.error('Error adding course: ', error);
    throw error;
  }
};

export const getCourses = async (): Promise<Course[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'courses'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Course));
  } catch (error) {
    console.error('Error getting courses: ', error);
    throw error;
  }
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  try {
    const courseRef = doc(db, 'courses', id);
    const courseSnap = await getDoc(courseRef);
    
    if (courseSnap.exists()) {
      return {
        id: courseSnap.id,
        ...courseSnap.data()
      } as Course;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting course by ID: ', error);
    throw error;
  }
};

export const updateCourse = async (id: string, data: Partial<Course>) => {
  try {
    const courseRef = doc(db, 'courses', id);
    await updateDoc(courseRef, data);
    return { id, ...data };
  } catch (error) {
    console.error('Error updating course: ', error);
    throw error;
  }
};

export const deleteCourse = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'courses', id));
    return id;
  } catch (error) {
    console.error('Error deleting course: ', error);
    throw error;
  }
};

// Feedbacks Collection
export const addFeedback = async (feedback: Omit<Feedback, 'id' | 'timestamp'>) => {
  try {
    const feedbackWithTimestamp = {
      ...feedback,
      timestamp: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'feedbacks'), feedbackWithTimestamp);
    return { 
      id: docRef.id, 
      ...feedback,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error adding feedback: ', error);
    throw error;
  }
};

export const getFeedbacks = async (): Promise<Feedback[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'feedbacks'));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: (data.timestamp as Timestamp).toDate()
      } as Feedback;
    });
  } catch (error) {
    console.error('Error getting feedbacks: ', error);
    throw error;
  }
};

export const getFeedbacksByTeacher = async (teacherId: string): Promise<Feedback[]> => {
  try {
    const q = query(collection(db, 'feedbacks'), where('teacherId', '==', teacherId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: (data.timestamp as Timestamp).toDate()
      } as Feedback;
    });
  } catch (error) {
    console.error('Error getting feedbacks by teacher: ', error);
    throw error;
  }
};

export const getFeedbacksByCourse = async (courseId: string): Promise<Feedback[]> => {
  try {
    const q = query(collection(db, 'feedbacks'), where('courseId', '==', courseId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: (data.timestamp as Timestamp).toDate()
      } as Feedback;
    });
  } catch (error) {
    console.error('Error getting feedbacks by course: ', error);
    throw error;
  }
};

export const getFeedbacksByAnonymous = async (isAnonymous: boolean): Promise<Feedback[]> => {
  try {
    const q = query(collection(db, 'feedbacks'), where('isAnonymous', '==', isAnonymous));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: (data.timestamp as Timestamp).toDate()
      } as Feedback;
    });
  } catch (error) {
    console.error('Error getting feedbacks by anonymous status: ', error);
    throw error;
  }
};

export const deleteFeedback = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'feedbacks', id));
    return id;
  } catch (error) {
    console.error('Error deleting feedback: ', error);
    throw error;
  }
};

// Questions Collection
export const addQuestion = async (question: Omit<Question, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'questions'), question);
    return { id: docRef.id, ...question };
  } catch (error) {
    console.error('Error adding question: ', error);
    throw error;
  }
};

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const q = query(collection(db, 'questions'), orderBy('category'), orderBy('order'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Question));
  } catch (error) {
    console.error('Error getting questions: ', error);
    throw error;
  }
};

export const getQuestionsByCategory = async (category: Question['category']): Promise<Question[]> => {
  try {
    const q = query(
      collection(db, 'questions'), 
      where('category', '==', category),
      orderBy('order')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Question));
  } catch (error) {
    console.error(`Error getting questions by category ${category}: `, error);
    throw error;
  }
};

export const updateQuestion = async (id: string, data: Partial<Question>) => {
  try {
    const questionRef = doc(db, 'questions', id);
    await updateDoc(questionRef, data);
    return { id, ...data };
  } catch (error) {
    console.error('Error updating question: ', error);
    throw error;
  }
};

export const deleteQuestion = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'questions', id));
    return id;
  } catch (error) {
    console.error('Error deleting question: ', error);
    throw error;
  }
};
