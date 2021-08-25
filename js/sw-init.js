let newWorker;
let refreshing;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      newWorker = reg.installing;

      newWorker.addEventListener('statechange', () => {
        switch(newWorker.state) {
          case 'installed':
            if(navigator.serviceWorker.controller) {
              app.ui.updateAvailablePrompt(window.runUpdate);
            }
            break;
        }
      });
    });
  });

  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if(refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}

window.runUpdate = function(e) {
  console.log('run update');
  newWorker.postMessage({ action: 'skipWaiting' });
}

