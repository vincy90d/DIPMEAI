'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '@/store/useStore'
import HeroScene from './HeroScene'

export default function Experience() {
  const meshRef = useRef()
  const cameraPosition = useStore((state) => state.cameraPosition)
  const v = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    // Smoothly animate camera position
    state.camera.position.lerp(v.set(...cameraPosition), 0.1)
    state.camera.lookAt(0, 0, 0)

  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Test HeroScene with Pizza Image */}
      <HeroScene imageSrc="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop" />
    </>
  )
}
