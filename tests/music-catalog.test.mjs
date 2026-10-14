import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const context={window:{}};vm.runInNewContext(readFileSync(new URL('../music-catalog.js',import.meta.url),'utf8'),context);
const catalog=context.window.PortfolioMusicCatalogue;
test('daily selection is stable, unique, non-explicit and changes at midnight IST',()=>{
 const before=Date.parse('2026-10-15T18:29:59Z'),after=Date.parse('2026-10-15T18:30:00Z');
 const ids=t=>Array.from(catalog.dailyTracks(t),s=>s.id);
 assert.equal(ids(before).length,5);assert.equal(new Set(ids(before)).size,5);
 assert.deepEqual(ids(before),ids(before-3600000));assert.notDeepEqual(ids(before),ids(after));
 assert.equal(catalog.dayKey(after),catalog.dayKey(before)+1);
 for(let day=0;day<16;day++)for(const t of catalog.dailyTracks(after+day*86400000)){assert.equal(t.explicit,false);assert.match(t.id,/^[A-Za-z0-9]{22}$/);}
});
