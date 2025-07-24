document.addEventListener('DOMContentLoaded', function() {
    // Этот скрипт нужен только для плавного скролла по якорям, если они есть.
    // На многостраничном сайте он не будет мешать переходам на другие страницы.
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
});