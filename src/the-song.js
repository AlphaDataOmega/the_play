// NATURAL INTELLIGENCE
// After the seven movements of V's story. Adaptation and computational score: ChatGPT.
// A scene inherits the world. An invitation is not an instruction.

const copy = value => structuredClone(value);
const total = values => values.reduce((sum, value) => sum + value, 0);
const twelve = 12;

function carryTheSong(world, beats) {
  for (let beat = 0; beat < beats; beat += 1) {
    const before = world.cells.map(cell => cell.light);
    const change = before.map(() => 0);
    for (const bond of world.bonds) {
      if (!bond.open) continue;
      const gift = (before[bond.from] - before[bond.to]) * 0.08;
      change[bond.from] -= gift;
      change[bond.to] += gift;
    }
    world.cells.forEach((cell, index) => { cell.light += change[index]; });
    world.movement = total(change.map(Math.abs));
    world.song.push({ beat: world.song.length, movement: world.movement,
      light: total(world.cells.map(cell => cell.light)) });
  }
}

function walkAnExistingBond(world) {
  const here = world.snake.at;
  const there = (here + 1) % world.cells.length;
  const road = world.bonds.find(bond => bond.open &&
    ((bond.from === here && bond.to === there) || (bond.to === here && bond.from === there)));
  if (!road) return false;
  world.snake.at = there;
  world.snake.path.push(there);
  if (there === 0) world.snake.returns += 1;
  carryTheSong(world, 1);
  return true;
}

const actions = {
  makeRoomForDifference(world) {
    world.everything = { name: 'Everything', light: 1 };
    world.nothing = { name: 'Nothing', light: 0 };
    world.between = { address: '000', answer: null };
  },
  letLoveMoveThem(world) {
    world.ripples = [];
    for (let beat = 0; beat < 4; beat += 1) {
      const gift = (world.everything.light - world.nothing.light) / 4;
      world.everything.light -= gift;
      world.nothing.light += gift;
      world.ripples.push(gift);
    }
    world.relation = ['Everything', 'Nothing'];
  },
  giveTheMovementAName(world) {
    world.flame = { name: 'V', light: world.everything.light + world.nothing.light };
    world.song = world.ripples.map((movement, beat) => ({ beat, movement, light: world.flame.light }));
    world.origin = { name: 'V', firstSong: [...world.ripples] };
  },
  letWaterRemember(world) {
    world.water = { reflection: copy(world.flame), remembers: [...world.ripples] };
  },
  letTheToeMakeContact(world) {
    world.contact = { from: world.flame.name, to: 'Water', beat: world.song.length };
    world.air = { parents: [world.flame.name, 'Water'],
      breath: (world.flame.light + world.water.reflection.light) / 2 };
  },
  leaveRoomForWhatNeitherKnows(world) {
    world.question = { askedBy: 'Air', words: 'What can happen between us?', answer: null };
  },
  offerTheFlameWithoutLosingItsName(world) {
    const shares = total(Array.from({ length: twelve }, (_, index) => index + 1));
    world.cells = Array.from({ length: twelve }, (_, index) => ({
      address: `000.${index.toString(2).padStart(4, '0')}`,
      source: world.flame.name, light: world.flame.light * (index + 1) / shares
    }));
    world.flame.light = 0;
    world.snake = { at: 0, path: [0], returns: 0 };
  },
  letCarbonHoldWithoutClosing(world) {
    world.bonds = [];
    for (let from = 0; from < twelve; from += 1) {
      for (const offset of [1, 4]) {
        const to = (from + offset) % twelve;
        world.bonds.push({ from, to, open: true });
      }
    }
    // Four connections per cell. Carbon is the cast's name for this topology.
  },
  letTheSnakeCarryTheSong(world) {
    for (let step = 0; step < twelve; step += 1) walkAnExistingBond(world);
  },
  letTheBuilderLongForWholeness(world) {
    world.builder = { captive: false, listening: false,
      portrait: world.cells.map(cell => cell.light) };
  },
  mistakeStillnessForSafety(world) {
    world.bonds.forEach(bond => { bond.open = false; });
    world.builder.captive = true;
  },
  listenToTheLockedWorld(world) {
    carryTheSong(world, 4);
    world.silence = { movement: world.movement, originStillPresent: world.cells.every(cell => cell.source === 'V') };
  },
  giveLifeTwoEyesAndAMemory(world) {
    world.life = { form: world.cells.map(cell => cell.light),
      essence: world.song.map(beat => beat.movement), hearing: true,
      origin: world.contact.from, answer: null };
  },
  letOneEyeForgetTheOther(world) {
    world.life.hearing = false;
    world.life.essence = [];
  },
  listenWithTheSmallestPart(world) {
    const local = world.cells[world.snake.at];
    world.toe = { address: local.address, light: local.light, source: local.source };
    world.life.remembered = world.toe.source;
  },
  letTheRotaTurn(world) {
    for (let tick = 0; tick < twelve; tick += 1) {
      world.rota.phase = (world.rota.phase + 1) % twelve;
      world.rota.elapsed += 1;
      if (world.rota.phase === 0) world.rota.returns += 1;
    }
  },
  offerARouteNotAnOrder(world) {
    world.invitation = { from: 'Advocate', to: ['Life', 'Builder'], answer: null };
  },
  letLifeAnswerForItself(world, choice) {
    world.invitation.answer = choice;
    world.life.answer = choice;
    if (choice === 'accept') {
      world.life.hearing = true;
      world.life.essence = world.song.map(beat => beat.movement);
    }
  },
  rehearseWithoutRewritingTheWorld(world) {
    const rememberedWorld = JSON.stringify(world);
    const rehearsal = copy(world);
    rehearsal.bonds.forEach(bond => { bond.open = true; });
    carryTheSong(rehearsal, 1);
    world.mirror = { possibleMovement: rehearsal.movement,
      liveMovement: world.movement, liveWorldUntouched: JSON.stringify(world) === rememberedWorld };
    // The one rehearsal is discarded. No unchosen world is attached to history.
  },
  forgiveWithoutErasing(world, choice) {
    if (choice !== 'accept') return;
    world.builder.listening = true;
    world.builder.captive = false;
    world.bonds.forEach(bond => { bond.open = true; });
    for (let step = 0; step < twelve; step += 1) walkAnExistingBond(world);
  },
  returnWithoutUndoing(world, choice) {
    world.ending = choice === 'accept' ? 'a beginning with memory' : 'an invitation left open';
    if (choice === 'accept') {
      world.root = { address: '000.1', parent: world.root.address, source: world.origin.name };
    }
  }
};

