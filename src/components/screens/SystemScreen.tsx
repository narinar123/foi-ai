'use client';
import React, { useState } from 'react';

export default function SystemScreen() {
  const [proxy, setProxy] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [maxTokens, setMaxTokens] = useState('4096');
  const [timeout, setTimeout_] = useState('30');
  const [maxParallel, setMaxParallel] = useState('3');
  const [logLevel, setLogLevel] = useState('info');
  const [showKey, setShowKey] = useState(false);

  const systemInfo = {
    version: '1.2.4',
    platform: 'macOS 15.0',
    arch: 'arm64',
    node: '20.11.0',
    electron: '30.0.0',
    memory: '8 GB',
    storage: '47.2 GB available',
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', maxWidth: 700 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>System</h1>
          <p style={{ fontSize: 13, color: '#666' }}>System configuration, API keys, and network settings.</p>
        </div>

        {/* System info */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            System Info
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {Object.entries(systemInfo).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #222' }}>
                <span style={{ fontSize: 12, color: '#666', textTransform: 'capitalize' }}>{k}</span>
                <span style={{ fontSize: 12, color: '#ccc', fontFamily: 'monospace' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* API Config */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            API Configuration
          </div>

          {[
            { label: 'Custom API Key', value: apiKey, setter: setApiKey, type: showKey ? 'text' : 'password', placeholder: 'sk-...' },
            { label: 'Proxy URL', value: proxy, setter: setProxy, type: 'text', placeholder: 'https://proxy.example.com' },
            { label: 'Max Tokens', value: maxTokens, setter: setMaxTokens, type: 'number', placeholder: '4096' },
            { label: 'Request Timeout (s)', value: timeout, setter: setTimeout_, type: 'number', placeholder: '30' },
            { label: 'Max Parallel Tasks', value: maxParallel, setter: setMaxParallel, type: 'number', placeholder: '3' },
          ].map(field => (
            <div key={field.label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>{field.label}</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={e => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  style={{
                    background: '#2a2a2a', border: '1px solid #333', borderRadius: 6,
                    padding: '8px 12px', color: '#fff', fontSize: 13, outline: 'none',
                    width: '100%', fontFamily: 'monospace',
                  }}
                />
                {field.label === 'Custom API Key' && (
                  <button
                    onClick={() => setShowKey(!showKey)}
                    style={{
                      position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 11,
                    }}
                  >
                    {showKey ? 'Hide' : 'Show'}
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Log level */}
          <div>
            <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Log Level</label>
            <select
              value={logLevel}
              onChange={e => setLogLevel(e.target.value)}
              style={{
                background: '#2a2a2a', border: '1px solid #333', borderRadius: 6,
                padding: '8px 12px', color: '#fff', fontSize: 13, outline: 'none', width: '100%',
              }}
            >
              {['debug', 'info', 'warn', 'error'].map(l => (
                <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            Actions
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { label: 'Clear Cache', color: '#2a2a2a', textColor: '#888' },
              { label: 'Export Logs', color: '#2a2a2a', textColor: '#888' },
              { label: 'Reset Settings', color: '#2a2a2a', textColor: '#888' },
              { label: 'Check for Updates', color: '#22c55e15', textColor: '#22c55e' },
            ].map(btn => (
              <button key={btn.label} style={{
                background: btn.color, border: '1px solid #333', color: btn.textColor,
                borderRadius: 6, padding: '7px 14px', fontSize: 12, cursor: 'pointer',
              }}>
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
