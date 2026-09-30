/* =========================================================
   LUMIÈRE — SCRIPT.JS
========================================================= */

const products = [
    {
        id: 1,
        name: "Vestido Aurora",
        category: "vestidos",
        price: 389.90,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=85",
        description: "Vestido elegante de corte fluido, perfeito para ocasiões especiais."
    },
    {
        id: 2,
        name: "Vestido Étoile",
        category: "vestidos",
        price: 429.90,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=85",
        description: "Uma peça feminina e sofisticada para composições contemporâneas."
    },
    {
        id: 3,
        name: "Blusa Camille",
        category: "blusas",
        price: 219.90,
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=85",
        description: "Blusa minimalista com acabamento delicado e caimento confortável."
    },
    {
        id: 4,
        name: "Blusa Claire",
        category: "blusas",
        price: 239.90,
        image: "https://images.unsplash.com/photo-1564257577054-0c9b4c0c2a3c?auto=format&fit=crop&w=800&q=85",
        description: "Essencial versátil para looks elegantes durante toda a semana."
    },
    {
        id: 5,
        name: "Calça Paris",
        category: "calcas",
        price: 329.90,
        image: "https://images.unsplash.com/photo-1506629905607-d9e7c1c4f9d7?auto=format&fit=crop&w=800&q=85",
        description: "Calça de alfaiataria moderna com silhueta sofisticada."
    },
    {
        id: 6,
        name: "Calça Élan",
        category: "calcas",
        price: 349.90,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85",
        description: "Modelagem contemporânea para produções elegantes e urbanas."
    },
    {
        id: 7,
        name: "Bolsa Lumière",
        category: "acessorios",
        price: 289.90,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85",
        description: "Bolsa sofisticada para complementar diferentes estilos."
    },
    {
        id: 8,
        name: "Óculos Soleil",
        category: "acessorios",
        price: 199.90,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85",
        description: "Óculos de design clássico para finalizar o look."
    }
];


/* =========================================================
   ESTADO
========================================================= */

let cart = JSON.parse(localStorage.getItem("lumiereCart")) || [];


/* =========================================================
   ELEMENTOS
========================================================= */

const productsGrid = document.getElementById("productsGrid");
const categoryFilter = document.getElementById("categoryFilter");
const productResult = document.getElementById("productResult");

const cartElement = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const overlay = document.getElementById("overlay");

const productModal = document.getElementById("productModal");
const productModalContent = document.getElementById("productModalContent");

const storyModal = document.getElementById("storyModal");
const checkoutModal = document.getElementById("checkoutModal");


/* =========================================================
   FORMATAÇÃO
========================================================= */

function formatPrice(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


/* =========================================================
   PRODUTOS
========================================================= */

function renderProducts(list = products) {

    productsGrid.innerHTML = "";

    productResult.textContent =
        `${list.length} ${list.length === 1 ? "produto" : "produtos"}`;

    if (list.length === 0) {
        productsGrid.innerHTML = `
            <div style="
                grid-column: 1 / -1;
                padding: 60px 20px;
                text-align: center;
                color: #777;
            ">
                Nenhum produto encontrado.
            </div>
        `;

        return;
    }

    list.forEach(product => {

        const article = document.createElement("article");

        article.className = "product";

        article.innerHTML = `
            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </div>

            <div class="product-info">

                <div class="product-category">
                    ${getCategoryName(product.category)}
                </div>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="product-price">
                    ${formatPrice(product.price)}
                </div>

                <div class="product-actions">

                    <button
                        type="button"
                        class="details-button"
                        data-id="${product.id}"
                    >
                        VER DETALHES
                    </button>

                    <button
                        type="button"
                        class="add-button"
                        data-id="${product.id}"
                    >
                        ADICIONAR
                    </button>

                </div>

            </div>
        `;

        productsGrid.appendChild(article);
    });
}


function getCategoryName(category) {

    const categories = {
        vestidos: "Vestidos",
        blusas: "Blusas",
        calcas: "Calças",
        acessorios: "Acessórios"
    };

    return categories[category] || category;
}


/* =========================================================
   FILTRO
========================================================= */

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


/* =========================================================
   CATEGORIAS
========================================================= */

document.querySelectorAll(".category-card").forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        categoryFilter.value = category;

        const filtered = products.filter(
            product => product.category === category
        );

        renderProducts(filtered);

        document
            .getElementById("colecao")
            .scrollIntoView({
                behavior: "smooth"
            });
    });

});


/* =========================================================
   PESQUISA
========================================================= */

const searchButton = document.getElementById("searchButton");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const closeSearch = document.getElementById("closeSearch");

searchButton.addEventListener("click", () => {

    searchPanel.classList.add("active");

    setTimeout(() => {
        searchInput.focus();
    }, 200);
});


closeSearch.addEventListener("click", closeSearchPanel);


function closeSearchPanel() {

    searchPanel.classList.remove("active");

    searchInput.value = "";

    renderProducts(products);
}


