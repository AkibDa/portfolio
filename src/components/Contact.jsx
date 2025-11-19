import { useMemo, useState } from 'react';
import { socialLinks } from '../data/socialLinks.js';

const initialForm = {
  name: '',
  email: '',
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
    if (!formData.name.trim()) result.name = 'Your name is required.';
    if (!validateEmail(formData.email)) result.email = 'Please provide a valid email.';
    if (formData.message.trim().length < 10) result.message = 'Write at least 10 characters.';
    return result;
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length) {
      setFeedback('Please fix the highlighted fields before sending.');
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      setFeedback('');
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('message', formData.message);
      payload.append('_subject', 'New portfolio message!');
      payload.append('_captcha', 'false');
      payload.append('_honey', '');
      payload.append('_next', 'https://yourdomain.com/thank-you.html');

      const response = await fetch('https://formsubmit.co/ahammedskakib@gmail.com', {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormData(initialForm);
      setStatus('success');
      setFeedback('Message sent successfully — I will reply soon!');
    } catch (error) {
      setStatus('error');
      setFeedback(error.message || 'Something went wrong. Please retry.');
    }
  };

  return (
    <section id="contact" className="contact" data-animate-on-scroll>
      <div className="section-header">
        <p className="eyebrow">Let&apos;s collaborate</p>
        <h2>Contact Me</h2>
        <p className="subtitle">Ready to build something bold? Drop me a line.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info-card glass-card">
          <h3>Contact Information</h3>
          <p>Kolkata, India</p>
          <div className="contact-info-item">
            <i className="fas fa-envelope" aria-hidden="true" />
            <a href="mailto:ahammedskakib@gmail.com">ahammedskakib@gmail.com</a>
          </div>
          <div className="contact-info-item">
            <i className="fas fa-map-marker-alt" aria-hidden="true" />
            <p>Kolkata, India</p>
          </div>
          <ul className="social-links">
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

        <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="error-message">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error-message">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <span id="message-error" className="error-message">
                {errors.message}
              </span>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                <span>Send Message</span>
                <i className="fas fa-paper-plane" aria-hidden="true" />
              </>
            )}
          </button>

          {feedback && (
            <div className={`form-alert ${status === 'success' ? 'success' : 'error'}`}>
              {feedback}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

