import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Upload, Send, Sparkles } from 'lucide-react';
import { useLang } from '../components/LanguageProvider';
import { eyewearOptions, calculatePrice, formatAED } from '../lib/data';
import CustomerDetailsModal from '../components/CustomerDetailsModal';
import { readValidatedImage } from '../lib/uploads';

const ease = [0.16, 1, 0.3, 1] as const;
const TOTAL_STEPS = 7;

export default function EyewearBuilder() {
  const { isRTL } = useLang();
  const [step, setStep] = useState(1);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [preview, setPreview] = useState({ type: 0, frame: 0, frameColor: 0, lens: 0, box: 0 });
  const [brandName, setBrandName] = useState('');
  const [quantity, setQuantity] = useState(500);
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [refFile, setRefFile] = useState<string | null>(null);

  const L = (arr: { en: string[]; ar: string[] }) => isRTL ? arr.ar : arr.en;
  const pricing = calculatePrice('eyewear', quantity, preview, []);
  const nextStep = () => { if (step < TOTAL_STEPS) setStep(s => s + 1); };
  const prevStep = () => { if (step > 1) setStep(s => s - 1); };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    readValidatedImage(file, setter, window.alert);
  };

  const handleSubmit = () => {
    setShowCustomerModal(true);
  };

  const frameColors = ['#000000', '#5c3317', '#d4af37', '#c0c0c0', 'rgba(255,255,255,0.8)'];
  const progress = (step / TOTAL_STEPS) * 100;

  const stepLabels = [isRTL ? 'العلامة' : 'Brand', isRTL ? 'النوع' : 'Type', isRTL ? 'الإطار' : 'Frame', isRTL ? 'اللون' : 'Color', isRTL ? 'العدسة' : 'Lens', isRTL ? 'التفاصيل' : 'Details', isRTL ? 'المراجعة' : 'Review'];

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
            <svg width="180" height="80" viewBox="0 0 180 80">
              {preview.type === 1 ? (
                <rect x="15" y="20" width="65" height="45" rx="8" fill={frameColors[preview.frameColor]} fillOpacity="0.3" stroke={frameColors[preview.frameColor]} strokeWidth="3" />
              ) : (
                <ellipse cx="47" cy="42" rx="32" ry="28" fill={frameColors[preview.frameColor]} fillOpacity="0.3" stroke={frameColors[preview.frameColor]} strokeWidth="3" />
              )}
              {preview.type === 1 ? (
                <rect x="100" y="20" width="65" height="45" rx="8" fill={frameColors[preview.frameColor]} fillOpacity="0.3" stroke={frameColors[preview.frameColor]} strokeWidth="3" />
              ) : (
                <ellipse cx="133" cy="42" rx="32" ry="28" fill={frameColors[preview.frameColor]} fillOpacity="0.3" stroke={frameColors[preview.frameColor]} strokeWidth="3" />
              )}
              <line x1="79" y1="42" x2="101" y2="42" stroke={frameColors[preview.frameColor]} strokeWidth="3" />
              <line x1="15" y1="35" x2="0" y2="30" stroke={frameColors[preview.frameColor]} strokeWidth="2" />
              <line x1="165" y1="35" x2="180" y2="30" stroke={frameColors[preview.frameColor]} strokeWidth="2" />
              <text x="5" y="28" fontSize="5" fill={frameColors[preview.frameColor]}>{brandName || 'BRAND'}</text>
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
          {step === 1 && <Step key="s1" title={isRTL ? 'اسم العلامة' : 'Brand Name'} desc={isRTL ? 'ما اسم علامتك للنظارات؟' : 'What is your eyewear brand name?'}><input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder={isRTL ? 'مثال: فيجن' : 'e.g. VISION'} className="w-full px-6 py-4 rounded-xl text-lg focus:border-[#d4af37] focus:outline-none" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} /></Step>}
          {step === 2 && <Step key="s2" title={isRTL ? 'نوع النظارة' : 'Eyewear Type'} desc={isRTL ? 'اختر نوع النظارة' : 'Choose type'}><div className="grid grid-cols-3 gap-4">{L(eyewearOptions.type).map((opt, i) => <button key={opt} onClick={() => { setPreview(p => ({ ...p, type: i })); nextStep(); }} className={`luxury-card p-6 text-center transition-all ${preview.type === i ? 'border-[#d4af37]' : ''}`}><p className="font-medium" style={{ color: 'var(--text-primary)' }}>{opt}</p></button>)}</div></Step>}
          {step === 3 && <Step key="s3" title={isRTL ? 'شكل الإطار' : 'Frame Style'} desc={isRTL ? 'اختر شكل الإطار' : 'Choose frame style'}><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{L(eyewearOptions.frame).map((opt, i) => <button key={opt} onClick={() => { setPreview(p => ({ ...p, frame: i })); nextStep(); }} className={`luxury-card p-5 text-center transition-all ${preview.frame === i ? 'border-[#d4af37]' : ''}`}><p className="font-medium" style={{ color: 'var(--text-primary)' }}>{opt}</p><p className="text-sm text-[#d4af37] mt-1">+{formatAED(eyewearOptions.frame.prices[i])}</p></button>)}</div></Step>}
          {step === 4 && <Step key="s4" title={isRTL ? 'لون الإطار' : 'Frame Color'} desc={isRTL ? 'اختر لون الإطار' : 'Choose frame color'}><div className="grid grid-cols-3 md:grid-cols-5 gap-4">{L(eyewearOptions.frameColor).map((opt, i) => <button key={opt} onClick={() => { setPreview(p => ({ ...p, frameColor: i })); nextStep(); }} className={`luxury-card p-4 text-center transition-all ${preview.frameColor === i ? 'border-[#d4af37] ring-2 ring-[#d4af37]/20' : ''}`}><div className="w-10 h-10 rounded-full mx-auto mb-2 border-2" style={{ backgroundColor: frameColors[i], borderColor: preview.frameColor === i ? '#d4af37' : 'transparent' }} /><p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{opt}</p></button>)}</div></Step>}
          {step === 5 && <Step key="s5" title={isRTL ? 'نوع العدسة' : 'Lens Type'} desc={isRTL ? 'اختر نوع العدسة' : 'Choose lens type'}><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{L(eyewearOptions.lens).map((opt, i) => <button key={opt} onClick={() => { setPreview(p => ({ ...p, lens: i })); nextStep(); }} className={`luxury-card p-5 text-center transition-all ${preview.lens === i ? 'border-[#d4af37]' : ''}`}><p className="font-medium" style={{ color: 'var(--text-primary)' }}>{opt}</p><p className="text-sm text-[#d4af37] mt-1">+{formatAED(eyewearOptions.lens.prices[i])}</p></button>)}</div></Step>}
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
              {[{ label: isRTL ? 'العلامة' : 'Brand', value: brandName || '-' }, { label: isRTL ? 'النوع' : 'Type', value: L(eyewearOptions.type)[preview.type] }, { label: isRTL ? 'الإطار' : 'Frame', value: L(eyewearOptions.frame)[preview.frame] }, { label: isRTL ? 'لون الإطار' : 'Frame Color', value: L(eyewearOptions.frameColor)[preview.frameColor] }, { label: isRTL ? 'العدسة' : 'Lens', value: L(eyewearOptions.lens)[preview.lens] }, { label: isRTL ? 'الصندوق' : 'Box', value: L(eyewearOptions.boxType)[preview.box] }, { label: isRTL ? 'الكمية' : 'Quantity', value: quantity.toLocaleString() }, { label: isRTL ? 'المجموع' : 'Total', value: formatAED(pricing.total), gold: true }].map((item, i) => (
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
          category: 'Eyewear',
          categoryAr: 'نظارات',
          productSelections: {
            type: eyewearOptions.type.en[preview.type],
            frame: eyewearOptions.frame.en[preview.frame],
            frameColor: eyewearOptions.frameColor.en[preview.frameColor],
            lens: eyewearOptions.lens.en[preview.lens],
          },
          packagingSelections: {
            box: eyewearOptions.boxType.en[preview.box],
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
