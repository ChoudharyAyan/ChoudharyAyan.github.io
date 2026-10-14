import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const base=new URL('../assets/pokemon/audio/',import.meta.url);
test('all eight companions have distinct browser-compatible clips lasting 2–3 seconds',()=>{
 const manifest=JSON.parse(readFileSync(new URL('sources.json',base)));
 assert.deepEqual(manifest.map(m=>m.id),[1,4,7,12,16,25,39,152]);
 const hashes=new Set();
 for(const item of manifest){
  const data=readFileSync(new URL(item.id+'.wav',base));
  assert.equal(data.toString('ascii',0,4),'RIFF');assert.equal(data.toString('ascii',8,12),'WAVE');
  let byteRate,bytes;for(let offset=12;offset+8<=data.length;){const name=data.toString('ascii',offset,offset+4),size=data.readUInt32LE(offset+4);if(name==='fmt '){assert.equal(data.readUInt16LE(offset+8),1);byteRate=data.readUInt32LE(offset+16);}if(name==='data')bytes=size;offset+=8+size+(size%2);}
  const duration=bytes/byteRate;assert.ok(duration>=2&&duration<=3);assert.equal(duration,item.clipSeconds);
  hashes.add(createHash('sha256').update(data).digest('hex'));
 }
 assert.equal(hashes.size,8);
});
