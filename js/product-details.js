// DOM Elements
const thumbnails = document.querySelectorAll('.thumbnail');
const quantityInput = document.getElementById('quantity');
const quantityBtns = document.querySelectorAll('.quantity-btn');
const colorOptions = document.querySelectorAll('.color-option');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const wishlistBtn = document.querySelector('.wishlist-btn');

// Handle thumbnail gallery
if (thumbnails.length) {
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            
            // In a real app, you would update the main image here
            // For this demo, we'll just rotate the 3D cube
            const cube = document.querySelector('.cube');
            if (cube) {
                const dataImg = thumbnail.getAttribute('data-img');
                const rotation = (parseInt(dataImg) - 1) * 90;
                cube.style.transform = `rotateY(${rotation}deg)`;
            }
        });
    });
}

// Handle quantity buttons
if (quantityInput && quantityBtns.length) {
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            
            if (btn.classList.contains('minus')) {
                // Decrease quantity, minimum 1
                quantityInput.value = Math.max(1, currentValue - 1);
            } else if (btn.classList.contains('plus')) {
                // Increase quantity, maximum 10
                quantityInput.value = Math.min(10, currentValue + 1);
            }
        });
    });
    
    // Ensure quantity is within valid range when manually entered
    quantityInput.addEventListener('change', () => {
        const value = parseInt(quantityInput.value);
        quantityInput.value = Math.max(1, Math.min(10, value));
    });
}

// Handle color options
if (colorOptions.length) {
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            colorOptions.forEach(o => o.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
        });
    });
}

// Handle tabs
if (tabBtns.length && tabPanels.length) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Handle add to cart button
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
        
        // Update cart count
        const cartCounts = document.querySelectorAll('.cart-icon .count');
        cartCounts.forEach(count => {
            count.textContent = parseInt(count.textContent) + quantity;
        });
        
        // Show notification (could be enhanced)
        alert(`${quantity} item(s) added to cart!`);
    });
}

// Handle wishlist button
if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
        wishlistBtn.classList.toggle('active');
        
        // Update icon
        const icon = wishlistBtn.querySelector('i');
        if (icon) {
            if (wishlistBtn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        }
        
        // Update wishlist count
        const wishlistCounts = document.querySelectorAll('.wishlist-icon .count');
        const isLiked = wishlistBtn.classList.contains('active');
        
        wishlistCounts.forEach(count => {
            count.textContent = parseInt(count.textContent) + (isLiked ? 1 : -1);
        });
        
        // Show notification
        alert(isLiked ? 'Added to wishlist!' : 'Removed from wishlist!');
    });
}

// 3D model rotation
const productModel = document.querySelector('.product-model');
if (productModel) {
    let isDragging = false;
    let startX, startY;
    let rotationX = 0, rotationY = 0;
    
    productModel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        rotationY += deltaX * 0.5;
        rotationX -= deltaY * 0.5;
        
        const cube = document.querySelector('.cube');
        if (cube) {
            cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        }
        
        startX = e.clientX;
        startY = e.clientY;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}