document.addEventListener('DOMContentLoaded', function() {

    // --- Логика для мобильного меню-гамбургера ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');

    if (mobileNavToggle && mainNavList) {
        mobileNavToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            
            // Открываем или закрываем основное мобильное меню
            mainNavList.classList.toggle('is-open');
            mobileNavToggle.classList.toggle('is-active');

            // =========================================================================
            // === НОВЫЙ БЛОК: АВТОМАТИЧЕСКОЕ РАСКРЫТИЕ МЕНЮ ПЛАТФОРМ ===
            // =========================================================================
            const platformsDropdown = document.querySelector('.main-nav .dropdown');
            
            // Проверяем, есть ли у body класс .sub-page (который есть на всех страницах платформ)
            if (platformsDropdown && document.body.classList.contains('sub-page')) {
                
                // Если мы только что ОТКРЫЛИ мобильное меню...
                if (mainNavList.classList.contains('is-open')) {
                    // ...то автоматически открываем и подменю платформ.
                    platformsDropdown.classList.add('is-open');
                } else {
                    // ...иначе (если мы закрыли мобильное меню), убеждаемся, что подменю тоже закрыто.
                    platformsDropdown.classList.remove('is-open');
                }
            }
            // === КОНЕЦ НОВОГО БЛОКА ===
        });
    }

    // --- Логика для выпадающих меню "только по клику" ---
    const allClickDropdowns = document.querySelectorAll('.main-nav .dropdown, .language-switcher');

    allClickDropdowns.forEach(dropdownContainer => {
        dropdownContainer.addEventListener('click', function(event) {
            if (event.target.closest('.lang-dropdown') || event.target.closest('.dropdown-menu')) {
                return;
            }
            event.stopPropagation();
            if (event.target.matches('.main-nav .dropdown > a')) {
                event.preventDefault();
            }
            const wasOpen = this.classList.contains('is-open');
            allClickDropdowns.forEach(d => d.classList.remove('is-open'));
            if (!wasOpen) {
                this.classList.add('is-open');
            }
        });
    });

    // --- Логика закрытия всех меню при клике ВНЕ их области ---
    document.addEventListener('click', function(event) {
        allClickDropdowns.forEach(d => d.classList.remove('is-open'));
        if (mainNavList && mainNavList.classList.contains('is-open')) {
            mainNavList.classList.remove('is-open');
            mobileNavToggle.classList.remove('is-active');
        }
    });

    // --- Логика обновления текста в переключателе языка ---
    const languageSwitcherText = document.querySelector('.current-lang');
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    const parts = filename.split('.');
    let langCode = 'en';

    if (parts.length > 2 && parts[parts.length - 2].length === 2) {
        langCode = parts[parts.length - 2];
    }

    if (languageSwitcherText) {
        languageSwitcherText.textContent = langCode.toUpperCase();
    }

    // --- Логика исправления ссылки на логотипе ---
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        const homeUrl = (langCode === 'en') ? 'index.html' : `index.${langCode}.html`;
        logoLink.href = homeUrl;
    }
});
