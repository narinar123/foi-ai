'use client';
import React, { useState } from 'react';

export default function PreferencesScreen() {
  const [theme, setTheme] = useState('Dark');
  const [promptSuggestions, setPromptSuggestions] = useState(true);
  const [expandTools, setExpandTools] = useState(true);
  const [showExecution, setShowExecution] = useState(true);

  return (
    <div style={{ padding: '48px 64px', maxWidth: 900, margin: '0 auto', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#fff' }}>Preferences</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Language, theme, typography, and panel layout preferences.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Group 1 */}
        <div className="flat-card">
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Language</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Select interface language</div>
            </div>
            <button className="dropdown-btn">English <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
          </div>
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Theme brightness</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Light, dark, or follow your system setting.</div>
            </div>
            <button className="dropdown-btn">Dark <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
          </div>
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Interface style</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Default, glass, classic, or parchment appearance.</div>
            </div>
            <button className="dropdown-btn">Glass <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
          </div>
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Chat typeface</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Sans or serif for conversation content.</div>
            </div>
            <button className="dropdown-btn">Sans-serif <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
          </div>
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Conversation text size</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Adjusts message text size in chat.</div>
            </div>
            <button className="dropdown-btn">Small <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
          </div>
        </div>

        {/* Group 2 */}
        <div className="flat-card">
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Task Panel Position</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Where the task panel is displayed in the workspace</div>
            </div>
            <button className="dropdown-btn">Docked on the right <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
          </div>
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Preview Mode</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>How to preview generated files (images, markdown)</div>
            </div>
            <button className="dropdown-btn">New window <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
          </div>
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
            <div style={{ flex: 1, paddingRight: 32 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Prompt Suggestions</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>When enabled, AI will generate follow-up suggestions after completing a response. Requires starting a new conversation to take effect.</div>
            </div>
            <button className={`toggle-switch ${promptSuggestions ? 'on' : 'off'}`} onClick={() => setPromptSuggestions(!promptSuggestions)} />
          </div>
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
            <div style={{ flex: 1, paddingRight: 32 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Expand tool calls by default</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>When off, tool calls in chat start collapsed. When on, newly shown tool blocks open expanded; you can still collapse them manually.</div>
            </div>
            <button className={`toggle-switch ${expandTools ? 'on' : 'off'}`} onClick={() => setExpandTools(!expandTools)} />
          </div>
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1, paddingRight: 32 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Show tool execution steps in IM channels</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>When on, IM channel replies include each tool execution step (search results, file reads, code execution, etc.). When off, only the final reply is shown for cleaner messages.</div>
            </div>
            <button className={`toggle-switch ${showExecution ? 'on' : 'off'}`} onClick={() => setShowExecution(!showExecution)} />
          </div>
        </div>
      </div>
    </div>
  );
}
