import { useState, useEffect, useCallback } from 'react';

export type Language = 'en' | 'ar';

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.brandify': 'Brandify',
    'nav.categories': 'Categories',
    'nav.howItWorks': 'How It Works',
    'nav.aiAdvisor': 'AI Advisor',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'hero.title': 'Build Your Brand In 30 Days',
    'hero.subtitle': 'From idea to market-ready brand with AI-powered guidance',
    'hero.ctaStart': 'Start Your Brand',
    'hero.ctaAI': 'AI Brand Advisor',
    'hero.ctaWhatsApp': 'WhatsApp',
    'hero.scroll': 'Scroll',
    'hero.badge': 'From Idea To Market',
    'categories.title': 'Choose Your Category',
    'categories.subtitle': 'Premium products ready for your brand',
    'categories.explore': 'Explore',
    'categories.startingFrom': 'From',
    'howItWorks.title': 'How It Works',
    'howItWorks.subtitle': 'Your brand journey in 4 simple steps',
    'howItWorks.step1': 'Choose Product',
    'howItWorks.step2': 'Design & Branding',
    'howItWorks.step3': 'Manufacturing',
    'howItWorks.step4': 'Launch & Sell',
    'howItWorks.step1Desc': 'Select from perfumes, bags, eyewear, or watches',
    'howItWorks.step2Desc': 'Our team creates your brand identity and packaging',
    'howItWorks.step3Desc': 'Partner factories produce your premium products',
    'howItWorks.step4Desc': 'Receive your ready-to-sell branded products',
    'aiSection.title': 'AI Brand Advisor',
    'aiSection.description': 'Answer a few questions and our AI will recommend the best product category, budget, quantity, and launch strategy.',
    'aiSection.cta': 'Talk to AI Advisor',
    'aiAdvisor.title': 'AI Brand Advisor',
    'aiAdvisor.subtitle': 'Answer a few questions to get personalized recommendations',
    'aiAdvisor.progress': 'Question',
    'aiAdvisor.of': 'of',
    'aiAdvisor.next': 'Next',
    'aiAdvisor.back': 'Back',
    'aiAdvisor.submit': 'Get Recommendations',
    'aiAdvisor.recommendation': 'Your Recommendation',
    'aiAdvisor.start': 'Start Over',
    'aiAdvisor.thinking': 'Analyzing...',
    'builder.title': 'Product Builder',
    'builder.step': 'Step',
    'builder.of': 'of',
    'builder.next': 'Next',
    'builder.back': 'Back',
    'builder.submit': 'Submit Request',
    'builder.total': 'Total Estimated',
    'builder.perUnit': 'per unit',
    'builder.successTitle': 'Request Submitted!',
    'builder.successDesc': 'Our team will contact you within 24 hours.',
    'builder.successWhatsApp': 'Or reach us on WhatsApp for instant inquiry',
    'services.title': 'Our Services',
    'services.subtitle': 'Everything you need to launch your brand',
    'testimonials.title': 'What Our Clients Say',
    'factoryNetwork.title': 'Global Factory Network',
    'stats.ideas': 'Brands Launched',
    'stats.factories': 'Factory Partners',
    'stats.categories': 'Product Categories',
    'stats.launchTime': 'Days Average',
    'contact.title': 'Get In Touch',
    'contact.send': 'Send Message',
    'footer.tagline': 'Launch Your Brand From Idea To Market',
    'footer.pricing': 'All prices in AED',
    'footer.rights': 'All rights reserved.',
  },
  ar: {
    'nav.brandify': 'برانديفاي',
    'nav.categories': 'الفئات',
    'nav.howItWorks': 'كيف تعمل',
    'nav.aiAdvisor': 'المستشار الذكي',
    'nav.services': 'خدماتنا',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'الإدارة',
    'hero.title': 'اصنع علامتك التجارية خلال 30 يوم',
    'hero.subtitle': 'من الفكرة إلى علامة تجارية جاهزة للبيع بمساعدة الذكاء الاصطناعي',
    'hero.ctaStart': 'ابدأ علامتك',
    'hero.ctaAI': 'المستشار الذكي',
    'hero.ctaWhatsApp': 'واتساب',
    'hero.scroll': 'انزل',
    'hero.badge': 'من الفكرة إلى السوق',
    'categories.title': 'اختر فئتك',
    'categories.subtitle': 'منتجات فاخرة جاهزة لعلامتك',
    'categories.explore': 'استكشاف',
    'categories.startingFrom': 'من',
    'howItWorks.title': 'كيف تعمل',
    'howItWorks.subtitle': 'رحلة علامتك التجارية بأربع خطوات بسيطة',
    'howItWorks.step1': 'اختر المنتج',
    'howItWorks.step2': 'التصميم والعلامة',
    'howItWorks.step3': 'التصنيع',
    'howItWorks.step4': 'الإطلاق والبيع',
    'howItWorks.step1Desc': 'اختر من العطور أو الحقائب أو النظارات أو الساعات',
    'howItWorks.step2Desc': 'فريقنا ينشئ هوية علامتك التجارية وتعبئتها',
    'howItWorks.step3Desc': 'مصانع شريكنا تنتج منتجاتك الفاخرة',
    'howItWorks.step4Desc': 'استلم منتجاتك الجاهزة للبيع بعلامتك التجارية',
    'aiSection.title': 'المستشار الذكي للعلامة التجارية',
    'aiSection.description': 'أجب على بعض الأسئلة وسيساعدك الذكاء الاصطناعي في اختيار أفضل فئة منتج، وميزانية، وكمية، واستراتيجية إطلاق.',
    'aiSection.cta': 'تحدث إلى المستشار الذكي',
    'aiAdvisor.title': 'المستشار الذكي للعلامة التجارية',
    'aiAdvisor.subtitle': 'أجب على بعض الأسئلة للحصول على توصيات مخصصة',
    'aiAdvisor.progress': 'سؤال',
    'aiAdvisor.of': 'من',
    'aiAdvisor.next': 'التالي',
    'aiAdvisor.back': 'رجوع',
    'aiAdvisor.submit': 'الحصول على التوصيات',
    'aiAdvisor.recommendation': 'توصيتك',
    'aiAdvisor.start': 'ابدأ من جديد',
    'aiAdvisor.thinking': 'جارٍ التحليل...',
    'builder.title': 'منشئ المنتج',
    'builder.step': 'خطوة',
    'builder.of': 'من',
    'builder.next': 'التالي',
    'builder.back': 'رجوع',
    'builder.submit': 'إرسال الطلب',
    'builder.total': 'المجموع التقديري',
    'builder.perUnit': 'لكل قطعة',
    'builder.successTitle': 'تم إرسال الطلب!',
    'builder.successDesc': 'سيقوم فريقنا بالتواصل معك خلال ٢٤ ساعة.',
    'builder.successWhatsApp': 'أو تواصل معنا عبر واتساب للاستفسار الفوري',
    'services.title': 'خدماتنا',
    'services.subtitle': 'كل ما تحتاجه لإطلاق علامتك التجارية',
    'testimonials.title': 'ماذا يقول عملاؤنا',
    'factoryNetwork.title': 'شبكة المصانع العالمية',
    'stats.ideas': 'علامة تجارية',
    'stats.factories': 'شريك مصنع',
    'stats.categories': 'فئة منتجات',
    'stats.launchTime': 'يوم متوسط',
    'contact.title': 'تواصل معنا',
    'contact.send': 'إرسال الرسالة',
    'footer.tagline': 'من الفكرة إلى علامة تجارية جاهزة للبيع',
    'footer.pricing': 'جميع الأسعار بالدرهم الإماراتي',
    'footer.rights': 'جميع الحقوق محفوظة.',
  }
};

export function useLanguage() {
  const [locale, setLocaleState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('brandify-lang') as Language | null;
      return saved || 'en';
    }
    return 'en';
  });

  const setLocale = useCallback((l: Language) => {
    setLocaleState(l);
    localStorage.setItem('brandify-lang', l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const t = useCallback((key: string) => {
    return translations[locale]?.[key] || translations['en']?.[key] || key;
  }, [locale]);

  return { locale, setLocale, dir: locale === 'ar' ? 'rtl' : 'ltr' as 'rtl' | 'ltr', t, isRTL: locale === 'ar' };
}
