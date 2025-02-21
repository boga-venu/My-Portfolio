'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import { ChevronRight, ChevronLeft, ExternalLink, X, Layers, Sparkles, Zap, ArrowRight, Code, Globe, Clock } from 'lucide-react'

// Enhanced project data with hero section videos/animations
const projectsData = [
  {
    id: 'hendrix-pharma',
    title: 'Hendrix Pharmaceuticals',
    category: 'Enterprise Platform',
    description: 'A sophisticated digital ecosystem for a leading Indo-American pharmaceutical company, meticulously crafted to deliver exceptional UX across global markets.',
    image: '/projects/hendrix-pharma.jpg',
    heroVideo: '/videos/hendrix-hero.mp4',
    heroImage: '/projects/hendrix-work.png',
    logo: '/logos/hendrix-logo.png',
    link: 'https://hendrix-pharma.vercel.app/',
    year: '2023',
    color: '#0284c7', // Tailwind blue-600
    accent: '#bae6fd', // Tailwind blue-200
    lightAccent: '#e0f2fe', // Tailwind blue-100
    darkAccent: '#0369a1', // Tailwind blue-700
    techStack: {
      frontend: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Express', 'MongoDB'],
      devOps: ['AWS', 'Docker', 'CI/CD Pipeline']
    },
    technicalHighlights: [
      'Server-side rendering optimization delivering 95%+ Lighthouse scores',
      'Custom animation system for performance-focused micro-interactions',
      'Adaptive component architecture for seamless internationalization',
      'Advanced caching strategy reducing API calls by 70%'
    ],
    design: {
      approach: 'Minimal Elegance',
      typography: 'Custom type scale with Outfit & Inter typefaces',
      colorSystem: 'Monochromatic blue palette with strategic accent points'
    }
  },
  {
    id: 'law-firm',
    title: 'Modern Law Firm',
    category: 'Professional Services',
    description: 'A sophisticated digital platform showcasing legal expertise through refined aesthetics and thoughtful interactions that embody authority and accessibility.',
    image: '/projects/law-firm.jpg',
    heroVideo: '/videos/law-hero.mp4',
    heroImage: '/projects/lawfirm-work.png',
    logo: '/logos/law-firm-logo.svg',
    link: 'https://om-associates.vercel.app/',
    year: '2022',
    color: '#0284c7', // Use same color as first project
    accent: '#bae6fd',
    lightAccent: '#e0f2fe',
    darkAccent: '#0369a1',
    techStack: {
      frontend: ['React', 'Tailwind CSS', 'Framer Motion', 'React Router'],
      backend: ['Node.js', 'Express', 'PostgreSQL'],
      security: ['JWT Authentication', 'Role-based Access Control']
    },
    technicalHighlights: [
      'Custom animation system creating subtle, dignified transitions',
      'Advanced form validation with real-time error checking',
      'Context-based state management for complex navigation paths',
      'Performance-optimized image system with adaptive quality'
    ],
    design: {
      approach: 'Refined Authority',
      typography: 'Serif/sans-serif pairing with classical proportions',
      colorSystem: 'Deep indigo palette with gold accent elements'
    }
  },
  {
    id: 'minimal-edge',
    title: 'Minimal Edge Technologies',
    category: 'SaaS Business',
    description: 'A sophisticated SaaS platform showcasing cutting-edge development techniques and intelligent integration of AI capabilities with elegant design principles.',
    image: '/projects/minimal-edge.jpg',
    heroVideo: '/videos/minimal-edge-hero.mp4',
    heroImage: '/projects/minimal-edge-work.png',
    logo: '/logos/minimal-edge-logo.svg',
    link: 'https://www.minimaledgetech.com/',
    year: '2023',
    color: '#0284c7', // Use same color as first project
    accent: '#bae6fd',
    lightAccent: '#e0f2fe',
    darkAccent: '#0369a1',
    techStack: {
      frontend: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
      aiIntegration: ['OpenAI API', 'Langchain', 'Vector Embeddings'],
      performance: ['Edge Functions', 'Incremental Static Regeneration']
    },
    technicalHighlights: [
      'AI-driven component system with dynamic content adaptation',
      'Advanced animation orchestration using cubicBezier timing functions',
      'Server-side rendering with strategic client hydration',
      'Intelligent caching architecture with 95% cache hit rate'
    ],
    design: {
      approach: 'Minimal Sophistication',
      typography: 'Geometric sans with precise modular scale',
      colorSystem: 'Cyan foundation with monochromatic depth variations'
    }
  },
  {
    id: 'shawn-global',
    title: 'Shawn Global Solutions',
    category: 'Corporate Identity',
    description: 'A meticulously crafted corporate platform showcasing technical excellence through modular architecture and performance-first development philosophy.',
    image: '/projects/shawn-global.jpg',
    heroVideo: '/videos/shawn-hero.mp4',
    heroImage: '/projects/shawn-work.png',
    logo: '/logos/shawn-logo.svg',
    link: 'https://www.shawnglobalsolutions.com/',
    year: '2022',
    color: '#0284c7', // Use same color as first project
    accent: '#bae6fd',
    lightAccent: '#e0f2fe',
    darkAccent: '#0369a1',
    techStack: {
      frontend: ['React', 'Tailwind CSS', 'Framer Motion', 'Context API'],
      performance: ['Code Splitting', 'Lazy Loading', 'Asset Optimization'],
      architecture: ['Atomic Design', 'Custom Hooks', 'Render Optimization']
    },
    technicalHighlights: [
      'Achievement of 100/100 Lighthouse performance score through advanced optimizations',
      'Modular component architecture with 15+ reusable pattern components',
      'Custom animation library using GSAP for silky-smooth transitions',
      '50ms page transitions through strategic bundle splitting'
    ],
    design: {
      approach: 'Technical Elegance',
      typography: 'Geometric sans-serif with precise proportional metrics',
      colorSystem: 'Emerald foundation with strategic accent applications'
    }
  },
  {
    id: 'dental-clinic',
    title: 'Oravive Dental',
    category: 'Healthcare',
    description: 'A HIPAA-compliant healthcare platform showcasing technical sophistication through secure architecture and thoughtful user experience design.',
    image: '/projects/dental-clinic.jpg',
    heroVideo: '/videos/dental-hero.mp4',
    heroImage: '/projects/oravive-work.jpg',
    logo: '/logos/dental-logo.svg',
    link: 'https://oravive-dental-solutions.vercel.app/',
    year: '2021',
    color: '#0284c7', // Use same color as first project
    accent: '#bae6fd',
    lightAccent: '#e0f2fe',
    darkAccent: '#0369a1',
    techStack: {
      frontend: ['React', 'Material UI', 'Framer Motion', 'React Router', 'Axios'],
      backend: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT'],
      security: ['HIPAA Compliance', 'Data Encryption', 'Secure Authentication']
    },
    technicalHighlights: [
      'Comprehensive component architecture with atomic design principles',
      'Real-time form validation with accessibility-focused error handling',
      'Advanced role-based access control system with least-privilege design',
      'Optimized REST API with thoughtful caching strategy'
    ],
    design: {
      approach: 'Trustworthy Precision',
      typography: 'Humanist sans-serif encouraging readability and comfort',
      colorSystem: 'Calming violet palette with strategic functional accents'
    }
  }
];

