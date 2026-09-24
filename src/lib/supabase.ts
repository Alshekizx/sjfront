import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || `https://${projectId}.supabase.co`;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type AcademicLevelRow = {
  id: string;
  level: number;
  name: string;
  short_name: string;
  description: string;
  courses_count: number;
  topics_count: number;
  price: number;
  duration_months: number;
  color: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type CourseRow = {
  id: string;
  title: string;
  code: string;
  description: string;
  level: number;
  instructor: string;
  thumbnail: string | null;
  topics_count: number;
  completed_topics: number;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
};

export type TopicRow = {
  id: string;
  course_id: string;
  title: string;
  completed: boolean;
  has_video: boolean;
  has_notes: boolean;
  sort_order: number;
  content: string | null;
};

export type CaseLawRow = {
  id: string;
  name: string;
  citation: string;
  year: number;
  court: string;
  topic: string;
  course: string;
  principle: string;
  significance: string;
  bookmarked: boolean;
  created_at: string;
};

export type PracticeQuestionRow = {
  id: string;
  course: string;
  topic: string;
  type: 'MCQ' | 'ESSAY' | 'PROBLEM';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correct_option: number;
  explanation: string;
  created_at: string;
};

export type NotificationRow = {
  id: string;
  user_id: string | null;
  type: string;
  title: string;
  message: string;
  read: boolean;
  action: string | null;
  action_path: string | null;
  created_at: string;
};
