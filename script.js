// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Elegant entrance animation on load
    const animateElements = document.querySelectorAll('.animate-up');
    
    // Initial setup
    animateElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });

    // Subtly stagger the animations
    requestAnimationFrame(() => {
        animateElements.forEach((el, index) => {
            el.style.transition = `opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)`;
            el.style.transitionDelay = `${index * 0.12}s`;
            
            // Trigger animation
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 50);
        });
    });

    // Optional: Subtle Parallax Effect for the Navigation visually blurring
    document.addEventListener('scroll', () => {
        const nav = document.querySelector('.global-nav');
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
});
