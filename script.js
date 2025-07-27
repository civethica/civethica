document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================================
    // ==== КОД ДЛЯ МОБИЛЬНОГО МЕНЮ (ДОБАВИТЬ СЮДА) ======
    // ========================================================
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');

    if (mobileNavToggle && mainNavList) { // Проверка, что элементы существуют
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = mainNavList.classList.toggle('is-open');
            mobileNavToggle.setAttribute('aria-expanded', isOpen);
        });
    }
    // ========================================================


    // Этот скрипт нужен только для плавного скролла по якорям, если они есть.
    // На многостраничном сайте он не будет мешать переходам на другие страницы.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
