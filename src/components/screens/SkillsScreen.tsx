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
  { id: 's1', name: 'Browser Operations', category: 'Tools', description: 'Enables FOI.AI to navigate websites, click elements, and extract data directly from the browser.', installed: true, icon: 'M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9' },
  { id: 's2', name: 'File System Access', category: 'System', description: 'Grants read/write access to your local file system for managing documents and projects.', installed: true, icon: 'M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z' },
  { id: 's3', name: 'Code Execution', category: 'System', description: 'Allows running Python, Node.js, and bash scripts securely within a local sandbox.', installed: false, icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6' },
  { id: 's4', name: 'Data Visualization', category: 'Libraries', description: 'Generates charts, graphs, and visual reports from raw data arrays or CSV files.', installed: false, icon: 'M18 20V10M12 20V4M6 20v-6' },
];

export default function SkillsScreen() {
  const [activeTab, setActiveTab] = useState<'capabilities' | 'libraries'>('capabilities');
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);

  const toggleInstall = (id: string) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, installed: !s.installed } : s));
  };

  const filteredSkills = skills.filter(s => 
    activeTab === 'capabilities' ? s.category !== 'Libraries' : s.category === 'Libraries'
  );

  return (
    <div style={{ padding: '48px 64px', maxWidth: 1200, margin: '0 auto', height: '100%', overflowY: 'auto' }}>
      
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#fff' }}>Skills & Capabilities</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Enhance FOI.AI's core abilities by adding new operational skills or code libraries.</p>
      </div>

      <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid var(--border-strong)', marginBottom: 32 }}>
        <button 
          style={{ 
            background: 'transparent', 
            border: 'none', 
            borderBottom: activeTab === 'capabilities' ? '2px solid var(--brand-color)' : '2px solid transparent',
            color: activeTab === 'capabilities' ? '#fff' : 'var(--text-secondary)',
            padding: '8px 4px 12px 4px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('capabilities')}
        >
          Capabilities
        </button>
        <button 
          style={{ 
            background: 'transparent', 
            border: 'none', 
            borderBottom: activeTab === 'libraries' ? '2px solid var(--brand-color)' : '2px solid transparent',
            color: activeTab === 'libraries' ? '#fff' : 'var(--text-secondary)',
            padding: '8px 4px 12px 4px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('libraries')}
        >
          Libraries
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filteredSkills.map(skill => (
          <div key={skill.id} className="flat-card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, background: '#222', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={skill.icon}></path></svg>
              </div>
              <button 
                onClick={() => toggleInstall(skill.id)}
                style={{ 
                  background: skill.installed ? 'transparent' : 'var(--brand-color)',
                  color: skill.installed ? 'var(--text-secondary)' : '#fff',
                  border: skill.installed ? '1px solid var(--border-strong)' : 'none',
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {skill.installed ? 'Installed' : 'Add Skill'}
              </button>
            </div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{skill.name}</h4>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>{skill.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
