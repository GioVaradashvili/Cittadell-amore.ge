// --- Premium Store Product Catalog Matrix ---
// დამატებულია ფერების და ზომების მასივები ყოველი პროდუქტისთვის
const amoreInventory = [
    {
        id: 201,
        name: "Eternity Sun Pendant",
        segment: "Fine Jewelry / Necklaces",
        price: 145.00,
        imgUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
        colors: ["Gold", "Silver"],
        sizes: ["One Size"]
    },
    {
        id: 202,
        name: "Midnight Moon Bracelet",
        segment: "Fine Jewelry / Bracelets",
        price: 95.00,
        imgUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
        colors: ["Midnight Black", "Rose Gold"],
        sizes: ["Adjustable"]
    },
    {
        id: 203,
        name: "Città Promise Ring Set",
        segment: "Studio Luxury / Rings",
        price: 210.00,
        imgUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
        colors: ["Silver", "Gold"],
        sizes: ["5", "6", "7", "8", "9"]
    },
    {
        id: 204,
        name: "Oversized 'Amore' Heavy Hoodie",
        segment: "Apparel / Matching Hoodies",
        price: 85.00,
        imgUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
        colors: ["Black", "Desert Sand", "Cream White"],
        sizes: ["S", "M", "L", "XL", "2XL"]
    },
    {
        id: 205,
        name: "Cosmic Alignment Sweatshirt",
        segment: "Apparel / Sweatshirts",
        price: 70.00,
        imgUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
        colors: ["Navy Blue", "Charcoal Gray", "White"],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 206,
        name: "The Book of Our Architecture",
        segment: "Studio Print / Books",
        price: 28.00,
        imgUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
        colors: ["Standard Cover"],
        sizes: ["Hardcover"]
    },
    {
        id: 207,
        name: "Constellation Shield Case",
        segment: "Accessories / Phone Cases",
        price: 40.00,
        imgUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80",
        colors: ["Clear Cosmic", "Matte Black"],
        sizes: ["iPhone 13", "iPhone 14", "iPhone 15", "iPhone 15 Pro"]
    }
];

let reactiveBag = [];
let currentSelectedProduct = null;
let currentModalQty = 1;
let selectedColorStr = "";
let selectedSizeStr = "";

// --- Global DOM Node Anchors ---
const productsGridRoot = document.getElementById('products-root');
const themeToggleBtn = document.getElementById('theme-toggle');
const cartToggleBtn = document.getElementById('cart-toggle');
const bagCloseBtn = document.getElementById('close-bag');
const bagSidebarPanel = document.getElementById('bag-sidebar');
const bagItemsTarget = document.getElementById('bag-items-target');
const cartCounterNode = document.getElementById('cart-counter');
const subtotalValNode = document.getElementById('subtotal-val');
const checkoutFormPanel = document.getElementById('checkout-form');

// ასარჩევი ფანჯრის ელემენტები
const productModal = document.getElementById('product-modal');
const closeModalTrigger = document.getElementById('close-modal-trigger');
const modalMainImg = document.getElementById('modal-main-img');
const modalThumb1 = document.getElementById('modal-thumb-1');
const modalThumb2 = document.getElementById('modal-thumb-2');
const modalBreadcrumb = document.getElementById('modal-breadcrumb');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalColorsBox = document.getElementById('modal-colors-box');
const modalSizesBox = document.getElementById('modal-sizes-box');
const modalQtyVal = document.getElementById('modal-qty-val');
const modalAddToBagBtn = document.getElementById('modal-add-to-bag-btn');

// --- Layout Injection Engine ---
// შეცვლილია ღილაკი: ახლა იძახებს პროდუქტის ასარჩევ ფანჯარას
function initializeCatalogDisplay() {
    productsGridRoot.innerHTML = amoreInventory.map(item => `
        <article class="nike-product-card">
            <div class="card-media-box" onclick="openProductModal(${item.id})">
                <img src="${item.imgUrl}" alt="${item.name}" class="card-img" loading="lazy">
            </div>
            <div class="card-meta-info">
                <div onclick="openProductModal(${item.id})">
                    <h3>${item.name}</h3>
                    <p class="card-item-tag">${item.segment}</p>
                </div>
                <div class="card-interaction-row">
                    <span class="card-price-lbl">$${item.price.toFixed(2)}</span>
                    <button class="nav-btn-primary" onclick="openProductModal(${item.id})">View Details</button>
                </div>
            </div>
        </article>
    `).join('');
}

