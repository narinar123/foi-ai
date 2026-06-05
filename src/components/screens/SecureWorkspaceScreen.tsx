'use client';
import React, { useState } from 'react';

export default function SecureWorkspaceScreen() {
  const [encEnabled, setEncEnabled] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [auditLog, setAuditLog] = useState(true);
  const [sandboxMode, setSandboxMode] = useState(true);
  const [locked, setLocked] = useState(false);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', maxWidth: 700 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Secure Workspace</h1>
          <p style={{ fontSize: 13, color: '#666' }}>Protect your data with enterprise-grade security controls.</p>
        </div>

        {/* Security status */}
        <div style={{
          background: encEnabled ? '#1a2e1a' : '#2e1a1a',
          border: `1px solid ${encEnabled ? '#2a4a2a' : '#4a2a2a'}`,
          borderRadius: 12, padding: '20px 24px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{ fontSize: 36 }}>{encEnabled ? '🔐' : '🔓'}</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: encEnabled ? '#22c55e' : '#ef4444', marginBottom: 4 }}>
              {encEnabled ? 'Workspace Secured' : 'Workspace Unlocked'}
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>
              {encEnabled ? 'End-to-end encryption active. Your data is protected.' : 'Enable encryption to protect your sensitive data.'}
            </div>
          </div>
          <button
            onClick={() => setLocked(!locked)}
            style={{
              marginLeft: 'auto',
              background: locked ? '#2a2a2a' : '#ef444415',
              border: `1px solid ${locked ? '#333' : '#ef4444'}`,
              color: locked ? '#888' : '#ef4444',
              borderRadius: 6, padding: '7px 14px', fontSize: 12, cursor: 'pointer',
            }}
          >
            {locked ? '🔓 Unlock' : '🔒 Lock Now'}
          </button>
        </div>

        {/* Security settings */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            Encryption & Access
          </div>
          {[
            { label: 'End-to-end encryption', desc: 'Encrypt all tasks, messages, and files with AES-256.', value: encEnabled, setter: setEncEnabled },
            { label: 'Biometric authentication', desc: 'Use Touch ID or Face ID to unlock QoderWork.', value: biometric, setter: setBiometric },
            { label: 'Audit log', desc: 'Record all workspace actions for compliance review.', value: auditLog, setter: setAuditLog },
            { label: 'Sandbox mode', desc: 'Run AI tasks in an isolated environment.', value: sandboxMode, setter: setSandboxMode },
          ].map((setting, i) => (
            <div key={setting.label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingTop: i > 0 ? 14 : 0, borderTop: i > 0 ? '1px solid #222' : 'none',
              paddingBottom: 14,
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

        {/* Session */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            Session
          </div>
          <div>
            <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>
              Auto-lock after inactivity (minutes)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input
                type="range" min="5" max="120" step="5"
                value={sessionTimeout}
                onChange={e => setSessionTimeout(e.target.value)}
                style={{ flex: 1, accentColor: '#22c55e' }}
              />
              <span style={{ fontSize: 13, color: '#ccc', minWidth: 30 }}>{sessionTimeout}m</span>
            </div>
          </div>
        </div>

        {/* Audit log preview */}
        {auditLog && (
          <div className="card" style={{ padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
              Recent Audit Entries
            </div>
            {[
              { time: '14:32:11', action: 'Task executed: Organize social media files', user: 'Praveen k' },
              { time: '14:28:45', action: 'Skill installed: deep-research', user: 'Praveen k' },
              { time: '14:15:03', action: 'Workspace unlocked via password', user: 'Praveen k' },
              { time: '09:01:22', action: 'Session started', user: 'Praveen k' },
            ].map((entry, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, paddingBottom: 8, marginBottom: 8,
                borderBottom: i < 3 ? '1px solid #1f1f1f' : 'none',
                fontFamily: 'monospace', fontSize: 12,
              }}>
                <span style={{ color: '#555', flexShrink: 0 }}>{entry.time}</span>
                <span style={{ color: '#888', flex: 1 }}>{entry.action}</span>
                <span style={{ color: '#444', flexShrink: 0 }}>{entry.user}</span>
              </div>
            ))}
            <button style={{
              marginTop: 4, background: 'none', border: 'none', color: '#22c55e', fontSize: 12, cursor: 'pointer',
            }}>
              View full audit log →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
