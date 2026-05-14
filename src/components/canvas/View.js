'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, ScrollControls, Scroll } from '@react-three/drei'
import { Suspense } from 'react'
import Experience from './Experience'

export default function View() {
  return (
    <div className='fixed top-0 left-0 w-full h-full -z-10'>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 30 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Experience />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
