// Liked Products Functionality
let likedProducts = [];

// Load liked products from localStorage
function loadLikedProducts() {
    const savedLikedProducts = localStorage.getItem('likedProducts');
    if (savedLikedProducts) {
        likedProducts = JSON.parse(savedLikedProducts);
    }
    updateLikedUI();
}

// Save liked products to localStorage
function saveLikedProducts() {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
    updateLikedUI();
}

// Toggle like status for a product
function toggleLikeProduct(product) {
    const index = likedProducts.findIndex(item => item.id === product.id);
    
    if (index !== -1) {
        // Product is already liked, remove it
        likedProducts.splice(index, 1);
        showLikeNotification(`${product.name} removed from liked products`);
    } else {
        // Product is not liked, add it
        likedProducts.push({
            id: product.id,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice || null,
            discount: product.discount || null,
            image: product.image
        });
        showLikeNotification(`${product.name} added to liked products`);
    }
    
    saveLikedProducts();
}

// Check if a product is liked
function isProductLiked(productId) {
    return likedProducts.some(item => item.id === productId);
}

// Remove product from liked products
function removeLikedProduct(productId) {
    likedProducts = likedProducts.filter(item => item.id !== productId);
    saveLikedProducts();
}

// Clear all liked products
function clearAllLikedProducts() {
    likedProducts = [];
    saveLikedProducts();
}

// Update liked products UI
function updateLikedUI() {
    // Update liked count
    const likedCounts = document.querySelectorAll('.wishlist-icon .count');
    
    likedCounts.forEach(count => {
        count.textContent = likedProducts.length;
    });
    
    // Update liked products page if on liked page
    const likedProductsContainer = document.querySelector('.liked-products');
    const likedCountElement = document.getElementById('liked-count');
    
    if (likedProductsContainer && likedCountElement) {
        likedCountElement.textContent = likedProducts.length;
        
        if (likedProducts.length === 0) {
            // Show empty liked message
            likedProductsContainer.innerHTML = `
                <div class="empty-liked">
                    <i class="fas fa-heart-broken"></i>
                    <p>You haven't liked any products yet</p>
                    <a href="shop.html" class="btn">Explore Products</a>
                </div>
            `;
        } else {
            // Show liked products
            let likedProductsHTML = '';
            
            likedProducts.forEach(product => {
                likedProductsHTML += `
                    <div class="liked-product-card" data-id="${product.id}">
                        <div class="liked-product-image">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="liked-product-actions">
                                <div class="liked-product-action liked remove-liked" data-id="${product.id}">
                                    <i class="fas fa-heart"></i>
                                </div>
                                <div class="liked-product-action add-to-cart" data-id="${product.id}">
                                    <i class="fas fa-shopping-cart"></i>
                                </div>
                            </div>
                        </div>
                        <div class="liked-product-info">
                            <h3 class="liked-product-name">${product.name}</h3>
                            <div class="liked-product-price">
                                <span class="liked-product-current-price">$${product.price.toFixed(2)}</span>
                                ${product.oldPrice ? `<span class="liked-product-old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                                ${product.discount ? `<span class="liked-product-discount">${product.discount}% OFF</span>` : ''}
                            </div>
                            <div class="liked-product-buttons">
                                <a href="product.html?id=${product.id}" class="btn outline">View Details</a>
                                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            likedProductsContainer.innerHTML = likedProductsHTML;
            
            // Add event listeners to remove buttons
            const removeLikedButtons = likedProductsContainer.querySelectorAll('.remove-liked');
            
            removeLikedButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    const productName = likedProducts.find(item => item.id === productId)?.name || 'Product';
                    
                    removeLikedProduct(productId);
                    showLikeNotification(`${productName} removed from liked products`);
                });
            });
            
            // Add event listeners to add to cart buttons
            const addToCartButtons = likedProductsContainer.querySelectorAll('.add-to-cart');
            
            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    const product = likedProducts.find(item => item.id === productId);
                    
                    if (product && typeof addToCart === 'function') {
                        addToCart(product);
                    }
                });
            });
        }
    }
    
    // Update like buttons on product cards
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        const productId = button.getAttribute('data-id');
        
        if (isProductLiked(productId)) {
            button.classList.add('liked');
        } else {
            button.classList.remove('liked');
        }
    });
}

// Show like notification
function showLikeNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'like-notification';
    notification.innerHTML = `
        <div class="like-notification-content">
            <i class="fas fa-heart"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--primary-color)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // Add notification to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Mock addToCart function (replace with your actual implementation)
function addToCart(product) {
    console.log('Add to cart:', product);
    alert(`${product.name} added to cart!`);
}

// Mock products array (replace with your actual product data)
const products = [
    { id: '1', name: 'Product 1', price: 20, image: 'image1.jpg' },
    { id: '2', name: 'Product 2', price: 30, image: 'image2.jpg' },
    { id: '3', name: 'Product 3', price: 40, image: 'image3.jpg' }
];

// Initialize liked products functionality
document.addEventListener('DOMContentLoaded', () => {
    loadLikedProducts();
    
    // Add event listener to clear all liked products button
    const clearAllLikedBtn = document.getElementById('clear-all-liked');
    
    if (clearAllLikedBtn) {
        clearAllLikedBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all liked products?')) {
                clearAllLikedProducts();
                showLikeNotification('All liked products cleared');
            }
        });
    }
    
    // Add event listeners to like buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('like-btn') || e.target.closest('.like-btn')) {
            e.preventDefault();
            
            // Get product ID
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = productCard.getAttribute('data-id');
                // Assuming 'products' is defined elsewhere or fetched from an API
                const product = products.find(p => p.id == productId);
                
                if (product) {
                    toggleLikeProduct(product);
                }
            }
        }
    });
});