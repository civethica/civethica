document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNavList = document.querySelector('#main-nav-list');

    if (mobileNavToggle && mainNavList) {
        mobileNavToggle.addEventListener('click', () => {
            mainNavList.classList.toggle('is-open');
            mobileNavToggle.setAttribute('aria-expanded', mainNavList.classList.contains('is-open'));
        });
    }
});
