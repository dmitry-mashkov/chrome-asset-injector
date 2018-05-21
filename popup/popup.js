/**
 * @overview  Settings popup window
 */

const submitBtn = document.getElementById('submit'),
      cssUrlElement = document.getElementById('cssUrl'),
      jsUrlElement = document.getElementById('jsUrl'),
      hostUrlElement = document.getElementById('hostUrl');


init();

function init() {
  chrome.storage.sync.get(['cssUrl', 'jsUrl', 'hostUrl'], fillData);
  submitBtn.addEventListener('click', onSubmit, false);
}

function fillData({cssUrl, jsUrl, hostUrl} = {}) {
  cssUrlElement.value = cssUrl || '';
  jsUrlElement.value = jsUrl  || '';
  hostUrlElement.value = hostUrl  || '';
}

function onSubmit() {
  chrome.storage.sync.set({
    cssUrl: cssUrlElement.value,
    jsUrl: jsUrlElement.value,
    hostUrl: hostUrlElement.value
  });
}
