document.addEventListener('DOMContentLoaded', function() {

    // --- ЛОГИКА ДЛЯ МОБИЛЬНОГО МЕНЮ ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');
    const dropdowns = document.querySelectorAll('.main-nav .dropdown');

    if (mobileNavToggle && mainNavList) {
        mobileNavToggle.addEventListener('click', () => {
            mainNavList.classList.toggle('is-open');
            mobileNavToggle.classList.toggle('is-active');
            const isOpen = mainNavList.classList.contains('is-open');
            mobileNavToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a:first-child');
        
        link.addEventListener('click', (e) => {
            const submenu = dropdown.querySelector('.dropdown-menu');
            if (window.innerWidth <= 992 && submenu) {
                e.preventDefault();
                dropdown.classList.toggle('is-open');
            }
        });
    });

    // --- ЛОГИКА ДЛЯ ОПРЕДЕЛЕНИЯ ЯЗЫКА ---
    const languageSwitcher = document.querySelector('.current-lang');
    if (languageSwitcher) {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        const parts = filename.split('.');
        let langCode = 'EN';
        if (parts.length === 3 && parts[0] !== '' && parts[1].length === 2) {
             langCode = parts[1];
        }
        languageSwitcher.textContent = langCode.toUpperCase();
    }
});
