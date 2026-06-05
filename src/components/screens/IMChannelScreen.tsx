'use client';
import React, { useState } from 'react';

interface Channel {
  id: string;
  name: string;
  platform: 'slack' | 'teams' | 'discord';
  workspace: string;
  autoReply: boolean;
  active: boolean;
}

const INITIAL_CHANNELS: Channel[] = [
  { id: '1', name: '#engineering', platform: 'slack', workspace: 'FOI.AI Inc', autoReply: true, active: true },
  { id: '2', name: '#support-triage', platform: 'slack', workspace: 'FOI.AI Inc', autoReply: false, active: true },
  { id: '3', name: 'Customer Success', platform: 'teams', workspace: 'Global', autoReply: true, active: false },
  { id: '4', name: '#community', platform: 'discord', workspace: 'FOI Developers', autoReply: false, active: true },
];

export default function IMChannelScreen() {
  const [channels, setChannels] = useState<Channel[]>(INITIAL_CHANNELS);

  const toggleAutoReply = (id: string) => {
    setChannels(prev => prev.map(c => c.id === id ? { ...c, autoReply: !c.autoReply } : c));
  };

  const toggleActive = (id: string) => {
    setChannels(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  return (
    <div style={{ padding: '48px 64px', maxWidth: 1200, margin: '0 auto', height: '100%', overflowY: 'auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#fff' }}>IM Channels</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Manage connected messaging channels where FOI.AI can read, reply, and execute tasks.</p>
        </div>
        <button style={{ background: 'var(--brand-color)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Connect Channel
        </button>
      </div>

      <div className="flat-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#1a1a1a', borderBottom: '1px solid var(--border-strong)' }}>
            <tr>
              <th style={{ padding: '16px 24px', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Channel Name</th>
              <th style={{ padding: '16px 24px', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Platform</th>
              <th style={{ padding: '16px 24px', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Workspace</th>
              <th style={{ padding: '16px 24px', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Auto-Reply</th>
              <th style={{ padding: '16px 24px', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'right' }}>Active Sync</th>
            </tr>
          </thead>
          <tbody>
            {channels.map(channel => (
              <tr key={channel.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 600, color: '#fff' }}>
                  {channel.name}
                </td>
                <td style={{ padding: '16px 24px', fontSize: 13, color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: channel.platform === 'slack' ? '#4A154B' : channel.platform === 'teams' ? '#5A5EB9' : '#5865F2' }}></div>
                    {channel.platform}
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: 13, color: 'var(--text-secondary)' }}>{channel.workspace}</td>
                <td style={{ padding: '16px 24px' }}>
                  <button 
                    className={`toggle-switch ${channel.autoReply ? 'on' : 'off'}`} 
                    onClick={() => toggleAutoReply(channel.id)}
                  />
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button 
                    className={`toggle-switch ${channel.active ? 'on' : 'off'}`} 
                    onClick={() => toggleActive(channel.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
