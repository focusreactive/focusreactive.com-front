import $ from 'jquery';

export function scrollAnchors() {
  const ANCHOR_LINKS = $('.js-scroll-to');

  ANCHOR_LINKS.on('click', function(event) {
    try {
      let anchor = $(this);
      const href = this.getAttribute('href');
      if (!/^#/.test(href)) return;
      event.preventDefault();
      let scrollDest = $(anchor.attr('href'));

      if (scrollDest.length) {
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop: scrollDest.offset().top + 'px',
            },
            1000,
          );
      }
    } catch (err) {
      console.warn(err);
    }
  });
}
