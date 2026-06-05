'use client';
import React, { useState } from 'react';

type TaskStatus = 'active' | 'paused' | 'completed' | 'failed';

interface ScheduledTask {
  id: string;
  title: string;
  description: string;
  schedule: string;
  nextRun: string;
  status: TaskStatus;
  lastRun?: string;
  icon: string;
}

const TASKS: ScheduledTask[] = [
  {
    id: '1',
    title: 'Daily Report Generator',
    description: 'Generate a daily summary of all completed tasks and send via email.',
    schedule: 'Every day at 9:00 AM',
    nextRun: 'Tomorrow 9:00 AM',
    status: 'active',
    lastRun: '2 hours ago',
    icon: '📊',
  },
  {
    id: '2',
    title: 'Weekly Social Media Posts',
    description: 'Create and schedule 5 LinkedIn posts based on recent industry news.',
    schedule: 'Every Monday at 8:00 AM',
    nextRun: 'Mon Jun 9, 8:00 AM',
    status: 'active',
    lastRun: '5 days ago',
    icon: '📱',
  },
  {
    id: '3',
    title: 'File System Organizer',
    description: 'Scan and organize Downloads folder, move files to appropriate directories.',
    schedule: 'Every Sunday at 11:00 PM',
    nextRun: 'Sun Jun 8, 11:00 PM',
    status: 'paused',
    lastRun: '12 days ago',
    icon: '📁',
  },
  {
    id: '4',
    title: 'Email Digest',
    description: 'Summarize unread emails and create action items from important messages.',
    schedule: 'Every weekday at 8:30 AM',
    nextRun: 'Tomorrow 8:30 AM',
    status: 'active',
    lastRun: 'Today 8:30 AM',
    icon: '📧',
  },
  {
    id: '5',
    title: 'Codebase Health Check',
    description: 'Run static analysis, check for security vulnerabilities and outdated deps.',
    schedule: 'Every Friday at 6:00 PM',
    nextRun: 'Fri Jun 6, 6:00 PM',
    status: 'failed',
    lastRun: '7 days ago',
    icon: '🔍',
  },
];

const STATUS_COLORS: Record<TaskStatus, string> = {
  active: '#22c55e',
  paused: '#f59e0b',
  completed: '#6366f1',
  failed: '#ef4444',
};

const STATUS_BG: Record<TaskStatus, string> = {
  active: '#22c55e15',
  paused: '#f59e0b15',
  completed: '#6366f115',
  failed: '#ef444415',
};

export default function ScheduledTasksScreen() {
  const [tasks, setTasks] = useState<ScheduledTask[]>(TASKS);
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSchedule, setNewTaskSchedule] = useState('');

  const toggleStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      return { ...t, status: t.status === 'active' ? 'paused' : 'active' };
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    setTasks(prev => [...prev, {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: 'User-created scheduled task.',
      schedule: newTaskSchedule || 'Manual',
      nextRun: '—',
      status: 'active',
      icon: '⚡',
    }]);
    setNewTaskTitle('');
    setNewTaskSchedule('');
    setShowNewTask(false);
  };

  const activeCount = tasks.filter(t => t.status === 'active').length;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Scheduled Tasks</h1>
            <p style={{ fontSize: 13, color: '#666' }}>
              Automate recurring tasks — QoderWork runs them on your schedule.
            </p>
          </div>
          <button
            onClick={() => setShowNewTask(!showNewTask)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#22c55e15', border: '1px solid #22c55e',
              color: '#22c55e', borderRadius: 6, padding: '7px 14px',
              fontSize: 13, cursor: 'pointer', fontWeight: 500,
            }}
          >
            + New Task
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Active', value: activeCount, color: '#22c55e' },
            { label: 'Paused', value: tasks.filter(t => t.status === 'paused').length, color: '#f59e0b' },
            { label: 'Failed', value: tasks.filter(t => t.status === 'failed').length, color: '#ef4444' },
            { label: 'Total', value: tasks.length, color: '#888' },
          ].map(stat => (
            <div key={stat.label} className="card" style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* New task form */}
        {showNewTask && (
          <div className="card" style={{ padding: '16px', marginBottom: 16, animation: 'fadeIn 0.2s ease' }}>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>New Scheduled Task</div>
            <input
              placeholder="Task title..."
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              style={{
                background: '#222', border: '1px solid #333', borderRadius: 6,
                padding: '8px 12px', color: '#fff', fontSize: 13, width: '100%',
                outline: 'none', marginBottom: 8,
              }}
            />
            <input
              placeholder="Schedule (e.g. Every day at 9am)"
              value={newTaskSchedule}
              onChange={e => setNewTaskSchedule(e.target.value)}
              style={{
                background: '#222', border: '1px solid #333', borderRadius: 6,
                padding: '8px 12px', color: '#fff', fontSize: 13, width: '100%',
                outline: 'none', marginBottom: 12,
              }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={addTask}
                style={{
                  background: '#22c55e', border: 'none', color: '#000', borderRadius: 6,
                  padding: '7px 16px', fontSize: 13, cursor: 'pointer', fontWeight: 500,
                }}
              >
                Create
              </button>
              <button
                onClick={() => setShowNewTask(false)}
                style={{
                  background: '#2a2a2a', border: '1px solid #333', color: '#666',
                  borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Task list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tasks.map(task => (
            <div key={task.id} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: '#2a2a2a',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
              }}>
                {task.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{task.title}</span>
                  <span style={{
                    fontSize: 10, padding: '2px 7px', borderRadius: 3,
                    background: STATUS_BG[task.status],
                    color: STATUS_COLORS[task.status],
                    border: `1px solid ${STATUS_COLORS[task.status]}40`,
                    fontWeight: 500,
                  }}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: '#666', marginBottom: 8, lineHeight: 1.4 }}>{task.description}</p>
                <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#555' }}>
                  <span>🕐 {task.schedule}</span>
                  <span>⏭ Next: {task.nextRun}</span>
                  {task.lastRun && <span>↩ Last: {task.lastRun}</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button
                  onClick={() => toggleStatus(task.id)}
                  style={{
                    padding: '5px 10px', borderRadius: 5, fontSize: 11, cursor: 'pointer',
                    border: '1px solid #333', background: '#2a2a2a', color: '#888',
                    transition: 'all 0.15s',
                  }}
                >
                  {task.status === 'active' ? '⏸ Pause' : '▶ Resume'}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    padding: '5px 10px', borderRadius: 5, fontSize: 11, cursor: 'pointer',
                    border: '1px solid #333', background: '#2a2a2a', color: '#555',
                  }}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
