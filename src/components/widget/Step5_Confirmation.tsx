import React, { useState } from 'react';
import { CheckCircle, Calendar, Clock, DollarSign, User } from 'lucide-react';

interface Props {
  bookingData: {
    category: string;
    service: any;
    date: string;
    time: string;
    email: string;
  };
}

export default function Step5_Confirmation({ bookingData }: Props) {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFinalConfirm = () => {
    setLoading(true);
    // Simulate network request to save booking in CRM/Kanban
    setTimeout(() => {
      setConfirmed(true);
      setLoading(false);
    }, 1500);
  };

  if (confirmed) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '3rem 1rem', textAlign: 'center' }}>
        <div style={{ color: 'var(--accent)' }}>
          <CheckCircle size={80} strokeWidth={1.5} />
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 600 }}>¡Cita Confirmada!</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '300px' }}>
          Te hemos enviado un correo con los detalles de tu cita. ¡Te esperamos en NÜA Studio!
        </p>
        <button className="btn-primary" style={{ padding: '12px 24px', borderRadius: '12px', marginTop: '1rem' }} onClick={() => window.location.reload()}>
          Nueva Reserva
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 600 }}>Resumen de Reserva</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Verifica que todo esté correcto.</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ color: 'var(--accent)', marginTop: '4px' }}><User size={20}/></div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Cliente Registrado</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{bookingData.email}</p>
          </div>
        </div>
        
        <div style={{ width: '100%', height: '1px', background: 'var(--glass-border)' }}></div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ color: 'var(--accent)', marginTop: '4px' }}><CheckCircle size={20}/></div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Servicio</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{bookingData.service?.name}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ color: 'var(--accent)', marginTop: '4px' }}><Calendar size={20}/></div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Fecha</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{bookingData.date}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ color: 'var(--accent)', marginTop: '4px' }}><Clock size={20}/></div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Hora</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{bookingData.time}</p>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'var(--glass-border)' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Total Estimado</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>{bookingData.service?.price}</p>
        </div>

      </div>

      <button onClick={handleFinalConfirm} disabled={loading} className="btn-primary" style={{ padding: '16px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600 }}>
        {loading ? 'Procesando Resreva...' : 'Confirmar Reserva Oficial'}
      </button>

    </div>
  );
}
