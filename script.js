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

const quoteReferenceForm = document.querySelector('.quote-reference-form');

if (quoteReferenceForm) {
    quoteReferenceForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(quoteReferenceForm);

        if (formData.get('_honey')) {
            return;
        }

        const recipient = quoteReferenceForm.dataset.recipient || 'cneal2@farmersagent.com';
        const name = String(formData.get('Name') || '').trim();
        const email = String(formData.get('Email') || '').trim();
        const phone = String(formData.get('Phone') || '').trim();
        const coverage = [];
        const textConsent = [];

        if (formData.get('Coverage - Home')) {
            coverage.push('Home');
        }

        if (formData.get('Coverage - Auto')) {
            coverage.push('Auto');
        }

        if (formData.get('Marketing text messages')) {
            textConsent.push('Marketing text messages');
        }

        if (formData.get('Non-marketing text messages')) {
            textConsent.push('Non-marketing text messages');
        }

        const subjectName = name || 'Website Visitor';
        const subject = `Contact Request from ${subjectName} - Carlos Neal Website`;
        const bodyLines = [
            'New contact request from the Carlos Neal website.',
            '',
            `Name: ${name || 'Not provided'}`,
            `Email: ${email || 'Not provided'}`,
            `Phone: ${phone || 'Not provided'}`,
            `Coverage: ${coverage.length ? coverage.join(', ') : 'Not selected'}`,
            `SMS Consent: ${textConsent.length ? textConsent.join(', ') : 'Not selected'}`,
            '',
            'Consent language shown on form:',
            'By checking the box below and clicking the send button, I expressly consent by electronic signature to receive communications via text message from this website or their agents at the telephone number above (even if my number is currently listed on any state, federal, local, or corporate Do Not Call list) including my wireless number if provided, for the purpose of receiving information on insurance products and services. Carrier message and data rates may apply: 10 messages/mo. Reply HELP for help. Reply STOP to opt out. I understand that my consent is not required as a condition of purchasing any goods or services and that I may revoke my consent at any time. I also acknowledge that I have read and agree to the Privacy Policy and Terms & Conditions. For help or additional info contact cneal2@farmersagent.com',
            '',
            `Submitted: ${new Date().toLocaleString()}`
        ];

        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\r\n'))}`;
    });
}
