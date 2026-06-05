import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  email: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
}

interface AppState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // Tasks
  tasks: Task[];
  setTasks: (tasks: Task[] | ((prev: Task[]) => Task[])) => void;
  addTask: (task: Task) => void;
  moveTask: (id: string, newStatus: 'todo' | 'in-progress' | 'done') => void;
  
  // Settings
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  interfaceMode: string;
  setInterfaceMode: (mode: string) => void;
  typeface: string;
  setTypeface: (typeface: string) => void;
  textSize: string;
  setTextSize: (size: string) => void;
  panelPos: string;
  setPanelPos: (pos: string) => void;
  previewMode: string;
  setPreviewMode: (mode: string) => void;
  autoReply: boolean;
  setAutoReply: (val: boolean) => void;
  expandTools: boolean;
  setExpandTools: (val: boolean) => void;
  showExecution: boolean;
  setShowExecution: (val: boolean) => void;
  promptSuggestions: boolean;
  setPromptSuggestions: (val: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      
      tasks: [
        { id: '1', title: 'Write Marketing Copy', description: 'Draft the Q3 campaign copy for LinkedIn.', status: 'todo' },
        { id: '2', title: 'Data Analysis', description: 'Analyze the recent user engagement data.', status: 'in-progress' },
        { id: '3', title: 'Deploy App', description: 'Push the latest build to Vercel production.', status: 'done' },
      ],
      setTasks: (update) => set((state) => ({ 
        tasks: typeof update === 'function' ? update(state.tasks) : update 
      })),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      moveTask: (id, newStatus) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, status: newStatus } : t)
      })),
      
      theme: 'Match system',
      setTheme: (theme) => set({ theme }),
      language: 'English',
      setLanguage: (language) => set({ language }),
      interfaceMode: 'Glass',
      setInterfaceMode: (interfaceMode) => set({ interfaceMode }),
      typeface: 'Sans-serif',
      setTypeface: (typeface) => set({ typeface }),
      textSize: 'Medium',
      setTextSize: (textSize) => set({ textSize }),
      panelPos: 'right',
      setPanelPos: (panelPos) => set({ panelPos }),
      previewMode: 'new',
      setPreviewMode: (previewMode) => set({ previewMode }),
      autoReply: false,
      setAutoReply: (autoReply) => set({ autoReply }),
      expandTools: true,
      setExpandTools: (expandTools) => set({ expandTools }),
      showExecution: true,
      setShowExecution: (showExecution) => set({ showExecution }),
      promptSuggestions: true,
      setPromptSuggestions: (promptSuggestions) => set({ promptSuggestions }),
    }),
    {
      name: 'foiai-storage',
    }
  )
);
