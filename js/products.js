// Sample products data
const products = [
    {
        id: '1',
        name: 'Modern Minimalist Chair',
        price: 199.99,
        oldPrice: 249.99,
        discount: 20,
        image: 'https://via.placeholder.com/300x300?text=Chair',
        category: 'furniture',
        brand: 'ModernHome',
        rating: 4.5,
        description: 'A sleek, minimalist chair designed for both comfort and style. Perfect for modern living spaces.',
        features: [
            'Ergonomic design',
            'High-quality materials',
            'Easy assembly',
            'Stain-resistant fabric'
        ],
        colors: ['Black', 'White', 'Gray'],
        inStock: true
    },
    {
        id: '2',
        name: 'Premium Coffee Table',
        price: 299.99,
        oldPrice: 349.99,
        discount: 15,
        image: 'https://via.placeholder.com/300x300?text=Table',
        category: 'furniture',
        brand: 'LuxuryDesign',
        rating: 4.8,
        description: 'An elegant coffee table that combines functionality with modern aesthetics.',
        features: [
            'Solid wood construction',
            'Tempered glass top',
            'Spacious storage shelf',
            'Anti-scratch surface'
        ],
        colors: ['Walnut', 'Oak', 'Mahogany'],
        inStock: true
    },
    {
        id: '3',
        name: 'Smart LED Floor Lamp',
        price: 149.99,
        oldPrice: 179.99,
        discount: 17,
        image: 'https://via.placeholder.com/300x300?text=Lamp',
        category: 'lighting',
        brand: 'TechLight',
        rating: 4.3,
        description: 'A smart LED floor lamp with adjustable brightness and color temperature.',
        features: [
            'Voice control compatible',
            'Mobile app control',
            'Energy-efficient LED',
            'Multiple lighting modes'
        ],
        colors: ['Black', 'Silver'],
        inStock: true
    },
    {
        id: '4',
        name: 'Decorative Wall Art',
        price: 89.99,
        oldPrice: 109.99,
        discount: 18,
        image: 'https://via.placeholder.com/300x300?text=WallArt',
        category: 'decor',
        brand: 'ArtisticHome',
        rating: 4.6,
        description: 'Beautiful wall art to add character and style to any room.',
        features: [
            'High-quality canvas',
            'Fade-resistant ink',
            'Ready to hang',
            'Handcrafted frame'
        ],
        colors: ['Multi'],
        inStock: true
    },
    {
        id: '5',
        name: 'Luxury Throw Pillows (Set of 2)',
        price: 59.99,
        oldPrice: 79.99,
        discount: 25,
        image: 'https://via.placeholder.com/300x300?text=Pillows',
        category: 'decor',
        brand: 'ComfortLiving',
        rating: 4.4,
        description: 'Soft and luxurious throw pillows to add comfort and style to your sofa or bed.',
        features: [
            'Premium fabric',
            'Hypoallergenic filling',
            'Removable covers',
            'Machine washable'
        ],
        colors: ['Blue', 'Gray', 'Beige', 'Teal'],
        inStock: true
    },
    {
        id: '6',
        name: 'Modern Bookshelf',
        price: 249.99,
        oldPrice: 299.99,
        discount: 17,
        image: 'https://via.placeholder.com/300x300?text=Bookshelf',
        category: 'furniture',
        brand: 'ModernHome',
        rating: 4.7,
        description: 'A stylish and functional bookshelf with a contemporary design.',
        features: [
            'Sturdy construction',
            'Adjustable shelves',
            'Easy assembly',
            'Space-saving design'
        ],
        colors: ['White', 'Black', 'Oak'],
        inStock: true
    },
    {
        id: '7',
        name: 'Ceramic Vase Set',
        price: 79.99,
        oldPrice: 99.99,
        discount: 20,
        image: 'https://via.placeholder.com/300x300?text=Vases',
        category: 'decor',
        brand: 'ArtisticHome',
        rating: 4.2,
        description: 'A set of three ceramic vases in varying sizes for elegant home decor.',
        features: [
            'Hand-crafted ceramic',
            'Unique glazed finish',
            'Versatile design',
            'Perfect for fresh or dried flowers'
        ],
        colors: ['White', 'Blue', 'Green'],
        inStock: true
    },
    {
        id: '8',
        name: 'Smart Home Speaker',
        price: 129.99,
        oldPrice: 159.99,
        discount: 19,
        image: 'https://via.placeholder.com/300x300?text=Speaker',
        category: 'electronics',
        brand: 'TechSound',
        rating: 4.6,
        description: 'A premium smart speaker with voice control and superior sound quality.',
        features: [
            'Voice assistant built-in',
            '360° sound',
            'Multi-room audio',
            'Wireless connectivity'
        ],
        colors: ['Black', 'White', 'Gray'],
        inStock: true
    },
    {
        id: '9',
        name: 'Luxury Area Rug',
        price: 199.99,
        oldPrice: 249.99,
        discount: 20,
        image: 'https://via.placeholder.com/300x300?text=Rug',
        category: 'decor',
        brand: 'ComfortLiving',
        rating: 4.5,
        description: 'A plush area rug to add warmth and style to your living space.',
        features: [
            'Premium materials',
            'Stain-resistant',
            'Non-slip backing',
            'Easy to clean'
        ],
        colors: ['Gray', 'Beige', 'Blue', 'Red'],
        inStock: true
    },
    {
        id: '10',
        name: 'Modern Desk Lamp',
        price: 69.99,
        oldPrice: 89.99,
        discount: 22,
        image: 'https://via.placeholder.com/300x300?text=DeskLamp',
        category: 'lighting',
        brand: 'TechLight',
        rating: 4.3,
        description: 'A sleek desk lamp with adjustable arm and dimmable light.',
        features: [
            'Touch control',
            'USB charging port',
            'Multiple brightness levels',
            'Energy-efficient LED'
        ],
        colors: ['Black', 'White', 'Silver'],
        inStock: true
    },
    {
        id: '11',
        name: 'Decorative Wall Clock',
        price: 49.99,
        oldPrice: 69.99,
        discount: 29,
        image: 'https://via.placeholder.com/300x300?text=Clock',
        category: 'decor',
        brand: 'ArtisticHome',
        rating: 4.4,
        description: 'A stylish wall clock that serves as both a timepiece and wall decor.',
        features: [
            'Silent quartz movement',
            'Durable metal frame',
            'Easy to install',
            'Battery operated'
        ],
        colors: ['Black', 'Gold', 'Silver'],
        inStock: true
    },
    {
        id: '12',
        name: 'Artificial Plant',
        price: 39.99,
        oldPrice: 49.99,
        discount: 20,
        image: 'https://via.placeholder.com/300x300?text=Plant',
        category: 'decor',
        brand: 'GreenLiving',
        rating: 4.1,
        description: 'A realistic artificial plant that adds a touch of nature to your space without maintenance.',
        features: [
            'Realistic appearance',
            'No watering needed',
            'UV resistant',
            'Decorative pot included'
        ],
        colors: ['Green'],
        inStock: true
    }
];

