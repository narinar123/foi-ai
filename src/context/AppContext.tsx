'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Screen = 
  | 'welcome'
  | 'home'
  | 'extensions-plugins'
  | 'extensions-skills'
  | 'extensions-connectors'
  | 'scheduled-tasks'
  | 'im-channel'
  | 'preferences'
  | 'profile'
  | 'system'
  | 'voice-input'
  | 'app-snapshot'
  | 'keyboard'
  | 'app-update'
  | 'secure-workspace'
  | 'experimental'
  | 'desk';

export interface Task {
  id: string;
  title: string;
  createdAt: Date;
  status: 'active' | 'completed' | 'draft';
}

export interface ChannelMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isAI?: boolean;
}

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  activeTab: 'tasks' | 'channels';
  setActiveTab: (tab: 'tasks' | 'channels') => void;
  tasks: Task[];
  addTask: (title: string) => void;
  workspace: string;
  user: { name: string; plan: string };
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  theme: 'dark';
  messages: ChannelMessage[];
  addMessage: (msg: string) => void;
  currentModel: string;
  setCurrentModel: (m: string) => void;
  currentChannel: string;
  setCurrentChannel: (c: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'I WANT U T ORGANISE ALL MY SOCIAL M...', createdAt: new Date(), status: 'active' },
  { id: '2', title: 'organise entire my system files from mac d...', createdAt: new Date(), status: 'active' },
  { id: '3', title: 'Oraganise all files and folders and images ...', createdAt: new Date(), status: 'active' },
  { id: '4', title: '是。是', createdAt: new Date(), status: 'active' },
  { id: '5', title: 'Add a local remote control CLI Open Termi...', createdAt: new Date(), status: 'active' },
  { id: '6', title: 'contine with my request', createdAt: new Date(), status: 'active' },
];

const INITIAL_MESSAGES: ChannelMessage[] = [];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [activeTab, setActiveTab] = useState<'tasks' | 'channels'>('tasks');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<ChannelMessage[]>(INITIAL_MESSAGES);
  const [currentModel, setCurrentModel] = useState('Qwen3.7-M...');
  const [currentChannel, setCurrentChannel] = useState('General');

  const addTask = (title: string) => {
    setTasks(prev => [
      { id: Date.now().toString(), title, createdAt: new Date(), status: 'active' },
      ...prev
    ]);
  };

  const addMessage = (content: string) => {
    const userMsg: ChannelMessage = {
      id: Date.now().toString(),
      sender: 'You',
      content,
      timestamp: new Date(),
      isAI: false,
    };
    setMessages(prev => [...prev, userMsg]);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ChannelMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'FOI.AI',
        content: `I'll help you with that. Let me plan and execute your request: "${content}"`,
        timestamp: new Date(),
        isAI: true,
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <AppContext.Provider value={{
      currentScreen,
      setCurrentScreen,
      activeTab,
      setActiveTab,
      tasks,
      addTask,
      workspace: 'Guide Soft IT Solutions',
      user: { name: 'Praveen k', plan: 'Pro trial Plan' },
      sidebarCollapsed,
      setSidebarCollapsed,
      isAuthenticated,
      setIsAuthenticated,
      theme: 'dark',
      messages,
      addMessage,
      currentModel,
      setCurrentModel,
      currentChannel,
      setCurrentChannel,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