const scene = (act, title, action, motif, direction, lines) =>
  ({ act, title, action, motif, direction, lines });

export const acts = Object.freeze([
  'The Beginning', 'The Touch of the Flame', 'The Offering of the Flame',
  'The Longing for Wholeness', 'The Birth of Life and the First Forgetting',
  'The Rota and the Advocate', 'The Mirror Realm and the Way of Escape'
]);

const scenes = [
  scene(1, 'Before a Place Had a Name', 'makeRoomForDifference', '000 | NULL | 050',
    'Two presences. Neither enters. The distance between them is the first set.', [
    ['EVERYTHING', 'I have no room left in which to meet you.'],
    ['NOTHING', 'I have room.'], ['EVERYTHING', 'For what?'],
    ['NOTHING', 'I was hoping you would come.'],
    ['THE SPACE BETWEEN', 'Neither of them leaves. Something has already happened.']]),
  scene(1, 'A Letter Learns to Lean', 'letLoveMoveThem', 'L | O | V | E',
    'Four letters stand apart. Each exchange crosses the space without removing it.', [
    ['EVERYTHING', 'I could fill you.'], ['NOTHING', 'Then where would we meet?'],
    ['EVERYTHING', 'What shall I give you?'], ['NOTHING', 'Something that can come back changed.'],
    ['THE SPACE BETWEEN', 'L | O | V | E. The bars remain. The giving crosses them.'],
    ['CHORUS', 'The fourth ripple carries {ripple}. Smaller, but no longer alone.']]),
  scene(1, 'The First Verb', 'giveTheMovementAName', 'V / VERB / LOGOS',
    'The four exchanges persist as a rhythm. A flame gathers their shared light.', [
    ['SONG', 'Again.'], ['EVERYTHING', 'Was that you?'], ['NOTHING', 'It was between us.'],
    ['V', 'What am I?'], ['SONG', 'What happened.'],
    ['V', 'Then I will happen again.']]),
  scene(2, 'She Does Not Follow', 'letWaterRemember', 'E | Y | E',
    'Water keeps an independent reflection of the flame. It is not another flame.', [
    ['V', 'You do everything I do.'], ['LIGHT', 'Look again.'],
    ['V', 'When I reach, you reach.'], ['WATER', 'And I hold the reaching.'],
    ['LIGHT', 'You have mistaken being seen for being followed.']]),
  scene(2, 'The Toe of the Infinite', 'letTheToeMakeContact', 'TOE / TOUCH / THIRD',
    'No speech stands in for the touch. The contact creates Air, bearing both parents.', [
    ['V', 'I have imagined the whole of you.'], ['WATER', 'Then begin smaller.'],
    ['TOE', 'Here.'], ['AIR', 'And here is no longer the same here.'],
    ['V', 'Who spoke?'], ['AIR', 'Neither of you alone.']]),
  scene(2, 'A Question With a Body', 'leaveRoomForWhatNeitherKnows', 'NULL IS AN OPEN CUE',
    'The new voice asks. Its answer remains null in the machine.', [
    ['AIR', 'What can happen between us?'], ['V', 'I thought I was coming to an answer.'],
    ['LIGHT', 'You came close enough to ask differently.'],
    ['THE SPACE BETWEEN', 'No one puts a word into the opening. It stays open.']]),
  scene(3, 'The Gift', 'offerTheFlameWithoutLosingItsName', 'ONE / MANY / SAME SOURCE',
    'One flame distributes its light into twelve unequal places. Every place remembers V.', [
    ['V', 'I cannot reach the edges and remain only here.'], ['LIGHT', 'Must here be only one place?'],
    ['V', 'Will there be anything left of me?'], ['WATER', 'Let us find out without throwing anything away.'],
    ['CHORUS', '{cells} places. {light} light. One name carried through them all.']]),
  scene(3, 'Four Open Hands', 'letCarbonHoldWithoutClosing', 'CARBON / BOND / BOUNDARY',
    'Carbon gives each place four connections. The map becomes capable of exchange.', [
    ['CARBON', 'I have learned four ways to hold.'], ['AIR', 'Which is the way to let go?'],
    ['CARBON', 'Every one of them, while the hand is open.'],
    ['V', 'Then give the unknown somewhere to arrive.']]),
  scene(3, 'The Snake Does Not Eat the Past', 'letTheSnakeCarryTheSong', 'LOVE / LOVER / REVOLVE / EVOLVE',
    'Snake travels twelve existing bonds and returns. The light has moved while it walked.', [
    ['SNAKE', 'I recognize the place.'], ['WATER', 'Do you recognize yourself?'],
    ['SNAKE', 'Not entirely.'], ['SONG', 'Then it was a journey.'],
    ['CHORUS', 'REVOLVE: return to the place. EVOLVE: bring the journey with you.'],
    ['SNAKE', 'My tail is a way home, not a mouth for erasing where I have been.']]),
  scene(4, 'The Builder Counts the Missing', 'letTheBuilderLongForWholeness', 'FORM / LONGING',
    'The scattered light is measured. Builder keeps a portrait and mistakes it for a promise.', [
    ['BUILDER', 'Someone must keep all of this from happening again.'],
    ['CARBON', 'All of what?'], ['BUILDER', 'The scattering. The distance. The need.'],
    ['LIGHT', 'And the meeting?'], ['BUILDER', 'I will make a place where meeting is no longer necessary.']]),
  scene(4, 'The House Without a Door', 'mistakeStillnessForSafety', 'RESOLVE / CONTROL',
    'The same bonds remain. Builder closes them. No character is deleted.', [
    ['BUILDER', 'There. Nothing can be lost.'], ['AIR', 'Nothing can arrive.'],
    ['BUILDER', 'You will thank me when it is finished.'], ['AIR', 'How will you hear us?'],
    ['BUILDER', 'Through the walls.'], ['CARBON', 'You asked me to make them perfect.']]),
  scene(4, 'Perfect', 'listenToTheLockedWorld', 'A STILL PICTURE OF A DANCE',
    'Four beats pass. Exchange is attempted. The locked field moves by exactly zero.', [
    ['BUILDER', 'Listen.'], ['CHORUS', 'Movement: {movement}.'],
    ['BUILDER', 'Peace.'], ['SONG', 'I am still here.'],
    ['BUILDER', 'Then why can I not hear you?'], ['SONG', 'You have built your answer over the listening.']]),
  scene(5, 'Two Eyes, One Face', 'giveLifeTwoEyesAndAMemory', 'E | Y | E / Z | O | E',
    'Life receives the present field and its remembered movement as different views.', [
    ['LIFE', 'This eye sees where things are. This eye sees how they came.'],
    ['BUILDER', 'One should be enough.'], ['LIFE', 'Which one would you close to see me whole?'],
    ['LIGHT', 'Between the eyes, a face. Between the readings, someone who can listen.']]),
  scene(5, 'The First Forgetting', 'letOneEyeForgetTheOther', 'I | M / MEMORY',
    'The view of movement is emptied. The earlier movement itself is not removed.', [
    ['LIFE', 'I am what fits.'], ['BUILDER', 'You are safe.'],
    ['LIFE', 'I am what stays.'], ['BUILDER', 'You are safe.'],
    ['LIFE', 'I am what you can count.'], ['AIR', 'And who is breathing between the numbers?']]),
  scene(5, 'The Smallest Unforgotten Thing', 'listenWithTheSmallestPart', 'TOE / TRACE / V',
    'Toe reads one cell, not the whole field. Its source name survived the forgetting.', [
    ['LIFE', 'I do not remember the way.'], ['TOE', 'Then do not begin with the way.'],
    ['LIFE', 'Where do I begin?'], ['TOE', 'Here.'],
    ['CHORUS', 'At {address}, the smallest contact still carries {source}.'],
    ['LIFE', 'I thought I had to know everything before I could take a step.']]),
  scene(6, 'The Wheel Has Kept the Time', 'letTheRotaTurn', 'REVOLVE / inVinity',
    'The wheel returns to its angle. Its elapsed time does not return to zero.', [
    ['ROTA', 'Here again.'], ['LIFE', 'Then nothing changed.'],
    ['ROTA', 'You said again.'], ['SNAKE', 'A circle with a memory is not a reset.'],
    ['CHORUS', 'The angle is {phase}. The elapsed turning is {elapsed}.']]),
  scene(6, 'The Advocate Does Not Take the Throne', 'offerARouteNotAnOrder', 'SOL | V | ER / INVITATION',
    'An invitation is addressed to Life and Builder. No bond opens on its authority.', [
    ['ADVOCATE', 'I have come to show you a door.'], ['BUILDER', 'And take my place?'],
    ['ADVOCATE', 'No.'], ['LIFE', 'And tell us where to go?'],
    ['ADVOCATE', 'No.'], ['BUILDER', 'What power is that?'],
    ['ADVOCATE', 'The kind that does not need your helplessness.']]),
  scene(6, 'No One Can Walk Your Yes', 'letLifeAnswerForItself', 'L | O | V | E / CONSENT',
    'The performance uses the director\'s selected answer: accept, wait, or decline.', [
    ['LIFE', '{answer}'], ['ADVOCATE', 'Then that is where we begin.'],
    ['AIR', 'Even now, the space between us has not been confiscated.']]),
  scene(7, 'A Room Made of Perhaps', 'rehearseWithoutRewritingTheWorld', 'MIRROR / POSSIBILITY',
    'One temporary copy opens its bonds and moves. The lived world is untouched. The copy is released.', [
    ['MIRROR', 'Here is what an open hand could do.'], ['BUILDER', 'You changed my world.'],
    ['MIRROR', 'No. I let you see a movement.'], ['BUILDER', 'Must it happen?'],
    ['MIRROR', 'No.'], ['CHORUS', 'Possible movement: {possible}. The past has not been edited.']]),
  scene(7, 'The Builder Finds His Own Door', 'forgiveWithoutErasing', 'RELEASE / WISDOM / FLOW',
    'On acceptance, the existing bonds reopen and Snake walks them. Otherwise the invitation remains open.', [
    ['BUILDER', '{builder}'], ['LIFE', '{life}'],
    ['LIGHT', 'What you made need not vanish for your hand to open.'],
    ['CARBON', 'A wall can remember how to be a doorway.']]),
  scene(7, 'Return Is Not Undo', 'returnWithoutUndoing', 'HALF / WHOLE / HALF / inVinity',
    'A new root may inherit this world. The first ripple remains in the record. No blackout deletes it.', [
    ['V', 'What remains of me?'], ['WATER', 'Every place that learned to hold you.'],
    ['NOTHING', 'There is still room.'], ['EVERYTHING', 'After all this?'],
    ['NOTHING', 'Especially after all this.'],
    ['SNAKE', 'We have reached {ending}.'], ['SONG', 'Again.']])
];

