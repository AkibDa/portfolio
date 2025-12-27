import React from 'react';
import { projects } from '../data/projects.jsx'; // Ensure you created this file!
import { ProjectCard } from './ProjectCard.jsx';

export const Projects = () => (
  <section id="projects" style={{ 
    padding: '6rem 20px', 
    background: '#0f172a' // Consistent dark theme
  }}>
    <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
      <p className="eyebrow" style={{ color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600', fontSize: '0.9rem' }}>
        Engineering Case Studies
      </p>
      <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', marginBottom: '1rem' }}>
        Selected Works
      </h2>
      <p className="subtitle" style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
        A deep dive into the systems I've architected. Focusing on <span style={{color: '#fff'}}>agentic workflows</span>, <span style={{color: '#fff'}}>inference optimization</span>, and <span style={{color: '#fff'}}>scalable backends</span>.
      </p>
    </div>

    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  </section>
);