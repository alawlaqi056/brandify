import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Boxes, Palette, Factory, Globe, Truck, ArrowRight, MessageCircle, Clock, Shield, Users, CheckCircle } from 'lucide-react';
import { useLang } from '../components/LanguageProvider';
import { whatsappUrl } from '../config';

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease }}>{children}</motion.div>;
}

const steps = [
  { icon: Boxes, num: '01', title: 'Choose Your Product', titleAr: 'اختر منتجك', desc: 'Select from our premium categories: Perfumes, Bags, Eyewear, or Watches. Use our AI Advisor for personalized recommendations based on your budget and goals.', descAr: 'اختر من فئاتنا المتميزة: العطور أو الحقائب أو النظارات أو الساعات. استخدم مستشارنا الذكي لتوصيات مخصصة.', details: ['Browse 4 luxury categories', 'AI-powered recommendations', 'Budget analysis', 'Market positioning'] },
  { icon: Palette, num: '02', title: 'Design Your Brand', titleAr: 'صمم علامتك', desc: 'Configure every detail of your product using our interactive builder. Choose materials, colors, packaging, and upload your logo for a personalized preview.', descAr: 'قم بتهيئة كل تفصيل في منتجك باستخدام منشئنا التفاعلي. اختر المواد والألوان والتعبئة.', details: ['Interactive product builder', 'Real-time 3D preview', 'Logo placement', 'Packaging design'] },
  { icon: Factory, num: '03', title: 'Manufacturing', titleAr: 'التصنيع', desc: 'We connect you with certified luxury factories. Your order enters our production pipeline with full quality control checkpoints at every stage.', descAr: 'نربطك بمصانع فاخرة معتمدة. يدخل طلبك خط الإنتاج مع مراقبة جودة كاملة.', details: ['Vetted factory network', 'Sample approval', 'Quality checkpoints', 'Production timeline'] },
  { icon: Globe, num: '04', title: 'Launch & Grow', titleAr: 'أطلق وانمُ', desc: 'Receive your finished products with luxury packaging. We help with e-commerce setup, marketing strategy, and ongoing brand growth support.', descAr: 'استلم منتجاتك النهائية مع تعبئة فاخرة. نساعدك في إعداد المتجر الإلكتروني واستراتيجية التسويق.', details: ['Luxury packaging delivery', 'E-commerce website', 'Marketing strategy', 'Ongoing support'] },
];

const timeline = [
  { day: 'Day 1-2', label: 'Order & Design', labelAr: 'الطلب والتصميم', desc: 'Submit your requirements, configure your product, and approve designs.', icon: Boxes },
  { day: 'Day 3-7', label: 'Sample Production', labelAr: 'إنتاج العينة', desc: 'Factory creates samples for your approval before mass production.', icon: Palette },
  { day: 'Day 8-14', label: 'Manufacturing', labelAr: 'التصنيع', desc: 'Full production begins with quality control at every stage.', icon: Factory },
  { day: 'Day 15-18', label: 'Packaging', labelAr: 'التعبئة', desc: 'Products are packaged in your custom luxury packaging.', icon: Boxes },
  { day: 'Day 19-21', label: 'Quality Check', labelAr: 'فحص الجودة', desc: 'Final inspection and quality assurance before shipping.', icon: Shield },
  { day: 'Day 22-28', label: 'Delivery', labelAr: 'التوصيل', desc: 'Your products are shipped to your location, ready to launch.', icon: Truck },
];

export default function HowItWorksPage() {
  const { isRTL } = useLang();
  return (
    <div className="min-h-screen pt-[72px]" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: '#0a0a0f' }}>
        <div className="absolute inset-0 mesh-gradient" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 glass-card rounded-full text-sm font-medium text-[#d4af37] mb-6">
                <Clock size={15} /> {isRTL ? '٤ خطوات بسيطة' : '4 Simple Steps'}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                {isRTL ? 'كيف تعمل برانديفاي' : 'How Brandify Works'}
              </h1>
              <p className="text-lg text-white/50 leading-relaxed max-w-2xl mx-auto mb-8">
                {isRTL 
                  ? 'عملية مبسطة من الفكرة إلى الإطلاق. نحن نتعامل مع التعقيد حتى تتمكن من التركيز على علامتك.'
                  : 'A streamlined process from idea to launch. We handle the complexity so you can focus on your brand.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/categories" className="luxury-button text-base">
                  {isRTL ? 'ابدأ الآن' : 'Start Now'} <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
                </Link>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25d366] text-white font-medium rounded-xl hover:brightness-110 transition-all text-base">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="luxury-card p-8 relative overflow-hidden">
                  <span className="absolute top-4 right-4 text-7xl font-bold leading-none select-none" style={{ color: 'rgba(212,175,55,0.05)' }}>{step.num}</span>
                  <div className="flex items-start gap-5 relative z-10">
                    <div className="w-16 h-16 gold-gradient-bg rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style={{ boxShadow: '0 8px 30px rgba(212,175,55,0.15)' }}>
                      <step.icon size={28} className="text-[#1a1a2e]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-[#d4af37]">{step.num}</span>
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{isRTL ? step.titleAr : step.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{isRTL ? step.descAr : step.desc}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {step.details.map((d, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <CheckCircle size={12} className="text-[#d4af37] shrink-0" />
                            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="w-12 h-[2px] gold-gradient-bg mx-auto mb-6 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                {isRTL ? 'الجدول الزمني للإنتاج' : 'Production Timeline'}
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                {isRTL ? 'من الطلب إلى التسليم في ٢٢-٢٨ يوماً' : 'From order to delivery in 22-28 days'}
              </p>
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px" style={{ background: 'var(--border-color)' }} />
            {timeline.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:block flex-1" />
                  <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center shrink-0 z-10 shadow-lg" style={{ boxShadow: '0 4px 20px rgba(212,175,55,0.2)' }}>
                    <item.icon size={20} className="text-[#1a1a2e]" />
                  </div>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="text-xs font-mono text-[#d4af37] font-medium">{item.day}</span>
                    <h4 className="text-base font-semibold mt-1 mb-1" style={{ color: 'var(--text-primary)' }}>{isRTL ? item.labelAr : item.label}</h4>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{isRTL ? item.labelAr : item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20" style={{ background: '#0a0a0f' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Clock, value: '22-28', label: 'Days Delivery', labelAr: 'يوم توصيل' },
              { icon: Factory, value: '25+', label: 'Partner Factories', labelAr: 'مصنع شريك' },
              { icon: Shield, value: '100%', label: 'Quality Check', labelAr: 'فحص جودة' },
              { icon: Users, value: '500+', label: 'Brands Launched', labelAr: 'علامة أُطلقت' },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="space-y-2">
                  <stat.icon size={24} className="text-[#d4af37] mx-auto mb-2" />
                  <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm" style={{ color: '#8a8a9a' }}>{isRTL ? stat.labelAr : stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
