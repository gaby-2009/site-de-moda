/* =========================
   PRODUTOS
========================= */

const products = [
    {
        id: 1,
        name: "Vestido Aurora",
        category: "vestidos",
        price: 389.90,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 2,
        name: "Vestido Serena",
        category: "vestidos",
        price: 429.90,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 3,
        name: "Blusa Minimal",
        category: "blusas",
        price: 189.90,
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 4,
        name: "Blusa Essenza",
        category: "blusas",
        price: 219.90,
        image: "https://images.unsplash.com/photo-1564257577054-8d8b1c0c7f0c?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 5,
        name: "Calça Palazzo",
        category: "calcas",
        price: 279.90,
        image: "https://images.unsplash.com/photo-1506629905607-d9c36a3b6f5a?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 6,
        name: "Calça Alfaiataria",
        category: "calcas",
        price: 319.90,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 7,
        name: "Bolsa Elegance",
        category: "acessorios",
        price: 299.90,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 8,
        name: "Óculos Lumière",
        category: "acessorios",
        price: 159.90,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85"
    }
];


/* =========================
   VARIÁVEIS
========================= */

let cart = [];


/* =========================
   ELEMENTOS
========================= */

const productsContainer = document.getElementById("products");
const categoryFilter = document.getElementById("categoryFilter");

const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");

const cartElement = document.getElementById("cart");
const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");

const aboutBtn = document.getElementById("aboutBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalOk = document.getElementById("modalOk");

const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");

const checkoutBtn = document.getElementById("checkoutBtn");


/* =========================
   FORMATAÇÃO DE PREÇO
========================= */

function formatPrice(price) {
    return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


/* =========================
   MOSTRAR PRODUTOS
========================= */

function renderProducts(list = products) {

    productsContainer.innerHTML = "";

    if (list.length === 0) {
        productsContainer.innerHTML = `
            <p style="grid-column: 1/-1; padding: 50px 0;">
                Nenhum produto encontrado.
            </p>
        `;

        return;
    }

    list.forEach(product => {

        const productElement = document.createElement("article");

        productElement.classList.add("product");

        productElement.innerHTML = `
            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                >
            </div>

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3>${product.name}</h3>

                <div class="product-price">
                    ${formatPrice(product.price)}
                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    ADICIONAR AO CARRINHO
                </button>

            </div>
        `;

        productsContainer.appendChild(productElement);
    });
}


/* =========================
   FILTRO
========================= */

categoryFilter.addEventListener("change", () => {

    const category = categoryFilter.value;

    if (category === "todos") {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(
        product => product.category === category
    );

    renderProducts(filtered);
});


/* =========================
   BUSCA
========================= */

searchBtn.addEventListener("click", () => {

    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
        searchInput.focus();
    }

});


searchInput.addEventListener("input", () => {

    const search = searchInput.value.toLowerCase().trim();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(search)
    );

    renderProducts(filtered);

});


/* =========================
   CARRINHO
========================= */

function addToCart(id) {

    const product = products.find(
        product => product.id === id
    );

    if (!product) return;

    const existingProduct = cart.find(
        item => item.id === id
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    openCart();
}


function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    updateCart();
}


function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Seu carrinho está vazio.
            </p>
        `;

    } else {

        cart.forEach(item => {

            const element = document.createElement("div");

            element.classList.add("cart-item");

            element.innerHTML = `
                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>
                    <h4>${item.name}</h4>

                    <p>
                        ${item.quantity}x
                        ${formatPrice(item.price)}
                    </p>
                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    Remover
                </button>
            `;

            cartItems.appendChild(element);

        });

    }

    const quantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const total = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    cartCount.textContent = quantity;
    cartTotal.textContent = formatPrice(total);
}


/* =========================
   ABRIR / FECHAR CARRINHO
========================= */

function openCart() {

    cartElement.classList.add("active");
    cartOverlay.classList.add("active");

}


function closeCartFunction() {

    cartElement.classList.remove("active");
    cartOverlay.classList.remove("active");

}


cartBtn.addEventListener("click", openCart);

closeCart.addEventListener(
    "click",
    closeCartFunction
);

cartOverlay.addEventListener(
    "click",
    closeCartFunction
);


/* =========================
   MODAL
========================= */

aboutBtn.addEventListener("click", () => {

    modal.classList.add("active");

});


closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});


modalOk.addEventListener("click", () => {

    modal.classList.remove("active");

});


modal.addEventListener("click", event => {

    if (event.target === modal) {
        modal.classList.remove("active");
    }

});


/* =========================
   NEWSLETTER
========================= */

newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email = document.getElementById("email").value;

    newsletterMessage.textContent =
        `Obrigado! ${email} foi cadastrado com sucesso.`;

    newsletterMessage.style.color = "#54734d";

    newsletterForm.reset();

});


/* =========================
   CHECKOUT
========================= */

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Seu carrinho está vazio.");

        return;
    }

    alert(
        "Pedido criado com sucesso! " +
        "Esta é uma demonstração de checkout."
    );

});


/* =========================
   INICIALIZAÇÃO
========================= */

renderProducts();

updateCart();

/* =========================
   NEWSLETTER / FORMSPREE
========================= */

newsletterForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const formData = new FormData(newsletterForm);

    newsletterMessage.textContent = "Enviando...";
    newsletterMessage.style.color = "#777";

    try {

        const response = await fetch(
            newsletterForm.action,
            {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (response.ok) {

            const email = document.getElementById("email").value;

            newsletterMessage.textContent =
                `Obrigado! ${email} foi cadastrado com sucesso.`;

            newsletterMessage.style.color = "#54734d";

            newsletterForm.reset();

        } else {

            newsletterMessage.textContent =
                "Não foi possível enviar. Tente novamente.";

            newsletterMessage.style.color = "#a33";
        }

    } catch (error) {

        newsletterMessage.textContent =
            "Ocorreu um erro de conexão. Tente novamente.";

        newsletterMessage.style.color = "#a33";
    }

});