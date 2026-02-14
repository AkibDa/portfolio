import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Linkedin, Github } from 'lucide-react';
import FloatingGeometry from './FloatingGeometry';
import { PERSONAL_INFO } from '../constants';

const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}`;

interface HeroProps {
  onEmailRedirect?: (e: React.MouseEvent) => void;
}

const Hero: React.FC<HeroProps> = ({ onEmailRedirect }) => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-6 lg:px-24 pt-20 pb-12 overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Left Column */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
        className="flex-1 z-10 space-y-6 max-w-2xl"
      >
        <div className="space-y-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-widest uppercase text-xs"
          >
            Available for Opportunities
          </motion.p>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
            I'm {PERSONAL_INFO.name.split(' ')[0]}{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              {PERSONAL_INFO.name.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-400">
            {PERSONAL_INFO.role}
          </h2>

          {/* Added Tagline */}
          <p className="text-sm md:text-base text-indigo-500 dark:text-indigo-300 font-medium">
            {PERSONAL_INFO.tagline}
          </p>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
          {PERSONAL_INFO.introduction}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href="#projects"
            aria-label="View Projects"
            className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20"
          >
            View Projects <ArrowRight size={20} />
          </a>

          <div className="flex items-center gap-3">
            {[
              { icon: Mail, href: gmailLink, label: "Email", isEmail: true },
              { icon: Github, href: PERSONAL_INFO.github, label: "GitHub", isEmail: false },
              { icon: Linkedin, href: PERSONAL_INFO.linkedin, label: "LinkedIn", isEmail: false }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.isEmail ? undefined : '_blank'}
                rel={link.isEmail ? undefined : 'noreferrer'}
                onClick={link.isEmail && onEmailRedirect ? (e) => { e.preventDefault(); onEmailRedirect(e); } : undefined}
                className="p-3 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all border border-gray-100 dark:border-gray-800 hover:border-indigo-100 dark:hover:border-indigo-900 cursor-pointer"
                aria-label={link.label}
              >
                <link.icon size={22} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Column */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex-1 w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing"
      >
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true }}
          frameloop="always"
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <spotLight position={[-10, 10, 10]} angle={0.2} penumbra={1} intensity={1} />

          <Suspense fallback={null}>
            <FloatingGeometry />
          </Suspense>

          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </motion.div>
    </section>
  );
};

export default Hero;
