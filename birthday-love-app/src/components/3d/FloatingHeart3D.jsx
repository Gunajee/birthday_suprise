import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * A 3D heart built from a parametric shape, gently rotating and pulsing.
 * Used on the proposal screen for the "fantastic look" requested.
 * Lightweight: single mesh, no textures, mobile-safe pixel ratio cap.
 */
function heartShape() {
  const shape = new THREE.Shape()
  const x = 0, y = 0
  shape.moveTo(x, y)
  shape.bezierCurveTo(x, y - 3, x - 6, y - 3, x - 6, y + 1)
  shape.bezierCurveTo(x - 6, y + 4, x - 3, y + 6, x, y + 8.5)
  shape.bezierCurveTo(x + 3, y + 6, x + 6, y + 4, x + 6, y + 1)
  shape.bezierCurveTo(x + 6, y - 3, x, y - 3, x, y)
  return shape
}

function Heart() {
  const meshRef = useRef()
  const geometry = React.useMemo(() => {
    const shape = heartShape()
    return new THREE.ExtrudeGeometry(shape, { depth: 2, bevelEnabled: true, bevelThickness: 0.6, bevelSize: 0.6, bevelSegments: 4 })
  }, [])

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.6
    const t = clock.getElapsedTime()
    const pulse = 1 + Math.sin(t * 2.4) * 0.06
    meshRef.current.scale.set(pulse * 0.22, pulse * 0.22, pulse * 0.22)
  })

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[Math.PI, 0, 0]}>
      <meshStandardMaterial color="#FF4D8D" emissive="#FF1F6B" emissiveIntensity={0.4} roughness={0.3} metalness={0.4} />
    </mesh>
  )
}

export default function FloatingHeart3D({ height = 220 }) {
  return (
    <div style={{ width: '100%', height, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#FFD700" />
        <pointLight position={[-5, -3, 3]} intensity={0.8} color="#A855F7" />
        <Heart />
      </Canvas>
    </div>
  )
}
