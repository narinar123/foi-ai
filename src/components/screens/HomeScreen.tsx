import React, { useState, useEffect, useRef } from 'react';
import Dropdown from '@/components/Dropdown';
import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';

export default function HomeScreen() {
  // @ts-ignore
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat() as any;
  const [channel, setChannel] = useState('general');
  const [model, setModel] = useState('gpt4');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // create a synthetic event for handleSubmit
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent<HTMLFormElement>;
      handleSubmit(fakeEvent);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
      
      {/* Top Right Header */}
      <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 16, color: 'var(--text-secondary)', fontSize: 13, alignItems: 'center', zIndex: 50 }}>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          Feedback
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </button>
      </div>

      {/* Main Area: Either Welcome hero or Chat messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px 120px 24px' }}>
        <div style={{ width: '100%', maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '10vh' }}>
              <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
                <img src="/gslogo.png" alt="FOI.AI" style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'contain' }} />
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>Beyond chat, get it done.</h1>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto 32px auto', lineHeight: 1.5 }}>
                Just tell FOI.AI what you need - it plans, executes, and delivers, keeping you in the loop.
              </p>
            </div>
          ) : (
            messages?.map((m: any) => (
              <div key={m.id} style={{ display: 'flex', gap: 16, flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                {m.role === 'assistant' && (
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#d97757', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>AI</span>
                  </div>
                )}
                <div style={{ 
                  background: m.role === 'user' ? '#2a2a2a' : 'transparent', 
                  padding: m.role === 'user' ? '12px 16px' : '0 12px', 
                  borderRadius: 12, 
                  color: '#fff', 
                  fontSize: 14, 
                  lineHeight: 1.6,
                  maxWidth: '85%'
                }}>
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#d97757', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>AI</span>
              </div>
              <div style={{ color: '#888', fontSize: 14, alignSelf: 'center', animation: 'pulse 1.5s infinite ease-in-out' }}>
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Sticky Input Area */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, #111 70%, transparent)', display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 760 }}>
          <div className="chat-input-container">
            <textarea 
              className="chat-input"
              rows={2}
              placeholder="Describe a task, / for shortcuts, @ to add context"
              value={input}
              onChange={handleInputChange}
              onKeyDown={onKeyDown}
            />
            
            <div className="chat-toolbar">
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button type="button" className="chat-tool-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <button type="button" className="chat-tool-btn" style={{ fontSize: 13, fontWeight: 600, fontFamily: 'serif' }}>A</button>
                <Dropdown
                  value={channel}
                  onChange={setChannel}
                  variant="flat"
                  options={[
                    { label: 'General', value: 'general' },
                    { label: 'Project A', value: 'project-a' },
                    { label: 'Team Chat', value: 'team' }
                  ]}
                  icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}
                />
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Dropdown
                  value={model}
                  onChange={setModel}
                  variant="flat"
                  options={[
                    { label: 'Qwen3.7-M...', value: 'qwen' },
                    { label: 'Claude 3.5...', value: 'claude' },
                    { label: 'GPT-4o', value: 'gpt4' }
                  ]}
                  icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 22 12 17 22 22 12 2"></polygon></svg>}
                />
                <button type="button" className="chat-tool-btn" style={{ background: 'transparent' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                </button>
                <button type="submit" className="chat-submit-btn" disabled={!input.trim()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? '#fff' : '#888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                </button>
              </div>
            </div>
          </div>
          
          <button type="button" className="dropdown-btn" style={{ marginTop: 12, border: 'none', paddingLeft: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            Work in a Folder
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
        </form>
      </div>
    </div>
  );
}
