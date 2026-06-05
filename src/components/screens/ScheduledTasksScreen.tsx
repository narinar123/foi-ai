'use client';
import React, { useState } from 'react';

interface ScheduledTask {
  id: string;
  name: string;
  schedule: string;
  nextRun: string;
  status: 'active' | 'paused';
  description: string;
}

const INITIAL_TASKS: ScheduledTask[] = [
  { id: '1', name: 'Daily Standup Summary', schedule: 'Every day at 9:00 AM', nextRun: 'Tomorrow 9:00 AM', status: 'active', description: 'Summarizes yesterday’s commits and PRs into a standup format.' },
  { id: '2', name: 'Weekly Analytics Report', schedule: 'Every Monday at 8:00 AM', nextRun: 'Monday 8:00 AM', status: 'active', description: 'Compiles traffic and usage analytics and posts to #general.' },
  { id: '3', name: 'Database Backup check', schedule: 'Every Sunday at 2:00 AM', nextRun: 'Sunday 2:00 AM', status: 'paused', description: 'Verifies the integrity of the weekly automated backups.' },
];

export default function ScheduledTasksScreen() {
  const [tasks, setTasks] = useState<ScheduledTask[]>(INITIAL_TASKS);

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'active' ? 'paused' : 'active' } : t));
  };

  return (
    <div style={{ padding: '48px 64px', maxWidth: 1200, margin: '0 auto', height: '100%', overflowY: 'auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#fff' }}>Scheduled Tasks</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Manage automated tasks that run on a recurring schedule.</p>
        </div>
        <button style={{ background: 'var(--brand-color)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          + Create Task
        </button>
      </div>

      <div className="flat-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#1a1a1a', borderBottom: '1px solid var(--border-strong)' }}>
            <tr>
              <th style={{ padding: '16px 24px', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', width: '25%' }}>Task Name</th>
              <th style={{ padding: '16px 24px', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', width: '25%' }}>Schedule</th>
              <th style={{ padding: '16px 24px', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', width: '20%' }}>Next Run</th>
              <th style={{ padding: '16px 24px', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', width: '15%' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', width: '15%', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{task.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{task.description}</div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: 13, color: '#fff' }}>{task.schedule}</td>
                <td style={{ padding: '16px 24px', fontSize: 13, color: 'var(--text-secondary)' }}>{task.nextRun}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '4px 8px', borderRadius: 12, fontSize: 12, fontWeight: 600,
                    background: task.status === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                    color: task.status === 'active' ? '#22c55e' : '#9ca3af'
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}></div>
                    {task.status === 'active' ? 'Active' : 'Paused'}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button 
                    className={`toggle-switch ${task.status === 'active' ? 'on' : 'off'}`} 
                    onClick={() => toggleTaskStatus(task.id)}
                  />
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                  No scheduled tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
