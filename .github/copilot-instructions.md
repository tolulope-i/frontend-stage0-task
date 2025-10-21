<!--
Guidance for AI coding agents working on the `frontend-stage0-task` repo.
Keep this file short, concrete and example-driven. Update if project structure changes.
-->
# Copilot instructions — frontend-stage0-task

Purpose
- Small static frontend that renders a responsive profile card using semantic HTML, modern CSS, and vanilla JavaScript.

Big picture (what to know fast)
- No build system or package manager: open `index.html` directly in a browser to run locally.
- Files of interest: `index.html` (markup + data-testid hooks), `style.css` (theme vars, layout, `.show` modifier), `script.js` (time display, tab UI wiring, contact form validation).
- External integrations: Google Fonts and Font Awesome are loaded via CDN in `index.html` — no backend API or bundler present.

Project-specific conventions & patterns
- Data-testid attributes are used throughout (e.g. `data-testid="test-contact-form"`) — prefer using these selectors in automated tests or UI assertions.
- Show/hide pattern: elements toggle the `show` class to reveal popups/overlays (see `.success-message` and `.overlay` in `style.css`).
- CSS theme: colors and spacing are controlled through CSS variables in `:root` — change these to adjust the look globally.
- JS style: `script.js` contains small helper validators (validateName, validateEmail...), synchronous DOM event wiring, and a frequent DOM polling interval for the clock (setInterval 50ms).

Concrete examples from the codebase
- Form validation: `script.js` exposes `validateName()`, `validateEmail()`, `validateSubject()` and `validateMessage()` that mirror the input attributes (pattern, minlength). When adding validation, follow the same pattern: write small pure functions that update the `*.error` and `*.error-message` elements and return boolean.
- Popup flow: on successful submit `SuccessMessage.classList.add('show')` and `Overlay.classList.add('show')` are used. Close is handled by a `click` handler on both the overlay and the close button.

Known issues & places AI should check first
- ID mismatch: `script.js` references `document.getElementById('profile-card')` but the markup uses `id="profile-container"`. This causes null references when wiring tabs — either update the HTML id or the JS selector.
- Incomplete tab logic: the DOMContentLoaded listener in `script.js` starts wiring tabs but is unfinished. Implement tab activation by toggling `.active` on both `.tab-btn` and the target card (cards use `.card` and `id` attributes).
- Defensive DOM access: some elements may be null in headless operations. Always check for existence before adding event listeners (e.g., `if (Form) Form.addEventListener(...)`).
- Performance: the clock updates at 50ms which is unnecessary; consider 250–1000ms for human-visible updates to reduce CPU usage.

How to run & debug
- Run locally: open `index.html` in a modern browser (Chrome/Edge/Firefox). There is no `npm` or build step.
- Debugging tips: use browser DevTools Console to catch `null` element errors (common because of ID/class mismatches). Use Elements panel to inspect `.show` toggles and `data-testid` attributes for behavioral tests.

Editing guidelines for agents
- Make minimal, explicit changes. If you rename an id/class, update every reference in `index.html` and `script.js` to avoid runtime errors.
- Preserve accessibility attributes (`aria-*`) and link attributes (`rel="noopener noreferrer" target="_blank"`) when changing social links or anchors.
- Keep vanilla JS and no build tooling — avoid introducing a bundler or transpiler unless the user requests it.

Small follow-ups you can implement safely
- Fix the `profile-card` vs `profile-container` id mismatch.
- Complete the tab-switching logic in `script.js` (toggle `.active` on buttons and corresponding `.card` elements using `data-tab` values).
- Reduce clock update frequency to 500ms.

If anything in this file is unclear, ask which behavior to preserve (for example: change HTML id vs change JS selector). Request permission before introducing major tooling (tests, bundlers, linters).
