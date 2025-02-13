const typeFilter = document.getElementById('typeFilter');
const distanceFilter = document.getElementById('distanceFilter');
const categoryFilter = document.getElementById('categoryFilter');
const dayFilter = document.getElementById('dayFilter');

function eventsFilter(array) {
    let filteredEvents = Array.isArray(array) ? array.slice() : []; // Создаем копию переданного массива

    let typeValue = typeFilter.value;
    let distanceValue = distanceFilter.value;
    let categoryValue = categoryFilter.value;
    let dayValue = dayFilter.value;


    // Фильтрация по типу (Online/Offline)
    if (typeValue !== "Any type") {
        filteredEvents = filteredEvents.filter(event => event.type.toLowerCase() === typeValue.toLowerCase());
    }

    // Фильтрация по дистанции
    if (distanceValue !== "Any distance") {
        filteredEvents = filteredEvents.filter(event => event.distance === parseInt(distanceValue));
    }

    // Фильтрация по категории
    if (categoryValue !== "Any category") {
        filteredEvents = filteredEvents.filter(event => event.category === categoryValue);
    }

    // Фильтрация по дате
    if (dayValue !== "Any day") {
        filteredEvents = filteredEvents.filter(event => {
            const eventDate = event.date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            return eventDate === dayValue; // .split(" GMT")[0] убираем "GMT+4" перед сравнением
        });
    }

    filteredEvents.length > 0 ? renderCatalog(filteredEvents, 'eventsList') : renderNoElementsBanner('eventsList', 'There are no results matching the filter criteria.');

}

// Запрет фильтров Тип и Расстояние при взаимном выборе
function disabledFilters() {
    if (typeFilter.value === "online") {
        distanceFilter.disabled = true;
    } else {
        distanceFilter.disabled = false;
    }
    if (distanceFilter.value !== "Any distance") {
        typeFilter.disabled = true;
    } else {
        typeFilter.disabled = false;
    }
}

// Добавляем обработчики событий на изменение фильтров
[typeFilter, distanceFilter, categoryFilter, dayFilter].forEach(filter => {
    filter.addEventListener('change', () => {
        disabledFilters();
        eventsFilter(eventsStore);
    });
});


// Вызываем функции взаимосвязи фильтров и рендеринга каталога
disabledFilters();
eventsFilter(eventsStore);


// Подсветка активных селектов
document.querySelectorAll('.filter__select').forEach(select => { //Для каждого фильтра при изменении...
    select.addEventListener('change', (e) => {
        let selectedValue = e.target.value; // берем значение
        let defaultValue = e.target.options[0].value; // берем дефолтное значение в первом оптионе

        if (selectedValue !== defaultValue) { // если текущее значение не равно дефолтному
            e.target.closest('.filter').classList.add('filter--filtered'); // Добавляем класс Отфильтрован
        } else {
            e.target.closest('.filter').classList.remove('filter--filtered'); // И убираем
        }
        e.target.blur();
    });

    // Для анимации стрелки смотрим на фокус и блюр
    select.addEventListener('focus', function (e) {
        e.target.closest('.filter').classList.add('filter--opened');
    });
    select.addEventListener('blur', function (e) {
        e.target.closest('.filter').classList.remove('filter--opened');
    });
});
