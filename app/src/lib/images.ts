// Import images via Vite so they get hashed URLs in production
import catPerfumes from '../assets/category-perfumes.jpg';
import catBags from '../assets/category-bags.jpg';
import catEyewear from '../assets/category-eyewear.jpg';
import catWatches from '../assets/category-watches.jpg';
import heroLuxury from '../assets/hero-luxury.jpg';
import packagingLuxury from '../assets/packaging-luxury.jpg';
import packagingWatches from '../assets/packaging-watches.jpg';

export const IMAGES = {
  catPerfumes,
  catBags,
  catEyewear,
  catWatches,
  heroBg: heroLuxury,
  packagingLuxury,
  packagingWatches,
} as const;

export function getCategoryImage(id: string): string {
  switch (id) {
    case 'perfumes': return catPerfumes;
    case 'bags': return catBags;
    case 'eyewear': return catEyewear;
    case 'watches': return catWatches;
    default: return catPerfumes;
  }
}
