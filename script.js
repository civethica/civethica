document.addEventListener('DOMContentLoaded', function () {
    // Скрипт для плавного скролла по якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Скрипт для открытия/закрытия мобильного меню
    const toggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.main-nav ul');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', isOpen);
        });
    }
});
