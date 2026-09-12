import drillImage from '../../attached_assets/generated_images/cordless-drill.png';
import toolboxImage from '../../attached_assets/generated_images/toolbox.png';
import paintImage from '../../attached_assets/generated_images/paint-can.png';
import ladderImage from '../../attached_assets/generated_images/aluminium-ladder.png';
import socketImage from '../../attached_assets/generated_images/socket-set.png';
import helmetImage from '../../attached_assets/generated_images/safety-helmet.png';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  art: 'drill' | 'box' | 'paint' | 'ladder' | 'socket' | 'helmet' | 'tap' | 'brick' | 'bulb' | 'saw';
  description: string;
  pack?: string;
  image?: string;
};

export const categories = [
  { label: 'Tools', art: 'drill' as const },
  { label: 'Building Materials', art: 'brick' as const },
  { label: 'Electrical', art: 'bulb' as const },
  { label: 'Plumbing', art: 'tap' as const },
  { label: 'Hardware', art: 'socket' as const },
  { label: 'Paint & Finishes', art: 'paint' as const },
  { label: 'Safety Gear', art: 'helmet' as const },
  { label: 'Home Improvement', art: 'box' as const },
  { label: 'Outdoor & Garden', art: 'saw' as const },
];

export const products: Product[] = [
  { id: 'dewalt-drill', name: 'DeWalt Cordless Drill', category: 'Tools', price: 6499, originalPrice: 7299, rating: 4.8, reviews: 126, badge: 'Best Seller', art: 'drill', image: drillImage, description: 'Compact 18V cordless drill with 2-speed gearbox, LED work light, and a durable 10mm chuck.', pack: 'Kit with battery & charger' },
  { id: 'stanley-box', name: 'Stanley Tool Box', category: 'Tools', price: 1299, rating: 4.6, reviews: 84, art: 'box', image: toolboxImage, description: 'Tough, lockable organizer with removable tray for everyday repairs and site work.', pack: '19 inch' },
  { id: 'asian-paints', name: 'Asian Paints Wall Paint', category: 'Paint & Finishes', price: 2899, originalPrice: 3199, rating: 4.7, reviews: 59, badge: 'Popular', art: 'paint', image: paintImage, description: 'Low-odour interior emulsion with a smooth washable finish for high-traffic spaces.', pack: '20 L · White' },
  { id: 'aluminium-ladder', name: 'Aluminium Ladder', category: 'Home Improvement', price: 3499, rating: 4.5, reviews: 42, art: 'ladder', image: ladderImage, description: 'Lightweight 5-step ladder with wide anti-slip feet and a secure locking spreader.', pack: '5 step' },
  { id: 'socket-set', name: 'Socket Wrench Set', category: 'Hardware', price: 2499, originalPrice: 2799, rating: 4.8, reviews: 91, badge: 'Value Pick', art: 'socket', image: socketImage, description: 'Chrome vanadium steel socket set with 46 pieces in a sturdy carry case.', pack: '46 pieces' },
  { id: 'safety-helmet', name: 'Safety Helmet', category: 'Safety Gear', price: 499, rating: 4.6, reviews: 137, art: 'helmet', image: helmetImage, description: 'ISI-marked impact-resistant helmet with adjustable headband for all-day comfort.', pack: 'Yellow · Adjustable' },
  { id: 'brass-tap', name: 'Jaquar Brass Bib Tap', category: 'Plumbing', price: 899, rating: 4.4, reviews: 38, art: 'tap', description: 'Solid brass quarter-turn bib tap with chrome finish for kitchens and utility areas.', pack: '15 mm' },
  { id: 'ultratech-cement', name: 'UltraTech PPC Cement', category: 'Building Materials', price: 425, originalPrice: 465, rating: 4.9, reviews: 201, badge: 'Site Favourite', art: 'brick', description: 'Reliable Portland Pozzolana cement for strong, durable concrete and masonry work.', pack: '50 kg bag' },
  { id: 'led-bulb', name: 'Philips LED Bulb', category: 'Electrical', price: 149, rating: 4.5, reviews: 173, art: 'bulb', description: 'Energy-saving 12W LED bulb with warm white light and a long service life.', pack: '12W · Warm white' },
  { id: 'garden-saw', name: 'Fiskars Garden Saw', category: 'Outdoor & Garden', price: 1099, rating: 4.6, reviews: 28, art: 'saw', description: 'Hardened steel pruning saw with a comfortable non-slip handle for clean cuts.', pack: '330 mm' },
];