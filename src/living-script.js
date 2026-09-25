/**
 * THE LIVING SCRIPT
 *
 * The playwright supplies the lines. ado_on supplies the reading.
 * The Weaver carries the difference. The Snake keeps the passage.
 * No rehearsed possibility becomes a lived event until it is stitched.
 */
import { Weaver, keepTheSkin, moveTheWigglesInside, returnTheWiggles } from './the-weaver.js';
import { score, readingScript, actNames } from './the-thread.js';

const copy = value => structuredClone(value);

export function openLivingScript({ source = readingScript(), sourceName = 'The written score', steps = 3 } = {}) {
  if (!Number.isInteger(steps) || steps < 1 || steps > 64) throw new RangeError('A walk needs 1 through 64 steps.');
  const organism = new Weaver().takeText(source);
  const skin = keepTheSkin();
  let cursor = 0;
  let invitation = null;
  let awaitingChoice = false;
  let lastWeave = null;

  function gatherTheThreads(fraction) {
    const passage = organism.passageAt(fraction);
    return { passage, ...organism.weave(passage.text, { steps }) };
  }
  function holdTheBend(weave) {
    return moveTheWigglesInside(weave.leftWiggle, weave.rightWiggle, 1);
  }
  function seeWithoutStitching(prompt) { return organism.weave(prompt, { steps }); }

  return Object.freeze({
    describe: () => ({ sourceName, scenes: score.length, ...organism.describeTheField() }),
    inspect: () => ({ sourceName, cursor, invitation, awaitingChoice, ...skin.inspect() }),
    // The Mirror may read; only next() and ask() may write a stitch.
    rehearse: seeWithoutStitching,
    next() {
      const state = skin.state;
      if (state !== 'open' || awaitingChoice || cursor === score.length) return null;
      const cue = score[cursor];
      let weave;
      if (cue.action === 'unknown') weave = seeWithoutStitching('\u0000'.repeat(40));
      else if (cue.action === 'scramble') {
        const passage = organism.passageAt(cursor / score.length);
        weave = seeWithoutStitching(passage.text.trim().split(/\s+/).reverse().join(' ') + ' ');
      } else weave = gatherTheThreads(cursor / score.length);
      const bend = holdTheBend(weave);
      const answer = invitation === 'accept' ? 'Someone who can come with us.'
        : invitation === 'decline' ? 'Someone who can hear my no without closing the door.'
        : 'Someone who can wait beside me without pulling.';
      const event = {
        act: cue.act, actTitle: actNames[cue.act - 1], title: cue.title,
        motif: cue.motif, action: cue.action, direction: cue.direction,
        lines: cue.lines.map(([speaker, words]) => [speaker, words.replace('{answer}', answer)]),
        sourceName, weave,
        // A declined opening does not quietly advance the transduction to its end.
        bend: cue.action === 'choice' && invitation !== 'accept'
          ? moveTheWigglesInside(weave.leftWiggle, weave.rightWiggle, 0) : bend,
        recovered: cue.action === 'return' && lastWeave ? returnTheWiggles(lastWeave) : null
      };
      const stitch = skin.stitch(event);
      lastWeave = event.bend;
      cursor += 1;
      if (cue.action === 'absence') skin.leaveRoomForAbsence();
      if (cue.action === 'invitation') { awaitingChoice = true; skin.leaveRoomForAbsence(); }
      if (cue.action === 'curtain') skin.endWithoutPunishment();
      return { ...stitch, state: skin.state, awaitingChoice };
    },
    ask(prompt) {
      if (skin.state !== 'open' || awaitingChoice) throw new Error('Resume the loom before adding a cue.');
      const weave = seeWithoutStitching(prompt);
      const bend = holdTheBend(weave);
      const stitch = skin.stitch({ title: 'A visitor touches the thread', action: 'visitor', sourceName, weave, bend });
      lastWeave = bend;
      return stitch;
    },
    answerInvitation(answer) {
      if (!awaitingChoice || skin.state === 'ended') throw new Error('There is no open invitation.');
      if (!['accept', 'wait', 'decline'].includes(answer)) throw new TypeError('Choose accept, wait, or decline.');
      skin.resumeByChoice();
      try { skin.stitch({ title: 'Life answers for itself', action: 'answer', answer }); }
      catch (error) { skin.leaveRoomForAbsence(); throw error; }
      invitation = answer;
      awaitingChoice = false;
    },
    leaveRoomForAbsence: () => skin.leaveRoomForAbsence(),
    resumeByChoice() { if (!awaitingChoice) skin.resumeByChoice(); },
    endWithoutPunishment: () => skin.endWithoutPunishment()
  });
}
