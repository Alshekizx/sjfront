import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import * as jsx from 'react/jsx-runtime';

function page(file, auth) {
  const states = [], effects = [];
  let index = 0;
  const react = {
    useState(initial) {
      const slot = index++;
      if (!(slot in states)) states[slot] = initial;
      return [states[slot], value => { states[slot] = value; }];
    },
    useEffect(effect) { effects.push(effect); },
  };
  const source = readFileSync(new URL(`../src/pages/auth/${file}.tsx`, import.meta.url), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const exports = {};
  new Function('require', 'exports', 'window', 'FormData', code)(name => {
    if (name === 'react') return react;
    if (name === 'react/jsx-runtime') return jsx;
    if (name === '@/lib/supabase') return { supabase: { auth } };
    return {};
  }, exports, { location: { origin: 'https://academy.test' } }, class { constructor(values) { this.values = values; } get(key) { return this.values[key]; } });
  return { render() { index = 0; return exports.default(); }, effects };
}

function find(node, predicate) {
  if (!node || typeof node !== 'object') return;
  if (predicate(node)) return node;
  for (const child of [node.props?.children].flat(Infinity)) {
    const match = find(child, predicate);
    if (match) return match;
  }
}

test('forgot password calls Supabase and only confirms a successful request', async () => {
  const calls = [];
  let failure = true;
  const view = page('ForgotPassword', { async resetPasswordForEmail(...args) { calls.push(args); return { error: failure ? new Error('Try later') : null }; } });
  let tree = view.render();
  find(tree, n => n.type === 'input').props.onChange({ target: { value: 'student@example.test' } });
  tree = view.render();
  await find(tree, n => n.type === 'form').props.onSubmit({ preventDefault() {} });
  assert.deepEqual(calls[0], ['student@example.test', { redirectTo: 'https://academy.test/reset-password' }]);
  assert.equal(find(view.render(), n => n.props?.role === 'alert').props.children, 'Try later');
  failure = false;
  await find(view.render(), n => n.type === 'form').props.onSubmit({ preventDefault() {} });
  assert.equal(find(view.render(), n => n.type === 'form'), undefined);
});

test('reset validates confirmation before updating the password', async () => {
  const updates = [];
  const view = page('ResetPassword', { async getSession() { return { data: { session: {} }, error: null }; }, async updateUser(value) { updates.push(value); return { error: null }; } });
  view.render();
  view.effects[0]();
  await new Promise(resolve => setImmediate(resolve));
  const submit = values => find(view.render(), n => n.type === 'form').props.onSubmit({ preventDefault() {}, currentTarget: values });
  await submit({ password: 'password123', confirm: 'different' });
  assert.equal(updates.length, 0);
  await submit({ password: 'password123', confirm: 'password123' });
  assert.deepEqual(updates, [{ password: 'password123' }]);
  assert.equal(find(view.render(), n => n.props?.role === 'status').props.children, 'Your password has been updated.');
});

test('expired reset links do not expose a password update form', async () => {
  const view = page('ResetPassword', { async getSession() { return { data: { session: null }, error: null }; } });
  view.render();
  view.effects[0]();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(find(view.render(), n => n.type === 'form'), undefined);
  assert.ok(find(view.render(), n => n.props?.role === 'alert'));
});
