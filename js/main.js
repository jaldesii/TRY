function viewProduct(element) {
    const product = element.closest('.product');
    const name = product.querySelector('h2').textContent;
    const price = product.dataset.price;
    const description = product.dataset.description;
    const image = product.dataset.image;

    window.location.href = `product.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}`;
}

// Existing functions...

// Toggle reset button visibility
function toggleResetBtn() {
    const resetBtn = document.querySelector('.reset');
    resetBtn.classList.toggle('active');
}

// Switch the banner class based on the given name
function switchBanner(name) {
    const banner = document.querySelector('#banner');
    banner.className = 'banner'; // Reset to the default 'banner' class
    banner.classList.add(name); // Add the new class
    toggleResetBtn(); // Toggle the reset button visibility
}

// Reset the banner to its default state
function resetBanner() {
    const banner = document.querySelector('#banner');
    banner.className = 'banner'; // Set to the default 'banner' class
    toggleResetBtn(); // Toggle the reset button visibility
}

// Search and Filter Functionality
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const productContainer = document.getElementById('product-container');
const products = Array.from(document.querySelectorAll('.product'));

// Perform search on Enter key press
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const query = event.target.value.trim();
        filterProducts(query);
    }
});

// Filter products on category change
filterSelect.addEventListener('change', () => {
    const query = searchInput.value.trim();
    filterProducts(query);
});

// Function to filter and sort products based on search query and selected filter
function filterProducts(query) {
    const selectedFilter = filterSelect.value;
    let filteredProducts = products;

    // Filter products based on search query
    if (query) {
        filteredProducts = filteredProducts.filter(product => {
            const productName = product.querySelector('h2').textContent.toLowerCase();
            return productName.includes(query.toLowerCase());
        });
    }

    // Sort products based on the selected filter
    if (selectedFilter === 'low') {
        filteredProducts.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
    } else if (selectedFilter === 'high') {
        filteredProducts.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
    }

    // Clear the product container and append filtered and sorted products
    productContainer.innerHTML = '';
    filteredProducts.forEach(product => {
        productContainer.appendChild(product);
    });
}

// Update cart number from localStorage
function updateCartNumber() {
    const cartNumber = document.getElementById('cart-number');
    const storedNumber = localStorage.getItem('cartNumber');
    if (cartNumber) {
        cartNumber.textContent = storedNumber ? storedNumber : '0';
    }
}

// Run updateCartNumber on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartNumber();

     // Update cart number from localStorage
     function updateCartNumber() {
        const cartNumber = document.getElementById('cart-number');
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartNumber.textContent = totalItems;
    }

});

// Expose functions to the global scope for onclick handlers
window.switchBanner = switchBanner;
window.resetBanner = resetBanner;
window.viewProduct = viewProduct;
