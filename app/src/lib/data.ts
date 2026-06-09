import { getCategoryImage } from './images';

export const categories = [
  { id: 'perfumes', slug: 'perfumes', name: 'Perfumes', nameAr: 'عطور', desc: 'Premium fragrances', descAr: 'عطور فاخرة', image: getCategoryImage('perfumes'), minPrice: 3000, maxPrice: 10000 },
  { id: 'bags', slug: 'bags', name: 'Bags', nameAr: 'حقائب', desc: 'Designer leather bags', descAr: 'حقائب جلدية مصممة', image: getCategoryImage('bags'), minPrice: 5000, maxPrice: 25000 },
  { id: 'eyewear', slug: 'eyewear', name: 'Eyewear', nameAr: 'نظارات', desc: 'Sunglasses & optical', descAr: 'نظارات شمسية وطبية', image: getCategoryImage('eyewear'), minPrice: 4000, maxPrice: 15000 },
  { id: 'watches', slug: 'watches', name: 'Watches', nameAr: 'ساعات', desc: 'Luxury timepieces', descAr: 'ساعات فاخرة', image: getCategoryImage('watches'), minPrice: 5000, maxPrice: 20000 },
];

export const services = [
  { id: 's1', name: 'Product Manufacturing', nameAr: 'تصنيع المنتج', desc: 'Premium quality production', descAr: 'إنتاج بجودة عالية', icon: 'Factory' },
  { id: 's2', name: 'Packaging Design', nameAr: 'تصميم التعبئة', desc: 'Luxury packaging solutions', descAr: 'حلول تعبئة فاخرة', icon: 'Package' },
  { id: 's3', name: 'Brand Identity', nameAr: 'هوية العلامة', desc: 'Logo, colors, typography', descAr: 'شعار، ألوان، خطوط', icon: 'Palette' },
  { id: 's4', name: 'E-commerce Website', nameAr: 'متجر إلكتروني', desc: 'Professional online store', descAr: 'متجر احترافي', icon: 'Globe' },
  { id: 's5', name: 'Product Photography', nameAr: 'تصوير المنتج', desc: 'High-end product shoots', descAr: 'تصوير احترافي', icon: 'Camera' },
  { id: 's6', name: 'Marketing Strategy', nameAr: 'استراتيجية تسويق', desc: 'Launch & growth plan', descAr: 'خطة إطلاق ونمو', icon: 'TrendingUp' },
  { id: 's7', name: 'Social Media', nameAr: 'وسائل التواصل', desc: 'Content & management', descAr: 'محتوى وإدارة', icon: 'Share2' },
  { id: 's8', name: 'Legal Registration', nameAr: 'التسجيل القانوني', desc: 'Trademark & licensing', descAr: 'علامة تجارية', icon: 'Shield' },
];

export const aiQuestions = {
  en: [
    { id: 'q1', question: 'What is your budget range?', options: ['Under AED 5,000', 'AED 5,000 - 15,000', 'AED 15,000 - 30,000', 'AED 30,000 - 50,000', 'Above AED 50,000'] },
    { id: 'q2', question: 'What is your target market?', options: ['UAE & GCC', 'Global / Export', 'Online Only', 'Retail Stores', 'Corporate / B2B'] },
    { id: 'q3', question: 'How many units do you want to start with?', options: ['100-500 units', '500-1,000 units', '1,000-5,000 units', '5,000-10,000 units', '10,000+ units'] },
    { id: 'q4', question: 'Which product category interests you most?', options: ['Perfumes & Fragrances', 'Bags & Leather Goods', 'Eyewear & Sunglasses', 'Watches & Timepieces', 'Not sure yet'] },
    { id: 'q5', question: 'What is your experience level with launching brands?', options: ['First time', 'Some experience', 'Very experienced', 'Have existing brand'] },
  ],
  ar: [
    { id: 'q1', question: 'ما هو نطاق ميزانيتك؟', options: ['أقل من ٥,٠٠٠ د.إ', '٥,٠٠٠ - ١٥,٠٠٠ د.إ', '١٥,٠٠٠ - ٣٠,٠٠٠ د.إ', '٣٠,٠٠٠ - ٥٠,٠٠٠ د.إ', 'أكثر من ٥٠,٠٠٠ د.إ'] },
    { id: 'q2', question: 'ما هو سوقك المستهدف؟', options: ['الإمارات والخليج', 'عالمي / تصدير', 'أونلاين فقط', 'متاجر تجزئة', 'شركات / B2B'] },
    { id: 'q3', question: 'كم عدد الوحدات التي تريد البدء بها؟', options: ['١٠٠-٥٠٠ وحدة', '٥٠٠-١,٠٠٠ وحدة', '١,٠٠٠-٥,٠٠٠ وحدة', '٥,٠٠٠-١٠,٠٠٠ وحدة', 'أكثر من ١٠,٠٠٠ وحدة'] },
    { id: 'q4', question: 'أي فئة منتجات تهتم بها أكثر؟', options: ['العطور والروائح', 'الحقائب والمنتجات الجلدية', 'النظارات والنظارات الشمسية', 'الساعات', 'غير متأكد بعد'] },
    { id: 'q5', question: 'ما هو مستوى خبرتك في إطلاق العلامات التجارية؟', options: ['المرة الأولى', 'بعض الخبرة', 'خبير جداً', 'لدي علامة تجارية قائمة'] },
  ]
};

