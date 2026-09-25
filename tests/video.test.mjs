import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

for (const app of ['userWebsite', 'adminWebsite']) {
  const source = readFileSync(new URL(`../../${app}/src/lib/video.ts`, import.meta.url), 'utf8');
  const exports = {};
  new Function('exports', ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(exports);
  const parse = exports.youtubeEmbedUrl;
  test(`${app}: common YouTube links become embed URLs`, () => {
    for (const link of ['https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=example', 'https://youtu.be/dQw4w9WgXcQ?si=share', 'https://youtube.com/shorts/dQw4w9WgXcQ', 'https://m.youtube.com/live/dQw4w9WgXcQ', 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ']) {
      assert.equal(parse(link), 'https://www.youtube.com/embed/dQw4w9WgXcQ');
    }
  });
  test(`${app}: unsupported and unsafe URLs are never embedded`, () => {
    for (const link of ['', 'javascript:alert(1)', 'https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ', 'https://youtube.com/playlist?list=example', 'https://youtube.com/watch?v=invalid', 'https://youtube.com@evil.test/watch?v=dQw4w9WgXcQ', 'https://example.com/video.mp4', 'media:lesson.mp4']) assert.equal(parse(link), null);
  });
}
