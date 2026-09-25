import test from "node:test";
import assert from "node:assert/strict";
import { Universe, Carbon, Snake, Null, Witness } from "../src/natural-intelligence.js";

const names = ["universe", "toe", "carbon", "snake", "null", "witness"];

test("Universe is deterministic", () => {
  assert.deepEqual(Universe.mapUniverse(names), Universe.mapUniverse(names));
});

test("Carbon bonds existing bodies only", () => {
  const points = Universe.mapUniverse(names);
  const bonds = Carbon.makeCarbonBonds(points);
  const known = new Set(names);
  assert.equal(bonds.length, names.length - 1);
  for (const bond of bonds) {
    assert.ok(known.has(bond.from));
    assert.ok(known.has(bond.to));
  }
});

test("Snake never invents a place", () => {
  const points = Universe.mapUniverse(names);
  const path = Snake.walkSnakePath(points, Carbon.makeCarbonBonds(points));
  assert.deepEqual(new Set(path), new Set(names));
});

test("Null can hold a balanced choice open", () => {
  assert.equal(Null.holdOpenChoice(0.51, 0.49).verdict, "held-open");
});

test("Witness recalls held language", () => {
  assert.equal(
    Witness.answerOnlyFromRecord("toe knows by touching", ["The toe knows by touching."]).verdict,
    "held-in-order"
  );
});

test("Witness refuses absent language", () => {
  assert.deepEqual(
    Witness.answerOnlyFromRecord("moon made of code", ["The toe knows by touching."]),
    { verdict: "refuse", text: "" }
  );
});
