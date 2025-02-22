'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import { ArrowRight, Award, Rocket, Clock, Target, Sparkles, Code, Briefcase, GraduationCap, University } from 'lucide-react'

const About = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [activeTab, setActiveTab] = useState('story')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(true)
  
  // Parallax effect for background elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -75])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1])
  
  // Smooth cursor follower
  const springConfig = { damping: 25, stiffness: 150 }
  const cursorX = useSpring(cursorPosition.x, springConfig)
  const cursorY = useSpring(cursorPosition.y, springConfig)
  
  // Check if device is mobile/desktop
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])
  
  // Track mouse movement for desktop
  useEffect(() => {
    if (isMobile) return
    
    const handleMouseMove = (e) => {
      setCursorPosition({ 
        x: e.clientX, 
        y: e.clientY - containerRef.current.getBoundingClientRect().top 
      })
    }
    
    containerRef.current.addEventListener('mousemove', handleMouseMove)
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [isMobile])
  
  const tabs = [
    { id: 'story', label: 'My Story', icon: Rocket },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'approach', label: 'My Approach', icon: Target }
  ]

  // Content for different tabs
  const tabContent = {
    story: {
      title: "Crafting Digital Experiences",
      description: "I'm Venu Gopal Boga, a Full Stack Developer with a passion for creating elegant, high-performance web applications. My journey began in process optimization at Cognizant, evolved through client relations at VAK IT Systems, and culminated in founding Minimal Edge Technologies, where I now build AI-enhanced business solutions.",
      highlights: [
        "Founded Minimal Edge Technologies in 2023",
        "Specialized in AI-driven development workflows",
        "Passionate about performance optimization",
        "Advocate for clean, maintainable code architecture"
      ],
      icon: Rocket,
      color: "indigo"
    },
    experience: {
      title: "Professional Journey",
      description: "With over 5 years in the tech industry, I've built expertise across the development spectrum, from optimizing backend systems to crafting pixel-perfect frontends. I've worked with diverse teams and clients, constantly pushing the boundaries of what's possible in web development.",
      timeline: [
        {
          period: "2023 - Present",
          role: "Founder & Full Stack Developer",
          company: "Minimal Edge Technologies",
          achievements: "Launched multiple high-performance web platforms with 95%+ Lighthouse scores"
        },
        {
          period: "2020 - 2023",
          role: "Sr. Bench Sales Recruiter",
          company: "VAK IT Systems",
          achievements: "Managed consultant placements and market analysis initiatives"
        },
        {
          period: "2018 - 2019",
          role: "Process Executive",
          company: "Cognizant",
          achievements: "Ranked #1 in Digital Coding Competition among global teams"
        }
      ],
      icon: Briefcase,
      color: "blue"
    },
    education: {
      title: "Learning & Growth",
      description: "My educational background combines formal learning with continuous self-improvement. I believe in staying ahead of industry trends through constant learning and practical application of new technologies.",
      qualifications: [
        {
          degree: "Bachelor of Technology",
          field: "Electronics and Communication Engineering",
          institution: "Vidya Jyothi Institute of technology",
          University: "JNTUH",
          year: "2017"
        }
      ],
      certifications: [
        "Full Stack Web Development (MERN Stack)",
        "Advanced React Patterns & Performance",
        "AI Integration for Modern Web Applications",
        "Cloud Architecture & Deployment"
      ],
      icon: GraduationCap,
      color: "emerald"
    },
    approach: {
      title: "Philosophy & Approach",
      description: "I approach each project with a blend of creativity and technical precision. My development philosophy centers on creating solutions that are not just functionally robust but also aesthetically refined and future-proof.",
      principles: [
        {
          title: "User-Centered Design",
          description: "Every line of code serves the end user experience"
        },
        {
          title: "Performance First",
          description: "Optimizing for speed and efficiency at every level"
        },
        {
          title: "Maintainable Architecture",
          description: "Building systems that scale and evolve elegantly"
        },
        {
          title: "Continuous Innovation",
          description: "Constantly exploring new technologies and approaches"
        }
      ],
      icon: Target,
      color: "violet"
    }
  }

  return (
    <section 
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-indigo-200/20 to-blue-200/20 blur-3xl"
          style={{ y: y1, rotate }}
        />
        <motion.div 
          className="absolute bottom-40 left-[5%] w-96 h-96 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-3xl"
          style={{ y: y2, rotate: useTransform(rotate, r => -r) }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-gradient-to-r from-blue-100/10 to-indigo-100/10 blur-3xl"
          style={{ y: y3, scale }}
        />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" 
             style={{ backgroundImage: `radial-gradient(#6366F1 0.8px, transparent 0.8px)`, 
                      backgroundSize: '30px 30px' }} 
        />
      </div>

      {/* Interactive cursor follower (desktop only) */}
      {!isMobile && isInView && (
        <motion.div
          className="absolute w-[150px] h-[150px] rounded-full pointer-events-none mix-blend-soft-light"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(79,70,229,0.1) 50%, transparent 80%)',
            filter: 'blur(8px)',
          }}
        />
      )}

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="inline-block">About Me</span>
            <motion.span 
              className="inline-block w-3 h-10 ml-2 rounded-full bg-primary-500"
              animate={{ 
                scaleY: [1, 1.5, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The story behind my work, approach, and passion for creating exceptional digital experiences.
          </p>
        </motion.div>

        {/* Interactive tab navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id
            const Icon = tab.icon
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-full flex items-center gap-2 
                           ${isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                whileHover={!isActive ? { scale: 1.05, y: -2 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
                  initial={{ opacity: isActive ? 1 : 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  style={{ originX: 0 }}
                  layoutId="activeTabBackground"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
                <span className="relative z-10">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-primary-500'}`} />
                </span>
                <span className="relative z-10 font-medium">{tab.label}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Tab content with staggered animations */}
        <div className="max-w-5xl mx-auto">
          {activeTab === 'story' && (
            <StoryContent content={tabContent.story} isVisible={isInView && activeTab === 'story'} />
          )}

          {activeTab === 'experience' && (
            <ExperienceContent content={tabContent.experience} isVisible={isInView && activeTab === 'experience'} />
          )}

          {activeTab === 'education' && (
            <EducationContent content={tabContent.education} isVisible={isInView && activeTab === 'education'} />
          )}

          {activeTab === 'approach' && (
            <ApproachContent content={tabContent.approach} isVisible={isInView && activeTab === 'approach'} />
          )}
        </div>
      </div>
    </section>
  )
}

// Tab Content Components
const StoryContent = ({ content, isVisible }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8 md:p-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left column - Main content */}
          <div className="lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{content.title}</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{content.description}</p>
              
              <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary-500" />
                Key Highlights
              </h4>
              
              <ul className="space-y-3 mb-8">
                {content.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  >
                    <div className="mt-1 w-4 h-4 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                    </div>
                    <span className="text-gray-700">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors group"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span>Get in touch to learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
          
          {/* Right column - Clean Profile Image */}
          <div className="lg:w-2/5">
            <motion.div
              className="relative h-full min-h-[300px] rounded-xl overflow-hidden flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Simple, clean profile image without frame or overlay */}
              <div className="relative w-full h-full">
                <img 
                  src="/profile-image.png" 
                  alt="Venu Gopal Boga"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ExperienceContent = ({ content, isVisible }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">{content.title}</h3>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-4xl">{content.description}</p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:translate-x-[-0.5px]" />
          
          {/* Timeline entries */}
          {content.timeline.map((item, index) => (
            <motion.div
              key={index}
              className="relative mb-16 last:mb-0"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.15) }}
            >
              <div className={`flex flex-col md:flex-row md:items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline marker */}
                <div className="absolute left-[-12px] md:left-1/2 md:transform md:translate-x-[-50%] w-6 h-6 rounded-full bg-white border-4 border-primary-500 z-10" />
                
                {/* Date block */}
                <div className={`pl-8 pb-8 md:pb-0 md:pl-0 md:w-1/2 ${index % 2 !== 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                  <span className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-medium">
                    {item.period}
                  </span>
                </div>
                
                {/* Content block */}
                <div className={`pl-8 md:w-1/2 ${index % 2 !== 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{item.role}</h4>
                    <h5 className="text-primary-600 font-medium mb-4">{item.company}</h5>
                    <p className="text-gray-600">{item.achievements}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const EducationContent = ({ content, isVisible }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">{content.title}</h3>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-4xl">{content.description}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formal Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -left-3 top-3 w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="pl-10">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Formal Education</h4>
                
                {content.qualifications.map((qual, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-50 rounded-xl p-6 shadow-sm mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="text-lg font-bold text-gray-900">{qual.degree}</h5>
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">
                        {qual.year}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{qual.field}</p>
                    <p className="text-primary-600 font-medium">{qual.institution}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Certifications & Continuous Learning */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -left-3 top-3 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div className="pl-10">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Professional Development</h4>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm mb-6">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">Continuous Learning</h5>
                  <p className="text-gray-600 mb-6">
                    Ongoing professional development through specialized certifications and focused learning tracks.
                  </p>
                  
                  <ul className="space-y-4">
                    {content.certifications.map((cert, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                      >
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                        </div>
                        <span className="text-gray-700">{cert}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <motion.div
                  className="bg-blue-50 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h5 className="text-lg font-semibold text-gray-900">Learning Philosophy</h5>
                  </div>
                  <p className="text-gray-600">
                    I believe that learning is a lifelong journey. I dedicate at least 10 hours weekly to 
                    staying current with emerging technologies and best practices to ensure my skills remain cutting-edge.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const ApproachContent = ({ content, isVisible }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">{content.title}</h3>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-4xl">{content.description}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.principles.map((principle, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              whileHover={{ y: -5, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                  {index === 0 && <Target className="w-6 h-6 text-violet-600" />}
                  {index === 1 && <Clock className="w-6 h-6 text-violet-600" />}
                  {index === 2 && <Code className="w-6 h-6 text-violet-600" />}
                  {index === 3 && <Sparkles className="w-6 h-6 text-violet-600" />}
                </div>
                
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{principle.title}</h4>
                <p className="text-gray-600">{principle.description}</p>
              </div>
              
              <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 to-purple-500" />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-12 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-transparent rounded-bl-full opacity-50" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100 to-transparent rounded-tr-full opacity-50" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-violet-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">My Core Values</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <span className="block text-violet-700 font-semibold mb-1">Precision</span>
                <p className="text-sm text-gray-600">Attention to detail in every line of code</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <span className="block text-violet-700 font-semibold mb-1">Innovation</span>
                <p className="text-sm text-gray-600">Finding creative solutions to complex problems</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <span className="block text-violet-700 font-semibold mb-1">Reliability</span>
                <p className="text-sm text-gray-600">Consistently delivering high-quality work</p>
              </div>
            </div>
            
            <p className="text-gray-600">
              These principles guide every project I undertake, ensuring that each solution 
              not only meets immediate needs but creates lasting value for users and clients alike.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default About