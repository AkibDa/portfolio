import PropTypes from 'prop-types';
import { skills } from '../data/skills.js';

const aboutParagraphs = [
  `I am an AI Engineer focused on Agentic Workflows and Scalable Inference. While my background is in Computer Science, my true passion lies in orchestrating LLMs to solve complex, non-deterministic problems rather than just building standard web apps.`,
  
  `My recent work pushes beyond basic chatbots. I've architected systems like CodeGenesis (a self-healing multi-agent dev environment) and Incepta (an asynchronous generative AI microservice). I specialize in turning experimental notebooks into reliable, containerized APIs that can handle real-world traffic.`,
  
  `I actively compete in hackathons (Top 10 finish) and contribute to the open-source agentic AI ecosystem. I value clean architecture, measurable latency reduction, and building systems that are not just "smart" but robust and maintainable.`,
  
  `Currently, I am looking for roles where I can deploy RAG pipelines, optimize inference infrastructure, and build the next generation of autonomous software agents.`,
];

const SkillBadge = ({ icon, label, prefix }) => (
  <li>
    <i className={`${prefix} ${icon}`} aria-hidden="true" />
    <span>{label}</span>
  </li>
);

SkillBadge.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  prefix: PropTypes.string,
};

SkillBadge.defaultProps = {
  prefix: 'fab',
};

export const About = () => (
  <section id="about" className="about" data-animate-on-scroll>
    <div className="section-header">
      <p className="eyebrow">Background</p>
      <h2>About Me</h2>
    </div>
    <div className="about-container">
      <div className="about-image" data-animate-on-scroll>
        <img
          src="/photos/ghibli.png"
          alt="Animated Ghibli-style illustration of Sk Akib Ahammed"
          className="profile-pic"
        />
      </div>
      <div className="about-details" data-animate-on-scroll>
        <h3>From Notebooks to Production</h3>
        {aboutParagraphs.map((text) => (
          <p key={text.slice(0, 25)} className="about-text">
            {text}
          </p>
        ))}
        <div className="skills">
          <h3>Technical Arsenal</h3>
          <ul className="skills-list">
            {skills.map((skill) => (
              <SkillBadge key={skill.label} {...skill} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);