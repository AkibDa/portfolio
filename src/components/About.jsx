import PropTypes from 'prop-types';
import { skills } from '../data/skills.js';

const aboutParagraphs = [
  `I am Sk Akib Ahammed, an aspiring AI Engineer who enjoys building intelligent applications and
  expressive web experiences. With a foundation in Python, Java, JavaScript, HTML, and CSS, I thrive
  when turning ideas into polished solutions.`,
  `My portfolio includes DietForge (AI diet planner), Resume Enhancer (smart resume optimizer),
  BudgetBuddy (AI-assisted finance tracker), Transport (Python booking system), Slot Machine
  (console game), Suggestify (Gemini-powered recommenders), Incepta (multimodal generator), and
  DiagnoWise (AI healthcare assistant).`,
  `I also maintain Python_Projects — a curated GitHub repository full of beginner-friendly
  experiments. Recent hackathon experience (top 10 finish) sharpened my collaboration and
  communication skills.`,
  `I’m eager to contribute to mission-driven teams, push the boundaries of ML/DL, and craft scalable,
  user-obsessed software.`,
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
        <h3>Bit about me!</h3>
        {aboutParagraphs.map((text) => (
          <p key={text.slice(0, 25)} className="about-text">
            {text}
          </p>
        ))}
        <div className="skills">
          <h3>My Skills</h3>
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

