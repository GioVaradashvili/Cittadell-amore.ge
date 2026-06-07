// --- Premium Store Product Catalog Matrix ---
const amoreInventory = [
    {
        id: 201,
        name: "Eternity Sun Pendant",
        segment: "Fine Jewelry / Necklaces",
        price: 145.00,
        imgUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 202,
        name: "Midnight Moon Bracelet",
        segment: "Fine Jewelry / Bracelets",
        price: 95.00,
        imgUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 203,
        name: "Città Promise Ring Set",
        segment: "Studio Luxury / Rings",
        price: 210.00,
        imgUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 204,
        name: "Oversized 'Amore' Heavy Hoodie",
        segment: "Apparel / Matching Hoodies",
        price: 85.00,
        imgUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 205,
        name: "Cosmic Alignment Sweatshirt",
        segment: "Apparel / Sweatshirts",
        price: 70.00,
        imgUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 206,
        name: "The Book of Our Architecture",
        segment: "Studio Print / Books",
        price: 28.00,
        imgUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 207,
        name: "Constellation Shield Case",
        segment: "Accessories / Phone Cases",
        price: 40.00,
        imgUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80"
    }
];

let reactiveBag = [];

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

// --- Layout Injection Engine ---
function initializeCatalogDisplay() {
    productsGridRoot.innerHTML = amoreInventory.map(item => `
        <article class="nike-product-card">
            <div class="card-media-box">
                <img src="${item.imgUrl}" alt="${item.name}" class="card-img" loading="lazy">
            </div>
            <div class="card-meta-info">
                <div>
                    <h3>${item.name}</h3>
                    <p class="card-item-tag">${item.segment}</p>
                </div>
                <div class="card-interaction-row">
                    <span class="card-price-lbl">$${item.price.toFixed(2)}</span>
                    <button class="nav-btn-primary" onclick="addItemToBag(${item.id})">Add to Bag</button>
                </div>
            </div>
        </article>
    `).join('');
}

// --- Dynamic Shopping Basket Logic ---
window.addItemToBag = function(itemId) {
    const targetItem = amoreInventory.find(product => product.id === itemId);
    reactiveBag.push(targetItem);
    renderBagUpdate();
    
    // Smooth Haptic Scaling Effect on Bag Button
    cartToggleBtn.style.transform = 'scale(1.1)';
    setTimeout(() => cartToggleBtn.style.transform = 'scale(1)', 150);
};

function renderBagUpdate() {
    cartCounterNode.innerText = reactiveBag.length;

    bagItemsTarget.innerHTML = reactiveBag.map((item, index) => `
        <div class="bag-item-node">
            <div>
                <strong>${item.name}</strong>
                <p style="font-size: 0.8rem; color: var(--text-muted);">${item.segment}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <span>$${item.price.toFixed(2)}</span>
                <button onclick="removeBagItem(${index})" style="background:none; border:none; color:#d4af37; cursor:pointer; font-size:1.3rem;">&times;</button>
            </div>
        </div>
    `).join('');

    const calculatedTotal = reactiveBag.reduce((total, current) => total + current.price, 0);
    subtotalValNode.innerText = calculatedTotal.toFixed(2);
}

window.removeBagItem = function(index) {
    reactiveBag.splice(index, 1);
    renderBagUpdate();
};

// --- Theme Toggling & Interface Control Listeners ---
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