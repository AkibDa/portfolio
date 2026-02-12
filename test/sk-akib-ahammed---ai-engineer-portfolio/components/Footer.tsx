
import React from 'react';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white py-20 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="space-y-6 max-w-md">
          <h2 className="text-3xl font-bold">{PERSONAL_INFO.name}</h2>
          <p className="text-gray-400 text-lg">
            Aspiring AI Engineer focused on building robust, scalable, and intelligent software for the future.
          </p>
          <div className="flex gap-4">
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-gray-400 hover:text-white">
              <Linkedin size={20} />
            </a>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-gray-400 hover:text-white">
              <Github size={20} />
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-gray-400 hover:text-white">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 md:gap-24">
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-500">Navigation</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#skills" className="text-gray-400 hover:text-white transition-colors">Skills</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-500">Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2">Resume <ExternalLink size={14} /></a></li>
              <li><a href={PERSONAL_INFO.linkedin} className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href={PERSONAL_INFO.github} className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/5 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved. Built with React & Three.js.
      </div>
    </footer>
  );
};

export default Footer;
