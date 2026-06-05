import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  width?: number | string;
  variant?: 'outline' | 'flat';
}

export default function Dropdown({ value, options, onChange, icon, width, variant = 'outline' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value) || options[0];

  const btnStyle: React.CSSProperties = {
    background: variant === 'flat' ? '#2a2a2a' : 'transparent',
    border: variant === 'flat' ? 'none' : '1px solid var(--border-light)',
    color: 'var(--text-secondary)',
    padding: '4px 8px',
    borderRadius: 6,
    fontSize: 12,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    width: width || 'auto',
    justifyContent: 'space-between'
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block', width: width || 'auto' }}>
      <button 
        style={btnStyle}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {icon}
          {selectedOption?.label}
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          right: 0,
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-strong)',
          borderRadius: 8,
          padding: 4,
          minWidth: 160,
          zIndex: 100,
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '6px 12px',
                background: value === opt.value ? 'var(--bg-hover)' : 'transparent',
                border: 'none',
                color: value === opt.value ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: 12,
                cursor: 'pointer',
                borderRadius: 4,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = value === opt.value ? 'var(--bg-hover)' : 'transparent'}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
