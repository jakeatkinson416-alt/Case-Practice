import test from 'node:test';
import assert from 'node:assert/strict';
import {frameworks} from '../data.js';
import {buildStructureQuestions,createStructureTest,gradeSelection,shuffle} from '../structure-quiz.js';

test('all 90 structure questions have valid distinct choices and correct keys',()=>{
 const pool=buildStructureQuestions();assert.equal(pool.length,90);assert.equal(new Set(pool.map(q=>q.id)).size,90);
 for(const q of pool){assert.equal(new Set(q.options).size,q.options.length);assert.equal(q.correct.length,q.kind==='recall'?4:1);for(const key of q.correct)assert.ok(key>=0&&key<q.options.length);const f=frameworks.find(f=>f.name===q.framework);for(const key of q.correct)assert.ok(f.branches.some(([title])=>title===q.options[key]));}
});
test('mixed test covers every framework and all three tasks',()=>{
 const run=createStructureTest();assert.equal(run.length,30);
 for(const f of frameworks)assert.deepEqual(run.filter(q=>q.framework===f.name).map(q=>q.kind).sort(),['missing','recall','sort']);
});
test('subject and format filters isolate the requested learning objective',()=>{
 for(let i=0;i<frameworks.length;i++){
  const recall=createStructureTest(String(i),'recall');assert.equal(recall.length,5);assert.ok(recall.every(q=>q.framework===frameworks[i].name&&q.kind!=='sort'));
  const sorting=createStructureTest(String(i),'sort');assert.equal(sorting.length,4);assert.ok(sorting.every(q=>q.framework===frameworks[i].name&&q.kind==='sort'));
 }
 assert.equal(createStructureTest('all','recall').length,50);assert.equal(createStructureTest('all','sort').length,40);
});
test('grading rejects missing or extra buckets and accepts any order',()=>{
 assert.ok(gradeSelection([3,2,1,0],[0,1,2,3]));assert.ok(!gradeSelection([0,1,2],[0,1,2,3]));assert.ok(!gradeSelection([0,1,2,4],[0,1,2,3]));assert.ok(!gradeSelection([0,1,2,3,4],[0,1,2,3]));assert.ok(!gradeSelection([],[0]));
});
test('shuffle preserves input and membership',()=>{const original=[1,2,3,4];assert.deepEqual(shuffle(original,()=>0).sort(),original);assert.deepEqual(original,[1,2,3,4]);});
