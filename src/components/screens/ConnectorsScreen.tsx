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
  { id: 'c1', name: 'Google Drive', status: 'connected', icon: '/google-drive.png', lastSync: '2 mins ago' },
  { id: 'c2', name: 'Slack', status: 'connected', icon: '/slack.png', lastSync: '5 mins ago' },
  { id: 'c3', name: 'Salesforce', status: 'disconnected', icon: '/salesforce.png' },
  { id: 'c4', name: 'Jira', status: 'disconnected', icon: '/jira.png' },
  { id: 'c5', name: 'Zendesk', status: 'disconnected', icon: '/zendesk.png' },
  { id: 'c6', name: 'HubSpot', status: 'disconnected', icon: '/hubspot.png' },
];

export default function ConnectorsScreen() {
  const [connectors, setConnectors] = useState<Connector[]>(INITIAL_CONNECTORS);

  const toggleConnector = (id: string) => {
    setConnectors(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: c.status === 'connected' ? 'disconnected' : 'connected',
          lastSync: c.status === 'disconnected' ? 'Just now' : undefined
        };
      }
      return c;
    }));
  };

  return (
    <div style={{ padding: '48px 64px', maxWidth: 1000, margin: '0 auto', height: '100%', overflowY: 'auto' }}>
      
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#fff' }}>Connectors</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Connect FOI.AI to your existing tools and platforms.</p>
      </div>

      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(90deg, #181818 0%, rgba(217, 119, 87, 0.15) 100%)', borderRadius: 12, padding: 32, marginBottom: 32, border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Unite your apps</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Connect FOI.AI to your data sources for seamless context and execution.</p>
        </div>
        <button style={{ background: 'var(--brand-color)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Explore Market
        </button>
      </div>

      <div style={{ display: 'flex', gap: 32 }}>
        
        {/* Market Connectors */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Market Connectors</h3>
          <div className="flat-card" style={{ display: 'flex', flexDirection: 'column' }}>
            {connectors.map(c => (
              <div key={c.id} style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, background: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Placeholder for real icons */}
                    <div style={{ width: 20, height: 20, background: '#ccc', borderRadius: 4 }}></div>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {c.status === 'connected' ? `Connected • Last sync: ${c.lastSync}` : 'Not connected'}
                    </div>
                  </div>
                </div>
                <button 
                  className={`toggle-switch ${c.status === 'connected' ? 'on' : 'off'}`} 
                  onClick={() => toggleConnector(c.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Custom Connectors */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Custom Connectors</h3>
          <div className="flat-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderStyle: 'dashed' }}>
            <div style={{ width: 48, height: 48, background: '#222', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: 'var(--text-secondary)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            </div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Build your own</h4>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, maxWidth: 280 }}>
              Connect internal databases, APIs, or custom software using FOI.AI webhooks and API keys.
            </p>
            <button style={{ background: '#222', color: '#fff', border: '1px solid var(--border-light)', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Create Custom Connector
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
