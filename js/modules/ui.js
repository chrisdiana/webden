import f7 from './f7.js';
import app from './app.js';
import { getDateTimeStr } from './utils.js';
import { focusEditor } from './editors.js';
import { exportCurrentProject, exportCode, deleteProject, newProject, saveAsProject } from './projects.js';
import { projectsTemplate } from './templates/projects.js';
import { helpTemplate } from './templates/help.js';
import { clearConsole } from './console.js';

let currentPopup = null;

function closeCurrentPopup() {
  if(currentPopup) {
    currentPopup.close();
  }
}

function closeCurrentPanel() {
  f7.panel.close();
}

function toast(text, timeout) {
  let toast = f7.toast.create({
    text: text,
    closeTimeout: timeout,
    destroyOnClose: true,
  });
  toast.open();
}

function openProjectPopup() {
  currentPopup = f7.popup.create({
    content: projectsTemplate(),
    closeOnEscape: true,
  });
  currentPopup.open();
}

function openHelpPopup() {
  currentPopup = f7.popup.create({
    content: helpTemplate,
    closeOnEscape: true,
  });
  currentPopup.open();
}

function getExportName(ext) {
  let exportName = '';
  if(app.currentProject.name.length > 1) {
    exportName = app.currentProject.name;
  } else {
    exportName = `export-${getDateTimeStr()}`;
  }
  return `${exportName}.${ext}`;
}

function updateAvailablePrompt(callback) {
  f7.dialog.alert(
    'A new version of the app is available. Click OK to refresh and run the update.',
    'Update Available',
    () => callback()
  );
}

function clearConsolePrompt() {
  f7.dialog.confirm(
    'Are you sure you want to clear the console?',
    'Clear Console',
    () => clearConsole()
  );
}

function exportCurrentProjectPrompt() {
  f7.dialog.prompt(
    'Save contents of your project to import again later.',
    'Export Project',
    () => exportCurrentProject(getExportName('json')),
    null,
    getExportName('json'),
  );
}

function exportCodePrompt() {
  f7.dialog.prompt(
    'Download your project code as a HTML file.',
    'Export Code',
    () => exportCode(getExportName('html')),
    null,
    getExportName('html'),
  );
}

function deleteProjectConfirm(name, uuid, e) {
  if (!e) var e = window.event;
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();

  closeCurrentPopup();

  const projectName = name.length ? name : 'the project';
  f7.dialog.confirm(
    `Are you sure you want to delete ${projectName}?`,
    'Delete project',
    () => deleteProject(uuid),
  );
}

function newProjectConfirm() {
  f7.dialog.confirm(
    'Are you sure you want to start a new project?',
    'New project',
    () => newProject(),
  );
}

function saveAsProjectPrompt() {
  f7.dialog.prompt(
    'Save project as...',
    'Save As',
    (e) => saveAsProject(e),
  );
}

export default {
  toast,
  closeCurrentPopup,
  closeCurrentPanel,
  exportCurrentProjectPrompt,
  exportCodePrompt,
  deleteProjectConfirm,
  newProjectConfirm,
  openProjectPopup,
  openHelpPopup,
  clearConsolePrompt,
  saveAsProjectPrompt,
  updateAvailablePrompt,
}
