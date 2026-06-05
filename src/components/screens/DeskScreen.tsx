'use client';
import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
}

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Write Marketing Copy', description: 'Draft the Q3 campaign copy for LinkedIn.', status: 'todo' },
  { id: '2', title: 'Data Analysis', description: 'Analyze the recent user engagement data.', status: 'in-progress' },
  { id: '3', title: 'Deploy App', description: 'Push the latest build to Vercel production.', status: 'done' },
];

export default function DeskScreen() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const moveTask = (id: string, newStatus: 'todo' | 'in-progress' | 'done') => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const columns = [
    { id: 'todo', title: 'To Do', color: '#6b7280' },
    { id: 'in-progress', title: 'In Progress', color: '#3b82f6' },
    { id: 'done', title: 'Done', color: '#22c55e' }
  ] as const;

  return (
    <div style={{ padding: '32px 48px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#fff' }}>Desk Kanban</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Track FOI.AI agent tasks and your personal tasks across stages.</p>
        </div>
        <button style={{ background: 'var(--brand-color)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          + New Task
        </button>
      </div>

      <div style={{ display: 'flex', gap: 24, flex: 1, overflowX: 'auto', minHeight: 0 }}>
        {columns.map(col => (
          <div key={col.id} style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.02)', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: col.color }}></div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{col.title}</h3>
              <span style={{ marginLeft: 'auto', background: '#333', color: 'var(--text-secondary)', fontSize: 12, padding: '2px 8px', borderRadius: 12 }}>
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {tasks.filter(t => t.status === col.id).map(task => (
                <div key={task.id} className="flat-card" style={{ padding: 16, cursor: 'grab' }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{task.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 16 }}>{task.description}</p>
                  
                  <div style={{ display: 'flex', gap: 8 }}>
                    {col.id !== 'todo' && (
                      <button 
                        onClick={() => moveTask(task.id, col.id === 'done' ? 'in-progress' : 'todo')}
                        style={{ flex: 1, background: '#222', color: 'var(--text-secondary)', border: '1px solid var(--border-light)', borderRadius: 6, padding: '4px', fontSize: 11, cursor: 'pointer' }}
                      >
                        ← Move back
                      </button>
                    )}
                    {col.id !== 'done' && (
                      <button 
                        onClick={() => moveTask(task.id, col.id === 'todo' ? 'in-progress' : 'done')}
                        style={{ flex: 1, background: '#222', color: 'var(--text-secondary)', border: '1px solid var(--border-light)', borderRadius: 6, padding: '4px', fontSize: 11, cursor: 'pointer' }}
                      >
                        Move forward →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
