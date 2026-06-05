'use client';
import React, { useState } from 'react';
import Dropdown from '@/components/Dropdown';

const PLUGINS = [
  { id: '1', name: 'Product Management', desc: 'An end-to-end product management toolkit covering eight core workflows: PRD writing, user story breakdown, competitive...', skills: 8, connectors: 3, version: 'v1.1.1', icon: 'M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4' },
  { id: '2', name: 'Corporate Legal', desc: 'Comprehensive corporate legal assistant: draft legal documents (demand letters, complaints, defense statements, legal...', skills: 8, connectors: 1, version: 'v1.1.1', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
  { id: '3', name: 'Corporate Finance & Tax', desc: 'Corporate finance and tax management toolkit covering financial analysis, journal entries, budget analysis, VAT management,...', skills: 9, connectors: 1, version: 'v1.1.1', icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
  { id: '4', name: 'Contract Management', desc: 'Full-lifecycle contract management: review contract risks (red/yellow/green grading), draft contract first drafts (Word...', skills: 6, connectors: 1, version: 'v1.1.1', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' },
  { id: '5', name: 'Consulting Delivery', desc: 'Full-cycle management consulting toolkit covering seven core scenarios: desk research, interview notes, framework design,...', skills: 7, connectors: 1, version: 'v1.1.1', icon: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' },
  { id: '6', name: 'Marketing', desc: 'Full-spectrum marketing toolkit covering copywriting, ad compliance, competitive tracking, campaign planning, social...', skills: 8, connectors: 2, version: 'v1.1.1', icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' },
  { id: '7', name: 'Equity Research', desc: 'End-to-end equity research toolkit for sell-side and buy-side analysts, covering deep-dive reports, industry research, annual...', skills: 8, connectors: 1, version: 'v1.1.1', icon: 'M3 3v18h18M18 9l-5 5-4-4-5 5' },
  { id: '8', name: 'Investment Banking', desc: 'AI-powered investment banking assistant covering six core workflows: IPO prospectus drafting, M&A advisory reports, bon...', skills: 6, connectors: 1, version: 'v1.1.1', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
  { id: '9', name: 'Private Equity', desc: 'Comprehensive toolkit for private equity firms covering deal sourcing, due diligence, portfolio management, and exit strat...', skills: 7, connectors: 2, version: 'v1.1.1', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' },
  { id: '10', name: 'Wealth Management', desc: 'AI assistant for wealth managers covering client onboarding, portfolio optimization, tax harvesting, and retirement plann...', skills: 5, connectors: 1, version: 'v1.1.1', icon: 'M2 20h20M5 20V4h14v16M9 20v-6h6v6M9 8h6M9 12h6' },
];

export default function PluginsScreen() {
  const [filter, setFilter] = useState('all');
  
  return (
    <div style={{ padding: '48px 64px', maxWidth: 1200, margin: '0 auto', height: '100%', overflowY: 'auto' }}>
      
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#fff' }}>Plugins</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>The Plugin is a role- or industry-oriented toolkit. Simply type @ or / in the chat box to use it.</p>
      </div>

      {/* Featured Banner */}
      <div style={{ background: 'linear-gradient(90deg, #181818 0%, rgba(217, 119, 87, 0.15) 100%)', borderRadius: 12, padding: 32, marginBottom: 16, border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--brand-color)' }}></div>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--brand-color)' }}></div>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--brand-color)' }}></div>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Marketing</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Copywriting, competitor tracking, and campaign planning in one ...</p>
        </div>
        <button style={{ background: '#222', color: '#fff', border: '1px solid var(--border-light)', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Create with FOI.AI
        </button>
      </div>

      {/* Feedback Bar */}
      <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: 8, padding: '12px 16px', marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#3b82f6', fontSize: 13 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          Want more Plugins? Tell us the industries or scenarios you're interested in.
        </div>
        <button style={{ background: 'transparent', border: 'none', color: '#3b82f6', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Give feedback</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>Suite Marketplace</h3>
          <span style={{ background: '#333', padding: '2px 6px', borderRadius: 4, fontSize: 12, color: '#fff' }}>10</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginLeft: 8 }}>Installed</span>
          <span style={{ background: '#222', padding: '2px 6px', borderRadius: 4, fontSize: 12, color: 'var(--text-secondary)' }}>0</span>
        </div>
        <Dropdown
          value={filter}
          onChange={setFilter}
          options={[
            { label: 'All', value: 'all' },
            { label: 'Installed', value: 'installed' },
            { label: 'Updates', value: 'updates' }
          ]}
          icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>}
        />
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {PLUGINS.map(plugin => (
          <div key={plugin.id} className="flat-card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, background: '#222', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={plugin.icon}></path></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{plugin.name}</h4>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>@FOI.AI</div>
                </div>
              </div>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
            
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 24, flex: 1 }}>
              {plugin.desc}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <span>{plugin.skills} skills</span>
                <span>{plugin.connectors} connector{plugin.connectors > 1 ? 's' : ''}</span>
              </div>
              <span>{plugin.version}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
