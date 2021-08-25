import { defaults, initSettings, updateSettings }  from './settings.js';
import { setEditors, setEditorSettings, copy, paste } from './editors.js';
import { initStorage } from './storage.js';
import { loadLastProject, openProject, updateProject, saveCurrentProject, importProject } from './projects.js';
import { initEventHandlers } from './events.js';
import ui from './ui.js';

ace.config.set('basePath', './js/lib/ace');

const app = {
  keyMap: {},
  projects: {},
  currentProject: null,
  unsavedChanges: false,
  settings: defaults.settings,
  meta: defaults.meta,
  ui: ui,
  currentTab: 'html',
  init: () => {
    initStorage();
    initSettings();
    setEditors();
    setEditorSettings();
    loadLastProject();
    initEventHandlers();
  },
  updateSettings,
  openProject,
  updateProject,
  importProject,
  saveCurrentProject,
  copy,
  paste,
  version: window.VERSION,
}

export default app;
