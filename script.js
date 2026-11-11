function showPage(pageId) {

    // Знаходимо всі сторінки
    const pages = document.querySelectorAll('.screen');

    // Приховуємо всі сторінки
    pages.forEach(function(page) {
        page.classList.remove('active');
    });

    // Відкриваємо вибрану сторінку
    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Повертаємося на початок сторінки
    window.scrollTo(0, 0);
}
