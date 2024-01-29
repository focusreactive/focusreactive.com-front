import Swiper from 'swiper/bundle';

export function pricesSlider() {
  var bambreakpoint = window.matchMedia('(min-width:768px)');
  var blogArhiveSwiper;

  var breakpointChecker = function () {
    if (bambreakpoint.matches === true) {
      if (blogArhiveSwiper !== undefined) blogArhiveSwiper.destroy(true, true);
      return;
    } else if (bambreakpoint.matches === false) {
      return enableSwiper();
    }
  };

  var enableSwiper = function () {
    blogArhiveSwiper = new Swiper('.prices-swiper', {
      spaceBetween: 0,
      initialSlide: 1,
      loop: false,

      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
      },
      breakpoints: {
        100: {
          slidesPerView: 1.12,
        },

        480: {
          slidesPerView: 1.7,
        },

        600: {
          slidesPerView: 2,
        },
      },
    });
  };

  bambreakpoint.addListener(breakpointChecker);
  breakpointChecker();

  const pricesBtn = document.querySelectorAll('.js-audit-plan-active');

  pricesBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
      const value = this.dataset.action;
      const form = document.querySelector('.mail-form');
      form.querySelector(`input[data-key=visitor-${value}]`).checked = true;
    });
  });
}
