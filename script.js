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
    article.append(top, eyebrow, heading, description, tags, links);
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
