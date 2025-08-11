:root {
    --primary-color: #005f73;
    --secondary-color: #0a9396;
    --accent-color: #94d2bd;
    --bg-color: #f8f9fa;
    --text-color: #343a40;
    --heading-font: 'Montserrat', sans-serif;
    --body-font: 'Roboto', 'Noto Sans SC', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--body-font);
    color: var(--text-color);
    background-color: var(--bg-color);
    line-height: 1.6;
}

/* 
 * =======================================================
 * === ИСПРАВЛЕНИЕ 1: Позволяет position:sticky работать ===
 * =======================================================
 */
main {
    overflow: visible;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* --- Development Banner --- */
.dev-banner {
    background: linear-gradient(45deg, #ffc107, #ff9800);
    color: #000;
    text-align: center;
    padding: 12px 20px;
    font-size: 15px;
    font-family: 'Roboto', sans-serif;
}
.dev-banner p {
    margin: 0;
}

/* --- Header & Navigation (Desktop) --- */
.main-header {
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000; /* Самый высокий слой */
}

.main-header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
}

.logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--primary-color);
    flex-shrink: 0;
}

.logo-img {
    height: 100px;
    margin-right: 15px;
}

.logo-text {
    font-family: var(--heading-font);
    font-weight: 700;
    font-size: 1.5rem;
}

.main-nav ul {
    list-style: none;
    display: flex;
    align-items: center;
}

.main-nav ul li {
    position: relative;
}

.main-nav ul li a {
    padding: 10px 15px;
    text-decoration: none;
    color: var(--primary-color);
    font-weight: bold;
    transition: color 0.3s;
    display: block;
    white-space: nowrap;
}

.main-nav ul li a:hover {
    color: var(--secondary-color);
}

/* --- Dropdown Menu (Universal Click-Based) --- */
.dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    border-radius: 8px;
    padding: 10px;
    margin-top: 10px;
    width: max-content;
    max-width: 800px;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px 20px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease, margin-top 0.3s ease;
    z-index: 1100;
}

.dropdown.is-open > .dropdown-menu {
    display: grid;
    opacity: 1;
    visibility: visible;
    margin-top: 5px;
}

.dropdown-menu a {
    font-size: 0.9rem;
    padding: 8px 12px;
    border-radius: 5px;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-left: 20px;
}

.language-switcher {
    position: relative;
}

.current-lang {
    font-weight: bold;
    color: var(--primary-color);
    padding: 8px 10px;
    border: 1px solid var(--accent-color);
    border-radius: 5px;
    cursor: pointer;
    /* ИСПРАВЛЕНИЕ: Добавляем префикс для Safari */
    -webkit-user-select: none; /* Для старых версий Safari, Chrome, Opera */
    user-select: none;          /* Стандартное свойство для современных браузеров */
}

.lang-dropdown {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #fff;
    list-style: none;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    border-radius: 5px;
    padding: 5px 0;
    margin-top: 5px;
    min-width: 80px;
    text-align: center;
    z-index: 1100;
}

.language-switcher.is-open .lang-dropdown {
    display: block;
}

.lang-dropdown li a {
    display: block;
    padding: 10px 15px;
    text-decoration: none;
    color: var(--primary-color);
}

.lang-dropdown li a:hover {
    background-color: var(--bg-color);
}

/* 
 * ===================================================================================
 * === ИСПРАВЛЕНИЕ 2: ЕДИНЫЙ БЛОК ДЛЯ "ЛИПКИХ" ЗАГОЛОВКОВ И АКТИВНОГО МЕНЮ ===
 * ===================================================================================
 */
/* 1. Общие стили для обеих "липких" плашек */
.platform-header,
.library-header {
  position: sticky;
  top: 130px; /* ВЫСОТА ШАПКИ НА ДЕСКТОПЕ. Подберите точное значение */
  background-color: var(--primary-color);
  color: #ffffff;
  font-size: 1.2rem;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 999;
  font-weight: 400;
}

/* 2. Стили для подписей "Платформа:" и "Библиотека:" */
.platform-header .platform-label,
.library-header .library-label {
  font-weight: 700;
  color: hsl(57, 100%, 51%); /* Яркий желтый/золотой цвет */
  margin-right: 10px;
}

/* --- Стили для активных пунктов ГЛАВНОГО меню (ОБНОВЛЕНО) --- */

