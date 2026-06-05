'use client';
import React, { useState } from 'react';

interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  installed: boolean;
  icon: string;
}

const INITIAL_SKILLS: Skill[] = [
  { id: 's1', name: 'Web Scraper', category: 'Data', description: 'Extract structured data from any URL and format it into JSON or CSV.', installed: true, icon: '🕷️' },
  { id: 's2', name: 'Code Refactor', category: 'Development', description: 'Analyze and refactor large codebases for performance and readability.', installed: true, icon: '♻️' },
  { id: 's3', name: 'UI Generator', category: 'Design', description: 'Generate Tailwind CSS UI components based on text descriptions.', installed: false, icon: '✨' },
  { id: 's4', name: 'SEO Analyzer', category: 'Marketing', description: 'Audit websites for SEO best practices and generate actionable reports.', installed: false, icon: '📈' },
  { id: 's5', name: 'Terminal Master', category: 'System', description: 'Execute complex bash scripts and manage system operations securely.', installed: true, icon: '🖥️' },
  { id: 's6', name: 'Email Drafter', category: 'Productivity', description: 'Draft professional emails and follow-ups based on brief bullet points.', installed: false, icon: '✉️' },
];

export default function SkillsScreen() {
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];

  const toggleInstall = (id: string) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, installed: !s.installed } : s));
  };

  const filtered = activeTab === 'All' ? skills : skills.filter(s => s.category === activeTab);

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Agent Skills</h1>
        <p style={{ color: 'var(--text-muted)' }}>Equip FOI.AI with specialized skills for specific workflows.</p>
      </div>

      <div className="tab-container" style={{ marginBottom: 32, display: 'inline-flex' }}>
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`tab ${activeTab === cat ? 'active' : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
        {filtered.map(skill => (
          <div key={skill.id} className="grid-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ fontSize: 32 }}>{skill.icon}</div>
              <button 
                onClick={() => toggleInstall(skill.id)}
                className={skill.installed ? 'btn-secondary' : 'btn-primary'}
                style={{ padding: '6px 12px', fontSize: 13 }}
              >
                {skill.installed ? 'Remove' : 'Add Skill'}
              </button>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{skill.name}</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{skill.category}</p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
