import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, Phone, MapPin, Building2, Globe, MessageSquare, DollarSign, FileText, Home, CheckCircle, Hash } from 'lucide-react';
import { trpc } from '@/providers/trpc';

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    category: string;
    categoryAr?: string;
    productSelections: Record<string, any>;
    packagingSelections?: Record<string, any>;
    quantity: number;
    estimatedPrice: number;
    logoUrl?: string;
    referenceImageUrl?: string;
    aiRecommendation?: Record<string, any>;
  };
  isRTL: boolean;
}

export default function CustomerDetailsModal({ isOpen, onClose, orderData, isRTL }: CustomerDetailsModalProps) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    companyName: '',
    brandName: '',
    website: '',
    projectDescription: '',
    estimatedBudget: '',
    preferredContact: 'email' as 'email' | 'phone' | 'whatsapp',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [submitError, setSubmitError] = useState('');

  const createOrder = trpc.orders.create.useMutation({
    onSuccess: (data) => {
      setOrderId(data.orderId);
      setSubmitted(true);
    },
    onError: () => setSubmitError('We could not submit your request. Please check your connection and try again.'),
  });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = isRTL ? 'الاسم الكامل مطلوب' : 'Full name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = isRTL ? 'بريد إلكتروني صالح مطلوب' : 'Valid email is required';
    if (!form.phone.trim()) errs.phone = isRTL ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    if (!form.country.trim()) errs.country = isRTL ? 'الدولة مطلوبة' : 'Country is required';
    if (!form.city.trim()) errs.city = isRTL ? 'المدينة مطلوبة' : 'City is required';
    if (!form.address.trim()) errs.address = isRTL ? 'العنوان مطلوب' : 'Address is required';
    if (!form.brandName.trim()) errs.brandName = isRTL ? 'اسم العلامة مطلوب' : 'Brand name is required';
    if (!form.projectDescription.trim()) errs.projectDescription = isRTL ? 'وصف المشروع مطلوب' : 'Project description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitError('');
    createOrder.mutate({
      customer: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        city: form.city,
        address: form.address,
        companyName: form.companyName || undefined,
        brandName: form.brandName,
        website: form.website || undefined,
        preferredContact: form.preferredContact,
      },
      category: orderData.category,
      categoryAr: orderData.categoryAr,
      productSelections: orderData.productSelections,
      packagingSelections: orderData.packagingSelections,
      quantity: orderData.quantity,
      estimatedBudget: form.estimatedBudget ? parseInt(form.estimatedBudget) : undefined,
      estimatedPrice: orderData.estimatedPrice,
      logoUrl: orderData.logoUrl,
      referenceImageUrl: orderData.referenceImageUrl,
      projectDescription: form.projectDescription,
      aiRecommendation: orderData.aiRecommendation,
    });
  };

  const field = (label: string, icon: React.ReactNode, value: string, onChange: (v: string) => void, placeholder: string, type = 'text', required = false, error?: string) => (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
        {icon} {label} {required && <span className="text-red-400">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
          className="w-full px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#d4af37] focus:outline-none transition-colors resize-none text-sm"
          style={{ background: 'var(--bg-primary)', border: `1px solid ${error ? '#ef4444' : 'var(--border-color)'}`, color: 'var(--text-primary)' }} />
      ) : type === 'select' ? (
        <select value={value} onChange={e => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#d4af37] focus:outline-none transition-colors text-sm"
          style={{ background: 'var(--bg-primary)', border: `1px solid ${error ? '#ef4444' : 'var(--border-color)'}`, color: 'var(--text-primary)' }}>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#d4af37] focus:outline-none transition-colors text-sm"
          style={{ background: 'var(--bg-primary)', border: `1px solid ${error ? '#ef4444' : 'var(--border-color)'}`, color: 'var(--text-primary)' }} />
      )}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} onClick={e => e.stopPropagation()}
            className="rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {submitted ? (isRTL ? 'تم الإرسال!' : 'Submitted!') : (isRTL ? 'معلومات العميل' : 'Customer Information')}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors" style={{ color: 'var(--text-secondary)' }}><X size={20} /></button>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.3)' }}>
                  <CheckCircle size={28} className="text-emerald-500" />
                </div>
                <p className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? 'تم إرسال طلبك بنجاح' : 'Your request has been submitted successfully'}</p>
                <p className="mb-1 text-sm" style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'رقم الطلب:' : 'Your Order ID:'}</p>
                <p className="text-2xl font-bold text-[#d4af37] mb-4 font-mono tracking-wider">{orderId}</p>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{isRTL ? 'احتفظ برقم الطلب لتتبع حالة طلبك' : 'Save this Order ID to track your request status'}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={`/track-order?orderId=${orderId}&email=${encodeURIComponent(form.email)}`}
                    className="luxury-button text-sm justify-center">{isRTL ? 'تتبع الطلب' : 'Track Order'}</a>
                  <button onClick={onClose} className="luxury-button-outline text-sm justify-center">{isRTL ? 'إغلاق' : 'Close'}</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Required Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {field(isRTL ? 'الاسم الكامل *' : 'Full Name *', <User size={14} />, form.fullName, v => setForm(p => ({ ...p, fullName: v })), isRTL ? 'أحمد محمد' : 'John Smith', 'text', true, errors.fullName)}
                  {field(isRTL ? 'البريد الإلكتروني *' : 'Email *', <Mail size={14} />, form.email, v => setForm(p => ({ ...p, email: v })), 'email@example.com', 'email', true, errors.email)}
                  {field(isRTL ? 'الهاتف / واتساب *' : 'Phone / WhatsApp *', <Phone size={14} />, form.phone, v => setForm(p => ({ ...p, phone: v })), '+971 50 123 4567', 'tel', true, errors.phone)}
                  {field(isRTL ? 'الدولة *' : 'Country *', <MapPin size={14} />, form.country, v => setForm(p => ({ ...p, country: v })), isRTL ? 'الإمارات العربية المتحدة' : 'United Arab Emirates', 'text', true, errors.country)}
                  {field(isRTL ? 'المدينة *' : 'City *', <MapPin size={14} />, form.city, v => setForm(p => ({ ...p, city: v })), isRTL ? 'دبي' : 'Dubai', 'text', true, errors.city)}
                  {field(isRTL ? 'العنوان *' : 'Address *', <Home size={14} />, form.address, v => setForm(p => ({ ...p, address: v })), isRTL ? 'شارع الشيخ زايد، برج خليفة' : 'Sheikh Zayed Road, Downtown Dubai', 'text', true, errors.address)}
                  {field(isRTL ? 'اسم العلامة *' : 'Brand Name *', <Hash size={14} />, form.brandName, v => setForm(p => ({ ...p, brandName: v })), isRTL ? 'ليلى عود' : 'Layla Oud', 'text', true, errors.brandName)}
                  {field(isRTL ? 'اسم الشركة' : 'Company Name', <Building2 size={14} />, form.companyName, v => setForm(p => ({ ...p, companyName: v })), isRTL ? 'شركتك' : 'Your Company LLC')}
                  {field(isRTL ? 'الموقع' : 'Website', <Globe size={14} />, form.website, v => setForm(p => ({ ...p, website: v })), 'www.yourbrand.com')}
                  {field(isRTL ? 'الميزانية (AED)' : 'Budget (AED)', <DollarSign size={14} />, form.estimatedBudget, v => setForm(p => ({ ...p, estimatedBudget: v })), '25000', 'number')}
                </div>
                {field(isRTL ? 'وصف المشروع *' : 'Project Description *', <FileText size={14} />, form.projectDescription, v => setForm(p => ({ ...p, projectDescription: v })), isRTL ? 'صف مشروعك بالتفصيل...' : 'Describe your project in detail...', 'textarea', true, errors.projectDescription)}
                {field(isRTL ? 'طريقة التواصل المفضلة' : 'Preferred Contact', <MessageSquare size={14} />, form.preferredContact, v => setForm(p => ({ ...p, preferredContact: v as any })), '', 'select')}

                {submitError && <p role="alert" className="p-3 rounded-lg text-sm text-red-300 bg-red-500/10 border border-red-500/20">{submitError}</p>}
                <button onClick={handleSubmit} disabled={createOrder.isPending}
                  className="w-full py-4 gold-gradient-bg text-[#1a1a2e] font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  <Send size={18} /> {createOrder.isPending ? (isRTL ? 'جارٍ الإرسال...' : 'Submitting...') : (isRTL ? 'إرسال الطلب' : 'Submit Request')}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
