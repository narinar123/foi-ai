'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const PaperclipIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);
const MicIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const MODELS = ['Qwen3.7-Max', 'GPT-4o', 'Claude 3.5', 'Gemini 2.0'];
const QUICK_ACTIONS = [
  { icon: '📝', label: 'Summarize text' },
  { icon: '✉️', label: 'Draft email' },
  { icon: '💻', label: 'Code review' },
  { icon: '📊', label: 'Analyze data' },
];

export default function HomeScreen() {
  const { currentModel, setCurrentModel, currentChannel, setCurrentChannel, messages, addMessage } = useApp();
  const [input, setInput] = useState('');
  const [showModels, setShowModels] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage(input);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      
      {/* Top Header */}
      <div style={{
        height: 60, borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', gap: 12, background: 'var(--bg-app)'
      }}>
        {/* Model Picker */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowModels(!showModels)}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 20 }}
          >
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>✨</span>
            {currentModel}
            <ChevronDown />
          </button>
          {showModels && (
            <div className="card animate-fade-in" style={{
              position: 'absolute', top: '100%', left: 0, marginTop: 8, padding: 8, width: 200, zIndex: 100
            }}>
              {MODELS.map(m => (
                <button
                  key={m}
                  onClick={() => { setCurrentModel(m); setShowModels(false); }}
                  className="sidebar-item"
                  style={{ width: '100%', border: 'none', background: currentModel === m ? 'var(--accent-transparent)' : 'none', color: currentModel === m ? 'var(--accent)' : 'var(--text-primary)' }}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {messages.length === 0 ? (
          <div style={{ margin: 'auto', textAlign: 'center', maxWidth: 600, animation: 'fadeIn 0.5s ease' }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, background: 'linear-gradient(135deg, #fff 0%, #a1a1aa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              How can I help you today?
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 40 }}>
              Describe a task, ask a question, or let FOI.AI handle complex workflows automatically.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {QUICK_ACTIONS.map(action => (
                <button
                  key={action.label}
                  onClick={() => addMessage(action.label)}
                  className="card"
                  style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                >
                  <span>{action.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className="animate-slide-in" style={{
              display: 'flex', gap: 16, maxWidth: 800, margin: '0 auto', width: '100%',
              flexDirection: msg.isAI ? 'row' : 'row-reverse'
            }}>
              <div className={`avatar ${msg.isAI ? 'avatar-ai' : 'avatar-user'}`}>
                {msg.isAI ? 'F' : 'U'}
              </div>
              <div className={`msg-bubble ${msg.isAI ? 'msg-ai' : 'msg-user'}`}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '24px', background: 'linear-gradient(to top, var(--bg-app) 50%, transparent)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="chat-input-wrapper">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask FOI.AI anything or describe a workflow..."
              className="chat-input"
              rows={1}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px 16px' }}>
              <div style={{ display: 'flex', gap: 12, color: 'var(--text-muted)' }}>
                <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 4 }} className="sidebar-item">
                  <PaperclipIcon />
                </button>
                <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 4 }} className="sidebar-item">
                  <MicIcon />
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="btn-primary"
                style={{
                  width: 36, height: 36, padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: input.trim() ? 1 : 0.5, pointerEvents: input.trim() ? 'auto' : 'none'
                }}
              >
                <SendIcon />
              </button>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--text-muted)' }}>
            FOI.AI can make mistakes. Consider verifying important information.
          </div>
        </div>
      </div>
    </div>
  );
}
