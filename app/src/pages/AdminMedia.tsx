import { motion } from 'framer-motion';
import { IMAGES } from '../lib/images';

const mediaFiles = [
  { name: 'category-perfumes.jpg', url: IMAGES.catPerfumes, type: 'Product', size: '58KB' },
  { name: 'category-bags.jpg', url: IMAGES.catBags, type: 'Product', size: '63KB' },
  { name: 'category-eyewear.jpg', url: IMAGES.catEyewear, type: 'Product', size: '44KB' },
  { name: 'category-watches.jpg', url: IMAGES.catWatches, type: 'Product', size: '78KB' },
  { name: 'hero-luxury.jpg', url: IMAGES.heroBg, type: 'Hero', size: '248KB' },
  { name: 'packaging-luxury.jpg', url: IMAGES.packagingLuxury, type: 'Packaging', size: '46KB' },
  { name: 'packaging-watches.jpg', url: IMAGES.packagingWatches, type: 'Packaging', size: '91KB' },
];

export default function AdminMedia() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-white">Media Library ({mediaFiles.length})</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mediaFiles.map((file, i) => (
          <div key={i} className="rounded-xl overflow-hidden group" style={{ background: '#14141f', border: '1px solid #1e1e2d' }}>
            <div className="aspect-square relative overflow-hidden">
              <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-3">
              <p className="text-xs font-medium text-white truncate">{file.name}</p>
              <p className="text-xs" style={{ color: '#666680' }}>{file.type} &bull; {file.size}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
