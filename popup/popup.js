/**
 * @overview  Settings popup window
 */

const submitBtn = document.getElementById('submit'),
  cssUrlElement = document.getElementById('cssUrl'),
  jsUrlElement = document.getElementById('jsUrl'),
  hostUrlElement = document.getElementById('hostUrl'),
  setCurrentBtn = document.getElementById('setCurrent'),
  isEnabledElement = document.getElementById('isEnabled');

init();


function init() {
  chrome.storage.sync.get(['cssUrl', 'jsUrl', 'hostUrl', 'isEnabled'], fillData);
  submitBtn.addEventListener('click', onSubmit, false);
  setCurrentBtn.addEventListener('click', onSetCurrentClick, false);
}

function fillData({ cssUrl, jsUrl, hostUrl, isEnabled } = {}) {
  cssUrlElement.value = cssUrl || '';
  jsUrlElement.value = jsUrl || '';
  hostUrlElement.value = hostUrl || '';
  isEnabledElement.checked = !!isEnabled;
}

function onSubmit() {
  chrome.storage.sync.set({
    cssUrl: cssUrlElement.value,
    jsUrl: jsUrlElement.value,
    hostUrl: hostUrlElement.value,
    isEnabled: isEnabledElement.checked
  });
}

function onSetCurrentClick() {
  chrome.tabs.getSelected(null, function(tab) {
    var url = new URL(tab.url);
    var domain = url.hostname;
    hostUrlElement.value = domain;
  });
}