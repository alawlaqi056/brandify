import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Package, Clock, CheckCircle, Truck, Award,
  AlertCircle, Mail, Phone, MapPin,
  FileText, DollarSign
} from 'lucide-react';
import { trpc } from '@/providers/trpc';
import { useLang } from '../components/LanguageProvider';
import { formatAED } from '../lib/data';

const statusSteps = [
  { key: 'submitted', label: 'Submitted', labelAr: 'تم الإرسال', icon: Package, desc: 'Your order has been received', descAr: 'تم استلام طلبك' },
  { key: 'under_review', label: 'Under Review', labelAr: 'قيد المراجعة', icon: Clock, desc: 'We are reviewing your requirements', descAr: 'نقوم بمراجعة متطلباتك' },
  { key: 'quotation_preparing', label: 'Quotation', labelAr: 'العرض السعري', icon: FileText, desc: 'Preparing your quotation', descAr: 'إعداد عرضك السعري' },
  { key: 'quotation_sent', label: 'Quote Sent', labelAr: 'تم إرسال العرض', icon: DollarSign, desc: 'Quotation sent for approval', descAr: 'تم إرسال العرض للموافقة' },
  { key: 'waiting_approval', label: 'Approval', labelAr: 'الموافقة', icon: CheckCircle, desc: 'Waiting for your approval', descAr: 'في انتظار موافقتك' },
  { key: 'payment_pending', label: 'Payment', labelAr: 'الدفع', icon: DollarSign, desc: 'Payment pending', descAr: 'في انتظار الدفع' },
  { key: 'production_started', label: 'Production', labelAr: 'التصنيع', icon: Package, desc: 'Production has started', descAr: 'بدأ التصنيع' },
  { key: 'packaging', label: 'Packaging', labelAr: 'التعبئة', icon: Package, desc: 'Product packaging in progress', descAr: 'تعبئة المنتج جارية' },
  { key: 'quality_check', label: 'Quality Check', labelAr: 'فحص الجودة', icon: Award, desc: 'Quality inspection', descAr: 'فحص الجودة' },
  { key: 'ready_for_delivery', label: 'Ready', labelAr: 'جاهز للتوصيل', icon: Truck, desc: 'Ready for delivery', descAr: 'جاهز للتوصيل' },
  { key: 'completed', label: 'Completed', labelAr: 'مكتمل', icon: CheckCircle, desc: 'Order completed', descAr: 'تم إنجاز الطلب' },
];

const statusColors: Record<string, string> = {
  submitted: 'bg-blue-500',
  under_review: 'bg-yellow-500',
  quotation_preparing: 'bg-purple-500',
  quotation_sent: 'bg-indigo-500',
  waiting_approval: 'bg-orange-500',
  payment_pending: 'bg-pink-500',
  production_started: 'bg-cyan-500',
  packaging: 'bg-teal-500',
  quality_check: 'bg-emerald-500',
  ready_for_delivery: 'bg-lime-500',
  completed: 'bg-green-500',
  cancelled: 'bg-red-500',
};

