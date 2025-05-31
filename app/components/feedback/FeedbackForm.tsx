"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';
import Card from '../common/Card';
import Select from '../common/Select';
import CourseTeacherSelector from './CourseTeacherSelector';
import ProfessionalKnowledgeSection from './ProfessionalKnowledgeSection';
import TeachingMethodsSection from './TeachingMethodsSection';
import CommunicationSection from './CommunicationSection';
import LearningOutcomesSection from './LearningOutcomesSection';
import CommentsSection from './CommentsSection';
import PersonalizedReviewSection from './PersonalizedReviewSection';
import ExperienceSharingSection from './ExperienceSharingSection';
import { addFeedback } from '../../firebase/services';
import { FeedbackScores, FeedbackComments, SharingPreferences } from '../../types';
import { getTeacherById, getCourseById } from '../../firebase/services';

const FeedbackForm: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Form state
  const [teacherId, setTeacherId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [studentName, setStudentName] = useState('');
  
  // Professional Knowledge
  const [clearExplanations, setClearExplanations] = useState(0);
  const [clearExplanationsReason, setClearExplanationsReason] = useState('');
  const [upToDateKnowledge, setUpToDateKnowledge] = useState(0);
  const [upToDateKnowledgeReason, setUpToDateKnowledgeReason] = useState('');
  
  // Teaching Methods
  const [suitableForStudents, setSuitableForStudents] = useState(0);
  const [suitableForStudentsReason, setSuitableForStudentsReason] = useState('');
  const [diverseMethods, setDiverseMethods] = useState(0);
  const [diverseMethodsReason, setDiverseMethodsReason] = useState('');
  
  // Communication
  const [friendlyAttitude, setFriendlyAttitude] = useState(0);
  const [friendlyAttitudeReason, setFriendlyAttitudeReason] = useState('');
  const [listeningSkills, setListeningSkills] = useState(0);
  const [listeningSkillsReason, setListeningSkillsReason] = useState('');
  
  // Learning Outcomes
  const [progressFelt, setProgressFelt] = useState(0);
  const [progressFeltReason, setProgressFeltReason] = useState('');
  const [achievedGoals, setAchievedGoals] = useState(0);
  const [achievedGoalsReason, setAchievedGoalsReason] = useState('');
  
  // For PersonalizedReviewSection
  const [teacherName, setTeacherName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [allRatings, setAllRatings] = useState<number[]>([]);
  const [target, setTarget] = useState('');
  
  // Sharing Preferences
  const [sharingPreferences, setSharingPreferences] = useState<SharingPreferences>({
    allowFacebookShare: false,
    allowGoogleShare: false,
    agreedToShare: false
  });
  
  // Check if all ratings are 5 stars
  const allRatingsAreFiveStars = clearExplanations === 5 && 
                                 upToDateKnowledge === 5 && 
                                 suitableForStudents === 5 && 
                                 diverseMethods === 5 && 
                                 friendlyAttitude === 5 && 
                                 listeningSkills === 5 && 
                                 progressFelt === 5 && 
                                 achievedGoals === 5;
  
  // Fetch teacher and course names when IDs change
  useEffect(() => {
    const fetchTeacherAndCourse = async () => {
      if (teacherId) {
        try {
          const teacher = await getTeacherById(teacherId);
          if (teacher) {
            setTeacherName(teacher.name);
          }
        } catch (error) {
          console.error('Error fetching teacher:', error);
        }
      }
      
      if (courseId) {
        try {
          const course = await getCourseById(courseId);
          if (course) {
            setCourseName(course.name);
          }
        } catch (error) {
          console.error('Error fetching course:', error);
        }
      }
    };
    
    fetchTeacherAndCourse();
  }, [teacherId, courseId]);
  
  // Update allRatings when any rating changes
  useEffect(() => {
    setAllRatings([
      clearExplanations,
      upToDateKnowledge,
      suitableForStudents,
      diverseMethods,
      friendlyAttitude,
      listeningSkills,
      progressFelt,
      achievedGoals
    ]);
  }, [
    clearExplanations,
    upToDateKnowledge,
    suitableForStudents,
    diverseMethods,
    friendlyAttitude,
    listeningSkills,
    progressFelt,
    achievedGoals
  ]);
  
  // Comments
  const [liked, setLiked] = useState('');
  const [improvements, setImprovements] = useState('');
  
  // Validation errors
  const [errors, setErrors] = useState<{
    teacherId?: string;
    courseId?: string;
    studentName?: string;
    clearExplanations?: string;
    upToDateKnowledge?: string;
    suitableForStudents?: string;
    diverseMethods?: string;
    friendlyAttitude?: string;
    listeningSkills?: string;
    progressFelt?: string;
    achievedGoals?: string;
    liked?: string;
    improvements?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!teacherId) newErrors.teacherId = 'Vui lòng chọn giảng viên';
    if (!courseId) newErrors.courseId = 'Vui lòng chọn khóa học';
    if (!studentName.trim()) newErrors.studentName = 'Vui lòng nhập tên của bạn';
    
    if (clearExplanations === 0) newErrors.clearExplanations = 'Vui lòng đánh giá mục này';
    else if (clearExplanations < 5 && !clearExplanationsReason.trim()) 
      newErrors.clearExplanations = 'Vui lòng cung cấp lý do cho đánh giá dưới 5 sao';
    
    if (upToDateKnowledge === 0) newErrors.upToDateKnowledge = 'Vui lòng đánh giá mục này';
    else if (upToDateKnowledge < 5 && !upToDateKnowledgeReason.trim())
      newErrors.upToDateKnowledge = 'Vui lòng cung cấp lý do cho đánh giá dưới 5 sao';
    
    if (suitableForStudents === 0) newErrors.suitableForStudents = 'Vui lòng đánh giá mục này';
    else if (suitableForStudents < 5 && !suitableForStudentsReason.trim())
      newErrors.suitableForStudents = 'Vui lòng cung cấp lý do cho đánh giá dưới 5 sao';
    
    if (diverseMethods === 0) newErrors.diverseMethods = 'Vui lòng đánh giá mục này';
    else if (diverseMethods < 5 && !diverseMethodsReason.trim())
      newErrors.diverseMethods = 'Vui lòng cung cấp lý do cho đánh giá dưới 5 sao';
    
    if (friendlyAttitude === 0) newErrors.friendlyAttitude = 'Vui lòng đánh giá mục này';
    else if (friendlyAttitude < 5 && !friendlyAttitudeReason.trim())
      newErrors.friendlyAttitude = 'Vui lòng cung cấp lý do cho đánh giá dưới 5 sao';
    
    if (listeningSkills === 0) newErrors.listeningSkills = 'Vui lòng đánh giá mục này';
    else if (listeningSkills < 5 && !listeningSkillsReason.trim())
      newErrors.listeningSkills = 'Vui lòng cung cấp lý do cho đánh giá dưới 5 sao';
    
    if (progressFelt === 0) newErrors.progressFelt = 'Vui lòng đánh giá mục này';
    else if (progressFelt < 5 && !progressFeltReason.trim())
      newErrors.progressFelt = 'Vui lòng cung cấp lý do cho đánh giá dưới 5 sao';
    
    if (achievedGoals === 0) newErrors.achievedGoals = 'Vui lòng đánh giá mục này';
    else if (achievedGoals < 5 && !achievedGoalsReason.trim())
      newErrors.achievedGoals = 'Vui lòng cung cấp lý do cho đánh giá dưới 5 sao';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const scores: FeedbackScores = {
        professionalKnowledge: {
          clearExplanations,
          clearExplanationsReason: clearExplanations < 5 && clearExplanationsReason ? clearExplanationsReason : "",
          upToDateKnowledge,
          upToDateKnowledgeReason: upToDateKnowledge < 5 && upToDateKnowledgeReason ? upToDateKnowledgeReason : ""
        },
        teachingMethods: {
          suitableForStudents,
          suitableForStudentsReason: suitableForStudents < 5 && suitableForStudentsReason ? suitableForStudentsReason : "",
          diverseMethods,
          diverseMethodsReason: diverseMethods < 5 && diverseMethodsReason ? diverseMethodsReason : ""
        },
        communication: {
          friendlyAttitude,
          friendlyAttitudeReason: friendlyAttitude < 5 && friendlyAttitudeReason ? friendlyAttitudeReason : "",
          listeningSkills,
          listeningSkillsReason: listeningSkills < 5 && listeningSkillsReason ? listeningSkillsReason : ""
        },
        learningOutcomes: {
          progressFelt,
          progressFeltReason: progressFelt < 5 && progressFeltReason ? progressFeltReason : "",
          achievedGoals,
          achievedGoalsReason: achievedGoals < 5 && achievedGoalsReason ? achievedGoalsReason : ""
        }
      };
      
      const comments: FeedbackComments = {
        liked,
        improvements
      };
      
      await addFeedback({
        teacherId,
        courseId,
        studentName,
        scores,
        comments,
        sharingPreferences,
        isAnonymous: false
      });
      
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTeacherId('');
      setCourseId('');
      setClearExplanations(0);
      setUpToDateKnowledge(0);
      setSuitableForStudents(0);
      setDiverseMethods(0);
      setFriendlyAttitude(0);
      setListeningSkills(0);
      setProgressFelt(0);
      setAchievedGoals(0);
      setLiked('');
      setImprovements('');
      setSharingPreferences({
        allowFacebookShare: false,
        allowGoogleShare: false,
        agreedToShare: false
      });
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Redirect after a delay
      setTimeout(() => {
        router.push('/');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitError('Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại sau.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitSuccess && (
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 text-green-700 p-5 rounded-lg shadow-md relative mb-8 animate-fadeIn">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg">Thành công!</p>
              <p className="text-sm md:text-base">Cảm ơn bạn đã gửi đánh giá. Phản hồi của bạn rất quan trọng đối với chúng tôi.</p>
            </div>
          </div>
        </div>
      )}
      
      {submitError && (
        <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-700 p-5 rounded-lg shadow-md relative mb-8 animate-fadeIn">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg">Lỗi!</p>
              <p className="text-sm md:text-base">{submitError}</p>
            </div>
          </div>
        </div>
      )}
      
      <CourseTeacherSelector
        teacherId={teacherId}
        courseId={courseId}
        onTeacherChange={setTeacherId}
        onCourseChange={setCourseId}
        errors={{
          teacherId: errors.teacherId,
          courseId: errors.courseId
        }}
      />
      
      <Card 
        variant="glass" 
        animate={true}
        icon={
          <div className="w-8 h-8 flex items-center justify-center bg-[#fc5d01] rounded-full animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        }
        title="Thông tin học viên"
      >
        <div className="space-y-6">
          <div className="animate-fadeIn">
            <label 
              htmlFor="studentName" 
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Tên của bạn<span className="text-[#fc5d01] ml-1">*</span>
            </label>
            <div className="relative">
              <input
                id="studentName"
                name="studentName"
                type="text"
                placeholder="Nhập tên của bạn"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
                className={`w-full px-4 py-3 border ${
                  errors.studentName ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:outline-none focus:ring-[#fc5d01] focus:border-[#fc5d01] transition-all duration-200`}
              />
              {studentName && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#fc5d01]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            {errors.studentName && (
              <p className="mt-1 text-sm text-red-600 animate-fadeIn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errors.studentName}
              </p>
            )}
          </div>
          
          <div className="animate-fadeIn stagger-1">
            <Select
              id="target"
              name="target"
              label="Mục tiêu điểm số (nếu có)"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              options={[
                { value: '', label: 'Chọn mục tiêu điểm số' },
                { value: '30', label: '30' },
                { value: '36', label: '36' },
                { value: '42', label: '42' },
                { value: '50', label: '50' },
                { value: '58', label: '58' },
                { value: '65', label: '65' },
                { value: '79', label: '79' }
              ]}
            />
          </div>
        </div>
      </Card>
      
      <ProfessionalKnowledgeSection
        clearExplanations={clearExplanations}
        upToDateKnowledge={upToDateKnowledge}
        onClearExplanationsChange={setClearExplanations}
        onUpToDateKnowledgeChange={setUpToDateKnowledge}
        onClearExplanationsReasonChange={setClearExplanationsReason}
        onUpToDateKnowledgeReasonChange={setUpToDateKnowledgeReason}
        errors={{
          clearExplanations: errors.clearExplanations,
          upToDateKnowledge: errors.upToDateKnowledge
        }}
      />
      
      <TeachingMethodsSection
        suitableForStudents={suitableForStudents}
        diverseMethods={diverseMethods}
        onSuitableForStudentsChange={setSuitableForStudents}
        onDiverseMethodsChange={setDiverseMethods}
        onSuitableForStudentsReasonChange={setSuitableForStudentsReason}
        onDiverseMethodsReasonChange={setDiverseMethodsReason}
        errors={{
          suitableForStudents: errors.suitableForStudents,
          diverseMethods: errors.diverseMethods
        }}
      />
      
      <CommunicationSection
        friendlyAttitude={friendlyAttitude}
        listeningSkills={listeningSkills}
        onFriendlyAttitudeChange={setFriendlyAttitude}
        onListeningSkillsChange={setListeningSkills}
        onFriendlyAttitudeReasonChange={setFriendlyAttitudeReason}
        onListeningSkillsReasonChange={setListeningSkillsReason}
        errors={{
          friendlyAttitude: errors.friendlyAttitude,
          listeningSkills: errors.listeningSkills
        }}
      />
      
      <LearningOutcomesSection
        progressFelt={progressFelt}
        achievedGoals={achievedGoals}
        onProgressFeltChange={setProgressFelt}
        onAchievedGoalsChange={setAchievedGoals}
        onProgressFeltReasonChange={setProgressFeltReason}
        onAchievedGoalsReasonChange={setAchievedGoalsReason}
        errors={{
          progressFelt: errors.progressFelt,
          achievedGoals: errors.achievedGoals
        }}
      />
      
      <CommentsSection
        liked={liked}
        improvements={improvements}
        onLikedChange={(e) => setLiked(e.target.value)}
        onImprovementsChange={(e) => setImprovements(e.target.value)}
        errors={{
          liked: errors.liked,
          improvements: errors.improvements
        }}
      />
      
      {allRatingsAreFiveStars && (
        <ExperienceSharingSection
          sharingPreferences={sharingPreferences}
          onSharingPreferencesChange={setSharingPreferences}
        />
      )}
      
      <PersonalizedReviewSection
        teacherName={teacherName}
        courseName={courseName}
        target={target}
        scores={allRatings}
        googleReviewLink="https://g.page/r/CXK9M8j2s65zEAE/review"
        facebookReviewLink="https://www.facebook.com/PTE.Intensive.VN/reviews"
        agreedToShare={sharingPreferences.agreedToShare}
      />
      
      <div className="flex justify-center mt-10 animate-fadeIn stagger-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-lg group bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] hover:from-[#fd7f33] hover:to-[#fc5d01] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
          <span className="relative flex items-center">
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang gửi...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Gửi đánh giá
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
