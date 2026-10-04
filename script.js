/* ============================================================
   MB MEDICAL — SITE SCRIPT
   ------------------------------------------------------------
   Everything that isn't the cart:
     • sticky nav + slide-in mobile menu
     • scroll-reveal animations (IntersectionObserver)
     • hero letter animation + drifting petals
     • trust ticker, categories, brands, services, products
     • shop filters + live search
     • back-to-top, toasts, opening-hours indicator
     • contact form validation (no backend → hands off to WhatsApp)
   Depends on data.js + cart.js.
   ============================================================ */

/* ============================================================
   0. ICON LIBRARY — inline SVG so nothing depends on a CDN
   ============================================================ */
const ICONS = {
  droplet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7s6.5 6.2 6.5 10.6a6.5 6.5 0 0 1-13 0C5.5 8.9 12 2.7 12 2.7z"/></svg>',
  sparkle:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c0-8 5-14 16-14 0 11-6 15-12 15H4z"/><path d="M4.5 19.5C8 16 12 13.5 17 12"/></svg>',
  heart:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.4 5.6a5.2 5.2 0 0 0-7.4 0L12 6.6l-1-1a5.2 5.2 0 0 0-7.4 7.4l1 1L12 21l7.4-7a5.2 5.2 0 0 0 0-7.4z"/></svg>',
  clock:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/></svg>',
  truck:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6.5h11v9H2z"/><path d="M13 9.5h4.5l3.5 3.5v2.5H13z"/><circle cx="6.5" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>',
  shield:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  sparkleFace:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5c3.4 2.4 6 5.6 6 9.2A6 6 0 0 1 6 12.7c0-3.6 2.6-6.8 6-9.2z"/><path d="M9.5 13.5c.6 1 1.5 1.5 2.5 1.5s1.9-.5 2.5-1.5"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10.5c0 6-8 11.5-8 11.5s-8-5.5-8-11.5a8 8 0 0 1 16 0z"/><circle cx="12" cy="10.2" r="2.8"/></svg>',
  phone:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 16.9v2.6a1.7 1.7 0 0 1-1.9 1.7 17.6 17.6 0 0 1-7.7-2.7 17.3 17.3 0 0 1-5.3-5.3A17.6 17.6 0 0 1 3.9 5.5 1.7 1.7 0 0 1 5.6 3.6h2.6a1.7 1.7 0 0 1 1.7 1.5c.1.9.3 1.7.6 2.5a1.7 1.7 0 0 1-.4 1.8l-1.1 1.1a14 14 0 0 0 5.3 5.3l1.1-1.1a1.7 1.7 0 0 1 1.8-.4c.8.3 1.6.5 2.5.6a1.7 1.7 0 0 1 1.5 1.7z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 6.5 9 6 9-6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  cartPlus:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 3.5h2.2l2.3 11.2a1.8 1.8 0 0 0 1.8 1.4h8.4a1.8 1.8 0 0 0 1.8-1.4L21 7H6"/><circle cx="9.5" cy="20" r="1.4"/><circle cx="17.5" cy="20" r="1.4"/></svg>',
  cartCheck:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3.5 4.5 1.6.6 2.4 10.9h10.2l2-8.4H6.4"/><circle cx="9.5" cy="19.5" r="1.3"/><circle cx="16.5" cy="19.5" r="1.3"/><path d="m10 12.5 2 2 3.5-3.5"/></svg>',
  calendar:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  award:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="m8.5 14.5-1.5 7 5-2.6 5 2.6-1.5-7"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3 21l1.4-5.2A8.5 8.5 0 1 1 21 12z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/></svg>',
  scissors:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6.5" r="2.6"/><circle cx="6" cy="17.5" r="2.6"/><path d="M8.2 7.8 20 18M20 6 8.2 16.2"/></svg>',
  sparkleStar:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.2 5.9 5.8.5-4.4 3.9 1.3 5.8-4.9-3-4.9 3 1.3-5.8L4 8.9l5.8-.5z"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8z"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.6"/></svg>',
};

