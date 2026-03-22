'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // Hardcoded credentials as requested by user
      if (email === 'admin@nuastudio.ec' && password === 'NUAStudio12345@') {
        localStorage.setItem('nua_role', 'Admin');
        router.push('/dashboard');
      } else if (email === 'finanzas@nuastudio.ec' && password === '123456') {
        localStorage.setItem('nua_role', 'Finance');
        router.push('/dashboard');
      } else if (email === 'estilista@nuastudio.ec' && password === '123456') {
        localStorage.setItem('nua_role', 'Stylist');
        router.push('/dashboard');
      } else {
        setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Left side: Image/Branding */}
      <div style={{ flex: 1, display: { xs: 'none', md: 'flex' }, position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(24,180,170,0.1) 0%, rgba(20,20,20,1) 100%)' }}>
         <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 }} />
         <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', height: '100%' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', background: 'linear-gradient(to right, #18b4aa, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              NÜA Studio
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', maxWidth: '400px' }}>
              Plataforma de administración, reservas y control financiero para profesionales de la belleza.
            </p>
         </div>
      </div>

      {/* Right side: Login Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '3rem', borderRadius: '24px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 600 }}>Bienvenido</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Correo Electrónico</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@nuastudio.ec" 
                  className="input-field" 
                  style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)', fontSize: '1rem' }} 
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Contraseña</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="input-field" 
                  style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)', fontSize: '1rem' }} 
                />
              </div>
            </div>

            {error && (
              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isLoading}
              style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              {isLoading ? 'Verificando...' : 'Ingresar al Portal'} {!isLoading && <ArrowRight size={18} />}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}
