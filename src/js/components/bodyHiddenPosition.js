import { BODY, WINDOW, ISHIDDEN } from './_constants';

export function addBodyHidden() {
  sessionStorage.scrollTop = WINDOW.scrollTop();
  BODY.addClass(ISHIDDEN);
  BODY.css('top', -sessionStorage.scrollTop + 'px');
}

export function removeBodyHidden() {
  let bodyFromTop = parseInt(BODY.css('top'), 10) * -1;
  WINDOW.scrollTop(bodyFromTop);
  BODY.css('top', 0);
}