/* 
 * Это правило применяет фон и для "Платформы" (когда активен подпункт),
 * и для прямых ссылок, таких как "Манифест" или "Библиотека".
*/
.main-nav > ul > li > a.active,
.main-nav .dropdown > a.active-parent {
  background-color: rgba(0, 0, 0, 0.05); /* Легкий серый фон для выделения */
  border-radius: 5px;
}

/* 
 * Это правило, как и раньше, подсвечивает цветом
 * активный пункт ВНУТРИ выпадающего списка.
*/
.main-nav .dropdown-menu a.active {
  color: var(--secondary-color);
  font-weight: bold;
}


/* --- General Content Styles --- */
.content-section, .hero-section, .platforms-preview-section { padding: 80px 0; text-align: center; scroll-margin-top: 150px; }
.hero-section {
    background: linear-gradient(rgba(0, 95, 115, 0.7), rgba(0, 95, 115, 0.7)), url('/images/og-image-main.png') no-repeat center center/cover;
    color: #fff; display: flex; align-items: center; min-height: 80vh;
}
h1 { font-family: var(--heading-font); font-size: 3.2rem; margin-bottom: 20px; }
.subtitle { font-size: 1.2rem; font-weight: 300; max-width: 700px; margin: 0 auto 30px auto; }
h2 { font-family: var(--heading-font); font-size: 2.5rem; color: var(--primary-color); margin-bottom: 40px; }

