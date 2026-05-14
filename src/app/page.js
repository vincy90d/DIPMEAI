'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import useStore from '@/store/useStore'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const setCameraPosition = useStore((state) => state.setCameraPosition)
  const container = useRef()

  useEffect(() => {
    const sections = gsap.utils.toArray('.section')

    sections.forEach((section, i) => {
      const pos = section.dataset.cameraPos.split(',').map(Number)

      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setCameraPosition(pos),
        onEnterBack: () => setCameraPosition(pos),
        // markers: true,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [setCameraPosition])

  return (
    <div ref={container}>
      <section
        className="section h-screen flex items-center justify-center bg-transparent"
        data-camera-pos="0,0,5"
      >
        <h1 className="text-6xl font-bold text-white">Section 1</h1>
      </section>

      <section
        className="section h-screen flex items-center justify-center bg-transparent"
        data-camera-pos="2,2,5"
      >
        <h1 className="text-6xl font-bold text-white">Section 2</h1>
      </section>

      <section
        className="section h-screen flex items-center justify-center bg-transparent"
        data-camera-pos="-2,-2,5"
      >
        <h1 className="text-6xl font-bold text-white">Section 3</h1>
      </section>

      <section
        className="section h-screen flex items-center justify-center bg-transparent"
        data-camera-pos="0,5,2"
      >
        <h1 className="text-6xl font-bold text-white">Section 4</h1>
      </section>
    </div>
  )
}
