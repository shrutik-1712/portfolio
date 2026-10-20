import fs from 'node:fs';
import assert from 'node:assert/strict';
import { parse } from '@babel/parser';

for(const path of ['src/App.jsx','src/pages/Learning.jsx','src/pages/Projects.jsx','src/pages/Writing.jsx','src/pages/Project.jsx','src/pages/Home.jsx','src/components/Common.jsx']) {
 const source=fs.readFileSync(path,'utf8');
 parse(source,{sourceType:'module',plugins:['jsx']});
 const response=await fetch('http://127.0.0.1:5173/'+path);
 const transformed=await response.text();
 assert.equal(response.status,200,path);
 assert.ok(!transformed.includes('Internal server error'),path);
 console.log(`Syntax and dev-server transform passed: ${path}`);
}
const app=fs.readFileSync('src/App.jsx','utf8');
assert.ok(!app.includes('Palette')&&!app.includes('Playground'));
assert.ok(app.includes('path="/projects"')&&app.includes('path="/blog"'));
console.log('Separate Projects and Blog routes present; Playground and global search removed.');
