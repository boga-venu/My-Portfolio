'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const SectionTransition = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()
  
  // Transform values based on scroll position
  const opacity = useTransform(
    scrollY, 
    [50, 300], 
    [0, 1]
  )
  
  const scale = useTransform(
    scrollY,
    [0, 300],
    [0.95, 1]
  )
  
  const y = useTransform(
    scrollY,
    [0, 300],
    [50, 0]
  )
  
  const blur = useTransform(
    scrollY,
    [0, 300],
    [6, 0]
  )

  // Calculate the border radius value
  const borderRadius = useTransform(
    scrollY,
    [0, 300],
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