import { ISHIDDEN, ISACTIVE } from './_constants';
import $ from 'jquery';

export function pyramid() {
  const pyramidItem = $('.js-pyramid-toggle');
  function pyramidHandler(el) {
    pyramidItem.not(el).removeClass(ISACTIVE).next().removeClass(ISACTIVE);
    el.addClass(ISACTIVE).next().addClass(ISACTIVE);
  }

  pyramidItem.on('mouseenter', function () {
    pyramidHandler($(this));
  });

  pyramidItem.on('click', function () {
    pyramidHandler($(this));
  });
}
