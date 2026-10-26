import test from 'node:test';
import assert from 'node:assert/strict';
import {cases,flashcards,questions,drills,plan,frameworks} from '../data.js';
test('twelve distinct complete practice cases',()=>{assert.equal(cases.length,12);assert.equal(new Set(cases.map(c=>c.name)).size,12);for(const c of cases){for(const k of ['prompt','clarify','hypothesis','trap','follow','answer'])assert.ok(c[k]?.length>20);assert.equal(c.structure.length,4);}});
test('every quiz has one valid keyed answer and an explanation',()=>{assert.ok(questions.length>=15);for(const q of questions){assert.ok(q.correct>=0&&q.correct<q.options.length);assert.equal(new Set(q.options).size,q.options.length);assert.ok(q.explanation.length>20);}});
test('study package contains recall, drills and a full fortnight',()=>{assert.equal(plan.length,14);assert.equal(flashcards.length,94);assert.ok(drills.length>=10);for(const [q,a] of drills){assert.ok(q.length);assert.ok(a.length);}});

test('image frameworks are all available for recall and speed practice',()=>{assert.deepEqual(frameworks.map(f=>f.name),['Profit improvement','Revenue growth','Market entry','Cost cutting','Process optimization','Product launch','Mergers & acquisitions','Investment decisions','Competitive threat','Pricing']);for(const f of frameworks){assert.equal(f.branches.length,4);assert.ok(f.question.length>20);for(const [title,items] of f.branches){assert.ok(items.length>=3);assert.ok(flashcards.some(c=>c.front===`${f.name}: what belongs under ${title}?`));}assert.ok(drills.some(([q])=>q.includes(f.name.toLowerCase())));}});
