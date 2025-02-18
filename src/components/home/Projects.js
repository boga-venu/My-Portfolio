'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Minimal Edge Technologies',
    description: 'AI-assisted SaaS business platform showcasing modern web development capabilities and business solutions.',
    image: '/projects/minimal-edge.jpg',
    link: 'https://www.minimaledgetech.com',
    github: 'https://github.com/boga-venu',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'AI Integration'],
    highlights: [
      'Implemented AI-driven automation for improved development efficiency',
      'Achieved 95%+ Lighthouse scores for performance and SEO',
      'Seamless responsive design with modern animations'
    ]
  },
  {
    id: 2,
    title: 'Hendrix Pharma Platform',
    description: 'Pharmaceutical service platform built with modern web technologies and real-time data processing capabilities.',
    image: '/projects/hendrix-pharma.jpg',
    link: '#',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    highlights: [
      'Real-time data processing and visualization',
      'Secure authentication and authorization',
      'Responsive dashboard with interactive charts'
    ]
  },
  // Add more projects here
]

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      onClick={() => onClick(project)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image || '/api/placeholder/600/400'}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
          <div className="flex gap-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" 
                 className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                 className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
          <img
            src={project.image || '/api/placeholder/800/400'}
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <p className="text-gray-600 mb-6">{project.description}</p>
          
          <h3 className="font-bold text-lg mb-3">Key Highlights</h3>
          <ul className="list-disc list-inside mb-6 text-gray-600">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="mb-2">{highlight}</li>
            ))}
          </ul>
          
          <div className="flex justify-end gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Github className="w-5 h-5" />
                View Code
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Visit Site
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Showcasing my expertise in building modern web applications with AI integration
            and optimal performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  )
}

export default Projects