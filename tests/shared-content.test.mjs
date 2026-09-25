import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const compile = source => ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
function loadData(tables = {}, rpcs = {}) {
  const calls = [], errors = [];
  class Query {
    constructor(table) { this.rows = [...(tables[table] || [])]; calls.push(table); }
    select() { return this; }
    eq(key, value) { this.rows = this.rows.filter(row => row[key] === value); return this; }
    in(key, values) { this.rows = this.rows.filter(row => values.includes(row[key])); return this; }
    not(key, _, value) { this.rows = this.rows.filter(row => row[key] !== value); return this; }
    order() { return this; }
    limit(count) { this.rows = this.rows.slice(0, count); return this; }
    maybeSingle() { this.single = true; return this; }
    then(resolve, reject) { return Promise.resolve({ data: this.single ? this.rows[0] || null : this.rows, error: null }).then(resolve, reject); }
  }
  const supabase = { from: table => new Query(table), rpc: async name => rpcs[name]?.error ? rpcs[name] : ({ data: rpcs[name] || [], error: null }), storage: { from(bucket) { assert.equal(bucket, 'media'); return { createSignedUrl: async (path, expires) => { calls.push({ path, expires }); return { data: { signedUrl: `https://example.test/${path}?signed` }, error: null }; } }; } } };
  const exports = {};
  new Function('require', 'exports', compile(readFileSync(new URL('../src/lib/data.ts', import.meta.url), 'utf8')))(name => name === './supabase' ? { supabase } : { reportCatalogError: (error, message) => errors.push({ ...error, message }), reportDataError: error => errors.push(error), safeWebUrl: value => value?.startsWith('https://') ? value : undefined }, exports);
  return { api: exports, calls, errors };
}
function adminRecord(collection, record) {
  const source = readFileSync(new URL('../../adminWebsite/supabase/functions/server/index.tsx', import.meta.url), 'utf8');
  const exports = {};
  class Hono { use() {} get() {} put() {} post() {} delete() {} }
  new Function('require', 'exports', 'Deno', compile(`${source}\nexport { databaseRecord };`))(name => name === 'npm:hono' ? { Hono } : name === 'npm:hono/cors' ? { cors: () => {} } : name === 'npm:hono/logger' ? { logger: () => {} } : {}, exports, { serve() {} });
  return exports.databaseRecord(collection, record, record.id);
}

