'use client';
import React from 'react';
import { useApp, Screen } from '@/context/AppContext';

// Icons as SVG components
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const LayoutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/>
    <rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
const PuzzleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" x2="2" y1="8" y2="22"/>
    <line x1="17.5" x2="9" y1="15" y2="15"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const MessageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const TaskIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
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
        width: 200,
        background: '#111',
        borderRight: '1px solid #222',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flexShrink: 0,
      }}>
        <div style={{ padding: '16px 12px 8px' }}>
          <button
            onClick={onBack}
            className="sidebar-item"
            style={{ width: '100%', justifyContent: 'flex-start', color: '#999', gap: 6 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to app
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          {SETTINGS_SECTIONS.map(section => (
            <div key={section.group} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#555', padding: '4px 12px 6px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {section.group}
              </div>
              {section.items.map(item => (
                <button
                  key={item.label}
                  onClick={() => setCurrentScreen(item.screen)}
                  className={`sidebar-item ${currentScreen === item.screen ? 'active' : ''}`}
                  style={{ width: '100%', justifyContent: 'space-between', background: 'none', border: 'none' }}
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
      width: 250,
      background: '#111',
      borderRight: '1px solid #222',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexShrink: 0,
    }}>
      {/* Top toolbar */}
      <div style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        borderBottom: '1px solid #1f1f1f',
      }}>
        <button className="sidebar-item" style={{ padding: '4px 8px', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
          <PlusIcon />
          <span style={{ fontSize: 13 }}>New Task</span>
        </button>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="sidebar-item" style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
            <SearchIcon />
          </button>
          <button className="sidebar-item" style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
            <LayoutIcon />
          </button>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: '8px', borderBottom: '1px solid #1f1f1f' }}>
        {/* Extensions */}
        <div style={{ marginBottom: 2 }}>
          <button
            className="sidebar-item"
            onClick={() => setCurrentScreen('extensions-plugins')}
            style={{ width: '100%', justifyContent: 'flex-start', background: 'none', border: 'none', cursor: 'pointer',
              color: ['extensions-plugins','extensions-skills','extensions-connectors'].includes(currentScreen) ? '#fff' : '#999'
            }}
          >
            <PuzzleIcon />
            <span>Extensions</span>
          </button>
          {['extensions-plugins','extensions-skills','extensions-connectors'].includes(currentScreen) && (
            <div style={{ paddingLeft: 24 }}>
              {EXTENSION_SECTIONS.map(s => (
                <button
                  key={s.screen}
                  onClick={() => setCurrentScreen(s.screen)}
                  className={`sidebar-item ${currentScreen === s.screen ? 'active' : ''}`}
                  style={{ width: '100%', justifyContent: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}
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
          style={{ width: '100%', justifyContent: 'flex-start', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <ClockIcon />
          <span>Scheduled Tasks</span>
        </button>
        <button
          className={`sidebar-item ${currentScreen === 'im-channel' ? 'active' : ''}`}
          onClick={() => setCurrentScreen('im-channel')}
          style={{ width: '100%', justifyContent: 'flex-start', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <MessageIcon />
          <span>IM Channel</span>
        </button>
      </div>

      {/* Tasks/Channels tabs */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #1f1f1f', display: 'flex', gap: 4 }}>
        <button
          className={`channels-tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', flex: 1, justifyContent: 'center' }}
        >
          <TaskIcon />
          <span>Tasks</span>
        </button>
        <button
          className={`channels-tab ${activeTab === 'channels' ? 'active' : ''}`}
          onClick={() => setActiveTab('channels')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', flex: 1, justifyContent: 'center' }}
        >
          <MessageIcon />
          <span>Channels</span>
        </button>
      </div>

      {/* Task list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {activeTab === 'tasks' && (
          <>
            <div style={{ padding: '4px 12px', fontSize: 11, color: '#555', fontWeight: 500, marginBottom: 4 }}>Drafts</div>
            <div className="task-item" style={{ color: '#555' }}>#</div>
            <div style={{ padding: '4px 12px', fontSize: 11, color: '#555', fontWeight: 500, margin: '8px 0 4px' }}>Tasks</div>
            {tasks.map(task => (
              <button
                key={task.id}
                onClick={() => setCurrentScreen('home')}
                className="task-item"
                style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'block' }}
              >
                {task.title}
              </button>
            ))}
          </>
        )}
        {activeTab === 'channels' && (
          <div style={{ padding: '8px 12px', color: '#555', fontSize: 12 }}>
            No channels yet
          </div>
        )}
      </div>

      {/* User footer */}
      <div style={{
        padding: '12px',
        borderTop: '1px solid #1f1f1f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>
            {workspace[0]}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>{workspace}</div>
            <div style={{ fontSize: 11, color: '#555' }}>{user.plan}</div>
          </div>
        </div>
        <button
          onClick={() => setCurrentScreen('preferences')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', padding: 4, borderRadius: 4 }}
          className="sidebar-item"
        >
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
}
