'use client';

import React, { useState } from 'react';
import { Search, Plus, User, Phone, Mail, Clock, FileText, X, Star, History } from 'lucide-react';

export default function CRMPage() {
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const clients = [
    { id: 1, name: 'María Gómez', phone: '+593 99 123 4567', email: 'maria@gomez.com', lastVisit: '10 Oct 2026', totalVisits: 8, status: 'VIP', notes: 'Alérgica a productos con sulfatos.' },
    { id: 2, name: 'Ana Silva', phone: '+593 98 765 4321', email: 'ana@silva.com', lastVisit: '15 Oct 2026', totalVisits: 1, status: 'Nuevo', notes: '' },
    { id: 3, name: 'Sofía Reyes', phone: '+593 97 111 2222', email: 'sofia@reyes.com', lastVisit: '01 Nov 2026', totalVisits: 4, status: 'Recurrente', notes: 'Prefiere ser atendida por Anthony.' },
    { id: 4, name: 'Lucía Méndez', phone: '+593 96 333 4444', email: 'lucia@mendez.com', lastVisit: '20 Nov 2026', totalVisits: 12, status: 'VIP', notes: '' },
  ];

  const filteredClients = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));

  const historyLogs = [
    { date: '10 Oct 2026', service: 'Coloración Completa', stylist: 'Anthony', total: '$80.00' },
    { date: '02 Sep 2026', service: 'Corte y Peinado', stylist: 'Anthony', total: '$35.00' },
    { date: '15 Ago 2026', service: 'Manicura Spa', stylist: 'Carla', total: '$25.00' },
  ];

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>CRM / Directorio de Clientes</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Gestiona perfiles, historial de tratamientos y fidelidad de los clientes.</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} /> Nuevo Cliente
        </button>
      </div>

      <div className="glass-panel" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--glass-border)', width: '100%', maxWidth: '500px', marginBottom: '2rem' }}>
          <Search size={20} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, correo o teléfono..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', marginLeft: '12px', width: '100%', fontFamily: 'var(--font-inter)', fontSize: '1rem' }} 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', overflowY: 'auto', paddingBottom: '1rem' }}>
          {filteredClients.map((client, idx) => (
            <div 
              key={client.id} 
              className={`glass-panel delay-${(idx+1)*100}`}
              onClick={() => setSelectedClient(client)}
              style={{ padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s', border: '1px solid rgba(0,0,0,0.02)', background: 'var(--bg-primary)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--accent)' }}>
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{client.name}</h3>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', background: client.status === 'VIP' ? 'rgba(24, 180, 170, 0.1)' : 'var(--glass-border)', color: client.status === 'VIP' ? 'var(--accent)' : 'var(--text-secondary)', fontWeight: 500 }}>
                      {client.status}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={14} /> {client.phone}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={14} /> Última visita: {client.lastVisit}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={14} /> Visitas totales: {client.totalVisits}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedClient && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)', background: 'rgba(0,0,0,0.4)' }} className="animate-fade-in">
          <div className="glass-panel" style={{ background: 'var(--bg-primary)', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ padding: '2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: 'var(--bg-primary)', position: 'sticky', top: 0, zIndex: 10, borderRadius: '20px 20px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(24, 180, 170, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--accent)' }}>
                  {selectedClient.name.charAt(0)}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>{selectedClient.name}</h2>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={14} /> {selectedClient.phone}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={14} /> {selectedClient.email}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedClient(null)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={18} color="var(--accent)" /> Resumen
                  </h3>
                  <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Estado de Fidelidad</span>
                      <p style={{ fontWeight: 600, color: selectedClient.status === 'VIP' ? 'var(--accent)' : 'inherit' }}>{selectedClient.status}</p>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Total Visitas</span>
                      <p style={{ fontWeight: 600 }}>{selectedClient.totalVisits}</p>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Cliente Desde</span>
                      <p style={{ fontWeight: 600 }}>Enero 2025</p>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', margin: '2rem 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={18} color="var(--accent)" /> Notas Clínicas
                  </h3>
                  <textarea 
                    defaultValue={selectedClient.notes}
                    placeholder="Ninguna nota registrada..."
                    style={{ width: '100%', height: '120px', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-inter)', outline: 'none', resize: 'vertical' }}
                  />
                  <button className="btn-secondary" style={{ width: '100%', marginTop: '1rem', padding: '8px' }}>Guardar Notas</button>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <History size={18} color="var(--accent)" /> Historial de Tratamientos
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {historyLogs.map((log, lIdx) => (
                      <div key={lIdx} style={{ padding: '1.25rem', border: '1px solid var(--glass-border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{log.service}</h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Realizado por: {log.stylist}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ padding: '4px 10px', background: 'var(--glass-border)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500, display: 'inline-block', marginBottom: '0.5rem' }}>
                            {log.date}
                          </span>
                          <p style={{ fontWeight: 600, color: 'var(--accent)' }}>{log.total}</p>
                        </div>
                      </div>
                    ))}
                    <button className="btn-secondary" style={{ width: '100%', padding: '12px', marginTop: '0.5rem', borderStyle: 'dashed' }}>
                      Cargar historial completo...
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
