import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar as CalIcon } from 'lucide-react';

interface Props {
  onNext: (dateStr: string, timeStr: string) => void;
  onBack: () => void;
}

export default function Step3_Calendar({ onNext, onBack }: Props) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate next 14 days
  const today = new Date();
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    // Filter out Sunday and Monday (Nua Studio closed)
    if (d.getDay() === 0 || d.getDay() === 1) return null;
    return d;
  }).filter(Boolean) as Date[];

  const times = ['10:00', '11:00', '12:30', '14:00', '15:30', '17:00', '18:00'];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={onBack} style={{ padding: '8px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Elige Fecha y Hora</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Selecciona según la disponibilidad.</p>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><CalIcon size={18}/> Días Disponibles</h3>
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', WebkitOverflowScrolling: 'touch' }}>
          {dates.map((d, i) => {
             const dayName = d.toLocaleDateString('es-ES', { weekday: 'short' });
             const dayNum = d.getDate();
             const monthName = d.toLocaleDateString('es-ES', { month: 'short' });
             const isSelected = selectedDate === i;

             return (
               <button
                 key={i}
                 onClick={() => setSelectedDate(i)}
                 style={{
                   flex: '0 0 auto',
                   width: '80px',
                   height: '100px',
                   borderRadius: '16px',
                   border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--glass-border)'}`,
                   background: isSelected ? 'rgba(24, 180, 170, 0.15)' : 'var(--bg-primary)',
                   color: 'var(--text-primary)',
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                   justifyContent: 'center',
                   gap: '4px',
                   cursor: 'pointer',
                   transition: 'all 0.2s',
                   textTransform: 'capitalize'
                 }}
               >
                 <span style={{ fontSize: '0.9rem', color: isSelected ? 'var(--accent)' : 'var(--text-secondary)' }}>{dayName}</span>
                 <span style={{ fontSize: '1.8rem', fontWeight: 700 }}>{dayNum}</span>
                 <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{monthName}</span>
               </button>
             );
          })}
        </div>
      </div>

      {selectedDate !== null && (
        <div className="animate-fade-in" style={{ animationDuration: '0.3s' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Horarios</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
            {times.map(t => (
               <button
                 key={t}
                 onClick={() => setSelectedTime(t)}
                 style={{
                   padding: '12px',
                   borderRadius: '12px',
                   border: `1px solid ${selectedTime === t ? 'var(--accent)' : 'var(--glass-border)'}`,
                   background: selectedTime === t ? 'var(--accent)' : 'var(--bg-primary)',
                   color: selectedTime === t ? '#000' : 'var(--text-primary)',
                   fontWeight: selectedTime === t ? 600 : 400,
                   cursor: 'pointer',
                   transition: 'all 0.2s'
                 }}
               >
                 {t}
               </button>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={() => {
          if (selectedDate !== null && selectedTime) {
            onNext(dates[selectedDate].toLocaleDateString('es-ES'), selectedTime);
          }
        }}
        disabled={selectedDate === null || !selectedTime}
        className="btn-primary"
        style={{ marginTop: '1rem', width: '100%', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', opacity: (selectedDate === null || !selectedTime) ? 0.5 : 1 }}
      >
        Continuar <ArrowRight size={18} />
      </button>

    </div>
  );
}
