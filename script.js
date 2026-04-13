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

    // Code for the Product Detail Page: Size Selection
    const sizeBtns = document.querySelectorAll('.size-btn');
    if (sizeBtns.length > 0) {
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all
                sizeBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');
            });
        });
    }

    // Modal Logic
    const buyBtns = document.querySelectorAll('.add-to-bag');
    const modal = document.getElementById('order-modal');
    
    if (modal) {
        const closeBtn = document.getElementById('close-modal');
        const form = document.getElementById('order-form');

        // Open Modal
        buyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });
        });

        // Close Modal via button
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close when clicking outside the modal box
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Handle Submission with FormSubmit API
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('.primary-button');
            const originalText = btn.innerText;
            btn.innerText = 'Processing...';

            // Gather the extra data (Size, Date, Product Name)
            const activeSize = document.querySelector('.size-btn.active');
            const sizeValue = activeSize ? activeSize.innerText : 'Unknown';
            const productName = document.querySelector('.heading-1').innerText;
            
            // Compile payload
            const formData = new FormData(form);
            formData.append('Product', productName);
            formData.append('Size', sizeValue);
            formData.append('Date_Time', new Date().toLocaleString());

            // Send to FormSubmit via AJAX so page doesn't refresh
            // We use the generated secure token so your real email isn't visible in the code!
            fetch("https://formsubmit.co/ajax/6198545db3d252d0fce3c71de91e8f7d", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Success Animation
                btn.innerText = 'Order Confirmed! ✓';
                btn.style.backgroundColor = '#34c759'; // Apple's success green
                
                setTimeout(() => {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.backgroundColor = ''; // Restore CSS default
                        form.reset(); // Clear inputs
                    }, 400);
                }, 2000); // Close after 2 seconds
            })
            .catch(error => {
                console.log(error);
                btn.innerText = 'Network Error. Try again.';
                setTimeout(() => { btn.innerText = originalText; }, 3000);
            });
        });
    }
});
