document.addEventListener('DOMContentLoaded', function() {

    // --- Логика для мобильного меню-гамбургера (остается без изменений) ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');

    if (mobileNavToggle && mainNavList) {
        mobileNavToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            mainNavList.classList.toggle('is-open');
            mobileNavToggle.classList.toggle('is-active');
        });
    }

    // =========================================================================
    // === ФИНАЛЬНАЯ ЛОГИКА "ТОЛЬКО ПО КЛИКУ", КОТОРАЯ НЕ БЛОКИРУЕТ ССЫЛКИ ===
    // =========================================================================

    const allClickDropdowns = document.querySelectorAll('.main-nav .dropdown, .language-switcher');

    allClickDropdowns.forEach(dropdownContainer => {
        dropdownContainer.addEventListener('click', function(event) {
            
            // --- КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ ---
            // Если пользователь кликнул на ссылку ВНУТРИ выпадающего списка языков...
            if (event.target.closest('.lang-dropdown')) {
                // ...то мы НИЧЕГО не делаем и позволяем браузеру перейти по ссылке.
                // Функция просто завершает свою работу здесь.
                return;
            }

            // --- Стандартная логика открытия/закрытия меню ---

            // Останавливаем "всплытие", чтобы клик не закрыл меню сразу же
            event.stopPropagation();
            
            // Предотвращаем переход по ссылке ТОЛЬКО для главных пунктов меню (например, "Platforms")
            if (event.target.matches('.main-nav .dropdown > a')) {
                event.preventDefault();
            }

            const wasOpen = this.classList.contains('is-open');

            // Сначала закрываем ВСЕ открытые выпадающие меню
            allClickDropdowns.forEach(d => {
                d.classList.remove('is-open');
            });
            
            // Если текущее меню было закрыто, открываем его.
            if (!wasOpen) {
                this.classList.add('is-open');
            }
        });
    });

    // --- Логика закрытия всех меню при клике ВНЕ их области ---
    document.addEventListener('click', function(event) {
        allClickDropdowns.forEach(d => {
            d.classList.remove('is-open');
        });
        // Также закрываем мобильное меню, если оно открыто
        if (mainNavList && mainNavList.classList.contains('is-open')) {
            mainNavList.classList.remove('is-open');
            mobileNavToggle.classList.remove('is-active');
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
