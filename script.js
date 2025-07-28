document.addEventListener('DOMContentLoaded', function() {

    // --- ЛОГИКА ДЛЯ МОБИЛЬНОГО МЕНЮ (остается как была) ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');
    const dropdowns = document.querySelectorAll('.main-nav .dropdown');

    if (mobileNavToggle && mainNavList) {
        mobileNavToggle.addEventListener('click', () => {
            mainNavList.classList.toggle('is-open');
            mobileNavToggle.classList.toggle('is-active');
            const isOpen = mainNavList.classList.contains('is-open');
            mobileNavToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    if (window.innerWidth <= 992) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a'); 
            link.addEventListener('click', (e) => {
                const submenu = dropdown.querySelector('.dropdown-menu');
                if (submenu) {
                    e.preventDefault();
                    dropdown.classList.toggle('is-open');
                }
            });
        });
    }

    // --- НОВАЯ ЛОГИКА ДЛЯ ОПРЕДЕЛЕНИЯ ЯЗЫКА ---
    const languageSwitcher = document.querySelector('.current-lang');
    if (languageSwitcher) {
        // Получаем путь к текущему файлу, например "/index.de.html"
        const path = window.location.pathname;
        // Получаем только имя файла, например "index.de.html"
        const filename = path.split('/').pop();
        
        // Разбиваем имя файла по точкам: ["index", "de", "html"]
        const parts = filename.split('.');
        
        let langCode = 'EN'; // Язык по умолчанию

        // Если в имени файла есть языковой код (т.е. 3 части, как в "index.de.html")
        if (parts.length === 3) {
            langCode = parts[1]; // Берем вторую часть - "de"
        }
        
        // Обновляем текст в кнопке переключения языка
        languageSwitcher.textContent = langCode.toUpperCase();
    }
});
