import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import { trpc } from '@/providers/trpc';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginMutation = trpc.adminAuth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem('admin_token', data.token);
      setError('');
      navigate('/admin');
    },
    onError: () => {
      setError('Invalid Email or Password');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0a0a0f' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl"
        style={{ background: '#14141f', border: '1px solid rgba(212,175,55,0.15)' }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl gold-gradient-bg flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard size={28} className="text-[#1a1a2e]" />
          </div>
          <h1 className="text-2xl font-bold mb-1 text-white">Brandify Admin</h1>
          <p className="text-sm" style={{ color: '#8888a0' }}>Sign in to manage your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 rounded-lg text-xs" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.18)', color: '#d4af37' }}>
            Local login: admin@brandify.local / BrandifyLocal!2026
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#8888a0' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all"
              style={{ background: '#1a1a2e', border: '1px solid #2a2a3f', color: '#e8e6f0' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#8888a0' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all"
              style={{ background: '#1a1a2e', border: '1px solid #2a2a3f', color: '#e8e6f0' }}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg text-sm text-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-3 gold-gradient-bg text-[#1a1a2e] font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 text-sm"
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm hover:text-[#d4af37] transition-colors"
            style={{ color: '#666680' }}
          >
            Back to Website
          </button>
        </div>
      </motion.div>
    </div>
  );
}
