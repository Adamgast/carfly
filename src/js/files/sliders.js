/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/
// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination, Scrollbar, Keyboard, Mousewheel, FreeMode } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.swiper')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		function destroySlider() {
			let destroySwiper;
			function notMobileSlider() {
				const slider = document.querySelector(".wherebue__slider");
				if (window.innerWidth >= 992 && slider.dataset.desktop == 'true') {
					destroySwiper = new Swiper('.wherebue__slider', { // Указываем скласс нужного слайдера
						// Подключаем модули слайдера
						// для конкретного случая
						modules: [Navigation],
						//direction: 'vertical',
						observer: true,
						observeParents: true,
						slidesPerView: 2,
						spaceBetween: 20,
						autoHeight: true,
						speed: 300,
						//rewind: true,
						//touchRatio: 0,
						//simulateTouch: false,
						loop: true,
						//preloadImages: false,
						//lazy: true,

						/*
						// Эффекты
						effect: 'fade',
						autoplay: {
							delay: 3000,
							disableOnInteraction: false,
						},
						*/

						// Пагинация
						/*
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
						},
						*/

						// Кнопки "влево/вправо"
						navigation: {
							prevEl: '.wherebue__prev',
							nextEl: '.wherebue__next',
						},

						// Брейкпоинты
						/*
						breakpoints: {
							320: {
								slidesPerView: 1,
								spaceBetween: 0,
								autoHeight: true,
							},
							768: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
							992: {
								slidesPerView: 3,
								spaceBetween: 20,
							},
							1268: {
								slidesPerView: 4,
								spaceBetween: 30,
							},
						},
						*/
						// События
						on: {

						}
					});
					slider.dataset.desktop == 'false'
				}
				if (window.innerWidth < 992) {
					slider.dataset.desktop == 'true'
					if (slider.classList.contains("swiper-initialized")) {
						destroySwiper.destroy();
					}
				}
			}
			notMobileSlider();
			window.addEventListener("resize", () => {
				notMobileSlider();
			});
		}
		destroySlider();
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

// Слайдер на всю страницу
function pageSlider() {
	let pageSlider = new Swiper('.page', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation, Pagination, Scrollbar, Keyboard, Mousewheel, FreeMode],
		//Свои классы
		wrapperClass: "page__wrapper",
		slideClass: "page__screen",
		simulateTouch: false,
		//Вертикальный слайдер
		direction: 'vertical',
		//Кол-во слайдов для показа
		slidesPerView: 'auto',
		//Вкл паралакс
		//parallax: true,

		keyboard: {
			//Вкл/выкл
			enabled: true,
			//Вкл/выкл только когда слайдер в пределах вьюпорта
			onlyInViewport: true,
			//Вкл/выкл управления клавишами pageUp, pageDown
			pageUpDown: true,
		},

		//Управление колесом мыши
		mousewheel: {
			//Чувствительность колеса мыши
			sensitivity: 1,
			//Класс обЪекта на котором будет срабатывать прокрутка мыши
			//eventsTarget:".image-slider"
		},

		//Отключаем функционал если слайдов меньше чем нужно
		watchOverflow: true,
		speed: 500,
		//rewind: true,
		//Обновить слайдер
		//при изменеии элементов слайдера
		observer: true,
		//при изменеии родительских элементов слайдера
		observeParents: true,
		//при изменеии дочерних элементов слайдера
		observeSlideChildren: true,

		//Навигация 
		//Буллеты, текущее положение, прогрессбар
		pagination: {
			el: '.page__pagination',
			type: 'bullets',
			clickable: true,
			bulletClass: "page__bullet",
			bulletActiveClass: "page__bullet_active",
		},
		//Скролл
		scrollbar: {
			el: '.page__scroll',
			dragClass: 'page__drag-scroll',
			//Возможность перетаскивать скролл
			draggable: true,
		},
		init: false,
		// События

		on: {
			//СИнициализация слайдера
			init: function () {
				menuSlider();
				setScrollType();
			},
			//Смена слайда
			slideChange: function () {
				menuSliderRemove();
				menuLinks[pageSlider.realIndex].classList.add('_nav-active');
			},
			resize: function () {
				setScrollType();
			},
		},
	});

	let menuLinks = document.querySelectorAll('.menu__link');
	function menuSlider() {
		if (menuLinks.length > 0) {
			menuLinks[pageSlider.realIndex].classList.add('_nav-active');
			for (let index = 0; index < menuLinks.length; index++) {
				const menuLink = menuLinks[index];
				menuLink.addEventListener("click", function (e) {
					// Закрываем меню, если оно открыто
					if (document.documentElement.classList.contains("menu-open")) {
						document.documentElement.classList.remove("menu-open");
						document.documentElement.classList.remove("lock");
					};
					menuSliderRemove()
					pageSlider.slideTo(index, 500);
					menuLink.classList.add('_nav-active');
					e.preventDefault();
				});
			}
		}
	}
	function menuSliderRemove() {
		let menuLinkActive = document.querySelector('.menu__link._nav-active');
		if (menuLinkActive) {
			menuLinkActive.classList.remove('_nav-active');
		}
	}

	function setScrollType() {
		if (document.querySelector('.wrapper').classList.contains('_free')) {
			document.querySelector('.wrapper').classList.remove('_free');
			pageSlider.params.freeMode.enabled = false;
		}
		for (let index = 0; index < pageSlider.slides.length; index++) {
			const pageSlide = pageSlider.slides[index];
			const pageSlideContent = pageSlide.querySelector('.screen-content');
			if (pageSlideContent) {
				const pageSlideContentHeight = pageSlideContent.offsetHeight;
				if (pageSlideContentHeight > window.innerHeight) {
					document.querySelector('.wrapper').classList.add('_free');
					pageSlider.params.freeMode.enabled = true;
					break;
				}
			}
		}
	}
	//Инициализация Слайдера
	pageSlider.init();
}


window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации слайдера на всю страницу
	pageSlider();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});

