document.addEventListener('DOMContentLoaded', () => {
    const gatewayLinks = document.querySelectorAll('.gateway-side');

    gatewayLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 1. Stop the browser from instantly changing the page
            e.preventDefault(); 
            
            const targetUrl = this.href;

            // 2. Trigger the CSS exit animation
            document.body.classList.add('gateway-exiting');

            // 3. Wait for the animation to finish, then go to the new page
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 350); 
        });
    });
});

/* 
 * Crucial UX Fix: Safari/Firefox "Back Button" cache (BFCache)
 * If the user clicks "Back" to return to the gateway, the browser might load the 
 * page in its exiting state (opacity: 0). This removes the class if loaded from cache.
 */
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('gateway-exiting');
    }
});