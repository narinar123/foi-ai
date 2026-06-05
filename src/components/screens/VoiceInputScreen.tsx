'use client';
import React, { useState } from 'react';

export default function VoiceInputScreen() {
  const [isListening, setIsListening] = useState(false);
  const [selectedMic, setSelectedMic] = useState('MacBook Pro Microphone');
  const [voiceLang, setVoiceLang] = useState('English (US)');
  const [autoSend, setAutoSend] = useState(true);
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [transcription, setTranscription] = useState('');
  const [volume, setVolume] = useState(80);

  const MICROPHONES = [
    'MacBook Pro Microphone',
    'External USB Microphone',
    'AirPods Pro',
    'System Default',
  ];

  const LANGUAGES = ['English (US)', 'English (UK)', '中文 (简体)', 'Español', 'Français', 'Deutsch'];

  const handleListen = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTranscription('');
      let text = '';
      const words = ['Organize', 'my', 'social', 'media', 'files', 'and', 'create', 'a', 'posting', 'schedule', 'for', 'this', 'week'];
      let i = 0;
      const interval = setInterval(() => {
        if (i < words.length) {
          text += (i > 0 ? ' ' : '') + words[i];
          setTranscription(text);
          i++;
        } else {
          clearInterval(interval);
          setIsListening(false);
        }
      }, 200);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a1a', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', maxWidth: 600 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Voice Input</h1>
          <p style={{ fontSize: 13, color: '#666' }}>Configure voice recognition and microphone settings.</p>
        </div>

        {/* Live test area */}
        <div className="card" style={{ padding: '24px', marginBottom: 20, textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 20px',
            background: isListening ? 'radial-gradient(circle, #d9775733, #d9775711)' : '#222',
            border: isListening ? '2px solid #d97757' : '2px solid #333',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
            cursor: 'pointer', transition: 'all 0.3s ease',
            boxShadow: isListening ? '0 0 30px #d9775733' : 'none',
            animation: isListening ? 'pulse-dot 1.5s infinite' : 'none',
          }} onClick={handleListen}>
            🎤
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
            {isListening ? 'Listening...' : 'Click to test microphone'}
          </div>
          {transcription && (
            <div style={{
              background: '#222', borderRadius: 8, padding: '12px 16px',
              fontSize: 13, color: '#ccc', textAlign: 'left', marginTop: 12, lineHeight: 1.5,
              animation: 'fadeIn 0.2s ease',
            }}>
              "{transcription}"
            </div>
          )}
          {!transcription && !isListening && (
            <div style={{ fontSize: 12, color: '#555' }}>Your speech will appear here</div>
          )}
        </div>

        {/* Settings */}
        <div className="card" style={{ padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            Microphone
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Input Device</label>
            <select
              value={selectedMic}
              onChange={e => setSelectedMic(e.target.value)}
              style={{
                background: '#2a2a2a', border: '1px solid #333', borderRadius: 6,
                padding: '8px 12px', color: '#fff', fontSize: 13, outline: 'none', width: '100%',
              }}
            >
              {MICROPHONES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>
              Input Volume: {volume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#d97757' }}
            />
          </div>
        </div>

        <div className="card" style={{ padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#555', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            Recognition
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Language</label>
            <select
              value={voiceLang}
              onChange={e => setVoiceLang(e.target.value)}
              style={{
                background: '#2a2a2a', border: '1px solid #333', borderRadius: 6,
                padding: '8px 12px', color: '#fff', fontSize: 13, outline: 'none', width: '100%',
              }}
            >
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          {[
            { label: 'Auto-send after recognition', desc: 'Automatically submit the transcribed text as a task.', key: 'autoSend', value: autoSend, setter: setAutoSend },
            { label: 'Noise suppression', desc: 'Filter background noise for cleaner transcription.', key: 'noise', value: noiseSuppression, setter: setNoiseSuppression },
          ].map(setting => (
            <div key={setting.key} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 12, paddingTop: 12, borderTop: '1px solid #222',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{setting.label}</div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{setting.desc}</div>
              </div>
              <button
                onClick={() => setting.setter(!setting.value)}
                className={`toggle ${setting.value ? 'on' : 'off'}`}
                style={{ border: 'none', cursor: 'pointer', flexShrink: 0 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
