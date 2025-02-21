'use client'
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion, useScroll, useTransform, useAnimation, useMotionValue } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Code2, Database, Sparkles } from 'lucide-react';

// Enhanced skill card with 3D transform
const SkillCard = ({ category, skills, index, icon: Icon, position, mousePosition, onHoverChange }) => {
  const cardRef = useRef(null);
  const [isNearMouse, setIsNearMouse] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const contentRef = useRef(null);
  const controls = useAnimation();
  const [proximityLevel, setProximityLevel] = useState(0);

  // Enhanced proximity detection with gradual levels
  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(mousePosition.x - cardCenterX, 2) +
        Math.pow(mousePosition.y - cardCenterY, 2)
      );

      // Calculate proximity on a scale from 0 to 1
      const maxDistance = 400;
      const proximity = Math.max(0, 1 - (distance / maxDistance));
      setProximityLevel(proximity);

      // Set isNearMouse based on proximity
      setIsNearMouse(proximity > 0.3);

      // Notify parent when proximity crosses threshold
      if (onHoverChange) {
        onHoverChange(proximity > 0.3);
      }
    }
  }, [mousePosition, onHoverChange]);

  // Handle 3D rotation effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current || !isNearMouse) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateXValue = (e.clientY - centerY) / 20;
      const rotateYValue = (e.clientX - centerX) / 20;

      rotateX.set(rotateXValue);
      rotateY.set(rotateYValue);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isNearMouse, rotateX, rotateY]);

  // Handle scrolling content effect
  useEffect(() => {
    const animateScroll = async () => {
      if (!contentRef.current) return;

      const containerHeight = 152;
      const fullContentHeight = contentRef.current.scrollHeight;
      const scrollDistance = fullContentHeight - containerHeight;

      if (isNearMouse && scrollDistance > 0) {
        // First, pause briefly to let the user see the initial content
        await controls.start({
          y: 0,
          transition: {
            duration: 0.2,
          }
        });

        // Then begin the slow scroll after a delay
        await controls.start({
          y: -scrollDistance,
          transition: {
            duration: 5, // Slower scroll (increased from 3s to 5s)
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.2, // Add delay before scrolling starts
          }
        });
      } else {
        await controls.start({
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }
        });
      }
    };

    animateScroll();
  }, [isNearMouse, controls]);

  return (
    <motion.div
      ref={cardRef}
      className={`absolute ${getPosition(position)}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
        zIndex: proximityLevel > 0.3 ? 25 : 10,
      }}
    >
      <motion.div
        animate={{
          scale: 1 + (proximityLevel * 0.05),
          opacity: 0.3 + (proximityLevel * 0.7),
        }}
        transition={{ duration: 0.2 }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${0.2 + (proximityLevel * 0.8)})`,
          backdropFilter: `blur(${Math.max(0, 8 - (proximityLevel * 8))}px)`, // Will reach 0 at full proximity
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: `0 ${15 + (proximityLevel * 15)}px ${30 + (proximityLevel * 20)}px rgba(0, 0, 0, ${0.1 + (proximityLevel * 0.15)})`,
          transform: `translateZ(${proximityLevel * 50}px)`,
        }}
      >
        <motion.div
          className="p-6 border-b border-gray-100"
          style={{
            background: isNearMouse
              ? 'rgba(255, 255, 255, 0.98)'
              : 'rgba(255, 255, 255, 0.3)' // Increased from 0.2 to 0.3
          }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)',
              }}
            >
              <Icon className="w-6 h-6 text-white" />
              {isNearMouse && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                    transform: 'translateX(-100%)',
                    animation: 'shimmer 2s infinite'
                  }}
                />
              )}
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{category}</h3>
              <p className="text-sm text-gray-500">Hover to explore</p>
            </div>
          </div>
        </motion.div>

        <div className="relative h-[200px] overflow-hidden">
          <motion.div
            ref={contentRef}
            animate={controls}
            className="absolute w-full"
          >
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="px-6 py-4 border-b border-gray-100"
                style={{
                  backgroundColor: isNearMouse ? 'white' : 'rgba(255, 255, 255, 0.8)' // More visible when not hovered
                }}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-primary-500" />
                  <span className={`${isNearMouse ? 'text-gray-700' : 'text-gray-600'}`}>{skill}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {!isNearMouse && (
            <div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(255,255,255,0.8), transparent)'
              }}
            />
          )}
        </div>
      </motion.div>

      {/* Enhanced 3D shadow effect */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isNearMouse ? 1 : 0.2, // Added slight visibility when not hovered
          transform: 'translateZ(-20px)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
};

// Helper function to position cards diagonally
function getPosition(position) {
  switch (position) {
    case 'topRight':
      return 'right-32 top-32 -translate-y-[20%]';
    case 'bottomLeft':
      return 'left-32 bottom-32 translate-y-[20%]';
    default:
      return 'left-32 top-1/2 -translate-y-1/2';
  }
}

// Dynamic text reveal effect
const RevealText = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

