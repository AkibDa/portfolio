import { useMemo, useState } from 'react';
import { socialLinks } from '../data/socialLinks.js';

const initialForm = {
  name: '',
  email: '',
  subject: 'Hiring Inquiry', // Default subject
  message: '',
};

const validateEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim().toLowerCase());

export const Contact = () => {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const isSubmitting = status === 'loading';

  const errors = useMemo(() => {
    const result = {};
    if (!formData.name.trim()) result.name = 'Name is required.';
    if (!validateEmail(formData.email)) result.email = 'Valid email required.';
    if (formData.message.trim().length < 10) result.message = 'Message too short.';
    return result;
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length) {
      setFeedback('Invalid input parameters.');
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      setFeedback('');
      // Using FormSubmit.co
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('_subject', `PORTFOLIO: ${formData.subject} from ${formData.name}`);
      payload.append('message', formData.message);
      payload.append('_captcha', 'false');

      const response = await fetch('https://formsubmit.co/ahammedskakib@gmail.com', {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) throw new Error('Transmission failed');

      setFormData(initialForm);
      setStatus('success');
      setFeedback('Message transmitted successfully. Stand by for response.');
    } catch (error) {
      setStatus('error');
      setFeedback('Transmission error. Please check network.');
    }
  };

  return (
    <section id="contact" className="contact" data-animate-on-scroll>
      <div className="section-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', background: 'rgba(16, 185, 129, 0.1)', padding: '5px 12px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }}></span>
          <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '600', letterSpacing: '1px' }}>CHANNEL OPEN</span>
        </div>
        <h2>Initialize Connection</h2>
        <p className="subtitle">Ready to deploy AI agents? Let's discuss architecture.</p>
      </div>

      <div className="contact-grid">
        {/* Info Card */}
        <div className="contact-info-card glass-card">
          <h3>Comms Link</h3>
          <div className="contact-info-item">
            <i className="fas fa-envelope" style={{color: '#10b981'}} aria-hidden="true" />
            <a href="mailto:ahammedskakib@gmail.com">ahammedskakib@gmail.com</a>
          </div>
          <div className="contact-info-item">
            <i className="fas fa-map-marker-alt" style={{color: '#10b981'}} aria-hidden="true" />
            <p>Kolkata, India (Remote Ready)</p>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>Secure Channels:</p>
            <ul className="social-links" style={{ justifyContent: 'flex-start' }}>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span className={`fab ${link.icon}`} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The Form */}
        <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">User ID / Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Hiring Manager"
              style={{ fontFamily: 'monospace' }}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Return Address (Email)</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="recruiter@company.com"
              style={{ fontFamily: 'monospace' }}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* New Subject Field */}
          <div className="form-group">
            <label htmlFor="subject">Protocol (Subject)</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              style={{ 
                width: '100%', 
                padding: '1rem', 
                background: 'rgba(255,255,255,0.08)', 
                border: '1px solid rgba(255,255,255,0.2)', 
                borderRadius: '10px', 
                color: '#fff',
                fontFamily: 'monospace'
              }}
            >
              <option value="Hiring Inquiry">Hiring Inquiry</option>
              <option value="Freelance Project">Freelance Project</option>
              <option value="Collaboration">Collaboration</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Payload (Message)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe the mission parameters..."
              style={{ fontFamily: 'monospace' }}
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting} style={{ background: isSubmitting ? '#333' : '#10b981', color: isSubmitting ? '#fff' : '#000' }}>
            {isSubmitting ? (
              <>
                <i className="fas fa-cog fa-spin" aria-hidden="true" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Transmit Message</span>
                <i className="fas fa-terminal" aria-hidden="true" />
              </>
            )}
          </button>

          {feedback && (
            <div className={`form-alert ${status === 'success' ? 'success' : 'error'}`}>
              <span style={{ fontFamily: 'monospace' }}>{'>'} {feedback}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};