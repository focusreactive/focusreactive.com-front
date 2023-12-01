import $ from 'jquery';

export function scrollAnchors() {
  const ANCHOR_LINKS = $('.js-scroll-to');
  const headerHeight = $('.header').innerHeight();
  ANCHOR_LINKS.on('click', function (event) {
    try {
      let anchor = $(this);
      const href = this.getAttribute('href');
      if (!/^#/.test(href)) return;
      let scrollDest = $(anchor.attr('href'));

      if (scrollDest.length) {
        $('html, body')
          .stop()
          .animate({ scrollTop: scrollDest.offset().top - headerHeight + 'px' }, 1000);
      }
    } catch (err) {
      console.warn(err);
    }
  });
}
