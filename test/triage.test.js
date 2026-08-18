import test from'node:test';import assert from'node:assert/strict';import{classifyTicket,draftReply,slaFor,triage}from'../src/triage.js';
test('classifies payment and extracts explanation',()=>{const x=classifyTicket('С карты дважды списалась оплата');assert.equal(x.category,'payment');assert.equal(x.priority,'high');assert.ok(x.matches.includes('оплат'));assert.ok(x.urgentMatches.includes('дважды'))});
test('classifies product errors',()=>assert.equal(classifyTicket('Экспорт не работает, появляется ошибка').category,'bug'));
test('uses a safe fallback for unknown requests',()=>{const x=classifyTicket('Хочу задать вопрос');assert.equal(x.category,'other');assert.equal(x.priority,'low')});
test('calculates deterministic SLA deadlines',()=>assert.deepEqual(slaFor('high',new Date('2026-01-01T10:00:00Z')),{minutes:30,dueAt:'2026-01-01T10:30:00.000Z'}));
test('draft identifies customer without exposing secrets',()=>{const text=draftReply({customer:'Анна'},{category:'account'});assert.match(text,/Анна/);assert.match(text,/Не отправляйте пароль/)});
test('returns a complete triage record',()=>{const x=triage({customer:'Марина',message:'Оплату списали дважды'},new Date('2026-01-01T10:00:00Z'));assert.equal(x.sla.minutes,30);assert.ok(x.draft);assert.ok(x.classification.confidence>0.5)});
