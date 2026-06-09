import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../components/LanguageProvider';
import { categories, formatAED } from '../lib/data';

const ease = [0.16, 1, 0.3, 1] as const;

export default function CategoryPage() {
  const { t, isRTL } = useLang();
  return (
    <div className="min-h-screen pt-[100px] pb-20" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.6, ease }} className="w-12 h-[2px] gold-gradient-bg mx-auto mb-6 rounded-full" />
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>{t('categories.title')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>{t('categories.subtitle')}</motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1, ease }}>
              <Link to={`/builder/${cat.id}`}>
                <motion.div whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }} transition={{ duration: 0.4, ease }} className="relative overflow-hidden rounded-2xl cursor-pointer group" style={{ aspectRatio: '3/4' }}>
                  <img src={cat.image} alt={isRTL ? cat.nameAr : cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{isRTL ? cat.nameAr : cat.name}</h3>
                    <p className="text-sm text-white/50 mb-1">{isRTL ? cat.descAr : cat.desc}</p>
                    <p className="text-[#d4af37] font-medium mb-4">{t('categories.startingFrom')} {formatAED(cat.minPrice)}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-[#d4af37] group-hover:gap-3 transition-all">
                      {isRTL ? 'ابدأ البناء' : 'Start Building'} <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
