import 'normalize.css';
import '../styles/main.scss';
import { Typer } from './lib/typer.js';

document.addEventListener('DOMContentLoaded', () => {

    // 1. Year Update
    const date = new Date();
    const thisYear = date.getFullYear();
    const yearEl = document.querySelector('.js-year');
    if (yearEl) yearEl.textContent = thisYear;

    // 2. Typer
    const typerEls = document.querySelectorAll('[data-typer-targets]');
    typerEls.forEach(el => new Typer(el));

    // 3. Parallax (Plax replacement)
    const introImage = document.querySelector('.intro-image');
    const introImage2 = document.querySelector('.intro-image-2');
    const introImage3 = document.querySelector('.intro-image-3');
    const parallaxImages = [
        { el: introImage, xRange: 10, yRange: 20 },
        { el: introImage2, xRange: 7, yRange: 10 },
        { el: introImage3, xRange: 10, yRange: 15 }
    ];

    if (introImage && window.matchMedia('(hover: hover)').matches) {
        document.body.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            const w = window.innerWidth;
            const h = window.innerHeight;

            parallaxImages.forEach(item => {
                if (!item.el) return;
                const xVal = ((x - w / 2) / (w / 2)) * item.xRange;
                const yVal = ((y - h / 2) / (h / 2)) * item.yRange;
                item.el.style.transform = `translate3d(${xVal}px, ${yVal}px, 0)`;
            });
        });
    }

    // 4. Header Scroller (Fade/Parallax on scroll)
    const introHeader = document.querySelector('.js-intro-header');
    if (introHeader) {
        window.addEventListener('scroll', () => {
            const elHeight = introHeader.offsetHeight;
            const pos = window.scrollY;
            const parallax = Math.floor(pos * -0.3);
            const fadeUntil = elHeight / 1.2;

            let opacity = 0;
            if (pos <= 0) opacity = 1; // Start full opacity
            else if (pos <= fadeUntil) opacity = 1 - pos / fadeUntil;

            introHeader.style.marginTop = `${parallax}px`;
            introHeader.style.opacity = opacity;
        });
    }

    // 5. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only if same path/hostname (simplified for single page portfolio)
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId) || document.getElementsByName(targetId)[0];

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Fade In Elements (IntersectionObserver)
    const fadeElements = document.querySelectorAll('.js-fadeInElement');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px" // Trigger slightly before bottom
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                entry.target.classList.remove('fadeOut');
            } else {
                // Optional: fade out when leaving view, mimicking original behavior?
                // Original checked distance < 0 which means top of element passed top of window?
                // Usually for these reveal animations we only fade IN once. 
                // But let's keep it simple: if strict legacy behavior needed, we'd need more logic.
                // For now, let's sticky with fade IN only which is better UX.
                // If double binding needed:
                // entry.target.classList.remove('fadeIn');
                // entry.target.classList.add('fadeOut');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.classList.add('fadeOut'); // Initial state
        observer.observe(el);
    });

    // 7. Retina Logic
    const pixelRatio = window.devicePixelRatio || 1;
    if (pixelRatio > 1) {
        document.querySelectorAll('img[data-src2x]').forEach(img => {
            img.setAttribute('data-src-orig', img.getAttribute('src'));
            img.setAttribute('src', img.getAttribute('data-src2x'));
        });
    }

    // 8. BG Parallax (Simple vertical parallax)
    const plxWindow = document.getElementById('js-parallax-window');
    const plxBackground = document.getElementById('js-parallax-background');
    if (plxWindow && plxBackground) {
        window.addEventListener('scroll', () => {
            const plxWindowTop = plxWindow.getBoundingClientRect().top + window.scrollY;
            const windowScroll = window.scrollY;
            const windowTopToPlx = plxWindowTop - windowScroll;
            const plxSpeed = 0.35;

            // Logic derived from original: top = -(diff * speed)
            // If windowTopToPlx is the distance from viewport top to element top.
            plxBackground.style.top = `${-(windowTopToPlx * plxSpeed)}px`;
        });
    }

});

