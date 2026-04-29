/**
 * app.js — Sennhaus
 * Handles gateway routing, nav building, and page switching.
 */

'use strict';

/* ── Navigation config ────────────────────────────────────
   Each ecosystem defines its body class and nav link set.
   isSwitch: true  → rendered as the cross-link pill button.
──────────────────────────────────────────────────────── */
const ECOSYSTEMS = {
    photography: {
        bodyClass: 'photography-mode',
        links: [
            { text: 'Portfolio',         pageId: 'p-portfolio' },
            { text: 'Book Session',      pageId: 'p-booking'   },
            { text: 'Acting Coaching →', isSwitch: true, target: 'coaching' },
        ],
    },
    coaching: {
        bodyClass: 'coaching-mode',
        links: [
            { text: 'Training',          pageId: 'c-training'     },
            { text: 'Testimonials',      pageId: 'c-testimonials' },
            { text: 'Photography →',     isSwitch: true, target: 'photography' },
        ],
    },
};

/* ── Element refs ─────────────────────────────────────── */
const gateway    = document.getElementById('gateway');
const mainNav    = document.getElementById('mainNav');
const navContainer = document.getElementById('navContainer');

/* ── Public API ────────────────────────────────────────── */

/**
 * Slide the gateway away and enter an ecosystem (photography | coaching).
 * @param {string} eco
 */
function enterEcosystem(eco) {
    const config = ECOSYSTEMS[eco];
    if (!config) return;

    document.body.className = config.bodyClass;
    gateway.style.transform = 'translateY(-100%)';

    // Reveal nav after gateway has slid away enough to feel intentional
    setTimeout(() => {
        buildNav(eco);
        mainNav.classList.add('visible');
        showPage(config.links.find(l => !l.isSwitch)?.pageId);
    }, 500);
}

/**
 * Bring the gateway back and clear mode classes.
 */
function resetToGateway() {
    gateway.style.transform = '';
    mainNav.classList.remove('visible');
    document.body.className = '';

    // Hide all pages so they don't flash when re-entering
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
}

/**
 * Show a specific page section by ID, updating nav active state.
 * @param {string} pageId
 */
function showPage(pageId) {
    if (!pageId) return;

    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

    document.getElementById(pageId)?.classList.add('active');
    document.getElementById(`nav-${pageId}`)?.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ── Internal helpers ──────────────────────────────────── */

/**
 * Rebuild the nav link list for a given ecosystem.
 * @param {string} eco
 */
function buildNav(eco) {
    const { links } = ECOSYSTEMS[eco];

    navContainer.innerHTML = links.map(link => {
        if (link.isSwitch) {
            return `<li>
                <a href="#" class="nav-switch" onclick="enterEcosystem('${link.target}'); return false;">${link.text}</a>
            </li>`;
        }
        return `<li>
            <a href="#" id="nav-${link.pageId}" onclick="showPage('${link.pageId}'); return false;">${link.text}</a>
        </li>`;
    }).join('');
}
