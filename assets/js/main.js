/**
 * AGROPETINA - Modern Agricultural Platform Logic
 * Core JS: Catalog Filtering, Real-time Search, Quote Calculator, Theme Toggle, Modal & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProductCatalog();
  initQuotationBuilder();
  initStatsCounter();
  initFaqAccordion();
  initContactForm();
});

/* ==========================================================================
   THEME TOGGLER (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('agropetina_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('agropetina_theme', nextTheme);
      showToast(nextTheme === 'dark' ? '🌙 Modo Oscuro activado' : '☀️ Modo Claro activado');
    });
  }
}

/* ==========================================================================
   NAVIGATION & SCROLL EFFECTS
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navWrapper = document.querySelector('.nav-wrapper');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy for active link
    const scrollPos = window.scrollY + 120;
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navWrapper.classList.toggle('mobile-open');
    });
  }

  // Close mobile menu on click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navWrapper.classList.remove('mobile-open');
    });
  });
}

/* ==========================================================================
   PRODUCT CATALOG DATA & INTERACTIONS
   ========================================================================== */
/* ==========================================================================
   PRODUCT CATALOG DATA & INTERACTIONS
   ========================================================================== */
const PRODUCTS_DATA = [
  {
    id: 'ajo-morado-isabella',
    name: 'Ajo Morado Isabella (Purple Spring)',
    category: 'ajos',
    categoryName: 'Ajos Especiales',
    badge: 'Variedad Más Valiosa',
    badgeType: 'garlic',
    image: 'assets/images/ajo-morado-10.jpg',
    description: 'Nuestra variedad estrella. Bulbos firmes con estrías púrpuras vivas, gran aroma y el sabor más intenso y demandado en el mercado internacional.',
    calibers: 'Calibre 4 (45-50mm) a 7 (65mm+)',
    packaging: 'Cajas de cartón 10kg, 13.6kg (30 lbs) o mallas 250g - 1kg',
    shelfLife: '8 a 10 meses',
    harvestTime: 'Noviembre - Enero (Hemisferio Sur)',
    specs: {
      origin: 'Valle de Uco, Mendoza - Agropettina / BioCuyo',
      variety: 'Isabella Purple Spring Garlic',
      moisture: 'Curado natural en secadero ventilado < 65%',
      storageTemp: '-1°C a 2°C con ventilación continua',
      certifications: 'Semilla libre de virus (Lab Río Negro), GlobalGAP, SENASA'
    }
  },
  {
    id: 'ajo-blanco-export',
    name: 'Ajo Blanco Premium (White Garlic)',
    category: 'ajos',
    categoryName: 'Ajos Especiales',
    badge: 'Gran Conservación',
    badgeType: 'green',
    image: 'assets/images/ajo-blanco-10.jpg',
    description: 'Producto rústico, carnoso y altamente resistente. Posee una extraordinaria capacidad de conservación postcosecha para envíos marítimos de ultramar.',
    calibers: 'Calibre 5 (50-55mm) a 7 (65mm+)',
    packaging: 'Cajas de 10kg, sacos de 20kg o cajas de 30 lbs',
    shelfLife: '9 a 11 meses',
    harvestTime: 'Diciembre - Febrero',
    specs: {
      origin: 'Campos Propios Agropettina, Mendoza',
      variety: 'Ajo Blanco Tipo Chino / Criollo Blanco',
      moisture: 'Secado y curado tradicional al sol y cámara',
      storageTemp: '-1.5°C a 1.5°C',
      certifications: 'Laboratorio de Sanidad Río Negro, Trazabilidad QR'
    }
  },
  {
    id: 'ajo-colorado-italo-2015',
    name: 'Ajo Colorado Italo 2015 (Red Garlic)',
    category: 'ajos',
    categoryName: 'Ajos Especiales',
    badge: 'Variedad de Autor',
    badgeType: 'garlic',
    image: 'assets/images/ajo-colorado-10.jpg',
    description: 'Bautizado en honor a uno de nuestros hijos. Tallo duro y piel rojiza vibrante. Es el más picante, aromático y de carácter fuerte en el paladar.',
    calibers: 'Calibre 4 a 6 (Mediano compacto)',
    packaging: 'Cajas de 10kg y 5kg seleccionadas a mano',
    shelfLife: '7 a 9 meses',
    harvestTime: 'Enero - Febrero (Variedad tardía)',
    specs: {
      origin: 'Fincas Agropettina, Valle de Uco, Mendoza',
      variety: 'Italo 2015 Red Garlic (Tallo duro)',
      moisture: 'Curado lento y controlado',
      storageTemp: '0°C a 2°C',
      certifications: 'Semilla certificada 100% libre de patógenos'
    }
  },
  {
    id: 'ajo-dientes-pelados',
    name: 'Dientes de Ajo Frescos al Vacío',
    category: 'ajos',
    categoryName: 'Ajos Especiales',
    badge: 'Listo para Industria / Horeca',
    badgeType: 'gold',
    image: 'assets/images/garlic-cloves.jpg',
    description: 'Dientes de ajo 100% naturales, limpios y desgranados, sin aditivos ni conservantes. Envasados en atmósfera modificada para el canal gastronómico.',
    calibers: 'Selección Grano Grande',
    packaging: 'Bolsas termoselladas 1kg, 2.5kg y 5kg',
    shelfLife: '45 a 60 días refrigerado',
    harvestTime: 'Disponible todo el año',
    specs: {
      origin: 'Planta de Procesado y Empaque Agropettina',
      variety: 'Ajo Morado & Blanco Cuyano',
      moisture: 'Humedad controlada 75%',
      storageTemp: '2°C a 4°C',
      certifications: 'HACCP, BPA, Inocuidad Alimentaria SENASA'
    }
  },
  {
    id: 'cebollas-campo-cuyo',
    name: 'Cebolla Amarilla y Morada Seleccionada',
    category: 'cebollas',
    categoryName: 'Cebollas',
    badge: 'Cosecha de Campo',
    badgeType: 'gold',
    image: 'assets/images/onions.jpg',
    description: 'Cultivo complementario en rotación de suelo. Bulbos uniformes, túnicas secas y alta consistencia para consumo en fresco y distribución mayorista.',
    calibers: 'Calibre 60-80mm y 80-100mm',
    packaging: 'Mallas 10kg, 25kg o Big Bags 1.000kg',
    shelfLife: '6 a 8 meses',
    harvestTime: 'Enero - Abril',
    specs: {
      origin: 'Valles Agrícolas de Mendoza y San Juan',
      variety: 'Grano Español / Morada Cuyana',
      moisture: 'Curado natural en era',
      storageTemp: '0°C a 2°C',
      certifications: 'BPA (Buenas Prácticas Agrícolas)'
    }
  },
  {
    id: 'zanahoria-hortalizas-huerta',
    name: 'Zanahorias Dulces y Verduras Frescas',
    category: 'zanahorias',
    categoryName: 'Zanahorias',
    badge: 'Frescura de Huerta',
    badgeType: 'green',
    image: 'assets/images/carrots-vegetables.jpg',
    description: 'Zanahorias de suelos arenosos, crujientes, con alto contenido de carotenos y azúcares naturales, junto a verduras frescas de estación.',
    calibers: 'Calibre Comercial Seleccionado',
    packaging: 'Manojos frescos o bolsas macroperforadas 5kg - 10kg',
    shelfLife: '20 a 30 días en frío',
    harvestTime: 'Producción escalonada',
    specs: {
      origin: 'Campos con riego por goteo Agropettina',
      variety: 'Nantesa y variedades hortícolas',
      moisture: 'Hidroenfriado rápido al cosechar',
      storageTemp: '1°C a 4°C',
      certifications: 'BPA, Cultivo Sostenible'
    }
  }
];

