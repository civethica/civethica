document.addEventListener('DOMContentLoaded', function() {
    
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');

    if (mobileNavToggle && mainNavList) {
        mobileNavToggle.addEventListener('click', () => {
            mainNavList.classList.toggle('is-open');
            mobileNavToggle.setAttribute('aria-expanded', mainNavList.classList.contains('is-open'));
        });
    }

    const submenuToggle = document.querySelector('.nav-toggle-submenu');
    if (submenuToggle) {
        submenuToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) { // Работает только на мобильных
                this.parentElement.classList.toggle('submenu-open');
            }
        });
    }
});
