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
