// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

ymaps.ready(function () {
	const myMap = new ymaps.Map("map", {
		center: [55.76, 37.64],
		zoom: 7
	});
});