let activeCategory = 'todos';
let searchQuery = '';

function initProductCatalog() {
  renderCatalog();

  // Category filter clicks
  const catPills = document.querySelectorAll('.cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      renderCatalog();
    });
  });

  // Search input real-time listener
  const searchInput = document.getElementById('catalogSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderCatalog();
    });
  }

  // Modal close handlers
  const modalOverlay = document.getElementById('productDetailModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  if (modalOverlay && modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
      }
    });
  }
}

function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;

  const filtered = PRODUCTS_DATA.filter(prod => {
    const matchesCat = activeCategory === 'todos' || prod.category === activeCategory;
    const matchesSearch = !searchQuery || 
      prod.name.toLowerCase().includes(searchQuery) ||
      prod.description.toLowerCase().includes(searchQuery) ||
      prod.calibers.toLowerCase().includes(searchQuery) ||
      prod.packaging.toLowerCase().includes(searchQuery);

    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="catalog-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3>No encontramos productos que coincidan</h3>
        <p>Intenta con otros términos como "ajo morado", "cebolla", "zanahoria" o limpia el filtro de categoría.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(prod => {
    const badgeClass = prod.badgeType === 'garlic' ? 'badge-garlic' :
                       prod.badgeType === 'gold' ? 'badge-gold' :
                       prod.badgeType === 'orange' ? 'badge-gold' : 'badge-green';

    return `
      <article class="product-card" data-id="${prod.id}">
        <div class="product-image-container">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy">
          <div class="product-badge-overlay">
            <span class="badge ${badgeClass}">${prod.badge}</span>
          </div>
          <div class="product-calibers-tag">${prod.calibers}</div>
        </div>
        <div class="product-info">
          <div class="product-category-meta">${prod.categoryName}</div>
          <h3 class="product-title">${prod.name}</h3>
          <p class="product-desc">${prod.description}</p>
          
          <div class="product-specs-pills">
            <span class="spec-chip">📦 ${prod.packaging.split(',')[0]}</span>
            <span class="spec-chip">⏳ Vida útil: ${prod.shelfLife}</span>
          </div>

          <div class="product-actions">
            <button class="btn btn-secondary btn-sm btn-detail" onclick="openProductModal('${prod.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Ficha Técnica
            </button>
            <button class="btn-add-quote" title="Añadir a Cotización" onclick="addProductToQuote('${prod.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Product Technical Sheet Modal
window.openProductModal = function(productId) {
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  const modal = document.getElementById('productDetailModal');
  const modalImg = document.getElementById('modalProductImg');
  const modalTitle = document.getElementById('modalProductTitle');
  const modalCat = document.getElementById('modalProductCategory');
  const modalDesc = document.getElementById('modalProductDesc');
  const modalSpecsList = document.getElementById('modalSpecsList');
  const modalAddBtn = document.getElementById('modalAddQuoteBtn');

  if (modalImg) modalImg.src = prod.image;
  if (modalTitle) modalTitle.textContent = prod.name;
  if (modalCat) modalCat.textContent = prod.categoryName;
  if (modalDesc) modalDesc.textContent = prod.description;

  if (modalSpecsList) {
    modalSpecsList.innerHTML = `
      <tr><td>Variedad botánica:</td><td>${prod.specs.variety}</td></tr>
      <tr><td>Origen y cultivo:</td><td>${prod.specs.origin}</td></tr>
      <tr><td>Calibres disponibles:</td><td>${prod.calibers}</td></tr>
      <tr><td>Formatos de empaque:</td><td>${prod.packaging}</td></tr>
      <tr><td>Época de cosecha:</td><td>${prod.harvestTime}</td></tr>
      <tr><td>Vida útil estimada:</td><td>${prod.shelfLife}</td></tr>
      <tr><td>Temperatura conservación:</td><td>${prod.specs.storageTemp}</td></tr>
      <tr><td>Certificaciones de inocuidad:</td><td>${prod.specs.certifications}</td></tr>
    `;
  }

  if (modalAddBtn) {
    modalAddBtn.onclick = () => {
      addProductToQuote(prod.id);
      modal.classList.remove('active');
    };
  }

  modal.classList.add('active');
};

/* ==========================================================================
   INTERACTIVE QUOTE CALCULATOR / ORDER BUILDER
   ========================================================================== */
let quoteCart = [
  { productId: 'ajo-morado-isabella', quantity: '5', unit: 'Toneladas' },
  { productId: 'cebollas-campo-cuyo', quantity: '3', unit: 'Toneladas' }
];

function initQuotationBuilder() {
  renderQuoteCart();

  const addSelector = document.getElementById('quoteProductSelect');
  const addQtyInput = document.getElementById('quoteQtyInput');
  const addUnitSelect = document.getElementById('quoteUnitSelect');
  const addItemBtn = document.getElementById('quoteAddItemBtn');

  // Populate product dropdown in quote builder
  if (addSelector) {
    addSelector.innerHTML = PRODUCTS_DATA.map(p => `
      <option value="${p.id}">${p.name}</option>
    `).join('');
  }

  if (addItemBtn && addSelector && addQtyInput) {
    addItemBtn.addEventListener('click', () => {
      const pId = addSelector.value;
      const qty = parseFloat(addQtyInput.value);
      const unit = addUnitSelect ? addUnitSelect.value : 'Toneladas';

      if (!qty || qty <= 0) {
        showToast('⚠️ Ingresa una cantidad válida mayor a 0');
        return;
      }

      const existing = quoteCart.find(item => item.productId === pId && item.unit === unit);
      if (existing) {
        existing.quantity = (parseFloat(existing.quantity) + qty).toString();
      } else {
        quoteCart.push({ productId: pId, quantity: qty.toString(), unit });
      }

      renderQuoteCart();
      showToast('✅ Producto añadido al presupuesto');
    });
  }

  // WhatsApp Send Button
  const sendWhatsAppBtn = document.getElementById('quoteSendWhatsAppBtn');
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', handleWhatsAppQuote);
  }

  // Copy Quote Button
  const copyQuoteBtn = document.getElementById('quoteCopyBtn');
  if (copyQuoteBtn) {
    copyQuoteBtn.addEventListener('click', handleCopyQuote);
  }
}

window.addProductToQuote = function(productId) {
  const existing = quoteCart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity = (parseFloat(existing.quantity) + 1).toString();
  } else {
    quoteCart.push({ productId, quantity: '1', unit: 'Toneladas' });
  }
  renderQuoteCart();
  showToast('🧺 Producto añadido al cotizador');
  
  // Optional smooth scroll to quotation if requested
  const quoteSection = document.getElementById('cotizador');
  if (quoteSection && window.innerWidth < 768) {
    quoteSection.scrollIntoView({ behavior: 'smooth' });
  }
};

window.removeQuoteItem = function(index) {
  quoteCart.splice(index, 1);
  renderQuoteCart();
  showToast('🗑️ Producto eliminado de la cotización');
};

function renderQuoteCart() {
  const container = document.getElementById('quoteItemsList');
  const countBadge = document.getElementById('quoteItemsCount');
  if (!container) return;

  if (countBadge) {
    countBadge.textContent = `${quoteCart.length} producto${quoteCart.length === 1 ? '' : 's'}`;
  }

  if (quoteCart.length === 0) {
    container.innerHTML = `
      <div class="quote-empty-msg">
        <p>No tienes productos en tu cotización aún.</p>
        <span style="font-size: 0.8rem; opacity: 0.8;">Selecciona productos desde el catálogo o utiliza el formulario de arriba.</span>
      </div>
    `;
    return;
  }

  container.innerHTML = quoteCart.map((item, idx) => {
    const prod = PRODUCTS_DATA.find(p => p.id === item.productId) || { name: 'Producto' };
    return `
      <div class="quote-item-row">
        <div>
          <div class="quote-item-title">${prod.name}</div>
          <div class="quote-item-qty">Cantidad: <strong>${item.quantity} ${item.unit}</strong></div>
        </div>
        <button class="quote-item-remove" onclick="removeQuoteItem(${idx})" title="Eliminar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `;
  }).join('');
}

function generateQuoteSummaryText() {
  const clientName = document.getElementById('quoteClientName')?.value || 'Cliente Mayorista / Distribuidor';
  const destination = document.getElementById('quoteDestination')?.value || 'Por definir';
  const notes = document.getElementById('quoteNotes')?.value || 'Sin observaciones adicionales';

  let text = `*SOLICITUD DE COTIZACIÓN - AGROPETTINA S.A.S.*\n`;
  text += `👤 *Cliente:* ${clientName}\n`;
  text += `📍 *Destino / Puerto de entrega:* ${destination}\n\n`;
  text += `📦 *PRODUCTOS SOLICITADOS:*\n`;

  if (quoteCart.length === 0) {
    text += `(Ningún producto seleccionado en la lista interactiva)\n`;
  } else {
    quoteCart.forEach((item, i) => {
      const prod = PRODUCTS_DATA.find(p => p.id === item.productId);
      text += `${i + 1}. ${prod ? prod.name : 'Producto'}: ${item.quantity} ${item.unit} (${prod ? prod.calibers : ''})\n`;
    });
  }

  text += `\n📝 *Notas:* ${notes}\n`;
  text += `🌐 Solicitud enviada a través de la web oficial de Agropettina (Valle de Uco, Mendoza).`;

  return text;
}

function handleWhatsAppQuote() {
  if (quoteCart.length === 0) {
    showToast('⚠️ Agrega al menos un producto para cotizar');
    return;
  }
  const message = generateQuoteSummaryText();
  // WhatsApp company phone (Mendoza, Argentina)
  const phone = "5492610000000"; // Reemplazable por el número de ventas de Agropettina
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function handleCopyQuote() {
  if (quoteCart.length === 0) {
    showToast('⚠️ La lista de cotización está vacía');
    return;
  }
  const message = generateQuoteSummaryText();
  navigator.clipboard.writeText(message).then(() => {
    showToast('📋 ¡Cotización copiada al portapapeles!');
  }).catch(() => {
    showToast('⚠️ No se pudo copiar automáticamente');
  });
}

/* ==========================================================================
   ANIMATED STATS COUNTER
   ========================================================================== */
function initStatsCounter() {
  const statsElements = document.querySelectorAll('.stat-number[data-target]');
  if (!statsElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        animateCounter(el, target);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statsElements.forEach(el => observer.observe(el));
}

function animateCounter(el, target) {
  let start = 0;
  const duration = 1800;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out expo
    const easeOut = 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(easeOut * target);
    
    el.childNodes[0].textContent = current.toLocaleString('es-ES');

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.childNodes[0].textContent = target.toLocaleString('es-ES');
    }
  }

  requestAnimationFrame(updateCount);
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg> Enviando mensaje...
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.reset();
        showToast('🎉 ¡Gracias por contactarnos! Un asesor agrícola se comunicará en breve.');
      }, 1200);
    });
  }
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
