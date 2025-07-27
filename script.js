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

    // --- Код для плавного скролла по якорям (если есть на странице) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Проверяем, действительно ли это ссылка на якорь, а не просто "#"
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
