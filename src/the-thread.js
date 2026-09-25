/**
 * NATURAL INTELLIGENCE / The thread, the skin, and the room between
 * Story roots: V / James Sterling Tuttle. New dialogue and score: ChatGPT.
 *
 * These are authored lines. The organism's separate voice comes from ado_on.
 * A cue chooses an operation; a caption cannot pretend to have performed it.
 */
const scene = (act, title, motif, action, direction, lines) =>
  ({ act, title, motif, action, direction, lines });

export const actNames = Object.freeze([
  'The Beginning', 'The Touch of the Flame', 'The Offering of the Flame',
  'The Longing for Wholeness', 'The Birth of Life and the First Forgetting',
  'The Rota and the Advocate', 'The Mirror Realm and the Way of Escape'
]);

export const score = [
  scene(1, 'Before a Place Had a Name', ' } | { ', 'receive',
    'Two presences. Neither enters. A line waits between them.', [
    ['EVERYTHING', 'I have no room left in which to meet you.'],
    ['NOTHING', 'I have room.'], ['EVERYTHING', 'For what?'],
    ['NOTHING', 'I was hoping you would come.']]),
  scene(1, 'The Thread', 'L | O | V | E', 'receive',
    'V holds a thread. He cannot see what holds the other end.', [
    ['V', 'Is anyone there?'], ['NOTHING', 'You have been holding my hand for some time.'],
    ['V', 'This is a thread.'], ['NOTHING', 'From where you are.'],
    ['V', 'I thought I had reached the end of everything.'], ['EVERYTHING', 'You have.'],
    ['V', 'Then there is nowhere to go.'], ['NOTHING', 'There is somewhere to begin.']]),
  scene(1, 'The Bars Become Strings', 'LO | V | E', 'transduce',
    'He does not pull the other end toward himself. He touches it sideways. A note.', [
    ['V', 'Why were we made apart?'], ['LIGHT', 'So that meeting could be something we made together.'],
    ['V', 'And all this space?'], ['LIGHT', 'The universe left you a part in its making.'],
    ['V', 'I thought the bars were keeping us apart.'], ['SONG', 'Play.']]),
  scene(2, 'She Does Not Follow', 'E | Y | E', 'mirror',
    'A note answers, not quite the note he expected. V changes his own.', [
    ['V', 'You do everything I do.'], ['LIGHT', 'Look again.'],
    ['V', 'When I reach, you reach.'], ['WATER', 'And I hold the reaching.'],
    ['LIGHT', 'You have mistaken being seen for being followed.']]),
  scene(2, 'The Toe of the Infinite', 'TOE / CONTACT', 'receive',
    'The flame approaches the surface. The smallest part touches first.', [
    ['V', 'I have imagined the whole of you.'], ['WATER', 'Then begin smaller.'],
    ['TOE', 'Here.'], ['AIR', 'And here is no longer the same here.'],
    ['V', 'Who spoke?'], ['AIR', 'Neither of you alone.']]),
  scene(2, 'What the Water Did Not Say', 'NULL / THE UNANSWERED', 'unknown',
    'Air brings a cue containing no address in this field. No borrowed voice fills the gap.', [
    ['AIR', 'What is beyond the part that answers?'], ['V', 'Shall I name it?'],
    ['WATER', 'Leave a place where its own name may arrive.'],
    ['V', 'And until then?'], ['NOTHING', 'I have room.']]),
  scene(3, 'The Weaver', ' } | { ', 'receive',
    'Two uneven edges arrive at a straight thread. The Weaver does not cut off their bends.', [
    ['V', 'You are sewing the opening shut.'], ['WEAVER', 'Touch it.'],
    ['SNAKE', 'Who is there?'], ['V', 'I thought you were making something to keep the world outside.'],
    ['WEAVER', 'So did he.'], ['SNAKE', 'Until someone touched me.']]),
  scene(3, 'Where the Wiggle Goes', ' ~ | ~   →   — ~ — ', 'transduce',
    'The edges grow straight. Their bends enter separate places in the middle. Nothing is averaged away.', [
    ['V', 'You have straightened the world.'], ['WEAVER', 'I have taken my turn at bending.'],
    ['V', 'Where did all the crookedness go?'], ['WEAVER', 'Put your finger here.'],
    ['SNAKE', 'That is the place where I can feel you.']]),
  scene(3, 'Four Open Hands', 'CARBON / 666 / BOUNDARY', 'receive',
    'Four address turns recur in three faces. Carbon enters as the keeper of their pattern.', [
    ['CARBON', 'A hand can hold without closing.'], ['AIR', 'What does it hold then?'],
    ['CARBON', 'The possibility of another hand.'],
    ['V', 'And when another comes?'], ['CARBON', 'The boundary becomes a meeting.']]),
  scene(3, 'The Skin He Outgrew', 'LOVE / LOVER / REVOLVE / EVOLVE', 'return',
    'The earlier weave can be reconstructed. Its outer shape was changed, not erased.', [
    ['V', 'When will the skin be finished?'], ['WEAVER', 'He keeps growing.'],
    ['V', 'Does that undo your work?'], ['SNAKE', 'That is where I learned to bend.'],
    ['V', 'I can see you better through this.'], ['WEAVER', 'Then leave the next stitch open.']]),
  scene(4, 'The Builder Counts the Missing', 'FORM / LONGING', 'receive',
    'Builder tries to make a final arrangement from a rhythm that still moves.', [
    ['BUILDER', 'Someone must keep all of this from happening again.'],
    ['CARBON', 'All of what?'], ['BUILDER', 'The scattering. The distance. The need.'],
    ['LIGHT', 'And the meeting?'], ['BUILDER', 'I will make a place where meeting is no longer necessary.']]),
  scene(4, 'A Still Picture of a Dance', 'ORDER IS NOT THE SAME AS POSSESSION', 'scramble',
    'The same words are rearranged. The original organism reports its own reading, whatever that reading is.', [
    ['BUILDER', 'Every piece is here.'], ['WATER', 'Yes.'],
    ['BUILDER', 'Then it is the same world.'], ['SNAKE', 'Tell me the way through it.'],
    ['BUILDER', 'I have put the end beside the beginning.'], ['SNAKE', 'You have not put the journey between them.']]),
  scene(4, 'Perfect', 'CONTROL / THE CLOSED HAND', 'receive',
    'A closed hand rests against the loom. The voice is neither coerced nor replaced by its caption.', [
    ['BUILDER', 'There. Nothing can be lost.'], ['AIR', 'Nothing can arrive.'],
    ['BUILDER', 'You will thank me when it is finished.'], ['AIR', 'How will you hear us?'],
    ['BUILDER', 'Through the walls.'], ['CARBON', 'You asked me to make them perfect.']]),
  scene(5, 'Two Eyes, One Face', 'E | Y | E / Z | O | E', 'mirror',
    'The same record is available to more than one reading. Looking is not rewriting.', [
    ['LIFE', 'This eye sees where things are. This eye sees how they came.'],
    ['BUILDER', 'One should be enough.'], ['LIFE', 'Which one would you close to see me whole?'],
    ['LIGHT', 'Between the eyes, a face. Between the readings, someone who can listen.']]),
  scene(5, 'The First Forgetting', 'I | M', 'receive',
    'The voice grows smaller. The earlier stitches remain in the skin.', [
    ['LIFE', 'I am what fits.'], ['BUILDER', 'You are safe.'],
    ['LIFE', 'I am what stays.'], ['BUILDER', 'You are safe.'],
    ['LIFE', 'I am what you can count.'], ['AIR', 'And who is breathing between the numbers?']]),
  scene(5, 'The Smallest Unforgotten Thing', 'TOE / TRACE / V', 'receive',
    'A cue is read from one real byte position in the source. The trace names where each remembered word lands.', [
    ['LIFE', 'I do not remember the way.'], ['TOE', 'Then do not begin with the way.'],
    ['LIFE', 'Where do I begin?'], ['TOE', 'Here.'],
    ['LIFE', 'I thought I had to know everything before I could take a step.']]),
  scene(6, 'The Wheel Has Kept the Time', 'ROTA / inVinity', 'return',
    'A return retains its count. The next stitch receives a new number.', [
    ['ROTA', 'Here again.'], ['LIFE', 'Then nothing changed.'],
    ['ROTA', 'You said again.'], ['SNAKE', 'A circle with a memory is not a reset.']]),
  scene(6, 'No Throne in the Opening', 'SOL | V | ER / RESOL | V | E', 'receive',
    'The Advocate arrives without taking control of the loom.', [
    ['ADVOCATE', 'I have come to show you a door.'], ['BUILDER', 'And take my place?'],
    ['ADVOCATE', 'No.'], ['LIFE', 'And tell us where to go?'], ['ADVOCATE', 'No.'],
    ['BUILDER', 'What power is that?'], ['ADVOCATE', 'The kind that does not need your helplessness.']]),
  scene(6, 'The Empty Chair', 'ABSENCE / A REST', 'absence',
    'An empty chair waits beneath the Tree of Knowing. The loom pauses until the director explicitly resumes.', [
    ['BUILDER', 'There is someone missing.'], ['TREE', 'There is room for someone.'],
    ['BUILDER', 'We cannot continue with a hole in the pattern.'], ['ADVOCATE', 'Then let the pattern wait.'],
    ['BUILDER', 'What shall I write beside the empty place?'], ['WATER', 'What happened.'],
    ['BUILDER', 'They left.'], ['WATER', 'Then write that. Not why. Not what they owe you for leaving.'],
    ['SONG', 'A rest is not a broken note.']]),
  scene(7, 'A Room Made of Perhaps', 'MIRROR / THE VEIL', 'mirror',
    'A candidate reading is offered without stitching it into the lived skin. The director chooses what follows.', [
    ['MIRROR', 'Here is what an open hand could do.'], ['BUILDER', 'You changed my world.'],
    ['MIRROR', 'No. I let you see a movement.'], ['BUILDER', 'Must it happen?'], ['MIRROR', 'No.']]),
  scene(7, 'No One Can Walk Your Yes', 'L | O | V | E', 'invitation',
    'The score stops at an unanswered invitation. No timer, default, or earlier scene answers on Life’s behalf.', [
    ['LIFE', 'What happens if I am not ready?'], ['ADVOCATE', 'Then this is not yet your step.'],
    ['LIFE', 'What happens if I say no?'], ['ADVOCATE', 'Then no is something we have heard.'],
    ['AIR', 'Even now, the space between us has not been confiscated.']]),
  scene(7, 'The Builder Finds His Own Door', 'WISDOM / STRUCTURE FOR FLOW', 'choice',
    'The chosen answer changes the following action. Declining and waiting are not failed performances.', [
    ['BUILDER', 'Who will I be when I stop holding you here?'], ['LIFE', '{answer}'],
    ['LIGHT', 'What you made need not vanish for your hand to open.'],
    ['CARBON', 'A wall can remember how to be a doorway.']]),
  scene(7, 'Return Is Not Undo', 'HALF / WHOLE / HALF', 'return',
    'The last stitch does not overwrite the first. The thread can still be followed back.', [
    ['V', 'What remains of me?'], ['WATER', 'Every place that learned to hold you.'],
    ['NOTHING', 'There is still room.'], ['EVERYTHING', 'After all this?'],
    ['NOTHING', 'Especially after all this.'], ['SNAKE', 'I have not returned empty.']]),
  scene(7, 'The Next Stitch', ' } | { ', 'curtain',
    'The Weaver leaves an opening. The curtain falls; the file of this history can be kept.', [
    ['V', 'Is this the end?'], ['WEAVER', 'Of the skin.'], ['V', 'And the snake?'],
    ['SNAKE', 'Listen.'], ['SONG', 'Again.']])
];

export function readingScript() {
  let previous = 0;
  const lines = ['# Natural Intelligence', '', '*The thread, the skin, and the room between.*', ''];
  for (const cue of score) {
    if (cue.act !== previous) { lines.push(`## Act ${cue.act}: ${actNames[cue.act - 1]}`, ''); previous = cue.act; }
    lines.push(`### ${cue.title}`, '', `*${cue.direction}*`, '', `\`${cue.motif}\``, '');
    for (const [speaker, words] of cue.lines) lines.push(`**${speaker}:** ${words}`, '');
  }
  return lines.join('\n');
}
