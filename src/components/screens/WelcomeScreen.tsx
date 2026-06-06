'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';

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

  const handleAuth = async () => {
    if (!email || !password) return;
    setError('');
    setLoading(true);
    
    // Simulate real credential auth via NextAuth
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    });
    
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      setIsAuthenticated(true);
      setCurrentScreen('home');
    }
  };

  const handleGoogleAuth = () => {
    signIn('google', { callbackUrl: '/' });
  };

  const fillUniversalUser = (user: string) => {
    setEmail(user);
    setPassword('foi2024!');
    setError('');
  };

  return (
    <div style={{
      width: '100vw', height: '100vh', background: '#111',
      display: 'flex', position: 'relative', overflow: 'hidden'
    }}>
      {/* Left: Login form area */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '0 60px', 
        maxWidth: 600,
        zIndex: 10
      }}>
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

        {/* Auth form inside the left column directly instead of modal for a better SaaS feel */}
        <div style={{ width: '100%', maxWidth: 400 }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#1a1a1a', borderRadius: 8, padding: 4 }}>
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

          <button 
            onClick={handleGoogleAuth}
            style={{
              width: '100%', background: '#fff', color: '#111', border: 'none', borderRadius: 8,
              padding: '11px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: '#333' }} />
            <div style={{ fontSize: 12, color: '#666' }}>or</div>
            <div style={{ flex: 1, height: 1, background: '#333' }} />
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
                  background: '#1a1a1a', border: '1px solid #333', borderRadius: 8,
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
                background: '#1a1a1a', border: '1px solid #333', borderRadius: 8,
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
                background: '#1a1a1a', border: '1px solid #333', borderRadius: 8,
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
          <div style={{ marginTop: 16, padding: '12px', background: '#1a1a1a', borderRadius: 8, border: '1px solid #2a2a2a' }}>
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

      {/* Right: Motion Background + Poster */}
      <div style={{ 
        flex: 1, 
        height: '100%', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        background: '#0a0a0a'
      }}>
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(217,119,87,0.3) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{
          width: '100%',
          maxWidth: 600,
          aspectRatio: '4/5',
          background: 'linear-gradient(135deg, rgba(217,119,87,0.1) 0%, rgba(20,20,20,0.8) 100%)',
          border: '1px solid rgba(217,119,87,0.2)',
          borderRadius: 24,
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 40,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)'
        }}>
          {/* Abstract geometric shapes inside poster */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '60%',
              height: '60%',
              borderRadius: '50%',
              border: '2px solid rgba(217,119,87,0.2)',
            }}
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '-20%',
              width: '80%',
              height: '80%',
              borderRadius: '50%',
              border: '1px dashed rgba(217,119,87,0.15)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(217,119,87,0.2)', color: '#d97757', borderRadius: 20, fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
              FOI.AI AUTONOMOUS AGENT
            </div>
            <h2 style={{ fontSize: 42, fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
              The Intelligence <br/> Layer For Work.
            </h2>
            <p style={{ fontSize: 16, color: '#aaa', lineHeight: 1.5, maxWidth: 400 }}>
              Connect your tools, set your goals, and watch FOI.AI execute shell commands, manage tasks, and coordinate across platforms seamlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
