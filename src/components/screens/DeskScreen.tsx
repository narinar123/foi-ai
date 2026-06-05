'use client';
import React, { useState } from 'react';

export default function DeskScreen() {
  const [activeView, setActiveView] = useState<'board' | 'list' | 'calendar'>('board');

  const columns = [
    { id: 'todo', label: 'To Do', color: '#555', items: [
      { id: '1', title: 'Create social media strategy', priority: 'high', tags: ['Marketing'] },
      { id: '2', title: 'Research competitor products', priority: 'medium', tags: ['Research'] },
      { id: '3', title: 'Design new landing page', priority: 'low', tags: ['Design'] },
    ]},
    { id: 'in-progress', label: 'In Progress', color: '#f59e0b', items: [
      { id: '4', title: 'Organize file system', priority: 'high', tags: ['Files', 'AI'] },
      { id: '5', title: 'Write weekly report', priority: 'medium', tags: ['Writing'] },
    ]},
    { id: 'review', label: 'Review', color: '#6366f1', items: [
      { id: '6', title: 'Monthly expense report', priority: 'high', tags: ['Finance'] },
    ]},
    { id: 'done', label: 'Done', color: '#22c55e', items: [
      { id: '7', title: 'Set up GitHub repos', priority: 'low', tags: ['Dev'] },
      { id: '8', title: 'Update team contacts', priority: 'low', tags: ['Admin'] },
    ]},
  ];

  const PRIORITY_COLOR: Record<string, string> = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#22c55e',
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      {/* Desk header */}
      <div style={{
        height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', borderBottom: '1px solid #222', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h1 style={{ fontSize: 16, fontWeight: 600 }}>Desk</h1>
          <span className="badge badge-beta">Beta</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['board', 'list', 'calendar'] as const).map(view => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              style={{
                background: activeView === view ? '#2a2a2a' : 'none',
                border: activeView === view ? '1px solid #333' : '1px solid transparent',
                borderRadius: 5, padding: '4px 10px', fontSize: 12, cursor: 'pointer',
                color: activeView === view ? '#fff' : '#666', transition: 'all 0.15s', textTransform: 'capitalize',
              }}
            >
              {view === 'board' ? '⬛ Board' : view === 'list' ? '☰ List' : '📅 Calendar'}
            </button>
          ))}
          <button style={{
            background: '#22c55e15', border: '1px solid #22c55e', color: '#22c55e',
            borderRadius: 5, padding: '4px 10px', fontSize: 12, cursor: 'pointer', marginLeft: 8,
          }}>
            + Add Task
          </button>
        </div>
      </div>

      {/* Board view */}
      {activeView === 'board' && (
        <div style={{ flex: 1, overflowX: 'auto', overflowY: 'hidden', padding: '20px' }}>
          <div style={{ display: 'flex', gap: 16, height: '100%', minWidth: 'max-content' }}>
            {columns.map(col => (
              <div key={col.id} style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {col.label}
                  </span>
                  <span style={{ fontSize: 11, color: '#444', marginLeft: 'auto' }}>{col.items.length}</span>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {col.items.map(item => (
                    <div key={item.id} className="card" style={{ padding: '12px 14px', cursor: 'grab' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>{item.title}</span>
                        <div style={{
                          width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: 3,
                          background: PRIORITY_COLOR[item.priority],
                        }} />
                      </div>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {item.tags.map(tag => (
                          <span key={tag} style={{
                            fontSize: 10, padding: '1px 6px', borderRadius: 3,
                            background: '#2a2a2a', color: '#666', border: '1px solid #333',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button style={{
                    width: '100%', background: 'none', border: '1px dashed #333',
                    borderRadius: 6, padding: '8px', color: '#555', fontSize: 12, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                  }}>
                    + Add card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List view */}
      {activeView === 'list' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {columns.flatMap(col => col.items.map(item => (
            <div key={item.id} className="card" style={{
              padding: '12px 16px', marginBottom: 8,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: PRIORITY_COLOR[item.priority], flexShrink: 0 }} />
              <span style={{ fontSize: 13, flex: 1 }}>{item.title}</span>
              <span style={{ fontSize: 11, color: '#555', background: '#222', border: '1px solid #333', padding: '2px 8px', borderRadius: 3 }}>
                {col.label}
              </span>
              {item.tags.map(tag => (
                <span key={tag} style={{ fontSize: 10, padding: '1px 6px', borderRadius: 3, background: '#2a2a2a', color: '#666', border: '1px solid #333' }}>
                  {tag}
                </span>
              ))}
            </div>
          )))}
        </div>
      )}

      {/* Calendar view placeholder */}
      {activeView === 'calendar' && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
            <div style={{ fontSize: 14 }}>Calendar view coming soon</div>
            <div style={{ fontSize: 12, marginTop: 4, color: '#444' }}>Switch to Board or List view</div>
          </div>
        </div>
      )}
    </div>
  );
}
