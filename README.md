# Ayan Choudhary’s website

A lightweight personal site designed for GitHub Pages. It has two main sections: **The journey** and **The feed**. It uses plain HTML, CSS, and JavaScript, so there is no build step or dependency installation.

## Add a post or project

Open [`feed.js`](feed.js) and add an object at the top of `window.FEED_ITEMS`. Use `type: "build"` for a project or `type: "note"` for a post. The newest `date` appears first. `displayDate` is the date shown on the card; it can be a year or a fuller date.

```js
{
  type: "note",
  date: "2026-10-06",
  displayDate: "Oct 2026",
  eyebrow: "A NOTE ON BUILDING",
  title: "Your title",
  description: "A short introduction to your post.",
  tags: ["AI", "Product"],
  url: "https://example.com/full-post",
  linkLabel: "Read the post"
},
```

To update the career timeline or introduction, edit [`index.html`](index.html). To change the visual design, edit [`styles.css`](styles.css).

## Preview locally

From this folder, run `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Publish to GitHub Pages

Create a **public** repository named `ChoudharyAyan.github.io` under the `ChoudharyAyan` GitHub account and push these files to its `main` branch. In **Settings → Pages**, choose **Deploy from a branch**, `main`, and `/ (root)`. The site will appear at `https://choudharyayan.github.io/` after GitHub finishes publishing.

The file `.nojekyll` keeps GitHub Pages in static-file mode.
