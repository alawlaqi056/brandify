import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, X, RefreshCw } from 'lucide-react';
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

const statusFlow = ['submitted', 'under_review', 'quotation_preparing', 'quotation_sent', 'waiting_approval', 'payment_pending', 'production_started', 'packaging', 'quality_check', 'ready_for_delivery', 'completed'];

export default function AdminOrders() {
  const utils = trpc.useUtils();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [actionError, setActionError] = useState('');

  const { data: orders, isLoading } = trpc.orders.list.useQuery({ status: statusFilter || undefined, search: search || undefined });
  const { data: detail } = trpc.orders.getById.useQuery({ id: selectedId! }, { enabled: !!selectedId });

  const updateStatus = trpc.orders.updateStatus.useMutation({
    onSuccess: () => { utils.orders.list.invalidate(); utils.orders.getById.invalidate(); setNewStatus(''); setStatusNote(''); setActionError(''); },
    onError: () => setActionError('Status update failed. Please try again.'),
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#666680' }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            style={{ background: '#14141f', border: '1px solid #1e1e2d', color: '#e8e6f0' }} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
          style={{ background: '#14141f', border: '1px solid #1e1e2d', color: '#e8e6f0' }}>
          <option value="">All Status</option>
          {Object.entries(statusColors).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <button onClick={() => { setSearch(''); setStatusFilter(''); }}
          className="px-4 py-3 rounded-xl text-sm border flex items-center gap-2 hover:border-[#d4af37]"
          style={{ background: '#14141f', borderColor: '#1e1e2d', color: '#8888a0' }}>
          <RefreshCw size={16} /> Reset
        </button>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
        {isLoading ? (
          <div className="p-12 text-center" style={{ color: '#666680' }}>Loading...</div>
        ) : !orders || orders.length === 0 ? (
          <div className="p-12 text-center" style={{ color: '#666680' }}>No orders found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: '#1e1e2d' }}>
                  {['Order ID', 'Customer', 'Category', 'Status', 'Amount', 'Date', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: '#666680' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#1e1e2d' }}>
                {orders.map(order => {
                  const c = statusColors[order.status] || statusColors.submitted;
                  return (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-sm font-mono font-medium text-white">{order.orderId}</td>
                      <td className="px-4 py-3"><p className="text-sm font-medium text-white">{order.customer?.fullName}</p><p className="text-xs" style={{ color: '#666680' }}>{order.customer?.email}</p></td>
                      <td className="px-4 py-3 text-sm" style={{ color: '#8888a0' }}>{order.category}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>{c.label}</span></td>
                      <td className="px-4 py-3 text-sm font-medium text-[#d4af37]">{formatAED(order.estimatedPrice || 0)}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#666680' }}>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}</td>
                      <td className="px-4 py-3"><button onClick={() => setSelectedId(order.id)} className="p-2 rounded-lg hover:bg-white/5" style={{ color: '#8888a0' }}><Eye size={18} /></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedId && detail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedId(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()}
            className="rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">{detail.orderId}</h2>
              <button onClick={() => setSelectedId(null)} className="p-2 hover:bg-white/5 rounded-lg" style={{ color: '#8888a0' }}><X size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4 p-4 rounded-xl" style={{ background: '#0f0f1a', border: '1px solid #1e1e2d' }}>
              <div><p className="text-xs" style={{ color: '#666680' }}>Name</p><p className="text-sm text-white">{detail.customer?.fullName}</p></div>
              <div><p className="text-xs" style={{ color: '#666680' }}>Email</p><p className="text-sm text-white">{detail.customer?.email}</p></div>
              <div><p className="text-xs" style={{ color: '#666680' }}>Phone</p><p className="text-sm text-white">{detail.customer?.phone}</p></div>
              <div><p className="text-xs" style={{ color: '#666680' }}>Country</p><p className="text-sm text-white">{detail.customer?.country}</p></div>
            </div>
            {detail.productSelections && (
              <div className="p-4 rounded-xl mb-4" style={{ background: '#0f0f1a', border: '1px solid #1e1e2d' }}>
                <h4 className="text-sm font-medium mb-2" style={{ color: '#8888a0' }}>Selections</h4>
                {Object.entries(detail.productSelections as Record<string, any>).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1"><span className="text-xs capitalize" style={{ color: '#666680' }}>{k}</span><span className="text-sm text-white">{String(v)}</span></div>
                ))}
              </div>
            )}
            <div className="p-4 rounded-xl mb-4" style={{ background: '#0f0f1a', border: '1px solid #1e1e2d' }}>
              <h4 className="text-sm font-medium mb-2" style={{ color: '#8888a0' }}>Update Status</h4>
              <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm mb-2" style={{ background: '#14141f', border: '1px solid #1e1e2d', color: '#e8e6f0' }}>
                <option value="">Select status...</option>
                {statusFlow.map(s => <option key={s} value={s}>{statusColors[s]?.label}</option>)}
              </select>
              <input type="text" value={statusNote} onChange={e => setStatusNote(e.target.value)} placeholder="Note (optional)"
                className="w-full px-3 py-2 rounded-lg text-sm mb-2" style={{ background: '#14141f', border: '1px solid #1e1e2d', color: '#e8e6f0' }} />
              {actionError && <p role="alert" className="text-sm text-red-400 mb-2">{actionError}</p>}
              <button onClick={() => { if (newStatus) updateStatus.mutate({ id: detail.id, status: newStatus, notes: statusNote, visibleToCustomer: true }); }}
                disabled={!newStatus} className="px-4 py-2 gold-gradient-bg text-[#1a1a2e] font-medium rounded-lg text-sm disabled:opacity-50">Update</button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
