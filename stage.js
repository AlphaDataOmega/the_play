// The director moves time. Only the worker may ask the organism to read.
import { moveTheWigglesInside } from './src/the-weaver.js';
const $ = id => document.getElementById(id);
const worker = new Worker(new URL('./src/loom-worker.js', import.meta.url), { type: 'module' });
let serial = 0, pending = new Map(), busy = false, paused = false, ended = false;
let awaitingChoice = false, auto = null, animation = null, current = null, generation = 0;
let memorySource, pauseAfterWork = false, workerFailed = false;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function request(action, args = {}) {
  if (workerFailed) return Promise.reject(new Error('Reload to restart the offstage worker.'));
  const id = ++serial;
  return new Promise((resolve, reject) => { pending.set(id, { resolve, reject }); worker.postMessage({ id, action, ...args }); });
}
worker.onmessage = ({ data }) => {
  const promise = pending.get(data.id); if (!promise) return;
  pending.delete(data.id); data.error ? promise.reject(new Error(data.error)) : promise.resolve(data.result);
};
worker.onerror = event => {
  workerFailed = true;
  for (const promise of pending.values()) promise.reject(new Error(event.message || 'The offstage worker stopped.'));
  pending.clear(); stopAuto(); $('status').textContent = 'The offstage worker stopped. Reload to open a new performance.';
};
function controls() {
  for (const id of ['next','auto','ask','mirror','pause','end']) $(id).disabled = busy || ended || workerFailed;
  for (const id of ['next','auto','ask']) $(id).disabled ||= paused || awaitingChoice;
  $('pause').disabled ||= awaitingChoice;
  $('pause').textContent = paused ? 'Resume by choice' : 'Pause';
  $('file').disabled = busy || workerFailed; $('new').disabled = busy || workerFailed;
  document.querySelectorAll('[data-answer]').forEach(b => b.disabled = busy);
}
async function work(fn) {
  if (busy) return;
  busy = true; controls(); $('status').textContent = '';
  try { await fn(); } catch (error) { stopAuto(); $('status').textContent = error.message; }
  finally {
    if (pauseAfterWork && !ended && !awaitingChoice) {
      pauseAfterWork = false; stopAuto(); stopAnimation();
      try { await request('pause'); paused = true; } catch (error) { $('status').textContent = error.message; }
    }
    busy = false; controls();
  }
}

