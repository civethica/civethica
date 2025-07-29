document.addEventListener('DOMContentLoaded', function() {

    // --- Логика для мобильного меню-гамбургера ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');

    if (mobileNavToggle && mainNavList) {
        mobileNavToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            mainNavList.classList.toggle('is-open');
            mobileNavToggle.classList.toggle('is-active');
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
    let langCode = 'en'; // Язык по умолчанию

    // Более надежное определение языка из имени файла (например, "index.ru.html")
    if (parts.length > 2 && parts[parts.length - 2].length === 2) {
        langCode = parts[parts.length - 2];
    }

    if (languageSwitcherText) {
        languageSwitcherText.textContent = langCode.toUpperCase();
    }


    // =========================================================================
    // === НОВЫЙ БЛОК: ИСПРАВЛЕНИЕ ССЫЛКИ НА ЛОГОТИПЕ ===
    // =========================================================================
    const logoLink = document.querySelector('.logo-link');

    if (logoLink) {
        // Определяем, какой должна быть ссылка на главную страницу для текущего языка
        const homeUrl = (langCode === 'en') 
            ? 'index.html' // Для английского языка
            : `index.${langCode}.html`; // Для всех остальных языков (например, index.ru.html)

        // Присваиваем правильную ссылку нашему логотипу
        logoLink.href = homeUrl;
    }
    // === КОНЕЦ НОВОГО БЛОКА ===

});
