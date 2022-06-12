import app from './app.js';
import { options } from './settings.js';
import { getDateTimeStamp } from './utils.js';

const consoleContainer = document.getElementById('console-container');
const consoleEl = document.getElementById('console-content');
const consoleHistoryEnabled = false;

export function addLog(type, method, arg) {
  const outputEl = document.createElement('div');
  const data = JSON.parse(JSON.stringify(arg))

  if(consoleHistoryEnabled) {
    const infoRightEl = document.createElement('div');
    infoRightEl.className = 'console-info-right';
    infoRightEl.innerHTML = getDateTimeStamp();
    outputEl.appendChild(infoRightEl);
  }

  outputEl.className = `console-item ${type} console-type-${method}`;
  outputEl.appendChild(renderjson(data));
  consoleEl.appendChild(outputEl);
}

export function validateJs(iframe, js) {
  try {
    iframe.contentWindow.eval(js);
  } catch (error) {
    addLog('string', 'error', error);
  }
}

export function updateConsole(iframe) {

  const methods = ['log', 'debug', 'warn', 'error', 'info'];

  // TODO: capture console errors
  // iframe.contentWindow.onerror = function(error) {
  //   addLog('string', 'error', error);
  // }

  methods.forEach((method) => {
    iframe.contentWindow.console[method] = function() {
      for(let i in arguments) {
        const arg = arguments[i];
        const type = typeof arg;
        addLog(type, method, arg);
      }
    }
  });
}

export function clearConsole() {
  consoleEl.innerHTML = "";
}

export function consoleScroll() {
  //consoleEl.scrollTop = consoleEl.scrollHeight;
  //consoleEl.scrollIntoView(false);
}

export function consoleBreak() {
  const breakEl = document.createElement('br');
  consoleEl.appendChild(breakEl);
}

export function setConsoleTheme() {
  const isDark = options.theme.dark.some(t => t.value == app.settings.theme);
  const isLight = options.theme.light.some(t => t.value == app.settings.theme);

  if(isLight) {
    consoleContainer.classList.add('light');
    consoleContainer.classList.remove('dark');
  } else {
    consoleContainer.classList.add('dark');
    consoleContainer.classList.remove('light');
  }

  consoleContainer.style.fontSize = `${app.settings.fontSize}px`;
}
