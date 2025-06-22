const burgerButton = document.querySelector('.header__burger-button');
const mobileMenu = document.querySelector('#mobileOverlay');
const closeButton = document.querySelector('.mobile-overlay__close-button');

burgerButton.addEventListener('click', function () {
    mobileMenu.showModal();
    document.body.classList.add('no-scroll');
})

closeButton.addEventListener('click', function () {
    mobileMenu.close();
    document.body.classList.remove('no-scroll');
})


// document.querySelectorAll('.faq__title').forEach(title => {
//     title.addEventListener('click', () => {
//         const button = title.querySelector('.faq__button');
//         const content = title.nextElementSibling;

//         const isOpen = content.classList.contains('open');

//         // Переключаем иконку +/×
//         button.classList.toggle('active');

//         if (isOpen) {
//             // Закрытие
//             content.style.maxHeight = content.scrollHeight + 'px'; // Сначала выставляем текущую высоту
//             requestAnimationFrame(() => {
//                 content.style.maxHeight = '0px';
//                 content.style.opacity = '0';
//             });
//             content.classList.remove('open');
//         } else {
//             // Открытие
//             content.classList.add('open');
//             content.style.maxHeight = content.scrollHeight + 'px';
//             content.style.opacity = '1';


//         }

//     });
// });


document.querySelectorAll('.faq__title').forEach(title => {
    title.addEventListener('click', () => {
        const button = title.querySelector('.faq__button');
        const content = title.nextElementSibling;
        const isOpen = content.classList.contains('open');

        // Закрываем все блоки
        document.querySelectorAll('.faq__text').forEach(el => {
            el.classList.remove('open');
            el.style.maxHeight = '0px';
            el.style.opacity = '0';
        });

        // Сбрасываем активные кнопки
        document.querySelectorAll('.faq__button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Если текущий блок был закрыт - открываем его
        if (!isOpen) {
            content.classList.add('open');
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';

            button.classList.add('active');
        }
    });
});


const carousel = document.querySelector('.seen__carousel');
const btnNext = document.querySelector('.seen__carousel-btn.next');
const btnPrev = document.querySelector('.seen__carousel-btn.prev');

const visibleItems = 1; // Сколько видно элементов одновременно
let itemW = 0;
let totalRealItems = 0; // сохраняем количество оригинальных элементов

// Функция для вычисления ширины айтема (с учетом gap)
const itemWidth = () => {
    const item = document.querySelector('.seen__item');
    return item ? item.offsetWidth + 48 : 200;
}

// Клонируем элементы в начало и конец — создаем эффект loop
const setupLoop = () => {
    const items = Array.from(carousel.querySelectorAll('.seen__item'));
    totalRealItems = items.length; // сохраняем количество оригинальных элементов
    itemW = itemWidth();

    // Клонируем последние visibleItems в начало и первые — в конец
    const clonesBefore = items.slice(-visibleItems).map(el => el.cloneNode(true));
    const clonesAfter = items.slice(0, visibleItems).map(el => el.cloneNode(true));

    clonesBefore.forEach(clone => carousel.prepend(clone));
    clonesAfter.forEach(clone => carousel.append(clone));

    // Ставим скролл на первый "реальный" элемент
    carousel.scrollLeft = itemW * visibleItems;
}

window.addEventListener('load', setupLoop); // запускаем инициализацию после полной загрузки страницы

// Обработка кнопок
btnNext.addEventListener('click', () => {
    console.log('→ Кнопка вперёд нажата');
    carousel.scrollBy({ left: itemWidth(), behavior: 'smooth' });
});

btnPrev.addEventListener('click', () => {
    console.log('→ Кнопка назад нажата');
    carousel.scrollBy({ left: -itemWidth(), behavior: 'smooth' });
});

// Проверка на перепрыжку: если уходим в клоны — возвращаемся к реальным элементам
carousel.addEventListener('scroll', () => {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    // Если ушли слишком влево (в клоны начала)
    if (carousel.scrollLeft <= 0) {
        carousel.style.scrollBehavior = 'auto'; // отключаем анимацию
        carousel.scrollLeft = itemW * totalRealItems; // Переход на последний оригинальный
        carousel.style.scrollBehavior = 'smooth'; // возвращаем плавность
    }

    // Если ушли слишком вправо (в клоны конца)
    else if (carousel.scrollLeft >= maxScroll - itemW * visibleItems) {
        carousel.style.scrollBehavior = 'auto';
        carousel.scrollLeft = itemW * visibleItems; // Переход на первый оригинальный
        carousel.style.scrollBehavior = 'smooth';
    }
});


//Optional: Touch support for mobile
let startX = 0;
let isDown = false;

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDown = true;
});

carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].clientX;
    const diff = startX - x;
    carousel.scrollLeft += diff;
    startX = x;
});

carousel.addEventListener('touchend', () => {
    isDown = false;
});

// Автопрокрутка
// setInterval(() => {
//     carousel.scrollBy({left: itemWidth(), behavior: 'smooth'});
// }, 3000);

// // Адаптивный слайдер для отзывов
// class ReviewSlider {
//     constructor() {
//         this.reviewsSection = document.querySelector('.reviews');
//         this.reviewsItems = document.querySelector('.reviews__items');
//         this.reviews = document.querySelectorAll('.reviews__item');
//         this.currentSlide = 0;
//         this.isSliderActive = false;
//         this.touchStartX = 0;
//         this.touchEndX = 0;

//         // Проверяем существование элементов
//         if (!this.reviewsSection || !this.reviewsItems || this.reviews.length === 0) {
//             console.warn('ReviewSlider: Необходимые элементы не найдены');
//             return;
//         }

//         this.init();
//     }

//     init() {
//         this.checkScreenSize();
//         this.createSliderControls();
//         this.addEventListeners();
//     }

//     checkScreenSize() {
//         const screenWidth = window.innerWidth;
//         const shouldActivateSlider = screenWidth <= 1024;

//         if (shouldActivateSlider && !this.isSliderActive) {
//             this.activateSlider();
//         } else if (!shouldActivateSlider && this.isSliderActive) {
//             this.deactivateSlider();
//         }
//     }

//     // Определяем количество видимых слайдов
//     getVisibleSlidesCount() {
//         const screenWidth = window.innerWidth;
//         if (screenWidth <= 768) return 1;
//         if (screenWidth <= 1024) return 2;
//         return 3;
//     }

//     // Получаем максимальный индекс слайда
//     getMaxSlideIndex() {
//         const visibleSlides = this.getVisibleSlidesCount();
//         return Math.max(0, this.reviews.length - visibleSlides);
//     }

//     activateSlider() {
//         this.isSliderActive = true;
//         this.reviewsItems.classList.add('reviews__items--slider');

//         // Показываем навигацию
//         const navigation = this.reviewsSection.querySelector('.reviews__navigation');
//         if (navigation) {
//             navigation.style.display = 'flex';
//         }

//         // Сбрасываем позицию слайдера
//         this.currentSlide = Math.min(this.currentSlide, this.getMaxSlideIndex());
//         this.updateSlider();
//     }

//     deactivateSlider() {
//         this.isSliderActive = false;
//         this.reviewsItems.classList.remove('reviews__items--slider');
//         this.reviewsItems.style.transform = '';

//         // Скрываем навигацию
//         const navigation = this.reviewsSection.querySelector('.reviews__navigation');
//         if (navigation) {
//             navigation.style.display = 'none';
//         }

//         // Убираем ARIA-атрибуты
//         this.reviews.forEach(review => {
//             review.removeAttribute('aria-hidden');
//         });
//     }

//     createSliderControls() {
//         // Проверяем, не создана ли уже навигация
//         if (this.reviewsSection.querySelector('.reviews__navigation')) {
//             return;
//         }

//         // Создаем навигацию
//         const navigation = document.createElement('div');
//         navigation.className = 'reviews__navigation';
//         navigation.innerHTML = `
//             <button class="reviews__nav-btn reviews__nav-btn--prev" aria-label="Предыдущий слайд">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                     <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>
//             </button>
//             <div class="reviews__dots"></div>
//             <button class="reviews__nav-btn reviews__nav-btn--next" aria-label="Следующий слайд">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                     <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>
//             </button>
//         `;

//         // Создаем точки навигации (показываем только нужное количество)
//         const dotsContainer = navigation.querySelector('.reviews__dots');
//         const maxSlides = this.getMaxSlideIndex() + 1;

//         for (let i = 0; i < maxSlides; i++) {
//             const dot = document.createElement('button');
//             dot.className = 'reviews__dot';
//             dot.setAttribute('data-slide', i);
//             dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
//             if (i === 0) dot.classList.add('reviews__dot--active');
//             dotsContainer.appendChild(dot);
//         }

