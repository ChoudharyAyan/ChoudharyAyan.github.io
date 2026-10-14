/* A local retrieval guide. No model service, credentials or message transmission. */
(function(){
 const siteBase=new URL('./',document.currentScript.src);
 const companions=[
 {id:25,name:'Pikachu',cry:'Pika pika!',intro:'Let’s spark a little curiosity.',prompt:'Summarise Ayan’s profile'},
 {id:4,name:'Charmander',cry:'Char char!',intro:'Ready to see what Ayan is building?',prompt:'What has Ayan built?'},
 {id:1,name:'Bulbasaur',cry:'Bulba bulba!',intro:'Let’s start with the roots.',prompt:'Tell me about Ayan’s education'},
 {id:7,name:'Squirtle',cry:'Squirtle squirt!',intro:'Take a relaxed tour with me.',prompt:'Tell me about The WardrobeOS'},
 {id:39,name:'Jigglypuff',cry:'Jiggly puff!',intro:'Settle in for a short introduction.',prompt:'Summarise Ayan’s profile'},
 {id:152,name:'Chikorita',cry:'Chiko chiko!',intro:'A little background before we explore?',prompt:'Tell me about Ayan’s career'},
 {id:16,name:'Pidgey',cry:'Pidge pidge!',intro:'Let’s find your next stop.',prompt:'How can I contact Ayan?'},
 {id:12,name:'Butterfree',cry:'Free free!',intro:'Follow your curiosity.',prompt:'What did the benchmark find?'}
 ];
 let companion;try{companion=companions.find(c=>String(c.id)===sessionStorage.getItem('ayan-companion'));}catch{}
 companion ||= companions[Math.floor(Math.random()*companions.length)];
 function remember(){try{sessionStorage.setItem('ayan-companion',String(companion.id));}catch{}}
 remember();
 function avatar(c=companion){return '<img class="guide-avatar" src="'+new URL('assets/pokemon/'+c.id+'.png',siteBase).href+'" alt="" width="64" height="64">';}

 const root=document.getElementById('profile-guide');if(!root)return;root.classList.add('ph-no-capture');
 root.innerHTML='<button class="guide-launcher" aria-expanded="false" aria-controls="guide-panel">'+avatar()+'<span>Ask your guide<small>Your guide to Ayan’s work</small></span></button><section class="guide-panel" id="guide-panel" role="dialog" aria-modal="false" aria-label="Your Pokémon guide" hidden><header class="guide-header">'+avatar()+'<div><strong>Your Pokémon guide</strong><small>From this portfolio</small></div><button class="guide-minimize" aria-label="Minimize portfolio guide">−</button><button class="guide-close" aria-label="Close portfolio guide">×</button></header><div class="guide-tools"><button type="button" class="guide-choose" aria-expanded="false" aria-controls="guide-picker">Choose Pokémon</button><button type="button" class="guide-voice">♪ Hear voice</button><span class="guide-cry" aria-hidden="true"></span></div><div id="guide-picker" class="guide-picker" hidden></div><div class="guide-log" role="log" aria-live="polite" aria-relevant="additions"></div><form class="guide-form"><label for="guide-question">Ask about Ayan’s work or background</label><div><input id="guide-question" maxlength="500" autocomplete="off" placeholder="What has Ayan built?" required><button type="submit">Ask</button></div><p class="guide-note">A local guide to published information. Messages stay in this tab. No private or confidential details.</p></form></section>';
 const launcher=root.querySelector('.guide-launcher'),panel=root.querySelector('.guide-panel'),log=root.querySelector('.guide-log'),input=root.querySelector('input');
 function sourceLink(source){const u=new URL(source.url.startsWith('#')?'index.html'+source.url:source.url,siteBase);if(!['http:','https:'].includes(u.protocol)||u.origin!==location.origin&&!source.url.startsWith('https://'))return null;const a=document.createElement('a');a.href=u.href;a.textContent=source.title+' ↗';if(u.origin!==location.origin){a.target='_blank';a.rel='noopener noreferrer';}return a;}
 function message(text,role='assistant',sources=[]){const el=document.createElement('article');el.className='guide-message'+(role==='user'?' user':'');const p=document.createElement('p');p.textContent=text;el.append(p);sources.forEach(s=>{const a=sourceLink(s);if(a)el.append(a);});log.append(el);while(log.children.length>24)log.firstElementChild.remove();log.scrollTop=log.scrollHeight;return el;}
 function ask(q){q=q.trim();if(!q)return;message(q,'user');const result=/^(who are you|what is your name)[?!.]*$/i.test(q)?{text:companion.cry+' I’m '+companion.name+', your guide to the published information on Ayan’s portfolio.',sources:[]}:window.PortfolioAnswers.answer(q);message(result.text,'assistant',result.sources);input.value='';input.focus({preventScroll:true});}
 function open(){document.dispatchEvent(new CustomEvent('portfolio-guide-open'));hideHint();panel.hidden=false;launcher.setAttribute('aria-expanded','true');input.focus({preventScroll:true});}
 function close(){stopVoice();panel.hidden=true;launcher.setAttribute('aria-expanded','false');launcher.focus({preventScroll:true});}
 launcher.addEventListener('click',()=>panel.hidden?open():close());root.querySelector('.guide-close').addEventListener('click',close);root.querySelector('.guide-minimize').addEventListener('click',()=>{panel.hidden=true;launcher.setAttribute('aria-expanded','false');launcher.focus({preventScroll:true});});document.querySelectorAll('[data-open-guide]').forEach(b=>b.addEventListener('click',open));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){e.preventDefault();close();}});
 root.querySelector('form').addEventListener('submit',e=>{e.preventDefault();ask(input.value.slice(0,500));});
 const picker=root.querySelector('.guide-picker'),choose=root.querySelector('.guide-choose');
 const voice=root.querySelector('.guide-voice'),cryAudio=document.createElement('audio');cryAudio.preload='none';cryAudio.volume=.65;root.append(cryAudio);
 const soundStatus=document.createElement('span');soundStatus.className='sound-status';soundStatus.setAttribute('role','status');soundStatus.setAttribute('aria-live','polite');root.querySelector('.guide-tools').append(soundStatus);
 let soundRequest=0;
 function stopVoice(){soundRequest++;cryAudio.pause();cryAudio.currentTime=0;voice.textContent='♪ Hear voice';voice.setAttribute('aria-pressed','false');voice.setAttribute('aria-label','Hear '+companion.name+'’s voice');soundStatus.textContent='';root.classList.remove('is-speaking');}
 function playVoice(){stopVoice();const request=soundRequest;cryAudio.src=new URL('assets/pokemon/audio/'+companion.id+'.wav',siteBase).href;voice.textContent='■ Stop voice';voice.setAttribute('aria-pressed','true');voice.setAttribute('aria-label','Stop '+companion.name+'’s voice');root.classList.add('is-speaking');soundStatus.textContent='Playing '+companion.name+'’s cry';cryAudio.play().catch(()=>{if(request!==soundRequest)return;stopVoice();soundStatus.textContent='Could not play. Try Hear voice again.';});}
 cryAudio.addEventListener('ended',()=>{stopVoice();soundStatus.textContent='';});voice.addEventListener('click',()=>cryAudio.paused?playVoice():stopVoice());
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stopVoice();});

 function greeting(){const hello=message(companion.cry+' '+companion.intro+' I’m '+companion.name+'. Ask me about Ayan’s projects, background or research.');const prompts=document.createElement('div');prompts.className='guide-prompts';[companion.prompt,'What has Ayan built?','How can I contact Ayan?'].filter((v,i,a)=>a.indexOf(v)===i).forEach(q=>{const b=document.createElement('button');b.type='button';b.textContent=q;b.addEventListener('click',()=>ask(q));prompts.append(b);});hello.append(prompts);}
 function paintCompanion(){root.querySelectorAll('.guide-launcher .guide-avatar,.guide-header .guide-avatar').forEach(img=>{img.src=new URL('assets/pokemon/'+companion.id+'.png',siteBase).href;});launcher.querySelector('span').firstChild.textContent='Ask '+companion.name;panel.setAttribute('aria-label',companion.name+', portfolio guide');root.querySelector('.guide-header strong').textContent=companion.name+', your guide';root.querySelector('.guide-cry').textContent=companion.cry;voice.setAttribute('aria-label','Hear '+companion.name+'’s voice');picker.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===String(companion.id))));}
 companions.forEach(c=>{const b=document.createElement('button');b.type='button';b.dataset.id=c.id;b.innerHTML=avatar(c);const name=document.createElement('span');name.textContent=c.name;b.append(name);b.addEventListener('click',()=>{companion=c;remember();paintCompanion();picker.hidden=true;choose.setAttribute('aria-expanded','false');greeting();playVoice();choose.focus({preventScroll:true});});picker.append(b);});
 choose.addEventListener('click',()=>{picker.hidden=!picker.hidden;choose.setAttribute('aria-expanded',String(!picker.hidden));});paintCompanion();greeting();
 const hint=document.createElement('aside');hint.className='guide-hint';hint.hidden=true;hint.innerHTML='<button type="button" class="hint-action">Want a quick introduction?</button><button type="button" class="hint-dismiss" aria-label="Dismiss guide invitation">×</button>';root.append(hint);
 function hideHint(){hint.hidden=true;try{sessionStorage.setItem('ayan-guide-invited','1');}catch{}}
 hint.querySelector('.hint-action').addEventListener('click',()=>{open();ask('Summarise Ayan’s profile');});hint.querySelector('.hint-dismiss').addEventListener('click',hideHint);
 let invited=false;try{invited=sessionStorage.getItem('ayan-guide-invited')==='1';}catch{}
 if(!invited)setTimeout(()=>{if(panel.hidden){hint.hidden=false;launcher.classList.add('guide-highlight');}},12000);
 document.addEventListener('portfolio-music-open',()=>{stopVoice();panel.hidden=true;launcher.setAttribute('aria-expanded','false');hideHint();});

 let explored=new Set();try{explored=new Set(JSON.parse(sessionStorage.getItem('ayan-explored')||'[]').filter(v=>['projects','career','research'].includes(v)));}catch{}
 function paintExplored(){document.querySelectorAll('[data-explore]').forEach(a=>{const seen=explored.has(a.dataset.explore);a.classList.toggle('is-explored',seen);a.querySelector('span').textContent=seen?'✓':'↗';a.setAttribute('aria-label',a.textContent.replace(/[✓↗]/g,'').trim()+(seen?', explored':''));});const status=document.querySelector('[data-explore-status]');if(status)status.textContent=explored.size?explored.size+' of 3 areas explored':'Three places to start';}
 document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;const key=a.dataset.explore||(a.getAttribute('href')==='#feed'?'projects':a.getAttribute('href')==='#journey'?'career':a.getAttribute('href')?.includes('vision-model-benchmark.html')?'research':null);if(!key)return;explored.add(key);try{sessionStorage.setItem('ayan-explored',JSON.stringify([...explored]));}catch{}paintExplored();});paintExplored();
 // Expose only the pure answering function for offline regression checks.
 window.PortfolioGuide={answer:window.PortfolioAnswers.answer};
})();
