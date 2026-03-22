'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, User, LayoutDashboard, Settings } from 'lucide-react';

export default function Home() {
  return (
    <div className="layout-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '3rem' }}>
      
      <div style={{ textAlign: 'center', maxWidth: '600px' }} className="animate-fade-in">
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Welcome to <span className="hero-text">NÜA Studio</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.6' }}>
          This is the central hub for your studio's administration and the client-facing booking widget. 
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%' }} className="animate-fade-in delay-200">
        
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '12px', background: 'rgba(24, 180, 170, 0.1)', width: 'fit-content', borderRadius: '12px', color: 'var(--accent)' }}>
            <Calendar size={28} />
          </div>
          <h3 style={{ fontSize: '1.4rem' }}>Appointments</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage bookings with our interactive Kanban calendar system.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '12px', background: 'rgba(24, 180, 170, 0.1)', width: 'fit-content', borderRadius: '12px', color: 'var(--accent)' }}>
            <User size={28} />
          </div>
          <h3 style={{ fontSize: '1.4rem' }}>CRM & Clients</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Keep track of every client and view their complete treatment history.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '12px', background: 'rgba(24, 180, 170, 0.1)', width: 'fit-content', borderRadius: '12px', color: 'var(--accent)' }}>
            <LayoutDashboard size={28} />
          </div>
          <h3 style={{ fontSize: '1.4rem' }}>Administration</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full management over finances, stylists, users, and treatments.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }} className="animate-fade-in delay-300">
        <Link href="/dashboard" className="btn-primary" style={{ textDecoration: 'none' }}>
          Enter Admin Portal <ArrowRight size={18} />
        </Link>
        <button className="btn-secondary">
          View Client Widget
        </button>
      </div>
      
    </div>
  );
}
