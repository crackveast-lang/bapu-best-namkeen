import type { ImageKey } from './image-meta';

export type Store = {
  id: string;
  /** Display name. Only the head shop's address is confirmed. */
  name: string;
  area: string;
  address: string;
  hours: string;
  phone?: string;
  /** Google Maps link. Left empty until the business confirms each pin. */
  mapsUrl?: string;
  /** { lat, lng } — deliberately absent until surveyed; the map renders a
   *  placeholder rather than inventing coordinates. */
  coords?: { lat: number; lng: number };
  image: ImageKey;
  confirmed: boolean;
};

/**
 * Only the first entry is verified — it is the manufacturing and registered
 * address printed on every pack and on the FSSAI licence. The remaining
 * outlets are photographed in the brand's asset folder but the business has
 * not yet supplied their names or addresses, so they carry placeholders and
 * `confirmed: false`. Nothing here is invented.
 */
export const STORES: Store[] = [
  {
    id: 'phalka-bazar',
    name: 'Bapu Best — Phalka Bazar',
    area: 'Lashkar',
    address: 'Phalka Bazar, Lashkar, Gwalior, Madhya Pradesh 474009',
    hours: '[ADD OPENING HOURS]',
    phone: '+91 94253 07800',
    image: 'store-01',
    confirmed: true,
  },
  {
    id: 'store-02',
    name: '[ADD STORE NAME]',
    area: '[ADD AREA]',
    address: '[ADD STORE ADDRESS]',
    hours: '[ADD OPENING HOURS]',
    image: 'store-02',
    confirmed: false,
  },
  {
    id: 'store-03',
    name: '[ADD STORE NAME]',
    area: '[ADD AREA]',
    address: '[ADD STORE ADDRESS]',
    hours: '[ADD OPENING HOURS]',
    image: 'store-03',
    confirmed: false,
  },
  {
    id: 'store-04',
    name: '[ADD STORE NAME]',
    area: '[ADD AREA]',
    address: '[ADD STORE ADDRESS]',
    hours: '[ADD OPENING HOURS]',
    image: 'store-04',
    confirmed: false,
  },
];

export const CONFIRMED_STORE_COUNT = STORES.filter((s) => s.confirmed).length;
