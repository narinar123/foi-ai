'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function ProfileScreen() {
  const { user } = useApp();
  const [name, setName] = useState('Praveen k');
  const [email, setEmail] = useState('praveen@guidesoft.com');
  const [org, setOrg] = useState('Guide Soft IT Solutions');
  const [role, setRole] = useState('Product Manager');
  const [bio, setBio] = useState('Building the future of agentic AI workspaces.');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', maxWidth: 600 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Profile</h1>
          <p style={{ fontSize: 13, color: '#666' }}>Manage your personal information and account details.</p>
        </div>

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 18,
            background: 'linear-gradient(135deg, #4ade80, #22c55e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 700, color: '#000',
          }}>
            {name[0]?.toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{name}</div>
            <div style={{ fontSize: 12, color: '#555', marginBottom: 8 }}>{user.plan}</div>
            <button style={{
              background: '#2a2a2a', border: '1px solid #333', color: '#888',
              borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer',
            }}>
              Change Avatar
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="card" style={{ padding: '20px 24px' }}>
          {[
            { label: 'Full Name', value: name, setter: setName },
            { label: 'Email', value: email, setter: setEmail },
            { label: 'Organization', value: org, setter: setOrg },
            { label: 'Role', value: role, setter: setRole },
          ].map(field => (
            <div key={field.label} className="settings-row" style={{ paddingTop: 16, borderTop: '1px solid #222' }}>
              <div style={{ width: 140, fontSize: 13, color: '#888', flexShrink: 0, paddingTop: 8 }}>
                {field.label}
              </div>
              <input
                value={field.value}
                onChange={e => field.setter(e.target.value)}
                style={{
                  flex: 1, background: '#2a2a2a', border: '1px solid #333', borderRadius: 6,
                  padding: '8px 12px', color: '#fff', fontSize: 13, outline: 'none',
                }}
              />
            </div>
          ))}

          {/* Bio */}
          <div className="settings-row" style={{ paddingTop: 16, borderTop: '1px solid #222' }}>
            <div style={{ width: 140, fontSize: 13, color: '#888', flexShrink: 0, paddingTop: 8 }}>
              Bio
            </div>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              style={{
                flex: 1, background: '#2a2a2a', border: '1px solid #333', borderRadius: 6,
                padding: '8px 12px', color: '#fff', fontSize: 13, outline: 'none', resize: 'vertical',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        {/* Plan */}
        <div className="card" style={{ padding: '20px 24px', marginTop: 16 }}>
          <div style={{ fontSize: 12, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            Subscription
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Pro Trial Plan</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 3 }}>Expires in 14 days · All features included</div>
            </div>
            <button style={{
              background: 'linear-gradient(135deg, #4ade80, #22c55e)',
              border: 'none', color: '#000', borderRadius: 6,
              padding: '7px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 600,
            }}>
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Save */}
        <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
          <button
            onClick={handleSave}
            style={{
              background: saved ? '#22c55e' : '#22c55e15',
              border: '1px solid #22c55e', color: saved ? '#000' : '#22c55e',
              borderRadius: 6, padding: '8px 20px', fontSize: 13, cursor: 'pointer', fontWeight: 500,
              transition: 'all 0.2s',
            }}
          >
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
          <button style={{
            background: 'none', border: '1px solid #333', color: '#666',
            borderRadius: 6, padding: '8px 16px', fontSize: 13, cursor: 'pointer',
          }}>
            Cancel
          </button>
        </div>

        {/* Danger zone */}
        <div className="card" style={{ padding: '20px 24px', marginTop: 24, border: '1px solid #3a1a1a' }}>
          <div style={{ fontSize: 12, color: '#ef4444', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
            Danger Zone
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Delete Account</div>
              <div style={{ fontSize: 12, color: '#666' }}>Permanently delete your account and all data.</div>
            </div>
            <button style={{
              background: '#ef444415', border: '1px solid #ef4444',
              color: '#ef4444', borderRadius: 6, padding: '7px 14px', fontSize: 13, cursor: 'pointer',
            }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
