'use client';
import React, { useState } from 'react';

const CONNECTORS = [
  { id: 'google', icon: '🔵', name: 'Google Workspace', desc: 'Connect Gmail, Drive, Calendar, and Docs.', connected: true, type: 'OAuth' },
  { id: 'github', icon: '⚫', name: 'GitHub', desc: 'Access repositories, issues, and pull requests.', connected: true, type: 'Token' },
  { id: 'notion', icon: '⬜', name: 'Notion', desc: 'Read and write to Notion pages and databases.', connected: false, type: 'OAuth' },
  { id: 'slack', icon: '🟣', name: 'Slack', desc: 'Send messages and access Slack channels.', connected: false, type: 'OAuth' },
  { id: 'jira', icon: '🔷', name: 'Jira / Confluence', desc: 'Manage issues, epics, and wiki pages.', connected: false, type: 'API Key' },
  { id: 'linear', icon: '🔵', name: 'Linear', desc: 'Track issues and manage engineering projects.', connected: false, type: 'Token' },
  { id: 'airtable', icon: '🟡', name: 'Airtable', desc: 'Read and write Airtable bases and records.', connected: false, type: 'API Key' },
  { id: 'dropbox', icon: '🔵', name: 'Dropbox', desc: 'Access and manage Dropbox files and folders.', connected: false, type: 'OAuth' },
  { id: 'hubspot', icon: '🟠', name: 'HubSpot CRM', desc: 'Manage contacts, deals, and email campaigns.', connected: false, type: 'OAuth' },
  { id: 'stripe', icon: '🟣', name: 'Stripe', desc: 'Access payment data, invoices, and customers.', connected: false, type: 'API Key' },
];

export default function ConnectorsScreen() {
  const [connectedIds, setConnectedIds] = useState<Set<string>>(
    new Set(CONNECTORS.filter(c => c.connected).map(c => c.id))
  );
  const [connecting, setConnecting] = useState<string | null>(null);

  const toggle = (id: string) => {
    if (connectedIds.has(id)) {
      setConnectedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
      return;
    }
    setConnecting(id);
    setTimeout(() => {
      setConnectedIds(prev => new Set([...prev, id]));
      setConnecting(null);
    }, 1200);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Connectors</h1>
          <p style={{ fontSize: 13, color: '#666' }}>Connect external services so QoderWork can act on your behalf.</p>
        </div>

        {/* Status bar */}
        <div style={{
          background: '#1a2e1a', border: '1px solid #2a4a2a', borderRadius: 8,
          padding: '12px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div className="notif-dot" />
          <span style={{ fontSize: 13, color: '#22c55e' }}>
            {connectedIds.size} connector{connectedIds.size !== 1 ? 's' : ''} active
          </span>
          <span style={{ fontSize: 13, color: '#555' }}>
            · QoderWork can use these services automatically in your tasks
          </span>
        </div>

        {/* Connector list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {CONNECTORS.map((connector, i) => (
            <div
              key={connector.id}
              className="connector-item"
              style={{ borderBottom: i < CONNECTORS.length - 1 ? '1px solid #222' : 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, background: '#2a2a2a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>
                  {connector.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{connector.name}</span>
                    <span style={{
                      fontSize: 10, padding: '1px 6px', borderRadius: 3,
                      background: '#2a2a2a', color: '#666', border: '1px solid #333',
                    }}>
                      {connector.type}
                    </span>
                    {connectedIds.has(connector.id) && (
                      <span style={{ fontSize: 10, color: '#22c55e' }}>● Connected</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{connector.desc}</div>
                </div>
              </div>
              <button
                onClick={() => toggle(connector.id)}
                disabled={connecting === connector.id}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  fontSize: 12,
                  cursor: connecting === connector.id ? 'wait' : 'pointer',
                  border: connectedIds.has(connector.id) ? '1px solid #333' : '1px solid #22c55e',
                  background: connectedIds.has(connector.id) ? '#2a2a2a' : '#22c55e15',
                  color: connectedIds.has(connector.id) ? '#666' : '#22c55e',
                  transition: 'all 0.15s',
                  minWidth: 90,
                }}
              >
                {connecting === connector.id ? 'Connecting...' : connectedIds.has(connector.id) ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
