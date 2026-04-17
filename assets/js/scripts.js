// Initialize Lucide Icons
lucide.createIcons();

// Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
})

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Sync ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.registerPlugin(ScrollTrigger);

// Main Animations
document.addEventListener('DOMContentLoaded', () => {

    // Hero Entrance
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.4 } });

    heroTl.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        clearProps: "all"
    })
    .from("#photo-frame", {
        scale: 0.9,
        y: 40,
        opacity: 0,
        duration: 1.8,
        ease: "expo.out"
    }, "-=1")
    .from(".parallax-el", {
        scale: 0.5,
        opacity: 0,
        stagger: 0.2,
        duration: 2,
        ease: "elastic.out(1, 0.5)"
    }, "-=1.2");

    // Mouse Interaction (Tilt & Parallax)
    const mainArea = document.querySelector('main');
    const tiltCard = document.getElementById('tilt-container');
    const parallaxItems = document.querySelectorAll('.parallax-el');

    if (mainArea && tiltCard) {
        mainArea.addEventListener('mousemove', (e) => {
            const rect = mainArea.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width * 2 - 1;
            const y = (e.clientY - rect.top) / rect.height * 2 - 1;

            gsap.to(tiltCard, {
                rotationY: x * 6,
                rotationX: -y * 6,
                duration: 1,
                ease: "power2.out",
                overwrite: "auto"
            });

            parallaxItems.forEach(el => {
                const depth = parseFloat(el.getAttribute('data-speed')) || 0.05;
                gsap.to(el, {
                    x: -x * (depth * 100),
                    y: -y * (depth * 100),
                    duration: 1.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });
        });

        mainArea.addEventListener('mouseleave', () => {
            gsap.to(tiltCard, { rotationY: 0, rotationX: 0, duration: 2, ease: "elastic.out(1, 0.3)" });
            parallaxItems.forEach(el => gsap.to(el, { x: 0, y: 0, duration: 2, ease: "power2.out" }));
        });
    }

    // Typewriter Logic
    const typewriterElement = document.getElementById('typewriter');
    const words = ["carreiras.", "resultados.", "vidas."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typeSpeed = 50;
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeSpeed = 150;
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    // About Section Animations
    gsap.from(".about-visual", {
        scrollTrigger: {
            trigger: "#sobre",
            start: "top 80%",
            once: true
        },
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        clearProps: "all"
    });

    gsap.from(".about-content > *", {
        scrollTrigger: {
            trigger: "#sobre",
            start: "top 80%",
            once: true
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all"
    });

    gsap.from(".about-cards > *", {
        scrollTrigger: {
            trigger: ".about-cards",
            start: "top 95%",
            once: true
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
    });

    // Mobile Menu Logic
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenBtn = document.getElementById('menu-open');
    const menuCloseBtn = document.getElementById('menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const menuTl = gsap.timeline({ paused: true });

    menuTl.to(mobileMenu, {
        display: 'block',
        duration: 0
    })
    .fromTo(mobileMenu.querySelector('.absolute'), {
        opacity: 0,
        y: -20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
    })
    .from(mobileLinks, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power4.out"
    }, "-=0.2");

    function openMenu() {
        menuTl.play();
        lenis.stop();
    }

    function closeMenu() {
        menuTl.reverse();
        lenis.start();
    }

    menuOpenBtn?.addEventListener('click', openMenu);
    menuCloseBtn?.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Projects Section Animations
    gsap.from(".titulo-projetos", {
        scrollTrigger: {
            trigger: "#projetos",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "all"
    });

    gsap.from(".project-cards > a", {
        scrollTrigger: {
            trigger: ".project-cards",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
    });

    // Footer Animations
    gsap.from(".footer-content", {
        scrollTrigger: {
            trigger: "#contato",
            start: "top 85%",
            once: true
        },
        y: 40,
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        clearProps: "all"
    });

    // Safety Trigger: Ensure everything is visible if animations hang
    setTimeout(() => {
        gsap.set([".about-cards", ".project-cards", ".footer-content"], { opacity: 1, visibility: "visible" });
    }, 3000);

    // Refresh Lucide Icons (critical for dynamic content)
    lucide.createIcons();

    // Refresh ScrollTrigger on resize or after entrance
    ScrollTrigger.refresh();

    // Start typewriter after a delay (matching hero entrance)
    setTimeout(type, 2000);
});