// Mock isProductLiked function or import it from another module
// Replace this with your actual implementation or import
const isProductLiked = (productId) => {
    // This is a placeholder - replace with your actual logic
    return false;
};

// Function to render product cards
function renderProductCards(productsToRender, container) {
    if (!container) return;
    
    let html = '';
    
    productsToRender.forEach(product => {
        const isLiked = typeof isProductLiked === 'function' ? isProductLiked(product.id) : false;
        
        html += `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-actions">
                        <div class="product-action like-btn ${isLiked ? 'liked' : ''}" data-id="${product.id}">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="product-action add-to-cart" data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                        ${product.discount ? `<span class="discount">${product.discount}% OFF</span>` : ''}
                    </div>
                    <div class="product-rating">
                        ${renderStarRating(product.rating)}
                        <span class="rating-value">${product.rating}</span>
                    </div>
                    <div class="product-buttons">
                        <a href="product.html?id=${product.id}" class="btn outline">View Details</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Function to render star rating
function renderStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHtml = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (halfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>';
    }
    
    return starsHtml;
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
    // Render products on shop page
    const productsContainer = document.querySelector('.products-grid');
    if (productsContainer) {
        renderProductCards(products, productsContainer);
    }
    
    // Render featured products on home page
    const featuredProductsContainer = document.querySelector('.featured-products');
    if (featuredProductsContainer) {
        // Get 4 random products for featured section
        const featuredProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
        renderProductCards(featuredProducts, featuredProductsContainer);
    }
    
    // Handle product detail page
    const productDetailContainer = document.querySelector('.product-detail');
    if (productDetailContainer) {
        // Get product ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (productId) {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                // Update product details
                document.getElementById('detail-product-name').textContent = product.name;
                document.getElementById('detail-product-price').innerHTML = `
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                    ${product.discount ? `<span class="discount">${product.discount}% OFF</span>` : ''}
                `;
                document.getElementById('detail-product-rating').innerHTML = `
                    ${renderStarRating(product.rating)}
                    <span class="rating-value">${product.rating}</span>
                `;
                document.getElementById('detail-product-description').textContent = product.description;
                
                // Update product features
                const featuresContainer = document.getElementById('detail-product-features');
                if (featuresContainer && product.features) {
                    let featuresHtml = '<ul>';
                    product.features.forEach(feature => {
                        featuresHtml += `<li>${feature}</li>`;
                    });
                    featuresHtml += '</ul>';
                    featuresContainer.innerHTML = featuresHtml;
                }
                
                // Update product colors
                const colorsContainer = document.getElementById('detail-product-colors');
                if (colorsContainer && product.colors) {
                    let colorsHtml = '';
                    product.colors.forEach(color => {
                        colorsHtml += `<div class="color-option" data-color="${color}">${color}</div>`;
                    });
                    colorsContainer.innerHTML = colorsHtml;
                    
                    // Set first color as active
                    const firstColor = colorsContainer.querySelector('.color-option');
                    if (firstColor) {
                        firstColor.classList.add('active');
                    }
                }
                
                // Update main image
                const mainImage = document.querySelector('.main-image img');
                if (mainImage) {
                    mainImage.src = product.image;
                    mainImage.alt = product.name;
                }
                
                // Update thumbnail images (using the same image for demo)
                const thumbnailsContainer = document.querySelector('.thumbnails');
                if (thumbnailsContainer) {
                    let thumbnailsHtml = '';
                    for (let i = 0; i < 4; i++) {
                        thumbnailsHtml += `
                            <div class="thumbnail ${i === 0 ? 'active' : ''}">
                                <img src="${product.image}" alt="${product.name}">
                            </div>
                        `;
                    }
                    thumbnailsContainer.innerHTML = thumbnailsHtml;
                }
                
                // Update like button
                const likeBtn = document.querySelector('.product-detail .like-btn');
                if (likeBtn) {
                    likeBtn.setAttribute('data-id', product.id);
                    if (typeof isProductLiked === 'function' && isProductLiked(product.id)) {
                        likeBtn.classList.add('liked');
                    }
                }
                
                // Update add to cart button
                const addToCartBtn = document.querySelector('.product-detail .add-to-cart-btn');
                if (addToCartBtn) {
                    addToCartBtn.setAttribute('data-id', product.id);
                }
            }
        }
    }
});

// Export products for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products };
}