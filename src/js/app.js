import $ from 'jquery';
// import { slider } from './components/slider.js';
import { scrollAnchors } from './components/scrollTo.js';
import videoLazy from './components/videoLazy.js';
import { header } from './components/header.js';
import { clickFunctions } from './components/burger.js';
import { viewportHeight } from './components/viewportHeight.js';
import { detectIE } from './components/detectIE.js';
import { disableHoverOnScroll } from './components/noHoverScroll.js';
import objectFitImages from 'object-fit-images';
import { scrollDirection } from './components/scollDirection.js';
import { feedbackForm } from './components/feedbackForm.js';
import { accordion } from './components/accordion.js';
import { expertise } from './components/expertise.js';
import { mixed } from './components/mixed.js';
import { dropdownMenu } from './components/dropdownMenu.js';
import { selectbox } from './components/selectbox.js';
import { video } from './components/video.js';
import { pricesSlider } from './components/pricesSlider.js';
// For github buttons plugin
require('es6-promise').polyfill();
require('isomorphic-fetch');
/**
 * github-repo-buttons.js is loading directly from src/html.js
 */
// require('./lib/github-repo-buttons.js');

const hydrateJs = () => {
  // slider();
  scrollAnchors();
  videoLazy();
  header();
  clickFunctions();
  viewportHeight();
  detectIE();
  disableHoverOnScroll();
  scrollDirection();
  // object-fit polyfill
  var objImages = document.querySelectorAll('img.js-obj-fit');
  objectFitImages(objImages);
  feedbackForm();
  accordion();
  expertise();
  dropdownMenu();
  selectbox();
  pricesSlider();
  mixed();
  // video();
};

$(document).ready(hydrateJs);
window.hydrateJs = hydrateJs;
