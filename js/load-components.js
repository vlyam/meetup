// Функция для загрузки HTML-компонента (header, footer и др.)
function loadComponent(selector, file, callback1, callback2) {
    fetch(file) // Загружаем файл по переданному пути
        .then(response => {
            if (!response.ok) { // Проверяем, успешно ли загрузился файл
                throw new Error(`Ошибка загрузки ${file}: ${response.statusText}`); // Выбрасываем ошибку, если файл не найден
            }
            return response.text(); // Преобразуем ответ в текст (HTML-код)
        })
        .then(data => {
            document.querySelector(selector).innerHTML = data; // Вставляем загруженный HTML-код в указанный контейнер
            if (callback1) callback1(); // Если переданы функции-коллбэк, вызываем их после загрузки
            if (callback2) callback2();
        })
        .catch(error => console.error(error)); // Ловим и выводим возможные ошибки в консоль
}

// Функция для смены города в поисковой строке в зависимости от страницы
function setActiveLink() {
    // Получаем имя текущей страницы из URL, убирая `.html`
    const currentPage = window.location.pathname.split("/").pop().replace(".html", "") || "index";

    if (currentPage === 'events') {
        document.querySelector('.events-search__select').options[1].selected = true;
    }
}

// Ожидаем полной загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
    // Загружаем `header.html` в контейнер `#navbar`, затем вызываем `setActiveLink()`
    loadComponent("#navbar", "components/header.html", setActiveLink, toggleHamburger);

    // Загружаем `footer.html` в контейнер `#footer`
    loadComponent("#footer", "components/footer.html");

    // Загружаем `modals.html` в контейнер `#modals` и вызываем функцию модальных окон
    loadComponent("#modals", "components/modals.html", modals);
});