export function getAIQuestions(locale: 'en' | 'ar') {
  return aiQuestions[locale] || aiQuestions.en;
}

export const perfumeOptions = {
  bottleType: {
    en: ['Classic Glass', 'Crystal Cut', 'Matte Black', 'Gradient', 'Custom Shape'],
    ar: ['زجاج كلاسيكي', 'كريستال', 'مطفي أسود', 'متدرج', 'شكل مخصص'],
    prices: [15, 25, 20, 18, 35],
  },
  bottleSize: {
    en: ['30ml', '50ml', '100ml', '150ml'],
    ar: ['٣٠ مل', '٥٠ مل', '١٠٠ مل', '١٥٠ مل'],
    prices: [8, 12, 18, 25],
  },
  bottleColor: {
    en: ['Clear', 'Amber', 'Black', 'Blue', 'Gold', 'Rose Gold'],
    ar: ['شفاف', 'عنبر', 'أسود', 'أزرق', 'ذهبي', 'ذهبي وردي'],
    prices: [0, 2, 2, 2, 5, 5],
  },
  capType: {
    en: ['Magnetic', 'Screw', 'Snap-on', 'Crystal'],
    ar: ['مغناطيسي', 'برغي', 'ضغط', 'كريستال'],
    prices: [8, 3, 2, 15],
  },
  boxType: {
    en: ['Standard Box', 'Magnetic Box', 'Drawer Box', 'Premium Unboxing'],
    ar: ['صندوق قياسي', 'صندوق مغناطيسي', 'صندوق درج', 'تجربة فاخرة'],
    prices: [5, 12, 15, 25],
  },
  packaging: {
    en: ['Basic', 'Premium', 'Luxury', 'Gift Set'],
    ar: ['أساسي', 'فاخر', 'فاخر جداً', 'طقم هدايا'],
    prices: [3, 8, 15, 20],
  },
};

export const bagOptions = {
  bagType: {
    en: ['Tote', 'Crossbody', 'Clutch', 'Backpack', 'Shoulder Bag'],
    ar: ['حقيبة يد', 'كروس', 'كلتش', 'حقيبة ظهر', 'حقيبة كتف'],
    prices: [25, 20, 18, 30, 22],
  },
  leather: {
    en: ['Full Grain', 'Top Grain', 'Genuine', 'Vegan Leather', 'Suede'],
    ar: ['جلد كامل', 'جلد علوي', 'أصلي', 'جلد نباتي', 'شمواه'],
    prices: [30, 25, 15, 12, 20],
  },
  size: {
    en: ['Small', 'Medium', 'Large'],
    ar: ['صغير', 'متوسط', 'كبير'],
    prices: [15, 20, 25],
  },
  color: {
    en: ['Black', 'Brown', 'Tan', 'Navy', 'Burgundy', 'Custom'],
    ar: ['أسود', 'بني', 'جملي', 'كحلي', 'عنابي', 'مخصص'],
    prices: [0, 0, 0, 2, 2, 5],
  },
  boxType: {
    en: ['Dust Bag Only', 'Standard Box', 'Magnetic Box', 'Premium Set'],
    ar: ['كيس حماية فقط', 'صندوق قياسي', 'صندوق مغناطيسي', 'طقم فاخر'],
    prices: [3, 8, 15, 25],
  },
};

