import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Mail, Phone } from 'lucide-react';
import { useLang } from './LanguageProvider';
import { BUSINESS, whatsappUrl } from '../config';

export default function Footer() {
  const { t, isRTL } = useLang();
  return (
    <footer className="border-t" style={{ background: '#0a0a0f', borderColor: '#2a2a3a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-5">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight">
                <span className="gold-gradient-text">B</span>
                <span className="text-white">randify</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: '#8a8a9a' }}>{t('footer.tagline')}</p>
            <span className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-sm font-medium px-4 py-1.5 rounded-full">{t('footer.pricing')}</span>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-white text-sm uppercase tracking-wider">{isRTL ? 'روابط سريعة' : 'Quick Links'}</h4>
            <ul className="space-y-3">
              {[
                { label: t('nav.categories'), to: '/categories' },
                { label: t('nav.howItWorks'), to: '/how-it-works' },
                { label: t('nav.services'), to: '/services' },
                { label: t('nav.aiAdvisor'), to: '/ai-advisor' },
                { label: isRTL ? 'تتبع الطلب' : 'Track Order', to: '/track-order' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm transition-colors duration-300 hover:text-[#d4af37]" style={{ color: '#8a8a9a' }}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-white text-sm uppercase tracking-wider">{isRTL ? 'خدماتنا' : 'Services'}</h4>
            <ul className="space-y-3">
              {['Product Manufacturing', 'Packaging Design', 'Brand Identity', 'E-commerce'].map(s => (
                <li key={s} className="text-sm" style={{ color: '#8a8a9a' }}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-white text-sm uppercase tracking-wider">{isRTL ? 'اتصل بنا' : 'Contact'}</h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: BUSINESS.location },
                { icon: Mail, text: BUSINESS.email },
                { icon: Phone, text: BUSINESS.phone },
              ].map(item => (
                <li key={item.text} className="flex items-center gap-3 text-sm" style={{ color: '#8a8a9a' }}>
                  <item.icon size={15} className="text-[#d4af37] shrink-0" />
                  {item.text}
                </li>
              ))}
              <li className="pt-2">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 bg-[#25d366] text-white rounded-xl text-sm font-medium hover:brightness-110 transition-all">
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#2a2a3a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: '#5a5a6a' }}>&copy; {new Date().getFullYear()} {BUSINESS.name}. {t('footer.rights')}</p>
          <p className="text-xs" style={{ color: '#5a5a6a' }}>{isRTL ? 'صُنع في دبي' : 'Made in Dubai'}</p>
        </div>
      </div>
    </footer>
  );
}
