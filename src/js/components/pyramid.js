import { ISHIDDEN, ISACTIVE } from './_constants';
import $ from 'jquery';

export function pyramid() {
  const pyramidItem = $('.js-pyramid-toggle');
  const pyramidPaginationEl = $('.js-pyramid-pagination span');
  let index = 3;

  const loopOverArray = (el) => {
    index = el.data('pyramid-index');
    index--;
    index < 1 && (index = 3);
    pyramidHandler($('[data-pyramid-index=' + index + ']'));
    console.log(index);
  };

  function pyramidHandler(el) {
    const indexEl = el.data('pyramid-index');
    pyramidItem.not(el).removeClass(ISACTIVE).next().removeClass(ISACTIVE);
    el.addClass(ISACTIVE).next().addClass(ISACTIVE);
    pyramidPagination($('[data-pyramid-pagination-index=' + indexEl + ']'));
  }
  function pyramidPagination(el) {
    pyramidPaginationEl.not(el).removeClass(ISACTIVE);
    el.addClass(ISACTIVE);
  }

  // const pyramidInterval = () => {
  //   return setInterval(() => {
  //     loopOverArray($('.js-pyramid-toggle.is-active'));
  //   }, 8000);
  // };

  // let interval = pyramidInterval();

  // $('.pyramid').on('mouseover', function (e) {
  //   if (e.target !== pyramidItem && !e.target.closest('.js-pyramid-toggle')) {
  //     clearInterval(interval);
  //     console.log('stop');
  //     pyramidPaginationEl.addClass('is-disabled');
  //   }
  // });

  // $('.pyramid').on('mouseleave', function (e) {
  //   console.log('play');
  //   interval = pyramidInterval();
  //   pyramidPaginationEl.removeClass('is-disabled');
  // });

  pyramidItem.on('mouseenter', function (e) {
    pyramidHandler($(this));
  });

  pyramidItem.on('click', function () {
    pyramidHandler($(this));
  });

  pyramidPaginationEl.on('click', function () {
    const indexEl = $(this).data('pyramid-pagination-index');
    pyramidPagination($(this));
    pyramidHandler($('[data-pyramid-index=' + indexEl + ']'));
  });
}
