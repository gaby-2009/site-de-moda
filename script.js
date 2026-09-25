/* =========================================================
   LUMIÈRE — SCRIPT COMPLETO
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PRODUTOS
    ===================================================== */

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


    /* =====================================================
       CARRINHO
    ===================================================== */

    let cart = [];


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const productsContainer =
        document.getElementById("products");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const cartBtn =
        document.getElementById("cartBtn");

    const closeCartBtn =
        document.getElementById("closeCart");

    const cartElement =
        document.getElementById("cart");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");

    const searchBtn =
        document.getElementById("searchBtn");

    const searchBox =
        document.getElementById("searchBox");

    const searchInput =
        document.getElementById("searchInput");

    const aboutBtn =
        document.getElementById("aboutBtn");

    const modal =
        document.getElementById("modal");

    const closeModal =
        document.getElementById("closeModal");

    const modalOk =
        document.getElementById("modalOk");

    const newsletterForm =
        document.getElementById("newsletterForm");

    const newsletterMessage =
        document.getElementById("newsletterMessage");

    const checkoutBtn =
        document.getElementById("checkoutBtn");

    const checkoutModal =
        document.getElementById("checkoutModal");

    const closeCheckout =
        document.getElementById("closeCheckout");

    const orderForm =
        document.getElementById("orderForm");

    const orderMessage =
        document.getElementById("orderMessage");

    const orderDetails =
        document.getElementById("orderDetails");

    const orderTotal =
        document.getElementById("orderTotal");

    const orderSubmit =
        document.getElementById("orderSubmit");


    /* =====================================================
       FORMATAR PREÇO
    ===================================================== */

    function formatPrice(price) {

        return price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    }


    /* =====================================================
       RENDERIZAR PRODUTOS
    ===================================================== */

    function renderProducts(list) {

        if (!productsContainer) {
            return;
        }

        productsContainer.innerHTML = "";


        if (!list || list.length === 0) {

            productsContainer.innerHTML = `
                <div style="
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 60px 20px;
                ">
                    <p>Nenhum produto encontrado.</p>
                </div>
            `;

            return;
        }


        list.forEach(function (product) {

            const productElement =
                document.createElement("article");

            productElement.className =
                "product";

            productElement.innerHTML = `

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                </div>

                <div class="product-info">

                    <div class="product-category">
                        ${product.category}
                    </div>

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="product-price">
                        ${formatPrice(product.price)}
                    </div>

                    <button
                        type="button"
                        class="add-cart"
                        data-id="${product.id}"
                    >
                        ADICIONAR AO CARRINHO
                    </button>

                </div>

            `;

            productsContainer.appendChild(
                productElement
            );

        });

    }


    /* =====================================================
       ADICIONAR AO CARRINHO
    ===================================================== */

    function addToCart(id) {

        const product =
            products.find(function (item) {
                return item.id === id;
            });


        if (!product) {
            return;
        }


        const existingProduct =
            cart.find(function (item) {
                return item.id === id;
            });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                image: product.image,
                quantity: 1
            });

        }


        updateCart();

        openCart();

    }


    /* =====================================================
       BOTÃO ADICIONAR AO CARRINHO
    ===================================================== */

    if (productsContainer) {

        productsContainer.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(".add-cart");


                if (!button) {
                    return;
                }


                const id =
                    Number(
                        button.getAttribute("data-id")
                    );


                addToCart(id);

            }
        );

    }


    /* =====================================================
       ATUALIZAR CARRINHO
    ===================================================== */

    function updateCart() {

        if (!cartItems) {
            return;
        }


        cartItems.innerHTML = "";


        if (cart.length === 0) {

            cartItems.innerHTML = `
                <p class="empty-cart">
                    Seu carrinho está vazio.
                </p>
            `;

        } else {

            cart.forEach(function (item) {

                const cartItem =
                    document.createElement("div");

                cartItem.className =
                    "cart-item";

                cartItem.innerHTML = `

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div>

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            ${item.quantity}x
                            ${formatPrice(item.price)}
                        </p>

                    </div>

                    <button
                        type="button"
                        class="remove-item"
                        data-id="${item.id}"
                    >
                        Remover
                    </button>

                `;

                cartItems.appendChild(
                    cartItem
                );

            });

        }


        let quantity = 0;
        let total = 0;


        cart.forEach(function (item) {

            quantity += item.quantity;

            total +=
                item.price *
                item.quantity;

        });


        if (cartCount) {
            cartCount.textContent = quantity;
        }


        if (cartTotal) {
            cartTotal.textContent =
                formatPrice(total);
        }

    }


    /* =====================================================
       REMOVER PRODUTO
    ===================================================== */

    if (cartItems) {

        cartItems.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".remove-item"
                    );


                if (!button) {
                    return;
                }


                const id =
                    Number(
                        button.getAttribute("data-id")
                    );


                cart =
                    cart.filter(function (item) {
                        return item.id !== id;
                    });


                updateCart();

            }
        );

    }


    /* =====================================================
       ABRIR CARRINHO
    ===================================================== */

    function openCart() {

        if (cartElement) {
            cartElement.classList.add("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.add("active");
        }

    }


    /* =====================================================
       FECHAR CARRINHO
    ===================================================== */

    function closeCart() {

        if (cartElement) {
            cartElement.classList.remove("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }

    }


    if (cartBtn) {
        cartBtn.addEventListener("click", openCart);
    }


    if (closeCartBtn) {
        closeCartBtn.addEventListener("click", closeCart);
    }


    if (cartOverlay) {
        cartOverlay.addEventListener("click", closeCart);
    }


    /* =====================================================
       FILTRO
    ===================================================== */

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            function () {

                const category =
                    categoryFilter.value;


                if (category === "todos") {

                    renderProducts(products);

                    return;
                }


                const filtered =
                    products.filter(
                        function (product) {
                            return product.category === category;
                        }
                    );


                renderProducts(filtered);

            }
        );

    }


    /* =====================================================
       PESQUISA
    ===================================================== */

    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            function () {

                if (!searchBox) {
                    return;
                }


                searchBox.classList.toggle("active");


                if (
                    searchBox.classList.contains("active") &&
                    searchInput
                ) {

                    searchInput.focus();

                }

            }
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const search =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                const filtered =
                    products.filter(
                        function (product) {

                            return (
                                product.name
                                    .toLowerCase()
                                    .includes(search)

                                ||

                                product.category
                                    .toLowerCase()
                                    .includes(search)
                            );

                        }
                    );


                renderProducts(filtered);

            }
        );

    }


    /* =====================================================
       MODAL SOBRE
    ===================================================== */

    if (aboutBtn && modal) {

        aboutBtn.addEventListener(
            "click",
            function () {
                modal.classList.add("active");
            }
        );

    }


    if (closeModal && modal) {

        closeModal.addEventListener(
            "click",
            function () {
                modal.classList.remove("active");
            }
        );

    }


    if (modalOk && modal) {

        modalOk.addEventListener(
            "click",
            function () {
                modal.classList.remove("active");
            }
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {
                    modal.classList.remove("active");
                }

            }
        );

    }


    /* =====================================================
       NEWSLETTER — FORMSPREE
    ===================================================== */

    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const button =
                    document.getElementById(
                        "newsletterSubmit"
                    );


                const email =
                    document.getElementById("email");


                if (!email || !email.value.trim()) {

                    newsletterMessage.textContent =
                        "Digite seu e-mail.";

                    newsletterMessage.style.color =
                        "#a33";

                    return;

                }


                if (!email.checkValidity()) {

                    newsletterMessage.textContent =
                        "Digite um e-mail válido.";

                    newsletterMessage.style.color =
                        "#a33";

                    return;

                }


                if (button) {

                    button.disabled = true;

                    button.textContent =
                        "ENVIANDO...";

                }


                newsletterMessage.textContent =
                    "Enviando...";

                newsletterMessage.style.color =
                    "#777";


                try {

                    const formData =
                        new FormData(
                            newsletterForm
                        );


                    const response =
                        await fetch(
                            newsletterForm.action,
                            {
                                method: "POST",

                                body: formData,

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    if (response.ok) {

                        newsletterMessage.textContent =
                            "Cadastro realizado com sucesso!";

                        newsletterMessage.style.color =
                            "#54734d";

                        newsletterForm.reset();

                    } else {

                        newsletterMessage.textContent =
                            "Não foi possível enviar. Tente novamente.";

                        newsletterMessage.style.color =
                            "#a33";

                    }

                } catch (error) {

                    console.error(
                        "Erro no Formspree:",
                        error
                    );

                    newsletterMessage.textContent =
                        "Erro de conexão. Tente novamente.";

                    newsletterMessage.style.color =
                        "#a33";

                }


                if (button) {

                    button.disabled = false;

                    button.textContent =
                        "INSCREVER";

                }

            }
        );

    }


    /* =====================================================
       PREPARAR PEDIDO
    ===================================================== */

    function prepareOrder() {

        if (cart.length === 0) {
            return null;
        }


        let total = 0;

        let orderText =
            "NOVO PEDIDO — LUMIÈRE\n\n";


        orderText +=
            "PRODUTOS:\n";


        cart.forEach(function (item) {

            const itemTotal =
                item.price * item.quantity;


            total += itemTotal;


            orderText +=
                "\nProduto: " +
                item.name +
                "\nQuantidade: " +
                item.quantity +
                "\nPreço unitário: " +
                formatPrice(item.price) +
                "\nSubtotal: " +
                formatPrice(itemTotal) +
                "\n";

        });


        orderText +=
            "\n--------------------------------\n";


        orderText +=
            "TOTAL DO PEDIDO: " +
            formatPrice(total);


        return {
            text: orderText,
            total: total
        };

    }


    /* =====================================================
       ABRIR CHECKOUT
    ===================================================== */

    if (checkoutBtn) {

        checkoutBtn.addEventListener(
            "click",
            function () {

                if (cart.length === 0) {

                    alert(
                        "Seu carrinho está vazio."
                    );

                    return;

                }


                const order =
                    prepareOrder();


                if (!order) {
                    return;
                }


                if (orderDetails) {

                    orderDetails.value =
                        order.text;

                }


                if (orderTotal) {

                    orderTotal.value =
                        formatPrice(order.total);

                }


                if (orderMessage) {

                    orderMessage.textContent =
                        "";

                }


                if (checkoutModal) {

                    checkoutModal.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    /* =====================================================
       FECHAR CHECKOUT
    ===================================================== */

    if (closeCheckout) {

        closeCheckout.addEventListener(
            "click",
            function () {

                checkoutModal.classList.remove(
                    "active"
                );

            }
        );

    }


    /* =====================================================
       CLICAR FORA DO CHECKOUT
    ===================================================== */

    if (checkoutModal) {

        checkoutModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === checkoutModal
                ) {

                    checkoutModal.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    /* =====================================================
       ENVIAR PEDIDO PARA FORMSPREE
    ===================================================== */

    if (orderForm) {

        orderForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                if (cart.length === 0) {

                    orderMessage.textContent =
                        "Seu carrinho está vazio.";

                    orderMessage.style.color =
                        "#a33";

                    return;

                }


                /*
                 * Atualiza os dados do pedido
                 * antes do envio.
                 */

                const order =
                    prepareOrder();


                if (!order) {
                    return;
                }


                orderDetails.value =
                    order.text;


                orderTotal.value =
                    formatPrice(order.total);


                /* =========================================
                   BOTÃO
                ========================================= */

                if (orderSubmit) {

                    orderSubmit.disabled = true;

                    orderSubmit.textContent =
                        "ENVIANDO PEDIDO...";

                }


                orderMessage.textContent =
                    "Enviando pedido...";

                orderMessage.style.color =
                    "#777";


                try {

                    const formData =
                        new FormData(orderForm);


                    const response =
                        await fetch(
                            orderForm.action,
                            {
                                method: "POST",

                                body: formData,

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    /* =====================================
                       PEDIDO ENVIADO
                    ===================================== */

                    if (response.ok) {

                        orderMessage.textContent =
                            "Pedido enviado com sucesso! Obrigado pela sua compra.";

                        orderMessage.style.color =
                            "#54734d";


                        /*
                         * Limpa o carrinho.
                         */

                        cart = [];

                        updateCart();


                        /*
                         * Limpa o formulário.
                         */

                        orderForm.reset();


                        /*
                         * Fecha o carrinho.
                         */

                        closeCart();


                    } else {

                        orderMessage.textContent =
                            "Não foi possível enviar o pedido. Tente novamente.";

                        orderMessage.style.color =
                            "#a33";

                    }

                } catch (error) {

                    console.error(
                        "Erro ao enviar pedido:",
                        error
                    );


                    orderMessage.textContent =
                        "Erro de conexão. Verifique sua internet e tente novamente.";

                    orderMessage.style.color =
                        "#a33";

                }


                /* =========================================
                   RESTAURAR BOTÃO
                ========================================= */

                if (orderSubmit) {

                    orderSubmit.disabled = false;

                    orderSubmit.textContent =
                        "ENVIAR PEDIDO";

                }

            }
        );

    }


    /* =====================================================
       CHECKOUT — TECLA ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            closeCart();


            if (modal) {
                modal.classList.remove("active");
            }


            if (checkoutModal) {
                checkoutModal.classList.remove("active");
            }


            if (searchBox) {
                searchBox.classList.remove("active");
            }

        }
    );


    /* =====================================================
       INICIAR SITE
    ===================================================== */

    renderProducts(products);

    updateCart();

});
