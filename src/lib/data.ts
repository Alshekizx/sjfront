import { reportDataError, safeWebUrl } from './content';
import { supabase } from './supabase';

export type AcademicLevelData = { id: string; level: number; name: string; shortName: string; description: string; courses: number; topics: number; price: number; duration: string; objectives: string[]; color: string };
export type CourseData = { id: string; level: number; code: string; title: string; description: string; topics: number; completedTopics: number; thumbnail: string; instructor: string };
export type TopicData = { id: string; courseId: string; title: string; completed: boolean; bookmarked: boolean; courseTitle: string; hasVideo: boolean; hasNotes: boolean; content?: string; videoUrl?: string };
export type CaseData = { id: string; name: string; citation: string; year: number; court: string; topic: string; course: string; principle: string; significance: string; bookmarked: boolean };
export type PracticeQuestionData = { id: string; type: 'MCQ' | 'ESSAY' | 'PROBLEM'; course: string; topic: string; difficulty: 'Easy' | 'Medium' | 'Hard'; question: string; options: string[]; correctOption: number; explanation: string };
export type NotificationData = { id: string; type: string; title: string; message: string; time: string; read: boolean; action?: string; actionPath?: string };
export type ResourceData = { id: string; title: string; description: string; storagePath: string };
export type StudentSubscription = { id: string; level: number; levelName: string; status: 'active' | 'trial' | 'expired'; startDate: string; expiryDate: string; price: number; reference: string };
export type FaqData = { question: string; answer: string };
export type TestimonialData = { name: string; level: string; quote: string; university: string };
type LevelRow = { id: string; level: number; name: string; description: string; price: number; duration_months: number; objectives: string[] };

const fallbackThumbnail = '';
const levelNumber = (value: unknown) => Number(String(value ?? '').replace(/\D/g, '')) / (String(value ?? '').includes('L') ? 100 : 1);

export async function getAcademicLevels(): Promise<AcademicLevelData[]> {
  const [{ data: levels, error }, countsResult] = await Promise.all([
    supabase.from('academic_levels').select('id,level,name,description,price,duration_months,objectives').eq('status', 'published').order('sort_order'),
    supabase.rpc('published_level_counts'),
  ]);
  if (error || countsResult.error) { reportDataError('Unable to load academic levels. Please try again.'); return []; }
  return ((levels ?? []) as LevelRow[]).map(row => {
    const counts = (countsResult.data || []).find((item: any) => item.level_id === row.id);
    return { id: row.id, level: row.level / 100, name: row.name, shortName: `${row.level}L`, description: row.description, courses: Number(counts?.course_count || 0), topics: Number(counts?.topic_count || 0), price: Number(row.price), duration: `${row.duration_months} months`, objectives: Array.isArray(row.objectives) ? row.objectives : [], color: '#1B4F72' };
  });
}

export async function getCourses(studentId?: string): Promise<CourseData[]> {
  const [{ data: rows, error }, progressResult] = await Promise.all([
    supabase.from('courses').select('id,title,code,instructor,description,academic_level,academic_level_id,thumbnail_url,sort_order,academic_levels(level),lessons(id,status)').eq('status', 'published').order('sort_order'),
    studentId ? supabase.from('student_lesson_progress').select('lesson_id,completed_at').eq('student_id', studentId).not('completed_at', 'is', null) : Promise.resolve({ data: [] as { lesson_id: string }[] }),
  ]);
  if (error) { reportDataError('Unable to load content. Please check your connection and try again.'); console.error('Supabase courses query failed:', error.message); return []; }
  if ('error' in progressResult && progressResult.error) reportDataError('Unable to load your lesson progress.');
  const complete = new Set((progressResult.data ?? []).map(row => row.lesson_id));
  return (rows ?? []).map((row: any) => {
    const lessons = (row.lessons ?? []).filter((lesson: any) => lesson.status === 'published');
    const rawLevel = Number(row.academic_levels?.level ?? levelNumber(row.academic_level));
    return { id: row.id, level: rawLevel >= 100 ? rawLevel / 100 : rawLevel, code: row.code ?? 'COURSE', title: row.title, description: row.description ?? '', topics: lessons.length, completedTopics: lessons.filter((lesson: { id: string }) => complete.has(lesson.id)).length, thumbnail: safeWebUrl(row.thumbnail_url) || fallbackThumbnail, instructor: row.instructor || '' };
  });
}

