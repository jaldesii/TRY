document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const productPrice = parseFloat(urlParams.get('price'));
    const productDescription = urlParams.get('description');
    const productImage = urlParams.get('image');

    document.getElementById('product-name').textContent = productName;
    document.getElementById('product-price').textContent = `$${productPrice.toFixed(2)}`;
    document.getElementById('product-description').textContent = productDescription;
    document.getElementById('product-image').src = productImage;

    // Add to Cart functionality
    const addToCartButton = document.getElementById('add-to-cart');
    
    addToCartButton.addEventListener('click', () => {
        const quantityToAdd = parseInt(document.getElementById('product-quantity').value);
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const existingItemIndex = cartItems.findIndex(item => item.name === productName);
        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += quantityToAdd;
        } else {
            cartItems.push({
                name: productName,
                price: productPrice,
                description: productDescription,
                image: productImage,
                quantity: quantityToAdd
            });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartNumber();
    });

    function updateCartNumber() {
        const cartNumber = document.getElementById('cart-number');
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartNumber.textContent = totalItems;
    }

    updateCartNumber();
});
