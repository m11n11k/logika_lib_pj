document.addEventListener("DOMContentLoaded", function () {
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
    const buyButtons = document.querySelectorAll(".buy-btn");
    const priceFilter = document.getElementById("priceFilter");
    const priceValue = document.getElementById("priceValue");
    const products = document.querySelectorAll(".product");
    const cartIcon = document.querySelector(".korz");
    const cart = document.querySelector(".cart");
    let cartItems = [];

    cartIcon.addEventListener("click", function () {
        cart.classList.toggle("visible");
    });

    buyButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productElement = this.closest(".product");
            const productName = productElement.querySelector("h3").textContent;
            const productPrice = parseFloat(productElement.dataset.price);
            
            addToCart(productName, productPrice);
        });
    });

    function addToCart(name, price) {
        const existingItem = cartItems.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    function removeFromCart(index) {
        cartItems.splice(index, 1);
        updateCart();
    }

    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;

        cartItems.forEach((item, index) => {
            total += item.price * item.quantity;
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
            
            const removeButton = document.createElement("button");
            removeButton.textContent = "❌";
            removeButton.addEventListener("click", () => removeFromCart(index));
            
            listItem.appendChild(removeButton);
            cartList.appendChild(listItem);
        });

        totalPriceElement.textContent = total;
    }

    priceFilter.addEventListener("input", function () {
        let maxPrice = parseInt(priceFilter.value);
        priceValue.textContent = maxPrice;

        products.forEach((product) => {
            let productPrice = parseInt(product.getAttribute("data-price"));
            product.style.display = productPrice <= maxPrice ? "block" : "none";
        });
    });
});
