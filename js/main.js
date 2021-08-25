'use strict';

import app from './modules/app.js';
import f7 from './modules/f7.js';

const appEl = document.getElementById('app');
const loaderEl = document.getElementById('loader-container');

document.onreadystatechange = function () {
  var state = document.readyState;
  if (state == 'interactive') {
    appEl.style.visibility = 'hidden';
  } else if (state == 'complete') {
    loaderEl.style.opacity = 0;
    window.app = app;
    window.app.init();
    setTimeout(function(){
      loaderEl.style.display = 'none';
      appEl.style.visibility = 'visible';
    }, 1000);
  }
}
