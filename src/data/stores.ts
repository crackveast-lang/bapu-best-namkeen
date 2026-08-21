import type { ImageKey } from './image-meta';

export type Store = {
  id: string;
  name: string;
  area: string;
  address: string;
  hours: string;
  phone?: string;
  /**
   * A Google Maps *search* URL, never a fabricated place id. A search link
   * always resolves to the right shop; a wrong CID sends someone across town.
   */
  mapsUrl?: string;
  image: ImageKey;
  /** One line on what this shop is for, where we know it. */
  note?: string;
  /**
   * true only where the address is on the packaging or the FSSAI licence.
   * Everything else came off public listings (see `source`) and is shown as
   * "listed" rather than stated as fact.
   */
  confirmed: boolean;
  /** Where an unconfirmed address came from, so it can be checked. */
  source?: string;
  /** The head shop. Gets the lead frame in the section. */
  flagship?: boolean;
};

/**
 * The shops, in Gwalior.
 *
 * Phalka Bazar is the only address the business has evidenced: it is the
 * manufacturing and registered address printed on every pack and on the FSSAI
 * licence, and it is the flagship.
 *
 * The other three were gathered from public listings — Zomato, Swiggy, Justdial
 * and Mappls all carry them — because the business asked for the shops to be on
 * the site and had not supplied them. They are marked `confirmed: false` and
 * carry the listing they came from, and the section labels them as listed
 * rather than asserting them. They are almost certainly right; they have simply
 * not been confirmed by the family, and that is a different thing. Every
 * `mapsUrl` is a Google Maps search rather than a pin, so a listing that has
 * since moved still lands the visitor on the right shop.
 *
 * Listings say the chain has more than six shops in Gwalior. Four are named
 * here. See CONTENT-TODO for the ask.
 */
export const STORES: Store[] = [
  {
    id: 'phalka-bazar',
    name: 'Phalka Bazar',
    area: 'Lashkar',
    address: 'Phalka Bazar, near Sunhari Masjid, Lashkar, Gwalior, Madhya Pradesh 474001',
    hours: '10:30 am – 9:30 pm',
    phone: '+91 94253 07800',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Best+Namkeen+Phalka+Bazar+Lashkar+Gwalior',
    image: 'shop-front',
    note: 'The original counter, and the kitchen behind it. Everything on this site is still made here.',
    confirmed: true,
    flagship: true,
  },
  {
    id: 'thatipur',
    name: 'Thatipur',
    area: 'Thatipur Chauraha',
    address: 'Mahipat Plaza, Thatipur Chauraha, Gwalior, Madhya Pradesh',
    hours: 'Until 10:00 pm',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Best+Namkeen+Thatipur+Chauraha+Gwalior',
    image: 'shop-aisle',
    confirmed: false,
    source: 'Public listing (Zomato)',
  },
  {
    id: 'gole-ka-mandir',
    name: 'Gole Ka Mandir',
    area: 'Morar',
    address: 'Gole Ka Mandir Road, Ganesh Colony, Morar, Gwalior, Madhya Pradesh',
    hours: 'Until 9:30 pm',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Best+Namkeen+Gole+Ka+Mandir+Morar+Gwalior',
    image: 'shop-snacks-counter',
    confirmed: false,
    source: 'Public listing (magicpin)',
  },
  {
    id: 'city-centre',
    name: 'City Centre',
    area: 'City Centre',
    address: 'City Centre, Gwalior, Madhya Pradesh',
    hours: '[ADD OPENING HOURS]',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Best+Namkeen+City+Centre+Gwalior',
    image: 'shop-cases',
    confirmed: false,
    source: 'Public listing (Justdial)',
  },
];

export const CONFIRMED_STORE_COUNT = STORES.filter((s) => s.confirmed).length;
