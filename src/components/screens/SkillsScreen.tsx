'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

type TabType = 'Market' | 'Built-in' | 'Installed';

const SKILLS = [
  { id: 'deep-research', icon: '✏️', name: 'deep-research', desc: 'Conduct systematic deep research on technical topics with source verification...', downloads: '20.9K', installed: false },
  { id: 'qoderwork-ppt', icon: '🐍', name: 'qoderwork-ppt', desc: 'Generate QoderWork-style presentations. Automatically matches...', downloads: '16.9K', installed: false, color: '#22c55e' },
  { id: 'drafter-diagram', icon: '📝', name: 'drafter-diagram', desc: 'Generate technical diagrams using HTML/CSS in Flat Engineering Bluepri...', downloads: '15.5K', installed: false },
  { id: 'quickbi-smartq', icon: '📊', name: 'quickbi-smartq-chat', desc: 'Super data analysis skill. Users can intelligently match and analyze Excel o...', downloads: '12.8K', installed: false },
  { id: 'notion-infographic', icon: '🤖', name: 'notion-infographic', desc: 'Batch generate Notion-style relaxed hand-drawn infographic series from...', downloads: '8.5K', installed: false },
  { id: 'general-ppt', icon: '🅿️', name: 'general-ppt', desc: 'Use this skill any time a .pptx file is involved in any way — as input, output,...', downloads: '7.8K', installed: false },
  { id: 'tailored-resume', icon: '✏️', name: 'tailored-resume-ge...', desc: 'Analyzes job descriptions and generates tailored resumes that...', downloads: '5K', installed: false },
  { id: 'cloudflare-deploy', icon: '⚡', name: 'cloudflare-deploy', desc: 'Deploy applications and infrastructure to Cloudflare using Workers, Pages, an...', downloads: '3.7K', installed: false },
  { id: 'weekly-report', icon: '✏️', name: 'weekly-report-writer', desc: 'Create weekly reports with Obsidian integration for knowledge management.', downloads: '2.9K', installed: false },
  { id: 'analytics-data', icon: '📈', name: 'analytics-data-anal...', desc: 'Implement analytics, data analysis, and visualization best practices using...', downloads: '15.5K', installed: false },
  { id: 'content-research', icon: '✏️', name: 'content-research-w...', desc: 'Assists in writing high-quality content by conducting research...', downloads: '10.7K', installed: false },
  { id: 'frontend-design', icon: '🎨', name: 'frontend-design', desc: 'Create distinctive, production-grade frontend interfaces with high design...', downloads: '9.8K', installed: false },
];

const BUILTIN_SKILLS = [
  { id: 'b1', icon: '🔍', name: 'web-search', desc: 'Search the web for real-time information and news.', downloads: '—', installed: true },
  { id: 'b2', icon: '📁', name: 'file-manager', desc: 'Manage, organize, and manipulate files and folders.', downloads: '—', installed: true },
  { id: 'b3', icon: '💻', name: 'code-interpreter', desc: 'Execute and test code in multiple programming languages.', downloads: '—', installed: true },
  { id: 'b4', icon: '🗓️', name: 'calendar-manager', desc: 'Schedule, manage, and organize calendar events and reminders.', downloads: '—', installed: true },
  { id: 'b5', icon: '📧', name: 'email-compose', desc: 'Write, send, and manage emails with AI assistance.', downloads: '—', installed: true },
  { id: 'b6', icon: '🎤', name: 'voice-transcription', desc: 'Transcribe audio recordings to text in real time.', downloads: '—', installed: true },
];

