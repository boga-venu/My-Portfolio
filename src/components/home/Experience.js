'use client'

import { motion } from 'framer-motion'
import { BriefcaseIcon, ChevronRight, Star } from 'lucide-react'

const experiences = [
  {
    title: 'Founder & Full Stack Developer',
    company: 'Minimal Edge Technologies',
    period: '2023 - Present',
    highlights: [
      'Designed and developed business websites using Next.js, React, and Tailwind CSS',
      'Implemented AI-driven automation reducing development time by 30%',
      'Achieved 95%+ Lighthouse scores for performance and SEO',
      'Built dynamic dashboards using Power BI and SQL',
      'Increased client organic traffic by 40% through SEO optimization'
    ],
    skills: ['Next.js', 'React', 'AI Integration', 'Power BI', 'SQL']
  },
  {
    title: 'Sr. Bench Sales Recruiter',
    company: 'VAK IT Systems',
    period: 'Sep 2020 - Mar 2023',
    highlights: [
      'Managed consultant placements, exceeding performance benchmarks',
      'Developed negotiation and client engagement skills',
      'Led market analysis initiatives'
    ],
    skills: ['Client Relations', 'Market Analysis', 'Team Leadership']
  },
  {
    title: 'Process Executive',
    company: 'Cognizant',
    period: 'June 2018 - Dec 2019',
    highlights: [
      'Ranked #1 in Digital Coding Competition among global Cognizant teams',
      'Led a sub-team and introduced process optimization improvements',
      'Enhanced team efficiency by 15% through process improvements'
    ],
    skills: ['Process Optimization', 'Team Leadership', 'Digital Innovation']
  }
]

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
          <BriefcaseIcon className="w-6 h-6 text-primary-600" />
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{experience.title}</h3>
              <p className="text-primary-600 font-medium">{experience.company}</p>
            </div>
            <span className="text-gray-500 text-sm">{experience.period}</span>
          </div>
          
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
                <ChevronRight className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {experience.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From process optimization to full-stack development, my career path reflects
            continuous growth and adaptation to new technologies.
          </p>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience