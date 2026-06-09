import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Upload, Send, Sparkles } from 'lucide-react';
import { useLang } from '../components/LanguageProvider';
import { watchOptions, calculatePrice, formatAED } from '../lib/data';
import CustomerDetailsModal from '../components/CustomerDetailsModal';
import { readValidatedImage } from '../lib/uploads';

const ease = [0.16, 1, 0.3, 1] as const;
const TOTAL_STEPS = 7;

export default function WatchesBuilder() {
  const { isRTL } = useLang();
  const [step, setStep] = useState(1);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [preview, setPreview] = useState({ gender: 0, strap: 0, caseMaterial: 0, dialColor: 0, box: 0 });
  const [brandName, setBrandName] = useState('');
  const [quantity, setQuantity] = useState(500);
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [refFile, setRefFile] = useState<string | null>(null);

  const L = (arr: { en: string[]; ar: string[] }) => isRTL ? arr.ar : arr.en;
  const pricing = calculatePrice('watches', quantity, preview, []);
  const nextStep = () => { if (step < TOTAL_STEPS) setStep(s => s + 1); };
  const prevStep = () => { if (step > 1) setStep(s => s - 1); };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    readValidatedImage(file, setter, window.alert);
  };

  const handleSubmit = () => {
    setShowCustomerModal(true);
  };

  const dialColors = ['#000000', '#ffffff', '#1e3a5f', '#c0c0c0', '#1a4d2e'];
  const progress = (step / TOTAL_STEPS) * 100;

  const stepLabels = [isRTL ? 'العلامة' : 'Brand', isRTL ? 'الجنس' : 'Gender', isRTL ? 'السوار' : 'Strap', isRTL ? 'المادة' : 'Case', isRTL ? 'اللون' : 'Dial', isRTL ? 'التفاصيل' : 'Details', isRTL ? 'المراجعة' : 'Review'];

  return (
    <div className="min-h-screen pt-[72px] pb-32" style={{ background: 'var(--bg-primary)' }}>
      <div className="sticky top-[72px] z-30 py-4" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: 'var(--border-color)' }}>
            <motion.div className="h-full gold-gradient-bg" animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease }} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'خطوة' : 'Step'} {step} {isRTL ? 'من' : 'of'} {TOTAL_STEPS}</span>
            <span className="text-[#d4af37] font-medium">{stepLabels[step - 1]}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Live Preview */}
        <div className="mb-10 p-6 rounded-2xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'معاينة حية' : 'Live Preview'}</h3>
            <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}><Sparkles size={12} className="text-[#d4af37]" /> {isRTL ? 'يتم التحديث فوراً' : 'Updates instantly'}</span>
          </div>
          <div className="flex items-center justify-center py-6">
            <svg width="120" height="150" viewBox="0 0 120 150">
              <rect x="40" y="0" width="40" height="35" rx="5" fill={preview.strap === 1 ? '#c0c0c0' : preview.strap === 3 ? '#d4af37' : '#3a2a1a'} />
              <circle cx="60" cy="75" r="40" fill={watchOptions.caseMaterial.prices[preview.caseMaterial] > 35 ? '#d4af37' : '#c0c0c0'} fillOpacity="0.3" stroke={watchOptions.caseMaterial.prices[preview.caseMaterial] > 35 ? '#d4af37' : '#c0c0c0'} strokeWidth="4" />
              <circle cx="60" cy="75" r="32" fill={dialColors[preview.dialColor]} />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x1 = 60 + 26 * Math.cos(rad);
                const y1 = 75 + 26 * Math.sin(rad);
                const x2 = 60 + 28 * Math.cos(rad);
                const y2 = 75 + 28 * Math.sin(rad);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={dialColors[preview.dialColor] === '#ffffff' ? '#000' : '#fff'} strokeWidth={i % 3 === 0 ? 2 : 1} />;
              })}
              <line x1="60" y1="75" x2="60" y2="55" stroke={dialColors[preview.dialColor] === '#ffffff' ? '#000' : '#fff'} strokeWidth="2" strokeLinecap="round" />
              <line x1="60" y1="75" x2="72" y2="75" stroke={dialColors[preview.dialColor] === '#ffffff' ? '#000' : '#fff'} strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="60" cy="75" r="3" fill="#d4af37" />
              <rect x="40" y="115" width="40" height="35" rx="5" fill={preview.strap === 1 ? '#c0c0c0' : preview.strap === 3 ? '#d4af37' : '#3a2a1a'} />
              <text x="60" y="70" textAnchor="middle" fontSize="6" fill={dialColors[preview.dialColor] === '#ffffff' ? '#000' : '#fff'} opacity="0.7">{brandName || 'BRAND'}</text>
            </svg>
          </div>
          {pricing.total > 0 && (
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{quantity} {isRTL ? 'قطعة' : 'units'}</span>
              <span className="text-lg font-bold text-[#d4af37]">{formatAED(pricing.total)}</span>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && <Step key="s1" title={isRTL ? 'اسم العلامة' : 'Brand Name'} desc={isRTL ? 'ما اسم علامتك للساعات؟' : 'What is your watch brand name?'}><input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder={isRTL ? 'مثال: تايم كرافت' : 'e.g. TimeCraft'} className="w-full px-6 py-4 rounded-xl text-lg focus:border-[#d4af37] focus:outline-none" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} /></Step>}
          {step === 2 && <Step key="s2" title={isRTL ? 'الجنس' : 'Gender'} desc={isRTL ? 'لمن الساعة؟' : 'Who is the watch for?'}><div className="grid grid-cols-3 gap-4">{L(watchOptions.gender).map((opt, i) => <button key={opt} onClick={() => { setPreview(p => ({ ...p, gender: i })); nextStep(); }} className={`luxury-card p-6 text-center transition-all ${preview.gender === i ? 'border-[#d4af37]' : ''}`}><p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{opt}</p></button>)}</div></Step>}
          {step === 3 && <Step key="s3" title={isRTL ? 'نوع السوار' : 'Strap Type'} desc={isRTL ? 'اختر نوع السوار' : 'Choose strap type'}><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{L(watchOptions.strap).map((opt, i) => <button key={opt} onClick={() => { setPreview(p => ({ ...p, strap: i })); nextStep(); }} className={`luxury-card p-5 text-center transition-all ${preview.strap === i ? 'border-[#d4af37]' : ''}`}><p className="font-medium" style={{ color: 'var(--text-primary)' }}>{opt}</p><p className="text-sm text-[#d4af37] mt-1">+{formatAED(watchOptions.strap.prices[i])}</p></button>)}</div></Step>}
          {step === 4 && <Step key="s4" title={isRTL ? 'مادة الصندوق' : 'Case Material'} desc={isRTL ? 'اختر مادة الصندوق' : 'Choose case material'}><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{L(watchOptions.caseMaterial).map((opt, i) => <button key={opt} onClick={() => { setPreview(p => ({ ...p, caseMaterial: i })); nextStep(); }} className={`luxury-card p-5 text-center transition-all ${preview.caseMaterial === i ? 'border-[#d4af37]' : ''}`}><p className="font-medium" style={{ color: 'var(--text-primary)' }}>{opt}</p><p className="text-sm text-[#d4af37] mt-1">+{formatAED(watchOptions.caseMaterial.prices[i])}</p></button>)}</div></Step>}
          {step === 5 && <Step key="s5" title={isRTL ? 'لون الميناء' : 'Dial Color'} desc={isRTL ? 'اختر لون الميناء' : 'Choose dial color'}><div className="grid grid-cols-3 md:grid-cols-5 gap-4">{L(watchOptions.dialColor).map((opt, i) => <button key={opt} onClick={() => { setPreview(p => ({ ...p, dialColor: i })); nextStep(); }} className={`luxury-card p-4 text-center transition-all ${preview.dialColor === i ? 'border-[#d4af37] ring-2 ring-[#d4af37]/20' : ''}`}><div className="w-10 h-10 rounded-full mx-auto mb-2 border-2" style={{ backgroundColor: dialColors[i], borderColor: preview.dialColor === i ? '#d4af37' : 'transparent' }} /><p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{opt}</p></button>)}</div></Step>}
          {step === 6 && <Step key="s6" title={isRTL ? 'التفاصيل' : 'Details'} desc={isRTL ? 'الكمية والصور' : 'Quantity & Images'}>
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'الكمية' : 'Quantity'}</label>
              <div className="flex items-center gap-4"><input type="range" min="100" max="5000" step="100" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="flex-1 accent-[#d4af37]" /><span className="text-2xl font-bold text-[#d4af37] w-24 text-right">{quantity.toLocaleString()}</span></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadBox label={isRTL ? 'شعار العلامة' : 'Brand Logo'} file={logoFile} onChange={e => handleFile(e, setLogoFile)} isRTL={isRTL} />
              <UploadBox label={isRTL ? 'صورة مرجعية' : 'Reference Image'} file={refFile} onChange={e => handleFile(e, setRefFile)} isRTL={isRTL} />
            </div>
          </Step>}
          {step === 7 && <Step key="s7" title={isRTL ? 'المراجعة' : 'Review'} desc={isRTL ? 'راجع طلبك' : 'Review your order'}>
            <div className="luxury-card p-8 space-y-3">
              {[{ label: isRTL ? 'العلامة' : 'Brand', value: brandName || '-' }, { label: isRTL ? 'الجنس' : 'Gender', value: L(watchOptions.gender)[preview.gender] }, { label: isRTL ? 'السوار' : 'Strap', value: L(watchOptions.strap)[preview.strap] }, { label: isRTL ? 'المادة' : 'Case', value: L(watchOptions.caseMaterial)[preview.caseMaterial] }, { label: isRTL ? 'الميناء' : 'Dial', value: L(watchOptions.dialColor)[preview.dialColor] }, { label: isRTL ? 'الصندوق' : 'Box', value: L(watchOptions.boxType)[preview.box] }, { label: isRTL ? 'الكمية' : 'Quantity', value: quantity.toLocaleString() }, { label: isRTL ? 'المجموع' : 'Total', value: formatAED(pricing.total), gold: true }].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}><span style={{ color: 'var(--text-secondary)' }}>{item.label}</span><span className={`font-medium ${item.gold ? 'text-[#d4af37] text-lg' : ''}`} style={item.gold ? undefined : { color: 'var(--text-primary)' }}>{item.value}</span></div>
              ))}
            </div>
          </Step>}
        </AnimatePresence>

        <div className="fixed bottom-0 left-0 right-0 py-4 px-4 z-40" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button onClick={prevStep} disabled={step === 1} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border transition-all disabled:opacity-30" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}><ChevronLeft size={18} className={isRTL ? 'rotate-180' : ''} /> {isRTL ? 'رجوع' : 'Back'}</button>
            {step === TOTAL_STEPS ? <button onClick={handleSubmit} className="flex items-center gap-2 px-8 py-3 gold-gradient-bg text-[#1a1a2e] font-semibold rounded-xl hover:shadow-lg transition-all"><Send size={18} /> {isRTL ? 'إرسال الطلب' : 'Submit Request'}</button> : <button onClick={nextStep} className="flex items-center gap-2 px-8 py-3 gold-gradient-bg text-[#1a1a2e] font-semibold rounded-xl hover:shadow-lg transition-all">{isRTL ? 'التالي' : 'Next'} <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} /></button>}
          </div>
        </div>
      </div>

      <CustomerDetailsModal
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        orderData={{
          category: 'Watches',
          categoryAr: 'ساعات',
          productSelections: {
            gender: watchOptions.gender.en[preview.gender],
            strap: watchOptions.strap.en[preview.strap],
            caseMaterial: watchOptions.caseMaterial.en[preview.caseMaterial],
            dialColor: watchOptions.dialColor.en[preview.dialColor],
          },
          packagingSelections: {
            box: watchOptions.boxType.en[preview.box],
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

function Step({ children, title, desc }: { children: React.ReactNode; title: string; desc: string }) {
  return <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4, ease }}><h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h2><p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{desc}</p>{children}</motion.div>;
}

function UploadBox({ label, file, onChange, isRTL }: { label: string; file: string | null; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; isRTL: boolean }) {
  return <div><label className="text-sm font-medium mb-3 block" style={{ color: 'var(--text-secondary)' }}>{label}</label><label className="luxury-card p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#d4af37] transition-all">{file ? <img src={file} alt="" className="w-20 h-20 object-contain" /> : <Upload size={28} className="text-[#d4af37]" />}<span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{file ? (isRTL ? 'تم الرفع' : 'Uploaded') : (isRTL ? 'اضغط للرفع' : 'Click to upload')}</span><input type="file" accept="image/*" onChange={onChange} className="hidden" /></label></div>;
}
