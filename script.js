document.addEventListener('DOMContentLoaded', function() {

    // === ВАШ ОРИГИНАЛЬНЫЙ, РАБОЧИЙ КОД ===
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

    // Открытие/закрытие подменю в МОБИЛЬНОЙ ВЕРСИИ
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

    // === КОНЕЦ ВАШЕГО РАБОЧЕГО КОДА ===


    // === НОВЫЙ БЛОК: УПРАВЛЕНИЕ HOVER-ЭФФЕКТОМ (ТЕПЕРЬ ТОЛЬКО ДЛЯ ДЕСКТОПА) ===
    // Этот код применяется ко всем выпадающим меню
    dropdowns.forEach(dropdown => {
        // Когда мы кликаем на родительский пункт (например, "Platforms")
        dropdown.addEventListener('click', function() {
            // ИСПРАВЛЕНИЕ: Выполняем это действие ТОЛЬКО на больших экранах
            if (window.innerWidth > 992) {
                this.classList.add('hover-off');
            }
        });

        // Когда курсор уходит с этого пункта меню
        dropdown.addEventListener('mouseleave', function() {
            // Это действие безопасно для всех размеров экрана, оно просто убирает класс
            this.classList.remove('hover-off');
        });
    });
    // === КОНЕЦ НОВОГО БЛОКА ===


    // ВАШ ОРИГИНАЛЬНЫЙ КОД ДЛЯ ЯЗЫКА
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
