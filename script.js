const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
    const setMenuState = (isOpen) => {
        siteNav.classList.toggle('is-open', isOpen);
        menuToggle.classList.toggle('is-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
    };

    menuToggle.addEventListener('click', () => {
        setMenuState(!siteNav.classList.contains('is-open'));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            setMenuState(false);
        });
    });

    document.addEventListener('click', (event) => {
        if (!siteNav.classList.contains('is-open')) {
            return;
        }

        if (siteNav.contains(event.target) || menuToggle.contains(event.target)) {
            return;
        }

        setMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenuState(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            setMenuState(false);
        }
    });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}

const currentYear = document.getElementById('currentYear');

if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}

const today = new Date().getDay();
const todayRow = document.querySelector(`.hours-row[data-day="${today}"]`);

if (todayRow) {
    todayRow.classList.add('is-today');
}
