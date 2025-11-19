import { useMemo } from 'react';
import { useTypedText } from '../hooks/useTypedText.js';

const heroPhrases = ['Sk Akib Ahammed', 'an AI Engineer', 'a Full-stack Developer', 'a Problem Solver'];

const focusAreas = ['AI Products', 'Human-centered Design', 'Automation', 'Cloud-native Apps'];

const highlightBullets = [
  'Shipping ML-powered tools end-to-end, from data to delightful UX',
  'Strong collaboration mindset with hackathon wins + open-source track record',
  'Obsessed with measurable impact, accessibility, and clean architecture',
];

const metrics = [
  { value: '18+', label: 'Intelligent builds' },
  { value: '6', label: 'AI-powered apps in production' },
  { value: 'Top 10', label: 'Hackathon team finish' },
];

export const Hero = () => {
  const { text, isTyping } = useTypedText(heroPhrases);
  const ariaLabel = useMemo(
    () => `Hi, I'm ${text}${isTyping ? '' : ', ready for the next challenge.'}`,
    [text, isTyping],
  );

  return (
    <section id="home" className="hero" aria-label={ariaLabel} data-animate-on-scroll>
      <div className="hero-overlay" />
      <div className="hero-grid">
        <div className="hero-content glass-card">
          <p className="eyebrow">AI Engineer · Full-stack Developer</p>
          <h1 className="hero-title">
            <span className="hero-title-label">Hi, I'm</span>
            <span className="typed-wrapper">
              <span className="typed-text" aria-live="polite" aria-label={text || 'typing'}>
                {text || '\u00A0'}
              </span>
              <span className="cursor" aria-hidden="true">
                &nbsp;
              </span>
            </span>
          </h1>
          <p className="hero-description">
            I partner with teams to craft intelligent products that blend ML, automation, and polished
            product thinking. I thrive in zero-to-one problem spaces, translating ambiguity into
            measurable outcomes recruiters care about.
          </p>
          <div className="hero-pill-row">
            {focusAreas.map((area) => (
              <span key={area} className="hero-pill">
                <i className="fas fa-star" aria-hidden="true" />
                {area}
              </span>
            ))}
          </div>
          <div className="hero-metrics">
            {metrics.map((metric) => (
              <div key={metric.label} className="hero-metric glass-card">
                <span className="hero-metric-value">{metric.value}</span>
                <span className="hero-metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
          <div className="cta-buttons">
            <a className="btn btn-primary" href="#projects">
              View Case Studies
            </a>
            <a className="btn btn-outline" href="#contact">
              Book a Call
            </a>
          </div>
        </div>

        <aside className="hero-highlight glass-card" aria-label="Current focus and availability">
          <p className="hero-availability">
            Open to AI Engineer & Product-focused SWE roles
          </p>
          <h3>Currently crafting:</h3>
          <ul>
            {highlightBullets.map((item) => (
              <li key={item}>
                <i className="fas fa-check" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="hero-highlight-footer">
            <div>
              <p className="small-label">Let&apos;s collaborate</p>
              <a href="mailto:ahammedskakib@gmail.com">ahammedskakib@gmail.com</a>
            </div>
            <a className="btn btn-primary btn-small" style={{color: 'black'}} href="#projects">
              See Impact
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
};

