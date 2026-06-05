'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const LANGUAGES = ['English', '中文', 'Español', 'Français', 'Deutsch'];

// Authorized universal users
const AUTHORIZED_USERS: Record<string, string> = {
  'pranu21m@foi.ai': 'foi2024!',
  'praul@foi.ai': 'foi2024!',
  // allow any email + password for demo
};

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
  const [error, setError] = useState('');

  const handleAuth = () => {
    if (!email || !password) return;
    setError('');
    setLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setLoading(false);
      setCurrentScreen('home');
    }, 1000);
  };

  const fillUniversalUser = (user: string) => {
    setEmail(user);
    setPassword('foi2024!');
    setError('');
  };

  return (
    <div style={{
      width: '100vw', height: '100vh', background: '#111',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Subtle orange glow background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        background: 'radial-gradient(circle at 70% 50%, #d97757 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Main content - two column layout */}
      <div style={{
        display: 'flex', gap: 48, alignItems: 'center',
        padding: '0 60px', maxWidth: 900, width: '100%',
      }}>
        {/* Left: Login form area */}
        <div style={{ flex: 1 }}>
          {/* GS Logo */}
          <div style={{ marginBottom: 20 }}>
            <Image
              src="/gslogo.png"
              alt="FOI.AI Logo"
              width={56}
              height={56}
              style={{ borderRadius: 12, objectFit: 'contain' }}
            />
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: 26, fontWeight: 600, marginBottom: 6, color: '#fff' }}>
            Welcome to FOI.AI
          </h1>
          <p style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>
            AI desktop assistant for everyone
          </p>
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 32 }}>
            Bringing agentic capabilities beyond code. Describe what you need — FOI.AI plans, executes, and delivers.
          </p>

          {/* Login/Register button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              id="login-register-btn"
              onClick={() => setShowAuthModal(true)}
              style={{
                background: '#d97757', color: '#fff', border: 'none', borderRadius: 8,
                padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.15s', boxShadow: '0 2px 12px rgba(217,119,87,0.4)',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = '#c2633d'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = '#d97757'; }}
            >
              Login / Register
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

        {/* Right: Orange accent card */}
        <div style={{ width: 300, height: 330, flexShrink: 0 }}>
          <div className="orange-card" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', padding: 20 }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: 18, fontWeight: 600, color: '#fff', lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                Go from answers to action with your agentic work partner
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth modal */}
      {showAuthModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, animation: 'fadeIn 0.2s ease',
        }}
          onClick={e => { if (e.target === e.currentTarget) setShowAuthModal(false); }}
        >
          <div style={{
            background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16,
            padding: '32px', width: 400, animation: 'fadeIn 0.2s ease', position: 'relative',
          }}>
            {/* Close button */}
            <button
              onClick={() => setShowAuthModal(false)}
              style={{
                position: 'absolute', top: 16, right: 16,
                background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 20, lineHeight: 1,
              }}
            >
              ×
            </button>

            {/* Logo + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <Image src="/gslogo.png" alt="FOI.AI" width={36} height={36} style={{ borderRadius: 8 }} />
              <span style={{ fontSize: 18, fontWeight: 700, color: '#d97757' }}>FOI.AI</span>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#111', borderRadius: 8, padding: 4 }}>
              {(['login', 'register'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => { setAuthMode(mode); setError(''); }}
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
                  placeholder="Your name"
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
                placeholder="you@foi.ai"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                style={{
                  background: '#111', border: '1px solid #333', borderRadius: 8,
                  padding: '10px 12px', color: '#fff', fontSize: 13, outline: 'none', width: '100%',
                }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleAuth()}
                style={{
                  background: '#111', border: '1px solid #333', borderRadius: 8,
                  padding: '10px 12px', color: '#fff', fontSize: 13, outline: 'none', width: '100%',
                }}
              />
            </div>

            {error && (
              <div style={{ fontSize: 12, color: '#ef4444', marginBottom: 12, padding: '8px 12px', background: '#ef444410', borderRadius: 6, border: '1px solid #ef444430' }}>
                {error}
              </div>
            )}

            <button
              onClick={handleAuth}
              disabled={loading || !email || !password}
              style={{
                width: '100%',
                background: loading || !email || !password ? '#2e1a0a' : '#d97757',
                border: 'none', borderRadius: 8, padding: '11px',
                color: loading || !email || !password ? '#555' : '#fff',
                fontSize: 14, fontWeight: 600, cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', boxShadow: !loading && email && password ? '0 2px 12px rgba(217,119,87,0.35)' : 'none',
              }}
            >
              {loading ? 'Authenticating...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            {/* Universal access accounts */}
            <div style={{ marginTop: 16, padding: '12px', background: '#111', borderRadius: 8, border: '1px solid #2a2a2a' }}>
              <div style={{ fontSize: 11, color: '#555', marginBottom: 8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Universal Access Accounts
              </div>
              {['pranu21m@foi.ai', 'praul@foi.ai'].map(user => (
                <button
                  key={user}
                  onClick={() => fillUniversalUser(user)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    background: email === user ? '#d9775715' : 'none',
                    border: email === user ? '1px solid #d9775740' : '1px solid transparent',
                    color: email === user ? '#d97757' : '#666', borderRadius: 6,
                    padding: '6px 10px', fontSize: 12, cursor: 'pointer', marginBottom: 4,
                    transition: 'all 0.15s',
                  }}
                >
                  {email === user ? '✓ ' : ''}{user}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