//         this.reviewsSection.appendChild(navigation);
//     }

//     addEventListeners() {
//         // Дебаунсинг для resize
//         let resizeTimer;
//         window.addEventListener('resize', () => {
//             clearTimeout(resizeTimer);
//             resizeTimer = setTimeout(() => {
//                 this.checkScreenSize();
//                 // Пересоздаем точки навигации при изменении размера
//                 if (this.isSliderActive) {
//                     this.updateDotsNavigation();
//                 }
//             }, 150);
//         });

//         // Кнопки навигации 
//         const prevBtn = this.reviewsSection.querySelector('.reviews__nav-btn--prev');
//         const nextBtn = this.reviewsSection.querySelector('.reviews__nav-btn--next');

//         prevBtn?.addEventListener('click', () => this.prevSlide());
//         nextBtn?.addEventListener('click', () => this.nextSlide());

//         // Точки навигации (используем делегирование событий)
//         const dotsContainer = this.reviewsSection.querySelector('.reviews__dots');
//         dotsContainer?.addEventListener('click', (e) => {
//             if (e.target.classList.contains('reviews__dot')) {
//                 const slideIndex = parseInt(e.target.getAttribute('data-slide'));
//                 this.goToSlide(slideIndex);
//             }
//         });

//         // Свайпы
//         this.reviewsItems.addEventListener('touchstart', (e) => {
//             this.touchStartX = e.changedTouches[0].screenX;
//         }, { passive: true });

//         this.reviewsItems.addEventListener('touchend', (e) => {
//             this.touchEndX = e.changedTouches[0].screenX;
//             this.handleSwipe();
//         }, { passive: true });

//         // Клавиатурная навигация
//         document.addEventListener('keydown', (e) => {
//             if (!this.isSliderActive) return;

//             if (e.key === 'ArrowLeft') {
//                 e.preventDefault();
//                 this.prevSlide();
//             } else if (e.key === 'ArrowRight') {
//                 e.preventDefault();
//                 this.nextSlide();
//             }
//         });
//     }

//     // Обновляем точки навигации при изменении размера экрана
//     updateDotsNavigation() {
//         const dotsContainer = this.reviewsSection.querySelector('.reviews__dots');
//         if (!dotsContainer) return;

//         // Очищаем существующие точки
//         dotsContainer.innerHTML = '';

//         // Создаем новые точки
//         const maxSlides = this.getMaxSlideIndex() + 1;
//         for (let i = 0; i < maxSlides; i++) {
//             const dot = document.createElement('button');
//             dot.className = 'reviews__dot';
//             dot.setAttribute('data-slide', i);
//             dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
//             if (i === this.currentSlide) dot.classList.add('reviews__dot--active');
//             dotsContainer.appendChild(dot);
//         }

//         // Проверяем текущую позицию
//         if (this.currentSlide > this.getMaxSlideIndex()) {
//             this.currentSlide = this.getMaxSlideIndex();
//             this.updateSlider();
//         }
//     }

//     handleSwipe() {
//         const swipeThreshold = 50;
//         const diff = this.touchStartX - this.touchEndX;

//         if (Math.abs(diff) > swipeThreshold) {
//             if (diff > 0) {
//                 this.nextSlide();
//             } else {
//                 this.prevSlide();
//             }
//         }
//     }

//     nextSlide() {
//         if (!this.isSliderActive) return;

//         const maxIndex = this.getMaxSlideIndex();
//         if (this.currentSlide < maxIndex) {
//             this.currentSlide++;
//             this.updateSlider();
//         }
//     }

//     prevSlide() {
//         if (!this.isSliderActive) return;

//         if (this.currentSlide > 0) {
//             this.currentSlide--;
//             this.updateSlider();
//         }
//     }

//     goToSlide(index) {
//         if (!this.isSliderActive) return;

//         const maxIndex = this.getMaxSlideIndex();
//         this.currentSlide = Math.max(0, Math.min(index, maxIndex));
//         this.updateSlider();
//     }

//     updateSlider() {
//         if (!this.isSliderActive) return;

//         // Вычисляем ширину одного слайда с учетом gap
//         const containerWidth = this.reviewsItems.offsetWidth;
//         const visibleSlides = this.getVisibleSlidesCount();
//         const gap = 24; // из CSS
//         const slideWidth = (containerWidth + gap) / visibleSlides;
//         const offset = -this.currentSlide * slideWidth;

//         this.reviewsItems.style.transform = `translateX(${offset}px)`;

