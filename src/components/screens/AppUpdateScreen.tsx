'use client';
import React, { useState } from 'react';

export default function AppUpdateScreen() {
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<'idle' | 'upToDate' | 'available'>('idle');
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [betaChannel, setBetaChannel] = useState(false);

  const checkUpdate = () => {
    setChecking(true);
    setStatus('idle');
    setTimeout(() => {
      setChecking(false);
      setStatus('upToDate');
    }, 1800);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', maxWidth: 600 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>App Update</h1>
          <p style={{ fontSize: 13, color: '#666' }}>Manage updates and release channels for FOI.AI.</p>
        </div>

        {/* Current version card */}
        <div className="card" style={{ padding: '24px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: 'linear-gradient(135deg, #d97757, #d97757)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
          }}>
            👾
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>FOI.AI</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>Version 1.2.4 · Released May 28, 2026</div>
            {status === 'upToDate' && (
              <div style={{ fontSize: 12, color: '#d97757', display: 'flex', alignItems: 'center', gap: 4 }}>
                ✓ You're up to date
              </div>
            )}
            {status === 'idle' && (
              <div style={{ fontSize: 12, color: '#555' }}>Click "Check for Updates" to check.</div>
            )}
          </div>
          <button
            onClick={checkUpdate}
            disabled={checking}
            style={{
              background: '#2a2a2a', border: '1px solid #333', color: '#ccc',
              borderRadius: 6, padding: '8px 16px', fontSize: 13, cursor: checking ? 'wait' : 'pointer',
              opacity: checking ? 0.7 : 1,
            }}
          >
            {checking ? '⟳ Checking...' : 'Check for Updates'}
          </button>
        </div>

        {/* Release notes */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            What's New in 1.2.4
          </div>
          {[
            { icon: '⚡', text: 'Improved task execution speed by 40%' },
            { icon: '🔧', text: 'Fixed file organizer sometimes skipping hidden files' },
            { icon: '🎨', text: 'New dark mode refinements and animation polish' },
            { icon: '🔌', text: 'Added 12 new connector integrations' },
            { icon: '🛡️', text: 'Enhanced Secure Workspace encryption' },
            { icon: '📱', text: 'IM Channel now supports thread replies' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: '#ccc' }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Update settings */}
        <div className="card" style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: 11, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            Update Settings
          </div>
          {[
            { label: 'Automatic updates', desc: 'Download and install updates automatically in the background.', value: autoUpdate, setter: setAutoUpdate },
            { label: 'Beta channel', desc: 'Receive early access to beta features and experimental builds.', value: betaChannel, setter: setBetaChannel },
          ].map((setting, i) => (
            <div key={setting.label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingTop: i > 0 ? 16 : 0, borderTop: i > 0 ? '1px solid #222' : 'none',
              paddingBottom: 16,
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{setting.label}</div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{setting.desc}</div>
              </div>
              <button
                onClick={() => setting.setter(!setting.value)}
                className={`toggle ${setting.value ? 'on' : 'off'}`}
                style={{ border: 'none', cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
