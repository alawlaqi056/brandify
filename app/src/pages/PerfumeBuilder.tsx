import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Upload, Send, Sparkles } from 'lucide-react';
import { useLang } from '../components/LanguageProvider';
import { perfumeOptions, calculatePrice, formatAED } from '../lib/data';
import CustomerDetailsModal from '../components/CustomerDetailsModal';
import { readValidatedImage } from '../lib/uploads';

const ease = [0.16, 1, 0.3, 1] as const;
const TOTAL_STEPS = 9;

export default function PerfumeBuilder() {
  const { isRTL } = useLang();
  const [step, setStep] = useState(1);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [preview, setPreview] = useState({ bottle: 0, size: 0, color: 0, cap: 0, box: 0, packaging: 0 });
  const [brandName, setBrandName] = useState('');
  const [quantity, setQuantity] = useState(500);
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [refFile, setRefFile] = useState<string | null>(null);

  const L = (arr: { en: string[]; ar: string[] }) => isRTL ? arr.ar : arr.en;

  const pricing = calculatePrice('perfumes', quantity, preview, []);

  const nextStep = () => { if (step < TOTAL_STEPS) setStep(s => s + 1); };
  const prevStep = () => { if (step > 1) setStep(s => s - 1); };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    readValidatedImage(file, setter, window.alert);
  };

  const handleSubmit = () => {
    setShowCustomerModal(true);
  };

  const colorMap = ['#c0c0c0', '#d4a017', '#000000', '#1e3a5f', '#d4af37', '#b76e79'];
  const previewColor = colorMap[preview.color] || '#c0c0c0';

  // Progress bar
  const progress = (step / TOTAL_STEPS) * 100;



  return (
    <div className="min-h-screen pt-[72px] pb-32" style={{ background: 'var(--bg-primary)' }}>
      {/* Progress Bar */}
      <div className="sticky top-[72px] z-30 py-4" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: 'var(--border-color)' }}>
            <motion.div className="h-full gold-gradient-bg" animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease }} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'خطوة' : 'Step'} {step} {isRTL ? 'من' : 'of'} {TOTAL_STEPS}</span>
            <span className="text-[#d4af37] font-medium">
              {step === 1 ? (isRTL ? 'العلامة' : 'Brand') :
               step === 2 ? (isRTL ? 'الزجاجة' : 'Bottle') :
               step === 3 ? (isRTL ? 'الحجم' : 'Size') :
               step === 4 ? (isRTL ? 'اللون' : 'Color') :
               step === 5 ? (isRTL ? 'الغطاء' : 'Cap') :
               step === 6 ? (isRTL ? 'الصندوق' : 'Box') :
               step === 7 ? (isRTL ? 'التعبئة' : 'Packaging') :
               step === 8 ? (isRTL ? 'الكمية' : 'Quantity') :
               (isRTL ? 'المراجعة' : 'Review')}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* LIVE PREVIEW */}
        <div className="mb-10 p-6 rounded-2xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'معاينة حية' : 'Live Preview'}</h3>
            <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}><Sparkles size={12} className="text-[#d4af37]" /> {isRTL ? 'يتم التحديث فوراً' : 'Updates instantly'}</span>
          </div>
          <div className="flex items-center justify-center py-8">
            <div className="relative">
              {/* Bottle SVG preview */}
              <svg width="120" height="180" viewBox="0 0 120 180">
                {/* Box behind */}
                {preview.box >= 1 && (
                  <rect x="-20" y="-20" width="160" height="220" rx="8" fill={preview.box >= 3 ? '#1a1a2e' : preview.box >= 2 ? '#2d2d44' : '#3a3a4a'} stroke="#d4af37" strokeWidth={preview.box >= 2 ? 2 : 1} strokeOpacity={0.3} />
                )}
                {/* Bottle body */}
                <rect x="25" y="50" width="70" height="110" rx="15" fill={previewColor} fillOpacity={0.3} stroke={previewColor} strokeWidth="1.5" />
                {/* Bottle neck */}
                <rect x="40" y="30" width="40" height="25" rx="4" fill={previewColor} fillOpacity={0.4} stroke={previewColor} strokeWidth="1" />
                {/* Cap */}
                <rect x="35" y={preview.cap === 0 ? 15 : preview.cap === 3 ? 10 : 18} width={preview.cap === 3 ? 50 : preview.cap === 2 ? 60 : 50} height={preview.cap === 3 ? 25 : preview.cap === 2 ? 15 : 18} rx="3" fill={preview.cap === 3 ? '#c0c0c0' : preview.cap === 1 ? '#d4af37' : '#2a2a3a'} stroke={preview.cap === 1 ? '#b8941f' : '#444'} strokeWidth="1" />
                {/* Label */}
                <rect x="32" y="80" width="56" height="40" rx="4" fill="white" fillOpacity="0.9" />
                <text x="60" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1a1a2e">{brandName || (isRTL ? 'علامتك' : 'YOUR BRAND')}</text>
              </svg>
            </div>
          </div>
          {pricing.total > 0 && (
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{quantity} {isRTL ? 'قطعة' : 'units'}</span>
              <span className="text-lg font-bold text-[#d4af37]">{formatAED(pricing.total)}</span>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: BRAND NAME */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? 'اسم العلامة التجارية' : 'Brand Name'}</h2>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'ما اسم علامتك التجارية للعطور؟' : 'What is your perfume brand name?'}</p>
              <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder={isRTL ? 'مثال: ليلى عود' : 'e.g. Layla Oud'} className="w-full px-6 py-4 rounded-xl text-lg focus:border-[#d4af37] focus:outline-none transition-colors" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
            </motion.div>
          )}

          {/* STEP 2: BOTTLE TYPE */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? 'نوع الزجاجة' : 'Bottle Type'}</h2>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'اختر تصميم زجاجتك' : 'Choose your bottle design'}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {L(perfumeOptions.bottleType).map((opt, i) => (
                  <button key={opt} onClick={() => { setPreview(p => ({ ...p, bottle: i })); nextStep(); }} className={`luxury-card p-6 text-center transition-all ${preview.bottle === i ? 'border-[#d4af37]' : ''}`}>
                    <p className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{opt}</p>
                    <p className="text-sm text-[#d4af37]">+{formatAED(perfumeOptions.bottleType.prices[i])}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: BOTTLE SIZE */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? 'حجم الزجاجة' : 'Bottle Size'}</h2>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'اختر حجم الزجاجة' : 'Choose bottle size'}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {L(perfumeOptions.bottleSize).map((opt, i) => (
                  <button key={opt} onClick={() => { setPreview(p => ({ ...p, size: i })); nextStep(); }} className={`luxury-card p-6 text-center transition-all ${preview.size === i ? 'border-[#d4af37]' : ''}`}>
                    <p className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{opt}</p>
                    <p className="text-sm text-[#d4af37]">+{formatAED(perfumeOptions.bottleSize.prices[i])}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: BOTTLE COLOR */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? 'لون الزجاجة' : 'Bottle Color'}</h2>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'اختر لون زجاجتك' : 'Choose bottle color'}</p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {L(perfumeOptions.bottleColor).map((opt, i) => (
                  <button key={opt} onClick={() => { setPreview(p => ({ ...p, color: i })); nextStep(); }} className={`luxury-card p-4 text-center transition-all ${preview.color === i ? 'border-[#d4af37] ring-2 ring-[#d4af37]/20' : ''}`}>
                    <div className="w-10 h-10 rounded-full mx-auto mb-2 border-2" style={{ backgroundColor: colorMap[i], borderColor: preview.color === i ? '#d4af37' : 'transparent' }} />
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{opt}</p>
                    <p className="text-xs text-[#d4af37]">{perfumeOptions.bottleColor.prices[i] > 0 ? `+${formatAED(perfumeOptions.bottleColor.prices[i])}` : 'Free'}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: CAP TYPE */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? 'نوع الغطاء' : 'Cap Type'}</h2>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'اختر غطاء زجاجتك' : 'Choose your cap style'}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {L(perfumeOptions.capType).map((opt, i) => (
                  <button key={opt} onClick={() => { setPreview(p => ({ ...p, cap: i })); nextStep(); }} className={`luxury-card p-6 text-center transition-all ${preview.cap === i ? 'border-[#d4af37]' : ''}`}>
                    <p className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{opt}</p>
                    <p className="text-sm text-[#d4af37]">+{formatAED(perfumeOptions.capType.prices[i])}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 6: BOX TYPE */}
          {step === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? 'نوع الصندوق' : 'Box Type'}</h2>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'اختر صندوق عرض منتجك' : 'Choose your product box'}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {L(perfumeOptions.boxType).map((opt, i) => (
                  <button key={opt} onClick={() => { setPreview(p => ({ ...p, box: i })); nextStep(); }} className={`luxury-card p-6 text-center transition-all ${preview.box === i ? 'border-[#d4af37]' : ''}`}>
                    <p className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{opt}</p>
                    <p className="text-sm text-[#d4af37]">+{formatAED(perfumeOptions.boxType.prices[i])}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 7: PACKAGING */}
          {step === 7 && (
            <motion.div key="s7" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? 'نمط التعبئة' : 'Packaging Style'}</h2>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'اختر نمط التعبئة' : 'Choose packaging style'}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {L(perfumeOptions.packaging).map((opt, i) => (
                  <button key={opt} onClick={() => { setPreview(p => ({ ...p, packaging: i })); nextStep(); }} className={`luxury-card p-6 text-center transition-all ${preview.packaging === i ? 'border-[#d4af37]' : ''}`}>
                    <p className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{opt}</p>
                    <p className="text-sm text-[#d4af37]">+{formatAED(perfumeOptions.packaging.prices[i])}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 8: QUANTITY + UPLOAD */}
          {step === 8 && (
            <motion.div key="s8" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? 'الكمية والصور' : 'Quantity & Images'}</h2>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'اختر الكمية وارفع صورك' : 'Choose quantity and upload images'}</p>

              <div className="mb-8">
                <label className="text-sm font-medium mb-3 block" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'الكمية' : 'Quantity'}</label>
                <div className="flex items-center gap-4">
                  <input type="range" min="100" max="10000" step="100" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="flex-1 accent-[#d4af37]" />
                  <span className="text-2xl font-bold text-[#d4af37] w-24 text-right">{quantity.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-3 block" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'شعار العلامة' : 'Brand Logo'}</label>
                  <label className="luxury-card p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#d4af37] transition-all">
                    {logoFile ? <img src={logoFile} alt="Logo" className="w-20 h-20 object-contain" /> : <Upload size={28} className="text-[#d4af37]" />}
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{logoFile ? (isRTL ? 'تم الرفع' : 'Uploaded') : (isRTL ? 'اضغط للرفع' : 'Click to upload')}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFile(e, setLogoFile)} className="hidden" />
                  </label>
                </div>
                <div>
                  <label className="text-sm font-medium mb-3 block" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'صورة مرجعية' : 'Reference Image'}</label>
                  <label className="luxury-card p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#d4af37] transition-all">
                    {refFile ? <img src={refFile} alt="Reference" className="w-20 h-20 object-cover rounded-lg" /> : <Upload size={28} className="text-[#d4af37]" />}
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{refFile ? (isRTL ? 'تم الرفع' : 'Uploaded') : (isRTL ? 'اضغط للرفع' : 'Click to upload')}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFile(e, setRefFile)} className="hidden" />
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 9: REVIEW */}
          {step === 9 && (
            <motion.div key="s9" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? 'مراجعة الطلب' : 'Review Your Order'}</h2>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'راجع تفاصيل طلبك قبل الإرسال' : 'Review your order details before submitting'}</p>

              <div className="luxury-card p-8 space-y-4">
                {[
                  { label: isRTL ? 'اسم العلامة' : 'Brand Name', value: brandName || '-' },
                  { label: isRTL ? 'نوع الزجاجة' : 'Bottle Type', value: L(perfumeOptions.bottleType)[preview.bottle] },
                  { label: isRTL ? 'الحجم' : 'Size', value: L(perfumeOptions.bottleSize)[preview.size] },
                  { label: isRTL ? 'اللون' : 'Color', value: L(perfumeOptions.bottleColor)[preview.color] },
                  { label: isRTL ? 'الغطاء' : 'Cap', value: L(perfumeOptions.capType)[preview.cap] },
                  { label: isRTL ? 'الصندوق' : 'Box', value: L(perfumeOptions.boxType)[preview.box] },
                  { label: isRTL ? 'التعبئة' : 'Packaging', value: L(perfumeOptions.packaging)[preview.packaging] },
                  { label: isRTL ? 'الكمية' : 'Quantity', value: quantity.toLocaleString() },
                  { label: isRTL ? 'التصنيع' : 'Manufacturing', value: formatAED(pricing.manufacturing), accent: true },
                  { label: isRTL ? 'التعبئة' : 'Packaging Cost', value: formatAED(pricing.packaging), accent: true },
                  { label: isRTL ? 'المجموع الفرعي' : 'Subtotal', value: formatAED(pricing.subtotal) },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                    <span className={`font-medium ${item.accent ? 'text-[#d4af37]' : ''}`} style={{ color: item.accent ? undefined : 'var(--text-primary)' }}>{item.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 border-t-2" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
                  <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{isRTL ? 'المجموع التقديري' : 'Total Estimated'}</span>
                  <span className="text-2xl font-bold gold-gradient-text">{formatAED(pricing.total)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="fixed bottom-0 left-0 right-0 py-4 px-4 z-40" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button onClick={prevStep} disabled={step === 1} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border transition-all disabled:opacity-30" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
              <ChevronLeft size={18} className={isRTL ? 'rotate-180' : ''} /> {isRTL ? 'رجوع' : 'Back'}
            </button>
            {step === TOTAL_STEPS ? (
              <button onClick={handleSubmit} className="flex items-center gap-2 px-8 py-3 gold-gradient-bg text-[#1a1a2e] font-semibold rounded-xl hover:shadow-lg transition-all">
                <Send size={18} /> {isRTL ? 'إرسال الطلب' : 'Submit Request'}
              </button>
            ) : (
              <button onClick={nextStep} className="flex items-center gap-2 px-8 py-3 gold-gradient-bg text-[#1a1a2e] font-semibold rounded-xl hover:shadow-lg transition-all">
                {isRTL ? 'التالي' : 'Next'} <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        orderData={{
          category: 'Perfumes',
          categoryAr: 'عطور',
          productSelections: {
            bottle: perfumeOptions.bottleType.en[preview.bottle],
            size: perfumeOptions.bottleSize.en[preview.size],
            color: perfumeOptions.bottleColor.en[preview.color],
            cap: perfumeOptions.capType.en[preview.cap],
            box: perfumeOptions.boxType.en[preview.box],
            packaging: perfumeOptions.packaging.en[preview.packaging],
          },
          packagingSelections: {
            box: perfumeOptions.boxType.en[preview.box],
            packaging: perfumeOptions.packaging.en[preview.packaging],
          },
          quantity,
          estimatedPrice: pricing.total,
          logoUrl: logoFile || undefined,
          referenceImageUrl: refFile || undefined,
        }}
        isRTL={isRTL}
      />
    </div>
  );
}