export default function SkillsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('Market');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Popular');
  const [filter, setFilter] = useState('All');
  const [installedIds, setInstalledIds] = useState<Set<string>>(new Set());
  const [showInstallConfirm, setShowInstallConfirm] = useState<string | null>(null);

  const displaySkills = activeTab === 'Built-in' ? BUILTIN_SKILLS : 
    SKILLS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleInstall = (id: string) => {
    if (installedIds.has(id)) {
      setInstalledIds(prev => { const n = new Set(prev); n.delete(id); return n; });
    } else {
      setShowInstallConfirm(id);
      setTimeout(() => {
        setInstalledIds(prev => new Set([...prev, id]));
        setShowInstallConfirm(null);
      }, 600);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        borderBottom: '1px solid #222',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: 4, borderRadius: 4 }}>
            <RefreshIcon />
          </button>
          <div style={{ position: 'relative' }}>
            <SearchIcon />
            <input
              placeholder="Search skills"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                background: '#2a2a2a', border: '1px solid #333', borderRadius: 6,
                padding: '5px 10px 5px 28px', color: '#fff', fontSize: 13,
                outline: 'none', width: 200, position: 'relative',
              }}
            />
            <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#666' }}>
              <SearchIcon />
            </div>
          </div>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#2a2a2a', border: '1px solid #333', borderRadius: 6,
          padding: '6px 12px', color: '#fff', fontSize: 13, cursor: 'pointer',
        }}>
          <PlusIcon />
          Add
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px' }}>
        {/* Page title */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Skills</h1>
          <p style={{ fontSize: 13, color: '#666' }}>Install and manage skills to extend what QoderWork can do in chat.</p>
        </div>

        {/* Hero card */}
        <div style={{
          background: 'linear-gradient(135deg, #1a2e1a, #1f3a1f)',
          border: '1px solid #2a4a2a',
          borderRadius: 12,
          padding: '20px 24px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Your Skills, Ready to Go</h2>
            <p style={{ fontSize: 13, color: '#666' }}>Get collaboration, efficiency, design, and data analysis — all with one click.</p>
          </div>
          <div style={{ display: 'flex', gap: -8 }}>
            {['🐍', '🤖', '📝', '🎨', '📊'].map((e, i) => (
              <div key={i} style={{
                width: 40, height: 40, borderRadius: 10, background: '#2a2a2a',
                border: '2px solid #111', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 20, marginLeft: i > 0 ? -8 : 0,
              }}>{e}</div>
            ))}
          </div>
        </div>

        {/* Tabs + filters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 20 }}>
            {(['Market', 'Built-in', 'Installed'] as TabType[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', paddingBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}
              >
                {tab}
                {tab === 'Installed' && (
                  <span style={{
                    background: '#2a2a2a', borderRadius: '50%', width: 18, height: 18,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: '#666',
                  }}>
                    {installedIds.size}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="custom-select" style={{ fontSize: 12, padding: '4px 10px' }}>
              All <ChevronDownIcon />
            </button>
            <button className="custom-select" style={{ fontSize: 12, padding: '4px 10px' }}>
              Sort: Popular <ChevronDownIcon />
            </button>
          </div>
        </div>

        {activeTab === 'Market' && (
          <>
            <div style={{ fontSize: 12, color: '#666', marginBottom: 12, fontWeight: 500 }}>Official Selection</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
              {displaySkills.slice(0, 9).map(skill => (
                <div key={skill.id} className="skill-card" onClick={() => toggleInstall(skill.id)}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 6, background: '#2a2a2a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                      }}>{skill.icon}</div>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{skill.name}</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleInstall(skill.id); }}
                      style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: installedIds.has(skill.id) ? '#22c55e22' : '#2a2a2a',
                        border: installedIds.has(skill.id) ? '1px solid #22c55e' : '1px solid #333',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: installedIds.has(skill.id) ? '#22c55e' : '#666',
                        transition: 'all 0.15s',
                      }}
                    >
                      {installedIds.has(skill.id) ? '✓' : '+'}
                    </button>
                  </div>
                  <p style={{ fontSize: 12, color: '#666', lineHeight: 1.4, marginBottom: 8 }}>{skill.desc}</p>
                  <div style={{ fontSize: 11, color: '#555', display: 'flex', alignItems: 'center', gap: 4 }}>
                    ⬇ {skill.downloads}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12, color: '#666', marginBottom: 12, fontWeight: 500 }}>
              Other Skills · 171
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {displaySkills.slice(9).map(skill => (
                <div key={skill.id} className="skill-card" onClick={() => toggleInstall(skill.id)}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 6, background: '#2a2a2a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                      }}>{skill.icon}</div>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{skill.name}</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleInstall(skill.id); }}
                      style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: installedIds.has(skill.id) ? '#22c55e22' : '#2a2a2a',
                        border: installedIds.has(skill.id) ? '1px solid #22c55e' : '1px solid #333',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: installedIds.has(skill.id) ? '#22c55e' : '#666',
                        transition: 'all 0.15s',
                      }}
                    >
                      {installedIds.has(skill.id) ? '✓' : '+'}
                    </button>
                  </div>
                  <p style={{ fontSize: 12, color: '#666', lineHeight: 1.4, marginBottom: 8 }}>{skill.desc}</p>
                  <div style={{ fontSize: 11, color: '#555' }}>⬇ {skill.downloads}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'Built-in' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {BUILTIN_SKILLS.map(skill => (
              <div key={skill.id} className="skill-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6, background: '#1a2e1a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  }}>{skill.icon}</div>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{skill.name}</span>
                  <span className="badge badge-beta" style={{ marginLeft: 'auto' }}>Built-in</span>
                </div>
                <p style={{ fontSize: 12, color: '#666', lineHeight: 1.4 }}>{skill.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Installed' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {SKILLS.filter(s => installedIds.has(s.id)).length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#555', padding: '40px 0' }}>
                No skills installed yet. Browse the Market to add skills.
              </div>
            ) : (
              SKILLS.filter(s => installedIds.has(s.id)).map(skill => (
                <div key={skill.id} className="skill-card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 6, background: '#1a2e1a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                      }}>{skill.icon}</div>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{skill.name}</span>
                    </div>
                    <button
                      onClick={() => toggleInstall(skill.id)}
                      style={{
                        background: '#22c55e22', border: '1px solid #22c55e',
                        color: '#22c55e', borderRadius: 4, padding: '2px 8px',
                        fontSize: 11, cursor: 'pointer',
                      }}
                    >
                      Uninstall
                    </button>
                  </div>
                  <p style={{ fontSize: 12, color: '#666', lineHeight: 1.4 }}>{skill.desc}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