//         // Обновляем точки навигации
//         const dots = this.reviewsSection.querySelectorAll('.reviews__dot');
//         dots.forEach((dot, index) => {
//             dot.classList.toggle('reviews__dot--active', index === this.currentSlide);
//         });

//         // Обновляем состояние кнопок
//         this.updateNavigationButtons();

//         // Обновляем ARIA-атрибуты для доступности
//         this.updateAriaAttributes();
//     }

//     updateNavigationButtons() {
//         const prevBtn = this.reviewsSection.querySelector('.reviews__nav-btn--prev');
//         const nextBtn = this.reviewsSection.querySelector('.reviews__nav-btn--next');
//         const maxIndex = this.getMaxSlideIndex();

//         if (prevBtn) {
//             prevBtn.disabled = this.currentSlide === 0;
//             prevBtn.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
//         }

//         if (nextBtn) {
//             nextBtn.disabled = this.currentSlide >= maxIndex;
//             nextBtn.style.opacity = this.currentSlide >= maxIndex ? '0.5' : '1';
//         }
//     }

//     updateAriaAttributes() {
//         const visibleSlides = this.getVisibleSlidesCount();

//         this.reviews.forEach((review, index) => {
//             const isVisible = index >= this.currentSlide && 
//                              index < this.currentSlide + visibleSlides;
//             review.setAttribute('aria-hidden', !isVisible);
//         });
//     }
// }

// // Инициализация слайдера
// document.addEventListener('DOMContentLoaded', () => {
//     new ReviewSlider();
// });


// // Адаптивный слайдер для отзывов
// class ReviewSlider {
//     constructor() {
//         this.reviewsSection = document.querySelector('.reviews');
//         this.reviewsItems = document.querySelector('.reviews__items');
//         this.reviews = document.querySelectorAll('.reviews__item');
//         this.currentSlide = 0;
//         this.isSliderActive = false;
//         this.touchStartX = 0;
//         this.touchEndX = 0;

//         // Проверяем существование элементов
//         if (!this.reviewsSection || !this.reviewsItems || this.reviews.length === 0) {
//             console.warn('ReviewSlider: Необходимые элементы не найдены. Слайдер не будет инициализирован.');
//             return;
//         }

//         this.init();
//     }

//     init() {
//         this.createSliderControls(); // Создаем элементы управления до checkScreenSize, чтобы они были доступны
//         this.checkScreenSize();
//         this.addEventListeners();
//     }

//     checkScreenSize() {
//         const screenWidth = window.innerWidth;
//         const shouldActivateSlider = screenWidth <= 1024;

//         if (shouldActivateSlider && !this.isSliderActive) {
//             this.activateSlider();
//         } else if (!shouldActivateSlider && this.isSliderActive) {
//             this.deactivateSlider();
//         }
//     }

//     // Определяем количество видимых слайдов
//     getVisibleSlidesCount() {
//         const screenWidth = window.innerWidth;
//         if (screenWidth <= 768) return 1;
//         if (screenWidth <= 1024) return 2;
//         return 3; // Для десктопа (если слайдер не активен, то 3)
//     }

//     // Получаем максимальный индекс слайда
//     getMaxSlideIndex() {
//         const visibleSlides = this.getVisibleSlidesCount();
//         return Math.max(0, this.reviews.length - visibleSlides);
//     }

//     activateSlider() {
//         this.isSliderActive = true;
//         this.reviewsItems.classList.add('reviews__items--slider');

//         // Показываем навигацию
//         const navigation = this.reviewsSection.querySelector('.reviews__navigation');
//         if (navigation) {
//             navigation.style.display = 'flex';
//         }

//         // Сбрасываем позицию слайдера, если она выходит за пределы
//         this.currentSlide = Math.min(this.currentSlide, this.getMaxSlideIndex());
//         this.updateDotsNavigation(); // Обновляем точки при активации
//         this.updateSlider();
//     }

//     deactivateSlider() {
//         this.isSliderActive = false;
//         this.reviewsItems.classList.remove('reviews__items--slider');
//         this.reviewsItems.style.transform = ''; // Сбрасываем трансформацию

//         // Скрываем навигацию
//         const navigation = this.reviewsSection.querySelector('.reviews__navigation');
//         if (navigation) {
//             navigation.style.display = 'none';
//         }

//         // Убираем ARIA-атрибуты
//         this.reviews.forEach(review => {
//             review.removeAttribute('aria-hidden');
//         });
//     }

