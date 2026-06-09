import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronDown, Boxes, Palette, Factory, Globe, Star, MapPin, Mail, Phone, Send, MessageCircle, Camera, TrendingUp } from 'lucide-react';
import { useLang } from '../components/LanguageProvider';
import { categories, services, testimonials, formatAED } from '../lib/data';
import { IMAGES } from '../lib/images';
import { BUSINESS, whatsappUrl } from '../config';

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Reveal className="text-center mb-16">
      <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="w-12 h-[2px] gold-gradient-bg mx-auto mb-6 rounded-full" />
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      {subtitle && <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>}
    </Reveal>
  );
}

export default function HomePage() {
  const { t, isRTL } = useLang();
  const [contactStatus, setContactStatus] = useState('');

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !message) {
      setContactStatus('Please enter your name, email, and message.');
      return;
    }
    window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(`Website inquiry from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`)}`;
    setContactStatus(`Your email app has been opened. Send the prepared message to ${BUSINESS.email}.`);
  };

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden" style={{ background: '#0a0a0f' }}>
        <div className="absolute inset-0">
          <img src={IMAGES.heroBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.5) 40%, rgba(10,10,15,0.8) 80%, #0a0a0f 100%)' }} />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] animate-pulse" style={{ background: 'rgba(212,175,55,0.04)' }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.2, ease }} className="mb-8">
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 glass-card rounded-full text-sm font-medium text-[#d4af37]">
              <Sparkles size={15} /> {t('hero.badge')}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease }} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            {t('hero.title')}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease }} className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8, ease }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/categories" className="luxury-button text-base">
              {t('hero.ctaStart')}
              <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
            </Link>
            <Link to="/ai-advisor" className="luxury-button-outline text-base">
              {t('hero.ctaAI')}
            </Link>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25d366] text-white font-medium rounded-xl hover:brightness-110 transition-all text-base">
              <MessageCircle size={18} /> {t('hero.ctaWhatsApp')}
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="flex flex-col items-center gap-2">
            <span className="text-xs text-white/30 uppercase tracking-widest">{t('hero.scroll')}</span>
            <ChevronDown size={20} className="text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===================== TRUST BAR ===================== */}
      <div className="py-6 overflow-hidden border-y" style={{ background: '#141420', borderColor: 'rgba(212,175,55,0.05)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs text-white/20 uppercase tracking-[0.3em] mb-4">{isRTL ? 'مستوى عالمي' : 'World-Class Standards'}</p>
          <div className="flex items-center justify-center gap-10 md:gap-16 whitespace-nowrap flex-wrap">
            {(isRTL ? ['رولكس', 'كارتييه', 'شانيل', 'ديور', 'لويس فيتون', 'غوتشي', 'برادا', 'هيرمس'] : ['Rolex', 'Cartier', 'Chanel', 'Dior', 'Louis Vuitton', 'Gucci', 'Prada', 'Hermes']).map((p, i) => (
              <motion.span key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="text-base font-semibold text-white/15 hover:text-[#d4af37]/40 transition-colors duration-500 tracking-wider cursor-default">{p}</motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== CATEGORIES ===================== */}
      <section id="categories" className="py-24 md:py-32" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t('categories.title')} subtitle={t('categories.subtitle')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 0.08}>
                <Link to={`/builder/${cat.id}`}>
                  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.4, ease }} className="relative overflow-hidden rounded-2xl cursor-pointer group" style={{ aspectRatio: '3/4' }}>
                    <img src={cat.image} alt={isRTL ? cat.nameAr : cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl font-bold text-white mb-1">{isRTL ? cat.nameAr : cat.name}</h3>
                      <p className="text-sm text-white/50 mb-3">{t('categories.startingFrom')} {formatAED(cat.minPrice)}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#d4af37] group-hover:gap-2.5 transition-all duration-300">
                        {t('categories.explore')} <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how-it-works" className="py-24 md:py-32" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t('howItWorks.title')} subtitle={t('howItWorks.subtitle')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Boxes, title: t('howItWorks.step1'), desc: t('howItWorks.step1Desc') },
              { icon: Palette, title: t('howItWorks.step2'), desc: t('howItWorks.step2Desc') },
              { icon: Factory, title: t('howItWorks.step3'), desc: t('howItWorks.step3Desc') },
              { icon: Globe, title: t('howItWorks.step4'), desc: t('howItWorks.step4Desc') },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="luxury-card p-8 text-center relative overflow-hidden">
                  <span className="absolute top-4 text-7xl font-bold leading-none select-none" style={{ color: 'rgba(212,175,55,0.04)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <div className="w-16 h-16 mx-auto mb-6 gold-gradient-bg rounded-2xl flex items-center justify-center shadow-lg" style={{ boxShadow: '0 8px 30px rgba(212,175,55,0.15)' }}>
                    <step.icon size={28} className="text-[#1a1a2e]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== AI ADVISOR ===================== */}
      <section id="ai-advisor" className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#0a0a0f' }}>
        <div className="absolute inset-0 mesh-gradient" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="space-y-8">
                <span className="inline-flex items-center gap-2.5 px-5 py-2.5 glass-card rounded-full text-sm font-medium text-[#d4af37]"><Sparkles size={15} /> AI</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">{t('aiSection.title')}</h2>
                <p className="text-lg text-white/50 leading-relaxed max-w-lg">{t('aiSection.description')}</p>
                <ul className="space-y-4">
                  {(isRTL
                    ? ['أفضل فئة منتجات', 'تقدير الميزانية بالدرهم', 'الكمية المقترحة', 'توقع هامش الربح', 'خطة الإطلاق']
                    : ['Best product category', 'AED budget estimation', 'Recommended quantity', 'Profit margin forecast', 'Launch roadmap']
                  ).map((item, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 text-white/70">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(212,175,55,0.15)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <Link to="/ai-advisor" className="inline-flex items-center gap-2.5 px-8 py-4 gold-gradient-bg text-[#1a1a2e] font-semibold rounded-xl hover:shadow-xl hover:shadow-[#d4af37]/20 transition-all mt-4">
                  {t('aiSection.cta')} <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="relative">
                <div className="rounded-3xl p-6 space-y-4" style={{ background: '#141420', border: '1px solid #2a2a3a' }}>
                  <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: '#2a2a3a' }}>
                    <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center"><Sparkles size={18} className="text-[#1a1a2e]" /></div>
                    <div>
                      <p className="text-sm font-medium text-white">{t('aiSection.title')}</p>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <p className="text-xs text-white/40">{isRTL ? 'متصل' : 'Online'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-r-2xl p-5" style={{ background: '#1e1e2e', borderLeft: '2px solid #d4af37' }}>
                    <p className="text-sm text-white/80">{isRTL ? 'ما هو نطاق ميزانيتك؟' : 'What is your budget range?'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(isRTL ? ['أقل من ٥,٠٠٠ د.إ', '٥,٠٠٠ - ١٥,٠٠٠ د.إ', '١٥,٠٠٠ - ٣٠,٠٠٠ د.إ', '٣٠,٠٠٠+ د.إ'] : ['Under AED 5K', 'AED 5K-15K', 'AED 15K-30K', 'AED 30K+']).map(opt => (
                      <button key={opt} className="px-4 py-3 border rounded-xl text-sm transition-all text-left" style={{ borderColor: '#2a2a3a', color: 'rgba(255,255,255,0.6)' }}>{opt}</button>
                    ))}
                  </div>
                </div>
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-[60px]" style={{ background: 'rgba(212,175,55,0.05)' }} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section id="services" className="py-24 md:py-32" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t('services.title')} subtitle={t('services.subtitle')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <Reveal key={svc.id} delay={i * 0.06}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="luxury-card p-7 h-full">
                  <div className="w-14 h-14 gold-gradient-bg rounded-2xl flex items-center justify-center mb-5 shadow-lg" style={{ boxShadow: '0 4px 20px rgba(212,175,55,0.15)' }}>
                    <ServiceIcon name={svc.icon} />
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? svc.nameAr : svc.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{isRTL ? svc.descAr : svc.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="py-24 md:py-32" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t('testimonials.title')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((tm, i) => (
              <Reveal key={tm.id} delay={i * 0.1}>
                <div className="luxury-card p-8">
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(tm.rating)].map((_, j) => <Star key={j} size={16} className="text-[#d4af37] fill-[#d4af37]" />)}
                  </div>
                  <p className="text-lg italic mb-6 leading-relaxed" style={{ color: 'var(--text-primary)' }}>"{isRTL ? tm.quoteAr : tm.quote}"</p>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{isRTL ? tm.nameAr : tm.name}</h4>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{tm.company}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#0a0a0f' }}>
        <div className="absolute inset-0 mesh-gradient" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">{t('contact.title')}</h2>
                  <p className="text-lg text-white/50">{isRTL ? 'جاهز لإطلاق علامتك التجارية؟ تواصل معنا اليوم.' : 'Ready to launch your brand? Contact us today.'}</p>
                </div>
                <div className="space-y-6">
                  {[{ icon: MapPin, text: BUSINESS.location }, { icon: Mail, text: BUSINESS.email }, { icon: Phone, text: BUSINESS.phone }].map(item => (
                    <div key={item.text} className="flex items-center gap-4 text-white/60">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.1)' }}>
                        <item.icon size={20} className="text-[#d4af37]" />
                      </div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-4 bg-[#25d366] text-white font-medium rounded-xl hover:brightness-110 transition-all">
                  <MessageCircle size={22} /> {isRTL ? 'استشارة واتساب' : 'WhatsApp Consultation'}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <form className="space-y-5" onSubmit={submitContact}>
                {[{ p: isRTL ? 'الاسم' : 'Name', t: 'text' }, { p: isRTL ? 'البريد' : 'Email', t: 'email' }, { p: isRTL ? 'الهاتف' : 'Phone', t: 'tel' }].map(f => (
                  <input key={f.p} name={f.t === 'text' ? 'name' : f.t === 'email' ? 'email' : 'phone'} required={f.t !== 'tel'} type={f.t} placeholder={f.p} className="w-full px-6 py-4 rounded-xl text-white placeholder-white/30 focus:border-[#d4af37]/50 focus:outline-none transition-colors text-base" style={{ background: '#141420', border: '1px solid #2a2a3a' }} />
                ))}
                <textarea name="message" required placeholder={isRTL ? 'رسالتك' : 'Message'} rows={4} className="w-full px-6 py-4 rounded-xl text-white placeholder-white/30 focus:border-[#d4af37]/50 focus:outline-none transition-colors resize-none text-base" style={{ background: '#141420', border: '1px solid #2a2a3a' }} />
                {contactStatus && <p role="status" className="text-sm text-amber-200">{contactStatus}</p>}
                <button type="submit" className="w-full px-6 py-4 gold-gradient-bg text-[#1a1a2e] font-semibold rounded-xl hover:shadow-xl hover:shadow-[#d4af37]/20 transition-all flex items-center justify-center gap-2 text-base">
                  <Send size={18} /> {t('contact.send')}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const props = { size: 24, className: 'text-[#1a1a2e]' };
  switch (name) {
    case 'Factory': return <Factory {...props} />;
    case 'Package': return <Boxes {...props} />;
    case 'Palette': return <Palette {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'Camera': return <Camera {...props} />;
    case 'TrendingUp': return <TrendingUp {...props} />;
    case 'Share2': return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
    case 'Shield': return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    default: return <Boxes {...props} />;
  }
}