// Magnetic animation for project cards on desktop
const useMagneticEffect = (ref, strength = 25) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile || !ref.current) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const moveX = (clientX - centerX) / strength;
      const moveY = (clientY - centerY) / strength;

      setPosition({ x: moveX, y: moveY });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    ref.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (ref.current) {
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile, ref, strength]);

  return position;
};

// Tech stack badge component
const TechBadge = ({ tech, color, lightColor }) => (
  <div
    className="px-3 py-1 rounded-full text-xs font-medium"
    style={{
      backgroundColor: lightColor,
      color: color
    }}
  >
    {tech}
  </div>
);

// Featured project component with auto-play when in view
const FeaturedProject = ({ project }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.6 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Auto-play video when in view
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isInView) {
      videoElement.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(error => {
        console.error("Video play failed:", error);
        setIsVideoPlaying(false);
      });
    } else {
      videoElement.pause();
      setIsVideoPlaying(false);
    }

    return () => {
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    };
  }, [isInView, project.id]);

  // Handle video playback on hover (backup in case autoplay fails)
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || isVideoPlaying) return;

    if (isHovered) {
      videoElement.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(error => {
        console.error("Video play failed:", error);
        setIsVideoPlaying(false);
      });
    }
  }, [isHovered, isVideoPlaying]);

  // Handle video loading
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
    };

    videoElement.addEventListener('canplay', handleCanPlay);

    // Check if already loaded
    if (videoElement.readyState >= 3) {
      setIsVideoLoaded(true);
    }

    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }} // Faster fade-in
          className="lg:grid lg:grid-cols-5 gap-12 items-center"
        >
          {/* Project Details - Left Column */}
          <motion.div
            className="col-span-2 relative z-10 px-6 py-12 lg:py-0"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }} // Faster animation
          >
            <div className="max-w-md mx-auto lg:mx-0">
              {/* Project header */}
              <div className="mb-8">
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.15 }} // Faster animation
                >
                  <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: project.color }}>
                    Featured Project
                  </h3>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {project.title}
                  </h2>
                </motion.div>

                <motion.p
                  className="text-lg text-gray-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 }} // Faster animation
                >
                  {project.description}
                </motion.p>
              </div>

              {/* Technical Highlights */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.25 }} // Faster animation
              >
                <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-4">
                  Technical Craftsmanship
                </h4>

                <div className="space-y-3">
                  {project.technicalHighlights.slice(0, 2).map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.25, delay: 0.25 + (idx * 0.05) }} // Faster animation
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: project.lightAccent }}
                        >
                          <Sparkles className="w-3 h-3" style={{ color: project.color }} />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {highlight}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Tech Stack Preview */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 }} // Faster animation
              >
                <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-4">
                  Technology Stack
                </h4>

                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(project.techStack).flatMap(([category, techs]) =>
                    techs.map((tech, idx) => (
                      <TechBadge
                        key={`${category}-${idx}`}
                        tech={tech}
                        color={project.color}
                        lightColor={project.lightAccent}
                      />
                    ))
                  )}
                </div>
              </motion.div>

              {/* Visit site indicator */}
              <motion.div
                className="inline-flex items-center gap-2 mt-8 text-primary-600"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.35 }} // Faster animation
                style={{ color: project.color }}
              >
                <span className="font-medium">Visit Live Project</span>
                <ExternalLink className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Preview - Right Column */}
          <div className="col-span-3 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }} // Faster animation
              className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Hero section with better aspect ratio management */}
              <div className="absolute inset-0 bg-gray-900">
                {/* Base background image - lowest layer */}
                <img
                  src={project.heroImage || project.image}
                  alt={`${project.title} background`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    zIndex: 1,
                    transition: "opacity 500ms ease",
                    opacity: isVideoPlaying ? 0 : 1,
                  }}
                />

                {/* Video layer - middle layer */}
                {project.heroVideo && (
                  <video
                    ref={videoRef}
                    src={project.heroVideo}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      zIndex: 2,
                      transition: "opacity 500ms ease",
                      opacity: isVideoPlaying ? 1 : 0,
                    }}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                  />
                )}
              </div>

              {/* Design approach overlay - only visible when video is not playing */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-8 z-30 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-500"
                style={{
                  opacity: isVideoPlaying ? 0 : 1
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: isVideoPlaying ? 0 : 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex flex-col gap-4">
                  <h4 className="text-white/80 text-sm font-medium">Design Approach</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-white text-xl font-semibold">{project.design.approach}</p>
                    <div
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${project.color}40`,
                        color: '#fff'
                      }}
                    >
                      {project.design.typography.split(' ')[0]}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating design elements */}
            <motion.div
              className="absolute -right-20 -top-20 w-40 h-40 rounded-full opacity-30 blur-3xl z-0"
              style={{ backgroundColor: project.color }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full opacity-20 blur-3xl z-0"
              style={{ backgroundColor: project.accent }}
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
};

// Horizontal scrolling project gallery with auto-scrolling behavior
const HorizontalGallery = ({ projects, onSelect, currentFeatured }) => {
  const galleryRef = useRef(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const { scrollXProgress } = useScroll({
    container: galleryRef
  });

  // Custom cursor for gallery
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  const [isMobile, setIsMobile] = useState(true);
  const cursorSpring = useSpring({
    x: cursorPosition.x,
    y: cursorPosition.y,
    config: { damping: 25, stiffness: 350 }
  });

  // Refs for videos
  const videoRefs = useRef(new Map());

  // Check if mobile
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Auto-scroll gallery for demonstration
  useEffect(() => {
    if (!galleryRef.current || !autoScrollEnabled || isHovering) return;

    const gallery = galleryRef.current;
    const autoScroll = () => {
      if (!gallery || !autoScrollEnabled || isHovering) return;

      // Scroll 400px to the right (roughly one card width) over 1.5 seconds
      const scrollStart = gallery.scrollLeft;
      const scrollTarget = scrollStart + 400;
      const startTime = Date.now();
      const duration = 1500;

      const scrollStep = () => {
        if (!gallery || !autoScrollEnabled || isHovering) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Smooth ease in-out

        gallery.scrollLeft = scrollStart + (easeProgress * 400);

        if (progress < 1) {
          requestAnimationFrame(scrollStep);
        } else {
          // Reset to beginning if we're near the end
          if (gallery.scrollLeft > gallery.scrollWidth - gallery.clientWidth - 100) {
            gallery.scrollLeft = 0;
          }
        }
      };

      requestAnimationFrame(scrollStep);
    };

    // Start auto-scrolling after a delay
    const timer = setTimeout(() => {
      autoScroll();
    }, 2000); // 2 second delay before first scroll

    // Set interval for continued scrolling
    const interval = setInterval(() => {
      if (!isHovering) {
        autoScroll();
      }
    }, 6000); // 6 seconds between scrolls

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [autoScrollEnabled, isHovering]);

  // Handle cursor updates
  useEffect(() => {
    if (isMobile || !galleryRef.current) return;

    const handleMouseMove = (e) => {
      const rect = galleryRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX,
        y: e.clientY - rect.top
      });
    };

    const handleMouseEnter = () => {
      setIsCursorVisible(true);
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsCursorVisible(false);
      setIsHovering(false);
    };

    galleryRef.current.addEventListener('mousemove', handleMouseMove);
    galleryRef.current.addEventListener('mouseenter', handleMouseEnter);
    galleryRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (galleryRef.current) {
        galleryRef.current.removeEventListener('mousemove', handleMouseMove);
        galleryRef.current.removeEventListener('mouseenter', handleMouseEnter);
        galleryRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile]);

  // Handle video interactions
  const handleCardHover = (projectId, isHovering) => {
    const videoElement = videoRefs.current.get(projectId);
    if (!videoElement) return;

    if (isHovering) {
      videoElement.play().catch(e => console.log("Video play prevented:", e));
    } else {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  };

  // Progress indicator
  const progressWidth = useTransform(scrollXProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="relative">
      {/* Custom cursor for desktop */}
      {!isMobile && isCursorVisible && (
        <motion.div
          className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
          style={{
            x: cursorSpring.x,
            y: cursorSpring.y,
            translateX: '-50%',
            translateY: '-50%'
          }}
        >
          <motion.div
            className={`w-12 h-12 flex items-center justify-center rounded-full bg-white text-black`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {cursorType === 'scroll' && <ArrowRight className="w-5 h-5" />}
            {cursorType === 'view' && <ChevronRight className="w-5 h-5" />}
          </motion.div>
        </motion.div>
      )}

      {/* Mobile swipe indicator */}
      {isMobile && (
        <div className="flex justify-center mb-4">
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-200/50 rounded-full text-xs text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, times: [0, 0.2, 1], repeat: 2, delay: 2 }}
          >
            <ChevronLeft className="w-3 h-3" />
            <span>Swipe for more projects</span>
            <ChevronRight className="w-3 h-3" />
          </motion.div>
        </div>
      )}

      {/* Gallery container */}
      <div
        ref={galleryRef}
        className="overflow-x-auto hide-scrollbar py-12"
        onMouseMove={(e) => {
          if (!galleryRef.current) return;
          const rect = galleryRef.current.getBoundingClientRect();
          const widthPercentage = (e.clientX - rect.left) / rect.width;
          setCursorType(widthPercentage > 0.9 || widthPercentage < 0.1 ? 'scroll' : 'view');
        }}
        onTouchStart={() => setAutoScrollEnabled(false)} // Disable auto-scroll when user interacts
      >
        <div className="min-w-max flex gap-8 px-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`w-[300px] md:w-[400px] flex-shrink-0 ${project.id === currentFeatured ? 'opacity-50' : ''
                }`}
              onMouseEnter={() => {
                setCursorType('view');
                handleCardHover(project.id, true);
              }}
              onMouseLeave={() => handleCardHover(project.id, false)}
              onClick={() => project.id !== currentFeatured && onSelect(project)}
            >
              <motion.div
                className="group relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              >
                <div className="absolute inset-0 bg-gray-900">
                  {/* Base image */}
                  <img
                    src={project.heroImage || project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      zIndex: 1,
                      transition: "transform 700ms ease",
                      transform: "scale(1.0)"
                    }}
                  />

                  {/* Video layer */}
                  {project.heroVideo && (
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current.set(project.id, el);
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        zIndex: 2,
                        opacity: 0, // Start hidden
                        transition: 'opacity 500ms ease'
                      }}
                      src={project.heroVideo}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                    />
                  )}

                  {/* Dark overlay for title visibility - always present */}
                  <div
                    className="absolute inset-0"
                    style={{
                      zIndex: 3,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)'
                    }}
                  />
                </div>

                {/* Project info layer */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                  

                  <div>
                    <div className="overflow-hidden">
                      <h3 className="text-xl font-bold mb-1 drop-shadow-lg">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-white/80 text-sm drop-shadow-lg">{project.category}</p>
                  </div>
                </div>

                {/* Add indicator if this is currently featured */}
                {project.id === currentFeatured && (
                  <div className="absolute top-2 right-2 z-30 px-2 py-1 bg-white/80 rounded-md text-xs font-medium">
                    Currently Featured
                  </div>
                )}
              </motion.div>

            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-5xl mx-auto h-0.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
        <motion.div
          className="h-full bg-gray-400 rounded-full"
          style={{ width: progressWidth }}
        />
      </div>
    </div>
  );
}

// Main Projects Component with featured project swapping
const Projects = () => {
  const [featuredProject, setFeaturedProject] = useState(projectsData[0]);
  const sectionRef = useRef(null);
  const featuredRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Handle gallery project selection
  const handleProjectSelect = (project) => {
    setFeaturedProject(project);

    // Scroll to featured project
    if (featuredRef.current) {
      featuredRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gray-50"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-0 -right-64 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-blue-50 to-indigo-50 opacity-60 blur-3xl"
          style={{ y: bgY }}
        />

        <motion.div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-t from-purple-50 to-indigo-50 opacity-70 blur-3xl"
          style={{ y: useTransform(bgY, v => -v * 0.5) }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 80%),
              radial-gradient(circle at 80% 70%, rgba(79, 70, 229, 0.1) 0%, transparent 80%)
            `
          }}
        />

        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(#6366F1 0.5px, transparent 0.5px)`,
            backgroundSize: '30px 30px',
            opacity: opacity
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }} // Faster animation
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.05 }} // Faster animation
          >
            Crafted with Precision
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }} // Faster animation
          >
            Showcasing technical excellence and design sophistication
            across diverse industries
          </motion.p>
        </motion.div>

        {/* Featured project with ref for scrolling */}
        <div ref={featuredRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }} // Faster animation
            className="mb-20"
          >
            <FeaturedProject project={featuredProject} />
          </motion.div>
        </div>

        {/* Horizontal gallery with modified onClick */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }} // Faster animation
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <motion.h3
              className="text-2xl font-bold text-gray-900"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.25 }} // Faster animation
            >
              Project Gallery
            </motion.h3>
          </div>

          <HorizontalGallery
            projects={projectsData}
            onSelect={handleProjectSelect}
            currentFeatured={featuredProject.id}
          />
        </motion.div>
      </div>
    </section>
  );
};



export default Projects;