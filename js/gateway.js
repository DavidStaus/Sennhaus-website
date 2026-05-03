document.addEventListener('DOMContentLoaded', () => {
    const gatewayLinks = document.querySelectorAll('.gateway-side');
    gatewayLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.href;
            this.classList.add('is-selected');
            document.body.classList.add('gateway-exiting');
            document.body.style.backgroundColor = this.classList.contains('coach-side') ? '#2B2333' : '#0d2119';
            setTimeout(() => { window.location.href = targetUrl; }, 550);
        });
    });
});
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('gateway-exiting');
        document.body.style.backgroundColor = '';
        document.querySelectorAll('.gateway-side').forEach(link => { link.classList.remove('is-selected'); });
    }
});
