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
  { id: '1', name: 'Daily Report Generation', schedule: 'Every day at 9:00 AM', nextRun: 'Tomorrow, 9:00 AM', status: 'active', description: 'Generates daily summary from GitHub and Jira.' },
  { id: '2', name: 'Weekly System Audit', schedule: 'Every Monday at 2:00 AM', nextRun: 'Next Monday, 2:00 AM', status: 'paused', description: 'Runs a full security and performance audit.' },
  { id: '3', name: 'Monthly Invoice Processing', schedule: '1st of every month', nextRun: 'July 1, 12:00 AM', status: 'active', description: 'Drafts and sends invoices to regular clients.' },
];

export default function ScheduledTasksScreen() {
  const [tasks, setTasks] = useState<ScheduledTask[]>(INITIAL_TASKS);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'active' ? 'paused' : 'active' } : t
    ));
  };

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: '0 auto', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Scheduled Tasks</h1>
          <p style={{ color: 'var(--text-muted)' }}>Automate workflows with recurring FOI.AI agent runs.</p>
        </div>
        <button className="btn-primary">+ New Schedule</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-panel-hover)', borderBottom: '1px solid var(--border-subtle)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)' }}>Task Name</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)' }}>Schedule</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)' }}>Next Run</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)' }}>Toggle</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-panel-hover)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '20px 24px' }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>{task.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{task.description}</div>
                </td>
                <td style={{ padding: '20px 24px', fontSize: 14 }}>{task.schedule}</td>
                <td style={{ padding: '20px 24px', fontSize: 14 }}>{task.nextRun}</td>
                <td style={{ padding: '20px 24px' }}>
                  <span className="badge" style={{ 
                    background: task.status === 'active' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.1)', 
                    color: task.status === 'active' ? 'var(--success)' : 'var(--text-secondary)',
                    border: `1px solid ${task.status === 'active' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`
                  }}>
                    {task.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={`toggle ${task.status === 'active' ? 'on' : 'off'}`}
                    aria-label="Toggle task"
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
