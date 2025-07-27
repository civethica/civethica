document.addEventListener('DOMContentLoaded', function() {
    
    // --- Код для мобильного меню ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');

    if (mobileNavToggle && mainNavList) {
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = mainNavList.classList.toggle('is-open');
            mobileNavToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // --- Код для открытия подменю по клику на мобильных ---
    const dropdownToggle = document.querySelector('.main-nav .dropdown > a');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            // Проверяем, открыто ли мобильное меню
            if (mainNavList.classList.contains('is-open')) {
                e.preventDefault(); // Предотвращаем переход по ссылке '#'
                this.parentElement.classList.toggle('submenu-open');
            }
        });
    }

    // --- Код для плавного скролла (без изменений) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
