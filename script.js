document.addEventListener('DOMContentLoaded', function() {
    
    // --- Код для мобильного меню ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');

    if (mobileNavToggle && mainNavList) {
        mobileNavToggle.addEventListener('click', () => {
            mainNavList.classList.toggle('is-open');
            mobileNavToggle.setAttribute('aria-expanded', mainNavList.classList.contains('is-open'));
        });
    }

    // --- Код для плавного скролла (если нужен) ---
    // (можно оставить или убрать, на меню он не влияет)
});
