// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

ymaps.ready(function () {
	const myMap = new ymaps.Map("map", {
		center: [55.76, 37.64],
		zoom: 7,
	});
	myMap.controls.remove('geolocationControl'); // удаляем геолокацию
	myMap.controls.remove('searchControl'); // удаляем поиск
	myMap.controls.remove('trafficControl'); // удаляем контроль трафика
	myMap.controls.remove('typeSelector'); // удаляем тип
	myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
	myMap.controls.remove('rulerControl'); // удаляем контрол правил
	myMap.behaviors.disable('scrollZoom');
	const centralPlacemark = new ymaps.Placemark(
		[55.76, 37.64],
		{ hintContent: 'Центральный офис', balloonContent: 'Время работы: Пн-Пт, с 9 до 20' },
		{
			// Необходимо указать данный тип макета.
			iconLayout: 'default#image',
			// Своё изображение иконки метки.
			iconImageHref: './img/contact/map-icon.svg',
			// Размеры метки.
			iconImageSize: [36, 50],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-18, -25],
		}
	);
	myMap.geoObjects.add(centralPlacemark);
	var servicePlacemark = new ymaps.Placemark([55.35616623000242, 37.429322469480205],
		{ hintContent: 'Сервисный центр', balloonContent: 'Время работы: Пн-Пт, с 9 до 20' },
		{
			iconLayout: 'default#image',
			iconImageHref: './img/contact/map-icon.svg',
			iconImageSize: [36, 50],
			iconImageOffset: [-18, -25],
		});
	myMap.geoObjects.add(servicePlacemark);
});