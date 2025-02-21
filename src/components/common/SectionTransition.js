'use client'
import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const SectionTransition = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)
  const transitionRef = useRef(null)
  const { scrollY } = useScroll()
  
  // Measure hero and viewport
  const [heroHeight, setHeroHeight] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  
  useEffect(() => {
    const updateMeasurements = () => {
      setViewportHeight(window.innerHeight);
      // Find hero element and measure its height
      const heroElement = document.querySelector('main');
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        const heroContent = heroElement.querySelector('[class*="z-30"]');
        if (heroContent) {
          setHeroHeight(heroContent.offsetHeight);
        } else {
          setHeroHeight(heroRect.height);
        }
      }
    };
    
    if (isMounted) {
      updateMeasurements();
      window.addEventListener('resize', updateMeasurements);
    }
    
    return () => window.removeEventListener('resize', updateMeasurements);
  }, [isMounted]);
  
  // Calculate offset to coordinate with hero parallax
  const safeScrollOffset = Math.max(0, heroHeight - viewportHeight + 100);
  
  // Transform values based on scroll position with responsive values
  const opacity = useTransform(
    scrollY, 
    [safeScrollOffset, safeScrollOffset + 300],
    [0, 1]
  )
  
  const scale = useTransform(
    scrollY,
    [safeScrollOffset, safeScrollOffset + 300],
    [0.95, 1]
  )
  
  const y = useTransform(
    scrollY,
    [safeScrollOffset, safeScrollOffset + 300],
    [50, 0]
  )
  
  const blur = useTransform(
    scrollY,
    [safeScrollOffset, safeScrollOffset + 300],
    [6, 0]
  )
  
  // Calculate the border radius value
  const borderRadius = useTransform(
    scrollY,
    [safeScrollOffset, safeScrollOffset + 300],
    [40, 0]
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Avoid animation flickering on initial load
  }

  return (
    <motion.div
      ref={transitionRef}
      style={{
        opacity,
        scale,
        y,
        filter: `blur(${blur}px)`,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
      }}
      className="relative z-10 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)]"
    >
      {children}
    </motion.div>
  )
}

export default SectionTransition