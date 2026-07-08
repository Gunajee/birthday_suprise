import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

/**
 * A gently auto-rotating golden ring that frames the hero photo in 3D.
 * Sits BEHIND the actual photo element, which stays a normal DOM node
 * so all the tap/long-press/drag gestures keep working exactly as before —
 * this only adds visual depth, never intercepts touch events.
 */
function GoldRing() {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.25
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.3, 0.09, 16, 100]} />
      <meshStandardMaterial color="#FFD700" emissive="#FF4D8D" emissiveIntensity={0.25} metalness={0.7} roughness={0.25} />
    </mesh>
  )
}

function InnerRing() {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z -= delta * 0.4
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.05, 0.035, 12, 100]} />
      <meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={0.5} metalness={0.5} roughness={0.4} />
    </mesh>
  )
}

export default function PhotoFrame3D({ size = 260 }) {
  return (
    <div style={{
      position: 'absolute', inset: -20, zIndex: 0,
      width: size + 40, height: size + 40, pointerEvents: 'none',
    }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 3, 4]} intensity={1} color="#FFD700" />
        <GoldRing />
        <InnerRing />
      </Canvas>
    </div>
  )
}
