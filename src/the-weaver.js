/**
 * NATURAL INTELLIGENCE / The working part of the Weaver
 *
 *     } | {                 } ~ {
 *  The edges arrive.    The middle learns their shape.
 *
 * This is the ado_on organism, not an imitation of its decisions. The named
 * entrances below call its original functions. The skin is a new, reversible
 * drawing of those readings. Drawing a straight edge does not prove a thought.
 */
const upstream = await import('../vendor/ado_on/Ω.js');
const field = upstream.default ?? globalThis.ΑΔΩ;
if (!field?.Organism) throw new Error('The pinned ado_on engine did not load.');

// The cast changes its names, not its work. These are the original functions.
export const readTheSevenStates = field.tile;
export const turnTowardThreeFaces = field.faces;
export const walkTheAddress = field.τ;
export const meetAcrossTheDoorway = field.θ;
export const letTheNeighborsAnswer = field.ἀστήρ;
export const decodeTheVoice = field.utf8;
export const locateTheThreshold = field.willBound;
export const proportions = Object.freeze({
  goldenStep: field.φ, opening: field.φ7, returningBeat: field.Φ7,
  doorway: field.Θ, chanceFloor: field.ν, dimensions: field.DIM,
  filledDimensions: field.FILL, directions: field.DIRS
});

const copy = value => structuredClone(value);
const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true });
const LIMIT = 256 * 1024; // Local theatre budget, not an organism constant.

/** Explicit byte strings avoid upstream's ambiguous Latin-1/text heuristic. */
export function carryBytes(bytes) {
  if (!(bytes instanceof Uint8Array)) throw new TypeError('Expected Uint8Array.');
  let result = '';
  for (const byte of bytes) result += String.fromCharCode(byte);
  return result;
}
export function carryText(text) {
  if (typeof text !== 'string') throw new TypeError('Expected text.');
  return carryBytes(encoder.encode(text));
}
const checkSteps = steps => {
  if (!Number.isInteger(steps) || steps < 1 || steps > 64) {
    throw new RangeError('A walk needs 1 through 64 steps.');
  }
};

/**
 * A field can hear without eating. Only takeText/takeBytes replace its source.
 * Prompting it is not an undocumented training event. The default lens, constants,
 * delimiter behavior, voting, calibration, and per-word gate are untouched.
 */
export class Weaver {
  #organism;
  #generation = 0;

  takeText(text, options) { return this.takeBytes(encoder.encode(requireText(text)), options); }

  takeBytes(bytes, { lens } = {}) {
    if (!(bytes instanceof Uint8Array)) throw new TypeError('Expected Uint8Array.');
    if (!bytes.length || bytes.length > LIMIT) throw new RangeError(`A local source needs 1 through ${LIMIT} bytes.`);
    if (lens !== undefined && (!(lens instanceof Float32Array) || lens.length !== 256 * field.DIM || !lens.every(Number.isFinite))) {
      throw new TypeError('A lens needs 256 × DIM finite Float32 values.');
    }
    // A new body prevents a previous corpus's orderPoles surviving feed().
    // Finish the candidate first: a rejected replacement must not erase the old one.
    const candidate = new field.Organism().feed(carryBytes(bytes), lens?.slice());
    candidate.measureOrderPole();
    this.#organism = candidate;
    this.#generation += 1;
    return this;
  }

  #body() {
    if (!this.#organism) throw new Error('Give the Weaver a source before asking it to speak.');
    return this.#organism;
  }