export const watchOptions = {
  gender: { en: ['Men', 'Women', 'Unisex'], ar: ['رجالي', 'نسائي', 'للجنسين'], prices: [0, 0, 0] },
  strap: { en: ['Leather', 'Metal Bracelet', 'Silicone', 'Mesh', 'NATO'], ar: ['جلد', 'معدني', 'سيليكون', 'شبكي', 'ناتو'], prices: [15, 25, 8, 20, 10] },
  caseMaterial: { en: ['Stainless Steel', 'Titanium', 'Ceramic', 'Gold Plated'], ar: ['ستانلس ستيل', 'تيتانيوم', 'سيراميك', 'مطلي ذهب'], prices: [20, 35, 30, 45] },
  dialColor: { en: ['Black', 'White', 'Blue', 'Silver', 'Green'], ar: ['أسود', 'أبيض', 'أزرق', 'فضي', 'أخضر'], prices: [0, 0, 0, 2, 2] },
  boxType: { en: ['Standard', 'Premium Wooden', 'Luxury Presentation'], ar: ['قياسي', 'خشبي فاخر', 'عرض فاخر'], prices: [8, 25, 40] },
};

export const eyewearOptions = {
  type: { en: ['Sunglasses', 'Optical Frames', 'Both'], ar: ['نظارات شمسية', 'إطارات طبية', 'كلاهما'], prices: [0, 0, 0] },
  frame: { en: ['Aviator', 'Wayfarer', 'Round', 'Cat Eye', 'Oversized'], ar: ['أفياتور', 'وايفيرر', 'دائري', 'عين القطة', 'كبير'], prices: [8, 8, 10, 10, 12] },
  frameColor: { en: ['Black', 'Tortoise', 'Gold', 'Silver', 'Clear'], ar: ['أسود', 'سلحفاة', 'ذهبي', 'فضي', 'شفاف'], prices: [0, 3, 5, 3, 2] },
  lens: { en: ['Standard UV', 'Polarized', 'Blue Light', 'Photochromic'], ar: ['UV قياسي', 'مستقطب', 'الضوء الأزرق', 'فوتوكرومي'], prices: [5, 12, 8, 15] },
  boxType: { en: ['Soft Case', 'Hard Case', 'Premium Box'], ar: ['غلاف ناعم', 'غلاف صلب', 'صندوق فاخر'], prices: [3, 8, 15] },
};

export function calculatePrice(
  category: string,
  quantity: number,
  selections: Record<string, number>,
  services: string[]
): { manufacturing: number; packaging: number; services: number; subtotal: number; margin: number; total: number; perUnit: number; marginPercent: number } {
  let baseCost = 0;
  for (const key in selections) {
    baseCost += selections[key] || 0;
  }

  const manufacturing = baseCost * quantity;
  const packaging = manufacturing * 0.25;
  const serviceCost = services.length * 2500;

  const categoryMultipliers: Record<string, number> = { perfumes: 1, bags: 1.5, eyewear: 1.2, watches: 2 };
  const multiplier = categoryMultipliers[category] || 1;

  const subtotal = (manufacturing + packaging + serviceCost) * multiplier;
  const marginPercent = 35;
  const margin = Math.round(subtotal * (marginPercent / 100));
  const total = subtotal + margin;
  const perUnit = Math.round(total / quantity);

  return { manufacturing: Math.round(manufacturing), packaging: Math.round(packaging), services: serviceCost, subtotal: Math.round(subtotal), margin, total: Math.round(total), perUnit, marginPercent };
}

