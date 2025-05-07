// DOM Elements
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevTestimonialBtn = document.querySelector('.testimonial-btn.prev');
const nextTestimonialBtn = document.querySelector('.testimonial-btn.next');

// Handle testimonials slider
if (testimonialItems.length && testimonialDots.length) {
    let currentTestimonial = 0;
    
    // Hide all testimonials except the first one
    testimonialItems.forEach((item, index) => {
        if (index !== 0) {
            item.style.display = 'none';
        }
    });
    
    // Previous testimonial
    prevTestimonialBtn.addEventListener('click', () => {
        testimonialItems[currentTestimonial].style.display = 'none';
        testimonialDots[currentTestimonial].classList.remove('active');
        
        currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
        
        testimonialItems[currentTestimonial].style.display = 'block';
        testimonialDots[currentTestimonial].classList.add('active');
    });
    
    // Next testimonial
    nextTestimonialBtn.addEventListener('click', () => {
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
    
    // Auto slide every 5 seconds
    setInterval(() => {
        testimonialItems[currentTestimonial].style.display = 'none';
        testimonialDots[currentTestimonial].classList.remove('active');
        
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        
        testimonialItems[currentTestimonial].style.display = 'block';
        testimonialDots[currentTestimonial].classList.add('active');
    }, 5000);
}

// Handle contact form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real app, this would submit the form data
        alert('Message sent successfully!');
        contactForm.reset();
    });
}

// 3D sphere animation
const sphere = document.querySelector('.sphere');
if (sphere) {
    let rotationX = 0, rotationY = 0;
    
    // Make the sphere interactive
    sphere.addEventListener('mousemove', (e) => {
        const rect = sphere.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        rotationX = (e.clientY - centerY) / 10;
        rotationY = (e.clientX - centerX) / 10;
        
        sphere.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    });
    
    // Reset rotation when mouse leaves
    sphere.addEventListener('mouseleave', () => {
        sphere.style.transform = '';
    });
}

// Animate sections on scroll
const animateSections = () => {
    const sections = document.querySelectorAll('.about-section, .team-section, .testimonials-section, .contact-section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about-section, .team-section, .testimonials-section, .contact-section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation on initial load
    animateSections();
});

// Listen for scroll events
window.addEventListener('scroll', animateSections);