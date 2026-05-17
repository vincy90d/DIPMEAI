'use client'

import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '@/store/useStore'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uParallaxStrength;
  uniform float uScroll;
  varying vec2 vUv;

  void main() {
    // Calculate offset based on mouse and scroll
    vec2 offset = uMouse * uParallaxStrength;
    offset.y += uScroll * uParallaxStrength;

    // Center the effect and apply to UVs
    vec2 uv = vUv + offset - (uParallaxStrength * 0.5);

    // Zoom in slightly to avoid edges
    uv = (uv - 0.5) * (1.0 - uParallaxStrength) + 0.5;

    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`

export default function HeroScene({ imageSrc, parallaxStrength = 0.08 }) {
  const meshRef = useRef()
  const { viewport } = useThree()
  const texture = useTexture(imageSrc)

  const mousePosition = useStore((state) => state.mousePosition || [0, 0])

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uParallaxStrength: { value: parallaxStrength },
    uScroll: { value: 0 }
  }), [texture, parallaxStrength])

  useFrame((state) => {
    const { uMouse, uScroll } = uniforms

    // Smoothly interpolate mouse position from store
    uMouse.value.x = THREE.MathUtils.lerp(uMouse.value.x, mousePosition[0], 0.1)
    uMouse.value.y = THREE.MathUtils.lerp(uMouse.value.y, mousePosition[1], 0.1)

    // Use scroll position from state (normalized)
    const scroll = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
    uScroll.value = THREE.MathUtils.lerp(uScroll.value, scroll, 0.1)
  })

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}
