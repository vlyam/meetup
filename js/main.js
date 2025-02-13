// Функция добавления тени к навбару при прокрутке

const navbar = document.getElementById('navbar'); // Получили навбар

function toggleClassOnScroll(px) {
    let scrollTop = window.scrollY || document.documentElement.scrollTop; // Расстояние прокрутки от верха, новый и старый вариант
    if (scrollTop > px) {
        navbar.classList.add('navbar--shadowed');
    } else {
        navbar.classList.remove('navbar--shadowed');
    }
}

window.addEventListener('scroll', function () {
    toggleClassOnScroll(50); // Запускаем функцию на 50px
});

// Функция гамбургера
function toggleHamburger() {
    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('hamburger--active');
        document.querySelector('.navbar__hamburger-panel').classList.toggle('navbar__hamburger-panel--show');
        document.querySelector('body').classList.toggle('body__no-scroll');
    });
}

function modals() { // Модальные окна

    // Открыть
    const openModal = (modalId) => {
        const modal = document.querySelector(`[data-modal="${modalId}"]`);
        if (modal) {
            modal.classList.remove('modal--hidden');
            document.querySelector('body').classList.add('body__no-scroll');
        }
    };

    // Закрыть
    const closeModal = (modal) => {
        modal.classList.add('modal--hidden');
        document.querySelector('body').classList.remove('body__no-scroll');
    };

    // Выбираем все кнопки по атрибуту
    document.querySelectorAll('[data-open-modal]').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-open-modal');
            openModal(modalId);
            document.querySelector('body').classList.add('body__no-scroll');
        });
    });

    // Закрытие модального окна по клику на кнопку закрытия
    document.querySelectorAll('.modal__close-button').forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
                document.querySelector('body').classList.remove('body__no-scroll');
            }
        });
    });

    // Закрытие модального окна по клику на фон
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function (event) {
            if (event.target === this) { // Проверяем, что кликнули именно на фон
                closeModal(this);
                document.querySelector('body').classList.remove('body__no-scroll');
            }
        });
    });

    // Закрытие модального окна по нажатию клавиши Esc
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal:not(.modal--hidden)').forEach(modal => {
                closeModal(modal);
                document.querySelector('body').classList.remove('body__no-scroll');
            });
        }
    });

}

