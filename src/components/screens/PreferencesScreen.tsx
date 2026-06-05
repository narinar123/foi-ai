'use client';
import React, { useState } from 'react';

type Toggle = { label: string; desc: string; key: string; value: boolean };
type Section = { title: string; toggles: Toggle[] };

const SECTIONS: Section[] = [
  {
    title: 'AI Behavior',
    toggles: [
      { label: 'Auto-execute tasks', desc: 'Allow QoderWork to execute tasks without confirmation for low-risk actions.', key: 'autoExec', value: true },
      { label: 'Show task reasoning', desc: 'Display step-by-step AI reasoning in task execution panel.', key: 'showReasoning', value: false },
      { label: 'Proactive suggestions', desc: 'AI suggests follow-up actions and improvements after task completion.', key: 'proactiveSugg', value: true },
      { label: 'Task memory', desc: 'Remember context across tasks for smarter assistance.', key: 'taskMemory', value: true },
    ],
  },
  {
    title: 'Notifications',
    toggles: [
      { label: 'Task completion alerts', desc: 'Notify when a background task finishes.', key: 'taskAlerts', value: true },
      { label: 'Sound effects', desc: 'Play sounds when tasks complete or errors occur.', key: 'soundFX', value: false },
      { label: 'Desktop notifications', desc: 'Show native OS notifications for important events.', key: 'desktopNotif', value: true },
    ],
  },
  {
    title: 'Privacy',
    toggles: [
      { label: 'Local processing mode', desc: 'Process data locally when possible to minimize cloud uploads.', key: 'localMode', value: false },
      { label: 'Analytics', desc: 'Share anonymous usage data to help improve QoderWork.', key: 'analytics', value: true },
      { label: 'Crash reports', desc: 'Automatically send crash reports to improve stability.', key: 'crashReports', value: true },
    ],
  },
  {
    title: 'Interface',
    toggles: [
      { label: 'Compact mode', desc: 'Reduce spacing and padding for a denser layout.', key: 'compactMode', value: false },
      { label: 'Show timestamps', desc: 'Show timestamps in task history and chat messages.', key: 'timestamps', value: true },
      { label: 'Auto-save work', desc: 'Automatically save task progress and drafts.', key: 'autoSave', value: true },
    ],
  },
];

const LANGUAGES = ['English', '中文', 'Español', 'Français', 'Deutsch', 'العربية', 'हिन्दी'];

export default function PreferencesScreen() {
  const [values, setValues] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    SECTIONS.forEach(s => s.toggles.forEach(t => { init[t.key] = t.value; }));
    return init;
  });
  const [language, setLanguage] = useState('English');

  const toggle = (key: string) => {
    setValues(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', maxWidth: 700 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Preferences</h1>
          <p style={{ fontSize: 13, color: '#666' }}>Customize how QoderWork behaves and looks.</p>
        </div>

        {/* Language */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Language</div>
              <div style={{ fontSize: 12, color: '#666' }}>Interface language for QoderWork.</div>
            </div>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              style={{
                background: '#2a2a2a', border: '1px solid #333', borderRadius: 6,
                padding: '7px 28px 7px 10px', color: '#fff', fontSize: 13,
                cursor: 'pointer', outline: 'none', appearance: 'none',
              }}
            >
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Sections */}
        {SECTIONS.map(section => (
          <div key={section.title} className="card" style={{ padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {section.title}
            </div>
            {section.toggles.map((toggle_item, i) => (
              <div
                key={toggle_item.key}
                className="settings-row"
                style={{
                  paddingTop: i === 0 ? 0 : 16,
                  borderTop: i > 0 ? '1px solid #222' : 'none',
                  borderBottom: 'none',
                }}
              >
                <div style={{ flex: 1, paddingRight: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{toggle_item.label}</div>
                  <div style={{ fontSize: 12, color: '#666' }}>{toggle_item.desc}</div>
                </div>
                <button
                  onClick={() => toggle(toggle_item.key)}
                  className={`toggle ${values[toggle_item.key] ? 'on' : 'off'}`}
                  style={{ border: 'none', cursor: 'pointer', flexShrink: 0 }}
                />
              </div>
            ))}
          </div>
        ))}

        {/* Reset */}
        <div style={{ marginTop: 8, paddingBottom: 24 }}>
          <button style={{
            background: 'none', border: '1px solid #333', color: '#555',
            borderRadius: 6, padding: '8px 16px', fontSize: 13, cursor: 'pointer',
          }}>
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
