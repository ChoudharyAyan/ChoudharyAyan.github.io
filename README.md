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
