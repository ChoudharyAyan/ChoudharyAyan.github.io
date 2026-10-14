(function () {
  const feed = document.getElementById("feed-grid");
  const items = [...(window.FEED_ITEMS || [])].sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.date.localeCompare(a.date));
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
    type.textContent = item.type === "build" ? "Project" : "Research";
    const number = document.createElement("span");
    number.className = "card-number";
    number.textContent = item.displayDate;
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
    const art=document.createElement('figure');art.className='project-art';
    const img=document.createElement('img');
    const artFor=/Wardrobe/.test(item.title)?'wardrobeos.png':/UniBlend/.test(item.title)?'uniblend.png':/Job Search/.test(item.title)?'job-search.png':/Teardown/.test(item.title)?'teardown.png':'research.svg';
    img.src='assets/projects/'+artFor;img.alt=item.type==='article'?'Cost and quality chart from the published vision benchmark':item.title+' project preview';img.loading='lazy';img.width=1440;img.height=900;
    const caption=document.createElement('figcaption');caption.textContent=/Wardrobe|UniBlend/.test(item.title)?'Live application':item.type==='article'?'Published research':'Project overview';art.append(img,caption);
    const body=document.createElement('div');body.className='card-body';body.append(top,eyebrow);
    if(/UniBlend|Wardrobe/.test(item.title)){
      const brand=document.createElement('div');brand.className='project-brand';
      const marks=/UniBlend/.test(item.title)?[['spotify.svg','Spotify'],['youtube-music.svg','YouTube Music']]:[['wardrobeos-logo.svg','The WardrobeOS']];
      marks.forEach(([file,name])=>{const logo=document.createElement('img');logo.src='assets/projects/'+file;logo.alt=name;logo.width=28;logo.height=28;brand.append(logo);});
      const label=document.createElement('span');label.textContent=/UniBlend/.test(item.title)?'Spotify and YouTube Music':'Discover, Wardrobe and Style Me';brand.append(label);body.append(brand);
    }
    body.append(heading,description,tags,links);const destination=safeUrl(item.secondaryUrl||item.url);if(destination){const preview=document.createElement('a');preview.className='project-image-link';preview.href=destination.href;preview.setAttribute('aria-label','Open '+item.title+' preview');if(destination.origin!==location.origin){preview.target='_blank';preview.rel='noopener noreferrer';}preview.append(art);article.append(preview,body);}else article.append(art,body);
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