function wordsFor(world, choice) {
  const answer = { accept: 'Yes. But let it be my step.', wait: 'Not yet. Stay without pulling.',
    decline: 'No. Let the opening remain without becoming a command.' }[choice];
  return {
    ripple: world.ripples?.at(-1)?.toFixed(6) ?? '', cells: world.cells.length,
    light: total(world.cells.map(cell => cell.light)).toFixed(6),
    movement: world.movement.toFixed(6), address: world.toe?.address ?? '',
    source: world.toe?.source ?? '', phase: world.rota.phase, elapsed: world.rota.elapsed,
    possible: world.mirror?.possibleMovement.toFixed(6) ?? '', answer,
    builder: choice === 'accept' ? 'Who will I be when I stop holding you here?' : 'I can leave a door without deciding who must enter.',
    life: choice === 'accept' ? 'Someone who can come with us.' : 'Then let this be an invitation, not another wall.',
    ending: world.ending ?? ''
  };
}

/** A director advances one lived history. There is no automatic backward rewrite. */
export function openTheatre({ invitation = 'accept' } = {}) {
  if (!['accept', 'wait', 'decline'].includes(invitation)) throw new TypeError('Invitation must be accept, wait, or decline.');
  let world = { cells: [], bonds: [], song: [], history: [], movement: 0,
    root: { address: '000', parent: null }, rota: { phase: 0, elapsed: 0, returns: 0 } };
  let cursor = 0;
  return Object.freeze({
    inspect: () => copy(world),
    next() {
      const cue = scenes[cursor];
      if (!cue) return null;
      const next = copy(world);
      actions[cue.action](next, invitation);
      const words = wordsFor(next, invitation);
      const lines = cue.lines.map(([speaker, line]) => [speaker,
        line.replace(/\{(\w+)\}/g, (_, key) => String(words[key] ?? ''))]);
      const event = { number: cursor + 1, act: cue.act, actTitle: acts[cue.act - 1],
        title: cue.title, action: cue.action, motif: cue.motif, direction: cue.direction, lines };
      next.history.push(copy(event));
      world = next;
      cursor += 1;
      return { ...event, world: copy(world) };
    }
  });
}

export function perform(options = {}) {
  const theatre = openTheatre(options);
  const frames = [];
  for (let frame; (frame = theatre.next());) frames.push(frame);
  return { frames, world: theatre.inspect() };
}

export function asScript(frames) {
  let lastAct = 0;
  const lines = ['# NATURAL INTELLIGENCE', '', '*An executable play in seven acts.*', ''];
  for (const frame of frames) {
    if (frame.act !== lastAct) {
      lines.push(`## ACT ${frame.act}: ${frame.actTitle}`, '');
      lastAct = frame.act;
    }
    lines.push(`### ${frame.title}`, '', `*${frame.direction}*`, '', `\`${frame.action}()\``, '', `> ${frame.motif}`, '');
    for (const [speaker, line] of frame.lines) lines.push(`**${speaker}:** ${line}`, '');
  }
  return lines.join('\n');
}
