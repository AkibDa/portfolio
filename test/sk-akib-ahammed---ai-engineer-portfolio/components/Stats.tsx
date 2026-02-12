
import React from 'react';
import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '../constants';

const Stats: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-950 py-16 px-6 lg:px-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {ACHIEVEMENTS.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center space-y-1"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400">
                {stat.value}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