// Main Hero component
const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isNearCard, setIsNearCard] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const heroContentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  
  // Scroll animations - MOVED INSIDE the component
  const { scrollY } = useScroll();
  
  const [viewportHeight, setViewportHeight] = useState(0);

  // Update viewport height on mount and resize
  useEffect(() => {
    const updateMeasurements = () => {
      setViewportHeight(window.innerHeight);
      if (heroContentRef.current) {
        setContentHeight(heroContentRef.current.offsetHeight);
      }
    };
    
    updateMeasurements();
    window.addEventListener('resize', updateMeasurements);
    return () => window.removeEventListener('resize', updateMeasurements);
  }, []);

  const safeScrollOffset = Math.max(0, contentHeight - viewportHeight + 100);

  // Adjust parallax to start after safe offset
  const heroOpacity = useTransform(
    scrollY, 
    [safeScrollOffset, safeScrollOffset + 400], 
    [1, 0]
  );
  
  const heroY = useTransform(
    scrollY,
    [safeScrollOffset, safeScrollOffset + 400],
    [0, 200]
  );
  
  const backgroundY = useTransform(
    scrollY,
    [safeScrollOffset, safeScrollOffset + 400],
    [0, 100]
  );


  // Check device size on mount and resize
  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024); // Only show cards on larger desktops
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Mouse movement handling
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      checkCardProximity(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop]);

  // Card proximity check
  const checkCardProximity = (mouseX, mouseY) => {
    let near = false;
    const cardPositions = [
      { x: window.innerWidth * 0.85, y: window.innerHeight * 0.4 },
      { x: window.innerWidth * 0.15, y: window.innerHeight * 0.6 }
    ];

    cardPositions.forEach(pos => {
      const distance = Math.sqrt(
        Math.pow(mouseX - pos.x, 2) + Math.pow(mouseY - pos.y, 2)
      );
      if (distance < 300) near = true;
    });

    setIsNearCard(near);
  };

  const skillCategories = [
    {
      category: "Frontend Artistry",
      icon: Code2,
      position: "topRight",
      skills: [
        "Next.js & React Architecture",
        "UI System Innovation",
        "Performance Engineering",
        "Motion & Interaction Design",
        "Design Systems",
        "State Management"
      ]
    },
    {
      category: "Backend Mastery",
      icon: Database,
      position: "bottomLeft",
      skills: [
        "System Architecture",
        "Cloud Infrastructure",
        "Database Innovation",
        "API Design",
        "Security Implementation",
        "Scalable Solutions"
      ]
    }
  ];

  

  return (
    <motion.main
      className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      style={{ opacity: heroOpacity }}
    >
      {/* Background Elements - Only shown on desktop */}
      {isDesktop && (
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          {/* Skill Cards in middle layer */}
          <div className="absolute inset-0 z-10">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={index}
                {...category}
                index={index}
                mousePosition={mousePosition}
                onHoverChange={(isHovered) => {
                  if (isHovered) setIsNearCard(true);
                }}
              />
            ))}
          </div>

          {/* Frosted Glass overlay */}
          <div
            className="absolute inset-0 z-20 transition-all duration-300"
            style={{
              backdropFilter: `blur(${isNearCard ? 0 : 12}px)`,
              background: `radial-gradient(
                circle at ${mousePosition.x}px ${mousePosition.y}px,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, ${isNearCard ? 0.1 : 0.3}) 25%,
                rgba(255, 255, 255, ${isNearCard ? 0.2 : 0.7}) 100%
              )`,
            }}
          />
        </motion.div>
      )}

      {/* Mobile/Tablet Background Elements */}
      {!isDesktop && (
        <div className="absolute inset-0 z-0">
          {/* Subtle gradient orbs */}
          <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-indigo-100/30 blur-3xl translate-x-1/4" />
          <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-blue-100/20 blur-3xl -translate-x-1/4" />
          <div className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full bg-purple-100/25 blur-2xl" />

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at center, #6366F1 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
        </div>
      )}

      {/* Main content - Properly positioned for all devices */}
      <motion.div
        ref={heroContentRef}
        className="relative z-30 min-h-screen flex flex-col justify-center px-6 pt-20"
        style={{ y: heroY }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <RevealText delay={0.2}>
            <motion.div
              className="mb-6 px-6 py-3 rounded-full text-sm font-medium inline-block"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
              }}
            >
              <span className="relative z-10 font-medium text-gray-800">
                Full Stack Developer & AI Specialist
              </span>
            </motion.div>
          </RevealText>

          <RevealText delay={0.4}>
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 lg:mb-10 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="overflow-hidden pb-2">
                <motion.span
                  className="block text-gray-900 leading-[1.3]"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Crafting
                </motion.span>
              </div>
              <div className="overflow-hidden pb-4">
                <motion.span
                  className="block text-transparent bg-clip-text leading-[1.3]"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #6366F1 0%, #3B82F6 50%, #8B5CF6 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-shift 8s ease infinite',
                    paddingBottom: '0.2em'
                  }}
                >
                  Digital Excellence
                </motion.span>
              </div>
            </motion.h1>
          </RevealText>

          <RevealText delay={0.6}>
            <motion.p
              className="text-lg lg:text-xl text-gray-600 mb-10 lg:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Transforming ideas into exceptional digital experiences through
              innovative code and AI-driven solutions. Building tomorrow's web
              with precision and artistry.
            </motion.p>
          </RevealText>

          <RevealText delay={0.8}>
            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-5 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-lg overflow-hidden text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <div className="flex items-center gap-5 mt-6 sm:mt-0">
                {[
                  { icon: Github, href: "https://github.com/boga-venu", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/boga-venu-gopal", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:bogavenugopal96@gmail.com", label: "Email" }
                ].map((social) => (
                  <motion.div key={social.label} className="relative">
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-2 sm:p-3 text-gray-600 block"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="w-5 h-5 relative z-10" />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 -z-10"
                        initial={{ scale: 0.5 }}
                        whileHover={{ scale: 1 }}
                      />
                    </motion.a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </RevealText>
        </div>
      </motion.div>
    </motion.main>
  );
};

export default Hero;