'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const LANGUAGES = ['English', '中文', 'Español', 'Français', 'Deutsch'];

export default function WelcomeScreen() {
  const { setCurrentScreen, setIsAuthenticated } = useApp();
  const [language, setLanguage] = useState('English');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setLoading(false);
      setCurrentScreen('home');
    }, 1200);
  };

  return (
    <div style={{
      width: '100vw', height: '100vh', background: '#111',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Background subtle gradient */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        background: 'radial-gradient(circle at 70% 50%, #4ade80 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Main content - two column layout matching screenshot */}
      <div style={{
        display: 'flex', gap: 48, alignItems: 'center',
        padding: '0 60px', maxWidth: 900, width: '100%',
      }}>
        {/* Left: Login form area */}
        <div style={{ flex: 1 }}>
          {/* Logo */}
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'linear-gradient(135deg, #4ade80, #22c55e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, marginBottom: 24,
          }}>
            👾
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: 26, fontWeight: 600, marginBottom: 8, color: '#fff' }}>
            Welcome to QoderWork
          </h1>
          <p style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>
            AI desktop assistant for everyone
          </p>
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 32 }}>
            Bringing agentic capabilities beyond code. Describe what you need — QoderWork plans, executes, and delivers.
          </p>

          {/* Login/Register button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              id="login-register-btn"
              onClick={() => setShowAuthModal(true)}
              style={{
                background: '#fff', color: '#000', border: 'none', borderRadius: 8,
                padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = '#f0f0f0'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = '#fff'; }}
            >
              Login/Register
            </button>

            {/* Language selector */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                style={{
                  background: 'none', border: '1px solid #333', color: '#888',
                  borderRadius: 6, padding: '8px 12px', fontSize: 13, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}
              >
                {language}
                <ChevronDown />
              </button>
              {showLangDropdown && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, marginTop: 4,
                  background: '#1f1f1f', border: '1px solid #333', borderRadius: 8,
                  padding: 4, zIndex: 100, minWidth: 130,
                }}>
                  {LANGUAGES.map(l => (
                    <button
                      key={l}
                      onClick={() => { setLanguage(l); setShowLangDropdown(false); }}
                      className="sidebar-item"
                      style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', justifyContent: 'flex-start', fontSize: 13 }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button style={{ marginTop: 12, background: 'none', border: 'none', color: '#444', fontSize: 12, cursor: 'pointer' }}>
            Network Settings
          </button>
        </div>

        {/* Right: Green card */}
        <div style={{ width: 300, height: 330, flexShrink: 0 }}>
          <div className="green-card" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', padding: 20 }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: 18, fontWeight: 600, color: '#000', lineHeight: 1.3 }}>
                Go from answers to action with your agentic work partner
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth modal */}
      {showAuthModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, animation: 'fadeIn 0.2s ease',
        }}
          onClick={e => { if (e.target === e.currentTarget) setShowAuthModal(false); }}
        >
          <div style={{
            background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16,
            padding: '32px', width: 380, animation: 'fadeIn 0.2s ease',
          }}>
            {/* Logo */}
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'linear-gradient(135deg, #4ade80, #22c55e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, marginBottom: 20,
            }}>
              👾
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#111', borderRadius: 8, padding: 4 }}>
              {(['login', 'register'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setAuthMode(mode)}
                  style={{
                    flex: 1, background: authMode === mode ? '#2a2a2a' : 'none',
                    border: 'none', borderRadius: 6, padding: '7px',
                    color: authMode === mode ? '#fff' : '#555', fontSize: 13, cursor: 'pointer',
                    fontWeight: authMode === mode ? 500 : 400, textTransform: 'capitalize',
                    transition: 'all 0.15s',
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Form fields */}
            {authMode === 'register' && (
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Full Name</label>
                <input
                  placeholder="Praveen k"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    background: '#111', border: '1px solid #333', borderRadius: 8,
                    padding: '10px 12px', color: '#fff', fontSize: 13, outline: 'none', width: '100%',
                  }}
                />
              </div>
            )}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  background: '#111', border: '1px solid #333', borderRadius: 8,
                  padding: '10px 12px', color: '#fff', fontSize: 13, outline: 'none', width: '100%',
                }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAuth()}
                style={{
                  background: '#111', border: '1px solid #333', borderRadius: 8,
                  padding: '10px 12px', color: '#fff', fontSize: 13, outline: 'none', width: '100%',
                }}
              />
            </div>

            <button
              onClick={handleAuth}
              disabled={loading || !email || !password}
              style={{
                width: '100%',
                background: loading || !email || !password ? '#1a2e1a' : 'linear-gradient(135deg, #4ade80, #22c55e)',
                border: 'none', borderRadius: 8, padding: '11px',
                color: loading || !email || !password ? '#555' : '#000',
                fontSize: 14, fontWeight: 600, cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Authenticating...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            {/* Demo shortcut */}
            <button
              onClick={() => {
                setEmail('demo@qoderwork.com');
                setPassword('demo1234');
              }}
              style={{ width: '100%', marginTop: 10, background: 'none', border: '1px solid #222', borderRadius: 8, padding: '9px', color: '#555', fontSize: 12, cursor: 'pointer' }}
            >
              Use Demo Account
            </button>

            <button
              onClick={() => setShowAuthModal(false)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 20, lineHeight: 1 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
