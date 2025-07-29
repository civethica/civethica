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
                // Если у этого пункта есть подменю, мы отменяем переход по ссылке
                // и просто показываем/скрываем это подменю.
                if (submenu) {
                    e.preventDefault();
                    dropdown.classList.toggle('is-open');
                }
            }
        });
    });

    // === ДОБАВЛЕННЫЙ БЛОК: УПРАВЛЕНИЕ HOVER-ЭФФЕКТОМ ДЛЯ ДЕСКТОПА ===
    // Этот код применяется ко всем выпадающим меню, включая "Платформы"
    dropdowns.forEach(dropdown => {
        // Когда мы кликаем на родительский пункт меню
        dropdown.addEventListener('click', function() {
            // Выполняем это действие ТОЛЬКО на больших экранах (десктоп)
            if (window.innerWidth > 992) {
                // Добавляем класс, который в CSS отключает показ меню при наведении
                this.classList.add('hover-off');
            }
        });

        // Когда курсор уходит с этого пункта меню
        dropdown.addEventListener('mouseleave', function() {
            // Убираем класс-блокировщик, возвращая обычное поведение hover
            this.classList.remove('hover-off');
        });
    });
    // === КОНЕЦ ДОБАВЛЕННОГО БЛОКА ===

    // === БЛОК 2: ОПРЕДЕЛЕНИЕ ЯЗЫКА ===
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
