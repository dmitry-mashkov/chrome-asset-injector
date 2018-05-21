/**
 * @overview  Settings popup window
 */

const submitBtn = document.getElementById('submit'),
  cssUrlElement = document.getElementById('cssUrl'),
  jsUrlElement = document.getElementById('jsUrl'),
  hostUrlElement = document.getElementById('hostUrl'),
  getCurrentHostname = document.getElementById('getCurrent');

init();

function init() {
  chrome.storage.sync.get(['cssUrl', 'jsUrl', 'hostUrl'], fillData);
  submitBtn.addEventListener('click', onSubmit, false);
  getCurrentHostname.addEventListener('click', onGetCurrent, false);
}

function fillData({
  cssUrl,
  jsUrl,
  hostUrl
} = {}) {
  cssUrlElement.value = cssUrl || '';
  jsUrlElement.value = jsUrl || '';
  hostUrlElement.value = hostUrl || '';
}

function onSubmit() {
  chrome.storage.sync.set({
    cssUrl: cssUrlElement.value,
    jsUrl: jsUrlElement.value,
    hostUrl: hostUrlElement.value
  });
}

function onGetCurrent() {
  chrome.tabs.getSelected(null, function(tab) {
    var url = new URL(tab.url);
    var domain = url.hostname;
    hostUrlElement.value = domain;
  });
}