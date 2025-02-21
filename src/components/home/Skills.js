'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useTransform, useScroll } from 'framer-motion'
import { Code, Brain, Database, LineChart, Sparkles, Laptop, Server, Zap, Layout, GitBranch, ShieldCheck } from 'lucide-react'

// Refined skills data with specialized grouping
const skillsData = [
  {
    category: 'Core Development',
    description: 'Building the foundation of exceptional digital experiences',
    skills: [
      {
        name: 'Frontend',
        icon: <Code />,
        color: 'blue',
        expertise: 95,
        items: ['Next.js', 'React', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'HTML/CSS']
      },
      {
        name: 'Backend',
        icon: <Server />,
        color: 'green',
        expertise: 90,
        items: ['Node.js', 'Express', 'MongoDB', 'Firebase', 'REST APIs', 'GraphQL']
      }
    ]
  },
  {
    category: 'Specialized Expertise',
    description: 'Elevating applications with specialized technologies',
    skills: [
      {
        name: 'AI Integration',
        icon: <Brain />,
        color: 'purple',
        expertise: 88,
        items: ['AI-Assisted Development', 'LLM Integration', 'Workflow Automation', 'Prompt Engineering']
      },
      {
        name: 'Performance',
        icon: <Zap />,
        color: 'amber',
        expertise: 92,
        items: ['Web Optimization', 'Core Web Vitals', 'SEO', 'Lighthouse Optimization']
      }
    ]
  },
  {
    category: 'Supporting Capabilities',
    description: 'Strengthening applications with essential skills',
    skills: [
      {
        name: 'Analytics',
        icon: <LineChart />,
        color: 'orange',
        expertise: 85,
        items: ['Data Visualization', 'Performance Tracking', 'User Analytics', 'Conversion Optimization']
      },
      {
        name: 'DevOps',
        icon: <GitBranch />,
        color: 'red',
        expertise: 82,
        items: ['CI/CD Pipelines', 'Docker', 'Version Control', 'Deployment Automation']
      }
    ]
  },
  {
    category: 'Design & Security',
    description: 'Ensuring beautiful and secure digital experiences',
    skills: [
      {
        name: 'UI/UX',
        icon: <Layout />,
        color: 'indigo',
        expertise: 90,
        items: ['User Experience', 'Design Systems', 'Responsive Design', 'Animation Design']
      },
      {
        name: 'Security',
        icon: <ShieldCheck />,
        color: 'slate',
        expertise: 84,
        items: ['Authentication', 'Data Protection', 'OWASP Guidelines', 'Security Best Practices']
      }
    ]
  }
];

// Component for an elegant skill item with circular indicators
const SkillItem = ({ name, index, isVisible }) => {
  return (
    <motion.div
      className="flex items-center gap-2 mb-2"
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
      <span className="text-sm text-gray-700">{name}</span>
    </motion.div>
  );
};

