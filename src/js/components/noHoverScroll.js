export function disableHoverOnScroll() {
  const BODY = document.body;
  let timer;

  window.addEventListener(
    'scroll',
    function () {
      clearTimeout(timer);
      if (!BODY.classList.contains('no-hover')) {
        BODY.classList.add('no-hover');
      }

      timer = setTimeout(function () {
        BODY.classList.remove('no-hover');
      }, 250);
    },
    false,
  );
}