/* Small helpers ------------------------------------------------ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Swap to the brand's own photo later by editing `src` — CSS gradient shows if it fails */
const imgTag = (src, alt, cls = '', lazy = true) =>
  `<img class="${cls}" src="${src}" alt="${esc(alt)}" ${lazy ? 'loading="lazy" decoding="async"' : ''} onerror="this.classList.add('is-broken')">`;

/** WhatsApp booking deep link for a treatment */
function bookingLink(service) {
  return waLink(
    [
      `Bonjour ${STORE.name} 👋`,
      `Je souhaite réserver un soin :`,
      '',
      `▸ ${service.name} — ${fmtPrice(service.price)} DH`,
      `Durée : ${service.duration}`,
      '',
      'Date / heure souhaitée :',
      'Merci de me confirmer la disponibilité.',
    ].join('\n')
  );
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   1. TOASTS
   ============================================================ */
let toastEl = null;
let toastTimer = null;

function toast(message) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.setAttribute('role', 'status');
    toastEl.innerHTML = `<span class="toast__ico">${ICONS.check}</span><span data-toast-text></span>`;
    document.body.appendChild(toastEl);
  }
  $('[data-toast-text]', toastEl).textContent = message;
  toastEl.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2600);
}

/* ============================================================
   2. NAVIGATION — sticky shadow + mobile slide-in menu
   ============================================================ */
function initNav() {
  const nav = $('.nav');
  const toggle = $('[data-nav-toggle]');
  const menu = $('#navMenu');
  const backdrop = $('.nav__backdrop');

  /* sticky shadow after a few pixels */
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* highlight the current page */
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('#navMenu a[href]').forEach((a) => {
    const target = a.getAttribute('href').split('/').pop().toLowerCase();
    if (target === here) a.classList.add('is-active');
  });

  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    backdrop?.classList.toggle('is-open', open);
    document.body.classList.toggle('is-locked', open);
    if (open) menu.querySelector('a')?.focus({ preventScroll: true });
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  backdrop?.addEventListener('click', () => setOpen(false));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
  });
  /* if the viewport grows to desktop while open, release the lock */
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 960 && menu.classList.contains('is-open')) setOpen(false);
  });
}

/* ============================================================
   3. SCROLL REVEAL
   ============================================================ */