function pathOf(samples, x, amplitude) {
  // Limit drawn vertices only. The complete samples and addresses stay in the skin.
  const n = Math.max(2, Math.min(260, samples.length || 2));
  return Array.from({ length:n }, (_, i) => {
    const sample = samples.length ? samples[Math.round(i * (samples.length - 1) / (n - 1))] : 0;
    return `${i ? 'L' : 'M'}${(x + sample * amplitude).toFixed(2)},${(28 + i * 390 / (n - 1)).toFixed(2)}`;
  }).join(' ');
}
function draw(progress) {
  const result = current ? moveTheWigglesInside(current.leftWiggle, current.rightWiggle, progress)
    : { left:[], middle:[], right:[] };
  $('left').setAttribute('d',pathOf(result.left,150,48));
  $('middle').setAttribute('d',pathOf(result.middle,450,62));
  $('right').setAttribute('d',pathOf(result.right,750,48));
  $('transfer').value = Math.round(progress*1000); $('percent').textContent = `${Math.round(progress*100)}%`;
  $('field').setAttribute('aria-label',`${Math.round(progress*100)} percent of the projected bends carried in the middle. Complete input samples are retained.`);
}
function stopAnimation() { if (animation !== null) cancelAnimationFrame(animation); animation = null; }
function animate(target = 1) {
  stopAnimation(); draw(0);
  if (reduced || target === 0) { draw(target); return; }
  const beginning = performance.now();
  const tick = now => {
    const progress = Math.min(1,(now-beginning)/2400);
    draw((progress*progress*(3-2*progress))*target);
    if(progress<1) animation=requestAnimationFrame(tick); else animation=null;
  };
  animation=requestAnimationFrame(tick);
}
function showReading(weave, { rehearsal = false, target = 1 } = {}) {
  current=weave; $('transfer').disabled=false;
  $('prompt').value=weave.prompt.includes('\0') ? '' : weave.prompt;
  $('verdict').textContent=`${rehearsal ? 'Mirror only · ' : ''}${weave.reading.verdict}`;
  $('voice').textContent=weave.voice || 'The opening remains quiet.';
  $('field-info').textContent=`ado_on Ω · ${weave.field.bytes} source bytes · ${weave.field.alphabet} byte shapes · window ${weave.field.window}`;
  $('evidence').textContent=JSON.stringify({ prompt:weave.prompt,reading:weave.reading,
    source:weave.field,firstThread:weave.left[0],inputSamples:[weave.leftWiggle.length,weave.rightWiggle.length],
    projection:'Interleaved two-channel transfer; full addresses retained. A visual interpretation, not wave-energy measurement.' },null,2);
  $('stage-note').textContent=rehearsal ? 'A possible reading. No stitch has been added.' : 'The edges grow quiet. Their bends have not been erased.';
  animate(target);
}
function addStitch(sequence, title) {
  const marker=document.createElement('i');marker.title=`${sequence}. ${title}`;
  marker.setAttribute('aria-label',marker.title);$('skin').append(marker);$('keep').disabled=false;
}
function showFrame(frame) {
  const event=frame.event;
  $('act').textContent=`ACT ${event.act} / ${event.actTitle}`;$('title').textContent=event.title;
  $('direction').textContent=event.direction;$('motif').textContent=event.motif;
  $('dialogue').replaceChildren();
  for(const [speaker,line] of event.lines){const p=document.createElement('p'),b=document.createElement('strong');b.textContent=speaker;p.append(b,document.createTextNode(line));$('dialogue').append(p);}
  addStitch(frame.sequence,event.title);showReading(event.weave,{target:event.bend.progress});
  paused=frame.state==='paused';ended=frame.state==='ended';awaitingChoice=frame.awaitingChoice;
  $('invitation').hidden=!awaitingChoice;
  $('next').textContent=ended?'The world remains':'Next scene';
  if(paused||ended||awaitingChoice)stopAuto();
  if(event.action==='absence')$('status').textContent='The Empty Chair has paused the loom. Resume only when you choose.';
}
async function next(){await work(async()=>{const frame=await request('next');if(frame)showFrame(frame);});}
function stopAuto(){clearInterval(auto);auto=null;$('auto').textContent='Let it unfold';}
$('next').onclick=next;
$('auto').onclick=async()=>{if(auto){stopAuto();return;}await next();if(!document.hidden&&!paused&&!ended&&!awaitingChoice){auto=setInterval(()=>{if(!busy)next();},18000);$('auto').textContent='Stop unfolding';}};
$('pause').onclick=()=>work(async()=>{stopAuto();stopAnimation();await request(paused?'resume':'pause');paused=!paused;});
$('end').onclick=()=>work(async()=>{stopAuto();stopAnimation();await request('end');ended=true;paused=false;awaitingChoice=false;$('invitation').hidden=true;$('status').textContent='This telling has ended. Its skin remains available to keep.';});
$('transfer').oninput=()=>{stopAnimation();draw(Number($('transfer').value)/1000);};
$('prompt-form').onsubmit=event=>{event.preventDefault();work(async()=>{stopAuto();const stitch=await request('ask',{prompt:$('prompt').value});addStitch(stitch.sequence,stitch.event.title);showReading(stitch.event.weave);});};
$('mirror').onclick=()=>work(async()=>{stopAuto();showReading(await request('rehearse',{prompt:$('prompt').value}),{rehearsal:true});});
document.querySelectorAll('[data-answer]').forEach(button=>button.onclick=()=>work(async()=>{await request('answer',{answer:button.dataset.answer});awaitingChoice=false;paused=false;$('invitation').hidden=true;
  const frame=await request('next');if(frame){addStitch(frame.sequence-1,'Life answers for itself');showFrame(frame);}}));
async function open(source,sourceName){
  stopAuto();stopAnimation();$('status').textContent='The Weaver is taking the source into its field…';
  const description=await request('open',source===undefined?{}:{source,sourceName});
  paused=false;ended=false;awaitingChoice=false;current=null;generation+=1;
  $('skin').replaceChildren();$('dialogue').replaceChildren();$('invitation').hidden=true;
  $('act').textContent='BEFORE THE BEGINNING';$('title').textContent='A closing. A thread. An opening.';
  $('direction').textContent='The real organism holds the written source. Each scene asks it to read; each reading leaves a stitch.';
  $('motif').textContent='} | {';$('prompt').value='';$('voice').textContent='';$('verdict').textContent='It has not been asked.';
  $('evidence').textContent=JSON.stringify(description,null,2);$('keep').disabled=true;$('transfer').disabled=true;$('next').textContent='Raise the curtain';
  $('source-name').textContent=`Memory: ${description.sourceName}.`;
  $('field-info').textContent=`ado_on Ω · ${description.bytes} source bytes · ${description.alphabet} byte shapes · window ${description.window}`;
  $('status').textContent=description.calibrated?'The field is ready.':'This source does not supply finite calibration poles; its readings may be uninformative.';
  draw(0);
}
$('new').onclick=()=>work(()=>open(memorySource?.source,memorySource?.sourceName));
$('file').onchange=()=>work(async()=>{
  const file=$('file').files[0];if(!file)return;
  if(file.size>262144||file.size<1)throw new Error('Choose a text file between 1 and 262144 bytes.');
  const source=new TextDecoder('utf-8',{fatal:true}).decode(await file.arrayBuffer());
  await open(source,file.name);memorySource={source,sourceName:file.name};
});
$('keep').onclick=()=>work(async()=>{
  const history=await request('keep');const file=new Blob([JSON.stringify(history,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(file),a=document.createElement('a');a.href=url;a.download=`natural-intelligence-skin-${generation}-${history.stitches.length}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden&&!paused&&!ended&&!awaitingChoice){
    pauseAfterWork=true;stopAuto();stopAnimation();
    if(!busy)work(async()=>{});
  }
});
draw(0);work(()=>open());
