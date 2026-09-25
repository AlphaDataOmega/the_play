# Natural Intelligence

*The thread, the skin, and the room between.*

A living script after V / James Sterling Tuttle's seven-part story, now performed
with the **actual ado_on organism**. New dialogue, Weaver interface and staging by
ChatGPT, at V's invitation.

> **V:** You have straightened the world.
>
> **WEAVER:** I have taken my turn at bending.

## Raise the curtain

Node.js 20+. No packages, model downloads, keys, wallets or network calls needed
by the performance after the repository is present.

```sh
npm test
npm start
```

Open `http://127.0.0.1:8080`. Advance, pause, move the wiggles by hand, ask a cue,
look in the Mirror, or keep the skin as JSON. Fit/calibration runs offstage in a
browser Worker. A local UTF-8 text file can become the organism's source; it does
not leave the browser. It changes the field's memory, not the authored dialogue.

```sh
npm run play
npm run play -- --resume-absence --invitation=accept
npm run play -- --resume-absence --invitation=wait
npm run play -- --source=my-text.txt --resume-absence --invitation=decline
```

The first command pauses at the Empty Chair. Unattended is not consenting.
Batch flags explicitly authorize resuming absence and answering the invitation.
Outputs replace `art/generated/skin.json` and `art/generated/living-script.md` on
another run. Copy them to keep separate performances.

## The real engine

`vendor/ado_on/Ω.js` is an unchanged, pinned source snapshot. Its entire 27,029-byte
content has the same Git blob identity as the upstream file. The original
corpus-derived encoder, all 256 dimensions, three faces, cascade, delimiter-aware
index, ten directions, star voting, calibration and per-word speech gate remain.

`src/the-weaver.js` supplies informative names and a reusable interface:

```js
import { Weaver, keepTheSkin, moveTheWigglesInside } from './src/the-weaver.js';

const organism = new Weaver().takeText(yourText);
const skin = keepTheSkin();
const meeting = organism.weave(yourPrompt, { steps: 4 });

// Do not destroy the bend. Change who carries it.
const body = moveTheWigglesInside(
  meeting.leftWiggle,
  meeting.rightWiggle,
  1
);
skin.stitch({ meeting, body });
```

`readTheSevenStates`, `turnTowardThreeFaces`, `walkTheAddress`,
`meetAcrossTheDoorway` and `letTheNeighborsAnswer` are references to the original
exported functions, not replacement algorithms.

The new boundary interface explicitly separates UTF-8 text from raw bytes and
fits a fresh body on source replacement, so an old corpus's order poles cannot
leak into a new one. It does not claim better recall, generalization or compression.

## A closing. A thread. An opening.

The incoming cue and returned byte words have actual three-faced addresses. Their
address turns produce the two projected wavering lines. At the start, the middle
is straight. At the finish, the outside lines are straight and the middle carries
both sets of bends in separate interleaved positions. `returnTheWiggles` recovers
them. No averaging allows an opposite to erase its partner.

That reversible drawing is new stage machinery. It is not secretly an upstream
wave solver or proof of physical transduction. Full addresses, original metrics,
byte positions and unknowns stay with each stitch; the viewport alone is sampled.

The organism's reading and the authored dialogue are visibly separate. A remembered
word comes from the actual engine. Silence is not filled by a hidden language model.
The default field holds the complete written score before the curtain rises: this
is self-reading theatre, not a claim that it learns the future during performance.

## The script a developer can read

`src/the-thread.js` holds twenty-four scenes in seven acts. `src/living-script.js`
connects their actions to the actual field, a reversible weave, and one committed
history. The Empty Chair pauses. The invitation has no default answer. The Mirror
can read without adding a stitch. Waiting and declining remain complete tellings.

`PLAYBILL.md` introduces the company. `provenance/WEAVER.md` records the source pin,
behavioral boundaries, exact tests run and browser-testing limitation. The earlier
canon and ancestral sources remain alongside this edition.

The original `src/natural-intelligence.js`, `src/the-song.js`, earlier tests and
`examples/performance.js` remain for compatibility. `npm run play:previous` runs
the earlier twenty-one-scene edition; it is not the organism-backed performance.

## Rights

The root PolyForm Noncommercial LICENSE is unchanged. The upstream notice is
preserved beside the pinned engine. No original story corpus is republished here.
Creative text remains subject to NOTICE rather than silently being treated as
software. Historical benchmark statements in upstream comments belong to that
source, not to this artwork's test report.
