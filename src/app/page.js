'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Projects from '@/components/home/Projects'
import Skills from '@/components/home/Skills'
import Experience from '@/components/home/Experience'
import Contact from '@/components/home/Contact'
import SectionTransition from '@/components/common/SectionTransition'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative">
      {/* Hero has no transition - it's the first thing users see */}
      <div className="relative z-0">
        <Hero />
      </div>
      
      {/* Content sections with transition animation */}
      {mounted && (
        <SectionTransition>
          <div className="bg-white relative pt-12 z-20">
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Contact />
          </div>
        </SectionTransition>
      )}
    </div>
  )
}