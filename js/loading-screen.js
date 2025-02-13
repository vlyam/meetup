document.querySelector('body').classList.add('body__no-scroll');
document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingText = document.querySelector('.loading-screen__text');
    const minLoadingTime = 3500; // Обязательное время даже если загрузка произошла раньше

    function hideLoadingScreen() {
        loadingScreen.classList.add('loading-screen--close');
        setTimeout(function () {
            loadingScreen.remove();
            document.querySelector('body').classList.remove('body__no-scroll');
        }, 500); // Отсрочка на время анимации, проследить в CSS чтобы такое же время было
    }

    // Проверяем локаль
    const lastShownTime = localStorage.getItem('loadingScreenLastShown');
    const currentTime = new Date().getTime();

    if (!lastShownTime || (currentTime - lastShownTime) > 3600000) { // 1 час
        loadingText.classList.remove('loading-screen__text--hidden');

        window.addEventListener('load', function () {
            setTimeout(hideLoadingScreen, minLoadingTime);
            localStorage.setItem('loadingScreenLastShown', currentTime);
        });
    } else {
        hideLoadingScreen();
    }
});