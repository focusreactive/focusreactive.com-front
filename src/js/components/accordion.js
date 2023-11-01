import $ from 'jquery';

export function accordion() {
  var $item = $('.js-accordion-item');

  $item.on('click', function (e) {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).find('.clients-cases__right').slideUp();
    } else {
      $(this)
        .toggleClass('active')
        .siblings()
        .removeClass('active')
        .find('.clients-cases__right')
        .slideUp();
      $(this).find('.clients-cases__right').slideDown();
    }
  });
}