//     createSliderControls() {
//         // Проверяем, не создана ли уже навигация
//         if (this.reviewsSection.querySelector('.reviews__navigation')) {
//             return;
//         }

//         // Создаем навигацию
//         const navigation = document.createElement('div');
//         navigation.className = 'reviews__navigation';
//         navigation.innerHTML = `
//             <button class="reviews__nav-btn reviews__nav-btn--prev" aria-label="Предыдущий слайд">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                     <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>
//             </button>
//             <div class="reviews__dots"></div>
//             <button class="reviews__nav-btn reviews__nav-btn--next" aria-label="Следующий слайд">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                     <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>
//             </button>
//         `;

//         this.reviewsSection.appendChild(navigation);
//         this.updateDotsNavigation(); // Изначально создаем точки
//     }

//     addEventListeners() {
//         // Дебаунсинг для resize
//         let resizeTimer;
//         window.addEventListener('resize', () => {
//             clearTimeout(resizeTimer);
//             resizeTimer = setTimeout(() => {
//                 this.checkScreenSize();
//                 // Пересоздаем точки навигации при изменении размера, если слайдер активен
//                 if (this.isSliderActive) {
//                     this.updateDotsNavigation();
//                 }
//             }, 150);
//         });

//         // Кнопки навигации 
//         // Используем ? для безопасного доступа, так как кнопки могут быть null, если JS не инициализировал их
//         const prevBtn = this.reviewsSection.querySelector('.reviews__nav-btn--prev');
//         const nextBtn = this.reviewsSection.querySelector('.reviews__nav-btn--next');

//         prevBtn?.addEventListener('click', () => this.prevSlide());
//         nextBtn?.addEventListener('click', () => this.nextSlide());

//         // Точки навигации (используем делегирование событий)
//         const dotsContainer = this.reviewsSection.querySelector('.reviews__dots');
//         dotsContainer?.addEventListener('click', (e) => {
//             if (e.target.classList.contains('reviews__dot')) {
//                 const slideIndex = parseInt(e.target.getAttribute('data-slide'));
//                 this.goToSlide(slideIndex);
//             }
//         });

//         // Свайпы
//         this.reviewsItems.addEventListener('touchstart', (e) => {
//             if (!this.isSliderActive) return; // Только если слайдер активен
//             this.touchStartX = e.changedTouches[0].screenX;
//         }, { passive: true });

//         this.reviewsItems.addEventListener('touchend', (e) => {
//             if (!this.isSliderActive) return; // Только если слайдер активен
//             this.touchEndX = e.changedTouches[0].screenX;
//             this.handleSwipe();
//         }, { passive: true });

//         // Клавиатурная навигация
//         document.addEventListener('keydown', (e) => {
//             if (!this.isSliderActive) return;

//             if (e.key === 'ArrowLeft') {
//                 e.preventDefault();
//                 this.prevSlide();
//             } else if (e.key === 'ArrowRight') {
//                 e.preventDefault();
//                 this.nextSlide();
//             }
//         });
//     }

//     // Обновляем точки навигации при изменении размера экрана
//     updateDotsNavigation() {
//         const dotsContainer = this.reviewsSection.querySelector('.reviews__dots');
//         if (!dotsContainer) return;

//         // Очищаем существующие точки
//         dotsContainer.innerHTML = '';

//         // Создаем новые точки
//         // Количество точек равно количеству возможных "начальных" слайдов
//         const maxSlides = this.getMaxSlideIndex() + 1; 

//         // Если слайдов меньше или равно видимому количеству, точки не нужны
//         if (maxSlides <= 1) { // Если только 1 или 0 возможных позиций для скролла
//             dotsContainer.style.display = 'none';
//             return;
//         } else {
//             dotsContainer.style.display = 'flex'; // Показываем, если нужно
//         }


//         for (let i = 0; i < maxSlides; i++) {
//             const dot = document.createElement('button');
//             dot.className = 'reviews__dot';
//             dot.setAttribute('data-slide', i);
//             dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
//             if (i === this.currentSlide) dot.classList.add('reviews__dot--active');
//             dotsContainer.appendChild(dot);
//         }

//         // Проверяем текущую позицию, если она выходит за пределы нового getMaxSlideIndex
//         if (this.currentSlide > this.getMaxSlideIndex()) {
//             this.currentSlide = this.getMaxSlideIndex();
//             this.updateSlider();
//         }
//     }

