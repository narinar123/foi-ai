'use client';
import React, { useState } from 'react';

export default function AppSnapshotScreen() {
  const [snapshots] = useState([
    { id: '1', name: 'Pre-deployment backup', date: 'Jun 5, 2026 · 2:34 PM', size: '142 MB', tasks: 12, skills: 8 },
    { id: '2', name: 'After skills update', date: 'Jun 3, 2026 · 10:12 AM', size: '138 MB', tasks: 9, skills: 6 },
    { id: '3', name: 'Initial setup', date: 'May 28, 2026 · 9:00 AM', size: '95 MB', tasks: 3, skills: 3 },
  ]);
  const [autoSnapshot, setAutoSnapshot] = useState(true);
  const [snapshotFreq, setSnapshotFreq] = useState('Weekly');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', maxWidth: 700 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <h1 style={{ fontSize: 22, fontWeight: 600 }}>App Snapshot</h1>
              <span className="badge badge-beta">Beta</span>
            </div>
            <p style={{ fontSize: 13, color: '#666' }}>Save and restore full QoderWork states including tasks, skills, and settings.</p>
          </div>
          <button style={{
            background: '#22c55e15', border: '1px solid #22c55e', color: '#22c55e',
            borderRadius: 6, padding: '7px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 500,
          }}>
            + Create Snapshot
          </button>
        </div>

        {/* Info banner */}
        <div style={{
          background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: 8,
          padding: '12px 16px', marginBottom: 24, marginTop: 16,
          display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#888',
        }}>
          <span>ℹ️</span>
          <span>Snapshots capture your entire workspace state and can be restored at any time.</span>
        </div>

        {/* Auto-snapshot settings */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            Automatic Snapshots
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Auto-create snapshots</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>Automatically save snapshots on a schedule.</div>
            </div>
            <button
              onClick={() => setAutoSnapshot(!autoSnapshot)}
              className={`toggle ${autoSnapshot ? 'on' : 'off'}`}
              style={{ border: 'none', cursor: 'pointer' }}
            />
          </div>
          {autoSnapshot && (
            <div>
              <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Frequency</label>
              <select
                value={snapshotFreq}
                onChange={e => setSnapshotFreq(e.target.value)}
                style={{
                  background: '#2a2a2a', border: '1px solid #333', borderRadius: 6,
                  padding: '7px 12px', color: '#fff', fontSize: 13, outline: 'none',
                }}
              >
                {['Daily', 'Weekly', 'Monthly'].map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Snapshots list */}
        <div className="card" style={{ overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #222', fontSize: 11, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Saved Snapshots ({snapshots.length})
          </div>
          {snapshots.map((snap, i) => (
            <div key={snap.id} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px',
              borderBottom: i < snapshots.length - 1 ? '1px solid #222' : 'none',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, background: '#2a2a2a',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
              }}>
                📸
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{snap.name}</div>
                <div style={{ fontSize: 12, color: '#555', display: 'flex', gap: 12 }}>
                  <span>{snap.date}</span>
                  <span>📦 {snap.size}</span>
                  <span>📋 {snap.tasks} tasks</span>
                  <span>⚡ {snap.skills} skills</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  background: '#22c55e15', border: '1px solid #22c55e', color: '#22c55e',
                  borderRadius: 5, padding: '5px 10px', fontSize: 11, cursor: 'pointer',
                }}>
                  Restore
                </button>
                <button style={{
                  background: '#2a2a2a', border: '1px solid #333', color: '#555',
                  borderRadius: 5, padding: '5px 10px', fontSize: 11, cursor: 'pointer',
                }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