export async function getTopics(courseId?: string, studentId?: string): Promise<TopicData[]> {
  let query = supabase.from('lessons').select('id,course_id,title,content,video_url,courses(title)').eq('status', 'published').order('sort_order');
  if (courseId) query = query.eq('course_id', courseId);
  const [{ data: rows, error }, progressResult] = await Promise.all([query, studentId ? supabase.from('student_lesson_progress').select('lesson_id,completed_at,bookmarked').eq('student_id', studentId) : Promise.resolve({ data: [] as any[] })]);
  if (error) { reportDataError('Unable to load content. Please check your connection and try again.'); console.error('Supabase lessons query failed:', error.message); return []; }
  if ('error' in progressResult && progressResult.error) reportDataError('Unable to load saved lessons.');
  const progress = new Map((progressResult.data ?? []).map(row => [row.lesson_id, row]));
  return (rows ?? []).map(row => ({ id: row.id, courseId: row.course_id, title: row.title, completed: Boolean(progress.get(row.id)?.completed_at), bookmarked: Boolean(progress.get(row.id)?.bookmarked), courseTitle: (row.courses as any)?.title || '', hasVideo: Boolean(row.video_url), hasNotes: Boolean(row.content), content: row.content ?? undefined, videoUrl: row.video_url ?? undefined }));
}

export async function getCaseLaw(studentId?: string): Promise<CaseData[]> {
  const { data, error } = await supabase.from('case_law').select('id,case_name,citation,year,court,area_of_law,summary,legal_principles').eq('status', 'published').order('year', { ascending: false });
  if (error) { reportDataError('Unable to load content. Please check your connection and try again.'); console.error('Supabase case law query failed:', error.message); return []; }
  const saved = studentId ? await supabase.from('student_case_bookmarks').select('case_id').eq('student_id', studentId) : { data: [], error: null };
  if (saved.error) reportDataError('Unable to load saved cases.');
  const bookmarks = new Set((saved.data || []).map(item => item.case_id));
  return (data ?? []).map(row => ({ id: row.id, name: row.case_name, citation: row.citation, year: Number(row.year), court: row.court, topic: row.area_of_law, course: row.area_of_law, principle: row.legal_principles, significance: row.summary, bookmarked: bookmarks.has(row.id) }));
}

export async function getPracticeQuestions(): Promise<PracticeQuestionData[]> {
  const { data, error } = await supabase.from('questions').select('id,question_type,question,options,correct_answer,explanation,difficulty,courses(title),lessons(title)').eq('status', 'published').order('created_at');
  if (error) { reportDataError('Unable to load content. Please check your connection and try again.'); console.error('Supabase questions query failed:', error.message); return []; }
  return (data ?? []).map((row: any) => ({ id: row.id, type: row.question_type.toUpperCase(), course: row.courses?.title ?? '', topic: row.lessons?.title ?? '', difficulty: (row.difficulty === 'easy' ? 'Easy' : row.difficulty === 'hard' ? 'Hard' : 'Medium') as PracticeQuestionData['difficulty'], question: row.question, options: Array.isArray(row.options) ? row.options.map(String) : [], correctOption: Number(typeof row.correct_answer === 'object' ? row.correct_answer?.option ?? -1 : row.correct_answer ?? -1), explanation: row.explanation ?? '' }));
}

export async function getResources(): Promise<ResourceData[]> {
  const { data, error } = await supabase.from('resources').select('id,title,description,storage_path').eq('status', 'published').order('created_at', { ascending: false });
  if (error) { reportDataError('Unable to load content. Please check your connection and try again.'); console.error('Supabase resources query failed:', error.message); return []; }
  return (data ?? []).map(row => ({ id: row.id, title: row.title, description: row.description, storagePath: row.storage_path }));
}

export async function getStudentSubscriptions(studentId: string): Promise<StudentSubscription[]> {
  const { data, error } = await supabase.from('subscriptions').select('id,status,starts_at,expires_at,plan,academic_levels(level,name,price),payments(reference,amount,status,created_at)').eq('student_id', studentId).order('starts_at', { ascending: false });
  if (error) { reportDataError('Unable to load content. Please check your connection and try again.'); console.error('Supabase subscriptions query failed:', error.message); return []; }
  return (data ?? []).map((row: any) => { const rawLevel = row.academic_levels?.level ?? levelNumber(row.plan); const level = Number(rawLevel) >= 100 ? Number(rawLevel) / 100 : Number(rawLevel); const payment = (row.payments ?? []).find((item: any) => item.status === 'success'); return { id: row.id, level, levelName: row.academic_levels?.name ?? row.plan, status: row.status === 'cancelled' || (row.expires_at && Date.parse(row.expires_at) <= Date.now()) ? 'expired' : row.status, startDate: row.starts_at, expiryDate: row.expires_at ?? row.starts_at, price: Number(payment?.amount ?? row.academic_levels?.price ?? 0), reference: payment?.reference ?? '—' }; });
}

