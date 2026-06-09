import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Package, TrendingUp, DollarSign, Target, Clock, Factory, CheckCircle, MessageCircle } from 'lucide-react';
import { useLang } from '../components/LanguageProvider';
import { getAIQuestions, categories, formatAED } from '../lib/data';
import { whatsappUrl } from '../config';

const ease = [0.16, 1, 0.3, 1] as const;

export default function AIAdvisorPage() {
  const { locale, isRTL, t } = useLang();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [animating, setAnimating] = useState(false);

  const questions = getAIQuestions(locale);
  const totalQ = questions.length;

  // Reset when language changes
  useEffect(() => {
    setCurrentQ(0);
    setAnswers({});
    setShowResults(false);
    setAnimating(false);
  }, [locale]);

  const handleAnswer = (optionIndex: number) => {
    if (animating) return;
    setAnswers(prev => ({ ...prev, [currentQ]: optionIndex }));
    setAnimating(true);

    setTimeout(() => {
      if (currentQ < totalQ - 1) {
        setCurrentQ(prev => prev + 1);
      } else {
        setShowResults(true);
      }
      setAnimating(false);
    }, 400);
  };

  const progress = ((currentQ + (showResults ? 1 : 0)) / totalQ) * 100;

  // Generate recommendation based on answers
  const getRecommendation = () => {
    const budgetIdx = answers[0] || 2;
    const qtyIdx = answers[2] || 1;
    const catIdx = answers[3] || 0;

    const budgetMap = [5000, 12500, 22500, 40000, 75000];
    const qtyMap = [300, 750, 3000, 7500, 10000];
    const marginMap = ['40-55%', '45-60%', '35-50%', '40-55%', '50-65%'];

    const budget = budgetMap[budgetIdx] || 22500;
    const qty = qtyMap[qtyIdx] || 750;
    const cat = categories[Math.min(catIdx, categories.length - 1)] || categories[0];
    const margin = marginMap[catIdx] || '35-50%';
    const perUnit = Math.round(budget / qty);

    const weekLabels = isRTL
      ? ['الأسبوع ١: تأكيد الطلب وعينة', 'الأسبوع ٢: تصميم العلامة', 'الأسبوع ٣: التصنيع', 'الأسبوع ٤: التعبئة والتسليم']
      : ['Week 1: Confirm Order & Sample', 'Week 2: Brand Design', 'Week 3: Manufacturing', 'Week 4: Packaging & Delivery'];

    return { budget, qty, cat, margin, perUnit, weekLabels };
  };

  const rec = getRecommendation();

  if (showResults) {
    return (
      <div className="min-h-screen pt-[100px] pb-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="text-center mb-10">
            <div className="w-16 h-16 gold-gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles size={28} className="text-[#1a1a2e]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t('aiAdvisor.recommendation')}</h1>
            <p style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'بناءً على إجاباتك، إليك توصيتنا' : 'Based on your answers, here is our recommendation'}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease }} className="rounded-2xl p-8 shadow-2xl mb-8" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Package, label: isRTL ? 'الفئة المقترحة' : 'Recommended Category', value: isRTL ? rec.cat.nameAr : rec.cat.name },
                { icon: Target, label: isRTL ? 'الكمية المقترحة' : 'Recommended Quantity', value: `${rec.qty.toLocaleString()} ${isRTL ? 'وحدة' : 'units'}` },
                { icon: DollarSign, label: isRTL ? 'التكلفة التقريبية' : 'Estimated Cost', value: formatAED(rec.budget), accent: true },
                { icon: Factory, label: isRTL ? 'التكلفة لكل وحدة' : 'Cost Per Unit', value: formatAED(rec.perUnit) },
                { icon: TrendingUp, label: isRTL ? 'هامش الربح المتوقع' : 'Expected Profit Margin', value: rec.margin, success: true },
                { icon: Clock, label: isRTL ? 'وقت الإطلاق' : 'Launch Timeline', value: isRTL ? '٣٠ يوم' : '30 Days' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }} className="rounded-xl p-5" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <item.icon size={18} className={`mb-3 ${item.success ? 'text-emerald-500' : item.accent ? 'text-[#d4af37]' : 'text-[#d4af37]/60'}`} />
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                  <p className={`text-lg font-semibold ${item.success ? 'text-emerald-500' : item.accent ? 'text-[#d4af37]' : ''}`} style={item.success || item.accent ? undefined : { color: 'var(--text-primary)' }}>{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Roadmap */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, ease }} className="rounded-2xl p-8 mb-8" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h3 className="text-lg font-semibold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Clock size={18} className="text-[#d4af37]" />
              {isRTL ? 'خطة الإطلاق' : 'Launch Roadmap'}
            </h3>
            <div className="space-y-3">
              {rec.weekLabels.map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(212,175,55,0.1)' }}>
                    <CheckCircle size={14} className="text-[#d4af37]" />
                  </div>
                  <span style={{ color: 'var(--text-secondary)' }} className="text-sm">{w}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, ease }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={`/builder/${rec.cat.id}`} className="luxury-button text-base">
              {isRTL ? 'ابدأ هذه العلامة' : 'Start This Brand'}
              <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
            </Link>
            <button onClick={() => { setCurrentQ(0); setAnswers({}); setShowResults(false); }} className="luxury-button-outline text-base">
              {t('aiAdvisor.start')}
            </button>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#25d366] text-white font-medium rounded-xl hover:brightness-110 transition-all">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[100px] pb-20" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="text-center mb-10">
          <div className="w-14 h-14 gold-gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles size={24} className="text-[#1a1a2e]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t('aiAdvisor.title')}</h1>
          <p style={{ color: 'var(--text-secondary)' }}>{t('aiAdvisor.subtitle')}</p>
        </motion.div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between text-sm mb-2">
            <span style={{ color: 'var(--text-secondary)' }}>{t('aiAdvisor.progress')} {currentQ + 1} {t('aiAdvisor.of')} {totalQ}</span>
            <span className="text-[#d4af37] font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
            <motion.div className="h-full gold-gradient-bg" animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease }} />
          </div>
        </div>

        {/* Question Card - Only ONE at a time */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4, ease }}
            className="rounded-2xl p-8" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
              {questions[currentQ]?.question}
            </h2>

            <div className="space-y-3">
              {questions[currentQ]?.options.map((opt, i) => (
                <motion.button
                  key={`${currentQ}-${i}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  onClick={() => handleAnswer(i)}
                  className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all duration-300 hover:border-[#d4af37] group ${
                    answers[currentQ] === i ? 'border-[#d4af37]' : ''
                  }`}
                  style={{ background: answers[currentQ] === i ? 'rgba(212,175,55,0.05)' : 'var(--bg-primary)', borderColor: answers[currentQ] === i ? '#d4af37' : 'var(--border-color)' }}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${answers[currentQ] === i ? 'border-[#d4af37] gold-gradient-bg' : 'border-[var(--border-color)]'}`}>
                    {answers[currentQ] === i && <CheckCircle size={16} className="text-[#1a1a2e]" />}
                  </div>
                  <span className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>{opt}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentQ ? 'bg-gradient-to-r from-[#d4af37] to-[#e8c547] w-8' :
                i < currentQ ? 'bg-[#d4af37]/50 w-2.5' :
                'w-2.5'
              }`}
              style={i > currentQ ? { background: 'var(--border-color)' } : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
