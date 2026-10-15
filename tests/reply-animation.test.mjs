import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
function setup(reduceMotion=false){const context={window:{}};vm.runInNewContext(readFileSync(new URL('../reply-animation.js',import.meta.url),'utf8'),context);let now=0,id=0;const jobs=new Map(),chunks=[];let finished=0,started=0;const task=context.window.PortfolioReply.animate({text:'A sourced answer about Ayan.',reduceMotion,onStart:()=>started++,onChunk:s=>chunks.push(s),onFinish:()=>finished++,schedule:(f,ms)=>{jobs.set(++id,{at:now+ms,f});return id;},unschedule:i=>jobs.delete(i)});function tick(ms){const end=now+ms;while(true){const next=[...jobs].sort((a,b)=>a[1].at-b[1].at)[0];if(!next||next[1].at>end)break;now=next[1].at;jobs.delete(next[0]);next[1].f();}now=end;}return {task,tick,chunks,get finished(){return finished;},get started(){return started;}};}
test('reply waits one second, reveals text progressively and completes once',()=>{const r=setup();r.tick(999);assert.equal(r.chunks.length,0);r.tick(1);assert.equal(r.started,1);assert.ok(r.chunks[0].length<27);r.tick(3000);assert.equal(r.chunks.at(-1),'A sourced answer about Ayan.');assert.equal(r.finished,1);});
test('reduced motion skips character animation after the thinking delay',()=>{const r=setup(true);r.tick(1000);assert.deepEqual(r.chunks,['A sourced answer about Ayan.']);assert.equal(r.finished,1);});
test('show reply can finish early and cancelled work never reveals later',()=>{const r=setup();r.task.finish();r.tick(5000);assert.equal(r.finished,1);const c=setup();c.task.cancel();c.tick(5000);assert.equal(c.chunks.length,0);assert.equal(c.finished,0);});

test('every chat entry page loads the animation dependency before the guide',()=>{
 for(const path of ['index.html','articles/vision-model-benchmark.html','builds/job-search-agent.html','builds/product-teardown-agent.html']){
  const html=readFileSync(new URL('../'+path,import.meta.url),'utf8');
  assert.ok(html.indexOf('reply-animation.js')>=0);assert.ok(html.indexOf('reply-animation.js')<html.indexOf('guide.js'));
 }
});
