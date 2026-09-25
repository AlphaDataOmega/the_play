import test from 'node:test';
import assert from 'node:assert/strict';
import { openTheatre, perform, asScript } from '../src/the-song.js';

const show = perform();
const at = number => show.frames[number - 1].world;
const sum = world => world.cells.reduce((value, cell) => value + cell.light, 0);

test('seven acts inherit a single ordered history of twenty-one scenes', () => {
  assert.equal(show.frames.length, 21);
  assert.deepEqual([...new Set(show.frames.map(frame => frame.act))], [1, 2, 3, 4, 5, 6, 7]);
  show.frames.forEach((frame, index) => assert.equal(frame.world.history.length, index + 1));
});
test('the same direction yields the same performance', () => assert.deepEqual(perform(), show));
test('LOVE exchanges without erasing either participant', () => {
  assert.ok(at(2).nothing.light > 0);
  assert.equal(at(2).everything.light + at(2).nothing.light, 1);
  assert.deepEqual(at(2).relation, ['Everything', 'Nothing']);
  assert.equal(at(2).ripples.length, 4);
});
test('the flame and the water keep independent representations', () => {
  assert.equal(at(7).flame.light, 0);
  assert.equal(at(7).water.reflection.light, 1);
});
test('touch records its participants and gives Air both parents', () => {
  assert.deepEqual(at(5).air.parents, ['V', 'Water']);
  assert.equal(at(5).contact.from, 'V');
});
test('the unanswered question is null, not a fabricated answer', () => assert.equal(at(6).question.answer, null));
test('the gift keeps its full light and source through every later act', () => {
  for (const frame of show.frames.slice(6)) {
    assert.ok(Math.abs(sum(frame.world) - 1) < 1e-12);
    assert.ok(frame.world.cells.every(cell => cell.source === 'V' && cell.light >= 0));
  }
});
test('Carbon gives every cell four neighbors', () => {
  const world = at(8);
  for (let index = 0; index < world.cells.length; index += 1) {
    assert.equal(world.bonds.filter(bond => bond.from === index || bond.to === index).length, 4);
  }
});
test('Snake follows real bonds, includes the return, and never teleports', () => {
  const world = at(9);
  const path = world.snake.path;
  assert.equal(path.length, 13);
  assert.equal(path[0], path.at(-1));
  for (let index = 1; index < path.length; index += 1) {
    assert.ok(world.bonds.some(bond => bond.open &&
      ((bond.from === path[index - 1] && bond.to === path[index]) ||
       (bond.to === path[index - 1] && bond.from === path[index]))));
  }
  assert.notDeepEqual(at(8).cells, world.cells);
});
test('the Builder really blocks movement, not merely its caption', () => {
  assert.deepEqual(at(11).cells, at(12).cells);
  assert.equal(at(12).movement, 0);
  assert.ok(at(12).bonds.every(bond => !bond.open));
});
test('forgetting removes a view, not the origin or earlier Song', () => {
  assert.deepEqual(at(14).life.essence, []);
  assert.deepEqual(at(13).song, at(14).song);
  assert.equal(at(15).toe.source, 'V');
});
test('the Rota returns to its phase without resetting elapsed time', () => {
  assert.equal(at(16).rota.phase, 0);
  assert.equal(at(16).rota.elapsed, 12);
});
test('the Advocate alone cannot open the bonds', () => assert.deepEqual(at(16).bonds, at(17).bonds));
test('the Mirror changes a discarded rehearsal, not the lived field', () => {
  assert.deepEqual(at(18).cells, at(19).cells);
  assert.deepEqual(at(18).bonds, at(19).bonds);
  assert.equal(at(19).mirror.liveWorldUntouched, true);
  assert.ok(at(19).mirror.possibleMovement > 0);
  assert.equal(at(19).mirror.liveMovement, 0);
  assert.equal(Object.hasOwn(at(19).mirror, 'rehearsal'), false);
});
test('forgiveness changes subsequent movement without deleting the Builder or history', () => {
  assert.notDeepEqual(at(19).cells, at(20).cells);
  assert.equal(at(20).builder.captive, false);
  assert.deepEqual(at(20).history.slice(0, 19), at(19).history);
  assert.equal(at(21).root.parent, '000');
  assert.equal(at(21).root.source, 'V');
});
for (const invitation of ['wait', 'decline']) {
  test(`${invitation} is a complete performance, not forced acceptance`, () => {
    const result = perform({ invitation });
    assert.equal(result.frames.length, 21);
    assert.ok(result.world.bonds.every(bond => !bond.open));
    assert.equal(result.world.builder.captive, true);
    assert.equal(result.world.life.hearing, false);
    assert.equal(result.world.root.address, '000');
    assert.equal(result.world.ending, 'an invitation left open');
  });
}
test('inspection cannot mutate the world and the curtain cannot append phantom events', () => {
  const theatre = openTheatre();
  const frame = theatre.next();
  frame.world.history.length = 0;
  const snapshot = theatre.inspect();
  snapshot.history.length = 0;
  assert.equal(theatre.inspect().history.length, 1);
  while (theatre.next()) { /* One history only. */ }
  assert.equal(theatre.next(), null);
  assert.equal(theatre.inspect().history.length, 21);
});
test('all dramatic placeholders are filled from this performance', () => {
  assert.doesNotMatch(asScript(show.frames), /\{\w+\}/);
});
test('invalid invitations are rejected before performance', () => {
  assert.throws(() => openTheatre({ invitation: 'force' }), /Invitation/);
});
