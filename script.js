// Products data - 26 europejskich zespołów
const products = [
    { id: 1, name: 'Manchester', price: 89.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_vjr3t5vjr3t5vjr3.png' },
    { id: 2, name: 'Liverpool', price: 89.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_m13tf6m13tf6m13t.png' },
    { id: 3, name: 'London', price: 99.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_rox0pvrox0pvrox0.png' },
    { id: 4, name: 'Newcastle', price: 79.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_a9y7wia9y7wia9y7.png' },
    { id: 5, name: 'Edinburgh', price: 79.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_8tklvs8tklvs8tkl.png' },
    { id: 6, name: 'Barcelona', price: 94.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_1xudlq1xudlq1xud.png' },
    { id: 7, name: 'Madrid', price: 94.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_l8bw3dl8bw3dl8bw.png' },
    { id: 8, name: 'Alicante', price: 89.99, image: 'images/Alicante.png' },
    { id: 9, name: 'Sevilla', price: 84.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_wigwi0wigwi0wigw%20(1).png' },
    { id: 10, name: 'Valencia', price: 74.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_2xs8mu2xs8mu2xs8.png' },
    { id: 11, name: 'Turyn', price: 84.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_frr1vcfrr1vcfrr1.png' },
    { id: 12, name: 'Milan', price: 89.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_5h6gd05h6gd05h6g.png' },
    { id: 13, name: 'Rimini', price: 79.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_5qcjtf5qcjtf5qcj.png' },
    { id: 14, name: 'Roma', price: 94.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_4km21c4km21c4km2.png' },
    { id: 15, name: 'Napoli', price: 64.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_3hb73p3hb73p3hb7.png' },
    { id: 16, name: 'Munich', price: 74.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_ujab0iujab0iujab.png' },
    { id: 17, name: 'Dortmund', price: 69.99, image: '' },
    { id: 18, name: 'Paris', price: 99.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/98771e377748e8c7dcb75e231b2cae5fd239a1ed/Gemini_Generated_Image_53k8ht53k8ht53k8.png' },
    { id: 19, name: 'Amsterdam', price: 74.99, image: '' },
    { id: 20, name: 'Porto', price: 74.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_z5liviz5liviz5li.png' },
    { id: 21, name: 'Lizbone', price: 74.99, image: '' },
    { id: 22, name: 'Warsaw', price: 84.99, image: '' },
    { id: 23, name: 'Wroclove', price: 84.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_r8z5u2r8z5u2r8z5.png' },
    { id: 24, name: 'Prague', price: 94.99, image: '' },
    { id: 25, name: 'Athens', price: 84.99, image: 'https://raw.githubusercontent.com/LukasRozwora/DemoE-COM/main/Gemini_Generated_Image_87oknf87oknf87ok.png' },
    { id: 26, name: 'Budapest', price: 74.99, image: '' }
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