export default function TrackOrderPage() {
  const { isRTL } = useLang();
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [searched, setSearched] = useState(false);

  const { data: order, isLoading } = trpc.orders.track.useQuery(
    { orderId, email },
    { enabled: searched && !!orderId && !!email }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  const getCurrentStepIndex = () => {
    if (!order) return -1;
    return statusSteps.findIndex(s => s.key === order.status);
  };

  const currentStep = getCurrentStepIndex();

  return (
    <div className="min-h-screen pt-[72px] pb-20" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-xl gold-gradient-bg flex items-center justify-center mx-auto mb-4">
            <Truck size={28} className="text-[#1a1a2e]" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {isRTL ? 'تتبع طلبك' : 'Track Your Order'}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isRTL ? 'أدخل رقم الطلب والبريد الإلكتروني لمتابعة حالة طلبك' : 'Enter your order ID and email to check your order status'}
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              placeholder={isRTL ? 'رقم الطلب (مثال: ORD-ABC123)' : 'Order ID (e.g. ORD-ABC123)'}
              className="flex-1 px-4 py-3 rounded-xl focus:border-[#d4af37] focus:outline-none"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-1 px-4 py-3 rounded-xl focus:border-[#d4af37] focus:outline-none"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
            <button
              type="submit"
              className="px-6 py-3 gold-gradient-bg text-[#1a1a2e] font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2 justify-center"
            >
              <Search size={18} /> {isRTL ? 'بحث' : 'Track'}
            </button>
          </div>
        </form>

        {/* Results */}
        <AnimatePresence mode="wait">
          {searched && isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-4" style={{ color: 'var(--text-muted)' }}>{isRTL ? 'جارٍ البحث...' : 'Searching...'}</p>
            </motion.div>
          )}

          {searched && !isLoading && !order && (
            <motion.div
              key="notfound"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 max-w-md mx-auto p-8 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <AlertCircle size={48} className="mx-auto mb-4 text-red-400 opacity-60" />
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {isRTL ? 'لم يتم العثور على الطلب' : 'Order Not Found'}
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                {isRTL ? 'تأكد من رقم الطلب والبريد الإلكتروني' : 'Please check your order ID and email address'}
              </p>
            </motion.div>
          )}

          {searched && !isLoading && order && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Order Summary */}
              <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{isRTL ? 'رقم الطلب' : 'Order ID'}</p>
                    <p className="text-2xl font-bold font-mono text-[#d4af37]">{order.orderId}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[order.status] || 'bg-gray-500'} bg-opacity-15 text-white`}
                    style={{ background: '#66666625' }}>
                    <span style={{ color: 'var(--text-primary)' }}>
                      {statusSteps.find(s => s.key === order.status)?.label || order.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Package size={16} className="text-[#d4af37]" />
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{isRTL ? 'الفئة' : 'Category'}</span>
                    </div>
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{order.category}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign size={16} className="text-emerald-400" />
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{isRTL ? 'المبلغ' : 'Amount'}</span>
                    </div>
                    <p className="font-medium text-[#d4af37]">{formatAED(order.estimatedPrice || 0)}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={16} className="text-blue-400" />
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{isRTL ? 'التاريخ' : 'Date'}</span>
                    </div>
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
                  {isRTL ? 'تقدم الطلب' : 'Order Progress'}
                </h3>
                <div className="relative">
                  {/* Progress line */}
                  <div className="absolute left-6 top-8 bottom-8 w-0.5" style={{ background: 'var(--border-color)' }} />
                  <div
                    className="absolute left-6 top-8 w-0.5 bg-[#d4af37] transition-all"
                    style={{ height: `${Math.max(0, Math.min(100, (currentStep / (statusSteps.length - 1)) * 100))}%` }}
                  />

                  <div className="space-y-4">
                    {statusSteps.map((step, i) => {
                      const isCompleted = i <= currentStep;
                      const isCurrent = i === currentStep;
                      const StepIcon = step.icon;

                      return (
                        <div key={step.key} className="flex items-start gap-4 relative">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                              isCompleted ? 'gold-gradient-bg' : isCurrent ? 'ring-2 ring-[#d4af37]' : ''
                            }`}
                            style={{
                              background: isCompleted ? undefined : isCurrent ? 'var(--bg-primary)' : 'var(--bg-primary)',
                              border: isCompleted ? undefined : `1px solid ${isCurrent ? '#d4af37' : 'var(--border-color)'}`,
                            }}
                          >
                            <StepIcon size={20} className={isCompleted ? 'text-[#1a1a2e]' : isCurrent ? 'text-[#d4af37]' : ''} style={{ color: isCompleted ? undefined : isCurrent ? undefined : 'var(--text-muted)' }} />
                          </div>
                          <div className="pt-1.5">
                            <p className={`font-medium ${isCompleted || isCurrent ? '' : ''}`} style={{ color: isCompleted || isCurrent ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                              {isRTL ? step.labelAr : step.label}
                            </p>
                            <p className="text-sm" style={{ color: isCompleted || isCurrent ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                              {isRTL ? step.descAr : step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              {order.customer && (
                <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                    {isRTL ? 'معلومات العميل' : 'Customer Info'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                        <Mail size={18} style={{ color: 'var(--text-muted)' }} />
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Email</p>
                        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{order.customer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                        <Phone size={18} style={{ color: 'var(--text-muted)' }} />
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Phone</p>
                        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{order.customer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                        <MapPin size={18} style={{ color: 'var(--text-muted)' }} />
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Country</p>
                        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{order.customer.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quotation */}
              {order.quotation && (
                <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                    {isRTL ? 'عرضك السعري' : 'Your Quotation'}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Manufacturing', value: order.quotation.manufacturingCost },
                      { label: 'Packaging', value: order.quotation.packagingCost },
                      { label: 'Branding', value: order.quotation.brandingCost },
                      { label: 'Website', value: order.quotation.websiteCost },
                      { label: 'Photography', value: order.quotation.photographyCost },
                      { label: 'Marketing', value: order.quotation.marketingCost },
                      { label: 'Shipping', value: order.quotation.shippingCost },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between py-1.5 border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatAED(item.value || 0)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-3">
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Total</span>
                      <span className="text-xl font-bold text-[#d4af37]">{formatAED(order.quotation.totalPrice || 0)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Status History */}
              {order.statusHistory && order.statusHistory.length > 0 && (
                <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                    {isRTL ? 'سجل الحالة' : 'Status History'}
                  </h3>
                  <div className="space-y-3">
                    {order.statusHistory.map((h: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                        <div className={`w-2 h-2 rounded-full ${statusColors[h.status] || 'bg-gray-500'}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                            {statusSteps.find(s => s.key === h.status)?.label || h.status}
                          </p>
                          {h.notes && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{h.notes}</p>}
                        </div>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {h.createdAt ? new Date(h.createdAt).toLocaleDateString() : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
