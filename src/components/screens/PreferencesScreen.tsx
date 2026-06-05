'use client';
import React, { useState } from 'react';

export default function PreferencesScreen() {
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);
  const [autoStart, setAutoStart] = useState(false);

  return (
    <div style={{ padding: 32, maxWidth: 800, margin: '0 auto', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Preferences</h1>
        <p style={{ color: 'var(--text-muted)' }}>Customize your FOI.AI experience.</p>
      </div>

      <div className="card" style={{ padding: '0 24px' }}>
        <div className="settings-row">
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>Theme</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Choose your preferred appearance.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, background: 'rgba(0,0,0,0.2)', padding: 4, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
            <button 
              onClick={() => setTheme('light')}
              style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: theme === 'light' ? 'var(--bg-panel)' : 'none', color: theme === 'light' ? 'var(--text-primary)' : 'var(--text-muted)', cursor: 'pointer', fontSize: 13, fontWeight: 500, boxShadow: theme === 'light' ? 'var(--shadow-sm)' : 'none' }}
            >
              Light
            </button>
            <button 
              onClick={() => setTheme('dark')}
              style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: theme === 'dark' ? 'var(--bg-panel)' : 'none', color: theme === 'dark' ? 'var(--text-primary)' : 'var(--text-muted)', cursor: 'pointer', fontSize: 13, fontWeight: 500, boxShadow: theme === 'dark' ? 'var(--shadow-sm)' : 'none' }}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>Desktop Notifications</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Receive alerts when background tasks complete.</div>
          </div>
          <button 
            className={`toggle ${notifications ? 'on' : 'off'}`}
            onClick={() => setNotifications(!notifications)}
          />
        </div>

        <div className="settings-row">
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>Launch at Login</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Automatically start FOI.AI when you log in.</div>
          </div>
          <button 
            className={`toggle ${autoStart ? 'on' : 'off'}`}
            onClick={() => setAutoStart(!autoStart)}
          />
        </div>
      </div>
    </div>
  );
}