//     handleSwipe() {
//         const swipeThreshold = 50; // Минимальное расстояние для свайпа
//         const diff = this.touchStartX - this.touchEndX;

//         if (Math.abs(diff) > swipeThreshold) {
//             if (diff > 0) { // Свайп влево (показываем следующий)
//                 this.nextSlide();
//             } else { // Свайп вправо (показываем предыдущий)
//                 this.prevSlide();
//             }
//         }
//     }

//     nextSlide() {
//         if (!this.isSliderActive) return;

//         const maxIndex = this.getMaxSlideIndex();
//         if (this.currentSlide < maxIndex) {
//             this.currentSlide++;
//             this.updateSlider();
//         }
//     }

//     prevSlide() {
//         if (!this.isSliderActive) return;

//         if (this.currentSlide > 0) {
//             this.currentSlide--;
//             this.updateSlider();
//         }
//     }

//     goToSlide(index) {
//         if (!this.isSliderActive) return;

//         const maxIndex = this.getMaxSlideIndex();
//         this.currentSlide = Math.max(0, Math.min(index, maxIndex));
//         this.updateSlider();
//     }

//     updateSlider() {
//         if (!this.isSliderActive) return;

//         const firstReview = this.reviews[0];
//         if (!firstReview) {
//             // Это должно быть уже обработано в конструкторе, но на всякий случай
//             console.warn('No review items found to calculate slide width.');
//             return;
//         }

//         // Получаем вычисленную ширину первого элемента отзыва (с padding, border)
//         const itemWidth = firstReview.offsetWidth; 

//         // Получаем вычисленное значение gap из reviews__items
//         // getComputedStyle возвращает строку, например "24px", поэтому парсим в число.
//         const computedReviewsItemsStyle = window.getComputedStyle(this.reviewsItems);
//         // flex-gap может быть 'Xpx Ypx', поэтому используем split и parseFloat для первого значения
//         const gap = parseFloat(computedReviewsItemsStyle.gap.split(' ')[0]) || 0;

//         // Рассчитываем смещение: текущий слайд * (ширина элемента + gap)
//         const offset = -this.currentSlide * (itemWidth + gap);

//         this.reviewsItems.style.transform = `translateX(${offset}px)`;

//         // Обновляем точки навигации (их класс активности)
//         const dots = this.reviewsSection.querySelectorAll('.reviews__dot');
//         dots.forEach((dot, index) => {
//             dot.classList.toggle('reviews__dot--active', index === this.currentSlide);
//         });

//         // Обновляем состояние кнопок (disabled)
//         this.updateNavigationButtons();

//         // Обновляем ARIA-атрибуты для доступности
//         this.updateAriaAttributes();
//     }

//     updateNavigationButtons() {
//         const prevBtn = this.reviewsSection.querySelector('.reviews__nav-btn--prev');
//         const nextBtn = this.reviewsSection.querySelector('.reviews__nav-btn--next');
//         const maxIndex = this.getMaxSlideIndex();

//         if (prevBtn) {
//             prevBtn.disabled = this.currentSlide === 0;
//         }

//         if (nextBtn) {
//             nextBtn.disabled = this.currentSlide >= maxIndex;
//         }
//     }

//     updateAriaAttributes() {
//         const visibleSlides = this.getVisibleSlidesCount();

//         this.reviews.forEach((review, index) => {
//             // Слайд скрыт, если его индекс вне диапазона видимых слайдов
//             const isHidden = index < this.currentSlide || index >= this.currentSlide + visibleSlides;
//             review.setAttribute('aria-hidden', isHidden);
//             // Если вы хотите, чтобы только видимые были tabindex=0, а скрытые - tabindex=-1
//             // review.setAttribute('tabindex', isHidden ? '-1' : '0'); 
//             // Это может быть полезно для скринридеров, чтобы не читать скрытые элементы
//         });
//     }
// }

// // Инициализация слайдера
// document.addEventListener('DOMContentLoaded', () => {
//     new ReviewSlider();
// });

