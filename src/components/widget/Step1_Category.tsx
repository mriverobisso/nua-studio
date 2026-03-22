import React from 'react';
import { Scissors, Sparkles, Smile, Eye } from 'lucide-react';

interface Props {
  onNext: (category: string) => void;
}

export default function Step1_Category({ onNext }: Props) {
  const categories = [
    { id: 'Hair', name: 'Cabello', icon: <Scissors size={32} />, bg: 'rgba(24, 180, 170, 0.1)' },
    { id: 'Nails', name: 'Uñas', icon: <Sparkles size={32} />, bg: 'rgba(255, 107, 107, 0.1)' },
    { id: 'SPA', name: 'SPA & Masajes', icon: <Smile size={32} />, bg: 'rgba(74, 144, 226, 0.1)' },
    { id: 'Lashes', name: 'Pestañas y Cejas', icon: <Eye size={32} />, bg: 'rgba(155, 89, 182, 0.1)' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 600 }}>¿Qué deseas hacerte hoy?</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Selecciona una categoría para comenzar tu reserva.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => onNext(cat.id)}
            className="glass-panel"
            style={{ 
              padding: '2.5rem 1rem', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '1rem', 
              cursor: 'pointer', 
              border: '1px solid var(--glass-border)', 
              background: 'var(--bg-primary)', 
              borderRadius: '24px', 
              transition: 'all 0.3s ease',
              animationDelay: `${idx * 100}ms`
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ padding: '20px', background: cat.bg, borderRadius: '50%', color: 'var(--text-primary)' }}>
              {cat.icon}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{cat.name}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}
