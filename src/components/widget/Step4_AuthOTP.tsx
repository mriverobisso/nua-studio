import React, { useState, useRef } from 'react';
import { ArrowLeft, Mail, CheckCircle, ShieldAlert } from 'lucide-react';

interface Props {
  onSuccess: (email: string) => void;
  onBack: () => void;
}

export default function Step4_AuthOTP({ onSuccess, onBack }: Props) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action: 'send' })
      });
      const data = await res.json();
      
      if (res.ok) {
        setStep('otp');
      } else {
        setError(data.error || 'Error al enviar código');
      }
    } catch (err) {
      setError('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const code = otp.join('');
    if (code.length < 6) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, action: 'verify' })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        onSuccess(email);
      } else {
        setError(data.error || 'Código inválido');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Auto-verify if last digit
    if (index === 5 && value) {
      // Small trick: state takes a tick to update, but we have the new array
      setTimeout(() => {
        const fullCode = newOtp.join('');
        if (fullCode.length === 6) {
          // Trigger verify manually using fullCode wouldn't work easily with the button's onClick ref, 
          // Best to let user click or handle it in useEffect. For demo, we rely on the Verify button.
        }
      }, 50);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={step === 'otp' ? () => setStep('email') : onBack} style={{ padding: '8px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Tus Datos</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Validaremos tu identidad sin contraseñas.</p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
        {step === 'email' ? (
          <form onSubmit={handleSendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(24, 180, 170, 0.1)', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                <Mail size={32} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Correo Electrónico</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Te enviaremos un código de validación seguro de un solo uso (OTP).</p>
            </div>

            <div style={{ position: 'relative' }}>
              <input 
                type="email" 
                required 
                placeholder="tu@correo.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: '#fff', fontSize: '1.1rem', textAlign: 'center' }}
              />
            </div>

            {error && <p style={{ color: '#ef4444', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}

            <button type="submit" disabled={loading || !email} className="btn-primary" style={{ padding: '16px', borderRadius: '12px', marginTop: '0.5rem' }}>
              {loading ? 'Enviando...' : 'Recibir Código Seguro'}
            </button>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(24, 180, 170, 0.1)', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                <ShieldAlert size={32} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Ingresa tu Código</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Enviado a <strong>{email}</strong></p>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { inputRefs.current[i] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  style={{ 
                    width: '45px', height: '55px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)',
                    color: '#fff', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold'
                  }}
                />
              ))}
            </div>

            {error && <p style={{ color: '#ef4444', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}

            <button onClick={handleVerifyOTP} disabled={loading || otp.join('').length < 6} className="btn-primary" style={{ padding: '16px', borderRadius: '12px', marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              {loading ? 'Verificando...' : 'Confirmar Identidad'} <CheckCircle size={18}/>
            </button>
            
            <button onClick={() => setStep('email')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', textDecoration: 'underline', cursor: 'pointer', marginTop: '0.5rem' }}>
              Usar otro correo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
