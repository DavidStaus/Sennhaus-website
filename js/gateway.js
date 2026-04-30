document.addEventListener('DOMContentLoaded', () => {
    const gatewayLinks = document.querySelectorAll('.gateway-side');

    gatewayLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const targetUrl = this.href;

            this.classList.add('is-selected');

            // Change background color instantly to match the destination
            if (this.classList.contains('coach-side')) {
                document.body.style.backgroundColor = '#2B2333';
            } else {
                document.body.style.backgroundColor = '#0d2119';
            }

            document.body.classList.add('gateway-exiting');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 350); 
        });
    });
});

window.addEventListener('pageshow', (event) => {
    // Reset body classes
    document.body.classList.remove('gateway-exiting', 'exit-to-photo', 'exit-to-coach');
    
    // Reset the panels
    const gatewayLinks = document.querySelectorAll('.gateway-side');
    gatewayLinks.forEach(link => {
        link.classList.remove('is-selected');
    });

    // Reset inline styles if any were applied by previous JS
    document.body.style.backgroundColor = ''; 
});