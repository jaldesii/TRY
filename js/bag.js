document.addEventListener('DOMContentLoaded', () => {
    const bagContainer = document.getElementById('bag-container');
    const itemCount = document.getElementById('item-count');
    const subtotal = document.getElementById('subtotal');
    const shipping = document.getElementById('shipping');
    const total = document.getElementById('total');
    const promoCodeInput = document.getElementById('promo-code');
    const applyPromoButton = document.getElementById('apply-promo');
    const continueShoppingButton = document.getElementById('continue-shopping');
    const checkoutButton = document.getElementById('checkout');

    // Sample shipping cost and promo code discount
    const SHIPPING_COST = 5.00;
    const PROMO_DISCOUNT = 10.00;

    // Function to calculate totals
    function calculateTotals() {
        let subtotalAmount = 0;
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.forEach(item => {
            subtotalAmount += item.price * item.quantity;
        });

        subtotal.textContent = subtotalAmount.toFixed(2);
        shipping.textContent = SHIPPING_COST.toFixed(2);
        total.textContent = (subtotalAmount + SHIPPING_COST).toFixed(2);
    }

    // Function to render cart items
    function renderCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        itemCount.textContent = `(${cartItems.length})`;

        bagContainer.innerHTML = '';

        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-thumbnail">
                <div class="item-details">
                    <h2 class="item-name">${item.name}</h2>
                    <p class="item-description">${item.description}</p>
                    <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-index="${index}">
                    <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            bagContainer.appendChild(itemElement);
        });
    }

    // Event listener for quantity change
    bagContainer.addEventListener('change', (event) => {
        if (event.target.classList.contains('item-quantity')) {
            const index = event.target.dataset.index;
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems[index].quantity = parseInt(event.target.value);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
            calculateTotals();
        }
    });

    // Event listener for remove button
    bagContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.dataset.index;
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
            calculateTotals();
        }
    });

    // Event listener for apply promo button
    applyPromoButton.addEventListener('click', () => {
        const promoCode = promoCodeInput.value.trim();
        if (promoCode === 'PROMO10') {
            const subtotalAmount = parseFloat(subtotal.textContent);
            const discountedTotal = subtotalAmount + SHIPPING_COST - PROMO_DISCOUNT;
            total.textContent = discountedTotal.toFixed(2);
        }
    });

    // Event listener for continue shopping button
    continueShoppingButton.addEventListener('click', () => {
        window.location.href = 'shop.html';
    });

    // Event listener for checkout button
    checkoutButton.addEventListener('click', () => {
        alert('Proceeding to checkout...');
        // Implement checkout logic here
    });

    renderCartItems();
    calculateTotals();
});
