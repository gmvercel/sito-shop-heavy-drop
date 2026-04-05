// ===== MOBILE MENU FUNCTIONS =====
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
}

// Chiudi il menu quando si ridimensiona la finestra
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Database prodotti
const products = [
    // UOMO
    {
        id: 1,
        name: "T-Shirt Uomo Classic",
        price: 29.99,
        emoji: "👕",
        category: "uomo",
        subcategory: "skinny",
        status: "available",
        description: "T-shirt nera premium con logo ricamato.",
        fullDescription: "T-shirt realizzata in cotone 100% di qualità superiore. Perfetta per lo stile urban.",
        specs: ["Cotone 100%", "Logo ricamato", "Disponibile in S-XXL", "Lavaggio 30°C"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        image: "👕",
        images: ["assets/mockup_fronte_maglietta.png", "assets/mockup_retro_maglietta.png"]
    },
    {
        id: 2,
        name: "Felpa Uomo Hoodie",
        price: 54.99,
        emoji: "🧥",
        category: "uomo",
        subcategory: "oversize",
        status: "limited",
        description: "Felpa con cappuccio premium oversize.",
        fullDescription: "Felpa premium con cappuccio, stampa ricamata fronte e retro.",
        specs: ["Cotone-Poliestere", "Cappuccio caldo", "Fit oversize", "Tasca doppia"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        image: "🧥"
    },
    {
        id: 3,
        name: "Pantaloni Uomo Baggy",
        price: 64.99,
        emoji: "👖",
        category: "uomo",
        subcategory: "baggy",
        status: "available",
        description: "Pantaloni baggy unisex stile urban.",
        fullDescription: "Pantaloni in cotone misto con fit baggy ampio e confortevole.",
        specs: ["Cotone-Poliestere", "Fit baggy", "Tasche laterali", "Cintura elastica"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        image: "👖"
    },
    // DONNA
    {
        id: 4,
        name: "T-Shirt Donna Crop",
        price: 24.99,
        emoji: "👚",
        category: "donna",
        subcategory: "skinny",
        status: "available",
        description: "Crop top femminile con fit slim.",
        fullDescription: "T-shirt donna in cotone con taglio crop e fit aderente.",
        specs: ["Cotone 100%", "Fit slim", "Taglio crop", "Stampa glitter"],
        sizes: ["XS", "S", "M", "L", "XL"],
        image: "👚"
    },
    {
        id: 5,
        name: "Giacca Donna Oversize",
        price: 79.99,
        emoji: "🧥",
        category: "donna",
        subcategory: "oversize",
        status: "limited",
        description: "Giacca oversize trendy e versatile.",
        fullDescription: "Giacca in tessuto premium con taglio ampio e confortevole.",
        specs: ["Poliestere", "Fit oversize", "Colletto classico", "Tasche interne"],
        sizes: ["XS", "S", "M", "L", "XL"],
        image: "🧥"
    },
    {
        id: 6,
        name: "Leggings Donna Skinny",
        price: 34.99,
        emoji: "👖",
        category: "donna",
        subcategory: "skinny",
        status: "available",
        description: "Leggings aderenti ad alta cintura.",
        fullDescription: "Leggings in tessuto elastico a vita alta con fit perfetto.",
        specs: ["Cotone-Elastan", "Vita alta", "Fit skinny", "Tasche nascoste"],
        sizes: ["XS", "S", "M", "L", "XL"],
        image: "👖"
    },
    // BAMBINO
    {
        id: 7,
        name: "T-Shirt Bambino Colorato",
        price: 19.99,
        emoji: "👕",
        category: "bambino",
        subcategory: "oversize",
        status: "available",
        description: "T-shirt bimbo con stampe divertenti.",
        fullDescription: "T-shirt in cotone con stampe a colori per i più piccoli.",
        specs: ["Cotone 100%", "Stampe sicure", "Size 2-14 anni", "Lavaggio delicato"],
        sizes: ["2Y", "4Y", "6Y", "8Y", "10Y", "12Y", "14Y"],
        image: "👕"
    },
    {
        id: 8,
        name: "Felpa Bambino",
        price: 39.99,
        emoji: "🧥",
        category: "bambino",
        subcategory: "baggy",
        status: "available",
        description: "Felpa confortevole per bimbi.",
        fullDescription: "Felpa in cotone morbido e confortevole per i bambini.",
        specs: ["Cotone morbido", "Tasca grande", "Cappuccio", "Caldo"],
        sizes: ["2Y", "4Y", "6Y", "8Y", "10Y", "12Y", "14Y"],
        image: "🧥"
    },
    // BAMBINA
    {
        id: 9,
        name: "T-Shirt Bambina Rosa",
        price: 17.99,
        emoji: "👚",
        category: "bambina",
        subcategory: "skinny",
        status: "available",
        description: "T-shirt bambina con stampa kawaii.",
        fullDescription: "T-shirt bimba con simpatici disegni e colori tenui.",
        specs: ["Cotone 100%", "Stampe kawaii", "Size 2-14 anni", "Morbida"],
        sizes: ["2Y", "4Y", "6Y", "8Y", "10Y", "12Y", "14Y"],
        image: "👚"
    },
    {
        id: 10,
        name: "Leggings Bambina",
        price: 24.99,
        emoji: "👖",
        category: "bambina",
        subcategory: "skinny",
        status: "available",
        description: "Leggings colorati per bimbe.",
        fullDescription: "Leggings elastici e confortevoli per le bambine.",
        specs: ["Cotone-Elastan", "Vita elastica", "Colori vivaci", "Comodi"],
        sizes: ["2Y", "4Y", "6Y", "8Y", "10Y", "12Y", "14Y"],
        image: "👖"
    },
    // SCARPE
    {
        id: 11,
        name: "Sneaker Uomo Nere",
        price: 99.99,
        emoji: "👟",
        category: "scarpe",
        subcategory: "casual",
        status: "limited",
        description: "Scarpe high-top nere eleganti.",
        fullDescription: "Sneaker high-top in materiale premium con suola spessa.",
        specs: ["Tessuto premium", "Suola spessa", "High-top", "Stile urban"],
        sizes: ["40", "41", "42", "43", "44", "45", "46"],
        image: "👟",
        images: ["assets/visione_lato_sinistro_scarpa.png", "assets/visione_lato_destro_scarpa.png", "assets/visione_posteriore_scarpa_Heavy_Drop.png", "assets/visione_superiore_scarpa_Heavy_Drop.png"]
    },
    {
        id: 13,
        name: "Scarpe Donna Rosa",
        price: 84.99,
        emoji: "👠",
        category: "scarpe",
        subcategory: "lifestyle",
        status: "available",
        description: "Scarpe da ginnastica rosa trendy.",
        fullDescription: "Scarpe donna in rosa con design moderno e comodo.",
        specs: ["Tela rosa", "Suola bianca", "Disponibile 35-41", "Lightweight"],
        sizes: ["35", "36", "37", "38", "39", "40", "41"],
        image: "👠"
    },
    // GADGET
    {
        id: 14,
        name: "Tazza Heavy Drop",
        price: 14.99,
        emoji: "☕",
        category: "gadget",
        subcategory: "personalizzato",
        status: "available",
        description: "Tazza in ceramica con stampa HD.",
        fullDescription: "Tazza in ceramica di qualità con stampa HD resistente.",
        specs: ["Ceramica", "Capacità 350ml", "Lavastoviglie sicuro", "Stampa HD"],
        sizes: ["Unica"],
        image: "☕"
    },
    {
        id: 15,
        name: "Mousepad Gaming",
        price: 24.99,
        emoji: "🖱️",
        category: "gadget",
        subcategory: "gaming",
        status: "available",
        description: "Mousepad con base antiscivolo extra large.",
        fullDescription: "Mousepad gaming professionale con superficie in tessuto.",
        specs: ["Tessuto premium", "Base antiscivolo", "30x80cm", "Bordi cuciti"],
        sizes: ["Unica"],
        image: "🖱️"
    },
    {
        id: 16,
        name: "Bottiglia Termica",
        price: 34.99,
        emoji: "🍾",
        category: "gadget",
        subcategory: "lifestyle",
        status: "available",
        description: "Bottiglia termica con isolamento doppio.",
        fullDescription: "Mantieni bevande calde/fredde per ore con isolamento premium.",
        specs: ["Acciaio inossidabile", "Isolamento doppio", "Capacità 500ml", "Tappo sicuro"],
        sizes: ["Unica"],
        image: "🍾",
        images: ["assets/Mockup_borraccia_frontale.png", "assets/Mockup_borraccia_retro.png"]
    },
    {
        id: 17,
        name: "Portachiavi Heavy Drop",
        price: 9.99,
        emoji: "🔑",
        category: "gadget",
        subcategory: "personalizzato",
        status: "sold",
        description: "Portachiavi in metallo con logo.",
        fullDescription: "Accessorio in metallo nichel-free e resistente.",
        specs: ["Metallo nichel-free", "Peso leggero", "Anello robusto", "Design compatto"],
        sizes: ["Unica"],
        image: "🔑",
        images: ["assets/mockup_porta_chiavi_fronte.png", "assets/mockup_porta_chiavi_retro.png"]
    },
    {
        id: 18,
        name: "Poster HD A3",
        price: 12.99,
        emoji: "🖼️",
        category: "gadget",
        subcategory: "decorazione",
        status: "available",
        description: "Poster A3 con stampa HD di qualità.",
        fullDescription: "Decora il tuo spazio con questo poster esclusivo.",
        specs: ["Carta premium 250g", "Stampa HD", "Dimensione A3", "Protetto"],
        sizes: ["Unica"],
        image: "🖼️"
    },
    {
        id: 19,
        name: "Zaino Heavy Drop",
        price: 79.99,
        emoji: "🎒",
        category: "gadget",
        subcategory: "lifestyle",
        status: "available",
        description: "Zaino stylish con design esclusivo Heavy Drop.",
        fullDescription: "Zaino premium con scompatti organizzati, schienale ergonomico e design moderno per lo stile urban.",
        specs: ["Materiale resistente", "Scompatti multipli", "Schienale ergonomico", "Disponibile S-L"],
        sizes: ["S", "M", "L"],
        image: "🎒",
        images: ["assets/mocku_fronte_zaino.png", "assets/Mockup_retro_zaino.png"]
    },
    {
        id: 20,
        name: "Cover iPhone Heavy Drop",
        price: 24.99,
        emoji: "📱",
        category: "gadget",
        subcategory: "personalizzato",
        status: "available",
        description: "Cover iPhone con design esclusivo Heavy Drop.",
        fullDescription: "Proteggi il tuo iPhone con stile con questa cover premium con design esclusivo Heavy Drop.",
        specs: ["Materiale TPU resistente", "Design esclusivo", "Compatibile iPhone 12-14", "Protezione morbida"],
        sizes: ["Unica"],
        image: "📱",
        images: ["assets/Mockup_cover_iphone.png"]
    },
    {
        id: 21,
        name: "Short Femminili Urban",
        price: 44.99,
        emoji: "🩳",
        category: "donna",
        subcategory: "shorts",
        status: "available",
        description: "Short femminili comodi e eleganti per l'estate.",
        fullDescription: "Short in cotone misto con design moderno, perfetti per l'estate e lo stile casual urban.",
        specs: ["Cotone-Poliestere", "Fit comodo", "Tasche laterali", "Vita elastica"],
        sizes: ["XS", "S", "M", "L", "XL"],
        image: "🩳",
        images: ["assets/mockup_short_femminili_fronte.png", "assets/mockup_short_femminili_retro.png"]
    }
];

// Carrello in localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Funzione per aggiornare il conteggio del carrello
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(el => {
        el.textContent = count;
    });
}

// Salva il carrello in localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Renderizza la lista dei prodotti (HOME)
function renderProducts(filterCategory = null) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    let filteredProducts = filterCategory 
        ? products.filter(p => p.category === filterCategory)
        : products.slice(0, 6);

    productsGrid.innerHTML = filteredProducts.map(product => {
        const statusClass = `status-${product.status}`;
        const statusText = product.status === 'available' ? 'Disponibile' : 
                          product.status === 'limited' ? 'Ultime scorte' : 'Terminato';
        
        let imageHTML = '';
        if (product.images && product.images.length > 0) {
            imageHTML = `<img src="${product.images[0]}" alt="${product.name}">`;
        } else {
            imageHTML = product.emoji;
        }
        
        return `
            <div class="product-card" onclick="goToProduct(${product.id})">
                <div class="product-image">${imageHTML}</div>
                <div class="product-info">
                    <div class="product-title">${product.name}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-price">€${product.price.toFixed(2)}</div>
                    <div class="product-status ${statusClass}">${statusText}</div>
                    <button class="btn-add-cart" onclick="addToCart(event, ${product.id})">Aggiungi</button>
                </div>
            </div>
        `;
    }).join('');
}

// Navigazione al prodotto
function goToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Aggiungi al carrello
function addToCart(event, productId) {
    event.stopPropagation();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            images: product.images,
            images: product.images,
            quantity: 1,
            size: product.sizes[0] || 'Unica'
        });
    }

    saveCart();
    showNotification(`${product.name} aggiunto al carrello!`);
}