document.addEventListener('DOMContentLoaded', () => {
    // Get references to key DOM elements
    const reviewsItems = document.getElementById('reviewsItems');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    const sliderDotsContainer = document.getElementById('sliderDots');
    const reviewItems = Array.from(reviewsItems.children); // Convert HTMLCollection to Array for easier iteration

    let currentIndex = 0; // Tracks the currently active slide index
    let itemWidth = 0; // Stores the calculated width of a single review card including gap
    let isDragging = false; // Flag for touch/swipe interaction
    let startPos = 0; // Starting X position of touch
    let currentTranslate = 0; // Current scroll position during drag
    let prevTranslate = 0; // Previous scroll position for calculating drag difference

    /**
     * Dynamically updates the width of a single review item including its gap.
     * This is crucial for accurate scrolling in the slider.
     * It also controls the visibility of slider arrows/dots based on screen width.
     */
    const updateItemWidth = () => {
        if (reviewItems.length === 0) return; // No items to calculate

        const firstItem = reviewItems[0];
        // Get the gap value from the parent reviewsItems container
        const gap = parseFloat(getComputedStyle(reviewsItems).gap);
        itemWidth = firstItem.offsetWidth + gap; // Item width + gap for scrolling distance

        // Check current window width to determine if slider mode is active
        if (window.innerWidth > 968) {
            // On large screens (desktop), the layout is a grid, not a slider.
            // Hide slider navigation and disable horizontal scrolling.
            sliderPrev.style.display = 'none';
            sliderNext.style.display = 'none';
            sliderDotsContainer.style.display = 'none';
            reviewsItems.style.overflowX = 'hidden'; // Ensure no horizontal scrollbar
            reviewsItems.style.scrollSnapType = 'none'; // Disable snapping
        } else {
            // On smaller screens (tablet/mobile), activate slider mode.
            // Show slider navigation and enable horizontal scrolling with snapping.
            sliderPrev.style.display = 'flex'; // Use flex to center arrow content
            sliderNext.style.display = 'flex';
            sliderDotsContainer.style.display = 'flex'; // Use flex to center dots
            reviewsItems.style.overflowX = 'auto'; // Enable horizontal scrollbar (though hidden by CSS)
            reviewsItems.style.scrollSnapType = 'x mandatory'; // Enable snapping
        }
    };

    /**
     * Generates and updates the pagination dots based on the number of review items.
     * Also highlights the active dot corresponding to the current slide.
     */
    const updateDots = () => {
        sliderDotsContainer.innerHTML = ''; // Clear existing dots
        const numSlides = reviewItems.length; // Each item gets a dot when snapping

        // Only show dots if there's more than one item and slider is active
        if (numSlides <= 1 || window.innerWidth > 968) {
            sliderDotsContainer.style.display = 'none';
            return;
        } else {
            sliderDotsContainer.style.display = 'flex';
        }

        for (let i = 0; i < numSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === currentIndex) {
                dot.classList.add('active'); // Add 'active' class to current dot
            }
            // Add click listener to each dot to jump to the corresponding slide
            dot.addEventListener('click', () => {
                currentIndex = i; // Set new index
                scrollToCurrentIndex(); // Scroll to the new index
                updateDots(); // Update dot active state
            });
            sliderDotsContainer.appendChild(dot);
        }
    };

    /**
     * Scrolls the reviews container to the position of the current slide.
     * Uses smooth scroll behavior.
     */
    const scrollToCurrentIndex = () => {
        // Ensure currentIndex is within valid bounds
        if (currentIndex < 0) {
            currentIndex = 0;
        } else if (currentIndex >= reviewItems.length) {
            currentIndex = reviewItems.length - 1;
        }

        // Recalculate itemWidth if it's not set (e.g., on initial load or resize)
        if (itemWidth === 0 || window.innerWidth > 968) {
            updateItemWidth();
            if (window.innerWidth > 968) return; // If not in slider mode, exit
        }

        const scrollPosition = currentIndex * itemWidth; // Calculate target scroll position
        reviewsItems.scrollTo({
            left: scrollPosition,
            behavior: 'smooth' // Smooth scrolling animation
        });

        updateArrowStates(); // Update arrow button disabled states after scroll
    };

    /**
     * Updates the disabled state of the previous/next arrow buttons
     * based on the current scroll position.
     */
    const updateArrowStates = () => {
        // Disable previous arrow if at the very beginning of the scroll area
        if (reviewsItems.scrollLeft <= 1) { // Using a small tolerance for exact 0
            sliderPrev.disabled = true;
        } else {
            sliderPrev.disabled = false;
        }

        // Disable next arrow if at the very end of the scroll area
        // reviewsItems.scrollWidth: total width of scrollable content
        // reviewsItems.clientWidth: visible width of the container
        // reviewsItems.scrollLeft: current horizontal scroll position
        const isAtEnd = reviewsItems.scrollLeft + reviewsItems.clientWidth >= reviewsItems.scrollWidth - 1;

        if (isAtEnd) {
            sliderNext.disabled = true;
        } else {
            sliderNext.disabled = false;
        }

        // If there's only one item or if it's on desktop, disable both arrows
        if (reviewItems.length <= 1 || window.innerWidth > 968) {
            sliderPrev.disabled = true;
            sliderNext.disabled = true;
        }
    };

    // --- Event Listeners for Navigation ---

    // Click listener for the "Previous" arrow
    sliderPrev.addEventListener('click', () => {
        currentIndex--; // Decrement index
        scrollToCurrentIndex(); // Scroll to new index
        updateDots(); // Update active dot
    });

    // Click listener for the "Next" arrow
    sliderNext.addEventListener('click', () => {
        currentIndex++; // Increment index
        scrollToCurrentIndex(); // Scroll to new index
        updateDots(); // Update active dot
    });

    // Listen for scroll events on the reviews container
    // This is primarily for updating dots and arrow states when user scrolls manually (e.g., via trackpad or swipe)
    reviewsItems.addEventListener('scroll', () => {
        // Only update if in slider mode
        if (window.innerWidth <= 968) {
            const scrollLeft = reviewsItems.scrollLeft;
            // Calculate the new index based on scroll position
            const newIndex = Math.round(scrollLeft / itemWidth);
            if (newIndex !== currentIndex) {
                currentIndex = newIndex; // Update current index if changed
                updateDots(); // Update dots
            }
            updateArrowStates(); // Always update arrow states
        }
    });

    // --- Touch/Swipe Functionality for Mobile ---

    // When touch starts (finger down)
    reviewsItems.addEventListener('touchstart', (e) => {
        if (window.innerWidth > 968) return; // Only enable swipe on slider-active screens
        isDragging = true;
        startPos = e.touches[0].clientX; // Get initial touch X position
        prevTranslate = reviewsItems.scrollLeft; // Store current scroll position to calculate movement from
    });

    // When finger moves on screen
    reviewsItems.addEventListener('touchmove', (e) => {
        if (!isDragging || window.innerWidth > 968) return;
        const currentTouchX = e.touches[0].clientX;
        const diff = startPos - currentTouchX; // Calculate horizontal difference moved
        currentTranslate = prevTranslate + diff; // New desired scroll position

        // Clamp scroll position to prevent overscrolling beyond content boundaries
        const maxScrollLeft = reviewsItems.scrollWidth - reviewsItems.clientWidth;
        if (currentTranslate < 0) currentTranslate = 0;
        if (currentTranslate > maxScrollLeft) currentTranslate = maxScrollLeft;

        reviewsItems.scrollLeft = currentTranslate; // Directly set scroll position during drag
    });

    // When touch ends (finger up)
    reviewsItems.addEventListener('touchend', () => {
        if (!isDragging || window.innerWidth > 968) return;
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate; // Total distance scrolled during drag

        // Define a threshold for snapping to the next/previous slide
        const threshold = itemWidth * 0.2; // Move at least 20% of an item's width to trigger a snap

        if (Math.abs(movedBy) > threshold) {
            if (movedBy > 0) { // Swiped left (dragged content left), move to next item
                currentIndex = Math.min(currentIndex + 1, reviewItems.length - 1);
            } else { // Swiped right (dragged content right), move to previous item
                currentIndex = Math.max(currentIndex - 1, 0);
            }
        }
        scrollToCurrentIndex(); // Ensure snap to the nearest item after drag ends
        updateDots(); // Update active dot based on final position
    });

    // Prevent default drag behavior to avoid conflicts (e.g., image dragging)
    reviewsItems.addEventListener('dragstart', (e) => e.preventDefault());


    // --- Initialization and Responsiveness ---

    /**
     * Initializes the slider by calculating item widths, setting up dots,
     * and ensuring the correct initial scroll position and arrow states.
     * This function is called on page load and on window resize.
     */
    const initializeSlider = () => {
        updateItemWidth(); // Recalculate item width and visibility of controls
        updateDots(); // Re-generate dots and update active state
        scrollToCurrentIndex(); // Ensure the current item is in view
        updateArrowStates(); // Set initial disabled states for arrows
    };

    // Call initializeSlider when the window is resized
    window.addEventListener('resize', initializeSlider);

    // Initial call to set up the slider when the DOM is fully loaded
    initializeSlider();
});