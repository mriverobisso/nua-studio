import { Users, Calendar, TrendingUp, Scissors } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const kpis = [
    { title: 'Citas Hoy', value: '12', subtitle: '+2 vs ayer', icon: Calendar },
    { title: 'Nuevos Clientes', value: '4', subtitle: 'Esta semana', icon: Users },
    { title: 'Ingresos Hoy', value: '$850', subtitle: '+15% vs promedio', icon: TrendingUp },
    { title: 'Tratamientos Activos', value: '28', subtitle: 'En catálogo', icon: Scissors },
  ];

  const upcomingAppointments = [
    { id: 1, client: 'María Gómez', service: 'Coloración Completa', time: '10:00 AM', status: 'En Progreso' },
    { id: 2, client: 'Ana Silva', service: 'Manicura Spa', time: '11:30 AM', status: 'Confirmada' },
    { id: 3, client: 'Sofía Reyes', service: 'Corte y Peinado', time: '02:00 PM', status: 'Pendiente' },
    { id: 4, client: 'Lucía Méndez', service: 'Tratamiento Capilar', time: '04:00 PM', status: 'Confirmada' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Resumen general del día y métricas principales.</p>
      </div>

      {/* KPI Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {kpis.map((kpi, idx) => (
          <div key={idx} className={`glass-panel delay-${(idx+1)*100}`} style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{kpi.title}</p>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{kpi.value}</h3>
              <p style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 500 }}>{kpi.subtitle}</p>
            </div>
            <div style={{ padding: '12px', background: 'rgba(24, 180, 170, 0.1)', borderRadius: '12px', color: 'var(--accent)' }}>
              <kpi.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity / Next Appointments */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="glass-panel delay-300" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Próximas Citas</h3>
            <Link href="/citas" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', textDecoration: 'none' }}>Ver Agenda</Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {upcomingAppointments.map((apt) => (
              <Link href={`/citas?id=${apt.id}`} key={apt.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', background: 'var(--bg-primary)' }} className="hover-bg">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--accent)' }}>
                      {apt.client.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 600 }}>{apt.client}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{apt.service}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 600 }}>{apt.time}</p>
                    <span style={{ 
                      display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 500, marginTop: '4px',
                      backgroundColor: apt.status === 'Confirmada' ? 'rgba(24, 180, 170, 0.1)' : apt.status === 'En Progreso' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: apt.status === 'Confirmada' ? 'var(--accent)' : apt.status === 'En Progreso' ? '#3b82f6' : '#f59e0b'
                    }}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-panel delay-300" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Acciones Rápidas</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/citas?new=true" className="btn-primary" style={{ width: '100%', justifyContent: 'flex-start', gap: '8px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Calendar size={18} /> Nueva Cita
            </Link>
            <Link href="/crm?new=true" className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', gap: '8px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Users size={18} /> Registrar Cliente
            </Link>
            <Link href="/tratamientos" className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', gap: '8px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Scissors size={18} /> Ver Catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
