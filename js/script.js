const burgerButton = document.querySelector(".header__burger-button");
const mobileMenu = document.querySelector("#mobileOverlay");
const closeButton = document.querySelector(".mobile-overlay__close-button");

burgerButton.addEventListener("click", function () {
  mobileMenu.showModal();
  document.body.classList.add("no-scroll");
});

closeButton.addEventListener("click", function () {
  mobileMenu.close();
  document.body.classList.remove("no-scroll");
});

document.querySelectorAll(".faq__title").forEach((title) => {
  title.addEventListener("click", () => {
    const button = title.querySelector(".faq__button");
    const content = title.nextElementSibling;
    const isOpen = content.classList.contains("open");

    // Закрываем все блоки
    document.querySelectorAll(".faq__text").forEach((el) => {
      el.classList.remove("open");
      el.style.maxHeight = "0px";
      el.style.opacity = "0";
    });

    // Сбрасываем активные кнопки
    document.querySelectorAll(".faq__button").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Если текущий блок был закрыт - открываем его
    if (!isOpen) {
      content.classList.add("open");
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.opacity = "1";

      button.classList.add("active");
    }
  });
});

// Инициализация Swiper слайдера
document.addEventListener("DOMContentLoaded", function () {
  const swiper1 = new Swiper(".seen__carousel", {
    // Основные настройки
    slidesPerView: "auto",
    spaceBetween: 48,
    centeredSlides: true,
    loop: true,

    // Навигация
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Автопрокрутка (можно отключить, убрав этот блок)
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Плавная анимация
    speed: 800,
    effect: "slide",

    // Адаптивные брейкпоинты
    breakpoints: {
      320: {
        spaceBetween: 20,
      },
      768: {
        spaceBetween: 32,
      },
      1024: {
        spaceBetween: 48,
      },
    },

    // Дополнительные настройки
    grabCursor: true,
    watchOverflow: true,

    // События (опционально)
    on: {
      init: function () {
        console.log("Swiper инициализирован");
      },
      slideChange: function () {
        // Можно добавить логику при смене слайда
      },
    },
  });

  // Дополнительное управление (опционально)
  // Пауза автопрокрутки при наведении
  const swiperContainer = document.querySelector(".seen__carousel");

  if (swiperContainer) {
    swiperContainer.addEventListener("mouseenter", () => {
      swiper1.autoplay.stop();
    });

    swiperContainer.addEventListener("mouseleave", () => {
      swiper1.autoplay.start();
    });
  }
});

let swiperInstance = null;

function initializeSwiper() {
  // Уничтожаем существующий экземпляр если он есть
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }

  // Инициализируем Swiper только на мобильных устройствах
  if (window.innerWidth <= 480) {
    // Сбрасываем inline стили перед инициализацией
    const wrapper = document.querySelector(".reviews__items");
    const slides = document.querySelectorAll(".reviews__item");

    if (wrapper) {
      wrapper.style.transform = "";
      wrapper.style.transitionDuration = "";
    }

    slides.forEach((slide) => {
      slide.style.transform = "";
      slide.style.width = "";
      slide.style.marginRight = "";
    });

    swiperInstance = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      centeredSlides: false, // ВАЖНО: отключаем центрирование
      grabCursor: true,

      // Исправляем настройки для корректного позиционирования
      watchSlidesProgress: true,
      watchSlidesVisibility: true,

      pagination: {
        el: ".reviews__pagination",
        clickable: true,
      },

      navigation: {
        nextEl: ".reviews__button-next",
        prevEl: ".reviews__button-prev",
      },

      // Принудительно устанавливаем корректные размеры
      on: {
        init: function () {
          console.log("Swiper initialized for mobile");

          // Принудительно сбрасываем позиционирование
          setTimeout(() => {
            if (this.translate !== 0) {
              this.setTranslate(0);
            }
            this.updateSlides();
            this.updateProgress();
            this.updateSlidesClasses();
          }, 100);
        },

        beforeTransitionStart: function () {
          // Сбрасываем любые конфликтующие стили
          const slides = this.slides;
          slides.forEach((slide) => {
            slide.style.marginLeft = "";
            slide.style.marginRight = "";
          });
        },

        resize: function () {
          // При изменении размера пересчитываем позиции
          this.updateSlides();
          this.updateProgress();
          this.updateSlidesClasses();
        },
      },
    });
  }
}

// Обработчик изменения размера окна с дебаунсом
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    initializeSwiper();
  }, 250);
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", initializeSwiper);

// Переинициализация при изменении размера экрана
window.addEventListener("resize", handleResize);

// Дополнительная проверка после полной загрузки страницы
window.addEventListener("load", () => {
  setTimeout(initializeSwiper, 100);
});

document.addEventListener("DOMContentLoaded", function () {
  // Инициализация Flatpickr для выбора даты
  flatpickr("#book__datepicker", {
    dateFormat: "Y-m-d",
    placeholder: "Click to choose date",
  });

  const bookDiscount = document.querySelector(".book__discount");
  if (bookDiscount) {
    // Проверка на существование элемента
    const choices = new Choices(bookDiscount, {
      placeholderValue: "Select discount",
      allowHTML: true,
    });
  }

  const bookTime = document.querySelector(".book__time");
  if (bookTime) {
    // Проверка на существование элемента
    const choices2 = new Choices(bookTime, {
      placeholderValue: "Select hours",
      allowHTML: true,
    });
  }

  const bookLink = document.querySelector('a[href^="#book"]');
  if (bookLink) {
    bookLink.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href");

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = 80;
        const scrollPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    });
  } else {
    console.warn("Ссылка начинающаяся на #book, не найдена.");
  }
});
