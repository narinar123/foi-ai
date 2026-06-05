'use client';
import React, { useState } from 'react';

interface Plugin {
  id: string;
  name: string;
  developer: string;
  description: string;
  installed: boolean;
  icon: string;
}

const INITIAL_PLUGINS: Plugin[] = [
  { id: 'p1', name: 'GitHub Integration', developer: 'FOI.AI', description: 'Deep integration with GitHub for PR reviews, issue management, and CI/CD triggers.', installed: true, icon: '🐙' },
  { id: 'p2', name: 'Jira Sync', developer: 'FOI.AI', description: 'Automatically sync tasks, epics, and subtasks between FOI.AI Desk and Jira.', installed: false, icon: '📋' },
  { id: 'p3', name: 'Figma to Code', developer: 'DesignOps', description: 'Generate React components directly from Figma URLs using vision models.', installed: true, icon: '🎨' },
  { id: 'p4', name: 'Vercel Deployments', developer: 'FOI.AI', description: 'Trigger, monitor, and rollback Vercel deployments directly from chat.', installed: false, icon: '▲' },
  { id: 'p5', name: 'Slack Notifier', developer: 'Community', description: 'Send automated summaries and alerts to specific Slack channels.', installed: false, icon: '💬' },
  { id: 'p6', name: 'Google Workspace', developer: 'FOI.AI', description: 'Read and write to Google Docs, Sheets, and Calendar.', installed: true, icon: '📅' },
];

export default function PluginsScreen() {
  const [plugins, setPlugins] = useState<Plugin[]>(INITIAL_PLUGINS);
  const [search, setSearch] = useState('');

  const toggleInstall = (id: string) => {
    setPlugins(prev => prev.map(p => p.id === id ? { ...p, installed: !p.installed } : p));
  };

  const filtered = plugins.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Plugins</h1>
          <p style={{ color: 'var(--text-muted)' }}>Extend FOI.AI with powerful integrations and tools.</p>
        </div>
        <div style={{ width: 300 }}>
          <input 
            type="text" 
            placeholder="Search plugins..." 
            className="input-field"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
        {filtered.map(plugin => (
          <div key={plugin.id} className="grid-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ fontSize: 32 }}>{plugin.icon}</div>
              <button 
                onClick={() => toggleInstall(plugin.id)}
                className={plugin.installed ? 'btn-secondary' : 'btn-primary'}
                style={{ padding: '6px 12px', fontSize: 13 }}
              >
                {plugin.installed ? 'Uninstall' : 'Install'}
              </button>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{plugin.name}</h3>
            <p style={{ fontSize: 12, color: 'var(--accent)', marginBottom: 12, fontWeight: 500 }}>By {plugin.developer}</p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>{plugin.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
