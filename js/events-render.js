// Функция рендера событий
function renderCatalog(array, listId, attendeesText = 'attendees') {
    const eventsList = document.getElementById(listId);
    eventsList.innerHTML = ''; // Очищаем текущий список

    array.forEach((event) => {
        // Создаем основной контейнер карточки
        const eventItem = document.createElement('div');
        eventItem.className = 'events__item';

        // Создаем саму карточку, одновременна она же ссылка-обертка
        const eventLink = document.createElement('a');
        eventLink.href = "#";
        eventLink.className = 'event';

        // Создаем контейнер превьшки
        const eventThumbnail = document.createElement('div');
        eventThumbnail.className = 'event__thumbnail';
        const eventImg = document.createElement('img');
        eventImg.src = event.image;
        eventImg.alt = event.title;
        eventThumbnail.appendChild(eventImg);

        // Блок информации (для всего текста)
        const eventInfo = document.createElement('div');
        eventInfo.className = 'event__information';

        // Дата
        const eventDate = document.createElement('div');
        eventDate.className = 'event__date';

        // Опции форматирования для даты
        const dateOptions = {
            weekday: 'short', // День недели в сокращенном формате - Wed в макете
            month: 'short', // Месяц в сокращенном формате - Mar в макете
            day: 'numeric', // Отображает день месяца в числовом формате - 13 в макете
        };

        // Опции форматирования для времени
        const timeOptions = {
            hour: 'numeric', // Часы в числовом формате - 7 в макете
            minute: '2-digit', // Минуты в двухзначном формате - 00 в макете
            hour12: true, // 12-часовой формат - PM/AM в макете
            timeZoneName: 'short', // Название часового пояса - PDT в макете
        };

        // Форматирование даты с использованием указанных опций для даты на англ. языке
        const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(event.date);

        // Форматирование времени с использованием указанных опций для времени на англ. языке
        const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(event.date);

        eventDate.textContent = `${formattedDate} · ${formattedTime}`; // Сборка даты и времени с разделителем точкой "·"

        // Титул события
        const eventTitle = document.createElement('div');
        eventTitle.className = 'event__title';
        eventTitle.textContent = event.title;

        // Категория и расстояние
        const eventMeta = document.createElement('div');
        eventMeta.className = 'event__meta';
        const eventCategory = document.createElement('div');
        eventCategory.className = 'event__category';
        eventCategory.textContent = event.category;
        const eventDistance = document.createElement('div');
        eventMeta.appendChild(eventCategory);
        if (event.distance > 0) {
            eventDistance.className = 'event__distance';
            eventDistance.textContent = `(${event.distance} km)`;
            eventMeta.appendChild(eventDistance);
        }

        // Тип онлайн/оффлайн
        const eventType = document.createElement('div');
        eventType.className = 'event__type';
        eventType.textContent = event.type;

        // Статистика (участники и цена)
        const eventStats = document.createElement('div');
        eventStats.className = 'event__stats';

        const eventAttendees = document.createElement('div');
        eventAttendees.className = 'event__attendees';
        eventAttendees.textContent = `${event.attendees} ${attendeesText == 'attendees' ? 'attendees' : attendeesText}`;

        const eventPrice = document.createElement('div');
        eventPrice.className = 'event__price';
        eventPrice.textContent = event.price;

        event.attendees ? eventStats.appendChild(eventAttendees) : '';
        event.price ? eventStats.appendChild(eventPrice) : '';

        // Собираем всю вместе
        eventInfo.appendChild(eventDate);
        eventInfo.appendChild(eventTitle);
        eventInfo.appendChild(eventMeta);
        event.type === 'online' ? eventInfo.appendChild(eventType) : '';
        eventInfo.appendChild(eventStats);
        eventLink.appendChild(eventThumbnail);
        eventLink.appendChild(eventInfo);
        eventItem.appendChild(eventLink);

        // Добавляем карточку в контейнер
        eventsList.appendChild(eventItem);
    });
}

function renderNoElementsBanner(listId, text = 'Нет результатов') {
    const eventsList = document.getElementById(listId);
    eventsList.innerHTML = ''; // Очищаем текущий список

    // Создаем баннер и добавляем в него текст
    const banner = document.createElement('div');
    banner.className = 'events__no-elements';
    banner.textContent = text;
    // Добавляем баннер в список
    eventsList.appendChild(banner);
};

