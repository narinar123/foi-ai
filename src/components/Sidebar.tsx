'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useStore } from '@/store/useStore';
export default function Sidebar() {
  const { currentScreen, setCurrentScreen } = useApp();
  const [tab, setTab] = useState<'Tasks' | 'Channels'>('Tasks');
  const [extensionsOpen, setExtensionsOpen] = useState(false);
  const { tasks } = useStore();

  const handleExtensionClick = (screen: string) => {
    setCurrentScreen(screen as any);
  };

  return (
    <div style={{ width: 260, background: 'var(--bg-sidebar)', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-light)', height: '100%' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 16px 8px 16px', gap: 12, color: 'var(--text-secondary)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
      </div>

      <div style={{ padding: '0 12px', flex: 1, overflowY: 'auto' }}>
        
        {/* Navigation */}
        <button className="sidebar-item" onClick={() => setCurrentScreen('home')} style={{ color: currentScreen === 'home' ? 'var(--text-primary)' : '' }}>
          <span style={{ fontSize: 16 }}>+</span> New Task
        </button>

        <div style={{ marginTop: 12 }}>
          <button className="sidebar-item" onClick={() => setExtensionsOpen(!extensionsOpen)} style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              Extensions
            </div>
            <svg style={{ transform: extensionsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          
          {extensionsOpen && (
            <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 2, borderLeft: '1px solid var(--border-strong)', marginLeft: 18, marginTop: 4, marginBottom: 4 }}>
              <button className={`sidebar-item ${currentScreen === 'extensions-plugins' ? 'active' : ''}`} onClick={() => handleExtensionClick('extensions-plugins')}>Plugins</button>
              <button className={`sidebar-item ${currentScreen === 'extensions-skills' ? 'active' : ''}`} onClick={() => handleExtensionClick('extensions-skills')}>Skills</button>
              <button className={`sidebar-item ${currentScreen === 'extensions-connectors' ? 'active' : ''}`} onClick={() => handleExtensionClick('extensions-connectors')}>Connectors</button>
            </div>
          )}
        </div>

        <button className={`sidebar-item ${currentScreen === 'scheduled-tasks' ? 'active' : ''}`} onClick={() => setCurrentScreen('scheduled-tasks')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Scheduled Tasks
        </button>

        <button className={`sidebar-item ${currentScreen === 'im-channel' ? 'active' : ''}`} onClick={() => setCurrentScreen('im-channel')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          IM Channel
        </button>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#1a1a1a', borderRadius: 8, padding: 4, margin: '20px 0 16px 0', border: '1px solid var(--border-strong)' }}>
          <button className={`pill-tab ${tab === 'Tasks' ? 'active' : ''}`} onClick={() => setTab('Tasks')}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
            Tasks
          </button>
          <button className={`pill-tab ${tab === 'Channels' ? 'active' : ''}`} onClick={() => setTab('Channels')}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Channels
          </button>
        </div>

        {tab === 'Tasks' ? (
          <>
            {/* Drafts */}
            <div style={{ fontSize: 10, fontWeight: 600, color: '#555', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>Drafts</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '4px 4px 16px 4px', fontStyle: 'italic' }}>No drafts yet</div>

            {/* Dynamic Tasks List */}
            <div style={{ fontSize: 10, fontWeight: 600, color: '#555', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>Tasks</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tasks.length > 0 ? tasks.map(task => (
                <button key={task.id} className="sidebar-item" onClick={() => setCurrentScreen('desk')} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                  {task.title}
                </button>
              )) : (
                <div style={{ fontSize: 13, color: 'var(--text-muted)', paddingLeft: 4 }}>No tasks created</div>
              )}
            </div>
          </>
        ) : (
          <div style={{ fontSize: 13, color: 'var(--text-muted)', paddingLeft: 4 }}>No channels joined</div>
        )}

      </div>

      {/* User Footer */}
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, background: 'var(--brand-color)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
            <img src="/foi-icon.png" alt="FOI.AI" style={{ width: 16, height: 16 }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>pranu21m@foi.ai</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Universal User (Pro)</div>
          </div>
        </div>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setCurrentScreen('preferences')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>
      </div>
    </div>
  );
}
