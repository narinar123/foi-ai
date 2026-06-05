'use client';
import React from 'react';
import Image from 'next/image';
import { useApp, Screen } from '@/context/AppContext';

// Icons as SVG components
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const LayoutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="7" height="9" x="3" y="3" rx="1.5"/><rect width="7" height="5" x="14" y="3" rx="1.5"/>
    <rect width="7" height="9" x="14" y="12" rx="1.5"/><rect width="7" height="5" x="3" y="16" rx="1.5"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
const PuzzleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" x2="2" y1="8" y2="22"/>
    <line x1="17.5" x2="9" y1="15" y2="15"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const MessageIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const TaskIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);
const HomeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

interface SidebarProps {
  isSettingsMode?: boolean;
  onBack?: () => void;
}

const EXTENSION_SECTIONS = [
  { label: 'Plugins', screen: 'extensions-plugins' as Screen },
  { label: 'Skills', screen: 'extensions-skills' as Screen },
  { label: 'Connectors', screen: 'extensions-connectors' as Screen },
];

const SETTINGS_SECTIONS = [
  { group: 'General', items: [
    { label: 'Preferences', screen: 'preferences' as Screen },
    { label: 'Profile', screen: 'profile' as Screen },
    { label: 'System', screen: 'system' as Screen },
    { label: 'Voice Input', screen: 'voice-input' as Screen },
    { label: 'App Snapshot', screen: 'app-snapshot' as Screen, badge: 'Beta' },
    { label: 'Keyboard', screen: 'keyboard' as Screen },
    { label: 'App update', screen: 'app-update' as Screen },
  ]},
  { group: 'Extensions & integrations', items: [
    { label: 'Desk', screen: 'desk' as Screen, badge: 'Beta' },
  ]},
  { group: 'Advanced', items: [
    { label: 'Secure Workspace', screen: 'secure-workspace' as Screen },
    { label: 'Experimental', screen: 'experimental' as Screen },
  ]},
];

export default function Sidebar({ isSettingsMode, onBack }: SidebarProps) {
  const { currentScreen, setCurrentScreen, activeTab, setActiveTab, tasks, workspace, user } = useApp();

  if (isSettingsMode) {
    return (
      <div style={{
        width: 250,
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-default)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flexShrink: 0,
      }}>
        <div style={{ padding: '20px 16px 12px' }}>
          <button
            onClick={onBack}
            className="sidebar-item"
            style={{ width: '100%', justifyContent: 'flex-start', background: 'none', border: 'none', padding: '10px 12px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to app
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px' }}>
          {SETTINGS_SECTIONS.map(section => (
            <div key={section.group} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', padding: '0 12px 8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {section.group}
              </div>
              {section.items.map(item => (
                <button
                  key={item.label}
                  onClick={() => setCurrentScreen(item.screen)}
                  className={`sidebar-item ${currentScreen === item.screen ? 'active' : ''}`}
                  style={{ width: '100%', justifyContent: 'space-between', background: 'none', border: currentScreen === item.screen ? undefined : 'none' }}
                >
                  <span>{item.label}</span>
                  {item.badge && <span className="badge badge-beta">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: 260,
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-default)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexShrink: 0,
    }}>
      {/* Top toolbar */}
      <div style={{
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <button className="sidebar-item" style={{ padding: '6px 12px', background: 'var(--bg-panel)', border: '1px solid var(--border-default)' }}>
          <PlusIcon />
          <span style={{ fontSize: 13, fontWeight: 500 }}>New Chat</span>
        </button>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="sidebar-item" style={{ padding: '6px', background: 'none', border: 'none' }}>
            <SearchIcon />
          </button>
          <button className="sidebar-item" style={{ padding: '6px', background: 'none', border: 'none' }}>
            <LayoutIcon />
          </button>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: '16px 12px 8px', borderBottom: '1px solid var(--border-subtle)' }}>
        <button
          className={`sidebar-item ${currentScreen === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('home')}
          style={{ width: '100%', justifyContent: 'flex-start', background: 'none', border: currentScreen === 'home' ? undefined : 'none' }}
        >
          <HomeIcon />
          <span>Home</span>
        </button>
        
        {/* Extensions */}
        <div style={{ margin: '4px 0' }}>
          <button
            className="sidebar-item"
            onClick={() => setCurrentScreen('extensions-plugins')}
            style={{ width: '100%', justifyContent: 'flex-start', background: 'none', border: 'none', cursor: 'pointer',
              color: ['extensions-plugins','extensions-skills','extensions-connectors'].includes(currentScreen) ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
          >
            <PuzzleIcon />
            <span>Extensions</span>
          </button>
          {['extensions-plugins','extensions-skills','extensions-connectors'].includes(currentScreen) && (
            <div style={{ paddingLeft: 28, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {EXTENSION_SECTIONS.map(s => (
                <button
                  key={s.screen}
                  onClick={() => setCurrentScreen(s.screen)}
                  className={`sidebar-item ${currentScreen === s.screen ? 'active' : ''}`}
                  style={{ width: '100%', justifyContent: 'flex-start', background: 'none', border: currentScreen === s.screen ? undefined : 'none', padding: '6px 10px' }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className={`sidebar-item ${currentScreen === 'scheduled-tasks' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('scheduled-tasks')}
          style={{ width: '100%', justifyContent: 'flex-start', background: 'none', border: currentScreen === 'scheduled-tasks' ? undefined : 'none' }}
        >
          <ClockIcon />
          <span>Scheduled Tasks</span>
        </button>
        <button
          className={`sidebar-item ${currentScreen === 'im-channel' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('im-channel')}
          style={{ width: '100%', justifyContent: 'flex-start', background: 'none', border: currentScreen === 'im-channel' ? undefined : 'none' }}
        >
          <MessageIcon />
          <span>IM Channel</span>
        </button>
      </div>

      {/* Tasks/Channels tabs */}
      <div style={{ padding: '16px 16px 8px', display: 'flex', gap: 8 }}>
        <button
          className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
          style={{ flex: 1, padding: '6px 0' }}
        >
          Tasks
        </button>
        <button
          className={`tab ${activeTab === 'channels' ? 'active' : ''}`}
          onClick={() => setActiveTab('channels')}
          style={{ flex: 1, padding: '6px 0' }}
        >
          Channels
        </button>
      </div>

      {/* Task list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 16px' }}>
        {activeTab === 'tasks' && (
          <div className="animate-fade-in">
            <div style={{ padding: '8px 12px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recent</div>
            {tasks.map(task => (
              <button
                key={task.id}
                onClick={() => setCurrentScreen('home')}
                className="sidebar-item"
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', display: 'block', padding: '8px 12px', marginBottom: 2 }}
              >
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.title}</div>
              </button>
            ))}
          </div>
        )}
        {activeTab === 'channels' && (
          <div className="animate-fade-in" style={{ padding: '16px', color: 'var(--text-muted)', fontSize: 13, textAlign: 'center' }}>
            No channels configured
          </div>
        )}
      </div>

      {/* User footer */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-sidebar)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="avatar">
            <Image src="/gslogo.png" alt="FOI.AI" width={36} height={36} style={{ borderRadius: 10 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{workspace}</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user.plan}</span>
          </div>
        </div>
        <button
          onClick={() => setCurrentScreen('preferences')}
          className="sidebar-item"
          style={{ background: 'none', border: 'none', padding: 8, borderRadius: 8 }}
          aria-label="Settings"
        >
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
}