export const testimonials = [
  { id: '1', name: 'Ahmed Al-Rashid', nameAr: 'أحمد الراشد', company: 'Al-Rashid Fragrances', quote: 'Brandify helped us launch our perfume brand in just 3 weeks. The quality is exceptional and the pricing is transparent.', quoteAr: 'ساعدتنا برانديفاي في إطلاق علامتنا للعطور في ٣ أسابيع فقط. الجودة استثنائية والأسعار شفافة.', rating: 5 },
  { id: '2', name: 'Sarah Mitchell', nameAr: 'سارة ميتشيل', company: 'Mitchell Bags', quote: 'From design to delivery, everything was handled professionally. Our bag line is now selling across the UAE.', quoteAr: 'من التصميم إلى التسليم، كل شيء تم باحترافية. خط حقائبنا يبيع الآن في جميع أنحاء الإمارات.', rating: 5 },
  { id: '3', name: 'Khalid Hassan', nameAr: 'خالد حسن', company: 'Hassan Eyewear', quote: 'The AI advisor recommended the perfect market positioning for our eyewear brand. Revenue exceeded expectations.', quoteAr: 'أوصى المستشار الذكي بأفضل موضع سوقي لعلامتنا للنظارات. الإيرادات تجاوزت التوقعات.', rating: 5 },
  { id: '4', name: 'Lisa Chen', nameAr: 'ليزا تشين', company: 'Chen Timepieces', quote: 'Premium quality watches at competitive pricing. The factory network is impressive and delivery was on time.', quoteAr: 'ساعات بجودة ممتازة وبأسعار تنافسية. شبكة المصانع مثيرة للإعجاب والتسليم كان في الوقت المحدد.', rating: 5 },
];

export const factories = [
  { id: '1', country: '🇦🇪', name: 'Dubai Perfume Factory', nameAr: 'مصنع عطور دبي', desc: 'Luxury perfumes, attar', descAr: 'عطور فاخرة، عطر', count: 5 },
  { id: '2', country: '🇨🇳', name: 'Guangzhou Eyewear Co.', nameAr: 'شركة نظارات قوانغتشو', desc: 'Sunglasses, optical frames', descAr: 'نظارات شمسية، إطارات', count: 8 },
  { id: '3', country: '🇹🇷', name: 'Istanbul Leather Works', nameAr: 'مصانع الجلود بإسطنبول', desc: 'Leather bags, wallets', descAr: 'حقائب جلدية، محافظ', count: 4 },
  { id: '4', country: '🇮🇳', name: 'Mumbai Manufacturing', nameAr: 'التصنيع في مومباي', desc: 'Cost-effective production', descAr: 'إنتاج اقتصادي', count: 3 },
  { id: '5', country: '🌐', name: 'Global Custom Network', nameAr: 'شبكة مخصصة عالمية', desc: 'Bespoke manufacturing', descAr: 'تصنيع حسب الطلب', count: 10 },
];

export const faqItems = [
  { id: '1', q: 'How long does it take to launch a brand?', qAr: 'كم يستغرق إطلاق علامة تجارية؟', a: 'Typically 2-4 weeks from concept to delivery, depending on the product category and customization level.', aAr: 'عادة من ٢-٤ أسابيع من الفكرة إلى التسليم، حسب فئة المنتج ومستوى التخصيص.' },
  { id: '2', q: 'What is the minimum order quantity?', qAr: 'ما هو الحد الأدنى للكمية؟', a: 'MOQ starts from 100 units for most categories. We can discuss lower quantities for premium products.', aAr: 'الحد الأدنى يبدأ من ١٠٠ وحدة لمعظم الفئات. يمكننا مناقشة كميات أقل للمنتجات الفاخرة.' },
  { id: '3', q: 'Are all prices in AED?', qAr: 'هل جميع الأسعار بالدرهم الإماراتي؟', a: 'Yes, all prices are quoted in UAE Dirhams (AED). International payments are accepted via bank transfer or credit card.', aAr: 'نعم، جميع الأسعار بالدرهم الإماراتي (د.إ). الدفعات الدولية مقبولة عبر التحويل البنكي أو البطاقة الائتمانية.' },
  { id: '4', q: 'Can I customize the packaging?', qAr: 'هل يمكنني تخصيص التعبئة؟', a: 'Absolutely. We offer full packaging customization including box design, materials, inserts, and finishing.', aAr: 'بالتأكيد. نقدم تخصيصاً كاملاً للتعبئة بما في ذلك تصميم الصندوق والمواد والإدراجات والتشطيب.' },
  { id: '5', q: 'Do you provide branding services?', qAr: 'هل تقدمون خدمات العلامة التجارية؟', a: 'Yes, we provide complete brand identity services including logo design, color palettes, and brand guidelines.', aAr: 'نعم، نقدم خدمات هوية علامة تجارية كاملة تشمل تصميم الشعار ولوحات الألوان وإرشادات العلامة.' },
];

export function formatAED(amount: number): string {
  return new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}
