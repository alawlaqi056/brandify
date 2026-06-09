import { motion } from 'framer-motion';
import { Users, Mail, Phone, MapPin } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import { formatAED } from '../lib/data';

export default function AdminCustomers() {
  const { data: orders, isLoading } = trpc.orders.list.useQuery({});

  const customerMap = new Map();
  orders?.forEach(o => {
    if (!o.customer) return;
    const existing = customerMap.get(o.customer.id);
    if (existing) {
      existing.orders += 1;
      existing.totalValue += o.estimatedPrice || 0;
      if (new Date(o.createdAt) > new Date(existing.lastOrder)) existing.lastOrder = o.createdAt;
    } else {
      customerMap.set(o.customer.id, {
        ...o.customer,
        orders: 1,
        totalValue: o.estimatedPrice || 0,
        lastOrder: o.createdAt,
        status: o.status,
      });
    }
  });
  const customers = Array.from(customerMap.values());

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="rounded-xl overflow-hidden" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: '#1e1e2d' }}>
          <h3 className="font-semibold text-white">Customers ({customers.length})</h3>
        </div>
        {isLoading ? (
          <div className="p-8 text-center" style={{ color: '#666680' }}>Loading...</div>
        ) : customers.length === 0 ? (
          <div className="p-8 text-center" style={{ color: '#666680' }}>
            <Users size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-white font-medium">No customers yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: '#1e1e2d' }}>
                  {['Name', 'Contact', 'Orders', 'Total Value', 'Last Order', 'Status'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: '#666680' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#1e1e2d' }}>
                {customers.map((c: any) => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-white">{c.fullName}</p>
                      <p className="text-xs" style={{ color: '#666680' }}>{c.brandName || '-'}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-xs" style={{ color: '#8888a0' }}><Mail size={12} /> {c.email}</div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: '#8888a0' }}><Phone size={12} /> {c.phone}</div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: '#8888a0' }}><MapPin size={12} /> {c.country}{c.city ? `, ${c.city}` : ''}</div>
                    </td>
                    <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: '#1a1a2e', color: '#d4af37' }}>{c.orders}</span></td>
                    <td className="px-4 py-3 text-sm font-medium text-[#d4af37]">{formatAED(c.totalValue)}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: '#666680' }}>{c.lastOrder ? new Date(c.lastOrder).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs capitalize" style={{ background: '#1a1a2e', color: '#8888a0' }}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
