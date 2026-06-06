'use client';
import React, { useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import RightMenu from '@/components/RightMenu';
import WelcomeScreen from '@/components/screens/WelcomeScreen';
import HomeScreen from '@/components/screens/HomeScreen';
import SkillsScreen from '@/components/screens/SkillsScreen';
import PluginsScreen from '@/components/screens/PluginsScreen';
import ConnectorsScreen from '@/components/screens/ConnectorsScreen';
import ScheduledTasksScreen from '@/components/screens/ScheduledTasksScreen';
import IMChannelScreen from '@/components/screens/IMChannelScreen';
import PreferencesScreen from '@/components/screens/PreferencesScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import SystemScreen from '@/components/screens/SystemScreen';
import VoiceInputScreen from '@/components/screens/VoiceInputScreen';
import AppSnapshotScreen from '@/components/screens/AppSnapshotScreen';
import KeyboardScreen from '@/components/screens/KeyboardScreen';
import AppUpdateScreen from '@/components/screens/AppUpdateScreen';
import SecureWorkspaceScreen from '@/components/screens/SecureWorkspaceScreen';
import ExperimentalScreen from '@/components/screens/ExperimentalScreen';
import DeskScreen from '@/components/screens/DeskScreen';
import AnimatedBackground from '@/components/AnimatedBackground';

const SETTINGS_SCREENS = [
  'preferences', 'profile', 'system', 'voice-input', 'app-snapshot',
  'keyboard', 'app-update', 'secure-workspace', 'experimental', 'desk',
];

function ScreenRenderer() {
  const { currentScreen } = useApp();

  const getScreen = () => {
    switch (currentScreen) {
      case 'home': return <HomeScreen />;
      case 'extensions-plugins': return <PluginsScreen />;
      case 'extensions-skills': return <SkillsScreen />;
      case 'extensions-connectors': return <ConnectorsScreen />;
      case 'scheduled-tasks': return <ScheduledTasksScreen />;
      case 'im-channel': return <IMChannelScreen />;
      case 'preferences': return <PreferencesScreen />;
      case 'profile': return <ProfileScreen />;
      case 'system': return <SystemScreen />;
      case 'voice-input': return <VoiceInputScreen />;
      case 'app-snapshot': return <AppSnapshotScreen />;
      case 'keyboard': return <KeyboardScreen />;
      case 'app-update': return <AppUpdateScreen />;
      case 'secure-workspace': return <SecureWorkspaceScreen />;
      case 'experimental': return <ExperimentalScreen />;
      case 'desk': return <DeskScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        style={{ height: '100%', width: '100%' }}
      >
        {getScreen()}
      </motion.div>
    </AnimatePresence>
  );
}

function AppLayout() {
  const { currentScreen, setCurrentScreen, isAuthenticated } = useApp();

  if (!isAuthenticated || currentScreen === 'welcome') {
    return <WelcomeScreen />;
  }

  const isSettings = SETTINGS_SCREENS.includes(currentScreen);

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#111',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <AnimatedBackground />
      <RightMenu />
      {/* Main sidebar (always shown when logged in) */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Sidebar />
      </div>

      {/* Right side — main content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
        <ScreenRenderer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}