// Notifica aggiunta al carrello
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #FF2A2A;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(255, 42, 42, 0.3);
        z-index: 999;
        animation: slideIn 0.3s ease;
        font-weight: 700;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Renderizza la pagina prodotto
function renderProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const product = products.find(p => p.id === productId);

    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    const productDetail = document.getElementById('productDetail');
    if (!productDetail) return;

    const breadcrumbName = document.getElementById('breadcrumbName');
    if (breadcrumbName) {
        breadcrumbName.textContent = product.name;
    }

    const statusClass = `status-${product.status}`;
    const statusText = product.status === 'available' ? 'Disponibile' : 
                      product.status === 'limited' ? 'Ultime scorte' : 'Terminato';

    // Genera la sezione immagini
    let imagesHTML = '';
    if (product.images && product.images.length > 0) {
        // Se il prodotto ha immagini reali, visualizzale con carosello
        // Salva le immagini in una variabile globale per il modal
        window.currentProductImages = product.images;
        
        imagesHTML = `<div class="product-images-gallery">
            <div class="gallery-container">
                ${product.images.map((img, idx) => `
                    <div class="product-image-item ${idx === 0 ? 'active' : ''}">
                        <img src="${img}" alt="${product.name} - Immagine ${idx + 1}" class="product-detail-img gallery-image" data-img-index="${idx}">
                    </div>
                `).join('')}
            </div>
            <button class="carousel-nav carousel-prev" onclick="prevImage()">❮</button>
            <button class="carousel-nav carousel-next" onclick="nextImage()">❯</button>
            <div class="gallery-dots">
                ${product.images.map((img, idx) => `
                    <button class="gallery-dot ${idx === 0 ? 'active' : ''}" onclick="goToImage(${idx})" aria-label="Immagine ${idx + 1}"></button>
                `).join('')}
            </div>
        </div>`;
    } else {
        // Altrimenti usa l'emoji
        imagesHTML = `<div class="product-detail-image">${product.emoji}</div>`;
    }

    productDetail.innerHTML = `
        ${imagesHTML}
        <div class="product-detail-info">
            <div>
                <h2 class="product-detail-title">${product.name}</h2>
                <p class="product-detail-price">€${product.price.toFixed(2)}</p>
                <div class="product-status ${statusClass}">${statusText}</div>
                <p class="product-detail-description">${product.fullDescription}</p>
                
                <div class="product-detail-specs">
                    <div class="specs-title">Caratteristiche</div>
                    <ul class="specs-list">
                        ${product.specs.map(spec => `<li>✓ ${spec}</li>`).join('')}
                    </ul>
                </div>

                <div class="quantity-selector">
                    <label for="quantity">Quantità:</label>
                    <input type="number" id="quantity" min="1" value="1">
                </div>
            </div>

            <button class="btn-primary" onclick="addToCartFromDetail(${product.id})">
                Aggiungi al Carrello - €${product.price.toFixed(2)}
            </button>
        </div>
    `;

    // Inizializza carosello se ci sono immagini
    if (product.images && product.images.length > 0) {
        currentImageIndex = 0;
        totalImages = product.images.length;
        
        // Aggiungi event listener alle immagini della galleria DOPO che il DOM è aggiornato
        setTimeout(() => {
            const galleryImages = document.querySelectorAll('.gallery-image');
            console.log('Immagini trovate nel DOM:', galleryImages.length);
            galleryImages.forEach((img, i) => {
                const dataIndex = img.getAttribute('data-img-index');
                console.log(`Immagine ${i}: data-img-index="${dataIndex}", src="${img.src}"`);
                img.removeEventListener('click', handleGalleryImageClick);
                img.addEventListener('click', handleGalleryImageClick);
            });
        }, 10);
    }

    // Mostra prodotti correlati
    renderRelatedProducts(product.category);
}

