document.addEventListener('DOMContentLoaded', () => {
    
    // Existing Logo Exit Animation
    const logoLink = document.querySelector('.nav-logo');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            const url = new URL(this.href, location.href);
            if (url.pathname.endsWith('index.html') || url.pathname.endsWith('/')) {
                e.preventDefault();
                document.body.classList.add('site-exiting');
                setTimeout(() => { window.location.href = this.href; }, 350);
            }
        });
    }

    // NEW: Mobile Menu Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Check semantic state
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle Accessibility & Classes
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('is-open');
            
            // Lock body scrolling when menu is open
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });
    }
});

// BFCache safety
window.addEventListener('pageshow', (event) => {
    if (event.persisted) { 
        document.body.classList.remove('site-exiting'); 
        document.body.style.overflow = '';
        
        // Reset menu state if user hits "Back" button
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navLinks) navLinks.classList.remove('is-open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
});