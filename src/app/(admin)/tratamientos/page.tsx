'use client';

import React, { useState } from 'react';
import { Plus, Search, Tag, Box, Edit2, Trash2 } from 'lucide-react';

export default function TratamientosPage() {
  const [activeTab, setActiveTab] = useState('servicios');

  const servicios = [
    { id: 1, name: 'Coloración Completa', category: 'Hair', price: '$80.00', duration: '120 min' },
    { id: 2, name: 'Corte y Peinado', category: 'Hair', price: '$35.00', duration: '60 min' },
    { id: 3, name: 'Manicura Spa', category: 'Nails', price: '$25.00', duration: '45 min' },
    { id: 4, name: 'Pedicura Básica', category: 'Nails', price: '$20.00', duration: '45 min' },
    { id: 5, name: 'Tratamiento Capilar Keratina', category: 'Hair', price: '$120.00', duration: '150 min' },
  ];

  const inventario = [
    { id: 1, name: 'Tinte Rubio Cenizo Loreal', brand: 'Loreal', stock: 15, unitPrice: '$12.00', status: 'In Stock' },
    { id: 2, name: 'Shampoo Matizador', brand: 'Olaplex', stock: 4, unitPrice: '$28.00', status: 'Low Stock' },
    { id: 3, name: 'Esmalte Gel Rojo Clásico', brand: 'OPI', stock: 8, unitPrice: '$15.00', status: 'In Stock' },
    { id: 4, name: 'Tratamiento Keratina 1L', brand: 'Kativa', stock: 0, unitPrice: '$45.00', status: 'Out of Stock' },
  ];

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Tratamientos e Inventario</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Catálogo de servicios y control de stock de productos.</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} /> {activeTab === 'servicios' ? 'Nuevo Servicio' : 'Nuevo Producto'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)' }}>
        <button 
          onClick={() => setActiveTab('servicios')}
          style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', borderBottom: activeTab === 'servicios' ? '2px solid var(--accent)' : '2px solid transparent', color: activeTab === 'servicios' ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: activeTab === 'servicios' ? 600 : 400, fontSize: '1.1rem', transition: 'all 0.2s' }}
        >
          Catálogo de Servicios
        </button>
        <button 
          onClick={() => setActiveTab('inventario')}
          style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', borderBottom: activeTab === 'inventario' ? '2px solid var(--accent)' : '2px solid transparent', color: activeTab === 'inventario' ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: activeTab === 'inventario' ? 600 : 400, fontSize: '1.1rem', transition: 'all 0.2s' }}
        >
          Inventario y Productos
        </button>
      </div>

      <div className="glass-panel" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--glass-border)', width: '350px' }}>
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder={activeTab === 'servicios' ? "Buscar servicios..." : "Buscar productos..."} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', marginLeft: '8px', width: '100%', fontFamily: 'var(--font-inter)' }} />
          </div>
          <button className="btn-secondary" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {activeTab === 'servicios' ? <Tag size={16} /> : <Box size={16} />} 
            Filtrar {activeTab === 'servicios' ? 'Categoría' : 'Marca'}
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Nombre</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>{activeTab === 'servicios' ? 'Categoría' : 'Marca'}</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>{activeTab === 'servicios' ? 'Duración' : 'Stock actual'}</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Precio {activeTab === 'inventario' && 'Unidad'}</th>
                <th style={{ padding: '1rem', fontWeight: 500, textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'servicios' ? 
                servicios.map(svc => (
                  <tr key={svc.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.02)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{svc.name}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '4px 10px', background: 'var(--glass-border)', borderRadius: '20px', fontSize: '0.85rem' }}>{svc.category}</span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{svc.duration}</td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{svc.price}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginRight: '1rem' }}><Edit2 size={18} /></button>
                      <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))
              :
                inventario.map(inv => (
                  <tr key={inv.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.02)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{inv.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{inv.brand}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 500, color: inv.stock === 0 ? '#ef4444' : inv.stock < 5 ? '#f59e0b' : 'var(--accent)', background: inv.stock === 0 ? 'rgba(239, 68, 68, 0.1)' : inv.stock < 5 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(24, 180, 170, 0.1)' }}>
                        {inv.stock} unid. ({inv.status})
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{inv.unitPrice}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginRight: '1rem' }}><Edit2 size={18} /></button>
                      <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
