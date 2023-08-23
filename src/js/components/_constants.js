import $ from 'jquery';

export const {
  DOC,
  BODY,
  WINDOW,

  ISACTIVE,
  ISOPEN,
  ISHIDDEN,
  ISFIXED,
  ISERROR,
  ISDARK,
  ISLIGHT,
  ISFOCUS,
} = {
  WINDOW: $(window),
  DOC: $(document),
  BODY: $('body'),

  ISACTIVE: 'is-active',
  ISHIDDEN: 'is-hidden',
  ISOPEN: 'is-open',
  ISFIXED: 'is-fixed',
  ISERROR: 'is-error',
  ISDARK: 'is-dark',
  ISLIGHT: 'is-light',
  ISFOCUS: 'is-focus',
};
