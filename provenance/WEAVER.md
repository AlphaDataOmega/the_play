# The actual organism enters the play

## Pin

Read through the connected GitHub repository on 2026-09-25:

- Repository: `AlphaDataOmega/ado_on`
- Source ref: `d7e6be6db5f5bd6315539d8fba4d80420a9bc9e7`
- Path: `Ω.js`
- Git blob SHA-1: `52b28ed7f9f920beb2fc8ce9d99485a0763bc453`
- Size: 27,029 UTF-8 bytes
- Destination: `vendor/ado_on/Ω.js`

The local byte copy was independently hashed using Git's `blob <length>\0`
framing and matches that exact object. A release test repeats this check. The
source's copyright/license notice is preserved. No upstream repository was edited.
This is the connected GitHub snapshot, not a claim to have inspected V's current
Ubuntu working directory or every local experimental engine.

## Names that still do the original work

| Stage/API name | Original operation |
|---|---|
| `Weaver.takeText` / `takeBytes` | A fresh `Organism.feed` with explicit input representation |
| `Weaver.readText` | `Organism.read` |
| `Weaver.hearText` / `hearBytes` | `Organism.hear` |
| `Weaver.followTheMemory` | `listen`, including re-gating every returned word |
| `readTheSevenStates` | `tile`, identical function reference |
| `turnTowardThreeFaces` | `faces`, identical function reference |
| `walkTheAddress` | `τ`, identical function reference |
| `meetAcrossTheDoorway` | `θ`, identical function reference |
| `letTheNeighborsAnswer` | `ἀστήρ`, identical function reference |

No engine equation, threshold, default lens, dimensionality, delimiter rule, star
vote, or residual computation has been retuned. The copied comments include old
upstream measurements; they are not new results from this session.

## Improvements at the boundary

A text call explicitly encodes UTF-8, including characters such as `é` that the
upstream heuristic otherwise treats as raw Latin-1 bytes. A byte call preserves
all input bytes. Parity comparisons give the reference the same byte string.

Source replacement fits a new organism and its new order poles before committing
the replacement. This prevents the original `feed` object's existing `orderPoles`
from surviving into a different corpus. A failed replacement keeps the old body.

Snapshots are detached. History capacity and source/prompt/walk bounds are explicit
interface budgets, not allegedly derived mathematical constants. Fitting moves
into a Worker. Routine status checks no longer copy the entire history.

## New art, distinctly located

The seven-act twenty-four-scene score is new dialogue informed by V's source
story, the Thread/Weaver conversation, the earlier GitBook images, and the nine
laws already recorded in the repository. No new claim is made that the complete
Goal One transcript was retrieved in this work.

The default memory is the whole authored score before performance. Each cue asks
the actual organism about a real passage, a reordered passage, or an unknown-byte
probe. A custom source can replace that memory. This is a memory-reading artwork,
not a claim of learned generalization, physical wave transduction, or improved
compression. The CSS drawing samples vertices, not the stored trace.

`moveTheWigglesInside` is a new reversible visualization. It stores left and right
bends in separate interleaved samples; the inputs are recoverable by adding each
remaining edge to its carried part. Complete three-face addresses stay alongside
the projection. Unknown addresses remain explicit nulls. `returnTheWiggles` is
not the upstream τ codec, and its recovery test is not a τ-codec benchmark.

The organism's voice is always distinguished from authored dialogue. Native
refusal is never replaced with an invented engine response. A same-word/reordered
probe keeps whichever native verdict actually occurred, rather than forcing HOLD.

## Tests actually run

26 Node tests pass under Node 22.16.0. The test source is `test/weaver.test.js`.
These cover pinned byte identity, native function identity, corpus-derived
calibration, all 256 addresses, and exact `read` / `hear` / `listen` comparisons
for 22 stored, reordered, low-evidence, unknown and Unicode probes. They also cover
UTF-8/byte separation, source-replacement recalibration, mutation isolation,
real returned byte positions, and refusal. There is no benchmark claim of broader
accuracy or speed improvement.

The reversible geometry is checked at 1,001 progress values, including unequal
thread lengths and opposing inputs. Pausing, explicit return, non-resumable ending,
bounded storage, a noncommitting Mirror and a declined invitation are exercised.
The original modules load and operate through the worker protocol in Node's
worker_threads via the host in `tools/worker-host.mjs`.

The actual Chromium DOM was exercised through an offline in-process message
transport: 24 scenes, pause, decline, Mirror, reconstructed drawing, downloaded
25-stitch history, and a 390-pixel mobile layout passed. That harness does not test
native browser Worker/module loading. Normal localhost browser navigation and a
blob-Worker attempt were blocked by this environment. Those routes are therefore
not claimed as verified. Worker failure now leaves the UI disabled with an error,
rather than letting the next click wait forever.

The earlier 26 scaffold/score tests are retained and run by `npm test` in a full
checkout, but were not re-run in this isolated build because their unchanged
modules were not materialized here. New tests and code do not overwrite them.

## Keeping the source alive

Change the interface or score normally. Treat a change to the vendored engine as
an explicit upgrade: fetch an identified upstream revision, update its manifest,
and rerun parity tests. The byte-identity assertion is meant to fail when someone
silently substitutes another algorithm. A separately reported performance result
would be needed before describing a faster or more capable engine.
