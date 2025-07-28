document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');
    const dropdowns = document.querySelectorAll('.main-nav .dropdown');

    // Переключение основного мобильного меню
    if (mobileNavToggle && mainNavList) {
        mobileNavToggle.addEventListener('click', () => {
            // Переключаем класс для показа/скрытия меню
            mainNavList.classList.toggle('is-open');
            
            // Переключаем класс для анимации кнопки (гамбургер -> крестик)
            mobileNavToggle.classList.toggle('is-active');

            // Устанавливаем ARIA атрибут для доступности
            const isOpen = mainNavList.classList.contains('is-open');
            mobileNavToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // Обработка выпадающих меню для мобильных устройств
    if (window.innerWidth <= 992) {
        dropdowns.forEach(dropdown => {
            // Используем именно первый дочерний 'a' элемент
            const link = dropdown.querySelector('a'); 
            
            link.addEventListener('click', (e) => {
                // Предотвращаем переход по ссылке, если у нее есть подменю
                const submenu = dropdown.querySelector('.dropdown-menu');
                if (submenu) {
                    e.preventDefault();
                    dropdown.classList.toggle('is-open');
                }
            });
        });
    }
});
