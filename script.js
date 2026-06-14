// Products data - 26 europejskich zespołów
const products = [
    { id: 1, name: 'Manchester', price: 89.99, image: 'images/Manchester.png' },
    { id: 2, name: 'Liverpool', price: 89.99, image: 'images/Liverpool.png' },
    { id: 3, name: 'London', price: 99.99, image: 'images/London.png' },
    { id: 4, name: 'Newcastle', price: 79.99, image: 'images/Newcastle.png' },
    { id: 5, name: 'Edinburgh', price: 79.99, image: 'images/Edinburgh.png' },
    { id: 6, name: 'Barcelona', price: 94.99, image: 'images/Barcelona.png' },
    { id: 7, name: 'Madrid', price: 94.99, image: 'images/Madrid.png' },
    { id: 8, name: 'Alicante', price: 89.99, image: 'images/Alicante.png' },
    { id: 9, name: 'Sevilla', price: 84.99, image: 'images/Sevilla.png' },
    { id: 10, name: 'Valencia', price: 74.99, image: 'images/Valencia.png' },
    { id: 11, name: 'Turyn', price: 84.99, image: 'images/Torino.png' },
    { id: 12, name: 'Milan', price: 89.99, image: 'images/Milan.png' },
    { id: 13, name: 'Rimini', price: 79.99, image: 'images/Rimini.png' },
    { id: 14, name: 'Roma', price: 94.99, image: 'images/Roma.png' },
    { id: 15, name: 'Napoli', price: 64.99, image: 'images/Napoli.png' },
    { id: 16, name: 'Munich', price: 74.99, image: 'images/Munchen.png' },
    { id: 17, name: 'Dortmund', price: 69.99, image: 'images/Dortmund.png' },
    { id: 18, name: 'Paris', price: 99.99, image: 'images/Paris.png' },
    { id: 19, name: 'Amsterdam', price: 74.99, image: 'images/Amsterdam.png' },
    { id: 20, name: 'Porto', price: 74.99, image: 'images/Porto.png' },
    { id: 21, name: 'Lizbone', price: 74.99, image: 'images/Lisboa.png' },
    { id: 22, name: 'Warsaw', price: 84.99, image: 'images/Warszawa.png' },
    { id: 23, name: 'Wroclove', price: 84.99, image: 'images/Wroclove.png' },
    { id: 24, name: 'Prague', price: 94.99, image: 'images/Prague.png' },
    { id: 25, name: 'Athens', price: 84.99, image: 'images/Athens.png' },
    { id: 26, name: 'Budapest', price: 74.99, image: 'images/Budapest.png' }
];

const sizes = ['Mała', 'Średnia', 'Duża'];
let cart = [];
const selectedSizes = {};
let activeProductId = null;

// DOM Elements
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartCounter = document.getElementById('cartCounter');
const buyBtn = document.getElementById('buyBtn');
const continueBtn = document.getElementById('continueBtn');
const abandonBtn = document.getElementById('abandonBtn');
const messageModal = document.getElementById('messageModal');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const messageIcon = document.getElementById('messageIcon');
const messageOkBtn = document.getElementById('messageOkBtn');
const cartSummary = document.getElementById('cartSummary');
const productModal = document.getElementById('productModal');
const productDetailsContent = document.getElementById('productDetailsContent');
const closeProductBtn = document.getElementById('closeProductBtn');

