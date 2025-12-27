import React from 'react';
import { ExternalLink, Layers, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectCard = ({ title, description, link, tags, metrics, architecture, type, icon }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: '#1e293b', // Slate-800
        borderRadius: '16px',
        border: '1px solid #334155',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
      }}
    >
      {/* Top Badge */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid #334155',
        background: '#0f172a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            padding: '8px', 
            borderRadius: '8px', 
            background: 'rgba(56, 189, 248, 0.1)', 
            color: '#38bdf8' 
          }}>
            {icon}
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {type}
          </span>
        </div>
        <a 
          href={link} 
          target="_blank" 
          rel="noreferrer" 
          style={{ color: '#cbd5e1', transition: 'color 0.2s' }} 
          className="hover:text-white"
        >
          <ExternalLink size={18} />
        </a>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          color: '#f8fafc', 
          marginBottom: '1rem' 
        }}>
          {title}
        </h3>
        
        <p style={{ 
          color: '#94a3b8', 
          fontSize: '0.95rem', 
          lineHeight: '1.6', 
          marginBottom: '1.5rem',
          flex: 1 
        }}>
          {description}
        </p>

        {/* METRICS ROW - Recruiter Candy */}
        {metrics && (
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '1.5rem', 
            background: 'rgba(15, 23, 42, 0.5)', 
            padding: '12px', 
            borderRadius: '8px' 
          }}>
            {metrics.map((m, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>{m.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#4ade80' }}>{m.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* ARCHITECTURE FLOW - Visualizes Engineering */}
        {architecture && (
          <div style={{ 
            marginBottom: '1.5rem', 
            fontSize: '0.8rem', 
            color: '#cbd5e1', 
            fontFamily: 'monospace',
            background: '#0f172a',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px dashed #334155'
          }}>
            <span style={{ color: '#fbbf24', marginRight: '8px' }}>⚡ FLOW:</span> 
            {architecture}
          </div>
        )}

        {/* TAGS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
          {tags.map((tag) => (
            <span key={tag} style={{
              fontSize: '0.75rem',
              padding: '4px 10px',
              borderRadius: '20px',
              background: '#334155',
              color: '#e2e8f0',
              fontWeight: '500'
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};