'use client'

import { motion } from 'framer-motion'
import { Code, Brain, Database, LineChart, Sparkles, Laptop } from 'lucide-react'

const skills = {
  'Frontend Development': {
    icon: <Code />,
    skills: ['Next.js', 'React', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'],
    color: 'blue'
  },
  'AI Integration': {
    icon: <Brain />,
    skills: ['AI-Assisted Development', 'Workflow Automation', 'Prompt Engineering'],
    color: 'purple'
  },
  'Backend Development': {
    icon: <Database />,
    skills: ['Node.js', 'Express', 'MongoDB', 'Firebase'],
    color: 'green'
  },
  'Analytics & Data': {
    icon: <LineChart />,
    skills: ['Power BI', 'SQL', 'Data Visualization', 'Performance Analytics'],
    color: 'orange'
  },
  'Performance': {
    icon: <Sparkles />,
    skills: ['Optimization', 'SEO', '95+ Lighthouse Score', 'Core Web Vitals'],
    color: 'yellow'
  },
  'Tools & Others': {
    icon: <Laptop />,
    skills: ['Git', 'CI/CD', 'Agile Methodology', 'Technical Writing'],
    color: 'red'
  }
}

const SkillCard = ({ title, skills, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center gap-2 text-gray-600"
          >
            <div className={`w-1.5 h-1.5 rounded-full ${colorClasses[color]}`} />
            {skill}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Combining modern web technologies with AI-enhanced development workflows
            to create exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([title, { skills, icon, color }]) => (
            <SkillCard
              key={title}
              title={title}
              skills={skills}
              icon={icon}
              color={color}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills