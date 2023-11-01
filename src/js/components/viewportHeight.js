import $ from 'jquery';
import { BODY } from './_constants';

export function viewportHeight() {
  function calcVH() {
    var vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let el = document.querySelectorAll('.js-vh');

    for (let i = 0; i < el.length; i++) {
      if (el[i]) {
        if ($(el[i]).hasClass('js-vh-all-sizes')) {
          el[i].setAttribute('style', 'min-height:' + vH + 'px;');
        } else {
          if (window.matchMedia('(max-width: 850px)').matches) {
            el[i].setAttribute('style', 'height:' + vH + 'px;');
          } else {
            el[i].setAttribute('style', 'height: auto;');
          }
        }
      }
    }
  }
  calcVH();
  window.addEventListener('onorientationchange', calcVH, true);
  var scrollTimeout;
  var throttle = 200;
  $(window).on('resize', function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        if (!BODY.hasClass('no-hover')) {
          calcVH();
        }
        scrollTimeout = null;
      }, throttle);
    }
  });
}
