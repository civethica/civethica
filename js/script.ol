document.addEventListener('DOMContentLoaded', function() {

    // =======================================================================================
    // --- ГЛАВНЫЙ БЛОК ЛОГИКИ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ (Язык, меню, заголовки) ---
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
    let activeParentDropdown = null; // Переменная, которая "запомнит" активный выпадающий список

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
                // Запоминаем родительский элемент для использования в мобильном меню
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

            // === НОВАЯ УЛУЧШЕННАЯ ЛОГИКА ===
            // Если мы только что ОТКРЫЛИ мобильное меню И находимся на странице подменю
            if (isOpen && activeParentDropdown) {
                // Автоматически раскрываем нужное подменю
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
    // --- ЛОГИКА ДЛЯ МОДАЛЬНОГО ОКНА С OG-ИЗОБРАЖЕНИЕМ ---
    // =======================================================================================
    const showOgImageBtn = document.getElementById('show-og-image-btn');
    const modal = document.getElementById('og-image-modal');
    const modalImage = document.getElementById('modal-image-src');
    const modalCloseBtn = document.querySelector('.modal-close');

    if (showOgImageBtn && modal && modalImage) {
        // --- Функция для открытия окна ---
        showOgImageBtn.addEventListener('click', function() {
            // 1. Находим OG-картинку на текущей странице
            const ogImageTag = document.querySelector('meta[property="og:image"]');
            if (ogImageTag) {
                const imageUrl = ogImageTag.getAttribute('content');
                // 2. Устанавливаем эту картинку в модальное окно
                modalImage.src = imageUrl;
                // 3. Показываем модальное окно
                modal.classList.add('is-visible');
            }
        });

        // --- Функция для закрытия окна ---
        function closeModal() {
            modal.classList.remove('is-visible');
        }

        // 3 способа закрыть окно:
        // 1. По клику на крестик
        modalCloseBtn.addEventListener('click', closeModal);
        
        // 2. По клику на темный фон
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // 3. По нажатию на клавишу Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
                closeModal();
            }
        });
    }

    // =======================================================================================
    // --- ЛОГИКА ДЛЯ КАСТОМНОЙ ПОДСКАЗКИ НА МОБИЛЬНЫХ ---
    // =======================================================================================
    const tooltipButton = document.getElementById('show-og-image-btn');

    if (tooltipButton) {
        // Проверяем, поддерживает ли устройство сенсорный ввод
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (isTouchDevice) {
            tooltipButton.addEventListener('click', function(event) {
                // Предотвращаем срабатывание клика, если подсказка еще не видна
                if (!this.classList.contains('tooltip-visible')) {
                    event.preventDefault(); // Останавливаем открытие модального окна
                    event.stopPropagation(); // Останавливаем другие клики
                    
                    this.classList.add('tooltip-visible'); // Показываем подсказку

                    // Прячем подсказку через 2 секунды
                    setTimeout(() => {
                        this.classList.remove('tooltip-visible');
                    }, 2000);
                }
                // Если подсказка уже видна, то обычный клик сработает и откроет модальное окно
            });
        }
    }

});