// --- ასარჩევი ფანჯრის გახსნა და მონაცემების შევსება ---
window.openProductModal = function(productId) {
    const product = amoreInventory.find(p => p.id === productId);
    if (!product) return;

    currentSelectedProduct = product;
    currentModalQty = 1;
    selectedColorStr = product.colors[0];
    selectedSizeStr = product.sizes[0];

    modalMainImg.src = product.imgUrl;
    modalThumb1.src = product.imgUrl;
    modalThumb2.src = product.imgUrl;
    modalBreadcrumb.innerText = `Home  >  ${product.segment.replace('/', '  >  ')}`;
    modalTitle.innerText = product.name;
    modalPrice.innerText = `${product.price.toFixed(2)} GEL`;
    modalQtyVal.innerText = currentModalQty;

    // ფერების ჩატვირთვა
    modalColorsBox.innerHTML = product.colors.map(color => `
        <button class="color-pill ${color === selectedColorStr ? 'selected' : ''}" onclick="selectColor('${color}', this)">${color}</button>
    `).join('');

    // ზომების ჩატვირთვა
    modalSizesBox.innerHTML = product.sizes.map(size => `
        <button class="size-tile ${size === selectedSizeStr ? 'selected' : ''}" onclick="selectSize('${size}', this)">${size}</button>
    `).join('');

    // წინასწარი შეკვეთის (დამატების) ღილაკი
    modalAddToBagBtn.onclick = () => {
        executeAddToBag(product, currentModalQty, selectedColorStr, selectedSizeStr);
        productModal.classList.remove('modal-active');
    };

    productModal.classList.add('modal-active');
};

// --- ფერისა და ზომის მონიშვნა ---
window.selectColor = function(color, element) {
    document.querySelectorAll('.color-pill').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
    selectedColorStr = color;
};

window.selectSize = function(size, element) {
    document.querySelectorAll('.size-tile').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
    selectedSizeStr = size;
};

window.adjustModalQty = function(amount) {
    currentModalQty += amount;
    if (currentModalQty < 1) currentModalQty = 1;
    modalQtyVal.innerText = currentModalQty;
};

// --- კალათაში რეალური დამატების ლოგიკა ---
function executeAddToBag(product, qty, color, size) {
    // ვამოწმებთ, უკვე არის თუ არა ზუსტად ასეთი კომბინაცია კალათაში
    const existingIndex = reactiveBag.findIndex(item => item.id === product.id && item.color === color && item.size === size);

    if (existingIndex > -1) {
        reactiveBag[existingIndex].qty += qty;
    } else {
        reactiveBag.push({
            id: product.id,
            name: product.name,
            price: product.price,
            segment: product.segment,
            color: color,
            size: size,
            qty: qty
        });
    }
    renderBagUpdate();
    
    // კალათის გვერდითა პანელის ავტომატური გამოჩენა დამატებისას
    bagSidebarPanel.classList.add('drawer-open');
}

// --- Dynamic Shopping Basket Logic (დამოუკიდებელი ძველი კალათის სტრუქტურისგან) ---
window.addItemToBag = function(itemId) {
    const targetItem = amoreInventory.find(product => product.id === itemId);
    // ძველი ფუნქციის თავსებადობისთვის (თუ პირდაპირ დამატება დაგჭირდა სადმე)
    executeAddToBag(targetItem, 1, targetItem.colors[0], targetItem.sizes[0]);
};

function renderBagUpdate() {
    const totalItemsCount = reactiveBag.reduce((sum, item) => sum + item.qty, 0);
    cartCounterNode.innerText = totalItemsCount;

    bagItemsTarget.innerHTML = reactiveBag.map((item, index) => `
        <div class="bag-item-node">
            <div>
                <strong>${item.name} (${item.qty}x)</strong>
                <p style="font-size: 0.8rem; color: var(--text-muted);">${item.color} / ${item.size}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <span>$${(item.price * item.qty).toFixed(2)}</span>
                <button onclick="removeBagItem(${index})" style="background:none; border:none; color:#d4af37; cursor:pointer; font-size:1.3rem;">&times;</button>
            </div>
        </div>
    `).join('');

    const calculatedTotal = reactiveBag.reduce((total, item) => total + (item.price * item.qty), 0);
    subtotalValNode.innerText = calculatedTotal.toFixed(2);
}

window.removeBagItem = function(index) {
    reactiveBag.splice(index, 1);
    renderBagUpdate();
};

// --- Theme Toggling & Interface Control Listeners ---
closeModalTrigger.addEventListener('click', () => productModal.classList.remove('modal-active'));
productModal.addEventListener('click', (e) => { if(e.target === productModal) productModal.classList.remove('modal-active'); });

themeToggleBtn.addEventListener('click', () => {
    const isActiveDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isActiveDark) {
        document.documentElement.removeAttribute('data-theme');
        themeToggleBtn.innerText = "🌙 Dark Reader";
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerText = "☀️ Light Reader";
    }
});

cartToggleBtn.addEventListener('click', () => bagSidebarPanel.classList.add('drawer-open'));
bagCloseBtn.addEventListener('click', () => bagSidebarPanel.classList.remove('drawer-open'));

checkoutFormPanel.addEventListener('submit', (e) => {
    e.preventDefault();
    if (reactiveBag.length === 0) {
        alert("Your shopping bag is empty!");
        return;
    }
    alert("✨ Order Secured at Città dell’amore via Premium Checkout Architecture. Thank you!");
    reactiveBag = [];
    renderBagUpdate();
    bagSidebarPanel.classList.remove('drawer-open');
    checkoutFormPanel.reset();
});

// Start Interface Runtime Execution
initializeCatalogDisplay();