document.addEventListener('DOMContentLoaded', () => {
    const gatewayLinks = document.querySelectorAll('.gateway-side');

    gatewayLinks.forEach(link => {
		// Replace the internal logic of your click listener in gateway.js
		link.addEventListener('click', function(e) {
			e.preventDefault(); 
			const targetUrl = this.href;

			// Add selected class to the one clicked
			this.classList.add('is-selected');
			
			// Add a class to the parent/body to signal we are transitioning
			document.body.classList.add('gateway-exiting');

			// Change background color instantly to match the destination 
			// (This prevents a flash of black during the redirect)
			if (this.classList.contains('coach-side')) {
				document.body.style.backgroundColor = '#2B2333';
			} else {
				document.body.style.backgroundColor = '#0d2119';
			}

			setTimeout(() => {
				window.location.href = targetUrl;
			}, 550); // Increased slightly for a smoother "sweep"
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