// Event handler per le immagini della galleria
function handleGalleryImageClick(event) {
    // Ottieni tutte le immagini della galleria
    const galleryImages = document.querySelectorAll('.gallery-image');
    let clickedIndex = -1;
    
    // Trova l'indice dell'immagine cliccata
    galleryImages.forEach((img, index) => {
        if (img === event.target) {
            clickedIndex = index;
        }
    });
    
    console.log('Click su immagine, index trovato:', clickedIndex);
    console.log('data-img-index dell\'elemento:', event.target.getAttribute('data-img-index'));
    console.log('event.target:', event.target);
    
    if (clickedIndex >= 0) {
        openImageModalByIndex(clickedIndex);
    }
}

// Renderizza i prodotti correlati
function renderRelatedProducts(category) {
    const relatedProducts = products.filter(p => p.category === category).slice(0, 4);
    const relatedContainer = document.getElementById('relatedProducts');
    
    if (relatedContainer) {
        relatedContainer.innerHTML = relatedProducts.map(product => {
            const statusClass = `status-${product.status}`;
            const statusText = product.status === 'available' ? 'Disponibile' : 
                              product.status === 'limited' ? 'Ultime scorte' : 'Terminato';
            
            let imageHTML = '';
            if (product.images && product.images.length > 0) {
                imageHTML = `<img src="${product.images[0]}" alt="${product.name}">`;
            } else {
                imageHTML = product.emoji;
            }
            
            return `
                <div class="product-card" onclick="goToProduct(${product.id})">
                    <div class="product-image">${imageHTML}</div>
                    <div class="product-info">
                        <div class="product-title">${product.name}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-price">€${product.price.toFixed(2)}</div>
                        <div class="product-status ${statusClass}">${statusText}</div>
                        <button class="btn-add-cart" onclick="addToCart(event, ${product.id})">Aggiungi</button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// ===== CAROSELLO IMMAGINI PRODOTTO =====
let currentImageIndex = 0;
let totalImages = 0;

function prevImage() {
    if (totalImages <= 1) return;
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateCarousel();
}

function nextImage() {
    if (totalImages <= 1) return;
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    updateCarousel();
}

function goToImage(index) {
    if (index >= 0 && index < totalImages) {
        currentImageIndex = index;
        updateCarousel();
    }
}

function updateCarousel() {
    // Aggiorna immagini
    const items = document.querySelectorAll('.product-image-item');
    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentImageIndex) {
            item.classList.add('active');
        }
    });

    // Aggiorna punti
    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentImageIndex) {
            dot.classList.add('active');
        }
    });
}

// ===== MODAL FULLSCREEN IMMAGINE =====
window.currentProductImages = [];

function openImageModalByIndex(index) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg && window.currentProductImages && window.currentProductImages[index]) {
        modalImg.src = window.currentProductImages[index];
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Chiudi modal quando si clicca fuori dall'immagine
document.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (modal && event.target === modal) {
        closeImageModal();
    }
});

// Chiudi modal premendo ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});

// Aggiungi al carrello dalla pagina prodotto
function addToCartFromDetail(productId) {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            images: product.images,
            quantity: quantity,
            size: product.sizes[0] || 'Unica'
        });
    }

    saveCart();
    showNotification(`${quantity}x ${product.name} aggiunto al carrello!`);
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 500);
}

// Renderizza il carrello
function renderCart() {
    const cartContent = document.getElementById('cartContent');
    const cartSummary = document.getElementById('cartSummary');
    const emptyCart = document.getElementById('emptyCart');

    if (!cartContent) return;

    if (cart.length === 0) {
        cartContent.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        return;
    }

    cartContent.style.display = 'block';
    if (cartSummary) cartSummary.style.display = 'block';
    if (emptyCart) emptyCart.style.display = 'none';

    cartContent.innerHTML = `
        <div class="cart-items-list">
            ${cart.map((item, index) => {
                let imageHTML = '';
                if (item.images && item.images.length > 0) {
                    imageHTML = `<img src="${item.images[0]}" alt="${item.name}">`;
                } else {
                    // Fallback: prova a trovare il prodotto nel database per le immagini
                    const dbProduct = products.find(p => p.id === item.id);
                    if (dbProduct && dbProduct.images && dbProduct.images.length > 0) {
                        imageHTML = `<img src="${dbProduct.images[0]}" alt="${item.name}">`;
                    } else {
                        imageHTML = item.emoji;
                    }
                }
                return `
                <div class="cart-item">
                    <div class="cart-item-image">${imageHTML}</div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Taglia: ${item.size}</p>
                        <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <label>Qtà:</label>
                        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
                    </div>
                    <div class="cart-item-total">
                        <p>€${(item.price * item.quantity).toFixed(2)}</p>
                        <button class="btn-remove" onclick="removeFromCart(${index})">Rimuovi</button>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    `;

    updateCartSummary();
}

// Aggiorna quantità
function updateQuantity(index, newQuantity) {
    const quantity = parseInt(newQuantity);
    if (quantity > 0) {
        cart[index].quantity = quantity;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    renderCart();
}

// Rimuovi dal carrello
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    showNotification('Prodotto rimosso dal carrello');
}

// Aggiorna il riepilogo del carrello
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 5.00 : 0;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `€${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `€${total.toFixed(2)}`;
}

// Carica i parametri dall'URL per product.html
function loadProductPage() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const category = params.get('category');
    
    const productsListSection = document.getElementById('productsListSection');
    const productDetailSection = document.getElementById('productDetail');
    const relatedSection = document.getElementById('relatedSection');
    
    if (productId) {
        // Mostra dettaglio del prodotto
        if (productsListSection) productsListSection.style.display = 'none';
        if (productDetailSection) productDetailSection.style.display = 'block';
        if (relatedSection) relatedSection.style.display = 'block';
        renderProductDetail();
    } else if (category) {
        // Mostra lista di prodotti della categoria
        if (productsListSection) productsListSection.style.display = 'block';
        if (productDetailSection) productDetailSection.style.display = 'none';
        if (relatedSection) relatedSection.style.display = 'none';
        
        const categoryTitles = {
            'uomo': 'UOMO',
            'donna': 'DONNA',
            'bambino': 'BAMBINO',
            'bambina': 'BAMBINA',
            'scarpe': 'SCARPE',
            'gadget': 'GADGET'
        };
        
        const categoryTitle = document.getElementById('categoryTitle');
        if (categoryTitle) {
            categoryTitle.textContent = categoryTitles[category] || 'PRODOTTI';
        }
        
        const breadcrumbName = document.getElementById('breadcrumbName');
        if (breadcrumbName) {
            breadcrumbName.textContent = categoryTitles[category] || 'Prodotti';
        }
        
        renderProducts(category);
    } else {
        // Mostra TUTTI i prodotti (quando visiti product.html senza parametri)
        if (productsListSection) productsListSection.style.display = 'block';
        if (productDetailSection) productDetailSection.style.display = 'none';
        if (relatedSection) relatedSection.style.display = 'none';
        
        const categoryTitle = document.getElementById('categoryTitle');
        if (categoryTitle) {
            categoryTitle.textContent = 'TUTTI I PRODOTTI';
        }
        
        const breadcrumbName = document.getElementById('breadcrumbName');
        if (breadcrumbName) {
            breadcrumbName.textContent = 'Tutti i Prodotti';
        }
        
        renderProducts(null, true); // true = mostra tutti
    }
}

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded inizializzato');
    updateCartCount();

    // Ritardo per assicurarsi che il DOM sia completamente caricato
    setTimeout(() => {
        const productsGrid = document.getElementById('productsGrid');
        const cartContent = document.getElementById('cartContent');
        const productDetail = document.getElementById('productDetail');
        const productsListSection = document.getElementById('productsListSection');
        
        console.log('productsGrid:', productsGrid);
        console.log('cartContent:', cartContent);
        console.log('productDetail:', productDetail);
        console.log('productsListSection:', productsListSection);
        
        if (productsGrid) {
            console.log('→ Rendering HOME (index.html)');
            renderProducts();
        } else if (cartContent) {
            console.log('→ Rendering CART (cart.html)');
            renderCart();
        } else if (productDetail && productsListSection) {
            console.log('→ Rendering PRODUCT PAGE (product.html)');
            loadProductPage();
        }
    }, 50);
});

// Stile per animazione notifica
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Salva il carrello in localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Renderizza la lista dei prodotti (HOME/CATEGORY/ALL)
function renderProducts(filterCategory = null, showAll = false) {
    console.log('renderProducts() chiamato:', {filterCategory, showAll, totalProducts: products.length});
    
    const productsGrid = document.getElementById('productsGrid');
    console.log('productsGrid element:', productsGrid ? 'TROVATO' : 'NON TROVATO');
    
    if (!productsGrid) {
        console.error('❌ productsGrid elemento non trovato!');
        return;
    }

    let filteredProducts;
    
    if (showAll) {
        // Mostra TUTTI i 18 prodotti quando visiti product.html senza parametri
        filteredProducts = products;
        console.log('Modalità: TUTTI i prodotti (' + products.length + ')');
    } else if (filterCategory) {
        // Mostra solo prodotti della categoria selezionata
        filteredProducts = products.filter(p => p.category === filterCategory);
        console.log(`Modalità: Categoria ${filterCategory}, trovati:`, filteredProducts.length);
    } else {
        // Fallback: mostra i primi 6 (per la home)
        filteredProducts = products.slice(0, 6);
        console.log('Modalità: Home (primi 6 prodotti), trovati:', filteredProducts.length);
    }

    console.log('Prodotti da renderizzare:', filteredProducts.length);

    productsGrid.innerHTML = filteredProducts.map(product => {
        const statusClass = `status-${product.status}`;
        const statusText = product.status === 'available' ? 'Disponibile' : 
                          product.status === 'limited' ? 'Ultime scorte' : 'Terminato';
        
        let imageHTML = '';
        if (product.images && product.images.length > 0) {
            imageHTML = `<img src="${product.images[0]}" alt="${product.name}">`;
        } else {
            imageHTML = product.emoji;
        }
        
        return `
            <div class="product-card" onclick="goToProduct(${product.id})">
                <div class="product-image">${imageHTML}</div>
                <div class="product-info">
                    <div class="product-title">${product.name}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-price">€${product.price.toFixed(2)}</div>
                    <div class="product-status ${statusClass}">${statusText}</div>
                    <button class="btn-add-cart" onclick="addToCart(event, ${product.id})">Aggiungi</button>
                </div>
            </div>
        `;
    }).join('');
    
    console.log('✅ renderProducts completato');
}

// Navigazione al prodotto
function goToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Aggiungi al carrello
function addToCart(event, productId) {
    event.stopPropagation();
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1,
            size: product.sizes[0] || 'Unica'
        });
    }

    saveCart();
    showNotification(`${product.name} aggiunto al carrello!`);
}

// Notifica aggiunta al carrello
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #FF2A2A;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(255, 42, 42, 0.3);
        z-index: 999;
        animation: slideIn 0.3s ease;
        font-weight: 700;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Aggiungi al carrello dalla pagina prodotto
function addToCartFromDetail(productId) {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            images: product.images,
            quantity: quantity,
            size: product.sizes[0] || 'Unica'
        });
    }

    saveCart();
    showNotification(`${quantity}x ${product.name} aggiunto al carrello!`);
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 500);
}

// Renderizza il carrello
function renderCart() {
    const cartContent = document.getElementById('cartContent');
    const cartSummary = document.getElementById('cartSummary');
    const emptyCart = document.getElementById('emptyCart');

    if (!cartContent) return;

    if (cart.length === 0) {
        cartContent.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        return;
    }

    cartContent.style.display = 'block';
    if (cartSummary) cartSummary.style.display = 'block';
    if (emptyCart) emptyCart.style.display = 'none';

    cartContent.innerHTML = `
        <div class="cart-items-list">
            ${cart.map((item, index) => {
                let imageHTML = '';
                if (item.images && item.images.length > 0) {
                    imageHTML = `<img src="${item.images[0]}" alt="${item.name}">`;
                } else {
                    // Fallback: prova a trovare il prodotto nel database per le immagini
                    const dbProduct = products.find(p => p.id === item.id);
                    if (dbProduct && dbProduct.images && dbProduct.images.length > 0) {
                        imageHTML = `<img src="${dbProduct.images[0]}" alt="${item.name}">`;
                    } else {
                        imageHTML = item.emoji;
                    }
                }
                return `
                <div class="cart-item">
                    <div class="cart-item-image">${imageHTML}</div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Taglia: ${item.size}</p>
                        <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <label>Qtà:</label>
                        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
                    </div>
                    <div class="cart-item-total">
                        <p>€${(item.price * item.quantity).toFixed(2)}</p>
                        <button class="btn-remove" onclick="removeFromCart(${index})">Rimuovi</button>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    `;

    updateCartSummary();
}

// Aggiorna quantità
function updateQuantity(index, newQuantity) {
    const quantity = parseInt(newQuantity);
    if (quantity > 0) {
        cart[index].quantity = quantity;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    renderCart();
}

// Rimuovi dal carrello
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    showNotification('Prodotto rimosso dal carrello');
}

// Aggiorna il riepilogo del carrello
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 5.00 : 0;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `€${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `€${total.toFixed(2)}`;
}

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOMContentLoaded inizializzato');
    updateCartCount();

    // Ritardo per assicurarsi che il DOM sia completamente caricato
    setTimeout(() => {
        const productsGrid = document.getElementById('productsGrid');
        const cartContent = document.getElementById('cartContent');
        const productDetail = document.getElementById('productDetail');
        const productsListSection = document.getElementById('productsListSection');
        
        // HOME PAGE (index.html) - mostri PRODOTTI IN EVIDENZA (status=limited)
        if (productsGrid && !productsListSection) {
            console.log('→ HOME PAGE (index.html) - Mostro PRODOTTI IN EVIDENZA');
            const featuredProducts = products.filter(p => p.status === 'limited').slice(0, 6);
            renderFeaturedProducts(featuredProducts);
        }
        // CART PAGE (cart.html)
        else if (cartContent) {
            console.log('→ CART PAGE (cart.html)');
            renderCart();
        }
        // PRODUCT PAGE (product.html)
        else if (productDetail || productsListSection) {
            console.log('→ PRODUCT PAGE (product.html)');
            loadProductPage();
        }
    }, 50);
});

// Renderizza PRODOTTI IN EVIDENZA sulla HOME (solo quelli con status=limited)
function renderFeaturedProducts(featuredProds) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    console.log(`Rendering ${featuredProds.length} featured products`);

    productsGrid.innerHTML = featuredProds.map(product => {
        const statusClass = `status-${product.status}`;
        const statusText = product.status === 'available' ? 'Disponibile' : 
                          product.status === 'limited' ? 'Ultime scorte' : 'Terminato';
        
        return `
            <div class="product-card" onclick="goToProduct(${product.id})">
                <div class="product-image">${product.emoji}</div>
                <div class="product-info">
                    <div class="product-title">${product.name}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-price">€${product.price.toFixed(2)}</div>
                    <div class="product-status ${statusClass}">${statusText}</div>
                    <button class="btn-add-cart" onclick="addToCart(event, ${product.id})">Aggiungi</button>
                </div>
            </div>
        `;
    }).join('');
    
    console.log('✅ Featured products renderizzati');
}

// ===================================
// ===== CHECKOUT & PAYMENT FUNCTIONS =====
// ===================================

// Configurazione globale backend
const BACKEND_URL = 'https://sito-shop-heavy-drop.vercel.app/api';

// ===== 1. AVVIA IL CHECKOUT =====
function startCheckout() {
    if (cart.length === 0) {
        showAlert('Il carrello è vuoto!', 'error');
        return;
    }
    // Naviga alla pagina di checkout
    window.location.href = 'checkout.html';
}

// ===== 2. TORNA AL CARRELLO =====
function goBackToCart() {
    window.location.href = 'cart.html';
}

// ===== 3. INIZIALIZZA CHECKOUT PAGE =====
async function initializeCheckout() {
    console.log('[CHECKOUT] Inizializzazione pagina checkout...');

    // Popola il recap del carrello
    renderCheckoutReview();

    // Carica Stripe e inizializza gli elementi
    await initializeStripeElements();

    // Aggancia il form submit
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handlePaymentSubmit);
    }

    console.log('[CHECKOUT] ✅ Inizializzazione completata');
}

// ===== 4. RENDERIZZA RECAP CARRELLO SUL CHECKOUT =====
function renderCheckoutReview() {
    const cartReviewEl = document.getElementById('cartReview');
    if (!cartReviewEl) return;

    cartReviewEl.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-size">Taglia: ${item.size}</div>
            </div>
            <span class="item-quantity">x${item.quantity}</span>
            <span class="item-price">€${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    // Aggiorna i totali
    updateCheckoutSummary();
}

// ===== 5. AGGIORNA RIEPILOGO CHECKOUT =====
function updateCheckoutSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 5.00 : 0;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('summarySubtotal');
    const shippingEl = document.getElementById('summaryShipping');
    const totalEl = document.getElementById('summaryTotal');

    if (subtotalEl) subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `€${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `€${total.toFixed(2)}`;
}

// ===== 6. INIZIALIZZA STRIPE ELEMENTS =====
let stripe = null;
let cardElement = null;

async function initializeStripeElements() {
    try {
        // Carica la public key di Stripe dal backend
        const response = await fetch(`${BACKEND_URL}/stripe-public-key`);
        const data = await response.json();

        if (!data.success) {
            throw new Error('Impossibile caricare la Stripe Public Key');
        }

        // Inizializza Stripe
        stripe = Stripe(data.publicKey);
        console.log('[STRIPE] ✅ Stripe inizializzato');

        // Crea gli elementi del form
        const elements = stripe.elements();
        cardElement = elements.create('card');

        // Monta l'elemento della carta nel DOM
        const cardElementContainer = document.getElementById('cardElement');
        if (cardElementContainer) {
            cardElement.mount('#cardElement');
            console.log('[STRIPE] ✅ Card Element montato');

            // Gestisci i cambiamenti nel card element
            cardElement.addEventListener('change', function(event) {
                const displayError = document.getElementById('cardError');
                if (event.error) {
                    displayError.textContent = event.error.message;
                    displayError.classList.add('show');
                } else {
                    displayError.textContent = '';
                    displayError.classList.remove('show');
                }
            });
        }
    } catch (error) {
        console.error('[STRIPE] ❌ Errore:', error.message);
        showAlert('Errore nella configurazione di Stripe. Riprova più tardi.', 'error');
    }
}

// ===== 7. GESTISCI IL SUBMIT DEL FORM DI PAGAMENTO =====
async function handlePaymentSubmit(event) {
    event.preventDefault();

    const payButton = document.getElementById('payButton');
    if (!payButton) return;

    // Disabilita il bottone durante l'elaborazione
    payButton.disabled = true;
    const originalText = payButton.textContent;
    payButton.innerHTML = '<div class="spinner"></div> Elaborazione...';

    try {
        // Valida il form
        if (!validateCheckoutForm()) {
            payButton.disabled = false;
            payButton.textContent = originalText;
            return;
        }

        // Raccogli i dati del cliente
        const customerData = {
            name: document.getElementById('firstName').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postalCode').value,
            country: document.getElementById('country').value
        };

        // Calcola l'importo totale
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = 5.00;
        const totalAmount = (subtotal + shipping) * 100; // Converti in centesimi per Stripe

        console.log('[PAYMENT] Creazione PaymentIntent...', { amount: totalAmount / 100, email: customerData.email });

        // Crea il PaymentIntent sul backend
        const createPaymentResponse = await fetch(`${BACKEND_URL}/create-payment-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: totalAmount,
                currency: 'eur',
                customer: {
                    ...customerData,
                    cart: cart
                }
            })
        });

        const paymentData = await createPaymentResponse.json();

        if (!paymentData.success) {
            throw new Error(paymentData.error || 'Errore nella creazione del pagamento');
        }

        console.log('[PAYMENT] ✅ PaymentIntent creato:', paymentData.paymentIntentId);

        // Usa Stripe per elaborare il pagamento con la carta
        const paymentResult = await stripe.confirmCardPayment(paymentData.clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: customerData.name,
                    email: customerData.email,
                    address: {
                        line1: customerData.address,
                        city: customerData.city,
                        postal_code: customerData.postalCode,
                        country: customerData.country
                    }
                }
            }
        });

        if (paymentResult.error) {
            // Pagamento fallito
            console.error('[PAYMENT] ❌ Errore pagamento:', paymentResult.error.message);
            showAlert(`Errore nel pagamento: ${paymentResult.error.message}`, 'error');
            payButton.disabled = false;
            payButton.textContent = originalText;
            return;
        }

        // Pagamento riuscito
        console.log('[PAYMENT] ✅ Pagamento confermato:', paymentResult.paymentIntent.id);

        // Comunica al backend che il pagamento è riuscito
        const confirmResponse = await fetch(`${BACKEND_URL}/confirm-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                paymentIntentId: paymentResult.paymentIntent.id,
                customerData: customerData,
                cartData: cart
            })
        });

        const confirmData = await confirmResponse.json();

        if (!confirmData.success) {
            throw new Error(confirmData.error || 'Errore nella conferma dell\'ordine');
        }

        console.log('[PAYMENT] ✅ Ordine creato:', confirmData.orderId);

        // Salva l'ordine ID in sessionStorage come backup
        sessionStorage.setItem('lastOrderId', confirmData.orderId);

        // Svuota il carrello PRIMA del reindirizzamento
        cart = [];
        localStorage.removeItem('cart');
        updateCartCount();

        // Mostra alert
        showAlert('✅ Pagamento completato! Reindirizzamento in corso...', 'success');
        
        // Calcola l'URL di destinazione
        const baseUrl = window.location.href.split('/').slice(0, -1).join('/');
        const confirmUrl = baseUrl + '/order-confirmation.html?orderId=' + confirmData.orderId;
        console.log('[PAYMENT] URL di reindirizzamento:', confirmUrl);
        
        // Reindirizza IMMEDIATAMENTE (senza delay)
        window.location.href = confirmUrl;

    } catch (error) {
        console.error('[PAYMENT] ❌ Errore durante il pagamento:', error.message);
        showAlert(`Errore: ${error.message}`, 'error');
        payButton.disabled = false;
        payButton.textContent = originalText;
    }
}

// ===== 8. VALIDA IL FORM CHECKOUT =====
function validateCheckoutForm() {
    const fields = [
        { id: 'firstName', label: 'Nome', type: 'text' },
        { id: 'email', label: 'Email', type: 'email' },
        { id: 'address', label: 'Indirizzo', type: 'text' },
        { id: 'city', label: 'Città', type: 'text' },
        { id: 'postalCode', label: 'CAP', type: 'postal' },
        { id: 'country', label: 'Paese', type: 'select' }
    ];

    let isValid = true;

    fields.forEach(field => {
        const inputEl = document.getElementById(field.id);
        const formGroup = inputEl?.parentElement;

        if (!inputEl || !inputEl.value.trim()) {
            formGroup?.classList.add('error');
            isValid = false;
        } else {
            // Validazioni specifiche
            if (field.type === 'email' && !validateEmail(inputEl.value)) {
                formGroup?.classList.add('error');
                isValid = false;
            } else if (field.type === 'postal' && !validatePostalCode(inputEl.value)) {
                formGroup?.classList.add('error');
                isValid = false;
            } else {
                formGroup?.classList.remove('error');
            }
        }
    });

    if (!isValid) {
        showAlert('Compila tutti i campi obbligatori correttamente', 'error');
    }

    return isValid;
}

// ===== 9. FUNZIONE PER VALIDARE EMAIL =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== 10. FUNZIONE PER VALIDARE CAP =====
function validatePostalCode(code) {
    // Accetta CAP italiano (5 cifre), codici europei, etc.
    const re = /^[0-9]{5}$/;
    return re.test(code);
}

// ===== 11. MOSTRA ALERTS =====
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;

    const alertEl = document.createElement('div');
    alertEl.className = `alert alert-${type} show`;
    alertEl.textContent = message;

    alertContainer.appendChild(alertEl);

    setTimeout(() => {
        alertEl.classList.remove('show');
        setTimeout(() => alertEl.remove(), 300);
    }, 4000);
}

// ===== 12. CARICA PAGINA CONFERMA ORDINE =====
async function loadOrderConfirmation() {
    console.log('[CONFIRMATION] Caricamento pagina conferma ordine...');

    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');

    const loadingState = document.getElementById('loadingState');
    const confirmationContent = document.getElementById('confirmationContent');
    const errorContent = document.getElementById('errorContent');

    if (!orderId) {
        console.error('[CONFIRMATION] ❌ Order ID non trovato negli URL params');
        if (loadingState) loadingState.style.display = 'none';
        if (errorContent) errorContent.style.display = 'block';
        return;
    }

    try {
        // Recupera i dettagli dell'ordine dal backend
        const response = await fetch(`${BACKEND_URL}/order/${orderId}`);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'Ordine non trovato');
        }

        const order = data.order;

        // Popola la pagina di conferma
        document.getElementById('orderNumber').textContent = order.id;
        document.getElementById('orderDate').textContent = new Date(order.timestamp).toLocaleDateString('it-IT');
        document.getElementById('totalAmount').textContent = `€${order.totalAmount.toFixed(2)}`;
        document.getElementById('shippingAddress').textContent = `${order.customer.address}, ${order.customer.postalCode} ${order.customer.city} (${order.customer.country})`;
        document.getElementById('customerEmail').textContent = order.customer.email;

        // Mostra il contenuto, nascondi il loading
        if (loadingState) loadingState.style.display = 'none';
        if (confirmationContent) confirmationContent.style.display = 'block';

        console.log('[CONFIRMATION] ✅ Ordine caricato:', orderId);

    } catch (error) {
        console.error('[CONFIRMATION] ❌ Errore:', error.message);
        if (loadingState) loadingState.style.display = 'none';
        if (errorContent) {
            errorContent.style.display = 'block';
            const errorMessageEl = document.getElementById('errorMessage');
            if (errorMessageEl) {
                errorMessageEl.textContent = error.message;
            }
        }
    }
}
