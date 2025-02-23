'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { BriefcaseIcon, ChevronRight, Star, Calendar, MapPin, ExternalLink, Award } from 'lucide-react'
import { useRef, useState } from 'react'

const experiences = [
  {
    title: 'Founder & Full Stack Developer',
    company: 'Minimal Edge Technologies',
    logo: '/logos/minimal-edge-logo.png', // You'll need to add these logo files
    location: 'Remote',
    period: '2023 - Present',
    duration: 'Current',
    highlights: [
      'Designed and developed business websites using Next.js, React, and Tailwind CSS',
      'Implemented AI-driven automation reducing development time by 30%',
      'Achieved 95%+ Lighthouse scores for performance and SEO',
      'Built dynamic dashboards using Power BI and SQL',
      'Increased client organic traffic by 40% through SEO optimization'
    ],
    skills: ['Next.js', 'React', 'AI Integration', 'Power BI', 'SQL'],
    achievement: {
      metric: '40%',
      description: 'Average increase in client traffic'
    }
  },
  {
    title: 'Sr. Bench Sales Recruiter',
    company: 'VAK IT Systems',
    logo: '/logos/vak-logo.png',
    location: 'Hyderabad',
    period: 'Sep 2020 - Mar 2023',
    duration: '2.5 years',
    highlights: [
      'Managed consultant placements, exceeding performance benchmarks',
      'Developed negotiation and client engagement skills',
      'Led market analysis initiatives'
    ],
    skills: ['Client Relations', 'Market Analysis', 'Team Leadership'],
    achievement: {
      metric: '25%',
      description: 'Above target performance'
    }
  },
  {
    title: 'Process Executive',
    company: 'Cognizant',
    logo: '/logos/cognizant-logo.png',
    location: 'Hyderabad',
    period: 'June 2018 - Dec 2019',
    duration: '1.5 years',
    highlights: [
      'Ranked #1 in Digital Coding Competition among global Cognizant teams',
      'Led a sub-team and introduced process optimization improvements',
      'Enhanced team efficiency by 15% through process improvements'
    ],
    skills: ['Process Optimization', 'Team Leadership', 'Digital Innovation'],
    achievement: {
      metric: '15%',
      description: 'Efficiency improvement'
    }
  }
];

const ExperienceCard = ({ experience, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        {/* Use logo instead of icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center overflow-hidden">
          {experience.logo ? (
            <img
              src={experience.logo}
              alt={`${experience.company} logo`}
              className="w-8 h-8 object-contain"
            />
          ) : (
            <BriefcaseIcon className="w-6 h-6 text-indigo-600" />
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{experience.title}</h3>
              <p className="text-indigo-600 font-medium">{experience.company}</p>
            </div>
            <span className="text-gray-500 text-sm">{experience.period}</span>
          </div>
          
          {/* Location and duration details */}
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1 mb-3">
            <div className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              <span>{experience.location}</span>
            </div>
          </div>
          
          {/* Key Achievement */}
          {experience.achievement && (
            <motion.div 
              className="mb-4 bg-indigo-50/50 rounded-lg p-3 border-l-4 border-indigo-500"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <div>
                  <span className="text-xl font-bold text-indigo-600">{experience.achievement.metric}</span>
                  <span className="text-sm text-gray-600 ml-1">{experience.achievement.description}</span>
                </div>
              </div>
            </motion.div>
          )}
          
          <ul className="mt-4 space-y-2">
            {experience.highlights.map((highlight, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index * 0.1) + (i * 0.1) }}
                className="flex items-start gap-2 text-gray-600"
              >
                <ChevronRight className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {experience.skills.map((skill, i) => (
              <motion.span
                key={i}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + (i * 0.05) }}
                whileHover={{ 
                  backgroundColor: isHovered ? '#EEF2FF' : '', 
                  color: isHovered ? '#4F46E5' : '' 
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const TimelineDot = ({ active }) => (
  <motion.div 
    className={`w-4 h-4 rounded-full border-2 ${active ? 'bg-indigo-500 border-indigo-300' : 'bg-white border-gray-300'}`}
    animate={{ 
      scale: active ? [1, 1.2, 1] : 1,
      boxShadow: active ? '0 0 0 4px rgba(99, 102, 241, 0.2)' : 'none'
    }}
    transition={{ duration: 1, repeat: active ? Infinity : 0, repeatType: 'loop' }}
  />
)

const Timeline = ({ experiences, activeIndex }) => {
  return (
    <div className="hidden md:block absolute left-24 top-40 bottom-40 w-px bg-gray-200">
      <div className="relative h-full">
        {experiences.map((_, index) => (
          <div 
            key={index}
            className="absolute"
            style={{ top: `${(index / (experiences.length - 1)) * 100}%`, left: '-8px' }}
          >
            <TimelineDot active={activeIndex === index} />
          </div>
        ))}
        <motion.div 
          className="absolute left-0 w-px bg-indigo-500"
          style={{ 
            height: activeIndex === 0 ? '0%' : `${(activeIndex / (experiences.length - 1)) * 100}%`,
            top: 0
          }}
          animate={{ 
            height: `${(activeIndex / (experiences.length - 1)) * 100}%` 
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}

const Experience = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Use scroll position to determine active card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // When user scrolls, calculate which card should be active based on scroll position
  scrollYProgress.onChange(progress => {
    if (progress < 0.3) {
      setActiveIndex(0);
    } else if (progress < 0.6) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });
  
  // Add a subtle parallax effect to the cards
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  return (
    <section id="experience" className="relative py-20 bg-gray-50" ref={containerRef}>
      {/* Background elements for visual interest */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-100/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-100/30 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-block mb-2 px-4 py-1 bg-indigo-50 rounded-full text-indigo-600 text-sm font-medium"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            My Journey
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From process optimization to full-stack development, my career path reflects
            continuous growth and adaptation to new technologies.
          </p>
        </motion.div>

        <div className="relative">
          {/* Interactive timeline on the left for larger screens */}
          <Timeline experiences={experiences} activeIndex={activeIndex} />
          
          {/* Experience cards */}
          <div className="space-y-8 md:ml-36">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                style={{ y: index === activeIndex ? 0 : yOffset }}
              >
                <ExperienceCard 
                  experience={experience} 
                  index={index} 
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Resume download button */}
        <motion.div 
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="/resume.pdf" // Add your resume file
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-indigo-200 rounded-full text-indigo-600 font-medium shadow-sm hover:shadow-md transition-all hover:bg-indigo-50"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Download Full Resume</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
