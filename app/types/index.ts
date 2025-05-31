export interface Teacher {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  text: string;
  category: 'professionalKnowledge' | 'teachingMethods' | 'communication' | 'learningOutcomes';
  order: number;
}

export interface FeedbackScores {
  professionalKnowledge: {
    clearExplanations: number;
    clearExplanationsReason?: string;
    upToDateKnowledge: number;
    upToDateKnowledgeReason?: string;
  };
  teachingMethods: {
    suitableForStudents: number;
    suitableForStudentsReason?: string;
    diverseMethods: number;
    diverseMethodsReason?: string;
  };
  communication: {
    friendlyAttitude: number;
    friendlyAttitudeReason?: string;
    listeningSkills: number;
    listeningSkillsReason?: string;
  };
  learningOutcomes: {
    progressFelt: number;
    progressFeltReason?: string;
    achievedGoals: number;
    achievedGoalsReason?: string;
  };
}

export interface FeedbackComments {
  liked: string;
  improvements: string;
}

export interface SharingPreferences {
  allowFacebookShare: boolean;
  allowGoogleShare: boolean;
  agreedToShare: boolean;
}

export interface Feedback {
  id: string;
  teacherId: string;
  courseId: string;
  studentName: string;
  scores: FeedbackScores;
  comments: FeedbackComments;
  sharingPreferences: SharingPreferences;
  isAnonymous: boolean;
  timestamp: Date;
}
