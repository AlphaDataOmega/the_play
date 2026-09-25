import { mkdirSync, writeFileSync } from 'node:fs';
import { perform, asScript } from '../src/the-song.js';

const args = process.argv.slice(2);
if (args.length > 1 || (args.length && !args[0].startsWith('--invitation='))) {
  console.error('Usage: npm run play -- --invitation=accept|wait|decline');
  process.exitCode = 1;
} else {
  try {
    const invitation = args[0]?.slice('--invitation='.length) ?? 'accept';
    const { frames, world } = perform({ invitation });
    const script = asScript(frames);
    console.log(script);
    const directory = new URL('../art/generated/', import.meta.url);
    mkdirSync(directory, { recursive: true });
    writeFileSync(new URL('performance.md', directory), script);
    writeFileSync(new URL('world.json', directory), JSON.stringify(world, null, 2) + '\n');
    console.log('\nThe curtain falls. The world remains in art/generated/world.json.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
