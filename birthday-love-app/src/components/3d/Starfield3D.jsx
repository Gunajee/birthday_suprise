import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

/**
 * A lightweight 3D starfield used as the page background.
 * Mobile-safe: capped pixel ratio, low star count, no postprocessing.
 * Sits behind everything (z-index 0) — purely atmospheric, never blocks taps.
 */
function Stars({ count = 700 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 18 + Math.random() * 30
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#FF8FC2" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function GoldDust({ count = 300 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 40
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.008
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#FFD700" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export default function Starfield3D() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]}                 // caps pixel ratio for phone performance
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <Stars />
        <GoldDust />
      </Canvas>
    </div>
  )
}
