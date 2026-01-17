import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';

const InterviewContext = createContext();

// Dummy data for initial display
const DUMMY_EXPERIENCES = [
  {
    id: 'dummy-1',
    company: 'Google',
    jobRole: 'Software Engineer',
    overallDifficulty: 'Hard',
    experienceLevel: '2-3 years',
    result: 'Selected',
    anonymous: false,
    rounds: [
      {
        roundName: 'Phone Screen',
        topicsCovered: ['Data Structures', 'Algorithms'],
        questions: ['Design a cache system', 'Reverse a linked list'],
        experience: 'Friendly and straightforward, asked about time complexity'
      },
      {
        roundName: 'On-site Round 1',
        topicsCovered: ['System Design'],
        questions: ['Design YouTube', 'Build a distributed cache'],
        experience: 'Complex system design problems, 45 minutes per round'
      }
    ],
    tips: 'Practice mock interviews, focus on optimization',
    submittedAt: '1/10/2026',
    submittedByEmail: 'sample@example.com'
  },
  {
    id: 'dummy-2',
    company: 'Microsoft',
    jobRole: 'Backend Developer',
    overallDifficulty: 'Medium',
    experienceLevel: '1-2 years',
    result: 'Selected',
    anonymous: false,
    rounds: [
      {
        roundName: 'Technical Interview',
        topicsCovered: ['APIs', 'Databases'],
        questions: ['Design a REST API', 'Optimize SQL queries'],
        experience: 'Focused on practical problem solving'
      }
    ],
    tips: 'Know your fundamentals well, communicate your approach',
    submittedAt: '1/12/2026',
    submittedByEmail: 'developer@example.com'
  },
  {
    id: 'dummy-3',
    company: 'Amazon',
    jobRole: 'Full Stack Developer',
    overallDifficulty: 'Hard',
    experienceLevel: '3+ years',
    result: 'Not Selected',
    anonymous: true,
    rounds: [
      {
        roundName: 'Problem Solving',
        topicsCovered: ['Algorithms', 'Data Structures', 'System Design'],
        questions: ['LeetCode Hard problem', 'Design scalable system'],
        experience: 'Very competitive, needs strong fundamentals'
      }
    ],
    tips: 'Practice on LeetCode daily, understand tradeoffs in design',
    submittedAt: '1/8/2026',
    submittedByEmail: 'engineer@example.com'
  },
  {
    id: 'dummy-4',
    company: 'Meta',
    jobRole: 'Frontend Engineer',
    overallDifficulty: 'Medium',
    experienceLevel: '2-3 years',
    result: 'Selected',
    anonymous: false,
    rounds: [
      {
        roundName: 'JavaScript & React',
        topicsCovered: ['React', 'JavaScript', 'CSS'],
        questions: ['Build a component', 'Explain React hooks'],
        experience: 'Focus on modern JavaScript and React best practices'
      }
    ],
    tips: 'Build real projects, understand component lifecycle',
    submittedAt: '1/5/2026',
    submittedByEmail: 'frontend@example.com'
  },
  {
    id: 'dummy-5',
    company: 'Flipkart',
    jobRole: 'Software Developer',
    overallDifficulty: 'Medium',
    experienceLevel: '0-1 years',
    result: 'Selected',
    anonymous: false,
    rounds: [
      {
        roundName: 'Coding Round',
        topicsCovered: ['Data Structures', 'Basic Algorithms'],
        questions: ['Sort array variants', 'Basic tree traversal'],
        experience: 'Friendly interviewers, focus on approach'
      }
    ],
    tips: 'Clear communication is key, start with brute force then optimize',
    submittedAt: '1/3/2026',
    submittedByEmail: 'newbie@example.com'
  },
  {
    id: 'dummy-6',
    company: 'Dummy Data',
    jobRole: 'Test Engineer',
    overallDifficulty: 'Easy',
    experienceLevel: 'Fresher',
    result: 'Selected',
    anonymous: false,
    rounds: [
      {
        roundName: 'Initial Screening',
        topicsCovered: ['React', 'DSA'],
        questions: ['Basic JavaScript question', 'Array operations'],
        experience: 'Quick and easy, good for understanding process'
      }
    ],
    tips: 'This is dummy data for testing search functionality',
    submittedAt: '1/15/2026',
    submittedByEmail: 'test@example.com'
  }
];

export const InterviewProvider = ({ children }) => {
  const [experiences, setExperiences] = useState(DUMMY_EXPERIENCES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch all experiences from Firestore
  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      const experiencesRef = collection(db, 'experiences');
      const q = query(experiencesRef, orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // Combine Firestore data with dummy data
      const combinedData = [...data, ...DUMMY_EXPERIENCES];
      setExperiences(combinedData);
    } catch (err) {
      console.error('Error fetching experiences:', err);
      setError(err.message);
      // Fallback to dummy data on error
      setExperiences(DUMMY_EXPERIENCES);
    } finally {
      setLoading(false);
    }
  };

  // Fetch experiences on component mount
  useEffect(() => {
    fetchExperiences();
  }, []);

  const addExperience = async (newExperience) => {
    try {
      if (!user) {
        throw new Error('User must be logged in to add experience');
      }

      const experienceData = {
        ...newExperience,
        submittedAt: new Date().toLocaleDateString(),
        submittedBy: user.uid,
        submittedByEmail: user.email,
        createdAt: new Date().getTime(),
      };

      const docRef = await addDoc(collection(db, 'experiences'), experienceData);
      
      // Add the new experience to local state
      setExperiences([
        { id: docRef.id, ...experienceData },
        ...experiences,
      ]);

      return docRef.id;
    } catch (err) {
      console.error('Error adding experience:', err);
      setError(err.message);
      throw err;
    }
  };

  const getExperienceById = (id) => {
    // First, search in local experiences (includes dummy data)
    const localExperience = experiences.find(exp => exp.id === id);
    if (localExperience) {
      return localExperience;
    }
    // If not found locally, return null (Firebase fetch can be added here if needed)
    return null;
  };

  const filterExperiences = (filters) => {
    return experiences.filter((exp) => {
      const matchesCompany =
        !filters.company ||
        exp.company.toLowerCase().includes(filters.company.toLowerCase());
      const matchesRole =
        !filters.role ||
        exp.jobRole.toLowerCase().includes(filters.role.toLowerCase());
      const matchesDifficulty =
        !filters.difficulty ||
        exp.overallDifficulty === filters.difficulty;
      const matchesExperience =
        !filters.experienceLevel ||
        exp.experienceLevel === filters.experienceLevel;
      const matchesTopic =
        !filters.topic ||
        exp.rounds.some((round) => round.topicsCovered.includes(filters.topic));

      return (
        matchesCompany &&
        matchesRole &&
        matchesDifficulty &&
        matchesExperience &&
        matchesTopic
      );
    });
  };

  const value = {
    experiences,
    loading,
    error,
    addExperience,
    getExperienceById,
    filterExperiences,
    fetchExperiences,
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};
