(function () {
  const feed = document.getElementById("feed-grid");
  const items = [...(window.FEED_ITEMS || [])].sort((a, b) => b.date.localeCompare(a.date));
  const buttons = [...document.querySelectorAll(".filter")];
  const count = document.getElementById("all-count");

  document.getElementById("year").textContent = new Date().getFullYear();
  count.textContent = String(items.length).padStart(2, "0");

  function safeUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      return url.protocol === "https:" || url.origin === location.origin ? url : null;
    } catch {
      return null;
    }
  }

  function link(label, url, className) {
    const href = safeUrl(url);
    if (!href) return null;
    const a = document.createElement("a");
    a.className = className;
    a.href = href.href;
    if (href.origin !== location.origin) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    a.textContent = label;
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = " ↗";
    a.append(arrow);
    return a;
  }

  function card(item, index) {
    const article = document.createElement("article");
    article.className = `feed-card feed-card-${item.type}`;

    const top = document.createElement("div");
    top.className = "card-top";
    const type = document.createElement("span");
    type.className = "card-type";
    type.textContent = item.type === "build" ? "BUILD" : "ARTICLE";
    const number = document.createElement("span");
    number.className = "card-number";
    number.textContent = String(index + 1).padStart(2, "0");
    top.append(type, number);

    const eyebrow = document.createElement("p");
    eyebrow.className = "card-eyebrow";
    eyebrow.textContent = `${item.eyebrow} / ${item.displayDate}`;
    const heading = document.createElement("h3");
    heading.textContent = item.title;
    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = item.description;

    const tags = document.createElement("div");
    tags.className = "card-tags";
    (item.tags || []).forEach((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      tags.append(span);
    });

    const links = document.createElement("div");
    links.className = "card-links";
    const primary = link(item.linkLabel || "Explore", item.url, "card-link");
    const secondary = link(item.secondaryLabel || "More", item.secondaryUrl, "card-secondary-link");
    if (primary) links.append(primary);
    if (secondary) links.append(secondary);
    const art = document.createElement('div');
    art.className='project-art '+(item.type==='article'?'article-art':/Job Search/.test(item.title)?'job-art':/Teardown/.test(item.title)?'teardown-art':/Wardrobe/.test(item.title)?'wardrobe-art':'music-art');
    art.setAttribute('aria-hidden','true');
    const visuals={
      'article-art':'<path d="M45 25h150v100H45zM65 45h28v27H65zM105 45h28v27h-28zM145 45h28v27h-28zM65 82h28v27H65zM105 82h28v27h-28zM145 82h28v27h-28z"/><path d="m165 18 12 12-12 12M192 80h18M20 80h18"/>',
      'job-art':'<path d="M38 32h122v27H38zM38 72h122v27H38zM38 112h122v16H38zM173 47l8 8 16-18M173 84l8 8 16-18"/><path d="M51 45h65M51 85h80M51 120h48"/>',
      'teardown-art':'<rect x="82" y="15" width="76" height="120" rx="10"/><path d="M103 24h34M92 48h56v35H92zM92 95h36M92 108h46M26 43h35M26 51h25M174 94h40M174 103h25M62 46l20 13M158 95l16 5"/>',
      'wardrobe-art':'<path d="M75 27 40 46l16 31 22-10v62h82V67l22 10 16-31-35-19-25 15h-38z"/><path d="M103 36q16 23 32 0M121 59v61"/><circle cx="178" cy="115" r="24"/><path d="m165 115 9 9 17-20"/>',
      'music-art':'<path d="M120 28v82M135 19v96M105 37v64M90 51v36M150 35v65M75 62v16M165 48v40M60 58v25M180 61v13" stroke-width="5" stroke-linecap="round"/><circle cx="55" cy="123" r="7"/><circle cx="183" cy="22" r="7"/>'
    };
    const key=Object.keys(visuals).find(k=>art.classList.contains(k));
    art.innerHTML='<svg viewBox="0 0 240 150">'+visuals[key]+'</svg>';
    article.append(art,top, eyebrow, heading, description, tags, links);
    return article;
  }

  function render(filter) {
    const visible = items.filter((item) => filter === "all" || item.type === filter);
    feed.replaceChildren(...visible.map(card));
    buttons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  buttons.forEach((button) => button.addEventListener("click", () => render(button.dataset.filter)));
  render("all");
})();

// A parametric intersection: a hand-built sculpture, not an image or borrowed asset.
(function(){
  const group=document.getElementById('field-ribbons');
  if(!group)return;
  const motion=document.querySelector('.motion-toggle');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=reduced.matches,visible=true,phase=0,last=0,targetX=0,targetY=0,tiltX=0,tiltY=0;
  const paths=Array.from({length:42},()=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('class','field-ribbon');group.append(p);return p;});
  function draw(){
    const angle=phase*.16+tiltX*.3,lean=.55+tiltY*.2;
    paths.forEach((path,i)=>{
      const v=i/paths.length*Math.PI*2;let d='';
      for(let j=0;j<=90;j++){
        const u=j/90*Math.PI*2,r=190+65*Math.cos(v+u*2),x=r*Math.cos(u),y=r*Math.sin(u),z=65*Math.sin(v+u*2);
        const x1=x*Math.cos(angle)+z*Math.sin(angle),z1=-x*Math.sin(angle)+z*Math.cos(angle),y1=y*Math.cos(lean)-z1*Math.sin(lean),depth=y*Math.sin(lean)+z1*Math.cos(lean),perspective=850/(850+depth);
        d+=(j?'L':'M')+(350+x1*perspective).toFixed(1)+' '+(350+y1*perspective).toFixed(1);
      }
      path.setAttribute('d',d+'Z');
    });
  }
  function frame(now){
    if(visible&&!document.hidden&&!paused&&now-last>32){phase+=Math.min(now-last,100)*.0003;last=now;tiltX+=(targetX-tiltX)*.07;tiltY+=(targetY-tiltY)*.07;draw();}
    requestAnimationFrame(frame);
  }
  function showMotionState(){motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'Play motion ▷':'Pause motion Ⅱ';}
  const hero=document.querySelector('.hero');
  hero.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=hero.getBoundingClientRect();targetX=(e.clientX-r.left)/r.width-.5;targetY=(e.clientY-r.top)/r.height-.5;});
  hero.addEventListener('pointerleave',()=>{targetX=0;targetY=0;});
  motion.addEventListener('click',()=>{paused=!paused;last=performance.now();showMotionState();});
  reduced.addEventListener('change',()=>{paused=reduced.matches;showMotionState();});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;last=performance.now();}).observe(hero);
  document.querySelectorAll('.palette-dot').forEach(button=>button.addEventListener('click',()=>{
    const palette=button.dataset.palette;document.body.dataset.palette=palette;
    document.querySelectorAll('.palette-dot').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.querySelector('meta[name="theme-color"]').content=palette==='petrol'?'#162632':palette==='paper'?'#e9e8e0':'#10231f';
    try{localStorage.setItem('ayan-palette',palette);}catch{}
  }));
  try{const saved=localStorage.getItem('ayan-palette');if(['forest','petrol','paper'].includes(saved))document.querySelector('.palette-dot.'+saved).click();}catch{}
  showMotionState();draw();requestAnimationFrame(frame);
})();
