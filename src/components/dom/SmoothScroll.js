'use client'

import { useEffect } from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'
import useStore from '@/store/useStore'

export default function SmoothScroll({ children }) {
  const setMousePosition = useStore((state) => state.setMousePosition)

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition([x, y])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [setMousePosition])

  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  )
}