searchInput.addEventListener("input", () => {

    const term = searchInput.value
        .toLowerCase()
        .trim();

    if (!term) {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );

    renderProducts(filtered);
});


/* =========================================================
   EVENTOS DOS PRODUTOS
========================================================= */

productsGrid.addEventListener("click", event => {

    const button = event.target.closest("button");

    if (!button) return;

    const id = Number(button.dataset.id);

    if (button.classList.contains("add-button")) {
        addToCart(id);
    }

    if (button.classList.contains("details-button")) {
        openProductModal(id);
    }

});


/* =========================================================
   CARRINHO
========================================================= */

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;

    const existing = cart.find(
        item => item.id === productId
    );

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: product.id,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
    openCart();

}


function saveCart() {

    localStorage.setItem(
        "lumiereCart",
        JSON.stringify(cart)
    );

}


function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Seu carrinho está vazio.</p>
                <p>Escolha uma peça para começar.</p>
            </div>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "R$ 0,00";

        return;
    }

    let total = 0;
    let quantityTotal = 0;

    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) return;

        const subtotal =
            product.price * item.quantity;

        total += subtotal;
        quantityTotal += item.quantity;

        const element = document.createElement("div");

        element.className = "cart-item";

        element.innerHTML = `
            <img
                class="cart-item-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <div>

                <h4>
                    ${product.name}
                </h4>

                <div class="cart-item-price">
                    ${formatPrice(product.price)}
                </div>

                <div class="quantity-control">

                    <button
                        type="button"
                        data-action="decrease"
                        data-id="${product.id}"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        data-action="increase"
                        data-id="${product.id}"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                type="button"
                class="remove-item"
                data-action="remove"
                data-id="${product.id}"
            >
                REMOVER
            </button>
        `;

        cartItems.appendChild(element);
    });

    cartCount.textContent = quantityTotal;
    cartTotal.textContent = formatPrice(total);
}


/* =========================================================
   CONTROLES DO CARRINHO
========================================================= */

cartItems.addEventListener("click", event => {

    const button = event.target.closest("button");

    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    const item = cart.find(
        item => item.id === id
    );

    if (!item) return;

    if (action === "increase") {
        item.quantity++;
    }

    if (action === "decrease") {

        item.quantity--;

        if (item.quantity <= 0) {
            cart = cart.filter(
                item => item.id !== id
            );
        }
    }

    if (action === "remove") {

        cart = cart.filter(
            item => item.id !== id
        );
    }

    saveCart();
    renderCart();

});


/* =========================================================
   ABRIR / FECHAR CARRINHO
========================================================= */

document.getElementById("cartButton")
    .addEventListener("click", openCart);


document.getElementById("closeCart")
    .addEventListener("click", closeCart);


document.getElementById("continueShopping")
    .addEventListener("click", closeCart);


overlay.addEventListener("click", () => {

    closeCart();

});


function openCart() {

    cartElement.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");

}


function closeCart() {

    cartElement.classList.remove("active");
    overlay.classList.remove("active");

    if (
        !productModal.classList.contains("active") &&
        !storyModal.classList.contains("active") &&
        !checkoutModal.classList.contains("active")
    ) {
        document.body.classList.remove("no-scroll");
    }
}


/* =========================================================
   MODAL DE PRODUTO
========================================================= */

function openProductModal(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;

    productModalContent.innerHTML = `
        <div class="product-detail">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-detail-info">

                <div class="product-category">
                    ${getCategoryName(product.category)}
                </div>

                <h2>
                    ${product.name}
                </h2>

                <div class="product-detail-price">
                    ${formatPrice(product.price)}
                </div>

                <p>
                    ${product.description}
                </p>

                <button
                    class="primary-button"
                    id="modalAddButton"
                    type="button"
                >
                    ADICIONAR AO CARRINHO
                </button>

            </div>

        </div>
    `;

    productModal.classList.add("active");
    document.body.classList.add("no-scroll");

    document
        .getElementById("modalAddButton")
        .addEventListener("click", () => {

            addToCart(product.id);
            closeModal(productModal);

        });
}


/* =========================================================
   STORY MODAL
========================================================= */

document
    .getElementById("storyButton")
    .addEventListener("click", () => {

        storyModal.classList.add("active");
        document.body.classList.add("no-scroll");

    });


/* =========================================================
   FECHAR MODAIS
========================================================= */

document.querySelectorAll("[data-close]").forEach(button => {

    button.addEventListener("click", () => {

        const modalId = button.dataset.close;

        const modal = document.getElementById(modalId);

        closeModal(modal);

    });

});


document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeModal(modal);
        }

    });

});


function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("active");

    if (
        !document.querySelector(".modal.active") &&
        !cartElement.classList.contains("active")
    ) {
        document.body.classList.remove("no-scroll");
    }

}


