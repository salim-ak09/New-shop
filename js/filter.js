// Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const filterToggleBtn = document.querySelector('.filter-toggle-btn');
    const filterSection = document.querySelector('.filter-section');
    const closeFilterBtn = document.querySelector('.close-filter-btn');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const sortBySelect = document.getElementById('sort-by');
    const productsGrid = document.querySelector('.products-grid');
    const overlay = document.querySelector('.overlay');

    // Mock data and functions for demonstration. Replace with your actual data and functions.
    const products = [
        { id: 1, name: 'Product 1', category: 'electronics', price: 100 },
        { id: 2, name: 'Product 2', category: 'clothing', price: 50 },
        { id: 3, name: 'Product 3', category: 'electronics', price: 200 },
        { id: 4, name: 'Product 4', category: 'clothing', price: 75 },
    ];

    function displayProducts(productsToDisplay) {
        console.log('Displaying products:', productsToDisplay);
        // In a real application, this function would update the DOM to display the products.
    }

    function closeFilter() {
        filterSection.classList.remove('open');
        document.body.style.overflow = '';

        // Hide overlay if it exists
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    // Toggle filter section on mobile
    if (filterToggleBtn && filterSection && closeFilterBtn) {
        filterToggleBtn.addEventListener('click', () => {
            filterSection.classList.add('open');
            document.body.style.overflow = 'hidden';
            
            // Show overlay if it exists
            if (overlay) {
                overlay.classList.add('active');
            }
        });
        
        closeFilterBtn.addEventListener('click', () => {
            closeFilter();
        });
        
        // Close filter when clicking on overlay
        if (overlay) {
            overlay.addEventListener('click', () => {
                if (filterSection.classList.contains('open')) {
                    closeFilter();
                }
            });
        }
        
        // Close filter with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && filterSection.classList.contains('open')) {
                closeFilter();
            }
        });
        
        

    }

    // Update price range value
    if (priceRange && priceValue) {
        // Set initial value
        priceValue.textContent = `$${priceRange.value}`;
        
        priceRange.addEventListener('input', () => {
            priceValue.textContent = `$${priceRange.value}`;
        });
    }

    // Apply filters
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            // Get selected categories
            const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
                .map(input => input.value);
            
            // Get selected brands
            const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked'))
                .map(input => input.value);
            
            // Get price range
            const maxPrice = priceRange ? parseInt(priceRange.value) : 1000;
            
            // Filter products based on selections
            let filteredProducts = [...products];
            
            // Filter by category
            if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
                filteredProducts = filteredProducts.filter(product => 
                    selectedCategories.includes(product.category.toLowerCase()));
            }
            
            // Filter by brand
            if (selectedBrands.length > 0 && !selectedBrands.includes('all')) {
                // This is just a placeholder since our sample data doesn't have brands
                // filteredProducts = filteredProducts.filter(product => selectedBrands.includes(product.brand));
            }
            
            // Filter by price
            filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
            
            // Update product list
            if (typeof displayProducts === 'function') {
                displayProducts(filteredProducts);
            }
            
            // Close filter on mobile after applying
            if (window.innerWidth <= 768) {
                closeFilter();
            }
        });
    }

    // Reset filters
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            // Reset checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                if (checkbox.value === 'all') {
                    checkbox.checked = true;
                } else {
                    checkbox.checked = false;
                }
            });
            
            // Reset price range
            if (priceRange) {
                priceRange.value = 500;
                if (priceValue) {
                    priceValue.textContent = `$500`;
                }
            }
            
            // Reset sort
            if (sortBySelect) {
                sortBySelect.value = 'default';
            }
            
            // Display all products
            if (typeof displayProducts === 'function') {
                displayProducts(products);
            }
        });
    }
});