// 3D Product Card Effects
document.addEventListener('DOMContentLoaded', function() {
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    
    // Add event listeners to each card
    productCards.forEach(card => {
        // Mouse move event for 3D effect
        card.addEventListener('mousemove', handleMouseMove);
        
        // Mouse leave event to reset
        card.addEventListener('mouseleave', handleMouseLeave);
        
        // Touch events for mobile
        card.addEventListener('touchmove', handleTouchMove);
        card.addEventListener('touchend', handleMouseLeave);
    });
    
    // Handle mouse movement
    function handleMouseMove(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to card
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        
        // Calculate percentage position
        const xPercent = x / cardRect.width;
        const yPercent = y / cardRect.height;
        
        // Calculate rotation (max 5 degrees)
        const rotateY = (xPercent - 0.5) * 5;
        const rotateX = (0.5 - yPercent) * 5;
        
        // Apply rotation and translation
        card.style.transform = `
            translateY(-5px)
            translateZ(10px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
        
        // Update radial gradient position for shine effect
        card.style.setProperty('--x', `${xPercent * 100}%`);
        card.style.setProperty('--y', `${yPercent * 100}%`);
        
        // Add depth to product image
        const image = card.querySelector('.product-image img');
        if (image) {
            image.style.transform = `
                scale(1.15)
                translateX(${(xPercent - 0.5) * -10}px)
                translateY(${(yPercent - 0.5) * -10}px)
            `;
        }
        
        // Add depth to buttons
        const buttons = card.querySelectorAll('.product-buttons .btn');
        buttons.forEach(button => {
            const buttonRect = button.getBoundingClientRect();
            const buttonX = e.clientX - buttonRect.left;
            const buttonY = e.clientY - buttonRect.top;
            const buttonXPercent = buttonX / buttonRect.width;
            const buttonYPercent = buttonY / buttonRect.height;
            
            const distance = Math.sqrt(
                Math.pow(buttonXPercent - 0.5, 2) + 
                Math.pow(buttonYPercent - 0.5, 2)
            );
            
            if (distance < 0.5) {
                button.style.transform = `translateY(-3px) scale(${1 + (0.5 - distance) * 0.1})`;
            } else {
                button.style.transform = '';
            }
        });
    }
    
    // Handle touch movement
    function handleTouchMove(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const card = this;
            const cardRect = card.getBoundingClientRect();
            
            // Calculate touch position relative to card
            const x = touch.clientX - cardRect.left;
            const y = touch.clientY - cardRect.top;
            
            // Calculate percentage position
            const xPercent = x / cardRect.width;
            const yPercent = y / cardRect.height;
            
            // Calculate rotation (max 3 degrees for touch - less than mouse)
            const rotateY = (xPercent - 0.5) * 3;
            const rotateX = (0.5 - yPercent) * 3;
            
            // Apply rotation and translation
            card.style.transform = `
                translateY(-5px)
                translateZ(10px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
            
            // Update radial gradient position
            card.style.setProperty('--x', `${xPercent * 100}%`);
            card.style.setProperty('--y', `${yPercent * 100}%`);
        }
    }
    
    // Handle mouse leave
    function handleMouseLeave() {
        const card = this;
        
        // Reset card transform
        card.style.transform = '';
        
        // Reset image transform
        const image = card.querySelector('.product-image img');
        if (image) {
            image.style.transform = '';
        }
        
        // Reset button transforms
        const buttons = card.querySelectorAll('.product-buttons .btn');
        buttons.forEach(button => {
            button.style.transform = '';
        });
    }
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.product-buttons .btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});