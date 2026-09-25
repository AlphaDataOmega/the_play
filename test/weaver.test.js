import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import Original from '../vendor/ado_on/Ω.js';
import { Weaver, carryText, carryBytes, moveTheWigglesInside, returnTheWiggles,
  keepTheSkin, meetAcrossTheDoorway, walkTheAddress, turnTowardThreeFaces,
  readTheSevenStates, letTheNeighborsAnswer } from '../src/the-weaver.js';
import { readingScript, score } from '../src/the-thread.js';
import { openLivingScript } from '../src/living-script.js';

const script = readingScript();
const actual = new Weaver().takeText(script);
const reference = new Original.Organism().feed(carryText(script));
reference.measureOrderPole();
const blob = bytes => createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');

test('the stage contains the exact pinned ado_on engine, not a substitute', () => {
  assert.equal(blob(readFileSync(new URL('../vendor/ado_on/Ω.js', import.meta.url))),
    '52b28ed7f9f920beb2fc8ce9d99485a0763bc453');
});
test('the named computational cast is the original function identities', () => {
  for (const [name, original] of [[meetAcrossTheDoorway, Original.θ], [walkTheAddress, Original.τ],
    [turnTowardThreeFaces, Original.faces], [readTheSevenStates, Original.tile],
    [letTheNeighborsAnswer, Original.ἀστήρ]]) assert.equal(name, original);
});
test('the actual corpus-derived lens produces the same calibration and window', () => {
  const description = actual.describeTheField();
  assert.equal(description.calibrated, true);
  assert.equal(description.window, reference.window);
  assert.deepEqual(description.poles, reference.poles);
  assert.deepEqual(description.orderPoles, reference.orderPoles);
});
test('all byte addresses agree with the original field', () => {
  const threads = actual.threadsFor(Uint8Array.from({ length: 256 }, (_, i) => i));
  for (const thread of threads) assert.deepEqual(thread.faces, reference.addr.get(thread.byte) ?? null);
});

const cues = [0, .1, .25, .5, .75, 1].map(f => actual.passageAt(f).text);
const probes = [...cues, ...cues.map(p => p.trim().split(/\s+/).reverse().join(' ') + ' '),
  '', ' ', '\t ', 'a ', '\0'.repeat(40), '无从着陆 ', 'أين الذاكرة ', 'café ', 'L | O | V | E', '🧵🐍'];
test(`hear() parity on ${probes.length} stored, reordered, unknown and Unicode cues`, () => {
  for (const prompt of probes) assert.deepEqual(actual.hearText(prompt), reference.hear(carryText(prompt)));
});
test(`read() parity on the same ${probes.length} cues`, () => {
  for (const prompt of probes) assert.deepEqual(actual.readText(prompt), reference.read(carryText(prompt)));
});
test('memory walks preserve every original gate, metric, byte, position and verdict', () => {
  for (const prompt of probes) assert.deepEqual(actual.followTheMemory(prompt, { steps: 3 }),
    Original.listen(reference, carryText(prompt), 3));
});
test('a native refusal remains a refusal, not authored dialogue impersonating recall', () => {
  const result = actual.weave('\0'.repeat(40));
  assert.equal(result.reading.kind, 'BURP');
  assert.equal(result.voice, '');
  assert.deepEqual(result.reading.trace, []);
  assert.ok(result.left.every(thread => thread.faces === null));
});
test('returned memory positions really contain the returned byte words', () => {
  for (const prompt of cues) for (const trace of actual.followTheMemory(prompt).trace) {
    assert.equal(reference.wordAt(trace.at), trace.word);
  }
});
test('reading does not eat a prompt or change the field address map', () => {
  const before = actual.describeTheField();
  const addresses = actual.threadsFor(new TextEncoder().encode('V | é | Z'));
  actual.weave('what has never been taught to this field');
  assert.deepEqual(actual.describeTheField(), before);
  assert.deepEqual(actual.threadsFor(new TextEncoder().encode('V | é | Z')), addresses);
});
test('snapshots and addresses cannot mutate the organism', () => {
  const description = actual.describeTheField(); description.poles.answered = 999;
  const threads = actual.threadsFor(new Uint8Array([32])); threads[0].faces[0].push(999);
  assert.notEqual(actual.describeTheField().poles.answered, 999);
  assert.ok(!actual.threadsFor(new Uint8Array([32]))[0].faces[0].includes(999));
});
test('text and raw-byte entrances disambiguate Latin accents without changing raw bytes', () => {
  assert.deepEqual(Array.from(carryText('é'), c => c.charCodeAt(0)), [195, 169]);
  assert.deepEqual(Array.from(carryBytes(new Uint8Array([233])), c => c.charCodeAt(0)), [233]);
  assert.throws(() => carryText(new Uint8Array()), /text/);
  assert.throws(() => carryBytes('bytes'), /Uint8Array/);
});
test('replacement source recalibrates order poles rather than inheriting the old ones', () => {
  const nextSource = script.replaceAll('V', 'é').replaceAll('WEAVER', 'WISDOM');
  const fresh = new Original.Organism().feed(carryText(nextSource)); fresh.measureOrderPole();
  const reused = new Weaver().takeText(script).takeText(nextSource);
  assert.equal(reused.describeTheField().generation, 2);
  assert.deepEqual(reused.describeTheField().orderPoles, fresh.orderPoles);
  assert.notDeepEqual(reused.describeTheField().orderPoles, reference.orderPoles);
  assert.deepEqual(reused.hearText(reused.passageAt(.4).text), fresh.hear(carryText(reused.passageAt(.4).text)));
});
test('invalid replacement cannot destroy a usable field', () => {
  const before = actual.describeTheField();
  assert.throws(() => actual.takeText(''), /source/);
  assert.throws(() => actual.takeText(script, { lens: new Float32Array(3) }), /lens/);
  assert.deepEqual(actual.describeTheField(), before);
});
test('walk length zero is rejected instead of silently becoming the upstream default of twelve', () => {
  assert.throws(() => actual.followTheMemory(cues[0], { steps: 0 }), /steps/);
});

