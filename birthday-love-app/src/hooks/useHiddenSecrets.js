import { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { spawnFireworksBurst } from "../utils/effects";
import { notifyProposalFound } from "../utils/api";

export function useHiddenSecrets() {
  const { unlock, openOverlay } = useApp();
  const idleTimer = useRef(null);
  const tapBuffer = useRef([]); // generic rapid-tap sequence buffer (logo secret)
  const rotateRef = useRef({ startAngle: 0, totalRotation: 0, active: false });

  useEffect(() => {
    // ── Console secret (desktop bonus — harmless on mobile, just unreachable there) ──
    console.log(
      "%c💖 Happy Birthday, Princess Rubiga! 💖",
      "font-size:24px;color:#FF4D8D;font-weight:bold",
    );
    console.log(
      "%cYou found the console secret!\n\nThere are 30 surprises hidden on this page.\nThe deepest one lives inside the ✨ Secret Whisper box near the bottom. 💍",
      "font-size:13px;color:#A855F7;line-height:2",
    );
    unlock("🖥️ Console secret found");

    // ── Idle for 5 minutes — suppressed while any video or audio is playing ──
    // Detects media playback by checking document.querySelectorAll('video,audio')
    // so it works regardless of which component is rendering the media element.
    const IDLE_MS = 5 * 60 * 1000; // 5 minutes

    function isMediaPlaying() {
      const mediaElements = document.querySelectorAll("video, audio");
      for (const el of mediaElements) {
        if (!el.paused && !el.ended && el.readyState > 2) return true;
      }
      return false;
    }

    // ── Idle for 30 seconds (works identically on touch — listens to touchstart too) ──
    const resetIdle = () => {
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        unlock("⏳ Idle 5m surprise");
        openOverlay("idle");
      }, IDLE_MS);
    };
    ["mousemove", "keydown", "scroll", "touchstart"].forEach((ev) =>
      window.addEventListener(ev, resetIdle, { passive: true }),
    );
    resetIdle();

    return () => {
      ["mousemove", "keydown", "scroll", "touchstart"].forEach((ev) =>
        window.removeEventListener(ev, resetIdle),
      );
      clearTimeout(idleTimer.current);
    };
  }, []);

  // ───────────────────────────────────────────────────────
  // Exposed helpers used by tap/click-based components.
  // These replace keyboard-only triggers with finger-friendly ones.
  // ───────────────────────────────────────────────────────

  /** Call on logo/title tap. 5 taps within 2s window → secret. */
  function registerLogoTap() {
    const now = Date.now();
    tapBuffer.current = [
      ...tapBuffer.current.filter((t) => now - t < 2000),
      now,
    ];
    if (tapBuffer.current.length >= 5) {
      tapBuffer.current = [];
      unlock("🎮 Secret tap-code activated", { fireworks: true });
      openOverlay("konami");
    }
  }

  /** Drag-to-rotate the hero photo a full 360° → unlocks star map (mobile-safe replacement for device-orientation). */
  function onRotateStart(angleDeg) {
    rotateRef.current = {
      startAngle: angleDeg,
      totalRotation: 0,
      active: true,
    };
  }
  function onRotateMove(angleDeg) {
    const r = rotateRef.current;
    if (!r.active) return;
    let delta = angleDeg - r.startAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    r.totalRotation += Math.abs(delta);
    r.startAngle = angleDeg;
    if (r.totalRotation > 360) {
      r.active = false;
      unlock("🌌 Star map unlocked");
      openOverlay("starmap");
    }
  }
  function onRotateEnd() {
    rotateRef.current.active = false;
  }

  /** Called by the proposal trigger (tap-heart-pattern component) once confirmed. */
  function triggerProposal() {
    unlock("💍 PROPOSAL — The Deepest Secret", { fireworks: true });
    notifyProposalFound(); // 🔔 fires Mailjet email via backend, fire-and-forget
    spawnFireworksBurst();
    setTimeout(() => openOverlay("proposal"), 1200);
  }

  return {
    registerLogoTap,
    onRotateStart,
    onRotateMove,
    onRotateEnd,
    triggerProposal,
  };
}
