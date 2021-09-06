let newWorker;
let refreshing;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      console.log('update found')
      newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        if(newWorker.state === 'installed') {
          if(navigator.serviceWorker.controller) {
            app.ui.updateAvailablePrompt(window.runUpdate);
          }
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

