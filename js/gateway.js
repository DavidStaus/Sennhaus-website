document.addEventListener('DOMContentLoaded', () => {
    const gatewayLinks = document.querySelectorAll('.gateway-side');

    gatewayLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const targetUrl = this.href;

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
    if (event.persisted) {
        document.body.classList.remove('gateway-exiting');
        document.body.style.backgroundColor = ''; 
    }
});