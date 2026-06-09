import { useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, Plus } from 'lucide-react';
import { trpc } from '@/providers/trpc';

export default function AdminFactories() {
  const utils = trpc.useUtils();
  const { data: factoriesList, isLoading } = trpc.factories.list.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', country: 'UAE', specialty: '', moq: 100, unitCost: 0, packagingCost: 0, productionDays: 14 });
  const [error, setError] = useState('');

  const createFactory = trpc.factories.create.useMutation({
    onSuccess: () => { utils.factories.list.invalidate(); setShowForm(false); setError(''); setForm({ name: '', country: 'UAE', specialty: '', moq: 100, unitCost: 0, packagingCost: 0, productionDays: 14 }); },
    onError: () => setError('Factory could not be added. Please try again.'),
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-white">Factories</h3>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 gold-gradient-bg text-[#1a1a2e] font-medium rounded-lg text-sm flex items-center gap-2">
          <Plus size={16} /> Add Factory
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-6 rounded-xl space-y-3" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
          <h4 className="text-sm font-semibold text-white mb-2">Add New Factory</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { k: 'name', p: 'Factory Name', t: 'text' },
              { k: 'country', p: 'Country', t: 'text' },
              { k: 'specialty', p: 'Specialty', t: 'text' },
              { k: 'moq', p: 'MOQ', t: 'number' },
              { k: 'unitCost', p: 'Unit Cost (AED)', t: 'number' },
              { k: 'productionDays', p: 'Production Days', t: 'number' },
            ].map(f => (
              <input key={f.k} type={f.t} placeholder={f.p}
                value={form[f.k as keyof typeof form] as any}
                onChange={e => setForm(p => ({ ...p, [f.k]: f.t === 'number' ? Number(e.target.value) : e.target.value }))}
                className="px-3 py-2 rounded-lg text-sm" style={{ background: '#0f0f1a', border: '1px solid #1e1e2d', color: '#e8e6f0' }} />
            ))}
          </div>
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          <div className="flex gap-2">
            <button onClick={() => createFactory.mutate(form)} disabled={!form.name || createFactory.isPending}
              className="px-6 py-2 gold-gradient-bg text-[#1a1a2e] font-medium rounded-lg text-sm disabled:opacity-50">{createFactory.isPending ? 'Adding...' : 'Add'}</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg text-sm" style={{ color: '#8888a0', borderColor: '#1e1e2d' }}>Cancel</button>
          </div>
        </motion.div>
      )}

      <div className="rounded-xl overflow-hidden" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
        {isLoading ? (
          <div className="p-8 text-center" style={{ color: '#666680' }}>Loading...</div>
        ) : !factoriesList || factoriesList.length === 0 ? (
          <div className="p-8 text-center" style={{ color: '#666680' }}><Factory size={48} className="mx-auto mb-4 opacity-30" /><p className="text-white font-medium">No factories yet</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: '#1e1e2d' }}>
                  {['Name', 'Country', 'Specialty', 'MOQ', 'Production'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium uppercase" style={{ color: '#666680' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#1e1e2d' }}>
                {factoriesList.map((f: any) => (
                  <tr key={f.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-white">{f.name}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#8888a0' }}>{f.country}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#8888a0' }}>{f.specialty || '-'}</td>
                    <td className="px-4 py-3 text-sm text-white">{f.moq}</td>
                    <td className="px-4 py-3 text-sm text-white">{f.productionDays} days</td>
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
