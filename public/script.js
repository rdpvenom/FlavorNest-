document.addEventListener('DOMContentLoaded', () => {

    /* Mobile Nav */
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('siteNav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            nav.classList.toggle('open');
        });
        nav.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
            toggle.classList.remove('open'); nav.classList.remove('open');
        }));
        document.addEventListener('click', e => {
            if (!toggle.contains(e.target) && !nav.contains(e.target)) {
                toggle.classList.remove('open'); nav.classList.remove('open');
            }
        });
    }

    /* Scroll Reveal */
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.entry, .coll-card, .hero-pill').forEach(el => {
        el.classList.add('hide-up'); io.observe(el);
    });

    const s = document.createElement('style');
    s.textContent = `.hide-up{opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s ease}.show{opacity:1!important;transform:translateY(0)!important}`;
    document.head.appendChild(s);

    /* Header shadow + auto-hide */
    const hd = document.getElementById('siteHd');
    if (hd) {
        let ly = 0;
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            hd.style.boxShadow = y > 30 ? '0 2px 20px rgba(0,0,0,.05)' : 'none';
            hd.style.transform = y > 500 && y > ly ? 'translateY(-100%)' : 'translateY(0)';
            hd.style.transition = 'transform .35s ease,box-shadow .3s ease';
            ly = y;
        }, { passive: true });
    }

    /* Smooth scroll */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const t = document.querySelector(this.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });
});