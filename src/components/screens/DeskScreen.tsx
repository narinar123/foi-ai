'use client';
import React, { useState } from 'react';

type TaskStatus = 'Todo' | 'In Progress' | 'In Review' | 'Done';

interface KanbanTask {
  id: string;
  title: string;
  status: TaskStatus;
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
}

const INITIAL_TASKS: KanbanTask[] = [
  { id: 't1', title: 'Design System Update', status: 'Todo', priority: 'High', assignee: 'Praveen' },
  { id: 't2', title: 'Implement Kanban Drag & Drop', status: 'In Progress', priority: 'High', assignee: 'FOI.AI' },
  { id: 't3', title: 'Update globals.css', status: 'Done', priority: 'Medium', assignee: 'FOI.AI' },
  { id: 't4', title: 'Fix deployment errors', status: 'In Review', priority: 'High', assignee: 'FOI.AI' },
];

const COLUMNS: TaskStatus[] = ['Todo', 'In Progress', 'In Review', 'Done'];

export default function DeskScreen() {
  const [tasks, setTasks] = useState<KanbanTask[]>(INITIAL_TASKS);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedTaskId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Small delay to allow the drag image to be captured before changing opacity
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.style.opacity = '0.4';
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent, id: string) => {
    setDraggedTaskId(null);
    const el = document.getElementById(id);
    if (el) el.style.opacity = '1';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    setTasks(prev => prev.map(t => 
      t.id === draggedTaskId ? { ...t, status } : t
    ));
    setDraggedTaskId(null);
  };

  const getPriorityColor = (p: string) => {
    if (p === 'High') return 'var(--danger)';
    if (p === 'Medium') return 'var(--warning)';
    return 'var(--success)';
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 24 }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Desk (Kanban)</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your tasks visually with full drag-and-drop support.</p>
        </div>
        <button className="btn-primary">+ Add Task</button>
      </div>

      <div style={{ display: 'flex', gap: 20, flex: 1, overflowX: 'auto', paddingBottom: 16 }}>
        {COLUMNS.map(col => (
          <div
            key={col}
            className="kanban-col"
            style={{ width: 300, minWidth: 300 }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col)}
          >
            {/* Column Header */}
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{col}</span>
              <span className="badge" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
                {tasks.filter(t => t.status === col).length}
              </span>
            </div>

            {/* Column Body */}
            <div style={{ padding: 12, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {tasks.filter(t => t.status === col).map(task => (
                <div
                  id={task.id}
                  key={task.id}
                  className="kanban-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={(e) => handleDragEnd(e, task.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span className="badge" style={{ color: getPriorityColor(task.priority), background: 'rgba(255,255,255,0.05)', border: `1px solid ${getPriorityColor(task.priority)}40` }}>
                      {task.priority}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{task.id.toUpperCase()}</span>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 16, lineHeight: 1.4 }}>{task.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Assignee:</div>
                    <div className="avatar" style={{ width: 24, height: 24, fontSize: 10, background: task.assignee === 'FOI.AI' ? 'linear-gradient(135deg, var(--accent), var(--accent-dark))' : '#333' }}>
                      {task.assignee[0]}
                    </div>
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
