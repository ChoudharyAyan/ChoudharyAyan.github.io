# Portfolio validation

Validated locally in Chrome on 15 October 2026.

- Desktop profile and project layout rendered with the real portrait, self-hosted DM Sans and real project images.
- All eight Pokémon sprites loaded with distinct images. Selecting Squirtle changed the name, avatar, cry and greeting. Reload retained Squirtle; navigating to the research article retained the selected companion in that tab.
- Guide responses linked to the correct root-relative project pages from the nested research article. Private-data requests were refused.
- At 390px and 320px, page width equalled viewport width. At 320px the two dock buttons occupied separate 142px regions with a 12px gap. Picker and music panel rendered without horizontal overflow.
- Signed-in Spotify Liked Songs showed no Explicit label for the five selected tracks. Explicit-labelled tracks were excluded from the curated snapshot.
- Swing Lynn loaded through Spotify's official embed. After a user-initiated Play click, the button changed to Pause and progress advanced to 20 seconds. Closing the player removed its iframe; no Spotify iframe remained after the test.
- Eight Node regression tests passed for published profile facts, project links, benchmark measurements and guardrails. JavaScript syntax checks and git diff --check passed. All static HTML asset references resolved locally.

The music selection is a dated snapshot. It does not use owner API credentials or automatically read future likes. Spotify controls visitor playback availability. The profile guide uses local retrieval, not a remote model service.

Radio refinement: removed the explanatory music paragraph, moved the compact
80px Spotify player above the five stations, and reduced track typography to
13px titles and 11px artists. Inspected desktop and 390px renderings. Radio
selectors support arrow keys, Home and End; ArrowDown changed Kiss Me to the
next station and updated the embedded track without autoplay.

Pokémon sound and landscape backgrounds: all eight cached WAV clips are distinct,
valid PCM and exactly 2.4 seconds (automated asset test). In Chrome, selecting
Pikachu played the 25.wav clip, Hear voice replayed it, and closing the panel
stopped playback. Reload remained silent with no audio source set. Background
layers and voice control were visually inspected on desktop and 390px mobile;
mobile content width equalled 390px. Pause motion changed the decorative
animation to paused. Reduced-motion disabling is implemented in CSS but was
not tested with an OS preference change. Nine Node tests pass.

Daily radio/minimize: verified the same Spotify iframe continued playing after
minimization, with the Pause control visible and progress advancing to 45s.
Daily selection tests cover stability during a day, five unique non-explicit
entries, and midnight IST rollover. The playlist rotation uses no account APIs
or credentials. Ten Node tests pass. The provider-controlled Save button remains.

Owner-provided voices: five supplied MP3 files were converted to PCM WAV, with leading silence removed and exactly 1.5 seconds retained. Verified the new Pikachu source loaded with duration 1.5 and playback active in Chrome. Automated checks verify all five new durations and the retained three 2.4-second clips. Ten tests pass.

Click-to-play refinement: selecting Swing Lynn alone initialized the official Spotify controller and displayed Pause without an iframe Play click. Selecting Kiss Me switched tracks and started playback; its progress advanced while minimized. Close removed the player. Added native SVG path and geometric background graphics; inspected desktop and mobile renders. Ten tests pass.

LinkedIn knowledge: read professional profile sections and full education details. Added 17 curated answer topics, then regenerated 48 total knowledge entries. Verified Myntra’s seller-portal answer and LinkedIn source link in Chrome. Twelve tests cover profile topics, dates, source links and private-data guardrails. No public Q&A cards or new starter prompts were added.

Mobile chat refinement: inspected full-screen 390×844 panel with matching viewport bounds, aria-modal true and locked background. Verified initial focus on Close, delayed reply completion, Show reply skipping, and minimize restoring the page. The guide remains floating on desktop. Fake-clock tests verify 999ms without output, the one-second start, progressive completion, reduced-motion behavior and cancellation. Script dependency ordering is checked on all four pages. Real-device keyboard behavior remains unverified.

Keyboard-space follow-up: at 390×470 the panel bottom was 470 and input bottom 458, with input focused and the body fixed. Verified Show reply completed the answer while input stayed enabled, without native required-field validation. This is a shortened-viewport simulation, not a physical keyboard test.

Native dialog follow-up: from scrollY 1293.5, the mobile dialog matched :modal and its bounds were x0/y0/390×430 after resize; input bottom was 418. Closing restored scrollY 1293.5 exactly. A temporary fixture independently set visual height 430 and offsetTop 110 while layout height remained 844; panel bounds became y110–540 and input bottom 489.2. This exercises shrink and pan, unlike the earlier layout-only check. Desktop retained x1026/width390 at viewport1440. Contact tel and calendar links rendered correctly. Seventeen tests pass; actual phone keyboard behavior still needs field verification.
