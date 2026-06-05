'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

const CHANNELS = [
  { id: 'general', name: 'General', unread: 0 },
  { id: 'work', name: 'Work', unread: 3 },
  { id: 'personal', name: 'Personal', unread: 0 },
  { id: 'research', name: 'Research', unread: 1 },
  { id: 'ai-tasks', name: 'AI Tasks', unread: 0 },
];

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isAI: boolean;
  avatar: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'QoderWork',
    content: "Hello! I'm QoderWork, your AI assistant. How can I help you today? I can help you organize files, create content, write code, research topics, and much more.",
    timestamp: '9:00 AM',
    isAI: true,
    avatar: '👾',
  },
  {
    id: '2',
    sender: 'Praveen k',
    content: 'I want you to organise all my social media files and create a posting schedule',
    timestamp: '9:02 AM',
    isAI: false,
    avatar: 'P',
  },
  {
    id: '3',
    sender: 'QoderWork',
    content: "I'll help you organize your social media files and create a posting schedule! Here's my plan:\n\n1. **Audit existing files** — scan your social media folder for images, videos, and copy.\n2. **Categorize by platform** — organize into Instagram, Twitter, LinkedIn, Facebook folders.\n3. **Create posting calendar** — build a 30-day content calendar with optimal posting times.\n4. **Generate templates** — create reusable templates for each platform's format.\n\nShall I proceed?",
    timestamp: '9:02 AM',
    isAI: true,
    avatar: '👾',
  },
  {
    id: '4',
    sender: 'Praveen k',
    content: 'Yes, go ahead!',
    timestamp: '9:03 AM',
    isAI: false,
    avatar: 'P',
  },
  {
    id: '5',
    sender: 'QoderWork',
    content: "✅ Task started! I'm now:\n• Scanning your Downloads and Desktop folders...\n• Found 47 social media assets\n• Organizing them into platform-specific folders\n\nThis should take about 2 minutes. I'll notify you when it's done.",
    timestamp: '9:03 AM',
    isAI: true,
    avatar: '👾',
  },
];

const AI_RESPONSES = [
  "I understand! Let me plan and execute that for you right now.",
  "Great request! I'll break this down into steps and start immediately:\n\n1. Research the topic thoroughly\n2. Create an action plan\n3. Execute with your feedback\n\nShall I proceed?",
  "On it! I'm analyzing the task and will have results for you shortly. This typically takes 1-2 minutes.",
  "Perfect! I've added this to my task queue. I'll keep you updated as I make progress on each step.",
  "Understood. Let me gather the necessary context and tools, then I'll begin execution. You'll see real-time updates here.",
];

export default function IMChannelScreen() {
  const { currentChannel, setCurrentChannel } = useApp();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [activeChannelId, setActiveChannelId] = useState('general');
  const [isTyping, setIsTyping] = useState(false);
  const [channelMessages, setChannelMessages] = useState<Record<string, Message[]>>({
    general: INITIAL_MESSAGES,
    work: [],
    personal: [],
    research: [],
    'ai-tasks': [],
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'Praveen k',
      content: inputValue,
      timestamp: timeStr,
      isAI: false,
      avatar: 'P',
    };

    const newMessages = [...(channelMessages[activeChannelId] || []), userMsg];
    setChannelMessages(prev => ({ ...prev, [activeChannelId]: newMessages }));
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'QoderWork',
        content: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        isAI: true,
        avatar: '👾',
      };
      setIsTyping(false);
      setChannelMessages(prev => {
        const updated = [...(prev[activeChannelId] || []), aiMsg];
        setMessages(updated);
        return { ...prev, [activeChannelId]: updated };
      });
    }, 1000 + Math.random() * 800);
  };

  const handleChannelSwitch = (chId: string) => {
    setActiveChannelId(chId);
    setMessages(channelMessages[chId] || []);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', background: '#1a1a1a', overflow: 'hidden' }}>
      {/* Channel list */}
      <div style={{
        width: 180,
        borderRight: '1px solid #222',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        <div style={{ padding: '12px 12px 8px', borderBottom: '1px solid #222' }}>
          <div style={{ fontSize: 11, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Channels
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          {CHANNELS.map(ch => (
            <button
              key={ch.id}
              onClick={() => handleChannelSwitch(ch.id)}
              className={`sidebar-item ${activeChannelId === ch.id ? 'active' : ''}`}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                justifyContent: 'space-between',
              }}
            >
              <span># {ch.name}</span>
              {ch.unread > 0 && (
                <span style={{
                  background: '#22c55e', color: '#000', borderRadius: '50%',
                  width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 600,
                }}>
                  {ch.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Channel header */}
        <div className="channel-header">
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            # {CHANNELS.find(c => c.id === activeChannelId)?.name || 'General'}
          </span>
          <span style={{ fontSize: 12, color: '#555', marginLeft: 4 }}>— AI-powered workspace channel</span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#555', padding: '40px 0' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>💬</div>
              <div style={{ fontSize: 14 }}>No messages yet. Start the conversation!</div>
            </div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className="chat-message" style={{ marginBottom: 4 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: msg.isAI ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: msg.isAI ? 18 : 13, fontWeight: 600, color: msg.isAI ? '#000' : '#fff',
                }}>
                  {msg.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: msg.isAI ? '#4ade80' : '#fff' }}>
                      {msg.sender}
                    </span>
                    <span style={{ fontSize: 11, color: '#444' }}>{msg.timestamp}</span>
                  </div>
                  <div style={{
                    fontSize: 13, color: '#ccc', lineHeight: 1.6,
                    whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  }}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))
          )}

          {isTyping && (
            <div className="chat-message" style={{ marginBottom: 4 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              }}>
                👾
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingTop: 8 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
                    animation: `pulse-dot 1.2s ${i * 0.2}s infinite`,
                    opacity: 0.6,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #222', flexShrink: 0 }}>
          <div className="chat-input-container">
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <textarea
                ref={textareaRef}
                className="chat-input"
                placeholder={`Message #${CHANNELS.find(c => c.id === activeChannelId)?.name || 'General'}...`}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                style={{ minHeight: 24, maxHeight: 120 }}
              />
              <button
                className="send-btn"
                onClick={sendMessage}
                disabled={!inputValue.trim()}
                style={{ opacity: inputValue.trim() ? 1 : 0.5 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
