import app from './app.js';
import { saveStorage } from './storage.js';
import { uuid, generateHtmlResult, downloadFile } from './utils.js';
import { setEditorValues, getEditorData, resetEditorValues, focusEditor } from './editors.js';
import { clearConsole } from './console.js';
import ui from './ui.js';

const el = {
  name: document.getElementById('project-name'),
  description: document.getElementById('project-description'),
};

class Project {
  constructor() {
    this.uuid = uuid();
    this.name = '';
    this.description = '';
    this.created = new Date();
    this.updated = new Date();
    this.data = {
      html: "",
      css: "",
      javascript: "",
    };
  }
};

export function loadLastProject() {
  const lastId = app.meta.last;
  if(lastId && app.projects[lastId]) {
    openProject(lastId);
  } else {
    app.currentProject = new Project();
  }
}

export function openProject(uuid) {
  app.currentProject = app.projects[uuid];
  el.name.value = app.currentProject.name;
  el.description.value = app.currentProject.description;
  setEditorValues(app.currentProject.data);
  ui.closeCurrentPopup();
  ui.closeCurrentPanel();
  app.meta.last = app.currentProject.uuid;
  saveStorage('meta');
  app.unsavedChanges = false;
}

export function updateProject(attribute, e) {
  app.currentProject[attribute] = e.target.value;
}

export function newProject() {
  el.name.value = '';
  el.description.value = '';
  resetEditorValues();
  app.currentProject = new Project();
  app.unsavedChanges = true;
  ui.closeCurrentPanel();
  clearConsole();
}

export function deleteProject(uuid) {
  delete app.projects[uuid];
  saveStorage('projects');
  if(app.currentProject.uuid === uuid) {
    newProject();
  }
}

export function importProject(event) {
  var reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(event.target.files[0]);

  function onReaderLoad(event){
    app.currentProject = JSON.parse(event.target.result);
    el.name.value = app.currentProject.name;
    el.description.value = app.currentProject.description;
    setEditorValues(app.currentProject.data);
    app.unsavedChanges = true;
    ui.toast('Project imported.', 2000);
  }
}

function iosStandaloneMsg() {
  if(window.navigator.standalone == true) {
    ui.toast('Didn\'t see any downloads? Check out the help section.', 5000);
  }
}

export function exportCode(name) {
  iosStandaloneMsg();
  const e = getEditorData();
  return downloadFile(name,
    generateHtmlResult(e.html, e.css, e.javascript).trim(), 'text/html');
}

export function exportCurrentProject(name) {
  iosStandaloneMsg();
  return downloadFile(name,
    JSON.stringify(app.currentProject), 'application/json');
}

export function saveCurrentProject() {
  app.currentProject.updated = new Date();
  app.currentProject.data = getEditorData();

  app.projects[app.currentProject.uuid] = app.currentProject;
  app.meta.last = app.currentProject.uuid;

  saveStorage('projects');
  saveStorage('settings');
  saveStorage('meta');

  ui.toast('Project saved', 2000);
  ui.closeCurrentPanel();
  app.unsavedChanges = false;
}

export function saveAsProject(name) {
  const editorData = getEditorData();

  newProject();
  app.currentProject.name = name;
  el.name.value = name;
  app.currentProject.data = editorData;
  setEditorValues(app.currentProject.data);

  app.projects[app.currentProject.uuid] = app.currentProject;
  app.meta.last = app.currentProject.uuid;

  saveStorage('projects');
  saveStorage('settings');
  saveStorage('meta');

  app.unsavedChanges = false;
}

