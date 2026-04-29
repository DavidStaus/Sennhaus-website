/**
 * gateway.js — Sennhaus
 */

document.querySelectorAll('.gateway-side').forEach(side => {
    const href = side.getAttribute('href');

    // 1. PRE-FLIGHT (Only if we aren't opening files directly from the computer)
    side.addEventListener('mouseenter', () => {
        if (window.location.protocol === 'file:') return; 
        
        if (!window.preloadedPages) window.preloadedPages = {};
        if (!window.preloadedPages[href]) {
            fetch(href)
                .then(res => res.text())
                .then(html => { window.preloadedPages[href] = html; })
                .catch(() => {}); // Silently ignore preload errors
        }
    });

    // 2. THE TRANSITION
    side.addEventListener('click', async (e) => {
        e.preventDefault();

        // FALLBACK 1: Old browsers or Local File System (file://)
        if (!document.startViewTransition || window.location.protocol === 'file:') {
            window.location.href = href;
            return;
        }

        try {
            // Try to get the HTML
            let htmlString = window.preloadedPages && window.preloadedPages[href];
            if (!htmlString) {
                const response = await fetch(href);
                if (!response.ok) throw new Error('Fetch failed');
                htmlString = await response.text();
            }

            const parser = new DOMParser();
            const newDoc = parser.parseFromString(htmlString, 'text/html');

            // Trigger the cinematic View Transition API
            document.startViewTransition(() => {
                document.title = newDoc.title;
                document.body.innerHTML = newDoc.body.innerHTML;
                document.body.className = newDoc.body.className;
                
                // CRITICAL: Update the URL in the browser!
                window.history.pushState({}, '', href);
                
                window.scrollTo(0, 0);
            });
            
        } catch (error) {
            // FALLBACK 2: If the fetch fails for ANY reason, jump normally.
            window.location.href = href;
        }
    });
});

// Fix for hitting the "Back" button in the browser
window.addEventListener('popstate', () => {
    window.location.reload();
});