function initReveal() {
  const targets = $$('[data-reveal]');
  if (!targets.length) return;

  /* stagger children of any [data-stagger] container */
  $$('[data-stagger]').forEach((group) => {
    $$(':scope > *', group).forEach((child, i) => {
      child.setAttribute('data-reveal', '');
      if (!child.style.transitionDelay) child.style.transitionDelay = `${i * 85}ms`;
    });
  });

  if (reducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  targets.forEach((el) => io.observe(el));
}

/* ============================================================
   4. HERO — letter-by-letter title + drifting petals
   ============================================================ */
function initHero() {
  const hero = $('[data-hero]');
  if (!hero) return;

  /* split [data-split] text into per-letter spans for the masked reveal */
  $$('[data-split]', hero).forEach((el) => {
    const text = el.textContent.trim();
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.textContent = ch === ' ' ? ' ' : ch;
      s.style.transitionDelay = `${i * 45}ms`;
      el.appendChild(s);
    });
  });

  /* trigger the animation on the next frame so transitions actually run */
  requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-in')));

  /* drifting petals — the floral echo of the MB logo */
  if (!reducedMotion()) {
    const field = $('[data-petals]', hero);
    if (field) {
      for (let i = 0; i < 14; i++) {
        const p = document.createElement('span');
        p.className = 'petal';
        const size = 8 + Math.random() * 14;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${-10 - Math.random() * 20}vh`;
        p.style.setProperty('--dx', `${-60 + Math.random() * 120}px`);
        p.style.animationDuration = `${11 + Math.random() * 13}s`;
        p.style.animationDelay = `${Math.random() * 14}s`;
        if (Math.random() > 0.55) p.style.background = 'linear-gradient(135deg, var(--sage-200), var(--sage-400))';
        field.appendChild(p);
      }
    }
  }
}

/* ============================================================
   5. TRUST TICKER
   ============================================================ */
function initTicker() {
  const track = $('[data-ticker]');
  if (!track) return;

  /* built twice so the -50% marquee loop is seamless */
  const group = `
    <div class="ticker__group">
      ${TICKER_ITEMS.map(
        (t) => `<span class="ticker__item">${ICONS.sparkle}<span>${esc(t)}</span></span><span class="ticker__dot"></span>`
      ).join('')}
    </div>`;
  track.innerHTML = group + group;
}

/* ============================================================
   6. RENDERERS
   ============================================================ */

/* --- Categories ------------------------------------------------ */
function renderCategories() {
  const host = $('[data-categories]');
  if (!host) return;

  host.innerHTML = CATEGORIES.map((c) => {
    const n = PRODUCTS.filter((p) => p.category === c.id).length;
    return `
      <a class="cat-card" href="shop.html?cat=${c.id}" data-reveal>
        ${imgTag(c.image, c.name, 'cat-card__img')}
        <span class="cat-card__count">${n} produits</span>
        <span class="cat-card__ico">${ICONS[c.icon] || ICONS.sparkle}</span>
        <h3>${esc(c.name)}</h3>
        <p>${esc(c.desc)}</p>
      </a>`;
  }).join('');

  initReveal();
}

/* --- Brands carousel -------------------------------------------- */
function renderBrands() {
  const host = $('[data-brands]');
  if (!host) return;

  host.innerHTML = BRANDS.map(
    (b) => `
      <article class="brand-card" data-reveal>
        ${imgTag(b.logo, `Logo ${b.name}`, 'brand-card__logo')}
        <div>
          <h3>${esc(b.name)}</h3>
          <p>${esc(b.note)}</p>
        </div>
      </article>`
  ).join('');

  initReveal();

  /* arrow buttons (desktop only) */
  $$('[data-rail-prev]').forEach((btn) =>
    btn.addEventListener('click', () => host.scrollBy({ left: -host.clientWidth * 0.8, behavior: 'smooth' }))
  );
  $$('[data-rail-next]').forEach((btn) =>
    btn.addEventListener('click', () => host.scrollBy({ left: host.clientWidth * 0.8, behavior: 'smooth' }))
  );
}

/* --- Products ---------------------------------------------------- */
function productCard(p) {
  return `
    <article class="p-card" data-reveal data-category="${p.category}">
      <div class="p-card__media">
        ${imgTag(p.image, p.name)}
        ${p.badge ? `<span class="p-card__tag">${esc(p.badge)}</span>` : ''}
        <span class="p-card__fav" aria-hidden="true">${ICONS.heart}</span>
      </div>
      <div class="p-card__body">
        <span class="p-card__brand">${esc(p.brand)}</span>
        <h3 class="p-card__name">${esc(p.name)}</h3>
        <p class="p-card__desc">${esc(p.desc)}</p>
        <div class="p-card__foot">
          <span class="price">${fmtPrice(p.price)} <small>DH</small></span>
          <button class="add-btn" type="button" data-add="${p.id}" aria-label="Ajouter ${esc(p.name)} au panier">
            ${ICONS.cartPlus}
            <span class="fly">+1</span>
          </button>
        </div>
      </div>
    </article>`;
}

/** Featured products on the homepage */
function renderFeatured() {
  const host = $('[data-featured]');
  if (!host) return;

  /* a hand-picked spread across every category */
  const picks = ['p01', 'p07', 'p04', 'p14', 'p08', 'p17']
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  host.innerHTML = picks.map(productCard).join('');
  initReveal();
}

/** Full catalogue + filters + search (shop.html) */
function renderShop() {
  const grid = $('[data-shop-grid]');
  if (!grid) return;

  const chipHost = $('[data-shop-chips]');
  const searchInput = $('[data-shop-search]');
  const clearBtn = $('[data-shop-clear]');
  const countEl = $('[data-shop-count]');
  const totalEl = $('[data-shop-total]');

  /* read ?cat= from the URL so the category cards can deep-link */
  const params = new URLSearchParams(location.search);
  let activeCat = params.get('cat') || 'all';
  if (activeCat !== 'all' && !CATEGORIES.some((c) => c.id === activeCat)) activeCat = 'all';
  let query = '';

  /* filter chips */
  if (chipHost) {
    const countFor = (id) => (id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === id).length);
    chipHost.innerHTML = [{ id: 'all', name: 'Tout', icon: 'grid' }, ...CATEGORIES]
      .map(
        (c) => `
        <button class="chip ${c.id === activeCat ? 'is-active' : ''}" type="button" data-cat="${c.id}">
          ${ICONS[c.icon] || ICONS.grid}
          <span>${esc(c.name)}</span>
          <span class="chip__n">${countFor(c.id)}</span>
        </button>`
      )
      .join('');

    chipHost.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-cat]');
      if (!chip) return;
      activeCat = chip.dataset.cat;
      $$('.chip', chipHost).forEach((c) => c.classList.toggle('is-active', c === chip));
      /* keep the URL shareable without adding history entries */
      const url = new URL(location.href);
      if (activeCat === 'all') url.searchParams.delete('cat');
      else url.searchParams.set('cat', activeCat);
      history.replaceState(null, '', url);
      paint();
    });
  }

  /* search */
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      query = searchInput.value.trim().toLowerCase();
      clearBtn?.classList.toggle('is-on', query.length > 0);
      paint();
    });
    clearBtn?.addEventListener('click', () => {
      searchInput.value = '';
      query = '';
      clearBtn.classList.remove('is-on');
      searchInput.focus();
      paint();
    });
  }

  function matches(p) {
    const byCat = activeCat === 'all' || p.category === activeCat;
    if (!byCat) return false;
    if (!query) return true;
    return `${p.name} ${p.brand} ${p.desc} ${catName(p.category)}`.toLowerCase().includes(query);
  }

  function paint() {
    const list = PRODUCTS.filter(matches);

    /* brief skeleton shimmer so long grids feel alive on filter change */
    grid.innerHTML = list.length
      ? list.map(productCard).join('')
      : `<div class="empty">
           ${ICONS.search}
           <h3>Aucun produit trouvé</h3>
           <p>Essayez un autre mot-clé ou changez de catégorie.</p>
           <button class="btn btn--ghost" type="button" data-shop-reset>Réinitialiser les filtres</button>
         </div>`;

    if (countEl) countEl.textContent = list.length;
    if (totalEl) totalEl.textContent = fmtPrice(list.reduce((n, p) => n + p.price, 0));

    initReveal();

    /* clear-all from the empty state */
    $('[data-shop-reset]', grid)?.addEventListener('click', () => {
      activeCat = 'all';
      query = '';
      if (searchInput) searchInput.value = '';
      clearBtn?.classList.remove('is-on');
      $$('.chip', chipHost).forEach((c) => c.classList.toggle('is-active', c.dataset.cat === 'all'));
      paint();
    });
  }

  paint();
}

const catName = (id) => CATEGORIES.find((c) => c.id === id)?.name || '';

/* --- Services ---------------------------------------------------- */
/** Compact treatment rows for the homepage */
function renderServicesMini() {
  const host = $('[data-services-mini]');
  if (!host) return;

  host.innerHTML = SERVICES.map(
    (s) => `
      <article class="svc-mini" data-reveal>
        <span class="svc-mini__ico">${imgTag(s.image, s.name)}</span>
        <div class="svc-mini__body">
          <h3>${esc(s.name)}</h3>
          <div class="svc-mini__meta">
            <small>${esc(s.tagline)}</small>
            <small>·</small>
            <small>${esc(s.duration)}</small>
          </div>
        </div>
        <span class="svc-mini__price">${fmtPrice(s.price)} DH</span>
        <a class="svc-mini__book" href="${bookingLink(s)}" target="_blank" rel="noopener"
           aria-label="Réserver ${esc(s.name)} via WhatsApp" title="Réserver via WhatsApp">${waSvg()}</a>
      </article>`
  ).join('');

  initReveal();
}

/** Full treatment menu — grid cards (home) or wide editorial rows (services page) */
function renderServicesFull(hostSel) {
  const host = $(hostSel);
  if (!host) return;

  host.innerHTML = SERVICES.map(
    (s, i) => `
      <article class="svc-card" data-reveal>
        <span class="svc-card__idx" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <div class="svc-card__media">
          ${imgTag(s.image, s.name)}
          <span class="svc-card__chip">${ICONS.clock}<span>${esc(s.duration)}</span></span>
        </div>
        <div>
          <p class="svc-card__tag">${esc(s.tagline)}</p>
          <h3>${esc(s.name)}</h3>
          <p class="svc-card__desc">${s.desc}</p>
          <ul class="svc-card__feats">
            ${s.features.map((f) => `<li>${ICONS.check}<span>${esc(f)}</span></li>`).join('')}
          </ul>
          <div class="svc-card__foot">
            <span class="svc-card__price">${fmtPrice(s.price)} <small>DH</small></span>
            <a class="btn btn--wa" href="${bookingLink(s)}" target="_blank" rel="noopener">
              ${waSvg()}<span>Book via WhatsApp</span>
            </a>
          </div>
        </div>
      </article>`
  ).join('');

  initReveal();
}

/** Quick "price menu" rows (services.html overview) */
function renderPriceList() {
  const host = $('[data-price-list]');
  if (!host) return;

  host.innerHTML = SERVICES.map(
    (s) => `
      <div class="price-row" data-reveal>
        <span class="price-row__name">${esc(s.name)}<small>${esc(s.tagline)} · ${esc(s.duration)}</small></span>
        <span class="price-row__price">${fmtPrice(s.price)} DH</span>
        <a class="price-row__btn" href="${bookingLink(s)}" target="_blank" rel="noopener"
           aria-label="Réserver ${esc(s.name)}" title="Réserver via WhatsApp">${waSvg()}</a>
      </div>`
  ).join('');

  initReveal();
}

/* ============================================================
   7. ADD TO CART — instant feedback + bounce + toast
   ============================================================ */
function initAddToCart() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if (!btn) return;

    const product = Cart.add(btn.dataset.add);
    if (!product) return;

    /* swap the icon and pop the button */
    const icon = btn.querySelector('svg');
    if (icon) icon.outerHTML = ICONS.cartCheck;
    btn.classList.add('is-added');
    setTimeout(() => {
      btn.classList.remove('is-added');
      if (btn.querySelector('svg')) btn.querySelector('svg').outerHTML = ICONS.cartPlus;
    }, 1300);

    /* bounce the navbar cart icon */
    const opener = $('[data-cart-open]');
    if (opener) {
      opener.classList.remove('is-bouncing');
      void opener.offsetWidth; /* restart the animation */
      opener.classList.add('is-bouncing');
    }

    toast(`${product.name} ajouté au panier`);
  });

  /* pulse the badge whenever the cart changes (also covers the cart panel) */
  document.addEventListener('cart:change', (e) => {
    $$('[data-cart-count]').forEach((b) => {
      b.classList.remove('is-pulse');
      void b.offsetWidth;
      if (e.detail.count > 0) b.classList.add('is-pulse');
    });
  });
}

/* ============================================================
   8. BACK TO TOP
   ============================================================ */
function initToTop() {
  const btn = $('[data-to-top]');
  if (!btn) return;
  const onScroll = () => btn.classList.toggle('is-on', window.scrollY > 700);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' }));
}

/* ============================================================
   9. OPENING HOURS — highlight today + "open now" pill
   ============================================================ */
function initHours() {
  const list = $('[data-hours]');
  if (!list) return;

  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const todayName = days[new Date().getDay()];

  list.innerHTML = STORE.hours
    .map((h) => {
      const isToday = h.day.includes(todayName);
      return `<div class="hours__row ${isToday ? 'is-today' : ''}">
                <span>${esc(h.day)}</span><strong>${esc(h.time)}</strong>
              </div>`;
    })
    .join('');

  /* open / closed right now (store hours are simple ranges) */
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const toMins = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  const slot = STORE.hours.find((h) => h.day.includes(todayName));
  const isOpen = slot ? mins >= toMins(slot.time.split(' — ')[0]) && mins <= toMins(slot.time.split(' — ')[1]) : false;

  const pill = $('[data-hours-now]');
  if (pill) {
    pill.innerHTML = `<i></i><span>${
      isOpen
        ? `Ouvert maintenant · jusqu'à ${slot.time.split(' — ')[1]}`
        : 'Fermé · commande en ligne 24h/24 sur WhatsApp'
    }</span>`;
  }
}

/* ============================================================
   10. CONTACT FORM — client-side only, finishes on WhatsApp
   ============================================================ */
function initContactForm() {
  const form = $('[data-contact-form]');
  if (!form) return;

  const success = $('[data-form-success]');
  const rules = {
    name: (v) => (v.trim().length >= 2 ? '' : 'Merci d’indiquer votre nom.'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Adresse e-mail invalide.'),
    phone: (v) => (/^[\d\s+()-]{9,}$/.test(v.trim()) ? '' : 'Numéro de téléphone invalide.'),
    message: (v) => (v.trim().length >= 8 ? '' : 'Votre message est un peu court.'),
  };

  function validateField(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const err = rule(input.value);
    input.closest('.field')?.classList.toggle('field--error', !!err);
    const slot = input.closest('.field')?.querySelector('.field__err');
    if (slot) slot.textContent = err;
    return !err;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = $$('input, textarea, select', form).filter((el) => rules[el.name]);
    const ok = inputs.map(validateField).every(Boolean);

    if (!ok) {
      form.querySelector('.field--error input, .field--error textarea')?.focus();
      toast('Merci de corriger les champs en rouge');
      return;
    }

    const get = (n) => form.elements[n]?.value.trim() || '';
    const subject = get('subject');

    /* No backend by design — the message is composed and sent through WhatsApp,
       which is how this store actually receives orders. */
    const lines = [
      `Bonjour ${STORE.name} 👋`,
      '',
      `Nom : ${get('name')}`,
      `Téléphone : ${get('phone')}`,
      `E-mail : ${get('email')}`,
      subject ? `Sujet : ${subject}` : '',
      '',
      get('message'),
      '',
      '— Envoyé depuis le formulaire du site web.',
    ].filter(Boolean);

    const link = waLink(lines.join('\n'));

    if (success) {
      success.hidden = false;
      $('[data-form-success-link]', success).href = link;
      success.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
    }
    window.open(link, '_blank', 'noopener');
    form.reset();
    toast('Message envoyé via WhatsApp');
  });

  /* live-clear the error state */
  form.addEventListener('input', (e) => {
    const input = e.target;
    if (input.closest('.field')?.classList.contains('field--error')) validateField(input);
  });
}

/* ============================================================
   11. MISC — newsletter stub, year stamp, external links
   ============================================================ */
function initMisc() {
  /* newsletter: no backend, so acknowledge inline */
  $$('[data-news-form]').forEach((form) =>
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (!input.value.trim()) return;
      toast('Merci ! Vous recevrez nos offres sur WhatsApp.');
      form.reset();
    })
  );

  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  /* pre-fill WhatsApp links that only need a default message */
  $$('[data-wa-generic]').forEach((a) =>
    a.setAttribute(
      'href',
      waLink(`Bonjour ${STORE.name} 👋\nJ'aimerais avoir des informations sur vos produits et soins.`)
    )
  );
}

/* ============================================================
   12. BOOT
   ============================================================ */
function boot() {
  initNav();
  initHero();
  initTicker();
  renderCategories();
  renderBrands();
  renderFeatured();
  renderServicesMini();
  renderServicesFull('[data-services-grid]');
  renderServicesFull('[data-services-list]');
  renderPriceList();
  renderShop();
  initAddToCart();
  initReveal();
  initToTop();
  initHours();
  initContactForm();
  initMisc();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();