'use client';
import React, { useState } from 'react';

export default function ConnectorsScreen() {
  const [connectors, setConnectors] = useState({
    foi: true,
    browser: true,
    computer: true,
    macos: true,
    microsoft: false,
    neon: true
  });

  const toggle = (key: keyof typeof connectors) => {
    setConnectors(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ padding: '48px 64px', maxWidth: 1000, margin: '0 auto', height: '100%', overflowY: 'auto' }}>
      
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#fff' }}>Connectors</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Integrations with external apps, calendars, and services.</p>
      </div>

      {/* Hero Banner */}
      <div style={{ background: '#1c1c1c', borderRadius: 12, padding: 32, marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-light)' }}>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Unite your apps. Unleash your productivity</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>More efficient and enjoyable development.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
           {/* Abstract illustration representation */}
           <div style={{ width: 40, height: 40, background: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>31</div>
           <div style={{ width: 40, height: 40, background: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>N</div>
           <div style={{ width: 40, height: 40, background: 'var(--brand-color)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
             <img src="/foi-icon.png" alt="FOI.AI" style={{ width: 24, height: 24 }} />
           </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Market</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Installed</span>
          <span style={{ background: '#333', padding: '2px 6px', borderRadius: 4, fontSize: 12, color: '#fff' }}>6</span>
        </div>
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>Custom</div>
      
      {/* Custom MCP Servers */}
      <div style={{ border: '1px dashed var(--border-strong)', borderRadius: 8, padding: 48, textAlign: 'center', marginBottom: 32 }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: 12 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>No custom MCP servers yet</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Add a custom MCP server manually or import from JSON.</div>
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>Market</div>

      {/* Market List */}
      <div className="flat-card">
        
        {/* Item 1 */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 32, height: 32, background: '#222', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/gslogo.png" alt="FOI.AI" style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>FOI.AI</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Grant your Agent self-awareness and autonomy: query, configure, and control everything in FOI.AI.</div>
            </div>
          </div>
          <button className={`toggle-switch ${connectors.foi ? 'on' : 'off'}`} onClick={() => toggle('foi')} />
        </div>

        {/* Item 2 */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 32, height: 32, background: '#222', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>Browser</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Connect to your browser for web automation and data extraction.</div>
            </div>
          </div>
          <button className={`toggle-switch ${connectors.browser ? 'on' : 'off'}`} onClick={() => toggle('browser')} />
        </div>

        {/* Item 3 */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 32, height: 32, background: '#222', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>Computer Use</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Allow AI to control mouse, keyboard, and capture screenshots.</div>
            </div>
          </div>
          <button className={`toggle-switch ${connectors.computer ? 'on' : 'off'}`} onClick={() => toggle('computer')} />
        </div>

        {/* Item 4 */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 32, height: 32, background: '#222', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5h-2c0-3-1-4-2-5Z"></path></svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>macOS Apps</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Connect to native macOS apps like Calendar, Reminders, and Notes.</div>
            </div>
          </div>
          <button className={`toggle-switch ${connectors.macos ? 'on' : 'off'}`} onClick={() => toggle('macos')} />
        </div>

        {/* Item 5 */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 32, height: 32, background: '#222', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>Microsoft 365</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Connect to Microsoft 365 services including Mail, Calendar, and Teams.</div>
            </div>
          </div>
          <button className={`toggle-switch ${connectors.microsoft ? 'on' : 'off'}`} onClick={() => toggle('microsoft')} />
        </div>

        {/* Item 6 */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 32, height: 32, background: '#222', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>Neon</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Manage Neon serverless Postgres databases, branches, and projects</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={{ background: '#333', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 16, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Reset</button>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
            <button className={`toggle-switch ${connectors.neon ? 'on' : 'off'}`} onClick={() => toggle('neon')} />
          </div>
        </div>

      </div>

    </div>
  );
}
