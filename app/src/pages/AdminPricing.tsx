import { motion } from 'framer-motion';
import { formatAED } from '../lib/data';

const pricingCategories = [
  { id: 'perfumes', name: 'Perfumes', nameAr: 'عطور', basePrice: 15000, moq: 500, packaging: 25, margin: 35 },
  { id: 'bags', name: 'Bags', nameAr: 'حقائب', basePrice: 25000, moq: 200, packaging: 25, margin: 35 },
  { id: 'eyewear', name: 'Eyewear', nameAr: 'نظارات', basePrice: 20000, moq: 500, packaging: 25, margin: 35 },
  { id: 'watches', name: 'Watches', nameAr: 'ساعات', basePrice: 35000, moq: 500, packaging: 25, margin: 35 },
];

export default function AdminPricing() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="rounded-xl overflow-hidden" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
        <div className="p-4 border-b" style={{ borderColor: '#1e1e2d' }}>
          <h3 className="font-semibold text-white">Pricing Rules by Category</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: '#1e1e2d' }}>
                {['Category', 'Base Price', 'Packaging %', 'Margin %', 'Min Qty'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider" style={{ color: '#666680' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#1e1e2d' }}>
              {pricingCategories.map(cat => (
                <tr key={cat.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3"><p className="text-sm font-medium text-white">{cat.name}</p><p className="text-xs" style={{ color: '#666680' }}>{cat.nameAr}</p></td>
                  <td className="px-4 py-3 text-sm text-[#d4af37]">{formatAED(cat.basePrice)}</td>
                  <td className="px-4 py-3 text-sm text-white">{cat.packaging}%</td>
                  <td className="px-4 py-3 text-sm text-white">{cat.margin}%</td>
                  <td className="px-4 py-3 text-sm text-white">{cat.moq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 rounded-xl" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
        <h3 className="text-lg font-semibold text-white mb-4">Pricing Formula</h3>
        <div className="p-4 rounded-lg font-mono text-sm space-y-1" style={{ background: '#0f0f1a', border: '1px solid #1e1e2d' }}>
          <p style={{ color: '#d4af37' }}>Final Price = Manufacturing + Packaging + Branding + Website</p>
          <p style={{ color: '#8888a0' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ Photography + Marketing + Shipping + Profit Margin</p>
          <p className="pt-2" style={{ color: '#666680' }}>Profit Margin = 35% of subtotal (default)</p>
          <p style={{ color: '#666680' }}>Packaging Cost = 25% of manufacturing (default)</p>
          <p style={{ color: '#666680' }}>Currency = AED (UAE Dirhams)</p>
        </div>
      </div>
    </motion.div>
  );
}
