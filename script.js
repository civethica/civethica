document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const headerActions = document.querySelector('.header-actions');
    
    // Клонируем меню и кнопки для мобильной версии
    const mobileMenuContainer = mainNav.cloneNode(true);
    const mobileActionsContainer = headerActions.cloneNode(true);
    
    // Добавляем класс для стилизации мобильных кнопок
    mobileActionsContainer.classList.add('header-actions-mobile');

    // Находим основной список в клонированном меню
    const mobileNavList = mobileMenuContainer.querySelector('ul');
    mobileNavList.id = 'main-nav-list'; // Присваиваем ID для управления

    // Добавляем клонированные кнопки в конец клонированного списка
    mobileNavList.appendChild(mobileActionsContainer);

    // Вставляем готовое мобильное меню на страницу
    document.body.appendChild(mobileMenuContainer);

    // Логика открытия/закрытия
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavList.classList.toggle('is-open');
            mobileNavToggle.setAttribute('aria-expanded', mobileNavList.classList.contains('is-open'));
        });
    }
});
