import app from './app.js';
import { debounce, generateHtmlResult } from './utils.js';
import { saveCurrentProject } from './projects.js';
import { updateConsole, setConsoleTheme, clearConsole } from './console.js';
import ui from './ui.js';

const resultEl = document.getElementById('result-iframe');

export const editors = {
  html: null,
  css: null,
  javascript: null,
};

class Editor {

  constructor(type) {
    this.type = type;
    this.ace = null;
    this.init();
  }

  init() {
    this.ace = ace.edit(this.type);
    this.ace.session.setMode(`ace/mode/${this.type}`);
    this.ace.getSession().on('change', debounce(() => updateResult(), 250));
    this.ace.commands.addCommand({
      name: 'saveProject',
      bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
      exec: (editor) => saveCurrentProject(),
    });
    this.ace.commands.addCommand({
      name: 'openProject',
      bindKey: {win: 'Ctrl-K', mac: 'Command-K'},
      exec: (editor) => ui.openProjectPopup(),
    });
    this.ace.commands.addCommand({
      name: 'openHelp',
      bindKey: {win: 'Ctrl-H', mac: 'Ctrl-H'},
      exec: (editor) => ui.openHelpPopup(),
    });
    this.ace.commands.addCommand({
      name: 'commandPallet',
      bindKey: {win: 'Ctrl-H', mac: 'Ctrl-H'},
      exec: (editor) => ui.openHelpPopup(),
    });
    this.ace.commands.addCommand({
      name: "showKeyboardShortcuts",
      bindKey: {win: "Ctrl-Alt-h", mac: "Command-Alt-h"},
      exec: (editor) => {
        ace.config.loadModule("ace/ext/keybinding_menu", (module) => {
          module.init(this.ace);
          this.ace.showKeyboardShortcuts()
        });
      },
    });
  }

}

function updateResult() {
  const result = resultEl.contentWindow.document;
  clearConsole();
  result.open()
  result.write(generateHtmlResult(
    editors.html.ace.getValue(),
    editors.css.ace.getValue(),
    editors.javascript.ace.getValue(),
  ));
  result.close();
  updateConsole(resultEl);
  app.unsavedChanges = true;
}

export function setEditorSettings() {
  for(const i in editors) {
    editors[i].ace.setOptions(app.settings);
  }
  setConsoleTheme();
}

export function setEditorValues(data) {
  for(const i in editors) {
    editors[i].ace.setValue(data[i], -1);
  }
}

export function resetEditorValues() {
  for(const i in editors) {
    editors[i].ace.setValue('');
  }
}

export function getEditorData() {
  return {
    html: editors.html.ace.getValue(),
    css: editors.css.ace.getValue(),
    javascript: editors.javascript.ace.getValue(),
  };
}

export function setEditors() {
  for(const type in editors) {
    editors[type] = new Editor(type);
  }
  // remove html session warnings and set first editor
  editors.html.ace.getSession().setOption('useWorker', false);
  editors.html.ace.focus();
}

export function copy() {
  if(editors[app.currentTab]) {
    const el = document.createElement('input');
    el.setAttribute('id', 'copy-input');
    el.setAttribute('value', editors[app.currentTab].ace.getCopyText());
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(el);
    ui.toast('Copied to clipboard', 2000);
  }
}

export function paste(e) {
  if(editors[app.currentTab]) {
    const editor = editors[app.currentTab];
    editor.ace.session.insert(editor.ace.getCursorPosition(), e.target.value.trim());
    ui.toast('Pasted', 2000);
    ui.closeCurrentPanel();
    e.target.value = '';
  }
}

export function focusEditor(editor) {
  if(editors[editor]) {
    editors[editor].ace.focus();
  }
}
