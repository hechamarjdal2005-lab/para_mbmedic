/* ============================================================
   MB MEDICAL — DATA FILE
   ------------------------------------------------------------
   Single source of truth for the whole website.
   Edit ONLY this file to add / remove / re-price products and
   treatments. The homepage, the shop grid and the cart all read
   from here, so a change is instantly live everywhere.
   ============================================================ */

/* ---------- Store contact info (used across all pages) ---------- */
const STORE = {
  name: 'MB Medical',
  legalName: 'Parapharmacie Benguerir Medical',
  tagline: 'Votre parapharmacie en ligne 24h/24',
  taglineEn: 'Your online parapharmacy, open 24/7 — Health, Beauty & Wellness',
  address: 'Hay Ennour N°188, Ben Guerir, El Kelaa des Sraghna, Maroc',
  city: 'Ben Guerir',
  /* International format, no "+" and no spaces — used for wa.me links */
  whatsapp: '212616531299',
  /* Pretty local format for on-screen text */
  phone: '06 16 53 12 99',
  email: 'contact@mbmedical.ma',
  instagram: 'para_mbmedic',
  instagramUrl: 'https://instagram.com/para_mbmedic',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Hay Ennour N°188, Ben Guerir, Morocco'),
  hours: [
    { day: 'Lundi — Vendredi', time: '09:00 — 21:30' },
    { day: 'Samedi', time: '09:00 — 21:30' },
    { day: 'Dimanche', time: '10:00 — 14:00' },
  ],
};

/* ---------- Product categories ---------- */
const CATEGORIES = [
  {
    id: 'skincare',
    name: 'Skincare',
    nameFr: 'Soins',
    desc: 'Nettoyants, sérums et hydratants au quotidien.',
    icon: 'droplet',
    image: img('1601049541289-9b1b7bbbfe19'),
  },
  {
    id: 'face',
    name: 'Face Care',
    nameFr: 'Visage',
    desc: 'Soins ciblés : taches, acne, rides, éclat.',
    icon: 'sparkle',
    image: img('1571781926291-c477ebfd024b'),
  },
  {
    id: 'body',
    name: 'Body Care',
    nameFr: 'Corps',
    desc: 'Peaux sensibles, sèches ou sujettes aux rougeurs.',
    icon: 'leaf',
    image: img('1522337360788-8b13dee7a37e'),
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    nameFr: 'Santé',
    desc: 'Vitamines, protection solaire et accessoires.',
    icon: 'heart',
    image: img('1596178060810-72f53ce9a65c'),
  },
];

