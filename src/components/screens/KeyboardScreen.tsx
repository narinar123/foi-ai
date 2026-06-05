'use client';
import React, { useState } from 'react';

const KEYBOARDS: { id: string; label: string; shortcut: string; action: string }[] = [
  { id: 'k1', label: 'New Task', shortcut: '⌘N', action: 'Create a new task' },
  { id: 'k2', label: 'Quick Search', shortcut: '⌘K', action: 'Open quick search / command palette' },
  { id: 'k3', label: 'Send Message', shortcut: '⌘↩', action: 'Send current message or task' },
  { id: 'k4', label: 'Toggle Sidebar', shortcut: '⌘\\', action: 'Show or hide the sidebar' },
  { id: 'k5', label: 'Switch to Home', shortcut: '⌘1', action: 'Navigate to the Home screen' },
  { id: 'k6', label: 'Switch to Skills', shortcut: '⌘2', action: 'Navigate to Skills marketplace' },
  { id: 'k7', label: 'Switch to Channels', shortcut: '⌘3', action: 'Navigate to IM Channel' },
  { id: 'k8', label: 'Open Preferences', shortcut: '⌘,', action: 'Open Settings / Preferences' },
  { id: 'k9', label: 'Stop Task', shortcut: '⌘.', action: 'Stop the current running task' },
  { id: 'k10', label: 'Focus Input', shortcut: '/', action: 'Focus the chat / task input' },
  { id: 'k11', label: 'New Channel', shortcut: '⌘⇧N', action: 'Create a new channel' },
  { id: 'k12', label: 'Fullscreen', shortcut: '⌘⇧F', action: 'Toggle fullscreen mode' },
];

export default function KeyboardScreen() {
  const [recording, setRecording] = useState<string | null>(null);
  const [shortcuts, setShortcuts] = useState(KEYBOARDS);
  const [search, setSearch] = useState('');

  const filtered = shortcuts.filter(k =>
    k.label.toLowerCase().includes(search.toLowerCase()) ||
    k.shortcut.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', maxWidth: 700 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Keyboard Shortcuts</h1>
          <p style={{ fontSize: 13, color: '#666' }}>Customize keyboard shortcuts for faster navigation and actions.</p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <input
            placeholder="Search shortcuts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: '#222', border: '1px solid #333', borderRadius: 8,
              padding: '10px 12px 10px 36px', color: '#fff', fontSize: 13,
              outline: 'none', width: '100%',
            }}
          />
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#555' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
        </div>

        {/* Shortcut list */}
        <div className="card" style={{ overflow: 'hidden' }}>
          {filtered.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 20px',
                borderBottom: i < filtered.length - 1 ? '1px solid #222' : 'none',
                transition: 'background 0.1s',
              }}
              className="sidebar-item"
              onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: '#555' }}>{item.action}</div>
              </div>
              <button
                onClick={() => setRecording(recording === item.id ? null : item.id)}
                style={{
                  background: recording === item.id ? '#d9775715' : '#2a2a2a',
                  border: recording === item.id ? '1px solid #d97757' : '1px solid #333',
                  color: recording === item.id ? '#d97757' : '#ccc',
                  borderRadius: 6, padding: '5px 12px',
                  fontSize: 13, cursor: 'pointer', fontFamily: 'monospace', fontWeight: 500,
                  minWidth: 80, textAlign: 'center',
                  transition: 'all 0.15s',
                }}
              >
                {recording === item.id ? 'Recording...' : item.shortcut}
              </button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
          <button style={{
            background: '#d9775715', border: '1px solid #d97757', color: '#d97757',
            borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: 'pointer',
          }}>
            Save Changes
          </button>
          <button
            onClick={() => setShortcuts(KEYBOARDS)}
            style={{
              background: 'none', border: '1px solid #333', color: '#555',
              borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: 'pointer',
            }}
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
}
