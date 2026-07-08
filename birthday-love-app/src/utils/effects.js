// Visual effect helpers — DOM-based particle bursts.
// These attach temporary elements directly to <body> and self-remove.

export function spawnParticles(cx, cy, count = 16, emojis = ["✨","💖","🌸","💫","⭐","🩷","🌺","🎀"]) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div")
    const dx = (Math.random() - 0.5) * 220
    const dy = (Math.random() - 0.5) * 220 - 70
    el.style.cssText = `
      position:fixed; left:${cx}px; top:${cy}px; pointer-events:none; z-index:9999;
      font-size:${Math.random() * 14 + 10}px;
      --tx:${dx}px; --ty:${dy}px;
      animation: firework ${0.7 + Math.random() * 0.5}s ease-out forwards;
    `
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)]
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 1300)
  }
}

export function spawnFireworksBurst() {
  const colors = ["#FF4D8D", "#A855F7", "#FFD700", "#60A5FA", "#34D399", "#FB923C", "#fff"]
  for (let b = 0; b < 18; b++) {
    setTimeout(() => {
      const bx = Math.random() * window.innerWidth
      const by = Math.random() * window.innerHeight * 0.75
      for (let i = 0; i < 32; i++) {
        const el = document.createElement("div")
        const ang = (Math.PI * 2 * i) / 32
        const dist = 55 + Math.random() * 100
        el.style.cssText = `
          position:fixed; left:${bx}px; top:${by}px;
          width:5px; height:5px; border-radius:50%; pointer-events:none; z-index:9998;
          background:${colors[Math.floor(Math.random() * colors.length)]};
          --tx:${Math.cos(ang) * dist}px; --ty:${Math.sin(ang) * dist}px;
          animation: firework 0.85s ease-out ${Math.random() * 0.15}s forwards;
        `
        document.body.appendChild(el)
        setTimeout(() => el.remove(), 1200)
      }
    }, b * 250)
  }
}

export function spawnFallingStars(count = 12) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement("div")
      const len = 60 + Math.random() * 80
      el.style.cssText = `
        position:fixed; left:${Math.random() * 100}%; top:-10px;
        width:2px; height:${len}px; pointer-events:none; z-index:50; border-radius:1px;
        background: linear-gradient(to bottom, #FFD700, transparent);
        animation: starFall ${1.2 + Math.random() * 0.8}s linear forwards;
      `
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 2200)
    }, i * 150)
  }
}

// Heart gesture detector for the ultra-hidden proposal.
// Draw a ❤ on screen: drag from the top, sweep down to a V-bottom, curve back up.
export function detectHeartGesture(pts) {
  if (pts.length < 30) return false
  const xs = pts.map(p => p.x)
  const ys = pts.map(p => p.y)
  const spreadX = Math.max(...xs) - Math.min(...xs)
  const spreadY = Math.max(...ys) - Math.min(...ys)
  if (spreadX < 90 || spreadY < 70) return false

  let bIdx = 0
  pts.forEach((p, i) => { if (p.y > pts[bIdx].y) bIdx = i })
  if (bIdx < 8 || bIdx > pts.length - 8) return false

  const before = pts.slice(0, bIdx)
  const after = pts.slice(bIdx)

  const goesDown = before[before.length - 1].y > before[0].y + 32
  const goesUp   = after[after.length - 1].y   < after[0].y - 32
  const hasLeft  = before.some(p => p.x < pts[bIdx].x - 22)
  const hasRight = after.some(p => p.x > pts[bIdx].x + 22)

  return goesDown && goesUp && hasLeft && hasRight
}
