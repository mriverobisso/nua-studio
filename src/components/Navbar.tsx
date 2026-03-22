'use client';
import React, { useState, useEffect } from 'react';
import { Bell, Search, UserCircle, Clock } from 'lucide-react';

export default function Navbar() {
  const [ecTime, setEcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('es-EC', {
        timeZone: 'America/Guayaquil',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setEcTime(formatter.format(now));
    };
    
    updateTime(); // initial call
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="glass-panel" style={{ 
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem',
      padding: '1rem 2rem', borderTop: 0, borderLeft: 0, borderRight: 0, borderRadius: 0,
      position: 'sticky', top: 0, zIndex: 10
    }}>
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--glass-border)', width: '300px' }}>
          <Search size={18} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Buscar clientes, citas..." 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', marginLeft: '8px', width: '100%', fontFamily: 'var(--font-inter)' }} 
          />
        </div>

        {ecTime && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', background: 'rgba(24, 180, 170, 0.1)', padding: '6px 14px', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem' }}>
            <Clock size={16} /> <span>Ecuador: {ecTime}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
          <Bell size={22} />
          <span style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent)', width: '8px', height: '8px', borderRadius: '50%' }}></span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid var(--glass-border)', paddingLeft: '1.5rem' }}>
          <UserCircle size={32} color="var(--accent)" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Admin User</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Administrador General</span>
          </div>
        </div>
      </div>
    </header>
  );
}
