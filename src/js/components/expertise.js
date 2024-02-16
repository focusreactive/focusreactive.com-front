import $ from 'jquery';
import { ISHIDDEN, ISACTIVE } from './_constants';

export function expertise() {
  const triggerClick = $('[data-fr-trigger');
  const expertiseClick = (el) => {
    const trigger = el.data('fr-trigger');
    const id = el.data('fr-target');
    const collapse = $(id).data('fr-collapse');

    $('[data-fr-trigger=' + trigger + ']')
      .not(el)
      .parent()
      .removeClass(ISACTIVE);
    el.parent().addClass(ISACTIVE);

    $('[data-fr-collapse=' + collapse + ']').addClass(ISHIDDEN);
    $(id).removeClass(ISHIDDEN);
  };

  triggerClick.on('click', function () {
    expertiseClick($(this));
  });

  $(window).on('resize load', function () {
    if (window.matchMedia('(min-width: 1025px)').matches) {
      triggerClick.on('mouseenter', function () {
        expertiseClick($(this));
      });
    } else {
      triggerClick.off('mouseenter');
    }
  });
}
