import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Users, DollarSign, FileText,
  Factory, Image, Settings, LogOut, Sparkles, ChevronRight
} from 'lucide-react';
import { trpc } from '@/providers/trpc';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
  { id: 'customers', label: 'Customers', icon: Users, path: '/admin/customers' },
  { id: 'quotations', label: 'Quotations', icon: FileText, path: '/admin/quotations' },
  { id: 'pricing', label: 'Pricing', icon: DollarSign, path: '/admin/pricing' },
  { id: 'factories', label: 'Factories', icon: Factory, path: '/admin/factories' },
  { id: 'media', label: 'Media Library', icon: Image, path: '/admin/media' },
  { id: 'ai', label: 'AI Settings', icon: Settings, path: '/admin/ai-settings' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

  const meQuery = trpc.adminAuth.me.useQuery(undefined, {
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    if (meQuery.isError || (meQuery.isSuccess && !meQuery.data)) {
      localStorage.removeItem('admin_token');
      navigate('/admin/login');
    }
  }, [token, meQuery.isSuccess, meQuery.isError, meQuery.data, navigate]);

  if (!token || meQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
        <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#0a0a0f' }}>
      {/* Sidebar */}
      <aside className="w-64 shrink-0 sticky top-0 h-screen overflow-y-auto border-r" style={{ background: '#14141f', borderColor: '#1e1e2d' }}>
        <div className="p-4 border-b" style={{ borderColor: '#1e1e2d' }}>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gold-gradient-bg flex items-center justify-center">
              <Sparkles size={20} className="text-[#1a1a2e]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Brandify</h1>
              <p className="text-xs" style={{ color: '#666680' }}>Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'text-[#d4af37]'
                    : 'text-[#8888a0] hover:text-white hover:bg-white/5'
                }`}
                style={isActive ? { background: 'rgba(212,175,55,0.08)' } : undefined}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 mt-auto border-t" style={{ borderColor: '#1e1e2d' }}>
          <button
            onClick={() => {
              localStorage.removeItem('admin_token');
              navigate('/admin/login');
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 z-30 border-b px-6 py-3 flex items-center justify-between" style={{ background: '#14141f', borderColor: '#1e1e2d' }}>
          <div className="flex items-center gap-2">
            {navItems.find(n => n.path === location.pathname) && (
              <>
                <span className="text-sm" style={{ color: '#666680' }}>Admin</span>
                <ChevronRight size={14} style={{ color: '#666680' }} />
                <span className="text-sm text-white font-medium">
                  {navItems.find(n => n.path === location.pathname)?.label || 'Dashboard'}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(212,175,55,0.1)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.15)' }}>
              {meQuery.data?.email || 'Admin'}
            </span>
          </div>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