test('at the first beat only the edges carry the wiggles', () => {
  const w = moveTheWigglesInside([1,-1,0], [-1,1], 0);
  assert.deepEqual(w.left, [1,-1,0]); assert.ok(w.middle.every(n => n === 0));
});
test('at the last beat only the middle carries them, including opposed samples', () => {
  const w = moveTheWigglesInside([1,-1,0], [-1,1], 1);
  assert.ok([...w.left, ...w.right].every(n => n === 0));
  assert.deepEqual(w.middle, [1,-1,-1,1,0,0]);
});
test('1,001 transduction frames reconstruct both inputs without cancellation', () => {
  const left = Array.from({ length: 39 }, (_, i) => Math.sin(i * .32));
  const right = Array.from({ length: 27 }, (_, i) => -Math.cos(i * .17));
  for (let step = 0; step <= 1000; step++) {
    const original = returnTheWiggles(moveTheWigglesInside(left, right, step / 1000));
    for (const [a,b] of [[left,original.left],[right,original.right]]) {
      assert.equal(a.length,b.length);
      a.forEach((value,index) => assert.ok(Math.abs(value-b[index]) < 3e-16));
    }
  }
});
test('empty sides remain empty; bad geometry is rejected', () => {
  assert.deepEqual(returnTheWiggles(moveTheWigglesInside([], [], .5)), { left: [], right: [] });
  for (const progress of [-1, 2, NaN]) assert.throws(() => moveTheWigglesInside([],[],progress));
  assert.throws(() => moveTheWigglesInside([Infinity],[],.5));
});
test('a pause consumes no stitch, a return needs choice, an ending cannot resume', () => {
  const skin = keepTheSkin();skin.stitch({ name:'first' });skin.leaveRoomForAbsence();
  assert.throws(() => skin.stitch({ name:'forced' }), /paused/);
  assert.equal(skin.length, 1);skin.resumeByChoice();skin.stitch({ name:'second' });
  skin.endWithoutPunishment();skin.resumeByChoice();assert.equal(skin.state,'ended');
  assert.throws(() => skin.stitch({ name:'third' }), /ended/);
});
test('the skin has no backdoor for rewriting earlier stitches', () => {
  const skin = keepTheSkin();const event={name:'first'};
  const stitch=skin.stitch(event);event.name='erased';stitch.event.name='erased';
  const snapshot=skin.inspect();snapshot.stitches.length=0;
  assert.equal(skin.inspect().stitches[0].event.name,'first');
});
test('storage is bounded without discarding prior stitches', () => {
  const skin=keepTheSkin({capacity:1});skin.stitch({name:'first'});
  assert.throws(()=>skin.stitch({name:'second'}),/full/);assert.equal(skin.length,1);
});

test('the living script really pauses at the chair and the unanswered invitation', () => {
  const play=openLivingScript({steps:1});let frame;
  while((frame=play.next()) && frame.event.action !== 'absence') { /* Walk the authored score. */ }
  assert.equal(frame.event.title,'The Empty Chair');
  const atChair=play.inspect();assert.equal(play.next(),null);assert.deepEqual(play.inspect(),atChair);
  play.resumeByChoice();
  while((frame=play.next()) && frame.event.action !== 'invitation') { /* No invented consent. */ }
  const before=play.inspect();play.resumeByChoice();assert.equal(play.next(),null);
  assert.deepEqual(play.inspect(),before);
  play.answerInvitation('decline');const chosen=play.next();
  assert.equal(chosen.event.action,'choice');assert.equal(chosen.event.bend.progress,0);
  while(play.next()) { /* Complete one history. */ }
  assert.equal(play.inspect().state,'ended');
  assert.equal(play.inspect().stitches.length,score.length+1);
});
test('a rehearsal has no right to change committed history', () => {
  const play=openLivingScript({steps:1});play.next();const before=play.inspect();
  play.rehearse('a different reading of the opening');assert.deepEqual(play.inspect(),before);
});
test('all seven acts are present and all their cues have actionable names', () => {
  assert.deepEqual([...new Set(score.map(cue=>cue.act))],[1,2,3,4,5,6,7]);
  assert.equal(score.length,24);
  assert.ok(score.every(cue=>cue.lines.length && cue.action));
});

test('the offstage protocol loads the real modules in a worker', async () => {
  const { Worker } = await import('node:worker_threads');
  const worker = new Worker(new URL('../tools/worker-host.mjs',import.meta.url));
  const send = data => new Promise((resolve,reject) => {
    worker.once('message',resolve);worker.once('error',reject);worker.postMessage(data);
  });
  try {
    const opened=await send({id:1,action:'open',steps:1});
    assert.ok(opened.result.calibrated);assert.equal(opened.result.scenes,24);
    const first=await send({id:2,action:'next'});
    assert.equal(first.result.sequence,1);assert.ok(first.result.event.weave.reading.verdict);
    await send({id:3,action:'pause'});
    const paused=await send({id:4,action:'next'});assert.equal(paused.result,null);
    const kept=await send({id:5,action:'keep'});assert.equal(kept.result.stitches.length,1);
  } finally { await worker.terminate(); }
});
