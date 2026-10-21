export type Store = {
  slug: string;
  name: string;
  locality: string;
  address: string;
  hours?: string;
  img: string;
  caption: string;
  /** Google Maps directions link built from the verified address */
  mapsUrl: string;
  flagship?: boolean;
};

function maps(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

// Store details verified from the brand's own site (bapu-best-namkeen) and public listings.
export const stores: Store[] = [
  {
    slug: "phalka-bazar",
    name: "Phalka Bazar",
    locality: "Lashkar · The Original",
    address: "Phalka Bazar, near Sunhari Masjid, Lashkar, Gwalior, MP 474001",
    hours: "10:30 am – 9:30 pm",
    img: "/stores/store-phalka.webp",
    caption: "Where it all began — the original bazar shopfront.",
    mapsUrl: maps("Bapu Best Namkeen, Phalka Bazar, Lashkar, Gwalior"),
    flagship: true,
  },
  {
    slug: "thatipur",
    name: "Thatipur",
    locality: "Thatipur Chauraha",
    address: "Mahipat Plaza, Thatipur Chauraha, Gwalior, MP",
    hours: "Open until 10:00 pm",
    img: "/stores/store-thatipur.webp",
    caption: "Our newest counter — namkeen, sweets, cakes & cookies.",
    mapsUrl: maps("Bapu Best Namkeen, Mahipat Plaza, Thatipur Chauraha, Gwalior"),
  },
  {
    slug: "gole-ka-mandir",
    name: "Gole Ka Mandir",
    locality: "Ganesh Colony · Morar",
    address: "Gole Ka Mandir Road, Ganesh Colony, Morar, Gwalior, MP",
    hours: "Open until 9:30 pm",
    img: "/stores/store-gole.webp",
    caption: "Fresh chaat up front, full namkeen wall inside.",
    mapsUrl: maps("Best Namkeen, Gole Ka Mandir, Morar, Gwalior"),
  },
  {
    slug: "city-centre",
    name: "City Centre",
    locality: "City Centre, Gwalior",
    address: "City Centre, Gwalior, MP",
    hours: "9:00 am – 9:00 pm",
    img: "/stores/store-city.webp",
    caption: "Sweets, gajak and every Best Namkeen pack under one roof.",
    mapsUrl: maps("Bapu Best Namkeen, City Centre, Gwalior"),
  },
];

export const CONTACT = {
  phones: ["+91 94253 07800", "+91 94254 79767"],
  email: "cacamitnamkeen@gmail.com",
  company: "M/S Sunnulal Amit Kumar and Sons",
  addressLine: "Phalka Bazar, Lashkar, Gwalior (M.P.)",
  fssai: "FSSAI Lic. No. 11419570000105",
};
