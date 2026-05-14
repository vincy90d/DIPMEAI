'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '@/store/useStore'

export default function Experience() {
  const meshRef = useRef()
  const cameraPosition = useStore((state) => state.cameraPosition)
  const v = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    // Smoothly animate camera position
    state.camera.position.lerp(v.set(...cameraPosition), 0.1)
    state.camera.lookAt(0, 0, 0)

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  )
}
