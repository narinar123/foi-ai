'use client';
import React, { useState } from 'react';

const PLUGINS = [
  { id: 'rag-plugin', icon: '🔍', name: 'RAG Plugin', desc: 'Retrieval-Augmented Generation for document search and Q&A.', downloads: '42K', installed: true },
  { id: 'browser-plugin', icon: '🌐', name: 'Browser Control', desc: 'Automate browser interactions, web scraping, and navigation.', downloads: '38K', installed: true },
  { id: 'code-sandbox', icon: '💻', name: 'Code Sandbox', desc: 'Execute Python, Node.js, and shell commands in isolated environments.', downloads: '31K', installed: true },
  { id: 'notion-plugin', icon: '📓', name: 'Notion Integration', desc: 'Read, write, and sync content with your Notion workspace.', downloads: '24K', installed: false },
  { id: 'slack-plugin', icon: '💬', name: 'Slack Integration', desc: 'Send messages, read channels, and manage Slack workspaces.', downloads: '19K', installed: false },
  { id: 'github-plugin', icon: '🐙', name: 'GitHub Integration', desc: 'Create issues, PRs, manage repos and automate workflows.', downloads: '22K', installed: false },
  { id: 'gdrive-plugin', icon: '📁', name: 'Google Drive', desc: 'Access, create and manage documents in Google Drive.', downloads: '17K', installed: false },
  { id: 'jira-plugin', icon: '🎯', name: 'Jira Integration', desc: 'Create and manage Jira tickets, sprints, and project boards.', downloads: '14K', installed: false },
  { id: 'figma-plugin', icon: '🎨', name: 'Figma Plugin', desc: 'Read and export Figma designs, inspect components and styles.', downloads: '11K', installed: false },
];

export default function PluginsScreen() {
  const [installedIds, setInstalledIds] = useState<Set<string>>(
    new Set(PLUGINS.filter(p => p.installed).map(p => p.id))
  );
  const [activeTab, setActiveTab] = useState<'Market' | 'Installed'>('Market');

  const toggle = (id: string) => {
    setInstalledIds(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const displayed = activeTab === 'Market' ? PLUGINS : PLUGINS.filter(p => installedIds.has(p.id));

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Plugins</h1>
          <p style={{ fontSize: 13, color: '#666' }}>Extend QoderWork with powerful integrations and automation plugins.</p>
        </div>

        {/* Hero */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a2e, #1a2e1a)',
          border: '1px solid #2a2a4a',
          borderRadius: 12,
          padding: '20px 24px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Supercharge Your Workflow</h2>
            <p style={{ fontSize: 13, color: '#666' }}>Connect all your tools and automate repetitive tasks with one click.</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['🔍', '🌐', '💻', '📓', '🐙'].map((e, i) => (
              <div key={i} style={{
                width: 36, height: 36, borderRadius: 8, background: '#2a2a2a',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              }}>{e}</div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
          {(['Market', 'Installed'] as const).map(tab => (
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

        {/* Plugin grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {displayed.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#555', padding: '40px 0' }}>
              No plugins installed yet.
            </div>
          ) : displayed.map(plugin => (
            <div key={plugin.id} className="plugin-card">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, background: '#2a2a2a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                  }}>{plugin.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{plugin.name}</div>
                    {installedIds.has(plugin.id) && (
                      <span style={{ fontSize: 10, color: '#22c55e' }}>● Active</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggle(plugin.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 5,
                    fontSize: 12,
                    cursor: 'pointer',
                    border: installedIds.has(plugin.id) ? '1px solid #333' : '1px solid #22c55e',
                    background: installedIds.has(plugin.id) ? '#2a2a2a' : '#22c55e15',
                    color: installedIds.has(plugin.id) ? '#666' : '#22c55e',
                    transition: 'all 0.15s',
                  }}
                >
                  {installedIds.has(plugin.id) ? 'Remove' : 'Install'}
                </button>
              </div>
              <p style={{ fontSize: 12, color: '#666', lineHeight: 1.4, marginBottom: 8 }}>{plugin.desc}</p>
              <div style={{ fontSize: 11, color: '#555' }}>⬇ {plugin.downloads}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
