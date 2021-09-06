import app from './app.js';
import { selectTemplate, groupSelectTemplate } from './templates/select.js';
import { saveStorage } from './storage.js';
import { setEditorSettings } from './editors.js';
import { setConsoleTheme } from './console.js';


export const defaults = {
  settings: {
    theme: 'ace/theme/tomorrow_night',
    keyboardHandler: null,
    fontSize: 18,
    tabSize: 2,
    scrollPastEnd: 0.5,
    showLineNumbers: false,
    showGutter: false,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    showPrintMargin: false,
  },
  meta: {
    last: null,
    version: VERSION,
  },
};

export const options = {
  tabSize: [
    {value: 2, name: '2'},
    {value: 4, name: '4'},
    {value: 8, name: '8'},
    {value: 16, name: '16'},
  ],
  keyboardHandler: [
    {value: "", name: 'Ace'},
    {value: "ace/keyboard/vim", name: 'Vim'},
    {value: "ace/keyboard/emacs", name: 'Emacs'},
    {value: "ace/keyboard/sublime", name: 'Sublime'},
  ],
  theme: {
    light: [
      {value: "ace/theme/chrome", name: "Chrome"},
      {value: "ace/theme/clouds", name: "Clouds"},
      {value: "ace/theme/crimson_editor", name: "Crimson Editor"},
      {value: "ace/theme/dawn", name: "Dawn"},
      {value: "ace/theme/dreamweaver", name: "Dreamweaver"},
      {value: "ace/theme/eclipse", name: "Eclipse"},
      {value: "ace/theme/github", name: "GitHub"},
      {value: "ace/theme/iplastic", name: "IPlastic"},
      {value: "ace/theme/solarized_light", name: "Solarized Light"},
      {value: "ace/theme/textmate", name: "TextMate"},
      {value: "ace/theme/tomorrow", name: "Tomorrow"},
      {value: "ace/theme/xcode", name: "XCode"},
      {value: "ace/theme/kuroir", name: "Kuroir"},
      {value: "ace/theme/katzenmilch", name: "KatzenMilch"},
      {value: "ace/theme/sqlserver", name: "SQL Server"},
    ],
    dark: [
      {value: "ace/theme/ambiance", name:"Ambiance"},
      {value: "ace/theme/chaos", name:"Chaos"},
      {value: "ace/theme/clouds_midnight", name:"Clouds Midnight"},
      {value: "ace/theme/dracula", name:"Dracula"},
      {value: "ace/theme/cobalt", name:"Cobalt"},
      {value: "ace/theme/gruvbox", name:"Gruvbox"},
      {value: "ace/theme/gob", name:"Green on Black"},
      {value: "ace/theme/idle_fingers", name:"idle Fingers"},
      {value: "ace/theme/kr_theme", name:"krTheme"},
      {value: "ace/theme/merbivore", name:"Merbivore"},
      {value: "ace/theme/merbivore_soft", name:"Merbivore Soft"},
      {value: "ace/theme/mono_industrial", name:"Mono Industrial"},
      {value: "ace/theme/monokai", name:"Monokai"},
      {value: "ace/theme/pastel_on_dark", name:"Pastel on dark"},
      {value: "ace/theme/solarized_dark", name:"Solarized Dark"},
      {value: "ace/theme/terminal", name:"Terminal"},
      {value: "ace/theme/tomorrow_night", name:"Tomorrow Night"},
      {value: "ace/theme/tomorrow_night_blue", name:"Tomorrow Night Blue"},
      {value: "ace/theme/tomorrow_night_bright", name:"Tomorrow Night Bright"},
      {value: "ace/theme/tomorrow_night_eighties", name:"Tomorrow Night 80s"},
      {value: "ace/theme/twilight", name:"Twilight"},
      {value: "ace/theme/vibrant_ink", name:"Vibrant Ink"},
    ],
  },
};

const el = {
  theme: document.getElementById('settings-theme'),
  keyboardHandler: document.getElementById('settings-keyboard'),
  tabSize: document.getElementById('settings-tabsize'),
  fontSize: document.getElementById('settings-fontsize'),
  enableLiveAutocompletion: document.getElementById('settings-autocomplete'),
  showGutter: document.getElementById('settings-gutter'),
  showLineNumbers: document.getElementById('settings-linenumbers'),
  showPrintMargin: document.getElementById('settings-printmargin'),
};

export function initSettings() {
  el.theme.innerHTML = groupSelectTemplate(options.theme);
  el.keyboardHandler.innerHTML = selectTemplate(options.keyboardHandler);
  el.tabSize.innerHTML = selectTemplate(options.tabSize);

  for(const i in el) {
    const setting = el[i];
    if(setting) {
      setting.value = app.settings[i];
      setting.checked = app.settings[i];
    }
  }

  // update to latest version
  app.meta.version = VERSION;
  saveStorage('meta');

  const versionEl = document.querySelector('.version');
  versionEl.innerHTML = `v${app.meta.version}`;
}

export function updateSettings() {
  app.settings.theme = el.theme.value;
  app.settings.keyboardHandler = el.keyboardHandler.value;
  app.settings.tabSize = Number(el.tabSize.value);
  app.settings.fontSize = Number(el.fontSize.value);
  app.settings.enableLiveAutocompletion = Boolean(el.enableLiveAutocompletion.checked);
  app.settings.showGutter = Boolean(el.showGutter.checked);
  app.settings.showLineNumbers = Boolean(el.showLineNumbers.checked);
  app.settings.showPrintMargin = Boolean(el.showPrintMargin.checked);

  setEditorSettings();
  setConsoleTheme();
  saveStorage('settings');
  saveStorage('meta');
}
