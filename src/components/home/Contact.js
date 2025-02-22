'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, Globe, ExternalLink, ArrowRight, Sparkles } from 'lucide-react'

const Contact = () => {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const [activeMethod, setActiveMethod] = useState(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [startAnimation, setStartAnimation] = useState(false)
  
  // Scroll progress animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const textY = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  
  // Trigger animation start when section is in view
  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        setStartAnimation(true)
      }, 300)
    }
  }, [isInView])
  
  // Canvas animation effect - fluid connecting lines
  useEffect(() => {
    if (!canvasRef.current || !startAnimation) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const parent = canvas.parentElement
    
    const resizeCanvas = () => {
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }
    
    // Initialize canvas size
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Particle system for fluid connecting lines
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.size = size
        this.color = color
        this.speedFactor = Math.random() * 0.6 + 0.2
      }
      
      update() {
        // Change direction slightly for fluid movement
        this.directionX += (Math.random() - 0.5) * 0.05
        this.directionY += (Math.random() - 0.5) * 0.05
        
        // Ensure we stay within certain direction bounds
        this.directionX = Math.max(-0.5, Math.min(0.5, this.directionX))
        this.directionY = Math.max(-0.5, Math.min(0.5, this.directionY))
        
        this.x += this.directionX * this.speedFactor
        this.y += this.directionY * this.speedFactor
        
        // Wrap around canvas edges
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }
      
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }
    
    // Create particles
    const particleArray = []
    const particleCount = Math.min(Math.floor(canvas.width * canvas.height / 10000), 100)
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 1.5 + 0.5
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const directionX = (Math.random() - 0.5) * 0.5
      const directionY = (Math.random() - 0.5) * 0.5
      const color = `rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1})`
      
      particleArray.push(new Particle(x, y, directionX, directionY, size, color))
    }
    
    // Connection between particles
    function connect() {
      for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
          const dx = particleArray[a].x - particleArray[b].x
          const dy = particleArray[a].y - particleArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < canvas.width / 10) {
            const opacity = 1 - (distance / (canvas.width / 10))
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particleArray[a].x, particleArray[a].y)
            ctx.lineTo(particleArray[b].x, particleArray[b].y)
            ctx.stroke()
          }
        }
      }
    }
    
    // Animation loop
    const animate = () => {
      if (!canvasRef.current) return
      
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update()
        particleArray[i].draw()
      }
      
      connect()
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [canvasRef, startAnimation])
  
  // Contact methods
  const contactMethods = [
    {
      id: 'email',
      title: 'Email',
      icon: <Mail className="w-6 h-6" />,
      value: 'bogavenugopal96@gmail.com',
      link: 'mailto:bogavenugopal96@gmail.com',
      color: 'indigo',
      ariaLabel: 'Send an email'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      value: 'linkedin.com/in/boga-venu-gopal',
      link: 'https://linkedin.com/in/boga-venu-gopal',
      color: 'blue',
      ariaLabel: 'Connect on LinkedIn'
    },
    {
      id: 'github',
      title: 'GitHub',
      icon: <Github className="w-6 h-6" />,
      value: 'github.com/boga-venu',
      link: 'https://github.com/boga-venu',
      color: 'gray',
      ariaLabel: 'View GitHub profile'
    },
    {
      id: 'website',
      title: 'Website',
      icon: <Globe className="w-6 h-6" />,
      value: 'www.minimaledgetech.com',
      link: 'https://www.minimaledgetech.com',
      color: 'emerald',
      ariaLabel: 'Visit my company website'
    },
    {
      id: 'location',
      title: 'Location',
      icon: <MapPin className="w-6 h-6" />,
      value: 'Hyderabad, India',
      link: null,
      color: 'rose',
      ariaLabel: 'My location'
    }
  ]
  
  // Hover enter/leave handlers for contact items
  const handleMouseEnter = (method) => {
    setActiveMethod(method.id)
  }
  
  const handleMouseLeave = () => {
    setActiveMethod(null)
  }
  
  // Color mapping for contact methods
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      hover: 'group-hover:bg-indigo-500 group-hover:text-white',
      border: 'border-indigo-200',
      highlight: 'from-indigo-500 to-indigo-600',
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      hover: 'group-hover:bg-blue-500 group-hover:text-white',
      border: 'border-blue-200',
      highlight: 'from-blue-500 to-blue-600',
    },
    gray: {
      bg: 'bg-gray-50',
      text: 'text-gray-600',
      hover: 'group-hover:bg-gray-700 group-hover:text-white',
      border: 'border-gray-200',
      highlight: 'from-gray-600 to-gray-700',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      hover: 'group-hover:bg-emerald-500 group-hover:text-white',
      border: 'border-emerald-200',
      highlight: 'from-emerald-500 to-emerald-600',
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      hover: 'group-hover:bg-rose-500 group-hover:text-white',
      border: 'border-rose-200',
      highlight: 'from-rose-500 to-rose-600',
    }
  }

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative min-h-screen py-20 flex items-center overflow-hidden"
    >
      {/* Canvas background */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-50">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header with parallax effect */}
          <motion.div 
            className="text-center mb-16 md:mb-24"
            style={{ opacity, y: textY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-3"
            >
              <span className="inline-block text-xs font-bold tracking-widest text-indigo-600 uppercase px-3 py-1 bg-indigo-50 rounded-full">
                Let's Connect
              </span>
            </motion.div>
            
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400"
              initial={{ opacity: 0, y: 20 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Get In Touch
            </motion.h2>
            
            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ready to bring your vision to life? I'm just a click away. Let's create something exceptional together.
            </motion.p>
          </motion.div>
          
          {/* Premium Contact Card */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={startAnimation ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent"></div>
            <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent"></div>
            
            <div className="px-4 sm:px-8 md:px-12 py-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - profile and statement */}
                <div className="text-center md:text-left">
                  <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={startAnimation ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <div className="w-16 h-16 relative rounded-full overflow-hidden shadow-md flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                        VGB
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mt-2 sm:mt-0">Venu Gopal Boga</h3>
                      <p className="text-indigo-600">Full Stack Developer</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={startAnimation ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <p className="text-gray-600 mb-6 relative mx-4 sm:mx-0">
                      <span className="hidden md:block absolute -left-4 top-0 text-indigo-300 font-serif text-2xl">"</span>
                      I believe in crafting digital experiences that blend innovation with functionality. Let's collaborate to bring your vision to life with modern web technologies.
                      <span className="hidden md:block absolute -bottom-4 right-0 text-indigo-300 font-serif text-2xl">"</span>
                    </p>
                  </motion.div>
                  
                  <motion.div
                    className="hidden md:block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={startAnimation ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2 text-indigo-600">
                      <Sparkles className="w-5 h-5" />
                      <span className="font-medium">Available for new projects</span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Right side - contact methods */}
                <div>
                  <motion.h4
                    className="text-lg font-semibold mb-6 text-center md:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={startAnimation ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Reach Out
                  </motion.h4>
                  
                  <div className="space-y-4 w-full">
                    {contactMethods.map((method, index) => {
                      const colors = colorMap[method.color];
                      return (
                        <motion.div
                          key={method.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={startAnimation ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                          className="w-full"
                        >
                          <a
                            href={method.link}
                            target={method.link && method.link.startsWith('http') ? "_blank" : undefined}
                            rel={method.link && method.link.startsWith('http') ? "noopener noreferrer" : undefined}
                            className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border ${
                              activeMethod === method.id 
                                ? `border-${method.color}-200 bg-${method.color}-50/50` 
                                : 'border-gray-100 hover:border-gray-200'
                            } transition-all relative overflow-hidden w-full`}
                            onMouseEnter={() => handleMouseEnter(method)}
                            onMouseLeave={handleMouseLeave}
                            aria-label={method.ariaLabel}
                          >
                            {/* Icon */}
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg transition-all flex-shrink-0 ${colors.bg} ${colors.text} ${colors.hover}`}>
                              {method.icon}
                            </div>
                            
                            {/* Text */}
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-gray-900 text-base sm:text-lg">{method.title}</h5>
                              <p className="text-gray-600 text-sm sm:text-base truncate">{method.value}</p>
                            </div>
                            
                            {/* Action indicator */}
                            {method.link && (
                              <div className={`w-8 h-8 hidden sm:flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${colors.bg}`}>
                                <ArrowRight className={`w-4 h-4 ${colors.text}`} />
                              </div>
                            )}
                            
                            {/* Hover effect - sliding gradient */}
                            <motion.div 
                              className={`absolute inset-0 bg-gradient-to-r ${colors.highlight} opacity-0 group-hover:opacity-5`}
                              initial={{ x: '-100%' }}
                              animate={{ 
                                x: activeMethod === method.id ? '100%' : '-100%' 
                              }}
                              transition={{ duration: activeMethod === method.id ? 1 : 0 }}
                            />
                          </a>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  <motion.div
                    className="mt-8 text-center md:text-left text-gray-500 text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={startAnimation ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <p>Typically responding within 24 hours</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Final CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
            >
              <span>Explore my work</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact