// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const menuToggleBtn = document.getElementById('menu-toggle');
const sideNav = document.querySelector('.side-nav');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const desktopNav = document.querySelector('.desktop-nav');
const mobileNav = document.querySelector('.mobile-nav');

// Theme Toggle
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    
    // Save theme preference to localStorage
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// Load saved theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    }
});

// Mobile Menu Toggle
menuToggleBtn.addEventListener('click', () => {
    sideNav.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', closeSideNav);
overlay.addEventListener('click', closeSideNav);

function closeSideNav() {
    sideNav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Hide navbar on scroll down, show on scroll up
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        desktopNav.classList.add('hidden');
        mobileNav.classList.add('hidden');
        
        // Also hide filter button if it exists
        const filterToggleBtn = document.querySelector('.filter-toggle-btn');
        if (filterToggleBtn) {
            filterToggleBtn.classList.add('hidden');
        }
    } else {
        // Scrolling up
        desktopNav.classList.remove('hidden');
        mobileNav.classList.remove('hidden');
        
        // Also show filter button if it exists
        const filterToggleBtn = document.querySelector('.filter-toggle-btn');
        if (filterToggleBtn) {
            filterToggleBtn.classList.remove('hidden');
        }
    }
    
    lastScrollTop = scrollTop;
});

// Brands Slider
const brandsContainer = document.querySelector('.brands-container');
const paginationDots = document.querySelectorAll('.pagination span');

if (brandsContainer && paginationDots.length) {
    let currentSlide = 0;
    const totalSlides = paginationDots.length;
    
    // Auto slide every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);
    
    // Click on pagination dots
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    function updateSlider() {
        // Update active dot
        paginationDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Slide the container
        brandsContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

// Add to cart functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
        e.preventDefault();
        
        // Update cart count
        const cartCounts = document.querySelectorAll('.cart-icon .count');
        cartCounts.forEach(count => {
            count.textContent = parseInt(count.textContent) + 1;
        });
        
        // Show notification (could be enhanced)
        alert('Product added to cart!');
    }
});

// Like product functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-like') || e.target.closest('.product-like')) {
        const likeBtn = e.target.classList.contains('product-like') ? e.target : e.target.closest('.product-like');
        likeBtn.classList.toggle('active');
        
        // Update wishlist count
        const wishlistCounts = document.querySelectorAll('.wishlist-icon .count');
        const isLiked = likeBtn.classList.contains('active');
        
        wishlistCounts.forEach(count => {
            count.textContent = parseInt(count.textContent) + (isLiked ? 1 : -1);
        });
    }
});

// Initialize any sliders on the page
function initializeSliders() {
    // Similar products slider
    const similarProductsContainer = document.getElementById('similar-products');
    if (similarProductsContainer) {
        const prevBtn = document.querySelector('.slider-arrow.prev');
        const nextBtn = document.querySelector('.slider-arrow.next');
        
        prevBtn.addEventListener('click', () => {
            similarProductsContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            similarProductsContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
    
    // Testimonials slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const prevTestimonialBtn = document.querySelector('.testimonial-btn.prev');
    const nextTestimonialBtn = document.querySelector('.testimonial-btn.next');
    
    if (testimonialItems.length && testimonialDots.length) {
        let currentTestimonial = 0;
        
        // Hide all testimonials except the first one
        testimonialItems.forEach((item, index) => {
            if (index !== 0) {
                item.style.display = 'none';
            }
        });
        
        // Previous testimonial
        prevTestimonialBtn?.addEventListener('click', () => {
            testimonialItems[currentTestimonial].style.display = 'none';
            testimonialDots[currentTestimonial].classList.remove('active');
            
            currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            
            testimonialItems[currentTestimonial].style.display = 'block';
            testimonialDots[currentTestimonial].classList.add('active');
        });
        
        // Next testimonial
        nextTestimonialBtn?.addEventListener('click', () => {
            testimonialItems[currentTestimonial].style.display = 'none';
            testimonialDots[currentTestimonial].classList.remove('active');
            
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            
            testimonialItems[currentTestimonial].style.display = 'block';
            testimonialDots[currentTestimonial].classList.add('active');
        });
        
        // Click on dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                testimonialItems[currentTestimonial].style.display = 'none';
                testimonialDots[currentTestimonial].classList.remove('active');
                
                currentTestimonial = index;
                
                testimonialItems[currentTestimonial].style.display = 'block';
                testimonialDots[currentTestimonial].classList.add('active');
            });
        });
    }
    
    // Sliding Cart Functionality
    const cartIcons = document.querySelectorAll('.cart-icon');
    const slidingCart = document.querySelector('.sliding-cart');
    const closeCartBtn = document.querySelector('.close-cart-btn');
    const overlay = document.querySelector('.overlay'); // Declare overlay

    if (cartIcons.length && slidingCart && closeCartBtn) {
        // Open cart when cart icon is clicked
        cartIcons.forEach(icon => {
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
            if (slidingCart.classList.contains('open')) {
                slidingCart.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSliders);