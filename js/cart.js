// Cart functionality
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartUI();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Add item to cart
function addToCart(product, quantity = 1) {
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    showCartNotification(`${quantity} item(s) added to cart`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

// Update item quantity
function updateCartItemQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
        }
    }
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Calculate tax amount (assuming 10% tax rate)
function calculateTax(subtotal) {
    return subtotal * 0.1;
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const cartCounts = document.querySelectorAll('.cart-icon .count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCounts.forEach(count => {
        count.textContent = totalItems;
    });
    
    // Update sliding cart
    const slidingCartItems = document.querySelector('.sliding-cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const subtotalAmount = document.querySelectorAll('.subtotal-amount');
    const taxAmount = document.querySelectorAll('.tax-amount');
    const totalAmount = document.querySelectorAll('.total-amount');
    
    if (slidingCartItems) {
        if (cart.length === 0) {
            // Show empty cart message
            slidingCartItems.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            // Show cart items
            let cartItemsHTML = '';
            
            cart.forEach(item => {
                cartItemsHTML += `
                    <div class="sliding-cart-item" data-id="${item.id}">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h3 class="cart-item-name">${item.name}</h3>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                            <div class="cart-item-quantity">
                                <button class="cart-quantity-btn minus" data-id="${item.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="cart-quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                        </div>
                        <div class="cart-item-remove" data-id="${item.id}">
                            <i class="fas fa-trash-alt"></i>
                        </div>
                    </div>
                `;
            });
            
            slidingCartItems.innerHTML = cartItemsHTML;
            
            // Add event listeners to quantity buttons and remove buttons
            const minusButtons = slidingCartItems.querySelectorAll('.cart-quantity-btn.minus');
            const plusButtons = slidingCartItems.querySelectorAll('.cart-quantity-btn.plus');
            const removeButtons = slidingCartItems.querySelectorAll('.cart-item-remove');
            
            minusButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    const item = cart.find(item => item.id == productId);
                    if (item) {
                        updateCartItemQuantity(productId, item.quantity - 1);
                    }
                });
            });
            
            plusButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    const item = cart.find(item => item.id == productId);
                    if (item) {
                        updateCartItemQuantity(productId, item.quantity + 1);
                    }
                });
            });
            
            removeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    removeFromCart(productId);
                });
            });
        }
    }
    
    // Update cart page if on cart page
    const cartItemsContainer = document.querySelector('.cart-items-container');
    
    if (cartItemsContainer) {
        if (cart.length === 0) {
            // Show empty cart message
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="shop.html" class="btn">Continue Shopping</a>
                </div>
            `;
        } else {
            // Show cart items
            let cartItemsHTML = '';
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                
                cartItemsHTML += `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-product">
                            <div class="cart-product-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="cart-product-details">
                                <h3>${item.name}</h3>
                            </div>
                        </div>
                        <div class="cart-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-quantity">
                            <button class="cart-quantity-btn minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="cart-quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <div class="cart-total">$${itemTotal.toFixed(2)}</div>
                        <div class="cart-remove" data-id="${item.id}">
                            <i class="fas fa-trash-alt"></i>
                        </div>
                    </div>
                `;
            });
            
            cartItemsContainer.innerHTML = cartItemsHTML;
            
            // Add event listeners to quantity buttons and remove buttons
            const minusButtons = cartItemsContainer.querySelectorAll('.cart-quantity-btn.minus');
            const plusButtons = cartItemsContainer.querySelectorAll('.cart-quantity-btn.plus');
            const removeButtons = cartItemsContainer.querySelectorAll('.cart-remove');
            
            minusButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    const item = cart.find(item => item.id == productId);
                    if (item) {
                        updateCartItemQuantity(productId, item.quantity - 1);
                    }
                });
            });
            
            plusButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    const item = cart.find(item => item.id == productId);
                    if (item) {
                        updateCartItemQuantity(productId, item.quantity + 1);
                    }
                });
            });
            
            removeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-id');
                    removeFromCart(productId);
                });
            });
        }
    }
    
    // Update checkout page if on checkout page
    const orderItems = document.querySelector('.order-items');
    
    if (orderItems) {
        if (cart.length === 0) {
            // Redirect to cart page if cart is empty
            window.location.href = 'cart.html';
        } else {
            // Show order items
            let orderItemsHTML = '';
            
            cart.forEach(item => {
                orderItemsHTML += `
                    <div class="order-item">
                        <div class="order-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="order-item-details">
                            <h3 class="order-item-name">${item.name}</h3>
                            <div class="order-item-price">$${item.price.toFixed(2)}</div>
                        </div>
                        <div class="order-item-quantity">x${item.quantity}</div>
                    </div>
                `;
            });
            
            orderItems.innerHTML = orderItemsHTML;
        }
    }
    
    // Update subtotal, tax, and total
    const subtotal = calculateCartTotal();
    const tax = calculateTax(subtotal);
    const total = subtotal + tax;
    
    subtotalAmount.forEach(element => {
        element.textContent = `$${subtotal.toFixed(2)}`;
    });
    
    taxAmount.forEach(element => {
        element.textContent = `$${tax.toFixed(2)}`;
    });
    
    totalAmount.forEach(element => {
        element.textContent = `$${total.toFixed(2)}`;
    });
}

// Show cart notification
function showCartNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="cart-notification-content">
            <i class="fas fa-check-circle"></i>
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

// Handle sliding cart
function initSlidingCart() {
    const cartIcon = document.querySelectorAll('.cart-icon');
    const slidingCart = document.querySelector('.sliding-cart');
    const closeCartBtn = document.querySelector('.close-cart-btn');
    const overlay = document.querySelector('.overlay');
    
    if (cartIcon.length && slidingCart && closeCartBtn) {
        // Open cart when cart icon is clicked
        cartIcon.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                slidingCart.classList.add('open');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close cart when close button is clicked
        closeCartBtn.addEventListener('click', () => {
            slidingCart.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close cart when overlay is clicked
        overlay.addEventListener('click', () => {
            slidingCart.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Handle checkout form
function initCheckoutForm() {
    const checkoutForm = document.querySelector('.checkout-form');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    
    if (checkoutForm && placeOrderBtn) {
        placeOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Validate form
            const requiredFields = checkoutForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.style.borderColor = 'var(--error-color)';
                } else {
                    field.style.borderColor = 'var(--border-color)';
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Order placed successfully!');
                
                // Clear cart
                cart = [];
                saveCart();
                
                // Redirect to home page
                window.location.href = 'index.html';
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    initSlidingCart();
    initCheckoutForm();
    
    // Add event listeners to "Add to Cart" buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
            e.preventDefault();
            
            // Get product ID
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = productCard.getAttribute('data-id');
                // Assuming 'products' is defined elsewhere or fetched from an API
                const product = products.find(p => p.id == productId);
                
                if (product) {
                    addToCart(product);
                }
            }
        }
        
        // Handle add to cart button on product details page
        if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
            e.preventDefault();
            
            // Get product details from the page
            const productName = document.getElementById('detail-product-name')?.textContent || 'Premium Product';
            const productPrice = parseFloat(document.querySelector('.current-price')?.textContent.replace('$', '') || 199.99);
            const productImage = document.querySelector('.main-image img')?.src || 'https://via.placeholder.com/300x300?text=Product';
            const quantity = parseInt(document.getElementById('quantity')?.value || 1);
            
            // Create product object
            const product = {
                id: 'product-' + Date.now(), // Generate unique ID
                name: productName,
                price: productPrice,
                image: productImage
            };
            
            addToCart(product, quantity);
        }
    });
});

// Example products array (replace with your actual product data source)
const products = [
    { id: '1', name: 'Product 1', price: 20.00, image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Product 2', price: 30.00, image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Product 3', price: 40.00, image: 'https://via.placeholder.com/150' }
];