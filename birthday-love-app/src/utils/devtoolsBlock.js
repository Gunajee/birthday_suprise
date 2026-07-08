/**
 * devtoolsBlock.js
 * ----------------
 * Makes casual inspection as difficult as possible without breaking
 * the site itself. NOT a security measure — a determined developer
 * will always get through. The goal is to stop accidental spoilers
 * for someone who isn't actively trying to cheat.
 *
 * Call initDevtoolsBlock() once at app startup (main.jsx).
 */

export function initDevtoolsBlock() {
  // ── 1. Disable right-click context menu ──────────────────────
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // ── 2. Block common DevTools keyboard shortcuts ───────────────
  document.addEventListener("keydown", (e) => {
    // F12
    if (e.key === "F12") {
      e.preventDefault();
      return;
    }

    // Ctrl+Shift+I / Cmd+Option+I  (Elements panel)
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      (e.key === "I" || e.key === "i")
    ) {
      e.preventDefault();
      return;
    }
    // Ctrl+Shift+J / Cmd+Option+J  (Console)
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      (e.key === "J" || e.key === "j")
    ) {
      e.preventDefault();
      return;
    }
    // Ctrl+Shift+C / Cmd+Option+C  (Inspector)
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      (e.key === "C" || e.key === "c")
    ) {
      e.preventDefault();
      return;
    }
    // Ctrl+U  (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u")) {
      e.preventDefault();
      return;
    }
    // Ctrl+S  (Save Page As)
    if ((e.ctrlKey || e.metaKey) && (e.key === "S" || e.key === "s")) {
      e.preventDefault();
      return;
    }
    // Ctrl+A  (Select All — stops copy-paste of text content)
    if ((e.ctrlKey || e.metaKey) && (e.key === "A" || e.key === "a")) {
      e.preventDefault();
      return;
    }
  });

  // ── 3. Disable text selection (makes scraping harder) ────────
  document.addEventListener("selectstart", (e) => e.preventDefault());

  // ── 4. Disable drag (stops image stealing) ───────────────────
  document.addEventListener("dragstart", (e) => e.preventDefault());

  // ── 5. Detect if DevTools is open and blur content ───────────
  // This works by measuring the window vs outer size difference —
  // DevTools panels eat into the viewport when docked.
  let devtoolsOpen = false;
  const THRESHOLD = 160; // px — DevTools panel is wider/taller than this

  function checkDevtools() {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    const isOpen = widthDiff > THRESHOLD || heightDiff > THRESHOLD;

    if (isOpen && !devtoolsOpen) {
      devtoolsOpen = true;
      applyBlur();
    } else if (!isOpen && devtoolsOpen) {
      devtoolsOpen = false;
      removeBlur();
    }
  }

  function applyBlur() {
    const overlay = document.createElement("div");
    overlay.id = "dt-block-overlay";
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 999999;
      background: rgba(10,6,18,0.97);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 16px;
    `;
    overlay.innerHTML = `
      <div style="font-size:48px">🔒</div>
      <p style="
        font-family: 'Great Vibes', cursive;
        font-size: 36px; color: #FF4D8D; margin: 0;
      ">This page is a surprise!</p>
      <p style="
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px; color: #7a5060; letter-spacing: 2px; margin: 0;
      ">CLOSE DEVELOPER TOOLS TO CONTINUE</p>
    `;
    document.body.appendChild(overlay);
  }

  function removeBlur() {
    document.getElementById("dt-block-overlay")?.remove();
  }

  // Check on resize (DevTools dock/undock) and on interval
  window.addEventListener("resize", checkDevtools);
  setInterval(checkDevtools, 1000);

  // ── 6. Clear the console message (override console methods) ──
  // This stops secrets being revealed via console.log after the
  // initial console secret is shown.
  const noop = () => {};
  // Preserve original for our own internal logging (errors etc.)
  const _error = console.error.bind(console);
  console.log = noop;
  console.warn = noop;
  console.info = noop;
  console.debug = noop;
  console.table = noop;
  // Keep console.error so real errors still surface in production
  console.error = _error;
}
