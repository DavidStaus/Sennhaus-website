/**
 * gateway.js — Sennhaus
 *
 * The only JS on the site. Plays the gateway slide-out animation
 * before following the link, so the transition feels cinematic
 * rather than an instant page jump.
 *
 * If JS is disabled, the <a href> links work normally — no broken state.
 */

document.querySelectorAll('.gateway-side').forEach(side => {
    side.addEventListener('click', e => {
        e.preventDefault();
        const href = side.getAttribute('href');

        // Slide the gateway up, then navigate
        const gateway = document.getElementById('gateway');
        gateway.style.transition = 'transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)';
        gateway.style.transform  = 'translateY(-100%)';

        setTimeout(() => { window.location.href = href; }, 900);
    });
});
