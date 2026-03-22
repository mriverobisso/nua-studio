import React from 'react';
import { ArrowLeft, Clock, DollarSign } from 'lucide-react';

interface Props {
  category: string;
  onNext: (service: any) => void;
  onBack: () => void;
}

export default function Step2_Service({ category, onNext, onBack }: Props) {
  // Mock exact services based on chosen category
  const getServices = () => {
    switch (category) {
      case 'Hair': return [
        { id: '1', name: 'Balayage Premium', duration: '180 min', price: '$80.00' },
        { id: '2', name: 'Corte y Secado', duration: '60 min', price: '$25.00' },
        { id: '3', name: 'Keratina', duration: '120 min', price: '$90.00' }
      ];
      case 'Nails': return [
        { id: '4', name: 'Manicure Gel Color', duration: '45 min', price: '$15.00' },
        { id: '5', name: 'Pedicura Spa', duration: '60 min', price: '$20.00' },
        { id: '6', name: 'Acrílicas Esculpidas', duration: '120 min', price: '$35.00' }
      ];
      case 'SPA': return [
        { id: '7', name: 'Masaje Relajante', duration: '60 min', price: '$40.00' },
        { id: '8', name: 'Masaje Descontracturante', duration: '60 min', price: '$45.00' },
        { id: '9', name: 'Limpieza Facial Profunda', duration: '90 min', price: '$35.00' }
      ];
      case 'Lashes': return [
        { id: '10', name: 'Extensiones Pelo a Pelo', duration: '90 min', price: '$35.00' },
        { id: '11', name: 'Lifting de Pestañas', duration: '60 min', price: '$25.00' },
        { id: '12', name: 'Diseño y Perfilado de Cejas', duration: '30 min', price: '$10.00' }
      ];
      default: return [];
    }
  };

  const services = getServices();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={onBack} style={{ padding: '8px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Selecciona un Servicio</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Categoría: {category}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {services.map((svc, idx) => (
          <button
            key={svc.id}
            onClick={() => onNext(svc)}
            className="glass-panel"
            style={{ 
              padding: '1.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              cursor: 'pointer', 
              border: '1px solid var(--glass-border)', 
              background: 'var(--bg-primary)', 
              borderRadius: '16px', 
              transition: 'all 0.2s ease',
              animationDelay: `${idx * 50}ms`,
              textAlign: 'left'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '6px' }}>{svc.name}</h3>
              <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14}/> {svc.duration}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={14}/> {svc.price}</span>
              </div>
            </div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(24, 180, 170, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              +
            </div>
          </button>
        ))}
        {services.length === 0 && <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No hay servicios disponibles aquí.</p>}
      </div>
    </div>
  );
}
