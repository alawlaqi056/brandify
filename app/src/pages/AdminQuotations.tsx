import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import { formatAED } from '../lib/data';

export default function AdminQuotations() {
  const utils = trpc.useUtils();
  const { data: orders } = trpc.orders.list.useQuery({});
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [form, setForm] = useState({ manufacturingCost: 0, packagingCost: 0, brandingCost: 0, websiteCost: 0, photographyCost: 0, marketingCost: 0, shippingCost: 0, profitMargin: 35 });
  const [message, setMessage] = useState('');

  const createQuotation = trpc.quotations.create.useMutation({
    onSuccess: () => { utils.orders.list.invalidate(); setSelectedOrderId(null); setMessage('Quotation saved. Customer delivery is not configured yet.'); },
    onError: () => setMessage('Quotation could not be saved. Please try again.'),
  });

  const subtotal = form.manufacturingCost + form.packagingCost + form.brandingCost + form.websiteCost + form.photographyCost + form.marketingCost + form.shippingCost;
  const profit = Math.round(subtotal * (form.profitMargin / 100));
  const total = subtotal + profit;

  const pendingOrders = orders?.filter(o => ['under_review', 'quotation_preparing', 'quotation_sent', 'waiting_approval'].includes(o.status)) || [];
  const selectedOrder = orders?.find(o => o.id === selectedOrderId);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl overflow-hidden" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
          <div className="p-4 border-b" style={{ borderColor: '#1e1e2d' }}>
            <h3 className="font-semibold text-white">Orders Needing Quotations</h3>
          </div>
          {pendingOrders.length === 0 ? (
            <div className="p-8 text-center" style={{ color: '#666680' }}><FileText size={48} className="mx-auto mb-4 opacity-30" /><p>No orders waiting</p></div>
          ) : (
            <div className="divide-y" style={{ borderColor: '#1e1e2d' }}>
              {pendingOrders.map(o => (
                <div key={o.id} onClick={() => setSelectedOrderId(o.id)}
                  className={`p-4 cursor-pointer hover:bg-white/[0.02] transition-colors ${selectedOrderId === o.id ? 'ring-1 ring-inset ring-[#d4af37]' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm font-medium text-white">{o.orderId}</p><p className="text-xs" style={{ color: '#666680' }}>{o.customer?.fullName} &bull; {o.category}</p></div>
                    <span className="text-sm text-[#d4af37]">{formatAED(o.estimatedPrice || 0)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedOrderId && selectedOrder && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl p-6 space-y-3" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
            <h3 className="font-semibold text-white mb-1">Create Quotation for {selectedOrder.orderId}</h3>
            {[
              { key: 'manufacturingCost', label: 'Manufacturing' },
              { key: 'packagingCost', label: 'Packaging' },
              { key: 'brandingCost', label: 'Branding' },
              { key: 'websiteCost', label: 'Website' },
              { key: 'photographyCost', label: 'Photography' },
              { key: 'marketingCost', label: 'Marketing' },
              { key: 'shippingCost', label: 'Shipping' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-sm" style={{ color: '#8888a0' }}>{item.label}</span>
                <input type="number" min={0} value={form[item.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [item.key]: Number(e.target.value) }))}
                  className="w-32 px-3 py-1.5 rounded-lg text-sm text-right" style={{ background: '#0f0f1a', border: '1px solid #1e1e2d', color: '#e8e6f0' }} />
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: '#1e1e2d' }}>
              <span className="text-sm" style={{ color: '#8888a0' }}>Profit Margin (%)</span>
              <input type="number" value={form.profitMargin} onChange={e => setForm(p => ({ ...p, profitMargin: Number(e.target.value) }))}
                className="w-32 px-3 py-1.5 rounded-lg text-sm text-right" style={{ background: '#0f0f1a', border: '1px solid #1e1e2d', color: '#e8e6f0' }} />
            </div>
            <div className="pt-2 border-t space-y-1" style={{ borderColor: '#1e1e2d' }}>
              <div className="flex justify-between"><span className="text-xs" style={{ color: '#666680' }}>Subtotal</span><span className="text-sm text-white">{formatAED(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-xs" style={{ color: '#666680' }}>Profit ({form.profitMargin}%)</span><span className="text-sm text-emerald-400">+{formatAED(profit)}</span></div>
              <div className="flex justify-between pt-1"><span className="font-semibold text-white">Total</span><span className="text-lg font-bold text-[#d4af37]">{formatAED(total)}</span></div>
            </div>
            {message && <p role="status" className="text-sm text-amber-300">{message}</p>}
            <button onClick={() => createQuotation.mutate({ orderId: selectedOrderId, ...form, subtotal, totalPrice: total })}
              disabled={createQuotation.isPending} className="w-full py-3 gold-gradient-bg text-[#1a1a2e] font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
              <Send size={18} /> {createQuotation.isPending ? 'Saving...' : 'Save Quotation'}
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
