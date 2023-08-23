import $ from 'jquery';

export function getElemHeight(elem) {
  return $(elem).outerHeight();
};

export function getElemWidth(elem) {
  return $(elem).outerWidth();
};
