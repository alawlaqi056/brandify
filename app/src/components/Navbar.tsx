import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, Lock } from 'lucide-react';
import { useLang } from './LanguageProvider';

export default function Navbar() {
  const { locale, setLocale, t } = useLang();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('brandify-theme') as 'light' | 'dark' | null;
    const initial = saved || 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('brandify-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const switchLang = () => setLocale(locale === 'en' ? 'ar' : 'en');

  const allNavLinks = [
    { label: t('nav.categories'), to: '/categories' },
    { label: t('nav.howItWorks'), to: '/how-it-works' },
    { label: t('nav.services'), to: '/services' },
    { label: t('nav.aiAdvisor'), to: '/ai-advisor' },
    { label: t('nav.contact'), to: '/#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome 
          ? 'bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-color)] shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <Link to="/" className="flex items-center gap-1 shrink-0">
            <span className="text-2xl font-bold tracking-tight">
              <span className="gold-gradient-text">B</span>
              <span style={{ color: 'var(--text-primary)' }}>randify</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {allNavLinks.map((item, i) => (
              item.to.startsWith('/#') ? (
                <a key={i} href={item.to} className="px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-[#d4af37]" style={{ color: 'var(--text-secondary)' }}>
                  {item.label}
                </a>
              ) : (
                <Link key={i} to={item.to} className={`px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-[#d4af37] ${location.pathname === item.to ? 'text-[#d4af37]' : ''}`} style={{ color: location.pathname === item.to ? '#d4af37' : 'var(--text-secondary)' }}>
                  {item.label}
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl hover:bg-[var(--bg-secondary)] transition-all" style={{ color: 'var(--text-secondary)' }} aria-label="Theme">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button onClick={switchLang} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl border transition-all hover:border-[#d4af37]/30 hover:text-[#d4af37]" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
              <Globe size={15} />
              <span className="hidden sm:inline">{locale === 'en' ? 'العربية' : 'English'}</span>
            </button>
            <Link to="/admin" className="hidden sm:flex p-2.5 rounded-xl hover:bg-[var(--bg-secondary)] transition-all" style={{ color: 'var(--text-secondary)' }} aria-label="Admin">
              <Lock size={18} />
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2.5 rounded-xl" style={{ color: 'var(--text-primary)' }} aria-label="Menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[var(--bg-primary)]/95 backdrop-blur-xl border-t"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <div className="px-4 py-6 space-y-1 max-w-7xl mx-auto">
              {allNavLinks.map((item, i) => (
                item.to.startsWith('/#') ? (
                  <a key={i} href={item.to} onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-base font-medium rounded-xl transition-colors hover:bg-[var(--bg-secondary)]" style={{ color: 'var(--text-secondary)' }}>
                    {item.label}
                  </a>
                ) : (
                  <Link key={i} to={item.to} onClick={() => setMenuOpen(false)} className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors hover:bg-[var(--bg-secondary)] ${location.pathname === item.to ? 'text-[#d4af37]' : ''}`} style={{ color: location.pathname === item.to ? '#d4af37' : 'var(--text-secondary)' }}>
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