/* --- Buttons --- */
.cta-button, .cta-button-secondary, .cta-button-small {
    display: inline-block; padding: 15px 30px; text-decoration: none;
    border-radius: 5px; font-weight: bold; transition: transform 0.3s, background-color 0.3s;
}
.cta-button { background-color: var(--secondary-color); color: #fff; }
.cta-button:hover { background-color: #087c7e; transform: translateY(-3px); }
.cta-button-secondary { background-color: transparent; color: var(--primary-color); border: 2px solid var(--primary-color); }
.cta-button-secondary:hover { background-color: var(--primary-color); color: #fff; transform: translateY(-3px); }
.cta-button-small { padding: 8px 15px; background-color: var(--primary-color); color: #fff; font-size: 0.9rem; }
.cta-button-small:hover { background-color: var(--secondary-color); }

/* --- Specific Section Styles --- */
.platforms-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
.platform-card {
    display: block; background-color: #fff; padding: 30px; border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05); text-decoration: none; color: var(--text-color);
    transition: transform 0.3s, box-shadow 0.3s;
}
.platform-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
.platform-card h3 { color: var(--primary-color); margin-bottom: 10px; }
.join-buttons { margin-top: 30px; display: flex; justify-content: center; gap: 20px; }

/* --- Sub-pages & Manifesto --- */
.text-left { text-align: left; }
.text-left h3 { font-family: var(--heading-font); color: var(--primary-color); margin-top: 30px; margin-bottom: 15px; }
.manifesto-list, .manifesto-sublist { list-style-position: outside; padding-left: 20px; }
.manifesto-sublist { margin-top: 1em; padding-left: 40px; }
.manifesto-list li, .manifesto-sublist li { margin-bottom: 1em; }
.cta-container { margin-top: 50px; text-align: left; }
.cta-line { display: flex; align-items: center; gap: 25px; margin-bottom: 20px; }
.cta-line:last-child { margin-bottom: 0; }
.cta-note { font-style: italic; font-size: 0.9em; color: #555; }

/* --- Footer --- */
.main-footer { background-color: var(--primary-color); color: #fff; text-align: center; padding: 40px 0; }
.main-footer a { color: var(--accent-color); text-decoration: none; }

/*
=====================================================
======= СТИЛИ ДЛЯ ОФОРМЛЕНИЯ СТАТЕЙ (CIVETHICA) =======
=====================================================
*/
.article-body {
    font-family: var(--body-font);
    line-height: 1.7;
    color: var(--text-color);
}

.article-header { margin-bottom: 2rem; }
.article-meta { font-size: 0.9rem; color: #6c757d; margin-top: 1rem; }
.subsection { margin-top: 3rem; }
.subsection h3 { font-size: 1.8rem; margin-bottom: 1.5rem; }
.article-preview { margin-bottom: 30px; }
.analogy-quote { background-color: var(--bg-color); border-left: 4px solid var(--accent-color); padding: 1.5rem 2rem; margin: 2.5rem 0; font-size: 1.15rem; font-style: italic; color: #555; }
.analogy-quote p { margin: 0; }
.key-concept { font-size: 1.2rem; font-weight: 500; text-align: center; padding: 1rem; margin: 2.5rem auto; max-width: 80%; }
.cards-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
.card { background-color: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); display: flex; flex-direction: column; }
.card h4 { font-family: var(--heading-font); color: var(--primary-color); font-size: 1.2rem; margin-top: 0; margin-bottom: 0.75rem; }
.card p { font-size: 1rem; line-height: 1.6; margin-bottom: 0; flex-grow: 1; }
.dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
.dashboard-card { background-color: var(--bg-color); border: 1px solid #e9ecef; border-radius: 8px; padding: 1.5rem; }
.dashboard-card h4 { font-family: var(--heading-font); font-size: 1.2rem; margin-top: 0; margin-bottom: 1rem; }
.dashboard-card h4 small { font-weight: 400; color: var(--text-color); opacity: 0.8; }
.dashboard-card ul { list-style-type: none; padding-left: 0; margin-top: 0.5rem; font-size: 0.95rem; }
.dashboard-card ul li { padding: 0.3rem 0; border-bottom: 1px dashed #e0e0e0; }
.dashboard-card ul li:last-child { border-bottom: none; }
.article-footer { margin-top: 3rem; }
.conclusion-box { background-color: #f0f7f7; border-left: 4px solid var(--secondary-color); padding: 2rem; margin: 3rem 0; border-radius: 4px; }
.conclusion-box h3 { margin-top: 0; color: var(--primary-color); }
.discussion-cta-section { text-align: center; margin-top: 0rem; padding-top: 1rem; border-top: 1px solid #e9ecef; }
.discussion-cta-section h3 { font-size: 1.6rem; }
.discussion-cta-section p { font-size: 1.1rem; color: var(--text-color); opacity: 0.9; margin-bottom: 1.5rem; max-width: 600px; margin-left: auto; margin-right: auto; }

/*
=====================================================
======= СТИЛИ ДЛЯ КРАСИВЫХ НУМЕРОВАННЫХ СПИСКОВ =======
=====================================================
*/
.styled-list { list-style: none; padding-left: 0; margin-top: 1.5rem; }
.styled-list li { padding-left: 2.5em; position: relative; margin-bottom: 1.25rem; }
.styled-list li::before {
  counter-increment: list-item;
  content: counter(list-item) ".";
  position: absolute;
  left: 0;
  top: 0.1em;
  font-family: var(--heading-font);
  font-weight: bold;
  color: var(--primary-color);
  font-size: 1rem;
}
main ol.styled-list { counter-reset: list-item; }

/*
==============================================
======= MOBILE & RESPONSIVE STYLES ===========
==============================================
*/
.mobile-nav-toggle { display: none; background: none; border: none; cursor: pointer; z-index: 1001; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.mobile-nav-toggle { padding: 10px; }

.mobile-nav-toggle .icon-open,
.mobile-nav-toggle .icon-close {
    font-size: 2rem;
    line-height: 1;
    color: var(--primary-color);
    transition: transform 0.3s ease;
}
.mobile-nav-toggle .icon-close { display: none; }

@media (max-width: 992px) {
    .main-header .container { flex-wrap: wrap; justify-content: space-between; align-items: center; min-height: 80px; }
    .logo-img { height: 80px; }
    .logo-text { font-size: 1.2rem; }
    .header-actions { order: 2; margin-left: 0; }
    .mobile-nav-toggle { display: block; order: 3; }
    
    .main-nav { order: 4; width: 100%; }
    .main-nav ul {
        display: none; flex-direction: column; width: 100%; background-color: #fff;
        padding: 20px 0; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        position: absolute; top: 100%; left: 0;
    }
    .main-nav ul.is-open { display: flex; }
    .main-nav ul li { margin-bottom: 10px; }
    .main-nav ul li a { font-size: 1.2rem; padding: 15px; }

    .main-nav .dropdown .dropdown-menu {
        position: static !important;
        transform: none !important;
        box-shadow: none !important;
        opacity: 1 !important;
        visibility: visible !important;
        background-color: transparent !important;
        display: none;
        width: 100%;
        list-style: none;
        padding: 10px 0 10px 20px;
        margin-top: 0;
        border-radius: 0;
    }
    
    .main-nav .dropdown.is-open > .dropdown-menu {
        display: block;
    }

    .main-nav .dropdown-menu a {
        font-size: 1rem;
        font-weight: 400;
        text-align: center;
        padding: 10px 15px;
        color: var(--secondary-color);
    }
    
    /* ИСПРАВЛЕНИЕ 3: Адаптация "липких" заголовков для мобильных */
    .platform-header,
    .library-header {
        top: 162px; /* ВЫСОТА МОБИЛЬНОЙ ШАПКИ. Подберите точное значение */
        font-size: 1.1rem;
        text-align: center;
        padding: 10px 0;
    }

    h1 { font-size: 2.5rem; }
    h2 { font-size: 2rem; }
    .join-buttons { flex-direction: column; align-items: center; }
    .platforms-grid { grid-template-columns: 1fr; }

    .mobile-nav-toggle.is-active .icon-open { display: none; }
    .mobile-nav-toggle.is-active .icon-close { display: block; }

    .mobile-only-button { display: inline-block; }
    .desktop-only-button { display: none; }
}
.button-container {
    margin-top: 2rem;
}

.conclusion {
    margin-top: 0rem;
    font-style: normal;
    border-top: 1px solid #eee;
    padding-top: 1rem;
}
.conclusion-it {
    margin-top: 2.5rem;
    font-style: italic;
    border-top: 1px solid #eee;
    padding-top: 1rem;
}
.conclusion ul {
    list-style-type: disc;
    padding-left: 20px;
}

.library-topic-link:link,
.library-topic-link:visited,
.library-topic-link:hover,
.library-topic-link:active {
  color: var(--primary-color);
  text-decoration: none;
}
.library-topic-link:hover {
  text-decoration: underline;
}

.article-featured-image {
  float: left;
  width: 50%;
  max-width: 450px;
  height: auto;
  margin: 10px 30px 10px 0;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

hr {
  clear: both;
}

/* --- Стили для кнопки просмотра OG-изображения --- */
.page-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px; /* Сохраняем отступ, который был у h2 */
}
.page-title-container h2 {
  margin-bottom: 0; /* Убираем отступ у самого h2, так как он теперь у контейнера */
}

.show-image-btn {
  background-color: transparent;
  border: 2px solid var(--accent-color);
  color: var(--primary-color);
  padding: 10px;
  border-radius: 50%; /* Делаем кнопку круглой */
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}
.show-image-btn:hover {
  background-color: var(--accent-color);
  color: #fff;
  transform: scale(1.1);
}

/* --- Стили для модального окна (лайтбокса) --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Полупрозрачный черный фон */
  display: none; /* По умолчанию скрыто */
  align-items: center;
  justify-content: center;
  z-index: 2000; /* Высший слой */
  padding: 20px;
}
.modal-overlay.is-visible {
  display: flex; /* Показываем окно */
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.modal-content img {
  display: block;
  max-width: 100%;
  max-height: 90vh; /* Ограничиваем высоту, чтобы картинка не вылезала за экран */
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.modal-close {
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  line-height: 1;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

/* --- Стили для АДАПТИВНОЙ всплывающей подсказки (ФИНАЛЬНАЯ ВЕРСИЯ 2.0) --- */

.show-image-btn {
  position: relative; /* Обязательно для позиционирования */
}

/* 1. Общие стили для псевдоэлементов подсказки (::after и ::before) */
.show-image-btn::after,
.show-image-btn::before {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 10;
}

/* 2. Сама подсказка */
.show-image-btn::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 125%;
  right: 0; /* Прижимаем к правому краю кнопки */
  
  background-color: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
}

/* 3. Треугольничек-стрелка под подсказкой */
.show-image-btn::before {
  content: '';
  position: absolute;
  bottom: 100%;
  right: 12px; /* Позиционируем относительно правого края */

  border: 6px solid transparent;
  border-top-color: #333;
}

/* 4. Показываем подсказку при НАВЕДЕНИИ на десктопе (с задержкой) */
.show-image-btn:hover::after,
.show-image-btn:hover::before {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.3s;
}

/* 5. Показываем подсказку по КЛИКУ на мобильных (управляется JS) */
.show-image-btn.tooltip-visible::after,
.show-image-btn.tooltip-visible::before {
  opacity: 1;
  visibility: visible;
  transition-delay: 0s; /* Без задержки */
}