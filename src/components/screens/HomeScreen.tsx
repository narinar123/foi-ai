'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

const QoderMascot = () => (
  <div style={{
    width: 56,
    height: 56,
    borderRadius: 14,
    background: 'linear-gradient(135deg, #4ade80, #22c55e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    flexShrink: 0,
  }}>
    👾
  </div>
);

const ArrowUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
  </svg>
);

const MicIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const MODELS = ['Qwen3.7-Max', 'Qwen3.7-Mini', 'GPT-4o', 'Claude 3.5', 'Gemini 2.0'];
const CHANNELS = ['General', 'Work', 'Personal', 'Research'];
const TOOL_CHIPS = ['α', 'Ċ', 'Ĉ', 'Ē', '+5'];

export default function HomeScreen() {
  const { addTask, currentModel, setCurrentModel, currentChannel, setCurrentChannel } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [showChannelPicker, setShowChannelPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    addTask(inputValue.trim());
    setInputValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px';
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      background: '#1a1a1a',
      position: 'relative',
    }}>
      {/* Center content */}
      <div style={{ width: '100%', maxWidth: 580, animation: 'fadeIn 0.3s ease' }}>
        {/* Mascot + heading */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 28 }}>
          <QoderMascot />
          <h1 style={{ fontSize: 28, fontWeight: 600, marginTop: 16, marginBottom: 8, color: '#fff' }}>
            Beyond chat, get it done.
          </h1>
          <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>
            Just tell QoderWork what you need — it plans, executes, and delivers, keeping you in the loop.
          </p>
        </div>

        {/* Chat input */}
        <div className="chat-input-container">
          <textarea
            ref={textareaRef}
            className="chat-input"
            placeholder="Describe a task, / for shortcuts, @ to add context"
            value={inputValue}
            onChange={e => { setInputValue(e.target.value); handleInput(); }}
            onKeyDown={handleKeyDown}
            rows={1}
            style={{ minHeight: 24, maxHeight: 200 }}
          />

          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {/* Attachment */}
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: 4, borderRadius: 4, display: 'flex', alignItems: 'center' }}
                className="sidebar-item">
                <PlusIcon />
              </button>

              {/* Tool chips */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#2a2a2a',
                border: '1px solid #333',
                borderRadius: 6,
                padding: '3px 8px',
                gap: 4,
                cursor: 'pointer',
                fontSize: 12,
                color: '#888',
              }}>
                {TOOL_CHIPS.map((chip, i) => (
                  <span key={i}>{chip}</span>
                ))}
              </div>

              {/* Channel picker */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowChannelPicker(!showChannelPicker)}
                  className="custom-select"
                  style={{ fontSize: 12, color: '#888', padding: '3px 8px', position: 'relative' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  {currentChannel}
                  <div style={{ position: 'absolute', top: -2, right: -2, width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                  <ChevronDownIcon />
                </button>
                {showChannelPicker && (
                  <div style={{
                    position: 'absolute', bottom: '100%', left: 0, marginBottom: 4,
                    background: '#1f1f1f', border: '1px solid #333', borderRadius: 8,
                    padding: 4, zIndex: 100, minWidth: 120,
                  }}>
                    {CHANNELS.map(ch => (
                      <button
                        key={ch}
                        onClick={() => { setCurrentChannel(ch); setShowChannelPicker(false); }}
                        className="sidebar-item"
                        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', justifyContent: 'flex-start', fontSize: 13 }}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Model picker */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowModelPicker(!showModelPicker)}
                  className="custom-select"
                  style={{ fontSize: 12, color: '#888', padding: '3px 8px' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                  </svg>
                  {currentModel}
                  <ChevronDownIcon />
                </button>
                {showModelPicker && (
                  <div style={{
                    position: 'absolute', bottom: '100%', right: 0, marginBottom: 4,
                    background: '#1f1f1f', border: '1px solid #333', borderRadius: 8,
                    padding: 4, zIndex: 100, minWidth: 150,
                  }}>
                    {MODELS.map(m => (
                      <button
                        key={m}
                        onClick={() => { setCurrentModel(m); setShowModelPicker(false); }}
                        className="sidebar-item"
                        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', justifyContent: 'flex-start', fontSize: 13 }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mic */}
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: 4, borderRadius: 4 }}
                className="sidebar-item">
                <MicIcon />
              </button>

              {/* Send */}
              <button
                className="send-btn"
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                style={{ opacity: inputValue.trim() ? 1 : 0.5 }}
              >
                <ArrowUpIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Work in folder */}
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center' }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#555', fontSize: 12, padding: '4px 0',
          }}>
            <FolderIcon />
            Work in a Folder
            <ChevronDownIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
