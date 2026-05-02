document.addEventListener('DOMContentLoaded', () => {
    const logoLink = document.querySelector('.nav-logo');

    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            const url = new URL(this.href, location.href);
            const isGateway = url.pathname.endsWith('index.html') || url.pathname.endsWith('/');

            if (isGateway) {
                e.preventDefault();
                document.body.classList.add('site-exiting');
                setTimeout(() => { window.location.href = this.href; }, 350);
            }
        });
    }
});

// BFCache: prevent stale exit-animation class when navigating back
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('site-exiting');
    }
});
