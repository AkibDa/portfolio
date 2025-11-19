import { projects } from '../data/projects.js';
import { ProjectCard } from './ProjectCard.jsx';

export const Projects = () => (
  <section id="projects" className="projects" data-animate-on-scroll>
    <div className="section-header">
      <p className="eyebrow">Work</p>
      <h2>My Projects</h2>
      <p className="subtitle">
        A snapshot of intelligent products, research experiments, and full-stack apps I&apos;ve been
        shipping lately.
      </p>
    </div>
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  </section>
);

