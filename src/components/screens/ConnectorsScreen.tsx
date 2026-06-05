'use client';
import React, { useState } from 'react';

interface Connector {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
  icon: string;
  lastSync?: string;
}

const INITIAL_CONNECTORS: Connector[] = [
  { id: 'c1', name: 'Google Drive', status: 'connected', icon: '📁', lastSync: '10 mins ago' },
  { id: 'c2', name: 'Slack', status: 'connected', icon: '💬', lastSync: '2 mins ago' },
  { id: 'c3', name: 'GitHub', status: 'disconnected', icon: '🐙' },
  { id: 'c4', name: 'Notion', status: 'disconnected', icon: '📓' },
  { id: 'c5', name: 'Jira', status: 'connected', icon: '📋', lastSync: '1 hour ago' },
  { id: 'c6', name: 'Linear', status: 'disconnected', icon: '⚡' },
];

export default function ConnectorsScreen() {
  const [connectors, setConnectors] = useState<Connector[]>(INITIAL_CONNECTORS);

  const toggleConnection = (id: string) => {
    setConnectors(prev => prev.map(c => {
      if (c.id === id) {
        const isConnected = c.status === 'connected';
        return { 
          ...c, 
          status: isConnected ? 'disconnected' : 'connected',
          lastSync: isConnected ? undefined : 'Just now'
        };
      }
      return c;
    }));
  };

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: '0 auto', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Connectors</h1>
        <p style={{ color: 'var(--text-muted)' }}>Link your external accounts to allow FOI.AI to manage them.</p>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {connectors.map((connector, idx) => (
          <div 
            key={connector.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '20px 24px',
              borderBottom: idx < connectors.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-panel-hover)'} 
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.05)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: '1px solid var(--border-subtle)' }}>
                {connector.icon}
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{connector.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: connector.status === 'connected' ? 'var(--success)' : 'var(--text-muted)' }} />
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{connector.status}</span>
                  </div>
                  {connector.lastSync && (
                    <>
                      <span style={{ color: 'var(--border-strong)' }}>•</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Synced {connector.lastSync}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => toggleConnection(connector.id)}
              className={connector.status === 'connected' ? 'btn-secondary' : 'btn-primary'}
            >
              {connector.status === 'connected' ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
