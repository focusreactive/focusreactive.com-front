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

  $('[data-spoller]').on('click', function () {
    var el = $(this);
    $(this).closest('[data-spollers]').find('[data-spoller]').not($(this)).removeClass('_active');
    $(this)
      .closest('[data-spollers]')
      .find('[data-spoller]')
      .next()
      .not($(this).next())
      .slideUp(200);
    el.next().slideToggle(200);
    el.toggleClass('_active');
    return false;
  });
}