test('admin course and lesson fields reach the student; drafts and another student’s progress are excluded', async () => {
  const course = adminRecord('courses', { id: 'course-1', title: 'Uploaded course', code: 'LAW201', description: 'Description', academic_level: '200L', instructor: 'Tutor', thumbnail_url: 'https://example.test/image.png', status: 'published' });
  const lesson = adminRecord('lessons', { id: 'lesson-1', course_id: course.id, title: 'Uploaded notes', content: 'Admin lesson text', video_url: 'media:lecture.mp4', status: 'published' });
  const { api } = loadData({ courses: [{ ...course, lessons: [{ id: lesson.id, status: 'published' }, { id: 'draft', status: 'draft' }] }, { ...course, id: 'draft-course', status: 'draft' }], lessons: [{ ...lesson, courses: { title: course.title } }], student_lesson_progress: [{ student_id: 'student-1', lesson_id: lesson.id, completed_at: null, bookmarked: true }, { student_id: 'another-student', lesson_id: lesson.id, completed_at: '2026-01-01', bookmarked: false }] });
  const courses = await api.getCourses('student-1');
  assert.equal(courses.length, 1); assert.equal(courses[0].title, course.title); assert.equal(courses[0].level, 2); assert.equal(courses[0].topics, 1); assert.equal(courses[0].completedTopics, 0); assert.equal(courses[0].instructor, 'Tutor');
  const topics = await api.getTopics(course.id, 'student-1');
  assert.equal(topics[0].content, lesson.content); assert.equal(topics[0].videoUrl, lesson.video_url); assert.equal(topics[0].bookmarked, true); assert.equal(topics[0].completed, false);
});
test('admin prices, objectives and subscription lengths come from the shared level record', async () => {
  const level = adminRecord('academic-levels', { id: 'level-1', level: 300, name: 'Third year', description: 'Equity', price: 18500, duration_months: 9, objectives: ['Understand equity'], status: 'published' });
  const { api } = loadData({ academic_levels: [level] }, { published_level_counts: [{ level_id: level.id, course_count: 4, topic_count: 12 }] });
  const [result] = await api.getAcademicLevels();
  assert.equal(result.price, 18500); assert.equal(result.duration, '9 months'); assert.equal(result.courses, 4); assert.deepEqual(result.objectives, ['Understand equity']);
});
test('question answers, explanations and problem-question types survive the admin/student mapping', async () => {
  const question = adminRecord('mcq', { id: 'q1', question: 'Admin question?', options: ['Yes', 'No'], correct_answer: 0, explanation: 'Admin explanation', difficulty: 'easy', status: 'published' });
  const problem = adminRecord('essays', { id: 'q2', question: 'Discuss', question_type: 'problem', status: 'published', difficulty: 'hard', correct_answer: null });
  const { api } = loadData({ questions: [question, problem] });
  const results = await api.getPracticeQuestions();
  assert.equal(results[0].correctOption, 0); assert.equal(results[0].explanation, 'Admin explanation'); assert.equal(results[1].type, 'PROBLEM'); assert.equal(results[1].correctOption, -1);
});
test('page content supports canonical and legacy slash addresses while excluding drafts', async () => {
  const page = adminRecord('pages', { id: 'page', slug: '/about', content: { sections: [{ title: 'Mission', text: 'Published text' }] }, status: 'published' });
  assert.equal(page.slug, 'about');
  const { api } = loadData({ site_pages: [page, { slug: '/pricing', status: 'published', content: { faqs: [{ question: 'Price?', answer: 'Admin answer' }] } }, { slug: 'contact', status: 'draft', content: { faqs: [{ question: 'Hidden' }] } }] });
  assert.deepEqual(await api.getSiteContent('about', 'sections'), page.content.sections);
  assert.equal((await api.getSiteContent('pricing', 'faqs'))[0].answer, 'Admin answer');
  assert.deepEqual(await api.getSiteContent('contact', 'faqs'), []);
});
test('resources use the uploaded storage path and request a temporary signed link', async () => {
  const resource = adminRecord('resources', { id: 'file', title: 'Lecture PDF', storage_path: 'uploads/lesson.pdf', description: 'Read this', status: 'published' });
  const { api, calls } = loadData({ resources: [resource] });
  const [result] = await api.getResources();
  assert.equal(result.storagePath, resource.storage_path);
  assert.equal(await api.openResource(result.storagePath), 'https://example.test/uploads/lesson.pdf?signed');
  assert.deepEqual(calls.at(-1), { path: resource.storage_path, expires: 300 });
});
test('only published mock exams are shown and their questions retain admin ordering', async () => {
  const { api } = loadData({ mock_exams: [{ id: 'exam', status: 'published', title: 'Exam', mock_exam_questions: [{ question_id: 'second', sort_order: 1 }, { question_id: 'first', sort_order: 0 }] }, { id: 'draft', status: 'draft' }] });
  const exams = await api.getMockExams();
  assert.equal(exams.length, 1); assert.deepEqual(exams[0].questionIds, ['first', 'second']);
});
test('expired subscriptions reflect their stored expiry instead of claiming active access', async () => {
  const { api } = loadData({ subscriptions: [{ id: 'sub', student_id: 'student', status: 'active', starts_at: '2020-01-01', expires_at: '2020-07-01', academic_levels: { level: 200, name: 'Second year', price: 5000 }, payments: [{ status: 'success', amount: 4200, reference: 'real-reference' }] }] });
  const [subscription] = await api.getStudentSubscriptions('student');
  assert.equal(subscription.status, 'expired'); assert.equal(subscription.price, 4200); assert.equal(subscription.reference, 'real-reference');
});

test('missing count RPC reports a catalog error instead of displaying invented totals', async () => {
  const { api, errors } = loadData({ academic_levels: [{ id: 'level', status: 'published' }] }, { published_level_counts: { data: null, error: { code: 'PGRST202' } } });
  assert.deepEqual(await api.getAcademicLevels(), []);
  assert.equal(errors[0].code, 'PGRST202');
});
