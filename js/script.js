document.addEventListener('DOMContentLoaded', function() {

   // =======================================================================================
    // --- НОВЫЙ БЛОК: ЗАГРУЗКА И ЛОКАЛИЗАЦИЯ HTML-КОМПОНЕНТОВ ---
    // =======================================================================================
    
    // Определяем текущий язык (этот код у вас уже есть)
    const currentLang = document.documentElement.lang || 'en';

    // Функция для загрузки и локализации HTML-фрагмента
    const loadAndLocalizeHTML = (elementId, filePath) => {
        const placeholder = document.getElementById(elementId);
        if (placeholder) {
            fetch(filePath)
                .then(response => response.ok ? response.text() : Promise.reject('Файл не найден'))
                .then(html => {
                    // 1. Вставляем универсальный HTML в плейсхолдер
                    placeholder.innerHTML = html;

                    // 2. Находим все элементы с переводами ВНУТРИ загруженного блока
                    const translatableElements = placeholder.querySelectorAll('[data-lang-' + currentLang + ']');
                    
                    // 3. Для каждого элемента вставляем текст нужного языка
                    translatableElements.forEach(el => {
                        el.textContent = el.getAttribute('data-lang-' + currentLang);
                    });
                })
                .catch(error => {
                    console.error(`Ошибка при загрузке ${filePath}:`, error);
                    placeholder.style.display = 'none';
                });
        }
    };

    // Загружаем наш ЕДИНСТВЕННЫЙ универсальный баннер
    loadAndLocalizeHTML('dev-banner-placeholder', '/includes/dev-banner.html');
    
    // В будущем так же можно будет загружать и другие компоненты
    // loadAndLocalizeHTML('header-placeholder', '/includes/header.html');
    // loadAndLocalizeHTML('footer-placeholder', '/includes/footer.html');


    // =======================================================================================
    // --- ВАШ СУЩЕСТВУЮЩИЙ КОД НАЧИНАЕТСЯ ЗДЕСЬ ---
    // =======================================================================================
    
    // 1. Определяем общие переменные
    const currentUrl = window.location.href;
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    const parts = filename.split('.');
    let langCode = 'en';
    if (parts.length > 2 && parts[parts.length - 2].length === 2) {
        langCode = parts[parts.length - 2];
    }

    // 2. Обновляем UI (переключатель языка и лого)
    const languageSwitcherText = document.querySelector('.current-lang');
    if (languageSwitcherText) {
        languageSwitcherText.textContent = langCode.toUpperCase();
    }
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.href = (langCode === 'en') ? '/index.html' : `/${langCode}/index.${langCode}.html`;
    }

    // 3. Подсветка активного меню и ЗАПОМИНАНИЕ активного родителя
    const navLinks = document.querySelectorAll('.main-nav a');
    let activeParentDropdown = null;

    navLinks.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
            
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const mainDropdownLink = parentDropdown.querySelector('a');
                if (mainDropdownLink) {
                    mainDropdownLink.classList.add('active-parent');
                }
                activeParentDropdown = parentDropdown; 
            }
        }
    });

    // 4. Логика для "липких" заголовков
    const platformHeaderContainer = document.querySelector('#platform-header-sticky .container');
    const libraryHeaderContainer = document.querySelector('#library-header-sticky .container');

    if (platformHeaderContainer) {
        const activePlatformLink = document.querySelector('.main-nav .dropdown-menu a.active');
        if (activePlatformLink) {
            const platformLabels = { 'ru': 'Платформа:', 'en': 'Platform:', 'de': 'Plattform:', 'fr': 'Plateforme :', 'es': 'Plataforma:', 'zh': '平台：' };
            const platformName = activePlatformLink.textContent;
            platformHeaderContainer.innerHTML = `<span class="platform-label">${platformLabels[langCode]}</span> ${platformName}`;
        }
    }

    if (libraryHeaderContainer) {
        const mainHeadline = document.querySelector('.content-section h2');
        if (mainHeadline) {
            const libraryLabels = { 'ru': 'Библиотека:', 'en': 'Library:', 'de': 'Bibliothek:', 'fr': 'Bibliothèque :', 'es': 'Biblioteca:', 'zh': '图书馆：' };
            let topicName = mainHeadline.textContent.replace(/\(Библиотека\)|\(Library\)|\(Bibliothek\)|\(Bibliothèque\)|\(Biblioteca\)|\(图书馆\)/gi, '').trim();
            libraryHeaderContainer.innerHTML = `<span class="library-label">${libraryLabels[langCode]}</span> ${topicName}`;
        }
    }

    // =======================================================================================
    // --- ЛОГИКА ОБРАБОТКИ КЛИКОВ (Меню) ---
    // =======================================================================================

    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');

    if (mobileNavToggle && mainNavList) {
        mobileNavToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const isOpen = mainNavList.classList.toggle('is-open');
            mobileNavToggle.classList.toggle('is-active');

            if (isOpen && activeParentDropdown) {
                activeParentDropdown.classList.add('is-open');
            }
        });
    }

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

    document.addEventListener('click', function(event) {
        allClickDropdowns.forEach(d => d.classList.remove('is-open'));
        if (mainNavList && mainNavList.classList.contains('is-open')) {
            mainNavList.classList.remove('is-open');
            mobileNavToggle.classList.remove('is-active');
        }
    });

    // =======================================================================================
    // --- ЛОГИКА ДЛЯ МОДАЛЬНОГО ОКНА И МОБИЛЬНОЙ ПОДСКАЗКИ (ОБЪЕДИНЕННАЯ) ---
    // =======================================================================================
    const showOgImageBtn = document.getElementById('show-og-image-btn');
    const modal = document.getElementById('og-image-modal');
    const modalImage = document.getElementById('modal-image-src');
    const modalCloseBtn = document.querySelector('.modal-close');

    if (showOgImageBtn && modal && modalImage) {

        showOgImageBtn.addEventListener('click', function(event) {
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            // Если это сенсорное устройство И подсказка еще не была показана
            if (isTouchDevice && !this.classList.contains('tooltip-visible')) {
                event.preventDefault(); // Останавливаем открытие модального окна
                event.stopPropagation(); // Останавливаем другие клики
                
                this.classList.add('tooltip-visible'); // Показываем нашу CSS-подсказку

                // Прячем подсказку через 2.5 секунды
                setTimeout(() => {
                    this.classList.remove('tooltip-visible');
                }, 2500);
                
                return; // Выходим из функции, чтобы модальное окно не открылось
            }

            // Этот код сработает на десктопе сразу, а на мобильном — при втором клике
            const ogImageTag = document.querySelector('meta[property="og:image"]');
            if (ogImageTag) {
                const imageUrl = ogImageTag.getAttribute('content');
                modalImage.src = imageUrl;
                modal.classList.add('is-visible');
            }
        });

        // --- Функция для закрытия окна ---
        function closeModal() {
            modal.classList.remove('is-visible');
        }

        // 3 способа закрыть окно:
        modalCloseBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
                closeModal();
            }
        });
    }

});