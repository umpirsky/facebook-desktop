var webview = document.getElementById('webview');
var indicator = document.getElementById('preloader');
var webframe = require('web-frame');
var ipc = require('ipc');

var loadstop = function() {
  indicator.style.display = 'none';
};
webview.addEventListener('did-start-loading', function() {
  indicator.style.display = 'block';
});
webview.addEventListener('did-stop-loading', loadstop);
ipc.on('zoom:encrease', function() {
  webframe.setZoomLevel((webframe.getZoomLevel() + 1) / 2);
});
ipc.on('zoom:decrease', function() {
  webframe.setZoomLevel((webframe.getZoomLevel() - 1) / 2);
});
ipc.on('zoom:reset', function() {
  webframe.setZoomLevel(0);
});

webview.addEventListener('console-message', function(e) {
  console.log('Guest page logged a message:', e.message);
});
webview.addEventListener('new-window', function(e) {
  require('shell').openExternal(e.url);
});
