import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { HERO, QUOTES } from "../../data";
import { spawnParticles } from "../../utils/effects";
import PhotoFrame3D from "../3d/PhotoFrame3D";
import { getBirthdayMode, daysUntilBirthday } from "../../utils/birthdayDate";

const LONG_PRESS_MS = 650;
const DOUBLE_TAP_WINDOW_MS = 350;

export default function HeroSection({
  onRotateStart,
  onRotateMove,
  onRotateEnd,
}) {
  const { unlock, openOverlay } = useApp();
  const [qIdx, setQIdx] = useState(0);
  const [haloClicks, setHaloClicks] = useState(0);
  const [nameClicks, setNameClicks] = useState(0);
  const [cakeClicks, setCakeClicks] = useState(0);

  // ── Birthday-aware title ──────────────────────────────────────
  // July 13th itself → "Happy Birthday". Any other day → "Advance
  // Happy Birthday" with a day countdown. Computed once on mount
  // (a page left open across midnight will catch up on next reload,
  // which is the right behaviour for a date-display, not a live clock).

  const birthdayMode = useState(() => getBirthdayMode())[0];
  const daysLeft = useState(() => daysUntilBirthday())[0];

  const heroTitle =
    birthdayMode === "birthday"
      ? "🎂 Happy Birthday Pricess Rubiga ❤️"
      : "🎂 Advance Happy Birthday Rubi❤️";

  const heroSubtagline =
    birthdayMode === "birthday"
      ? null
      : daysLeft === 0
        ? "Today's the day! 🎉"
        : `${daysLeft} day${daysLeft === 1 ? "" : "s"} until your special day ✨`;

  // ── Unified gesture state for the hero photo ──
  // One ref tracks everything so long-press / double-tap / single-tap
  // never fire together by accident (the root cause of the old mobile bug).
  const gesture = useRef({
    longPressTimer: null,
    longPressFired: false,
    lastTapTime: 0,
    pointerDownPos: null,
    rotateCenter: null,
  });

  useEffect(() => {
    const t = setInterval(() => setQIdx((i) => (i + 1) % QUOTES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // ── Cake: 5 taps → favourite song ──
  function handleCake(e) {
    e.stopPropagation();
    spawnParticles(
      e.clientX ?? e.touches?.[0]?.clientX,
      e.clientY ?? e.touches?.[0]?.clientY,
      8,
      ["🎂", "🎉", "✨", "🎵", "💫"],
    );
    const n = cakeClicks + 1;
    setCakeClicks(n);
    if (n >= 5) {
      setCakeClicks(0);
      unlock("🍰 Cake 5-tap secret");
      openOverlay("musicreveal");
    }
  }

  // ── Name: 5 taps → secret greeting ──
  function handleName(e) {
    spawnParticles(e.clientX, e.clientY, 4);
    const n = nameClicks + 1;
    setNameClicks(n);
    if (n >= 5) {
      setNameClicks(0);
      unlock("🌟 Secret name greeting");
      openOverlay("secretgreet");
    }
  }

  // ──────────────────────────────────────────────────────────
  // Hero photo gestures — works identically on mouse AND touch:
  //   • Single tap × 7  → birthday wishes  (halo counter)
  //   • Double tap      → memory gallery   (custom timing, not onDoubleClick)
  //   • Long press      → special quote
  //   • Drag in a circle around the photo → rotates it, full 360° = star map
  // ──────────────────────────────────────────────────────────

  function getAngle(clientX, clientY, center) {
    return Math.atan2(clientY - center.y, clientX - center.x) * (180 / Math.PI);
  }

  function handlePointerDown(e) {
    const point = e.touches ? e.touches[0] : e;
    const rect = e.currentTarget.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    gesture.current.pointerDownPos = { x: point.clientX, y: point.clientY };
    gesture.current.longPressFired = false;
    gesture.current.rotateCenter = center;

    gesture.current.longPressTimer = setTimeout(() => {
      gesture.current.longPressFired = true;
      unlock("🔍 Image long-press quote");
      openOverlay("longpressquote");
    }, LONG_PRESS_MS);

    onRotateStart(getAngle(point.clientX, point.clientY, center));
  }

  function handlePointerMove(e) {
    const point = e.touches ? e.touches[0] : e;
    if (!gesture.current.rotateCenter) return;
    // Cancel the long-press if the finger/mouse has moved meaningfully (it's a drag, not a hold)
    const dx = point.clientX - gesture.current.pointerDownPos.x;
    const dy = point.clientY - gesture.current.pointerDownPos.y;
    if (Math.sqrt(dx * dx + dy * dy) > 12) {
      clearTimeout(gesture.current.longPressTimer);
      onRotateMove(
        getAngle(point.clientX, point.clientY, gesture.current.rotateCenter),
      );
    }
  }

  function handlePointerUp(e) {
    clearTimeout(gesture.current.longPressTimer);
    onRotateEnd();
    if (gesture.current.longPressFired) return; // long-press already handled this interaction

    const now = Date.now();
    const isDoubleTap =
      now - gesture.current.lastTapTime < DOUBLE_TAP_WINDOW_MS;
    gesture.current.lastTapTime = now;

    const point = e.changedTouches ? e.changedTouches[0] : e;
    if (isDoubleTap) {
      spawnParticles(point.clientX, point.clientY, 14);
      unlock("📸 Photo double-tap gallery", { confetti: true });
      openOverlay("gallery");
      gesture.current.lastTapTime = 0; // reset so a 3rd quick tap doesn\'t re-trigger
      return;
    }

    // Single tap → counts toward the 7-tap halo secret
    spawnParticles(point.clientX, point.clientY, 6);
    setHaloClicks((n) => {
      const next = n + 1;
      if (next >= 7) {
        unlock("🌸 Halo 7-tap secret", { fireworks: true });
        openOverlay("wishes");
        return 0;
      }
      return next;
    });
  }

  const q = QUOTES[qIdx];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center z-10"
      style={{ padding: "80px 24px 48px", overflowX: "hidden" }}
    >
      {/* Background balloons */}
      {[
        { color: "#FF4D8D", left: "5%", size: 50, delay: 0, dur: 6 },
        { color: "#A855F7", left: "88%", size: 40, delay: 1.5, dur: 7 },
        { color: "#FFD700", left: "15%", size: 35, delay: 0.8, dur: 8 },
        { color: "#60A5FA", left: "80%", size: 45, delay: 2, dur: 5 },
        { color: "#34D399", left: "40%", size: 30, delay: 1, dur: 9 },
        { color: "#543ac7", left: "60%", size: 25, delay: 1.2, dur: 10 },
      ].map((b, i) => (
        <BalloonPop key={i} b={b} />
      ))}

      {/* Eyebrow label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-3 z-10"
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 11,
            color: "#FF4D8D",
            letterSpacing: 5,
          }}
        >
          ✦ A VERY SPECIAL DAY ✦
        </span>
      </motion.div>

      {/* ── FIX 1: Title text — lineHeight 1.3 so emoji & descenders are never clipped ── */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="text-shimmer z-10 "
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: "clamp(36px,8vw,72px)",
          lineHeight: 1.3, // was 1 — caused emoji + descender clipping
          marginBottom: 6,
          padding: "0 8px", // side padding so letters don't clip at viewport edge
          wordBreak: "break-word", // prevents overflow on very narrow screens
        }}
      >
        {heroTitle}
      </motion.h1>

      {/* Countdown tagline */}
      {heroSubtagline && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="z-10 mb-2"
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 12,
            color: "#FFD700",
            letterSpacing: 1,
          }}
        >
          {heroSubtagline}
        </motion.p>
      )}

      {/* ── FIX 2: Photo frame container ──────────────────────────────────────────────
          Root cause of "frame shifts on scroll":
            • The old code had PhotoFrame3D with position:absolute;inset:-20 inside
              a parent with no explicit `position`. When the page scrolled, the
              WebGL canvas (which has its own stacking context) repositioned relative
              to the wrong ancestor.
            • Fix: remove PhotoFrame3D (the Three.js Canvas) from the DOM entirely —
              replace it with pure CSS animated rings. This is visually identical,
              scroll-stable, and far lighter on mobile GPUs.
            • The photo circle itself is now the ONLY positioned child, so nothing
              can misalign during scroll.
      ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="z-10 my-6"
        style={{
          position: "relative",
          width: 220,
          height: 220,
          cursor: "pointer",
          touchAction: "none",
          WebkitTapHighlightColor: "transparent",
          flexShrink: 0, // prevents the circle from shrinking inside a flex column
        }}
      >
        {/* CSS-only rotating rings — scroll-stable, no WebGL, identical look */}
        <div
          style={{
            position: "absolute",
            inset: -14,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,215,0,.5)",
            animation: "spin 10s linear infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: -26,
            borderRadius: "50%",
            border: "1px dashed rgba(255,77,141,.3)",
            animation: "spinRev 16s linear infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: -40,
            borderRadius: "50%",
            border: "1px solid rgba(168,85,247,.15)",
            animation: "spin 24s linear infinite",
            pointerEvents: "none",
          }}
        />

        {/* Glow pulse */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            animation: "glow 3s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* ── Photo circle ── */}
        <div
          style={{
            position: "relative", // stays in normal flow, never affected by scroll
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid rgba(255,77,141,.6)",
            boxShadow: "0 0 40px rgba(255,77,141,.35)",
            background: "linear-gradient(160deg,#1a0530,#300510)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            zIndex: 1,
          }}
        >
          {HERO.photo ? (
            // ✅ Displays automatically once you set HERO.photo in data/index.js
            <span
              style={{
                fontSize: 64,
                animation: "float 4s ease-in-out infinite",
              }}
            >
              <img
                src={HERO.photo}
                alt={HERO.name}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </span>
          ) : (
            <>
              <span
                style={{
                  fontSize: 64,
                  animation: "float 4s ease-in-out infinite",
                  lineHeight: 1,
                }}
              >
                👸
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 7,
                  color: "rgba(255,77,141,.35)",
                }}
              >
                // set HERO.photo in data/index.js
              </span>
            </>
          )}
        </div>

        {/* Cake secret tap */}
        <span
          style={{
            position: "absolute",
            bottom: -10,
            right: -10,
            fontSize: 28,
            lineHeight: 1,
            animation: "float 2s ease-in-out infinite",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
            zIndex: 2,
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={handleCake}
        >
          🎂
        </span>
      </motion.div>

      {/* Subtle gesture hint */}
      <p
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 8,
          color: "rgba(255,255,255,.1)",
          marginTop: -16,
          marginBottom: 10,
          zIndex: 10,
        }}
      >
        tap · double-tap · hold · drag in a circle ✨
      </p>

      {/* Her name */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={handleName}
        className="z-10 mb-3 cursor-pointer select-none"
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: "clamp(24px,5vw,48px)",
          lineHeight: 1.3, // FIX: was unconstrained, clipped on small screens
          color: "#f48fb1",
          WebkitTapHighlightColor: "transparent",
          padding: "0 8px", // FIX: side padding prevents edge clip
          wordBreak: "break-word",
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {HERO.name} 🌸
      </motion.h2>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="z-10 mb-8"
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(15px,2.5vw,20px)", // FIX: clamp so it never overflows on mobile
          lineHeight: 1.7,
          color: "rgba(255,249,251,.7)",
          fontStyle: "italic",
          maxWidth: 480,
          padding: "0 8px",
        }}
      >
        {HERO.tagline}
      </motion.p>

      {/* Rotating quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="z-10 mx-auto mb-10"
        style={{ maxWidth: 520, width: "100%", padding: "0 8px" }}
      >
        <motion.p
          key={qIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: "italic",
            fontSize: "clamp(15px,2.5vw,18px)", // FIX: clamp prevents overflow
            color: "#e8d5e0",
            lineHeight: 1.9,
            minHeight: 52,
          }}
        >
          "{q.text}"
        </motion.p>
        <p
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 10,
            color: "#7a5060",
            letterSpacing: 2,
            marginTop: 8,
          }}
        >
          — {q.author}
        </p>
      </motion.div>

      {/* CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="z-10"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary"
          onClick={() => {
            unlock("🎂 Birthday Wishes opened");
            openOverlay("wishes");
          }}
        >
          🎂 Begin Celebration
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 9,
          color: "#7a5060",
          letterSpacing: 2,
          left: "50%",
          transform: "translateX(-50%)", // FIX: explicit centering
        }}
      >
        <span>SCROLL · EXPLORE · DISCOVER</span>
        <span style={{ animation: "float 1.5s ease-in-out infinite" }}>↓</span>
      </motion.div>
    </section>
  );
}

function BalloonPop({ b }) {
  const { unlock } = useApp();
  const [popped, setPopped] = useState(false);
  if (popped) return null;
  return (
    <div
      onClick={(e) => {
        spawnParticles(e.clientX, e.clientY, 12, ["🎈", "✨", "🎊"]);
        unlock("🎈 Balloon pop confetti", { confetti: true });
        setPopped(true);
        setTimeout(() => setPopped(false), 6000);
      }}
      className="cursor-pointer"
      style={{
        position: "absolute",
        bottom: "10%",
        left: b.left,
        width: b.size,
        height: b.size * 1.2,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        background: `radial-gradient(circle at 35% 35%, ${b.color}cc, ${b.color})`,
        animation: `float ${b.dur}s ease-in-out ${b.delay}s infinite`,
        zIndex: 1,
        WebkitTapHighlightColor: "transparent",
      }}
    />
  );
}
