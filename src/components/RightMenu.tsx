'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import { load } from '@cashfreepayments/cashfree-js';

export default function RightMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 99.00,
          currency: 'USD',
          customer_email: session?.user?.email || 'demo@foi.ai'
        })
      });
      const data = await res.json();
      
      if (data.mock) {
        alert('Mock Payment Triggered: Order ' + data.order_id);
        setLoading(false);
        return;
      }

      if (data.payment_session_id) {
        const cashfree = await load({
          mode: "sandbox" // change to production when live
        });
        cashfree.checkout({
          paymentSessionId: data.payment_session_id,
          redirectTarget: "_modal"
        });
      }
    } catch (e) {
      console.error(e);
      alert('Failed to initiate payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 100 }}>
      {/* Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(30, 30, 30, 0.8)',
          border: '1px solid var(--border-strong)',
          borderRadius: 8,
          padding: 8,
          cursor: 'pointer',
          color: 'var(--text-primary)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </>
          )}
        </svg>
      </button>

      {/* Flyout Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 48,
              right: 0,
              width: 240,
              background: 'rgba(20, 20, 20, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-strong)',
              borderRadius: 12,
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', padding: '4px 8px', textTransform: 'uppercase' }}>
              {session?.user?.name || 'Account'}
            </div>
            
            <button 
              className="sidebar-item" 
              onClick={handleUpgrade}
              style={{ background: 'rgba(217,119,87,0.1)', color: '#d97757' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              {loading ? 'Processing...' : 'Upgrade to Pro'}
            </button>

            <button className="sidebar-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              My Approvals
            </button>
            <button className="sidebar-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Secure Vault
            </button>
            <button className="sidebar-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              Settings
            </button>
            <div style={{ height: 1, background: 'var(--border-strong)', margin: '4px 0' }} />
            <button className="sidebar-item" style={{ color: '#ef4444' }} onClick={() => signOut()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