export async function getSiteContent<T>(slug: string, key: string): Promise<T[]> {
  const { data, error } = await supabase.from('site_pages').select('content').in('slug', slug === 'home' ? ['home', '/'] : [slug, `/${slug}`]).order('updated_at', { ascending: false }).limit(1).eq('status', 'published').maybeSingle();
  if (error) { reportDataError('Unable to load content. Please check your connection and try again.'); console.error(`Supabase ${slug} page query failed:`, error.message); return []; }
  const content = data?.content as Record<string, unknown> | undefined;
  const items = content?.[key] ?? content?.items;
  return Array.isArray(items) ? items as T[] : [];
}

export async function getNotifications(userId?: string): Promise<NotificationData[]> {
  const [{ data: rows, error }, readResult] = await Promise.all([supabase.from('notifications').select('id,title,message,created_at,sent_at,target').eq('status', 'sent').order('sent_at', { ascending: false }), userId ? supabase.from('user_notifications').select('notification_id,read_at').eq('user_id', userId).not('read_at', 'is', null) : Promise.resolve({ data: [] as any[] })]);
  if (error) { reportDataError('Unable to load content. Please check your connection and try again.'); console.error('Supabase notifications query failed:', error.message); return []; }
  if ('error' in readResult && readResult.error) reportDataError('Unable to load notification read status.');
  const readIds = new Set((readResult.data ?? []).map(row => row.notification_id));
  return (rows ?? []).map(row => ({ id: row.id, type: 'announcement', title: row.title, message: row.message, time: new Date(row.sent_at ?? row.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' }), read: readIds.has(row.id) }));
}

export async function markNotificationsRead(userId: string, notificationIds: string[]) { if (notificationIds.length) { const { error } = await supabase.from('user_notifications').upsert(notificationIds.map(notification_id => ({ notification_id, user_id: userId, read_at: new Date().toISOString() })), { onConflict: 'notification_id,user_id' }); if (error) throw error; } }

export async function openResource(storagePath: string): Promise<string> {
  const { data, error } = await supabase.storage.from('media').createSignedUrl(storagePath, 300);
  if (error) throw error;
  return data.signedUrl;
}
export async function setCaseBookmark(studentId: string, caseId: string, saved: boolean) {
  const query = saved ? supabase.from('student_case_bookmarks').upsert({ student_id: studentId, case_id: caseId }, { ignoreDuplicates: true }) : supabase.from('student_case_bookmarks').delete().eq('student_id', studentId).eq('case_id', caseId);
  const { error } = await query;
  if (error) throw error;
}
export async function getLearningActivity(studentId: string) {
  const [attempts, progress] = await Promise.all([
    supabase.from('practice_attempts').select('id,is_correct,submitted_at,questions(question,courses(title))').eq('student_id', studentId).order('submitted_at', { ascending: false }),
    supabase.from('student_lesson_progress').select('completed_at,lessons(title,courses(title))').eq('student_id', studentId).not('completed_at', 'is', null).order('completed_at', { ascending: false }),
  ]);
  if (attempts.error || progress.error) throw new Error('Unable to load learning activity.');
  return { attempts: attempts.data || [], progress: progress.data || [] };
}
export type ExamData = { id: string; title: string; description: string; duration_minutes: number | null; opens_at: string | null; closes_at: string | null; questionIds: string[] };
export async function getMockExams(): Promise<ExamData[]> {
  const { data, error } = await supabase.from('mock_exams').select('id,title,description,duration_minutes,opens_at,closes_at,mock_exam_questions(question_id,sort_order)').eq('status', 'published').order('created_at', { ascending: false });
  if (error) { reportDataError('Unable to load mock exams.'); return []; }
  return (data || []).map((exam: any) => ({ ...exam, questionIds: (exam.mock_exam_questions || []).sort((a: any, b: any) => a.sort_order - b.sort_order).map((item: any) => item.question_id) }));
}
