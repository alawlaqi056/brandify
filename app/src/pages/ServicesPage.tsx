import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Factory, Boxes, Palette, Globe, Camera, TrendingUp, Share2, Shield, ArrowRight, CheckCircle, Sparkles, MessageCircle } from 'lucide-react';
import { useLang } from '../components/LanguageProvider';
import { whatsappUrl } from '../config';

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease }}>{children}</motion.div>;
}

const services = [
  { icon: Factory, title: 'Product Manufacturing', titleAr: 'تصنيع المنتج', desc: 'End-to-end manufacturing for perfumes, bags, watches, and eyewear. From sourcing raw materials to final assembly, we connect you with vetted luxury factories across UAE, Turkey, China, and Italy.', descAr: 'تصنيع شامل للعطور والحقائب والساعات والنظارات. من sourcing المواد الخام إلى التجميع النهائي.', features: ['MOQ from 100 units', 'Premium materials', 'Quality inspection', 'Sample approval'] },
  { icon: Boxes, title: 'Packaging Design', titleAr: 'تصميم التعبئة', desc: 'Luxury packaging that tells your brand story. Custom boxes, magnetic closures, foil stamping, embossing, and premium unboxing experiences designed by award-winning packaging designers.', descAr: 'تعبئة فاخرة تحكي قصة علامتك. صناديق مخصصة، إغلاق مغناطيسي، طباعة فويل، وتجارب فتح فاخرة.', features: ['Custom box design', 'Magnetic closures', 'Foil stamping', 'Premium inserts'] },
  { icon: Palette, title: 'Brand Identity', titleAr: 'هوية العلامة', desc: 'Complete brand identity systems including logo design, color palettes, typography, brand guidelines, and visual assets that position your brand in the luxury market.', descAr: 'أنظمة هوية علامة تجارية كاملة تشمل تصميم الشعار ولوحات الألوان والخطوط وإرشادات العلامة.', features: ['Logo design', 'Color palette', 'Typography', 'Brand guidelines'] },
  { icon: Globe, title: 'E-commerce Website', titleAr: 'متجر إلكتروني', desc: 'Beautiful, conversion-optimized online stores built with modern technology. Shopify integration, payment gateways, multi-currency support, and mobile-first design.', descAr: 'متاجر إلكترونية جميلة ومُحسّنة للتحويل مبنية بتقنية حديثة. دمج Shopify وبوابات الدفع ودعم متعدد العملات.', features: ['Shopify/Custom', 'AED currency', 'Payment gateway', 'Mobile-first'] },
  { icon: Camera, title: 'Product Photography', titleAr: 'تصوير المنتج', desc: 'Studio-quality product photography and videography. 360-degree spins, lifestyle shots, macro detail captures, and social media content packages.', descAr: 'تصوير منتجات وفيديو بجودة الاستوديو. لقطات ٣٦٠ درجة، لقطات أسلوب حياة، لقطات ماكرو detail.', features: ['Studio lighting', '360 spins', 'Lifestyle shots', 'Video content'] },
  { icon: TrendingUp, title: 'Marketing Strategy', titleAr: 'استراتيجية تسويق', desc: 'Data-driven marketing strategies tailored for luxury brand launches. Market research, competitor analysis, pricing strategy, and go-to-market roadmaps.', descAr: 'استراتيجيات تسويق مبنية على البيانات مخصصة لإطلاق العلامات الفاخرة. أبحاث السوق وتحليل المنافسين.', features: ['Market research', 'Competitor analysis', 'Pricing strategy', 'Launch roadmap'] },
  { icon: Share2, title: 'Social Media', titleAr: 'وسائل التواصل', desc: 'Full social media management and content creation. Instagram, TikTok, and LinkedIn strategies designed for luxury brand storytelling and audience building.', descAr: 'إدارة كاملة لوسائل التواصل الاجتماعي وإنشاء المحتوى. استراتيجيات إنستقرام وتيك توك ولينكد إن.', features: ['Content calendar', 'Story creation', 'Ad campaigns', 'Analytics'] },
  { icon: Shield, title: 'Legal Registration', titleAr: 'التسجيل القانوني', desc: 'Trademark registration, business licensing, and regulatory compliance for selling in UAE, GCC, and international markets. Full legal support for brand protection.', descAr: 'تسجيل العلامة التجارية وترخيص الأعمال والامتثال التنظيمي للبيع في الإمارات والخليج والأسواق الدولية.', features: ['Trademark filing', 'Business license', 'Import/export', 'Regulatory'] },
];

export default function ServicesPage() {
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
                <Sparkles size={15} /> {isRTL ? 'خدماتنا' : 'Our Services'}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                {isRTL ? 'كل ما تحتاجه لإطلاق علامتك' : 'Everything You Need to Launch'}
              </h1>
              <p className="text-lg text-white/50 leading-relaxed max-w-2xl mx-auto mb-8">
                {isRTL 
                  ? 'من الفكرة إلى الرف — نقدم جميع الخدمات التي تحتاجها لبناء علامة تجارية فاخرة ناجحة.'
                  : 'From idea to shelf — we provide all the services you need to build a successful luxury brand.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/categories" className="luxury-button text-base">
                  {isRTL ? 'ابدأ الآن' : 'Get Started'} <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
                </Link>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25d366] text-white font-medium rounded-xl hover:brightness-110 transition-all text-base">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="luxury-card p-8 h-full">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 gold-gradient-bg rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style={{ boxShadow: '0 4px 20px rgba(212,175,55,0.15)' }}>
                      <svc.icon size={24} className="text-[#1a1a2e]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? svc.titleAr : svc.title}</h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{isRTL ? svc.descAr : svc.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {svc.features.map((f, j) => (
                          <span key={j} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(212,175,55,0.08)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.15)' }}>
                            <CheckCircle size={10} /> {f}
                          </span>
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

      {/* CTA */}
      <section className="py-20" style={{ background: '#0a0a0f' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isRTL ? 'جاهز لبدء رحلتك؟' : 'Ready to Start Your Journey?'}
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            {isRTL ? 'تواصل معنا اليوم واحصل على استشارة مجانية.' : 'Contact us today and get a free consultation.'}
          </p>
          <Link to="/ai-advisor" className="luxury-button text-base">
            <Sparkles size={18} /> {isRTL ? 'جرب المستشار الذكي' : 'Try AI Advisor'}
          </Link>
        </div>
      </section>
    </div>
  );
}
