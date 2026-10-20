import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { safeUrl, safeImage, xUrl, playlistId } from '../src/lib.js';

test('unsafe links and unsupported embed sources are rejected', () => {
 for (const value of ['javascript:alert(1)', '//evil.example', '/\\evil.example', 'https://user:pass@example.com', 'data:text/html,test']) assert.equal(safeUrl(value), null);
 assert.equal(safeUrl('/playground'), '/playground');
 assert.equal(xUrl('https://example.com/post'), null);
 assert.equal(xUrl('https://x.com/DawaneShrutik'), 'https://x.com/DawaneShrutik');
 assert.equal(playlistId('bad?id=1'), null);
 assert.equal(safeImage('data:image/svg+xml;base64,AAAA'), null);
});

test('content has unique identifiers, valid local covers and existing Markdown', () => {
 for (const name of ['projects', 'posts', 'learning', 'interests', 'facts']) {
  const records=JSON.parse(readFileSync(`src/data/${name}.json`, 'utf8'));
  assert.equal(new Set(records.map(r=>r.id)).size,records.length,`${name}: unique ids`);
  const slugs=records.filter(r=>r.slug).map(r=>r.slug);
  assert.equal(new Set(slugs).size,slugs.length,`${name}: unique slugs`);
  for (const record of records) {
   if (record.cover?.startsWith('/')) assert.ok(existsSync('public'+record.cover),record.cover);
   if (record.markdownFile) assert.ok(existsSync('src/content/blogs/'+record.markdownFile),record.markdownFile);
  }
 }
});

test('navigation and learning subjects match the requested page structure', () => {
 const site=JSON.parse(readFileSync('src/data/site.json','utf8'));
 assert.deepEqual(site.nav.map(item=>item.path),['/','/learning','/projects','/blog','/about','/contact']);
 const learning=JSON.parse(readFileSync('src/data/learning.json','utf8'));
 assert.deepEqual(learning.map(item=>item.title),['DSA','LLD','System design','HLD']);
 for(const topic of learning) {
  assert.ok(Array.isArray(topic.notes));
  assert.equal(new Set(topic.notes.map(note=>note.id)).size,topic.notes.length);
  for(const note of topic.notes)assert.ok(note.title&&note.body);
 }
 const projects=JSON.parse(readFileSync('src/data/projects.json','utf8'));
 for(const project of projects) {
  assert.notEqual(project.demoUrl,'/playground');
  for(const id of project.relatedLearningIds||[])assert.ok(learning.some(topic=>topic.id===id));
 }
});
