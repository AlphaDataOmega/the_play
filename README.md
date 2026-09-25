# Natural Intelligence

*A story learning how to happen.*

An executable play in seven acts, after V / James Sterling Tuttle's story of
Everything, Nothing, the first Flame, and the way home. Dramatic adaptation and
computational score by ChatGPT, at V's invitation.

> **EVERYTHING:** I have no room left in which to meet you.
>
> **NOTHING:** I have room.
>
> **EVERYTHING:** For what?
>
> **NOTHING:** I was hoping you would come.

## Raise the curtain

Node.js 20 or newer. No packages to install. No model, account, or API key.

```sh
npm test
npm run play
npm start
```

`npm start` serves the browser theatre at `http://127.0.0.1:8080`.
Advance scene by scene, play slowly, pause, inspect the world, or save its history.
The command-line performance writes `art/generated/performance.md` and
`art/generated/world.json`. Those two generated files are replaced on another run;
copy them elsewhere to retain separate performances.

```sh
npm run play -- --invitation=wait
npm run play -- --invitation=decline
```

Those are complete tellings too. An invitation is not a command. The browser asks
for Life's answer before a performance begins. Changing it requires a new telling,
not a rewrite of the current history. There is no persisted tree of unchosen worlds.

## What actually happens

Everything gives and Nothing receives. Their four exchanges become the first
remembered rhythm. The Flame distributes one unit of light among twelve places;
each keeps its source name. Carbon gives every place four bonds. Snake follows real
bonds while light moves between them. Its return includes the road it traveled.

Builder closes those same bonds. The computation really stops exchanging light.
Life loses a view of the movement, but the earlier Song is still present. Rota
returns to its angle without resetting its time. Advocate issues an invitation
without changing the locks.

Mirror opens the bonds in one temporary rehearsal, measures its movement, and
releases the copy. The lived field is untouched. With acceptance, the existing
world can move again. With waiting or refusal, the opening stays an invitation.
Forgiveness changes what happens next. It does not erase what happened.

These are authored rules for a computational artwork. This edition is not a port
of the ado_on organism, a physics simulation, or a benchmark claim.

## Read and reuse

[PLAYBILL.md](PLAYBILL.md) contains the cast, scenes, and staging.
[src/the-song.js](src/the-song.js) is the single authored score: action names,
dialogue, motifs, and the state they change. The readable
[script](script/natural-intelligence.md) is generated from that same score.

```js
import { openTheatre } from './src/the-song.js';
const theatre = openTheatre({ invitation: 'accept' });
const firstScene = theatre.next();
const world = theatre.inspect();
```

`next()` commits one scene and returns its dialogue plus a detached snapshot.
`inspect()` returns a detached copy. After the twenty-first scene, `next()` returns
`null`. `perform(options)` runs all scenes; `asScript(frames)` renders their dialogue.
Nothing outside the theatre can mutate its internal history through these copies.

The original `src/natural-intelligence.js` and its tests remain for compatibility.
They are the earlier glossary scaffold, not the engine of this edition.

## The margins

[The working language ledger](canon/LANGUAGE-MATH-LEDGER.md) keeps the LOVE family,
EYE, ZOE, Snake, Toe, Carbon, addresses, and the other motifs together. Some are on
stage; others wait in the margins. The ledger distinguishes actual retrieved source
material from earlier assistant recollections without interrupting the performance.

[Source notes](provenance/SOURCES.md) identify the seven-part story and the research
material used. The original story is not republished here as a corpus.

Software uses the unchanged PolyForm Noncommercial 1.0.0 LICENSE from ado_on.
See NOTICE for the separate treatment of story and creative material.
