'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { 
  Menu, 
  X, 
  ChevronRight, 
  Github, 
  Linkedin, 
  Mail,
  Download
} from 'lucide-react'
import { scrollToSection } from '@/lib/utils'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const headerRef = useRef(null)

  // Track scroll for showing/hiding header
  const { scrollY } = useScroll()
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only hide header after scrolling past 100px from top
    if (latest < 100) {
      setIsVisible(true)
      return
    }
    
    // Determine scroll direction and visibility
    const isScrollingDown = latest > lastScrollY
    setIsVisible(!isScrollingDown)
    setLastScrollY(latest)
  })

  // Detect when header is scrolled for background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    // Initial check
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Track active section while scrolling
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact']
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.55, // Section needs to be 55% visible
    }
    
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }
    
    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })
    
    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) observer.unobserve(element)
      })
    }
  }, [])
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return
    
    const handleOutsideClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isMenuOpen])

  // Handle resize events to close mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  // Navigation items
  const navItems = [
    { name: 'About', section: 'about' },
    { name: 'Projects', section: 'projects' },
    { name: 'Experience', section: 'experience' },
    { name: 'Skills', section: 'skills' },
    { name: 'Contact', section: 'contact' }
  ]
  
  // Social links
  const socialLinks = [
    { icon: Github, href: 'https://github.com/boga-venu', label: 'GitHub Profile' },
    { icon: Linkedin, href: 'https://linkedin.com/in/boga-venu-gopal', label: 'LinkedIn Profile' },
    { icon: Mail, href: 'mailto:bogavenugopal96@gmail.com', label: 'Email Contact' }
  ]

  return (
    <motion.header
      ref={headerRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled || isMenuOpen
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-20">
          {/* Logo/Brand with animation */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/" 
              className="flex items-center gap-3"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div 
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg transition-colors bg-gradient-to-br from-indigo-500 to-blue-500 text-white"
              >
                VGB
              </div>
              <span className="font-display font-bold text-gray-900 transition-colors">
                Venu Gopal Boga
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.section)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.section
                    ? 'text-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
                {activeSection === item.section && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-1 h-1 bg-current rounded-full"
                    layoutId="activeNavIndicator"
                    initial={{ x: '-50%' }}
                    animate={{ x: '-50%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
            
            {/* Resume download button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-900" />
            ) : (
              <Menu className="h-6 w-6 text-gray-900" />
            )}
          </motion.button>
        </nav>

        {/* Mobile Navigation - Full Screen Overlay - Fixed solid background */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 top-20 bg-white z-50 flex flex-col"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: 'white' }} // Enforcing solid background
            >
              <div className="flex flex-col p-6 bg-white"> {/* Added bg-white here as well */}
                {/* Navigation Links */}
                <nav className="mb-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (index * 0.05) }}
                      className="bg-white" // Added to ensure link container is opaque
                    >
                      <button
                        onClick={() => {
                          scrollToSection(item.section)
                          setIsMenuOpen(false)
                        }}
                        className="flex items-center w-full py-4 border-b border-gray-100 text-gray-800 hover:text-indigo-600 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 mr-3 text-indigo-500" />
                        <span className="text-lg font-medium">{item.name}</span>
                      </button>
                    </motion.div>
                  ))}
                </nav>
                
                {/* Resume download */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-10"
                >
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Resume</span>
                  </a>
                </motion.div>
                
                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-gray-500 mb-4">Connect with me</p>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + (index * 0.1) }}
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header