/* =========================================================
   NEWSLETTER
========================================================= */

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterEmail =
    document.getElementById("newsletterEmail");

const newsletterMessage =
    document.getElementById("newsletterMessage");


newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email = newsletterEmail.value.trim();

    if (!email) return;

    newsletterMessage.textContent =
        "Obrigada! Seu e-mail foi cadastrado com sucesso.";

    newsletterMessage.style.color =
        "var(--success)";

    newsletterForm.reset();

});


/* =========================================================
   CHECKOUT
========================================================= */

const checkoutButton =
    document.getElementById("checkoutButton");


checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Seu carrinho está vazio.");

        return;
    }

    renderCheckoutSummary();

    checkoutModal.classList.add("active");
    document.body.classList.add("no-scroll");

});


function renderCheckoutSummary() {

    const summary =
        document.getElementById("checkoutSummary");

    let html = "";
    let total = 0;

    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) return;

        const subtotal =
            product.price * item.quantity;

        total += subtotal;

        html += `
            <div class="summary-line">

                <span>
                    ${product.name} × ${item.quantity}
                </span>

                <strong>
                    ${formatPrice(subtotal)}
                </strong>

            </div>
        `;
    });

    html += `
        <div class="summary-line summary-total">

            <span>
                Total
            </span>

            <strong>
                ${formatPrice(total)}
            </strong>

        </div>
    `;

    summary.innerHTML = html;
}


/* =========================================================
   ENVIO PELO WHATSAPP
========================================================= */

const checkoutForm =
    document.getElementById("checkoutForm");

const checkoutMessage =
    document.getElementById("checkoutMessage");


checkoutForm.addEventListener("submit", event => {

    event.preventDefault();

    if (cart.length === 0) {
        return;
    }

    const name =
        document.getElementById("customerName").value.trim();

    const email =
        document.getElementById("customerEmail").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();


    let message =
        `Olá, Lumière! Gostaria de realizar um pedido.%0A%0A`;

    message +=
        `*DADOS DO CLIENTE*%0A`;

    message +=
        `Nome: ${encodeURIComponent(name)}%0A`;

    message +=
        `E-mail: ${encodeURIComponent(email)}%0A`;

    message +=
        `WhatsApp: ${encodeURIComponent(phone)}%0A`;

    message +=
        `Endereço: ${encodeURIComponent(address)}%0A%0A`;

    message +=
        `*PRODUTOS*%0A`;


    let total = 0;

    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) return;

        const subtotal =
            product.price * item.quantity;

        total += subtotal;

        message +=
            `${encodeURIComponent(product.name)} x${item.quantity} — ${encodeURIComponent(formatPrice(subtotal))}%0A`;
    });


    message += `%0A*TOTAL: ${encodeURIComponent(formatPrice(total))}*`;


    /*
        ALTERE ESTE NÚMERO PARA O WHATSAPP DA SUA LOJA.

        Formato:
        55 + DDD + número

        Exemplo:
        5511999999999
    */

    const whatsappNumber = "5511999999999";


    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );


    checkoutMessage.textContent =
        "Pedido preparado! O WhatsApp será aberto.";

    checkoutMessage.style.color =
        "var(--success)";

});


/* =========================================================
   MENU MOBILE
========================================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const nav =
    document.getElementById("nav");


mobileMenuButton.addEventListener("click", () => {

    nav.classList.toggle("active");

});


document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


/* =========================================================
   TECLA ESC
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    closeSearchPanel();
    closeCart();
    closeModal(productModal);
    closeModal(storyModal);
    closeModal(checkoutModal);

});


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

renderProducts();
renderCart();

const paymentMethod =
    document.getElementById("paymentMethod");

const paymentDetails =
    document.getElementById("paymentDetails");


paymentMethod.addEventListener("change", () => {

    const method = paymentMethod.value;

    paymentDetails.innerHTML = "";

    if (method === "Pix") {

        paymentDetails.innerHTML = `
            <div class="payment-info">
                <strong>Pagamento via Pix</strong>
                <br>
                A chave Pix será enviada pelo WhatsApp
                após a confirmação do pedido.
            </div>
        `;

    }

    if (method === "Cartão de crédito") {

        paymentDetails.innerHTML = `
            <div class="payment-info">
                <strong>Cartão de crédito</strong>
                <br>
                O pagamento será combinado pelo WhatsApp
                após o envio do pedido.
            </div>
        `;

    }

    if (method === "Cartão de débito") {

        paymentDetails.innerHTML = `
            <div class="payment-info">
                <strong>Cartão de débito</strong>
                <br>
                O pagamento será combinado pelo WhatsApp
                após o envio do pedido.
            </div>
        `;

    }

    if (method === "Dinheiro") {

        paymentDetails.innerHTML = `
            <div class="payment-info">
                <strong>Pagamento em dinheiro</strong>
                <br>
                Informe pelo WhatsApp se precisa de troco.
            </div>
        `;

    }

});