/* Helper: builds a clean Unsplash URL (placeholder — swap for your own photos) */
function img(id) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`;
}

/* ---------- Brand carousel ---------- */
const BRANDS = [
  { name: 'La Roche-Posay', note: 'Peaux sensibles', logo: img('1556228720-195a672e8a03') },
  { name: 'Avène', note: 'Eau thermale', logo: img('1512290923902-8a9f81dc236c') },
  { name: 'ISDIN', note: 'Photoprotection', logo: img('1612817288484-6f916006741a') },
];

/* ---------- Products (20 items) ----------
   Fields: id | name | brand | price (DH) | category | image | badge | desc  */
const PRODUCTS = [
  /* ---------------- SKINCARE ---------------- */
  {
    id: 'p01',
    name: 'Effaclar Purifying Foaming Gel',
    brand: 'La Roche-Posay',
    price: 180,
    category: 'skincare',
    badge: 'Best-seller',
    desc: 'Gel nettoyant doux pour peaux mixtes à sensibles.',
    image: img('1596462502278-27bfdc403348'),
  },
  {
    id: 'p02',
    name: 'Toleriane Sensitive Crème Hydratante',
    brand: 'La Roche-Posay',
    price: 265,
    category: 'skincare',
    badge: '',
    desc: 'Hydratation 24h pour peaux réactives et sensibles.',
    image: img('1608248543803-ba4f8c70ae0b'),
  },
  {
    id: 'p03',
    name: 'Anthelios Invisible Fluid SPF 50+',
    brand: 'La Roche-Posay',
    price: 240,
    category: 'skincare',
    badge: 'Indispensable',
    desc: 'Protection solaire invisible, sans effet gras.',
    image: img('1611930022073-b7a4ba5fcccd'),
  },
  {
    id: 'p04',
    name: 'Cleanance Comedones Gel Anti-Acné',
    brand: 'Avène',
    price: 195,
    category: 'skincare',
    badge: '',
    desc: 'Nettoie et assèche les imperfections sans agresser.',
    image: img('1620916566398-39f1143ab7be'),
  },
  {
    id: 'p05',
    name: 'Eau Thermale Spray Apaisant',
    brand: 'Avène',
    price: 95,
    category: 'skincare',
    badge: '',
    desc: 'Brume apaisante anti-rougeurs, à garder au frais.',
    image: img('1596755094514-f87e34085b2c'),
  },
  {
    id: 'p06',
    name: 'Cicaplast B5+ Baume Réparateur',
    brand: 'La Roche-Posay',
    price: 155,
    category: 'skincare',
    badge: '',
    desc: 'Répare les peaux altérées, apaise tiraillements et rougeurs.',
    image: img('1570172619644-dfd03ed5d881'),
  },

  /* ---------------- FACE CARE ---------------- */
  {
    id: 'p07',
    name: 'Hyalu B5 Sérum Hydratant',
    brand: 'La Roche-Posay',
    price: 290,
    category: 'face',
    badge: 'Must-have',
    desc: 'Acide hyaluronique + vitamine B5 : effet repulpant immédiat.',
    image: img('1615397349754-cfa2066a298e'),
  },
  {
    id: 'p08',
    name: 'Flueril Sérum Facial SPF 50+',
    brand: 'ISDIN',
    price: 290,
    category: 'face',
    badge: 'Édition été',
    desc: 'Protection solaire quotidienne à base de proyecciones.',
    image: img('1612817288484-6f916006741a'),
  },
  {
    id: 'p09',
    name: 'Cerameras Crème Réparatrice Visage',
    brand: 'ISDIN',
    price: 340,
    category: 'face',
    badge: '',
    desc: 'Reconstitue la barrière cutanée des peaux abîmées.',
    image: img('1556228720-195a672e8a03'),
  },
  {
    id: 'p10',
    name: 'Elixir Cellular Sérum Éclat',
    brand: 'Avène',
    price: 420,
    category: 'face',
    badge: 'Luxe',
    desc: 'Sérum de nuit qui ravive l’éclat et la fermeté.',
    image: img('1571781926291-c477ebfd024b'),
  },
  {
    id: 'p11',
    name: 'XeraCalm A.D. Crème Relipidante',
    brand: 'Avène',
    price: 210,
    category: 'face',
    badge: '',
    desc: 'Nourrit les peaux très sèches et sujettes aux démangeaisons.',
    image: img('1522335789203-aaabd1fc54bc9'),
  },
  {
    id: 'p12',
    name: 'Sérum Acide Hyaluronique Byphasse',
    brand: 'MB Medical',
    price: 130,
    category: 'face',
    badge: 'Soin maison',
    desc: 'Notre sérum maison à 7 acides hyaluroniques.',
    image: img('1601049541289-9b1b7bbbfe19'),
  },

  /* ---------------- BODY CARE ---------------- */
  {
    id: 'p13',
    name: 'Lipikar Syndet AP+ Gel Douche',
    brand: 'La Roche-Posay',
    price: 190,
    category: 'body',
    badge: '',
    desc: 'Gel lavant surgras pour peaux sèches et sensibles.',
    image: img('1600334089648-b0d9d3028eb2'),
  },
  {
    id: 'p14',
    name: 'Lipikar Baume AP+M Crème Corps',
    brand: 'La Roche-Posay',
    price: 265,
    category: 'body',
    badge: 'Best-seller',
    desc: 'Nutrition intense 24h, texture non grasse.',
    image: img('1540555700478-4be289fbecef'),
  },
  {
    id: 'p15',
    name: 'XeraCalm Lait Corporel Apaisant',
    brand: 'Avène',
    price: 185,
    category: 'body',
    badge: '',
    desc: 'Lait léger pour le quotidien des peaux réactives.',
    image: img('1585652757141-8837d676fac8'),
  },
  {
    id: 'p16',
    name: 'Deo Anti-Transpirant 48h Peaux Sensibles',
    brand: 'Avène',
    price: 110,
    category: 'body',
    badge: '',
    desc: 'Protection 48h respectueuse de la peau sensible.',
    image: img('1580870069867-74c57ee1bb07'),
  },

  /* ---------------- HEALTH & WELLNESS ---------------- */
  {
    id: 'p17',
    name: 'Vitamine D3 + K2 — 90 gélules',
    brand: 'MB Medical',
    price: 150,
    category: 'health',
    badge: '',
    desc: 'Os, immunité et fatigue : le duovitaminique essentiel.',
    image: img('1596178060810-72f53ce9a65c'),
  },
  {
    id: 'p18',
    name: 'Magnésium Marine + Vitamine B6',
    brand: 'MB Medical',
    price: 120,
    category: 'health',
    badge: '',
    desc: 'Formule anti-fatigue pour les journées longues.',
    image: img('1512290923902-8a9f81dc236c'),
  },
  {
    id: 'p19',
    name: 'Patchs Hydrocolloïdes Anti-Boutons (24 pcs)',
    brand: 'MB Medical',
    price: 90,
    category: 'health',
    badge: 'Nouveau',
    desc: 'Pansements discrets qui protègent et absorbent.',
    image: img('1519823551278-64ac92734fb1'),
  },
  {
    id: 'p20',
    name: 'Miel & Propolis Douceur Gorge',
    brand: 'MB Medical',
    price: 75,
    category: 'health',
    badge: '',
    desc: 'Pastilles miel-propolis pour apaiser la gorge.',
    image: img('1617897903246-719242758050'),
  },
];

/* ---------- Hydrafacial treatments (in-store) ----------
   Fields: id | name | price (DH) | duration | tagline | desc | image | features[] */
const SERVICES = [
  {
    id: 's01',
    name: 'Hydrafacial Anti-Tache',
    price: 200,
    duration: '60 min',
    tagline: 'Éclat & uniformité',
    desc: 'Nettoyage en profondeur, extraction douce et sérums éclaircissants pour atténuer les taches et unifier le teint.',
    features: ['Diagnostic teint', 'Sérums anti-taches', 'Masque apaisant'],
    image: img('1519823551278-64ac92734fb1'),
  },
  {
    id: 's02',
    name: 'Hydrafacial Anti-Acné',
    price: 200,
    duration: '60 min',
    tagline: 'Peau nette',
    desc: 'Protocole ciblé peaux grasses et mixtes : aspiration des impuretés, désincrustation et pores resserrés.',
    features: ['Aspiration douce', 'Désincrustation', 'Sérum apaisant'],
    image: img('1615397349754-cfa2066a298e'),
  },
  {
    id: 's03',
    name: 'Hydrafacial Anti-Age',
    price: 200,
    duration: '75 min',
    tagline: 'Ferme & repulpe',
    desc: 'Stimule le renouvellement cellulaire pour lisser les rides, raffermir l’ovale du visage et raviver la jeunesse de la peau.',
    features: ['Massage tonifiant', 'Sérums anti-âge', 'Masque feuille'],
    image: img('1570172619644-dfd03ed5d881'),
  },
  {
    id: 's04',
    name: 'Hydrafacial Hydratant & Oxygénant',
    price: 200,
    duration: '60 min',
    tagline: 'Plein d’eau',
    desc: 'Le soin essentiel des peaux déshydratées : gorgée d’eau, oxygénation et confort immédiat, toute la journée.',
    features: ['Humidification profonde', 'Oxygénation', 'Fini rosée'],
    image: img('1522337360788-8b13dee7a37e'),
  },
  {
    id: 's05',
    name: 'Hydrafacial Omega Light',
    price: 250,
    duration: '80 min',
    tagline: 'Renouveau lumière',
    desc: 'Formule enrichie en oméga 3 et acide hyaluronique : lumière intérieure, fermeté et éclat durable.',
    features: ['Boost Oméga 3', 'Double hydratation', 'Éclat longue durée'],
    image: img('1540555700478-4be289fbecef'),
  },
  {
    id: 's06',
    name: 'Hydrafacial Complet de Luxe',
    price: 300,
    duration: '90 min',
    tagline: 'L’expérience signature',
    desc: 'Notre soin le plus complet : cleanse, extraction, peel, massage, masque et ampoule de finition. Un moment rien que pour vous.',
    features: ['Diagnostic complet', 'Peel resurfacing', 'Massage &amp; drainage', 'Ampoule de finition'],
    image: img('1600334089648-b0d9d3028eb2'),
  },
];

/* ---------- Newsletter / promo strip items ---------- */
const TICKER_ITEMS = [
  'En ligne 24h/24 & 7j/7',
  'Livraison partout au Maroc',
  'Paiement à la livraison',
  'Marques dermo-cosmetiques authentiques',
  'Soins Hydrafacial en magasin',
  'Conseil personnalisé par nos esthéticiennes',
  'Ben Guerir — Hay Ennour N°188',
];