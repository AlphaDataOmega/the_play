import { mkdirSync, writeFileSync } from "node:fs";
import {
  Null, Witness, performNaturalIntelligence, renderUniverseAsSvg
} from "../src/natural-intelligence.js";

const characterNames = ["universe", "toe", "carbon", "snake", "null", "witness"];
const record = [
  "The universe knows by holding relations.",
  "Carbon knows by bonding.",
  "The snake knows by moving.",
  "The toe knows by touching."
];

console.log("\nNATURAL INTELLIGENCE\n");
console.log("ACT I — THE MAP");

const state = performNaturalIntelligence({ characterNames, record });
for (const contact of state.toeContacts) console.log(`TOE: ${contact.text}`);

console.log("\nACT II — THE WALK");
for (const bond of state.carbonBonds) {
  console.log(`CARBON: ${bond.from} — ${bond.to} (distance ${bond.distance})`);
}
console.log(`SNAKE: ${state.snakePath.join(" -> ")}`);

console.log("\nACT III — THE NULL");
console.log("NULL:", Null.holdOpenChoice(0.51, 0.49));

console.log("\nACT IV — THE RECORD");
for (const phrase of [
  "the toe knows by touching",
  "touching by knows toe the",
  "the moon is made of code"
]) {
  console.log(`WITNESS [${phrase}]:`, Witness.answerOnlyFromRecord(phrase, record));
}

console.log("\nACT V — NATURAL INTELLIGENCE");
console.log("CHORUS: No character contains the intelligence.");
console.log("CHORUS: It happened between them.\n");

const dir = new URL("../art/generated/", import.meta.url);
mkdirSync(dir, { recursive: true });
writeFileSync(new URL("universe.svg", dir), renderUniverseAsSvg(state.universeMap, state.carbonBonds));
console.log("ART: wrote art/generated/universe.svg");
