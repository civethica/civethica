document.addEventListener('DOMContentLoaded', function() {

    // --- Логика для мобильного меню-гамбургера (остается без изменений) ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');

    if (mobileNavToggle && mainNavList) {
        mobileNavToggle.addEventListener('click', () => {
            mainNavList.classList.toggle('is-open');
            mobileNavToggle.classList.toggle('is-active');
        });
    }

    // =========================================================================
    // === НОВАЯ УНИВЕРСАЛЬНАЯ ЛОГИКА "ТОЛЬКО ПО КЛИКУ" ДЛЯ ВСЕХ МЕНЮ ===
    // =========================================================================

    const allDropdowns = document.querySelectorAll('.dropdown, .language-switcher');

    allDropdowns.forEach(dropdown => {
        // Находим элемент, который будет открывать меню
        const trigger = dropdown.classList.contains('language-switcher') 
            ? dropdown.querySelector('.current-lang') // Для языка - это .current-lang
            : dropdown.querySelector('a:first-child'); // Для навигации - это первая ссылка

        if (trigger) {
            trigger.addEventListener('click', function(event) {
                // Предотвращаем переход по ссылке для меню "Platforms"
                if (dropdown.classList.contains('dropdown')) {
                    event.preventDefault();
                }

                const wasOpen = dropdown.classList.contains('is-open');

                // 1. Сначала закрываем ВСЕ открытые выпадающие меню
                document.querySelectorAll('.dropdown.is-open, .language-switcher.is-open').forEach(openMenu => {
                    openMenu.classList.remove('is-open');
                });

                // 2. Если то меню, по которому кликнули, было закрыто, то открываем его.
                // Это позволяет закрывать меню повторным кликом и не дает ему тут же открыться снова.
                if (!wasOpen) {
                    dropdown.classList.add('is-open');
                }
            });
        }
    });

    // --- Логика закрытия меню при клике ВНЕ его области ---
    document.addEventListener('click', function(event) {
        // Если клик был не внутри какого-либо из наших выпадающих меню
        if (!event.target.closest('.dropdown, .language-switcher')) {
            // Закрываем все открытые меню
            document.querySelectorAll('.dropdown.is-open, .language-switcher.is-open').forEach(openMenu => {
                openMenu.classList.remove('is-open');
            });
        }
    });


    // --- Логика обновления текста языка (остается без изменений) ---
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
