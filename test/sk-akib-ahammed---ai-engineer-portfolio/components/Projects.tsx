
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 lg:px-24 bg-white dark:bg-gray-950 transition-colors duration-300 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Selected Projects</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl">
              Showcasing my work in multi-agent orchestration, computer vision, and AI-assisted cloud backends.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -12 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: idx * 0.1 
              }}
              className="flex flex-col p-8 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:bg-white dark:hover:bg-gray-800 group hover:shadow-2xl hover:shadow-indigo-100/60 dark:hover:shadow-indigo-900/20"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                <a 
                  href={project.link || "#"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow transition-all"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-3 mb-8">
                {project.achievements.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={16} className="text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full border border-indigo-50 dark:border-indigo-900/30 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
