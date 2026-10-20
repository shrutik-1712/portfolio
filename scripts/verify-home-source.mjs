import fs from 'node:fs';
import assert from 'node:assert/strict';
import { parse } from '@babel/parser';
import postcss from 'postcss';

for(const file of ['src/pages/Home.jsx','src/components/OnlyFans.jsx','src/components/Common.jsx','src/main.jsx']) {
 parse(fs.readFileSync(file,'utf8'),{sourceType:'module',plugins:['jsx']});
 console.log(`JSX parsed: ${file}`);
}
const layout=postcss.parse(fs.readFileSync('src/styles/home.css','utf8'));
layout.walkDecls('grid-template-areas',decl=>{
 const rows=[...decl.value.matchAll(/"([^"]+)"/g)].map(match=>match[1].trim().split(/\s+/));
 assert.ok(rows.every(row=>row.length===rows[0].length),'Each grid row has the same number of columns');
 const names=new Set(rows.flat());
 for(const name of ['welcome','portrait','now','project','fans','fact','playlist','offscreen',...(decl.parent.selector.includes('without-writing')?[]:['writing'])]) assert.ok(names.has(name),`Grid contains ${name}`);
});
console.log('Responsive layout maps include the appropriate cards with consistent columns, with or without writing.');
for(const path of ['/src/components/Common.jsx','/src/styles/home.css','/src/pages/Home.jsx']) {
 const response=await fetch('http://127.0.0.1:5173'+path);
 const body=await response.text();
 assert.equal(response.status,200,`${path}: development server serves updated source`);
 assert.ok(!body.includes('Internal server error'),`${path}: transformation succeeds`);
 if(path.includes('Common')) assert.ok(body.includes('onCancel')&&!body.includes('addEventListener("close"'), 'Updated dialog lifecycle is served');
 if(path.includes('home.css')) assert.ok(body.includes('grid-template-areas'), 'Named grid layout is served');
 console.log(`Development server verified: ${path}`);
}
