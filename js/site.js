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


// --- Smart Sticky Nav Logic ---
    let lastScrollY = window.scrollY;
    const nav = document.querySelector('nav');

    if (nav) {
        window.addEventListener('scroll', () => {
            // 1. ONLY run this on screens smaller than 900px
            if (window.innerWidth > 900) {
                nav.classList.remove('nav-hidden');
                return;
            }

            // 2. Do not hide the nav if the mobile menu overlay is currently open
            if (navLinks && navLinks.classList.contains('is-open')) return;

            const currentScrollY = window.scrollY;
            
            // If at the very top of the page, definitively show it
            if (currentScrollY <= 80) {
                nav.classList.remove('nav-hidden');
            } 
            // If scrolling down past the threshold, hide it
            else if (currentScrollY > lastScrollY) {
                nav.classList.add('nav-hidden');
            } 
            // If scrolling back up, show it
            else {
                nav.classList.remove('nav-hidden');
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
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

        // Ensure nav is visible if "Back" button is hit
        const nav = document.querySelector('nav');
        if (nav) nav.classList.remove('nav-hidden');
    }
});