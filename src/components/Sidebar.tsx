'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, Scissors, Users, DollarSign, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  const [role, setRole] = useState('');

  useEffect(() => {
    // Default to Admin if not set, to not break existing session flows immediately
    setRole(localStorage.getItem('nua_role') || 'Admin');
  }, []);

  const allMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', roles: ['Admin', 'Stylist', 'Finance'] },
    { name: 'Citas', icon: Calendar, href: '/citas', roles: ['Admin', 'Stylist'] },
    { name: 'Tratamientos', icon: Scissors, href: '/tratamientos', roles: ['Admin', 'Stylist'] },
    { name: 'CRM / Clientes', icon: Users, href: '/crm', roles: ['Admin', 'Stylist', 'Finance'] },
    { name: 'Finanzas', icon: DollarSign, href: '/finanzas', roles: ['Admin', 'Finance'] },
    { name: 'Administración', icon: Settings, href: '/settings', roles: ['Admin'] },
  ];

  const menuItems = allMenuItems.filter(item => item.roles.includes(role || 'Admin'));

  return (
    <aside className="sidebar glass-panel" style={{ height: '100vh', position: 'sticky', top: 0, borderRadius: 0, borderTop: 0, borderBottom: 0, borderLeft: 0 }}>
      <div style={{ padding: '0 1rem 2rem 1rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--accent)' }} className="text-italic-accent">NÜA Studio</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Admin Portal</p>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
              borderRadius: '8px', textDecoration: 'none', color: 'var(--text-primary)',
              transition: 'background 0.2s',
            }}
            className="hover-bg"
          >
            <item.icon size={20} color="var(--accent)" />
            <span style={{ fontWeight: 500 }}>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--glass-border)', padding: '1.5rem 1rem 0 1rem' }}>
        <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '8px', width: '100%', textDecoration: 'none' }}>
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </Link>
      </div>
    </aside>
  );
}
