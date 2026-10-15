# Jukebox architecture and playback timing

The portfolio is static HTML, CSS and JavaScript served by GitHub Pages. There
is no portfolio music server, owner Spotify login, access token or client secret.

1. `music-catalog.js` contains eight public Spotify track IDs and descriptions.
   The browser selects five at midnight India time, using its clock. This is a
   daily rotation, not a query for new Spotify songs or future account likes.
2. `music.js` builds the radio housing and buttons in the page DOM. CSS supplies
   the grille, brass trim, compact view and responsive layout.
3. Opening the Jukebox loads Spotify's public iframe controller script and warms
   one player without starting audio.
4. Selecting a track sends `loadEntity` (if the track changed) and `play` to that
   controller. Spotify owns the iframe, media/authentication checks and streaming
   delivery. The music bytes travel from Spotify to the visitor's browser.
5. Minimize preserves the player. Close destroys it and stops playback.

The controller documentation is at
https://developer.spotify.com/documentation/embeds/references/iframe-api.
The provider controls full-track/preview availability and browser playback
restrictions. It does not expose a supported switch to remove the Save button.

## What changed

Previously every track click destroyed the controller and loaded a fresh Spotify
iframe, repeating initialization. The new session reuses one controller and
prepares it when the visitor opens the Jukebox. Repeated clicks during startup
retain only the latest requested track. Late events after Close are ignored.

Loading feedback is immediate. After eight seconds without reported playback,
the interface offers the player Play control and Open in Spotify as alternatives.
No retry loops, audio downloads, proxy servers or provider changes were added.

## Measurements

Measured in the same signed-in desktop Chrome session against real Spotify from
the local preview. These small samples are indicative, not a cross-device SLA.
A warmed browser cache and song differences can affect results.

| Implementation / selection | Click to playback_started | Click to first progress |
| --- | ---: | ---: |
| Previous: Swing Lynn | 2,287ms | 2,802ms |
| Previous: Kiss Me | 2,669ms | not captured |
| Reused: Swing Lynn | 1,598ms | 1,872ms |
| Reused: Kiss Me | 1,985ms | 2,503ms |
| Reused: Fade Into You | 2,274ms | 2,907ms |
| Prepared initial track: Lonesome Town | 447ms | 817ms |

The reported 20-second delay was not reproduced. `playback_started` and a
non-buffering progress update are Spotify signals, not measurements of audible
output at speakers. Remaining delay may involve Spotify initialization, buffering,
browser media policy, the visitor's account context or network conditions; these
causes have not been isolated for the reporting device.

Last-selection timings live only in the panel's `data-timing` attribute, with no
analytics transmission or persistent logging. Tests cover preparation without
autoplay, controller reuse, rapid selection, close cancellation and event identity.