function createSlug(name) {
    return name
        .toLocaleLowerCase('pl-PL')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

/*
    GitHub Pages nie obsługuje dynamicznych adresów typu:
    /product/liverpool

    Dlatego generujemy linki jako:
    ?product=liverpool

    Przykład:
    https://lukasrozwora.github.io/?product=liverpool

    Jeśli strona działa w repozytorium, np.:
    https://lukasrozwora.github.io/DemoE-COM/

    link automatycznie będzie:
    https://lukasrozwora.github.io/DemoE-COM/?product=liverpool
*/
function getProductUrl(product) {
    return `?product=${encodeURIComponent(createSlug(product.name))}`;
}

function getShopUrl() {
    return window.location.pathname;
}

function getProductFromUrl() {
    const querySlug = new URLSearchParams(window.location.search).get('product');

    // Zostawiamy też obsługę starego wariantu /product/liverpool,
    // gdyby strona działała kiedyś na hostingu z routingiem.
    const pathMatch = window.location.pathname.match(/\/product\/([^/]+)\/?$/);

    const slug = querySlug || (pathMatch ? decodeURIComponent(pathMatch[1]) : null);

    return slug
        ? products.find(product => createSlug(product.name) === slug.toLowerCase())
        : null;
}

function productImageMarkup(product, details = false) {
    const imageClass = details ? 'product-details-image' : 'product-image';

    const image = product.image
        ? `<img src="${product.image}" alt="Koszulka ${product.name}" crossorigin="anonymous">`
        : '<div class="image-placeholder">📷 Brak obrazu</div>';

    return `<div class="${imageClass}">${image}</div>`;
}

function sizeSelectorMarkup(product, selectedSize) {
    return `
        <div class="size-selector">
            <label>Rozmiar:</label>
            <div class="size-options">
                ${sizes.map(size => `
                    <button type="button" class="size-option ${selectedSize === size ? 'selected' : ''}"
                            data-product-id="${product.id}" data-size="${size}">
                        ${size.charAt(0)}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// Initialize products
function initProducts() {
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const sizeKey = `product-${product.id}`;
        const selectedSize = selectedSizes[sizeKey] || sizes[0];

        productCard.innerHTML = `
            ${productImageMarkup(product)}
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price.toFixed(2)} zł</div>
                ${sizeSelectorMarkup(product, selectedSize)}
                <button type="button" class="add-to-cart-btn" data-product-id="${product.id}">
                    Dodaj do koszyka
                </button>
                <button type="button" class="product-details-btn" data-product-id="${product.id}">
                    Szczegóły
                </button>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

function renderProductDetails(product) {
    const selectedSize = selectedSizes[`product-${product.id}`] || sizes[0];

    productDetailsContent.innerHTML = `
        <div class="product-details-layout">
            ${productImageMarkup(product, true)}
            <div class="product-details-info">
                <h2 class="product-details-name" id="productDetailsName">${product.name}</h2>
                <div class="product-price">${product.price.toFixed(2)} zł</div>
                ${sizeSelectorMarkup(product, selectedSize)}
                <button type="button" class="add-to-cart-btn" data-product-id="${product.id}">
                    Dodaj do koszyka
                </button>
                <section class="product-description" aria-label="Opis produktu">
                    <h3>Opis</h3>
                    <p></p>
                </section>
            </div>
        </div>
    `;
}

function openProduct(product, updateHistory = true) {
    activeProductId = product.id;
    renderProductDetails(product);

    productModal.classList.add('active');
    productModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    if (updateHistory) {
        window.history.pushState(
            { productId: product.id, productOverlay: true },
            '',
            getProductUrl(product)
        );
    }

    closeProductBtn.focus();
}

function closeProduct(updateHistory = true) {
    activeProductId = null;

    productModal.classList.remove('active');
    productModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (updateHistory) {
        if (window.history.state?.productOverlay) {
            window.history.back();
        } else {
            window.history.replaceState({}, '', getShopUrl());
        }
    }
}

function syncProductWithUrl() {
    const product = getProductFromUrl();

    if (product) {
        if (!window.history.state?.productId) {
            window.history.replaceState(
                { productId: product.id, directProduct: true },
                '',
                window.location.href
            );
        }

        openProduct(product, false);
    } else if (activeProductId !== null) {
        closeProduct(false);
    }
}

// Select size
function selectSize(productId, size, button) {
    selectedSizes[`product-${productId}`] = size;

    const sizeButtons = button.parentElement.querySelectorAll('.size-option');
    sizeButtons.forEach(btn => btn.classList.remove('selected'));

    button.classList.add('selected');
}

// Add to cart
function addToCart(productId, productName, price) {
    const sizeKey = `product-${productId}`;
    const size = selectedSizes[sizeKey] || sizes[0];

    const product = {
        id: productId,
        name: productName,
        price: price,
        size: size,
        cartId: `${productId}-${size}-${Date.now()}`
    };

    cart.push(product);
    updateCartCounter();
    showNotification();
}

// Show notification
function showNotification() {
    console.log('Produkt dodany do koszyka!');
}

// Update cart counter
function updateCartCounter() {
    cartCounter.textContent = cart.length;
}

// Open cart
function openCart() {
    cartModal.classList.add('active');
    updateCartDisplay();
}

// Close cart
function closeCart() {
    cartModal.classList.remove('active');
}

// Update cart display
function updateCartDisplay() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Koszyk jest pusty</div>';
        cartSummary.innerHTML = '';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        itemElement.innerHTML = `
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-details">
                <span><strong>Rozmiar:</strong> ${item.size}</span>
                <span><strong>Cena:</strong> <span class="cart-item-price">${item.price.toFixed(2)} zł</span></span>
            </div>
            <button type="button" class="remove-btn" data-cart-id="${item.cartId}">Usuń</button>
        `;

        cartItems.appendChild(itemElement);
    });

    cartSummary.innerHTML = `
        <div class="cart-total">
            <span>Razem:</span>
            <span>${total.toFixed(2)} zł</span>
        </div>
    `;
}

// Remove from cart
function removeFromCart(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    updateCartCounter();
    updateCartDisplay();
}

// Buy
function buy() {
    if (cart.length === 0) {
        showMessage('Koszyk jest pusty!', '⚠️', 'success');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    showMessage(
        `✅ Dziękujemy za zakup!\n\nKwota: ${total.toFixed(2)} zł\n\nZamówienie zostało potwierdzone.`,
        '✅',
        'success'
    );

    cart = [];
    updateCartCounter();
    closeCart();
}

// Continue shopping
function continueShopping() {
    closeCart();
}

// Abandon cart
function abandonCart() {
    if (cart.length === 0) {
        showMessage('Koszyk jest już pusty!', '⚠️', 'abandoned');
        return;
    }

    showMessage('Koszyk został porzucony.', '❌', 'abandoned');

    cart = [];
    updateCartCounter();
    closeCart();
}

// Show message modal
function showMessage(text, icon, type) {
    messageText.textContent = text;
    messageIcon.textContent = icon;
    messageBox.className = `message-box ${type}`;
    messageModal.classList.add('active');
}

// Close message modal
function closeMessage() {
    messageModal.classList.remove('active');
}

// Event listeners
productsGrid.addEventListener('click', event => {
    const detailsButton = event.target.closest('.product-details-btn');

    if (detailsButton) {
        const product = products.find(item => item.id === Number(detailsButton.dataset.productId));
        if (product) openProduct(product);
        return;
    }

    const sizeButton = event.target.closest('.size-option');

    if (sizeButton) {
        selectSize(Number(sizeButton.dataset.productId), sizeButton.dataset.size, sizeButton);
        return;
    }

    const addButton = event.target.closest('.add-to-cart-btn');

    if (addButton) {
        const product = products.find(item => item.id === Number(addButton.dataset.productId));
        if (product) addToCart(product.id, product.name, product.price);
    }
});

productDetailsContent.addEventListener('click', event => {
    const sizeButton = event.target.closest('.size-option');

    if (sizeButton) {
        selectSize(Number(sizeButton.dataset.productId), sizeButton.dataset.size, sizeButton);
        return;
    }

    const addButton = event.target.closest('.add-to-cart-btn');

    if (addButton) {
        const product = products.find(item => item.id === Number(addButton.dataset.productId));
        if (product) addToCart(product.id, product.name, product.price);
    }
});

cartItems.addEventListener('click', event => {
    const removeButton = event.target.closest('.remove-btn');
    if (removeButton) removeFromCart(removeButton.dataset.cartId);
});

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
buyBtn.addEventListener('click', buy);
continueBtn.addEventListener('click', continueShopping);
abandonBtn.addEventListener('click', abandonCart);
messageOkBtn.addEventListener('click', closeMessage);
closeProductBtn.addEventListener('click', closeProduct);

window.addEventListener('popstate', syncProductWithUrl);

// Close modals when clicking outside
cartModal.addEventListener('click', event => {
    if (event.target === cartModal) closeCart();
});

messageModal.addEventListener('click', event => {
    if (event.target === messageModal) closeMessage();
});

productModal.addEventListener('click', event => {
    if (event.target === productModal) closeProduct();
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && activeProductId !== null) closeProduct();
});

// Initialize on load
initProducts();
syncProductWithUrl();


// Proaktywne zaproszenie do rozmowy przy widgetcie Zendesk
let proactiveClickCount = 0;
let proactiveMessageVisible = false;
let proactiveMessageDisabled = false;

const interactionsRequired = 3;

function showProactiveChatMessage() {
    if (proactiveMessageVisible) return;
    if (proactiveMessageDisabled) return;
    if (document.body.classList.contains('chat-active')) return;

    const existingMessage = document.getElementById('proactiveChatMessage');
    if (existingMessage) return;

    proactiveMessageVisible = true;

    const message = document.createElement('div');
    message.id = 'proactiveChatMessage';
    message.className = 'proactive-chat-message';

    message.innerHTML = `
        <button type="button" class="proactive-chat-close" aria-label="Zamknij">&times;</button>
        <span class="proactive-chat-text">
            Cześć, cieszymy się, że do nas zaglądasz, w razie potrzeby chętnie doradzę 🙂
        </span>
    `;

    document.body.appendChild(message);

    const closeButton = message.querySelector('.proactive-chat-close');

    closeButton.addEventListener('click', function (event) {
        event.stopPropagation();
        hideProactiveChatMessage(true);
    });
}

function hideProactiveChatMessage(disableForSession = false) {
    const message = document.getElementById('proactiveChatMessage');

    if (message) {
        message.remove();
    }

    proactiveMessageVisible = false;

    if (disableForSession) {
        proactiveMessageDisabled = true;
    }
}

function handleChatOpen() {
    document.body.classList.add('chat-active');
    hideProactiveChatMessage(true);
}

function handleChatClose() {
    document.body.classList.remove('chat-active');
}

function handleUserInteraction(event) {
    const proactiveMessage = document.getElementById('proactiveChatMessage');

    // Nie licz kliknięć w samą dymkę.
    if (proactiveMessage && proactiveMessage.contains(event.target)) {
        return;
    }

    // Jeśli chat jest otwarty, nie pokazuj dymki.
    if (document.body.classList.contains('chat-active')) {
        return;
    }

    // Jeżeli dymka już jest widoczna, nie licz dalej.
    if (proactiveMessageVisible) {
        return;
    }

    proactiveClickCount += 1;

    if (proactiveClickCount >= interactionsRequired) {
        showProactiveChatMessage();
        document.removeEventListener('click', handleUserInteraction, true);
    }
}

// Pokaż dymkę po 3 kliknięciach w stronę.
document.addEventListener('click', handleUserInteraction, true);

// Pokaż dymkę po 10 sekundach.
setTimeout(function () {
    showProactiveChatMessage();
}, 10000);

// Oficjalne eventy Zendesk Messaging, jeśli są dostępne.
function registerZendeskEvents() {
    if (typeof zE !== 'function') {
        return;
    }

    try {
        zE('messenger:on', 'open', function () {
            handleChatOpen();
        });

        zE('messenger:on', 'close', function () {
            handleChatClose();
        });
    } catch (error) {
        console.log('Zendesk event registration error:', error);
    }
}

// Wykrywanie otwartego okna Zendesk po iframe.
// To jest dodatkowe zabezpieczenie, gdy event zE nie odpali.
function isZendeskChatOpen() {
    const iframes = Array.from(document.querySelectorAll('iframe'));

    return iframes.some(iframe => {
        const rect = iframe.getBoundingClientRect();

        const title = (iframe.getAttribute('title') || '').toLowerCase();
        const name = (iframe.getAttribute('name') || '').toLowerCase();
        const src = (iframe.getAttribute('src') || '').toLowerCase();
        const id = (iframe.getAttribute('id') || '').toLowerCase();
        const className = (iframe.getAttribute('class') || '').toLowerCase();

        const iframeLooksLikeZendesk =
            title.includes('zendesk') ||
            title.includes('messaging') ||
            title.includes('chat') ||
            name.includes('zendesk') ||
            name.includes('messaging') ||
            name.includes('chat') ||
            src.includes('zendesk') ||
            src.includes('zdassets') ||
            src.includes('ekr') ||
            id.includes('zendesk') ||
            id.includes('webwidget') ||
            id.includes('launcher') ||
            className.includes('zendesk') ||
            className.includes('webwidget') ||
            className.includes('launcher');

        const iframeLooksLikeOpenChatWindow =
            rect.width > 260 &&
            rect.height > 260 &&
            rect.right > window.innerWidth - 120 &&
            rect.bottom > window.innerHeight - 120;

        return iframeLooksLikeZendesk && iframeLooksLikeOpenChatWindow;
    });
}

// Wykrywanie kliknięcia w prawy dolny obszar widgetu.
// Przydatne, gdy kliknięcie w iframe nie dochodzi normalnie do document.
document.addEventListener('pointerdown', function (event) {
    const clickX = event.clientX;
    const clickY = event.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const clickedBottomRightChatArea =
        clickX > windowWidth - 160 &&
        clickY > windowHeight - 160;

    if (clickedBottomRightChatArea) {
        handleChatOpen();
    }
}, true);

// Co chwilę sprawdzamy, czy chat jest już otwarty.
// Jeżeli tak, chowamy naszą dymkę.
setInterval(function () {
    if (isZendeskChatOpen()) {
        handleChatOpen();
    }
}, 300);

// Rejestracja eventów po załadowaniu strony.
// Kilka prób, bo widget Zendesk może ładować się z opóźnieniem.
window.addEventListener('load', function () {
    registerZendeskEvents();

    setTimeout(registerZendeskEvents, 1000);
    setTimeout(registerZendeskEvents, 2500);
    setTimeout(registerZendeskEvents, 5000);
});


