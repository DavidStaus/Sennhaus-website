document.addEventListener('DOMContentLoaded', () => {
    // Target the main SENNHAUS logo link
    const logoLink = document.querySelector('.nav-logo');

    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            // Only trigger the animation if the link goes to the index/gateway
            if (this.getAttribute('href').includes('index.html')) {
                e.preventDefault(); 
                
                const targetUrl = this.href;

                // Trigger the reverse CSS exit animation
                document.body.classList.add('site-exiting');

                // Wait for the animation to finish, then go to the gateway
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 350); 
            }
        });
    }
});

/* Safari/Firefox BFCache Fix */
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('site-exiting');
    }
});