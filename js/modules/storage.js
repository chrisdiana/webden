import app from './app.js';

const namespace = '@webden';
const storage = ['projects', 'settings', 'meta'];

export function saveStorage(context) {
  const key = `${namespace}/${context}`;
  const data = app[context];
  window.localStorage.setItem(key, JSON.stringify(data));
}

export function loadStorage(context) {
  const key = `${namespace}/${context}`;
  const data = window.localStorage.getItem(key);
  return JSON.parse(data);
}

export function initStorage() {
  storage.forEach((context) => {
    if(loadStorage(context)) {
      // load storage
      app[context] = loadStorage(context);
    } else {
      // initialize storage
      saveStorage(context);
    }
  });
}
