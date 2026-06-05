'use client';
import React, { useState } from 'react';

const EXPERIMENTS = [
  { id: 'e1', name: 'Multi-agent orchestration', desc: 'Run multiple AI agents in parallel on complex tasks. May use more credits.', enabled: false, beta: true, risk: 'medium' },
  { id: 'e2', name: 'Real-time collaboration', desc: 'Allow multiple users to work on the same task simultaneously.', enabled: false, beta: true, risk: 'low' },
  { id: 'e3', name: 'Browser automation v2', desc: 'New Playwright-based browser automation with visual element detection.', enabled: true, beta: true, risk: 'medium' },
  { id: 'e4', name: 'Code execution sandbox', desc: 'Execute arbitrary code in a secure WASM sandbox environment.', enabled: false, beta: false, risk: 'high' },
  { id: 'e5', name: 'Memory graph', desc: 'Build persistent knowledge graphs across tasks for smarter context.', enabled: true, beta: true, risk: 'low' },
  { id: 'e6', name: 'Native file watchers', desc: 'Watch file system changes and trigger tasks automatically.', enabled: false, beta: false, risk: 'medium' },
  { id: 'e7', name: 'Advanced model routing', desc: 'Dynamically route tasks to the most appropriate AI model.', enabled: false, beta: true, risk: 'low' },
];

const RISK_COLOR: Record<string, string> = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
};

export default function ExperimentalScreen() {
  const [features, setFeatures] = useState(EXPERIMENTS);
  const [showWarning, setShowWarning] = useState(true);

  const toggle = (id: string) => {
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', maxWidth: 700 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h1 style={{ fontSize: 22, fontWeight: 600 }}>Experimental</h1>
            <span style={{ fontSize: 18 }}>🧪</span>
          </div>
          <p style={{ fontSize: 13, color: '#666' }}>
            Enable experimental features under active development. These may be unstable.
          </p>
        </div>

        {showWarning && (
          <div style={{
            background: '#2e1a0a', border: '1px solid #5a3a1a', borderRadius: 10,
            padding: '14px 18px', marginBottom: 20, display: 'flex', gap: 12,
            animation: 'fadeIn 0.2s ease',
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#f59e0b', marginBottom: 3 }}>Experimental Features Warning</div>
              <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>
                These features are not production-ready and may cause unexpected behavior. Use at your own risk. 
                High-risk features could affect system stability.
              </div>
            </div>
            <button onClick={() => setShowWarning(false)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16, alignSelf: 'flex-start' }}>×</button>
          </div>
        )}

        {/* Feature list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {features.map(feature => (
            <div key={feature.id} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{feature.name}</span>
                  {feature.beta && <span className="badge badge-beta">Beta</span>}
                  <span style={{
                    fontSize: 10, padding: '1px 6px', borderRadius: 3, fontWeight: 500,
                    background: `${RISK_COLOR[feature.risk]}15`,
                    color: RISK_COLOR[feature.risk],
                    border: `1px solid ${RISK_COLOR[feature.risk]}40`,
                  }}>
                    {feature.risk} risk
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#666' }}>{feature.desc}</div>
              </div>
              <button
                onClick={() => toggle(feature.id)}
                className={`toggle ${feature.enabled ? 'on' : 'off'}`}
                style={{ border: 'none', cursor: 'pointer', flexShrink: 0 }}
              />
            </div>
          ))}
        </div>

        {/* Reset */}
        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => setFeatures(EXPERIMENTS)}
            style={{
              background: 'none', border: '1px solid #333', color: '#555',
              borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: 'pointer',
            }}
          >
            Disable All Experimental Features
          </button>
        </div>
      </div>
    </div>
  );
}
