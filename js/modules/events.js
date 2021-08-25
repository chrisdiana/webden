import app from './app.js';
import f7 from './f7.js';
import { focusEditor } from './editors.js';
import { getLeftTab, getRightTab } from './utils.js';
import { consoleScroll } from './console.js';

const tabs = ['html', 'css', 'javascript', 'console', 'result'];

export function initEventHandlers() {

  window.addEventListener('tab:show', e => {
    // focus editor on tab change
    app.currentTab = e.target.id;
    focusEditor(app.currentTab);

    // scroll to bottom of console
    consoleScroll();
  });

  // fix ios inner height/scroll issues
  window.onscroll = function(e) {
    if(window.pageYOffset != 0) {
      window.scrollTo(0, 0);
    }
  }

  // warn before exit
  window.addEventListener('beforeunload', e => {
    if(app.unsavedChanges) {
      e.preventDefault();
      e.returnValue = '';
      return;
    }
  });

  // change tab
  window.addEventListener('keydown', e => {
    app.keyMap[e.key] = e;

    // change tabs
    if(e.key === '”') {
      e.preventDefault();
      f7.tab.show(`#${getLeftTab(app.currentTab, tabs)}`, true);
    }
    if(e.key === '’') {
      e.preventDefault();
      f7.tab.show(`#${getRightTab(app.currentTab, tabs)}`, true);
    }
  }, true);

}
