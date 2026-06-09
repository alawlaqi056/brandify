import { motion } from 'framer-motion';
import { ShoppingBag, Users, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import { formatAED } from '../lib/data';

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  submitted: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Submitted' },
  under_review: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', label: 'Under Review' },
  quotation_preparing: { bg: 'bg-purple-500/10', text: 'text-purple-400', label: 'Quotation' },
  quotation_sent: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', label: 'Quote Sent' },
  waiting_approval: { bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'Approval' },
  payment_pending: { bg: 'bg-pink-500/10', text: 'text-pink-400', label: 'Payment' },
  production_started: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', label: 'Production' },
  packaging: { bg: 'bg-teal-500/10', text: 'text-teal-400', label: 'Packaging' },
  quality_check: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', label: 'Quality' },
  ready_for_delivery: { bg: 'bg-lime-500/10', text: 'text-lime-400', label: 'Ready' },
  completed: { bg: 'bg-green-500/10', text: 'text-green-400', label: 'Completed' },
  cancelled: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'Cancelled' },
};

export default function AdminDashboard() {
  const { data: orders } = trpc.orders.list.useQuery({});

  const stats = {
    total: orders?.length || 0,
    submitted: orders?.filter(o => o.status === 'submitted').length || 0,
    inProgress: orders?.filter(o => ['under_review', 'quotation_preparing', 'quotation_sent', 'waiting_approval', 'payment_pending'].includes(o.status)).length || 0,
    completed: orders?.filter(o => o.status === 'completed').length || 0,
    totalValue: orders?.reduce((sum, o) => sum + (o.estimatedPrice || 0), 0) || 0,
  };

  const recentOrders = orders?.slice(0, 5) || [];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: stats.total, icon: ShoppingBag, accent: '#d4af37' },
          { label: 'New', value: stats.submitted, icon: Clock, accent: '#3b82f6' },
          { label: 'In Progress', value: stats.inProgress, icon: TrendingUp, accent: '#f59e0b' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, accent: '#10b981' },
        ].map((s, i) => (
          <div key={i} className="p-5 rounded-xl" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${s.accent}15` }}>
                <s.icon size={20} style={{ color: s.accent }} />
              </div>
              <span className="text-sm" style={{ color: '#8888a0' }}>{s.label}</span>
            </div>
            <p className="text-3xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-6 rounded-xl" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
          <h3 className="text-lg font-semibold mb-4 text-white">Recent Orders</h3>
          {recentOrders.length === 0 ? (
            <div className="text-center py-8" style={{ color: '#666680' }}>No orders yet</div>
          ) : (
            <div className="space-y-2">
              {recentOrders.map(order => {
                const c = statusColors[order.status] || statusColors.submitted;
                return (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>{c.label}</span>
                      <div>
                        <p className="text-sm font-medium text-white">{order.orderId}</p>
                        <p className="text-xs" style={{ color: '#666680' }}>{order.category} &bull; {order.customer?.fullName}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-[#d4af37]">{formatAED(order.estimatedPrice || 0)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-xl" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign size={20} className="text-[#d4af37]" />
              <span className="text-sm" style={{ color: '#8888a0' }}>Total Value</span>
            </div>
            <p className="text-2xl font-bold text-[#d4af37]">{formatAED(stats.totalValue)}</p>
          </div>
          <div className="p-6 rounded-xl" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
            <div className="flex items-center gap-3 mb-2">
              <Users size={20} className="text-blue-400" />
              <span className="text-sm" style={{ color: '#8888a0' }}>Categories</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Perfumes', 'Bags', 'Eyewear', 'Watches'].map(cat => {
                const count = orders?.filter(o => o.category === cat).length || 0;
                return (
                  <span key={cat} className="px-3 py-1 rounded-full text-xs" style={{ background: '#1a1a2e', color: '#8888a0', border: '1px solid #2a2a3f' }}>
                    {cat}: {count}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
