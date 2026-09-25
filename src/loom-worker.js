// A body offstage: corpus fitting must not freeze the director's controls.
import { openLivingScript } from './living-script.js';
let play;
self.onmessage = ({ data }) => {
  const { id, action, ...args } = data;
  try {
    let result;
    if (action === 'open') {
      const candidate = openLivingScript(args);
      play = candidate; // Keep the previous telling intact if fitting throws.
      result = play.describe();
    } else {
      if (!play) throw new Error('The loom has not opened.');
      switch (action) {
        case 'next': result = play.next(); break;
        case 'ask': result = play.ask(args.prompt); break;
        case 'rehearse': result = play.rehearse(args.prompt); break;
        case 'answer': play.answerInvitation(args.answer); break;
        case 'pause': play.leaveRoomForAbsence(); break;
        case 'resume': play.resumeByChoice(); break;
        case 'end': play.endWithoutPunishment(); break;
        case 'keep': result = play.inspect(); break;
        default: throw new Error('Unknown stage action.');
      }
    }
    // History is large. Do not clone and ship it for every status update.
    const state = action === 'keep' ? result : null;
    self.postMessage({ id, action, result, kept: state !== null });
  } catch (error) {
    self.postMessage({ id, action, error: error.message });
  }
};
