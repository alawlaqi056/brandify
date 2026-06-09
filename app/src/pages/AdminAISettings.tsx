import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Settings } from 'lucide-react';

export default function AdminAISettings() {
  const [settings, setSettings] = useState({
    advisorName: 'Layla',
    advisorNameAr: 'ليلى',
    welcomeMessage: 'Welcome to Brandify AI Advisor. I am here to help you launch your luxury brand. Let us start by understanding your vision.',
    welcomeMessageAr: 'مرحباً بك في مستشار الذكاء الاصطناعي من برانديفاي. أنا هنا لمساعدتك في إطلاق علامتك الفاخرة.',
    autoFollowUp: true,
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-4">
      <div className="p-6 rounded-xl space-y-4" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
        <div className="flex items-center gap-2 mb-4">
          <Settings size={20} className="text-[#d4af37]" />
          <h3 className="font-semibold text-white">AI Advisor Configuration</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: '#8888a0' }}>Advisor Name (EN)</label>
            <input value={settings.advisorName} onChange={e => setSettings(p => ({ ...p, advisorName: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: '#0f0f1a', border: '1px solid #1e1e2d', color: '#e8e6f0' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: '#8888a0' }}>Advisor Name (AR)</label>
            <input value={settings.advisorNameAr} onChange={e => setSettings(p => ({ ...p, advisorNameAr: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg text-sm text-right" style={{ background: '#0f0f1a', border: '1px solid #1e1e2d', color: '#e8e6f0' }} dir="rtl" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: '#8888a0' }}>Welcome Message (EN)</label>
          <textarea value={settings.welcomeMessage} onChange={e => setSettings(p => ({ ...p, welcomeMessage: e.target.value }))} rows={3}
            className="w-full px-3 py-2 rounded-lg text-sm resize-none" style={{ background: '#0f0f1a', border: '1px solid #1e1e2d', color: '#e8e6f0' }} />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: '#8888a0' }}>Welcome Message (AR)</label>
          <textarea value={settings.welcomeMessageAr} onChange={e => setSettings(p => ({ ...p, welcomeMessageAr: e.target.value }))} rows={3} dir="rtl"
            className="w-full px-3 py-2 rounded-lg text-sm resize-none" style={{ background: '#0f0f1a', border: '1px solid #1e1e2d', color: '#e8e6f0' }} />
        </div>

        <div className="flex items-center justify-between py-3 border-t" style={{ borderColor: '#1e1e2d' }}>
          <span className="text-sm" style={{ color: '#8888a0' }}>Auto Follow-up - Coming Soon</span>
          <button disabled title="Coming Soon"
            className={`w-12 h-6 rounded-full transition-all cursor-not-allowed opacity-50 ${settings.autoFollowUp ? 'bg-[#d4af37]' : 'bg-[#2a2a3f]'}`}>
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${settings.autoFollowUp ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>

        <button disabled title="Backend persistence is not implemented yet" className="px-6 py-2 bg-white/10 text-white/50 font-medium rounded-lg text-sm flex items-center gap-2 cursor-not-allowed">
          <Save size={16} /> Save Settings - Coming Soon
        </button>
      </div>
    </motion.div>
  );
}
