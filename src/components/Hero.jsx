import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Ensure you have these icons imported. If 'lucide-react' gives an error, 
// you can remove this line and the <Cpu /> / <Terminal /> components below.
import { Terminal, Cpu, Zap, Activity } from 'lucide-react';

const Hero = () => {
  // Initialize with the first line
  const [lines, setLines] = useState([
    { text: "> init_sequence --user='Sk Akib'", type: "command" }
  ]);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    // 1. RESET state on every mount (fixes duplication & blank screen)
    setLines([{ text: "> init_sequence --user='Sk Akib'", type: "command" }]);
    setBootComplete(false);

    // 2. Define the script sequence
    const sequence = [
      { text: "Loading Core Modules...", type: "log", delay: 400 },
      { text: "Importing LangGraph Orchestration... [OK]", type: "success", delay: 800 },
      { text: "Connecting to Pinecone Vector DB... [OK]", type: "success", delay: 1400 },
      { text: "Optimizing Inference Latency... 25% Reduction", type: "warning", delay: 2200 },
      { text: "Initializing Multi-Agent Workflow... [READY]", type: "success", delay: 3000 },
      { text: "> System Online. Welcome, Recruiter.", type: "command", delay: 3800 }
    ];

    let timeouts = [];

    // 3. Schedule the lines
    sequence.forEach(({ text, type, delay }, index) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, { text, type }]);
        if (index === sequence.length - 1) setBootComplete(true);
      }, delay);
      timeouts.push(timeout);
    });

    // 4. Cleanup timeouts if the user leaves the page
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // --- STYLES (Unchanged) ---
  const styles = {
    section: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
      background: '#0f172a', // Slate-950
      overflow: 'hidden'
    },
    container: {
      maxWidth: '1200px',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    },
    flexWrap: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 16px',
      borderRadius: '20px',
      background: 'rgba(34, 197, 94, 0.1)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      color: '#4ade80',
      fontSize: '0.85rem',
      marginBottom: '1.5rem',
      fontWeight: '600',
      fontFamily: 'monospace'
    },
    h1: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: '800',
      lineHeight: '1.1',
      color: '#fff',
      marginBottom: '1.5rem',
      textAlign: 'left'
    },
    gradientText: {
      background: 'linear-gradient(90deg, #4ade80, #38bdf8)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    p: {
      fontSize: '1.1rem',
      color: '#94a3b8',
      marginBottom: '2rem',
      lineHeight: '1.6',
      maxWidth: '550px'
    },
    terminalWindow: {
      background: '#1e293b',
      borderRadius: '12px',
      border: '1px solid #334155',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      overflow: 'hidden',
      fontFamily: '"Fira Code", monospace',
      width: '100%',
      maxWidth: '600px'
    },
    terminalHeader: {
      background: '#0f172a',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      borderBottom: '1px solid #334155'
    },
    dot: { width: '12px', height: '12px', borderRadius: '50%' },
    terminalBody: {
      padding: '20px',
      minHeight: '350px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      color: '#e2e8f0',
      fontSize: '0.9rem',
      lineHeight: '1.5'
    }
  };

  return (
    <section id="home" style={styles.section}>
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: 'rgba(110, 72, 170, 0.2)', borderRadius: '50%', filter: 'blur(100px)' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', background: 'rgba(56, 189, 248, 0.15)', borderRadius: '50%', filter: 'blur(100px)' }} />

      <div style={window.innerWidth > 900 ? styles.container : {...styles.container, ...styles.flexWrap}}>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: window.innerWidth > 900 ? 'left' : 'center', maxWidth: '600px' }}
        >
          <div style={styles.badge}>
            <span style={{ display: 'block', width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }}></span>
            SYSTEM ONLINE
          </div>

          <h1 style={styles.h1}>
            Building <span style={styles.gradientText}>Scalable AI</span> Agents
          </h1>
          
          <p style={styles.p}>
            I don't just run models. I build the production-grade infrastructure that makes AI reliable, scalable, and impactful using <strong>LangGraph</strong>, <strong>Docker</strong>, and <strong>FastAPI</strong>.
          </p>

          <div className="cta-buttons" style={{ justifyContent: window.innerWidth > 900 ? 'flex-start' : 'center' }}>
            <a href="#projects" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} /> View Architecture
            </a>
            <a href="#contact" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={18} /> Init_Chat()
            </a>
          </div>

          <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', gap: '20px', color: '#64748b', fontSize: '0.85rem', fontFamily: 'monospace', justifyContent: window.innerWidth > 900 ? 'flex-start' : 'center' }}>
             <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={16} /> LOW LATENCY</span>
             <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Activity size={16} /> HIGH AVAILABILITY</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <div style={styles.terminalWindow}>
            <div style={styles.terminalHeader}>
              <div style={{...styles.dot, background: '#ef4444'}}></div>
              <div style={{...styles.dot, background: '#f59e0b'}}></div>
              <div style={{...styles.dot, background: '#22c55e'}}></div>
              <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#64748b', opacity: 0.6 }}>bash — 80x24</span>
            </div>

            <div style={styles.terminalBody}>
              {lines.map((line, i) => (
                <div key={i} style={{ marginBottom: '6px', fontFamily: 'monospace' }}>
                  <span style={{ 
                    color: line.type === 'command' ? '#60a5fa' : 
                           line.type === 'success' ? '#4ade80' : 
                           line.type === 'warning' ? '#fbbf24' : '#94a3b8',
                    fontWeight: line.type === 'command' ? 'bold' : 'normal'
                  }}>
                    {line.text}
                  </span>
                </div>
              ))}
              {!bootComplete && (
                <div style={{ width: '10px', height: '18px', background: '#4ade80', marginTop: '4px', animation: 'blink 1s infinite' }}></div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export { Hero };
export default Hero;