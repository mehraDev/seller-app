declare var self: Window & typeof globalThis;

self.addEventListener('message', (event) => {
    if (event.data.action === 'customAction') {
      console.log('Custom action invoked');
    }
});