// Enhanced skill block with subtle hover effects and cleaner visualization
const SkillBlock = ({ data, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Color mapping
  const colorMap = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-400', fill: 'rgba(59, 130, 246, 0.2)', stroke: 'rgba(59, 130, 246, 0.6)' },
    green: { bg: 'bg-green-50', text: 'text-green-600', ring: 'ring-green-400', fill: 'rgba(34, 197, 94, 0.2)', stroke: 'rgba(34, 197, 94, 0.6)' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', ring: 'ring-purple-400', fill: 'rgba(168, 85, 247, 0.2)', stroke: 'rgba(168, 85, 247, 0.6)' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-400', fill: 'rgba(245, 158, 11, 0.2)', stroke: 'rgba(245, 158, 11, 0.6)' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', ring: 'ring-orange-400', fill: 'rgba(249, 115, 22, 0.2)', stroke: 'rgba(249, 115, 22, 0.6)' },
    red: { bg: 'bg-red-50', text: 'text-red-600', ring: 'ring-red-400', fill: 'rgba(239, 68, 68, 0.2)', stroke: 'rgba(239, 68, 68, 0.6)' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-400', fill: 'rgba(99, 102, 241, 0.2)', stroke: 'rgba(99, 102, 241, 0.6)' },
    slate: { bg: 'bg-slate-50', text: 'text-slate-600', ring: 'ring-slate-400', fill: 'rgba(100, 116, 139, 0.2)', stroke: 'rgba(100, 116, 139, 0.6)' }
  };
  
  const colors = colorMap[data.color];
  
  return (
    <motion.div
      className={`relative p-6 rounded-xl backdrop-blur-sm border transition-all duration-300
        border-white/20 shadow-lg hover:shadow-xl
        ${isHovered ? 'bg-white/90' : 'bg-white/70'}
      `}
      style={{ 
        boxShadow: isHovered 
          ? `0 20px 30px -10px ${colors.fill}` 
          : '0 10px 30px -15px rgba(0, 0, 0, 0.1)'
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background orb */}
      <div
        className="absolute -z-10 top-0 right-0 rounded-full opacity-10 transition-opacity duration-300"
        style={{
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${colors.fill} 0%, transparent 70%)`,
          opacity: isHovered ? 0.2 : 0.1,
          transform: 'translate(30%, -30%)'
        }}
      />
      
      {/* Top section with skill name and expertise visualization */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-4">
          <div className={`relative p-2.5 rounded-lg ${colors.bg} ${colors.text}`}>
            {data.icon}
            
            {/* Animated ring - only shows on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className={`absolute inset-0 rounded-lg ring-2 ${colors.ring}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </AnimatePresence>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{data.name}</h3>
            <div className="flex items-center text-sm">
              <span className={`mr-1.5 ${colors.text} font-medium`}>{data.expertise}%</span>
              <span className="text-gray-400">expertise</span>
            </div>
          </div>
        </div>
        
        {/* Circular expertise indicator */}
        <div className="relative w-12 h-12">
          <svg width="48" height="48" viewBox="0 0 48 48" className="rotate-[-90deg]">
            {/* Background circle */}
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="4"
            />
            
            {/* Progress circle */}
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke={colors.stroke}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 20}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
              animate={{ 
                strokeDashoffset: isVisible 
                  ? 2 * Math.PI * 20 * (1 - data.expertise / 100) 
                  : 2 * Math.PI * 20 
              }}
              transition={{ duration: 1.5, delay: index * 0.2 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
            {data.icon}
          </div>
        </div>
      </div>
      
      {/* Skill items */}
      <div className="grid grid-cols-2 gap-x-2">
        {data.items.map((item, idx) => (
          <SkillItem 
            key={item} 
            name={item} 
            index={idx} 
            isVisible={isVisible} 
          />
        ))}
      </div>
    </motion.div>
  );
};

// Main Skills component with improved flow and layout
const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Background animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  return (
    <section id="skills" className="relative py-24 overflow-hidden" ref={sectionRef}>
      {/* Enhanced background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 right-0 w-[80%] h-[80%] rounded-full opacity-[0.07] blur-3xl"
          style={{ 
            background: "linear-gradient(120deg, #a5b4fc, #6366f1)",
            y: bgY
          }}
        />
        
        <motion.div
          className="absolute -bottom-1/2 -left-1/4 w-[80%] h-[80%] rounded-full opacity-[0.05] blur-3xl"
          style={{ 
            background: "linear-gradient(120deg, #c7d2fe, #818cf8)",
            y: useTransform(bgY, v => -v * 0.5)
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: "radial-gradient(#6366F1 0.8px, transparent 0.8px)",
            backgroundSize: "30px 30px"
          }}
        />
      </div>
      
      <div className="container mx-auto px-6">
        {/* Section header with animated underline */}
        <div className="text-center mb-16 relative">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6 inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Technical Expertise
            <motion.div
              className="absolute bottom-0 left-1/2 h-1 bg-indigo-500 rounded-full"
              initial={{ width: 0, x: '-50%' }}
              animate={isInView ? { width: '40%', x: '-50%' } : { width: 0, x: '-50%' }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Combining modern web technologies with AI-enhanced development workflows
            to create exceptional digital experiences.
          </motion.p>
        </div>
        
        {/* Skills groups in an elegant flowing layout */}
        <div className="max-w-6xl mx-auto">
          {skillsData.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              className="mb-16 last:mb-0"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            >
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + groupIndex * 0.1 }}
              >
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">{group.category}</h3>
                <p className="text-gray-600">{group.description}</p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {group.skills.map((skill, skillIndex) => (
                  <SkillBlock
                    key={skill.name}
                    data={skill}
                    index={skillIndex}
                    isVisible={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Floating skill badges */}
        <div className="mt-16 relative">
          <motion.div 
            className="absolute inset-0 -z-10"
            style={{
              background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.08) 0%, transparent 70%)'
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          />
          
          <motion.div
            className="flex flex-wrap justify-center gap-y-3 gap-x-4 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'TypeScript', 'MongoDB', 'GraphQL', 'AI Integration', 'RESTful APIs'].map((skill, index) => (
              <motion.div
                key={skill}
                className="px-4 py-1.5 bg-white backdrop-blur-sm rounded-full shadow-sm border border-indigo-100/40 text-gray-700 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.6 + (index * 0.05),
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{ 
                  y: -4, 
                  backgroundColor: 'rgba(79, 70, 229, 0.08)',
                  boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.15)'
                }}
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;