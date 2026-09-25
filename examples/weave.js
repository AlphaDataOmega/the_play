import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { openLivingScript } from '../src/living-script.js';
import { readingScript } from '../src/the-thread.js';

// Batch theatre must name its answers. It never mistakes unattended for consenting.
const args = process.argv.slice(2);
let answer, source, sourceName, resumeAbsence = false;
try {
  for (const arg of args) {
    if (arg.startsWith('--invitation=')) answer = arg.slice(13);
    else if (arg === '--resume-absence') resumeAbsence = true;
    else if (arg.startsWith('--source=')) {
      sourceName=arg.slice(9);
      const bytes=readFileSync(sourceName);
      if(bytes.length>262144)throw new Error('Source exceeds the local theatre budget.');
      source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
    } else throw new Error('Usage: npm run play -- [--source=file.txt] [--resume-absence] [--invitation=accept|wait|decline]');
  }
  if(answer!==undefined&&!['accept','wait','decline'].includes(answer))throw new Error('Invalid invitation answer.');
  const play=openLivingScript({source,sourceName});
  let previousAct=0;
  for (;;) {
    const frame=play.next();
    if(!frame){const state=play.inspect();
      if(state.awaitingChoice && answer!==undefined){play.answerInvitation(answer);continue;}
      if(state.state==='paused'&&!state.awaitingChoice&&resumeAbsence){play.resumeByChoice();continue;}
      break;
    }
    const e=frame.event;
    if(e.act!==previousAct){console.log(`\nACT ${e.act} / ${e.actTitle}\n`);previousAct=e.act;}
    console.log(`${e.title}\n${e.motif}\n`);
    for(const [speaker,line] of e.lines)console.log(`${speaker}: ${line}`);
    console.log(`\n[ado_on: ${e.weave.reading.verdict}] ${e.weave.voice || '(silence)'}\n`);
  }
  const dir=new URL('../art/generated/',import.meta.url);mkdirSync(dir,{recursive:true});
  writeFileSync(new URL('living-script.md',dir),readingScript());
  writeFileSync(new URL('skin.json',dir),JSON.stringify(play.inspect(),null,2)+'\n');
  console.log(`The loom is ${play.inspect().state}. Its skin is in art/generated/skin.json.`);
} catch(error){console.error(error.message);process.exitCode=1;}
