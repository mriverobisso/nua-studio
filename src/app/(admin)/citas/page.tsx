'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Plus, Clock, X, Save, Edit2, Box, Users, AlertCircle } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

function CitasContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const columns = ['Pendientes', 'Confirmadas', 'En Progreso', 'Completadas'];
  
  const [appointments, setAppointments] = useState([
    { id: 1, client: 'María Gómez', service: 'Coloración', time: '10:00 AM', duration: '120 min', overlapAllowed: true, status: 'En Progreso', stylist: 'Anthony', notes: 'Tiempo de pose: 45m. Puede atender otro cliente.' },
    { id: 2, client: 'Ana Silva', service: 'Manicura Spa', time: '11:30 AM', duration: '45 min', overlapAllowed: false, status: 'Confirmadas', stylist: 'Carla', notes: 'Primera visita.' },
    { id: 3, client: 'Sofía Reyes', service: 'Corte', time: '02:00 PM', duration: '60 min', overlapAllowed: false, status: 'Pendientes', stylist: 'Anthony', notes: 'Tiene el cabello maltratado.' },
    { id: 4, client: 'Lucía Méndez', service: 'Tratamiento Pelo', time: '10:30 AM', duration: '60 min', overlapAllowed: false, status: 'Confirmadas', stylist: 'Anthony', notes: 'Cliente atendida durante el tiempo de pose de María Gómez.' },
  ]);

  const [selectedApt, setSelectedApt] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (searchParams.get('new') === 'true') setIsCreating(true);
    
    const aptId = searchParams.get('id');
    if (aptId) {
      const found = appointments.find(a => a.id === parseInt(aptId));
      if (found) setSelectedApt(found);
    }
  }, [searchParams, appointments]);

  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData('aptId', id.toString());
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    const aptId = parseInt(e.dataTransfer.getData('aptId'));
    setAppointments(prev => prev.map(apt => apt.id === aptId ? { ...apt, status: newStatus } : apt));
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const closeModals = () => {
    setSelectedApt(null);
    setIsCreating(false);
    if (searchParams.has('new') || searchParams.has('id')) {
      router.replace('/citas'); // clean URL
    }
  };

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Citas y Agenda</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Gestión Kanban de citas con soporte para tiempos de pose iterativos.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsCreating(true)}>
          <Plus size={18} /> Nueva Cita
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, overflowX: 'auto', paddingBottom: '1rem', alignItems: 'stretch' }}>
        {columns.map((col, cIdx) => (
          <div 
            key={col} 
            className={`glass-panel delay-${(cIdx+1)*100}`} 
            style={{ flex: '0 0 320px', display: 'flex', flexDirection: 'column', height: '100%', background: 'rgba(0,0,0,0.01)' }}
            onDrop={(e) => handleDrop(e, col)}
            onDragOver={handleDragOver}
          >
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{col}</h3>
              <span style={{ background: 'var(--glass-border)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {appointments.filter(a => a.status === col).length}
              </span>
            </div>
            
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {appointments.filter(a => a.status === col).map(apt => (
                <div 
                  key={apt.id} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, apt.id)}
                  onClick={() => setSelectedApt(apt)}
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.25rem', cursor: 'grab', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', position: 'relative', transition: 'transform 0.2s' }}
                  className="hover-bg"
                >
                  <button onClick={(e) => { e.stopPropagation(); setSelectedApt(apt); }} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <Edit2 size={16} />
                  </button>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{apt.client}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{apt.service} • {apt.stylist}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 500 }}>
                    <span style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(24, 180, 170, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> {apt.time} ({apt.duration})
                    </span>
                    {apt.overlapAllowed && (
                      <span style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={14} /> Solapamiento 
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isCreating && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)', background: 'rgba(0,0,0,0.4)' }} className="animate-fade-in">
          <div className="glass-panel" style={{ background: 'var(--bg-primary)', width: '100%', maxWidth: '600px', padding: '2rem', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Crear Nueva Cita</h2>
              <button onClick={closeModals} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Cliente</label>
                <input type="text" placeholder="Buscar cliente..." style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Servicio / Tratamiento</label>
                  <select style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)', outline: 'none' }}>
                    <option>Coloración</option>
                    <option>Corte</option>
                    <option>Manicura</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Estilista</label>
                  <select style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)', outline: 'none' }}>
                    <option>Anthony</option>
                    <option>Carla</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hora Inicio</label>
                  <input type="time" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Duración Estimada</label>
                  <input type="text" placeholder="Ej: 30 min, 2h..." style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)', outline: 'none' }} />
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: '20px', height: '20px', accentColor: '#3b82f6' }} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>Permitir citas simultáneas</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Útil para tiempos de pose largos (ej. tinturación).</p>
                </div>
              </label>

              <button className="btn-primary" onClick={closeModals} style={{ width: '100%', padding: '14px', marginTop: '1rem' }}>Programar Cita</button>
            </div>
          </div>
        </div>
      )}

      {selectedApt && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)', background: 'rgba(0,0,0,0.4)' }} className="animate-fade-in">
          <div className="glass-panel" style={{ background: 'var(--bg-primary)', width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'var(--bg-primary)', zIndex: 10, borderRadius: '20px 20px 0 0' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Detalle de Cita</h2>
              <button onClick={closeModals} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Cliente</label>
                  <h3 style={{ fontSize: '1.2rem' }}>{selectedApt.client} <span style={{ fontSize: '0.8rem', color: 'var(--accent)', cursor: 'pointer', marginLeft: '8px' }}>(Ver Perfil CRM)</span></h3>
                </div>
                <div>
                  <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Hora e Información de Tiempo</label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600 }}>{selectedApt.time}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>| Duración: {selectedApt.duration}</span>
                  </div>
                </div>
              </div>

              {selectedApt.overlapAllowed && (
                <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <AlertCircle size={20} color="#3b82f6" style={{ marginTop: '2px' }} />
                  <div>
                    <p style={{ fontWeight: 600, color: '#3b82f6', fontSize: '0.95rem' }}>Cita con Trabajo en Paralelo Habilitado</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Esta cita tiene un tiempo de espera (ej. tiempo de pose). El estilista tiene permitida la asignación de otros clientes mientras este tratamiento hace efecto.</p>
                  </div>
                </div>
              )}

              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Servicio Solicitado y Asignación</label>
                <div style={{ padding: '1rem', background: 'rgba(24, 180, 170, 0.05)', border: '1px solid rgba(24, 180, 170, 0.2)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 500 }}>{selectedApt.service}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Estilista: {selectedApt.stylist}</span>
                </div>
              </div>

              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Log de Tratamiento e Inventario (Uso del estilista)</label>
                <div style={{ border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1rem' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Carga los productos o tratamientos adicionales usados durante la sesión para el registro histórico y el cobro final.</p>
                  <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Box size={16} /> Añadir Producto o Tratamiento Utilizado
                  </button>
                </div>
              </div>

              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Notas Clínicas / Comentarios (CRM)</label>
                <textarea 
                  defaultValue={selectedApt.notes}
                  placeholder="Añade notas sobre el procedimiento, fórmulas de color, o comentarios del cliente..."
                  style={{ width: '100%', height: '100px', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-inter)', outline: 'none', resize: 'vertical' }}
                />
              </div>

            </div>

            <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', background: 'var(--bg-primary)', position: 'sticky', bottom: 0, borderRadius: '0 0 20px 20px' }}>
              <button className="btn-secondary" onClick={closeModals}>Cancelar</button>
              <button className="btn-primary" onClick={closeModals}><Save size={18} /> Guardar Cambios</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function CitasWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CitasContent />
    </Suspense>
  );
}
