'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUp, 
  Heart, 
  Code, 
  Sparkles, 
  ExternalLink,
  Clock
} from 'lucide-react'

const Footer = () => {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: false, amount: 0.3 })
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [hoveredLink, setHoveredLink] = useState(null)
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  })
  
  const bgY = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  
  // Quick links data
  const quickLinks = [
    { name: 'About', section: 'about' },
    { name: 'Projects', section: 'projects' },
    { name: 'Skills', section: 'skills' },
    { name: 'Experience', section: 'experience' },
    { name: 'Contact', section: 'contact' }
  ]
  
  // Social links data
  const socialLinks = [
    { 
      name: 'GitHub', 
      href: 'https://github.com/boga-venu', 
      icon: Github,
      color: 'group-hover:text-neutral-900',
      bgColor: 'group-hover:bg-white'
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/in/boga-venu-gopal', 
      icon: Linkedin,
      color: 'group-hover:text-blue-600',
      bgColor: 'group-hover:bg-white'
    },
    { 
      name: 'Email', 
      href: 'mailto:bogavenugopal96@gmail.com', 
      icon: Mail,
      color: 'group-hover:text-red-500',
      bgColor: 'group-hover:bg-white'
    }
  ]
  
  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  // Update current year on initial render
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <motion.footer 
      ref={footerRef}
      className="relative pt-20 pb-10 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y: bgY }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-50/50 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-50/50 blur-3xl" />
        
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: "radial-gradient(#6366F1 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px"
          }}
        />
      </motion.div>
      
      <div className="container mx-auto px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand & description - 5 columns on desktop */}
          <motion.div 
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                VGB
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Venu Gopal Boga</h3>
                <p className="text-primary-600">Full Stack Developer</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Transforming ideas into exceptional digital experiences through innovative code and 
              AI-driven solutions. Building tomorrow's web with precision and artistry.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Available for new opportunities</span>
            </div>
          </motion.div>
          
          {/* Quick links - 3 columns on desktop */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Explore</h4>
            <nav>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.section}>
                    <button
                      onClick={() => scrollToSection(link.section)}
                      className="group flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span 
                        className={`w-0 group-hover:w-2 h-px bg-primary-500 transition-all duration-300 ${
                          hoveredLink === link.name ? 'w-2' : 'w-0'
                        }`}
                      />
                      <span>{link.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
          
          {/* Connect & Social - 4 columns on desktop */}
          <motion.div 
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Connect</h4>
            
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-600 transition-all duration-300 hover:border-transparent"
                    whileHover={{ y: -4 }}
                    aria-label={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  >
                    <social.icon className={`w-5 h-5 transition-colors ${social.color}`} />
                    <div className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ${social.bgColor}`} style={{ zIndex: -1 }} />
                  </motion.a>
                ))}
              </div>
              
              <motion.div
                className="text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="flex items-start gap-2 mb-2">
                  <Mail className="w-4 h-4 mt-0.5 text-primary-500" />
                  <span>bogavenugopal96@gmail.com</span>
                </p>
                <p className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 mt-0.5 text-primary-500" />
                  <a 
                    href="https://www.minimaledgetech.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 hover:underline transition-colors"
                  >
                    www.minimaledgetech.com
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Copyright section & scroll to top */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div 
            className="flex items-center gap-2 text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span>© {currentYear} Venu Gopal Boga.</span>
            <span className="hidden md:flex items-center">
              Crafted with 
              <Heart className="w-3.5 h-3.5 mx-1 text-red-500" />
              and
              <Code className="w-3.5 h-3.5 mx-1 text-primary-500" />
            </span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4 text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="text-gray-600">Built with Next.js, React, and Tailwind CSS</span>
            
            <motion.button
              onClick={scrollToTop}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-primary-500 hover:text-white transition-colors"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer