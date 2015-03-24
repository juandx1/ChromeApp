chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'innerBounds': {
      'width': 1280,
      'height': 800
    },
    'resizable': false,
  });
});