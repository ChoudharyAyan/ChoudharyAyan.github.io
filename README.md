# Ayan Choudhary’s website

A lightweight personal site designed for GitHub Pages. It has a photo-led profile, **Projects**, and **My background**. The work index filters projects and research. It uses plain HTML, CSS, and JavaScript, so there is no build step or dependency installation.

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

To update the career timeline or introduction, edit [`index.html`](index.html). The homepage lives in [`portfolio.css`](portfolio.css). Reading pages use [`reading.css`](reading.css) over the existing article/build layouts. All interface text uses the self-hosted DM Sans family in [`fonts.css`](fonts.css); its OFL license is bundled with the font files.

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

## Profile-led portfolio and The Pokémon guide

The current design uses the owner’s existing Aomori photo, one self-hosted DM Sans type family, larger navigation/body text, and straightforward profile copy. Decorative wire art, palette switching and tiny technical labels have been removed. The explorer links remember three visited areas in session storage; this is light navigation feedback, not a points or ranking system.

### Project imagery

`assets/projects/` contains real screenshots from The WardrobeOS and UniBlend, the logos actually used by those apps, the existing published benchmark chart, and captures of the Job Search Agent / Product Teardown Agent public overviews. Cards explicitly distinguish **Live application**, **Published research** and **Project overview**. No private job dashboard or account information was captured. Logos indicate the applications and supported platforms, not an endorsement. The homepage displays the current product name **The WardrobeOS**.

### The Pokémon guide, portfolio guide

The Pokémon guide is a local retrieval guide, not an LLM-backed service. It runs on all four pages, provides profile/project/education summaries, retrieves published content and named benchmark rows, and links every substantive answer to its source. It covers 31 published sections/rows. Unknown questions are declined; private information, credentials, unrelated tasks and unconfirmed hiring availability are not invented. User text is inserted with `textContent`, inputs are capped at 500 characters and chat messages remain in this tab.

`guide-answer.js` contains the pure answering logic. `guide.js` renders the widget and explorer feedback, and `guide.css` styles it. `knowledge.js` is generated from the published HTML. After editing site content, refresh the index with:

```sh
python3 scripts/build-knowledge.py
node --test tests/*.test.mjs
```

The authored profile/education summaries in `guide-answer.js` should also be reviewed when those facts change. Profile source links resolve from the site root, including when the guide is opened on a nested article/project page. The guide root uses PostHog’s `ph-no-capture` exclusion and the custom analytics listener ignores that root, so chat contents are not included in click tracking. Existing analytics elsewhere remains in place. No API key, provider configuration or paid service is needed.

### Verification

Eight meaningful answer regression tests cover professional facts, project destinations, career/research retrieval, exact model comparisons, refusals and unknown availability. JavaScript syntax checks and local link/asset/anchor checks also pass. Browser review covers desktop and 390px/320px layouts, loaded DM Sans fonts, real images, filter counts, typed questions, refusal behaviour, Escape/focus restoration, guide bounds and links on reading pages. These are browser checks, not a complete accessibility audit or real-device certification.

Current design screenshots use `profile-*`, `projects-*`, `guide-*` and `reading-*` names in `docs/screenshots/`.

### Pokémon companions and listening corner

Eight cached PokéAPI sprites provide Pikachu, Charmander, Bulbasaur, Squirtle,
Jigglypuff, Chikorita, Pidgey and Butterfree. A random companion is saved in
sessionStorage for the tab session and can be changed in the accessible chooser.
Each has a characteristic cry, greeting and starter question. Sound never plays on page load. Selecting a companion plays its short cry;
the Hear voice button replays it and doubles as Stop during playback. A dismissible invitation appears once per session after 12 seconds.
The guide remains local retrieval from published portfolio facts, not an LLM.
Pokémon characters belong to their respective owners; sprites are sourced from
https://github.com/PokeAPI/sprites and cached locally.

The vintage speaker-style listening corner chooses five tracks daily from an
eight-song curated public catalogue. The first five came from Ayan’s Liked Songs
on 15 October 2026; three additional catalogue entries use public Spotify track
links for songs observed there without Explicit labels. This does not sync likes.
Spotify embeds load only after song selection; playback requires the visitor’s
click. Minimize keeps the same embed playing in a compact strip. Close removes the
embed and stops it. Opening the guide tucks the music panel away without
reloading or stopping the embed. Spotify determines
playback availability and duration; each track has an Open in Spotify fallback.
No owner tokens or Spotify API secrets are stored or exposed.

### Audio and background motion

Eight distinct game cries are cached from the PokéAPI cries repository, with
source links and original durations in assets/pokemon/audio/sources.json.
The original short cries are repeated with 240ms pauses into 2.4-second WAV
clips at 24kHz for broad browser support, capped to a comfortable level.
These are game cries, not anime dialogue or generated voice impersonations.
Selection and replay require a visitor click. Closing the guide, opening the
music panel or hiding the page stops voice playback. No audio API or live
PokéAPI request is used by visitors. Pokémon audio belongs to its respective
owners; public availability is not an assertion of ownership or a new license.

Landscape-inspired background layers move slowly using CSS transforms.
Reduced-motion preferences disable animations, and Pause motion in the footer
pauses decorative motion for the session. No background rendering loop runs.

### Independent daily radio rotation

music-catalog.js contains only public track IDs and descriptive metadata.
Five tracks rotate at 00:00 Asia/Kolkata each day from the eight-track catalogue,
based on the visitor's clock. Selection is consistent for a given day and repeats
on an eight-day cycle. An open page checks the day once per minute and when it
becomes visible; changing the daily list does not interrupt its playing track.
This is daily rotation, not new-song discovery or future liked-song syncing.
No login, refresh token, Spotify Web API, scheduled server task or running owner
computer is needed. Streaming still relies on Spotify and visitor availability.
Spotify controls its embed's Save button; the embed has no supported setting to
remove it, so it remains intact.
