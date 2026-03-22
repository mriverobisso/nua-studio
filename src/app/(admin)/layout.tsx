import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-wrapper">
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Navbar />
        <main className="main-content" style={{ overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
