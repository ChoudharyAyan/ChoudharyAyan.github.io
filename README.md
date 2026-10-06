# Ayan Choudhary’s website

A lightweight personal site designed for GitHub Pages. It has two main sections: **The journey** and **The feed**. The feed filters **Builds** and **Articles**. It uses plain HTML, CSS, and JavaScript, so there is no build step or dependency installation.

## Add a post or project

Open [`feed.js`](feed.js) and add an object at the top of `window.FEED_ITEMS`. Use `type: "build"` for a project or `type: "article"` for an article. The newest `date` appears first. `displayDate` is the date shown on the card; it can be a year or a fuller date. For an article, first add an HTML page under `articles/`, then put its relative path in `url`.

```js
{
  type: "article",
  date: "2026-10-06",
  displayDate: "Oct 2026",
  eyebrow: "ARTICLE / AI",
  title: "Your title",
  description: "A short introduction to your post.",
  tags: ["AI", "Product"],
  url: "articles/your-article.html",
  linkLabel: "Read the article"
},
```

Builds with private source code can link to a public project page under `builds/`, as the Job Search Agent and Product Teardown Agent do.

To update the career timeline or introduction, edit [`index.html`](index.html). The shared visual design lives in [`styles.css`](styles.css), with heading adjustments in [`typography.css`](typography.css) and project-page styles in [`build.css`](build.css).

## Preview locally

From this folder, run `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Publish updates

The site is published at [choudharyayan.github.io](https://choudharyayan.github.io/). Pushing changes to the `main` branch automatically updates the site.

You can also add a feed item directly on GitHub: open `feed.js` in the repository, click the pencil icon, add an object, then click **Commit changes**. GitHub Pages will publish the update after its build completes.

The file `.nojekyll` keeps GitHub Pages in static-file mode.

## PostHog analytics

The site includes [`analytics.js`](analytics.js) on every page. It stays inactive until you add a **public PostHog project token** and its matching API host (`https://us.i.posthog.com` or `https://eu.i.posthog.com`) at the top of that file. Do not add a personal API key. Tracking runs only on `choudharyayan.github.io`, so local previews do not affect your numbers.

In PostHog, enable **Project Settings → Web analytics → Cookieless server hash mode** before publishing the token. The site uses cookieless anonymous tracking, with session recording disabled. PostHog's Web Analytics dashboard will show visitors, pageviews, popular pages, sources, and outbound links. In Product Analytics, create Trends insights for these portfolio events:

| Event | What it answers |
| --- | --- |
| `homepage_section_viewed` | Did visitors reach Journey or The Feed? Break down by `section`. |
| `feed_filter_selected` | Did visitors choose Builds or Articles? Break down by `filter`. |
| `feed_item_clicked` | Which project or article drew interest? Break down by `item_title`. |
| `portfolio_download_clicked` | Was the benchmark PDF downloaded? |
| `outbound_link_clicked` | Which external sites did visitors open? Break down by `destination_host`. |

PostHog also autocaptures ordinary link and button clicks. Cookieless visitors get a new anonymous identifier each day, so multi-day unique visitor totals are estimates rather than exact counts of people. Ad blockers can also prevent some visits from being counted.
