// Typewriter effect
const typeTextSpan = document.getElementById('typed-text');
const typeWriterTexts = ['Senior Engineer @ Atlassian', 'AI & Data Architect', 'Open Source Contributor'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = typeWriterTexts[textIndex];
    let speed;

    if (isDeleting) {
        charIndex--;
        speed = 50;
    } else {
        charIndex++;
        speed = 100;
    }
    typeTextSpan.textContent = currentText.substring(0, charIndex);

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        speed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typeWriterTexts.length;
        speed = 500;
    }

    setTimeout(typeWriter, speed);
}

typeWriter();

// Scroll progress bar
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = `${scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0}%`;
});

// Scroll-spy nav highlight
const navSectionKeys = ['hero', 'profile', 'skills', 'experience', 'education', 'contact'];
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let active = null;
    navSectionKeys.forEach((key) => {
        const el = document.getElementById(key);
        if (el && el.getBoundingClientRect().top - window.innerHeight * 0.4 <= 0) {
            active = key;
        }
    });
    navLinks.forEach((link) => {
        if (link.dataset.nav === active) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Animated stat counters (start once the hero is in view)
const statEls = document.querySelectorAll('.stat-value');
let countersStarted = false;

function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;
    statEls.forEach((el, i) => {
        const target = Number(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let count = 0;
        const step = () => {
            count = Math.min(count + Math.max(target / 50, 1), target);
            el.textContent = `${Math.ceil(count)}${suffix}`;
            if (count < target) setTimeout(step, 20);
        };
        setTimeout(step, 300 + i * 150);
    });
}

// Scroll-reveal for sections (and staggered experience rows)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
            entry.target.classList.add('is-visible');
            if (entry.target.id === 'hero') animateCounters();
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

navSectionKeys.forEach((key) => {
    const el = document.getElementById(key);
    if (el) revealObserver.observe(el);
});