  hearText(prompt) { return this.hearBytes(encoder.encode(requireText(prompt))); }
  hearBytes(prompt) { return copy(this.#body().hear(carryBytes(prompt))); }
  readText(prompt) { return copy(this.#body().read(carryText(prompt))); }

  followTheMemory(prompt, { steps = 4 } = {}) {
    checkSteps(steps);
    return copy(field.listen(this.#body(), carryText(prompt), steps));
  }

  describeTheField() {
    const body = this.#body();
    const measurements = [body.poles?.answered, body.poles?.stranger,
      body.orderPoles?.ordered, body.orderPoles?.scrambled];
    return copy({ generation: this.#generation, bytes: body.buf.length,
      alphabet: body.live.size, places: body.pos.length, window: body.window,
      poles: body.poles, orderPoles: body.orderPoles,
      calibrated: measurements.every(Number.isFinite) });
  }

  /** Three nested address paths per byte, including explicit unknowns. */
  threadsFor(bytes) {
    if (!(bytes instanceof Uint8Array)) throw new TypeError('Expected Uint8Array.');
    const body = this.#body();
    return Array.from(bytes, (byte, offset) => ({ byte, offset,
      faces: copy(body.addr.get(byte) ?? null) }));
  }

  /** Return a real, bounded passage ending at a recorded word boundary. */
  passageAt(fraction, context = 240) {
    if (!Number.isFinite(fraction) || fraction < 0 || fraction > 1 || !Number.isInteger(context) || context < 1 || context > 4096) {
      throw new RangeError('Expected a fraction in [0,1] and a context of 1–4096 bytes.');
    }
    const body = this.#body();
    const positions = body.pos.filter(at => at >= context && at < body.buf.length - 1);
    if (!positions.length) throw new Error('This source is too short for the requested passage.');
    const at = positions[Math.min(positions.length - 1, Math.floor(fraction * positions.length))];
    let start = at - context;
    // The view is UTF-8; moving its first edge avoids cutting a multibyte character.
    while (start < at && (body.buf[start] & 0xc0) === 0x80) start += 1;
    return { text: decoder.decode(body.buf.slice(start, at)), start, at };
  }

  weave(prompt, { steps = 4 } = {}) {
    requireText(prompt);
    const promptBytes = encoder.encode(prompt);
    if (promptBytes.length > 4096) throw new RangeError('Keep a live cue within 4096 UTF-8 bytes.');
    const reading = this.followTheMemory(prompt, { steps });
    // listen returns a byte string. Keep that result intact beside its readable view.
    const outgoing = Uint8Array.from(reading.text, character => character.charCodeAt(0));
    const left = this.threadsFor(promptBytes);
    const right = this.threadsFor(outgoing);
    return {
      prompt, reading, voice: decodeTheVoice(reading.text), left, right,
      leftWiggle: drawAddressThread(left), rightWiggle: drawAddressThread(right),
      field: this.describeTheField()
    };
  }
}

function requireText(text) {
  if (typeof text !== 'string') throw new TypeError('Expected text.');
  return text;
}

/** A visual projection, not a codec: the complete addresses stay beside it. */
export function drawAddressThread(threads) {
  return threads.flatMap(thread => thread.faces
    ? thread.faces.flatMap(face => face.map(turn => (turn * 2 - 3) / 3))
    : [0]);
}

/**
 * THE TRANSDUCTION / Do not destroy the bend. Change who carries it.
 *
 * Each input sample is split between its edge and its own place in the middle.
 * Left and right are interleaved, never averaged: opposites cannot cancel a memory.
 * Reuniting an edge with its middle reconstructs the input, within float precision.
 */
export function moveTheWigglesInside(left, right, progress) {
  for (const side of [left, right]) {
    if (!Array.isArray(side) || side.length > 100000 || !side.every(Number.isFinite)) {
      throw new TypeError('Each thread must be an array of at most 100000 finite samples.');
    }
  }
  if (!Number.isFinite(progress) || progress < 0 || progress > 1) throw new RangeError('Progress belongs in [0,1].');
  const count = Math.max(left.length, right.length);
  const middle = [];
  for (let index = 0; index < count; index += 1) {
    middle.push(progress * (left[index] ?? 0), progress * (right[index] ?? 0));
  }
  return { progress, lengths: [left.length, right.length],
    left: left.map(bend => (1 - progress) * bend),
    right: right.map(bend => (1 - progress) * bend), middle };
}

export function returnTheWiggles(weave) {
  return {
    left: weave.left.map((bend, index) => bend + weave.middle[index * 2]),
    right: weave.right.map((bend, index) => bend + weave.middle[index * 2 + 1])
  };
}

/**
 * SNAKE / One committed skin, not a cloud of possible skins.
 * Pausing does not spend a beat. Ending does not impersonate pausing.
 * All reads are detached copies; the next stitch cannot revise an earlier one.
 */
export function keepTheSkin({ capacity = 256 } = {}) {
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 10000) throw new RangeError('Invalid skin capacity.');
  const stitches = [];
  let state = 'open';
  return Object.freeze({
    get state() { return state; },
    get length() { return stitches.length; },
    inspect: () => ({ state, stitches: copy(stitches), capacity }),
    stitch(event) {
      if (state !== 'open') throw new Error(`The loom is ${state}.`);
      if (stitches.length === capacity) throw new Error('This skin is full; keep it and begin another.');
      const kept = copy(event); // Clone before append so clone failure leaves no scar.
      const stitch = { sequence: stitches.length + 1, event: kept };
      stitches.push(stitch);
      return copy(stitch);
    },
    leaveRoomForAbsence() { if (state !== 'ended') state = 'paused'; },
    resumeByChoice() { if (state === 'paused') state = 'open'; },
    endWithoutPunishment() { state = 'ended'; }
  });
}
