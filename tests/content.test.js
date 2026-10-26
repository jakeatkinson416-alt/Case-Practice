import test from 'node:test';
import assert from 'node:assert/strict';
import {cases,flashcards,questions,drills,plan} from '../data.js';
test('ten distinct complete practice cases',()=>{assert.equal(cases.length,10);assert.equal(new Set(cases.map(c=>c.name)).size,10);for(const c of cases){for(const k of ['prompt','clarify','hypothesis','trap','follow','answer'])assert.ok(c[k]?.length>20);assert.equal(c.structure.length,4);}});
test('every quiz has one valid keyed answer and an explanation',()=>{assert.ok(questions.length>=15);for(const q of questions){assert.ok(q.correct>=0&&q.correct<q.options.length);assert.equal(new Set(q.options).size,q.options.length);assert.ok(q.explanation.length>20);}});
test('study package contains recall, drills and a full fortnight',()=>{assert.equal(plan.length,14);assert.equal(flashcards.length,40);assert.ok(drills.length>=10);for(const [q,a] of drills){assert.ok(q.length);assert.ok(a.length);}});
