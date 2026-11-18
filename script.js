
// =================================
// СПИСОК ТОВАРІВ
// =================================

const products = {
    iphone18: {
        name: "iPhone 18",
        price: 24999,
        image: "iPhone 18.jpg"
    },

    microphone: {
        name: "Мікрофон FIFINE AM9",
        price: 4999,
        image: "МІКРОФОН FIFINE AM9.jpg"
    },

    monitor: {
        name: "Монітор PHILIPS",
        price: 6399,
        image: "МОНІТОР PHILIPS.webp"
    },

    airpods: {
        name: "AirPods Pro 2",
        price: 18999,
        image: "AirPods Pro 2.jpg"
    },

    asus: {
        name: "ASUS ROG Strix",
        price: 64999,
        image: "Ноутбук ASUS.jpg"
    },

    watch: {
        name: "Samsung Galaxy Watch",
        price: 14999,
        image: "Годинник Samsung Galaxy Watch.jpg"
    },

    ps5: {
        name: "PlayStation 5",
        price: 24999,
        image: "PlayStation 5.jpg"
    }
};


// =================================
// ЗАВАНТАЖЕННЯ КОШИКА
// =================================

let cart = [];

try {
    const savedCart = JSON.parse(
        localStorage.getItem("electroCart") || "[]"
    );

    if (Array.isArray(savedCart)) {
        cart = savedCart.filter(item =>
            products[item.id] &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );
    }
} catch (error) {
    cart = [];
}


// =================================
// ЗБЕРЕЖЕННЯ
// =================================

function saveCart() {
    try {
        localStorage.setItem(
            "electroCart",
            JSON.stringify(cart)
        );
    } catch (error) {
        console.error("Не вдалося зберегти кошик:", error);
    }

    updateCartCount();
}


// =================================
// ДОДАВАННЯ ТОВАРУ
// =================================

window.addToCart = function(productId) {

    const product = products[productId];

    if (!product) {
        alert("Товар не знайдено!");
        return;
    }

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    saveCart();
    renderCart();

    window.addToCart = function(productId) {

    const product = products[productId];

    if (!product) {
        return;
    }

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
};
};


// =================================
// КІЛЬКІСТЬ ТОВАРІВ
// =================================

function updateCartCount() {

    const countElement = document.getElementById("cartCount");

    if (!countElement) return;

    const count = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    countElement.textContent = count;
}


// =================================
// ФОРМАТУВАННЯ ЦІНИ
// =================================

function formatPrice(price) {
    return price.toLocaleString("uk-UA") + " ₴";
}


// =================================
// ПОКАЗ КОШИКА
// =================================

function renderCart() {

    const cartItems = document.getElementById("cartItems");
    const cartSummary = document.getElementById("cartSummary");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartSummary || !cartTotal) return;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Твій кошик поки порожній 🛒</h2>
                <p>Додай товари, щоб вони з'явилися тут.</p>

                <button onclick="showPage('storePage')">
                    Перейти до магазину
                </button>
            </div>
        `;

        cartSummary.style.display = "none";
        return;
    }

    cartSummary.style.display = "block";

    let total = 0;

    cartItems.innerHTML = cart.map(item => {

        const product = products[item.id];
        const itemTotal = product.price * item.quantity;

        total += itemTotal;

        return `
            <div class="cart-item">

                <img src="${product.image}" alt="${product.name}">

                <div class="cart-item-info">

                    <h3>${product.name}</h3>

                    <p class="cart-item-price">
                        ${formatPrice(product.price)}
                    </p>

                    <div class="quantity-controls">

                        <button onclick="changeQuantity('${item.id}', -1)">−</button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity('${item.id}', 1)">+</button>

                    </div>

                </div>

                <div class="cart-item-right">

                    <strong>${formatPrice(itemTotal)}</strong>

                    <button
                        class="remove-button"
                        onclick="removeFromCart('${item.id}')">
                        Видалити
                    </button>

                </div>

            </div>
        `;

    }).join("");

    cartTotal.textContent = formatPrice(total);
}


// =================================
// ЗМІНА КІЛЬКОСТІ
// =================================

window.changeQuantity = function(productId, change) {

    const item = cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    saveCart();
    renderCart();
};


// =================================
// ВИДАЛЕННЯ ТОВАРУ
// =================================

window.removeFromCart = function(productId) {

    cart = cart.filter(item => item.id !== productId);

    saveCart();
    renderCart();
};


// =================================
// ОЧИЩЕННЯ КОШИКА
// =================================

window.clearCart = function() {

    cart = [];

    saveCart();
    renderCart();
};


// =================================
// ПЕРЕМИКАННЯ СТОРІНОК
// =================================

window.showPage = function(pageId) {

    document.querySelectorAll(".screen").forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    if (pageId === "cartPage") {
        renderCart();
    }

    window.scrollTo(0, 0);
};


// =================================
// ЗАПУСК
// =================================

updateCartCount();
renderCart();
