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

The site includes [`analytics.js`](analytics.js) on every page, connected to the EU PostHog project [Ayan Portfolio](https://eu.posthog.com/project/295494/web). The project token in that file is public frontend configuration, not a personal API key. Tracking runs only on `choudharyayan.github.io`, so local previews do not affect your numbers.

**Project Settings → Web analytics → Cookieless tracking** is enabled. The site uses cookieless anonymous tracking, with session recording disabled. [Web Analytics](https://eu.posthog.com/project/295494/web) shows visitors, pageviews, popular pages, and traffic sources. The [Portfolio performance dashboard](https://eu.posthog.com/project/295494/dashboard/1000381) collects visitor, pageview, source, content-click, feed-filter, and homepage-section reports. In Product Analytics, use Trends insights for these portfolio events:

| Event | What it answers |
| --- | --- |
| `homepage_section_viewed` | Did visitors reach Journey or The Feed? Break down by `section`. |
| `article_section_viewed` | How far did readers get in the benchmark article? Break down by `section` (summary, method, results, cost-quality, decision). Each section is counted once per page load when it enters view. |
| `feed_filter_selected` | Did visitors choose Builds or Articles? Break down by `filter`. |
| `feed_item_clicked` | Which project or article drew interest? Break down by `item_title`. |
| `portfolio_download_clicked` | Was the benchmark PDF downloaded? |
| `outbound_link_clicked` | Which external sites did visitors open? Break down by `destination_host`. |

PostHog also autocaptures ordinary link and button clicks. Cookieless visitors get a new anonymous identifier each day, so multi-day unique visitor totals are estimates rather than exact counts of people. Ad blockers can also prevent some visits from being counted.

### Attribute LinkedIn traffic

Use a different tagged link in each placement so PostHog can separate visits from the post and comment. These links point to the same article:

- LinkedIn post: `https://choudharyayan.github.io/articles/vision-model-benchmark.html?utm_source=linkedin&utm_medium=organic_social&utm_campaign=vision_model_benchmark&utm_content=post`
- LinkedIn comment: `https://choudharyayan.github.io/articles/vision-model-benchmark.html?utm_source=linkedin&utm_medium=organic_social&utm_campaign=vision_model_benchmark&utm_content=comment`

Replace the existing untagged URL in each LinkedIn placement with its matching tagged link. In PostHog Web Analytics, check **Sources** and the UTM campaign/content breakdown; `utm_content` distinguishes post from comment. The older untagged link may appear as LinkedIn referral traffic when the browser passes its referrer, but it cannot reliably distinguish those two placements. PostHog counts people who land on this site, not LinkedIn post impressions, profile views, or clicks that never reach the site; those are available in LinkedIn's own post/profile analytics.
