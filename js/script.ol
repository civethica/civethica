document.addEventListener('DOMContentLoaded', function () {
  // --- 1. Логика для мобильного меню-гамбургера ---
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mainNavList = document.getElementById('main-nav-list');

  if (mobileNavToggle && mainNavList) {
    mobileNavToggle.addEventListener('click', function (event) {
      // Останавливаем "всплытие" события, чтобы клик по кнопке не закрыл меню сразу же
      event.stopPropagation();
      mainNavList.classList.toggle('is-open');
      mobileNavToggle.classList.toggle('is-active');
    });
  }

  // --- 2. Логика для ВСЕХ выпадающих списков (Платформы, Библиотека, Язык) ---
  const dropdowns = document.querySelectorAll('.dropdown, .language-switcher');

  dropdowns.forEach(function (dropdown) {
    const trigger = dropdown.querySelector('a, span.current-lang');

    if (trigger) {
      trigger.addEventListener('click', function (event) {
        // Для ссылок внутри мобильного меню предотвращаем переход
        if (window.innerWidth <= 992 && dropdown.closest('.main-nav')) {
          const submenu = dropdown.querySelector('.dropdown-menu, .lang-dropdown');
          if (submenu) {
            event.preventDefault();
          }
        }

        // Открываем/закрываем ТЕКУЩИЙ список
        const wasOpen = dropdown.classList.contains('is-open');

        // Сначала закрываем ВСЕ списки
        dropdowns.forEach(d => d.classList.remove('is-open'));

        // Если текущий не был открыт, открываем его
        if (!wasOpen) {
          dropdown.classList.add('is-open');
        }

        event.stopPropagation();
      });
    }
  });

  // --- 3. Логика закрытия всех меню при клике ВНЕ их области ---
  document.addEventListener('click', function () {
    dropdowns.forEach(d => d.classList.remove('is-open'));

    if (mainNavList && mainNavList.classList.contains('is-open')) {
      mainNavList.classList.remove('is-open');
      mobileNavToggle.classList.remove('is-active');
    }
  });

  // --- 4. Логика для модального окна "Платформы" (без изменений) ---
  const modal = document.getElementById('platforms-modal');
  const openBtn = document.getElementById('platforms-trigger');

  if (modal && openBtn) {
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    const openModal = () => modal.classList.add('is-open');
    const closeModal = () => modal.classList.remove('is-open');

    openBtn.addEventListener('click', e => {
      e.preventDefault();
      openModal();
    });
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
  }
}); 