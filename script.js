document.addEventListener('DOMContentLoaded', function() {

    // === БЛОК 1: МОБИЛЬНОЕ МЕНЮ ===
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');
    const dropdowns = document.querySelectorAll('.main-nav .dropdown');

    // Открытие/закрытие основного мобильного меню
    if (mobileNavToggle && mainNavList) {
        mobileNavToggle.addEventListener('click', () => {
            mainNavList.classList.toggle('is-open');
            mobileNavToggle.classList.toggle('is-active');
        });
    }

    // Открытие/закрытие подменю в МОБИЛЬНОЙ ВЕРСИИ ("Платформы")
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a:first-child');
        link.addEventListener('click', (e) => {
            // Эта логика применяется только на мобильных устройствах
            if (window.innerWidth <= 992) {
                const submenu = dropdown.querySelector('.dropdown-menu');
                if (submenu) {
                    e.preventDefault();
                    dropdown.classList.toggle('is-open');
                }
            }
        });
    });

    // === БЛОК 2: УПРАВЛЕНИЕ HOVER-ЭФФЕКТОМ "ПЛАТФОРМЫ" НА ДЕСКТОПЕ ===
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            if (window.innerWidth > 992) {
                this.classList.add('hover-off');
            }
        });

        dropdown.addEventListener('mouseleave', function() {
            this.classList.remove('hover-off');
        });
    });

    // === БЛОК 3: ОПРЕДЕЛЕНИЕ ЯЗЫКА ===
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
