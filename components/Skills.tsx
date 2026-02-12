
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';
import { Skill } from '../types';

const SkillBadge: React.FC<{ skill: Skill }> = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group/badge">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-default border
          flex items-center gap-2 relative z-10
          ${skill.isHighlight 
            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300 shadow-sm shadow-indigo-100 dark:shadow-none' 
            : 'bg-white border-gray-100 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:border-indigo-100 dark:hover:border-indigo-900 shadow-sm'}
        `}
      >
        {skill.isHighlight && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 dark:bg-indigo-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500 dark:bg-indigo-400"></span>
          </span>
        )}
        {skill.name}
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 8, scale: 0.9, rotateX: -15 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              duration: 0.2
            }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-[100] w-56 pointer-events-none"
            style={{ perspective: '1000px' }}
          >
            <div className={`
              relative p-4 rounded-2xl shadow-2xl border backdrop-blur-md
              ${isHovered ? 'block' : 'hidden'}
              bg-white/90 border-indigo-100 text-gray-800 
              dark:bg-gray-900/90 dark:border-indigo-900/50 dark:text-gray-100
            `}>
              {/* Tooltip Content */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-500 dark:text-indigo-400">
                  {skill.isHighlight ? 'Core Specialization' : 'Competency'}
                </span>
                <p className="text-xs leading-relaxed font-medium">
                  {skill.description}
                </p>
              </div>

              {/* Decorative Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                border-l-[8px] border-l-transparent 
                border-r-[8px] border-r-transparent 
                border-t-[8px] border-t-white/90 dark:border-t-gray-900/90
                drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 lg:px-24 bg-gray-50/50 dark:bg-gray-950/50 transition-colors duration-300 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2"
          >
            Stack & Tools
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
          >
            Technical Expertise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A curated selection of technologies I leverage to build production-grade AI systems. 
            <span className="block mt-2 text-sm font-medium text-indigo-500">Hover over any skill for details.</span>
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-400/5 transition-all group"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 group-hover:scale-150 transition-transform"></span>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map(skill => (
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
