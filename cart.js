/* ============================================================
   MB MEDICAL — CART
   ------------------------------------------------------------
   Vanilla-JS shopping cart:
     • persists in localStorage (survives page navigation)
     • renders into a bottom-sheet (mobile) / sidebar (desktop)
     • builds a formatted order message and hands off to WhatsApp
   Loaded on every page. Depends on data.js (loaded first).
   ============================================================ */

/* ---------- Shared helpers (also used by script.js) ---------- */

/** Format a number as Moroccan-style price: 1250 → "1 250" */
function fmtPrice(n) {
  return new Intl.NumberFormat('fr-MA', { maximumFractionDigits: 0 }).format(
    Math.round(Number(n) || 0)
  );
}

/** Build a wa.me deep link with an encoded message */
function waLink(message) {
  const number = (typeof STORE !== 'undefined' && STORE.whatsapp) || '212616531299';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Inline WhatsApp SVG (single source for every icon in the project) */
function waSvg() {
  return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.01-1.04 2.47 1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z"/><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23z"/></svg>`;
}

/* ---------- Cart module ---------- */
const Cart = (function () {
  const KEY = 'mbmedical.cart.v1';
  const MAX_QTY = 99;

  /** @type {{id:string,name:string,brand:string,price:number,image:string,qty:number}[]} */
  let items = load();
  let lastFocus = null;

  /* ------------------------------------------------ persistence */
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      // Drop anything malformed or whose product no longer exists in data.js
      return parsed
        .filter((it) => it && typeof it.id === 'string' && typeof it.qty === 'number')
        .map((it) => {
          const p = (typeof PRODUCTS !== 'undefined' && PRODUCTS.find((x) => x.id === it.id)) || null;
          return p
            ? { id: p.id, name: p.name, brand: p.brand, price: p.price, image: p.image, qty: clampQty(it.qty) }
            : null;
        })
        .filter(Boolean);
    } catch (e) {
      console.warn('[cart] could not read saved cart', e);
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('[cart] could not save cart', e);
    }
  }

  function clampQty(n) {
    n = Math.floor(Number(n) || 0);
    return Math.min(MAX_QTY, Math.max(1, n));
  }

  /* ------------------------------------------------ queries */
  const count = () => items.reduce((n, it) => n + it.qty, 0);
  const total = () => items.reduce((n, it) => n + it.qty * it.price, 0);

  /* ------------------------------------------------ mutations */
  function add(id, qty) {
    const p = (typeof PRODUCTS !== 'undefined' && PRODUCTS.find((x) => x.id === id)) || null;
    if (!p) return null;
    qty = qty ? clampQty(qty) : 1;

    const line = items.find((it) => it.id === id);
    if (line) line.qty = clampQty(line.qty + qty);
    else items.push({ id: p.id, name: p.name, brand: p.brand, price: p.price, image: p.image, qty });

    commit();
    return p;
  }

  function setQty(id, qty) {
    const line = items.find((it) => it.id === id);
    if (!line) return;
    qty = clampQty(qty);
    if (qty <= 0) return remove(id);
    line.qty = qty;
    commit();
  }

  function bump(id, delta) {
    const line = items.find((it) => it.id === id);
    if (!line) return;
    setQty(id, line.qty + delta);
  }

  function remove(id) {
    const idx = items.findIndex((it) => it.id === id);
    if (idx === -1) return;
    const row = document.querySelector(`.ci[data-id="${CSS.escape(id)}"]`);
    const done = () => {
      items.splice(idx, 1);
      commit();
    };
    // Animate the row out before it disappears
    if (row && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      row.classList.add('is-removing');
      setTimeout(done, 260);
    } else {
      done();
    }
  }

  function clear() {
    items = [];
    commit();
  }

  /** Persist + repaint badges + notify listeners */
  function commit() {
    save();
    render();
    document.dispatchEvent(new CustomEvent('cart:change', { detail: { count: count(), total: total() } }));
  }

  /* ------------------------------------------------ markup */
  function shell() {
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.dataset.cartClose = '';

    const panel = document.createElement('aside');
    panel.className = 'cart';
    panel.id = 'cartPanel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Votre panier');
    panel.innerHTML = `
      <span class="cart__handle" aria-hidden="true"></span>
      <header class="cart__head">
        <h2>Votre panier<small data-cart-title-count>0 article</small></h2>
        <button class="cart__close" type="button" data-cart-close aria-label="Fermer le panier">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </header>
      <div class="cart__body" data-cart-body></div>
      <footer class="cart__foot" data-cart-foot hidden>
        <div class="cart__ship" data-cart-ship></div>
        <div class="cart__line"><span>Sous-total</span><strong data-cart-subtotal>0 DH</strong></div>
        <div class="cart__line"><span>Livraison</span><strong>Calculée à la confirmation</strong></div>
        <div class="cart__total">
          <span>Total</span>
          <strong><span data-cart-total>0</span> <small>DH</small></strong>
        </div>
        <a class="btn btn--wa btn--block btn--lg" data-cart-checkout href="#">
          ${waSvg()}
          <span>Commander via WhatsApp</span>
        </a>
        <p class="cart__note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          Paiement à la livraison · Livraison partout au Maroc
        </p>
      </footer>
    `;
    overlay.setAttribute('aria-hidden', 'true');
    document.body.append(overlay, panel);
    return { overlay, panel };
  }

  /* ------------------------------------------------ rendering */
  function render() {
    const body = document.querySelector('[data-cart-body]');
    const foot = document.querySelector('[data-cart-foot]');
    if (!body) return;

    const n = count();

    /* --- badges everywhere on the page --- */
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = n > 99 ? '99+' : String(n);
      el.classList.toggle('is-on', n > 0);
    });

    /* --- empty state --- */
    if (!items.length) {
      body.innerHTML = `
        <div class="cart__empty">
          <span class="ring">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </span>
          <h3>Votre panier est vide</h3>
          <p>Parcourez la boutique et ajoutez vos essentiels beauté &amp; bien-être.</p>
          <a class="btn btn--primary" href="shop.html" data-cart-close>Explorer la boutique</a>
        </div>`;
      if (foot) foot.hidden = true;
      const title = document.querySelector('[data-cart-title-count]');
      if (title) title.textContent = 'Aucun article';
      return;
    }

    /* --- line items --- */
    body.innerHTML = items
      .map(
        (it) => `
      <article class="ci" data-id="${it.id}">
        <img class="ci__img" src="${it.image}" alt="${escapeAttr(it.name)}" loading="lazy" width="74" height="74">
        <div class="ci__main">
          <span class="ci__brand">${escapeHtml(it.brand)}</span>
          <h3 class="ci__name">${escapeHtml(it.name)}</h3>
          <div class="ci__row">
            <div class="qty">
              <button type="button" data-qty="-1" aria-label="Retirer un exemplaire de ${escapeAttr(it.name)}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/></svg>
              </button>
              <output aria-label="Quantité">${it.qty}</output>
              <button type="button" data-qty="1" aria-label="Ajouter un exemplaire de ${escapeAttr(it.name)}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
            <span class="ci__price">${fmtPrice(it.qty * it.price)} <small style="font-family:var(--font-body);font-size:.66rem;color:var(--ink-45)">DH</small></span>
            <button class="ci__rm" type="button" data-remove aria-label="Supprimer ${escapeAttr(it.name)} du panier">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
            </button>
          </div>
        </div>
      </article>`
      )
      .join('');

    /* --- summary --- */
    if (foot) {
      foot.hidden = false;
      const title = document.querySelector('[data-cart-title-count]');
      if (title) title.textContent = n > 1 ? `${n} articles` : '1 article';

      const sub = document.querySelector('[data-cart-subtotal]');
      if (sub) sub.textContent = `${fmtPrice(total())} DH`;

      const tot = document.querySelector('[data-cart-total]');
      if (tot) tot.textContent = fmtPrice(total());

      const ship = document.querySelector('[data-cart-ship]');
      if (ship) {
        const FREE_AT = 500; // free-shipping hint threshold
        ship.textContent =
          total() >= FREE_AT
            ? '✓ Livraison offerte sur Ben Guerir et environs'
            : `Plus que ${fmtPrice(FREE_AT - total())} DH pour la livraison offerte`;
      }

      const checkout = document.querySelector('[data-cart-checkout]');
      if (checkout) checkout.href = checkoutLink();
    }
  }

  /* ------------------------------------------------ WhatsApp handoff */
  function orderMessage() {
    const lines = items.map((it) => `- ${it.name} (x${it.qty}) — ${fmtPrice(it.qty * it.price)} DH`);
    return [
      `Bonjour ${STORE.name} 👋`,
      `Je souhaite commander :`,
      '',
      ...lines,
      '',
      `Total : ${fmtPrice(total())} DH`,
      '',
      'Envoyé depuis le site web MB Medical.',
    ].join('\n');
  }

  function checkoutLink() {
    return waLink(orderMessage());
  }

  /* ------------------------------------------------ open / close */
  let nodes = null;

  function ensureShell() {
    if (!nodes) nodes = shell();
    return nodes;
  }

  function open() {
    const { overlay, panel } = ensureShell();
    lastFocus = document.activeElement;
    render();
    overlay.classList.add('is-open');
    panel.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    setTimeout(() => panel.querySelector('[data-cart-close]')?.focus({ preventScroll: true }), 260);
  }

  function close() {
    if (!nodes) return;
    nodes.overlay.classList.remove('is-open');
    nodes.panel.classList.remove('is-open');
    nodes.overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  const isOpen = () => !!nodes && nodes.panel.classList.contains('is-open');

  function toggle() {
    isOpen() ? close() : open();
  }

  /* ------------------------------------------------ events */
  function bind() {
    /* openers */
    document.addEventListener('click', (e) => {
      const opener = e.target.closest('[data-cart-open]');
      if (opener) {
        e.preventDefault();
        toggle();
        return;
      }

      /* closers: overlay, X, "Explorer la boutique" link */
      if (e.target.closest('[data-cart-close]')) {
        e.preventDefault();
        close();
        return;
      }

      /* in-cart controls (delegated, works after every re-render) */
      const row = e.target.closest('.ci');
      if (row) {
        const id = row.dataset.id;
        if (e.target.closest('[data-qty]')) {
          bump(id, Number(e.target.closest('[data-qty]').dataset.qty));
        } else if (e.target.closest('[data-remove]')) {
          remove(id);
        }
      }
    });

    /* keyboard */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        close();
        return;
      }
      /* focus trap while the cart is open */
      if (e.key === 'Tab' && isOpen()) {
        const focusables = nodes.panel.querySelectorAll(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    /* another tab changed the cart */
    window.addEventListener('storage', (e) => {
      if (e.key === KEY) {
        items = load();
        render();
      }
    });

    /* first paint */
    document.addEventListener('DOMContentLoaded', render);
    if (document.readyState !== 'loading') render();
  }

  /* ------------------------------------------------ escaping */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function escapeAttr(s) {
    return escapeHtml(s);
  }

  bind();

  /* public API */
  return { add, setQty, bump, remove, clear, count, total, items, open, close, toggle, isOpen, render, orderMessage, checkoutLink };
})();

/* Expose for script.js */
window.Cart = Cart;
window.fmtPrice = fmtPrice;
window.waLink = waLink;
window.waSvg = waSvg;