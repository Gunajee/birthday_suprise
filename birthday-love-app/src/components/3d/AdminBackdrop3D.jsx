import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

/**
 * A more "control-room" feeling 3D backdrop for the admin dashboard —
 * slow-drifting geometric shards in violet/gold, distinct from the
 * romantic starfield on the public site so the admin always *feels*
 * like a different, more technical space. Mobile-safe (capped dpr,
 * low poly counts, no postprocessing).
 */
function Shard({ position, rotationSpeed, color }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * rotationSpeed[0]
    ref.current.rotation.y += delta * rotationSpeed[1]
  })
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} transparent opacity={0.18} wireframe />
    </mesh>
  )
}

function Shards() {
  const shards = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 10 - 4,
    ],
    rotationSpeed: [Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1],
    color: i % 2 === 0 ? '#A855F7' : '#FFD700',
    scale: 0.6 + Math.random() * 1.4,
  })), [])

  return shards.map((s, i) => (
    <group key={i} scale={s.scale}>
      <Shard position={s.position} rotationSpeed={s.rotationSpeed} color={s.color} />
    </group>
  ))
}

export default function AdminBackdrop3D() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#A855F7" />
        <Shards />
      </Canvas>
    </div>
  )
}
