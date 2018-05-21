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

  if (isEnabledElement.checked) {
    chrome.browserAction.setIcon({path: '../images/icon-enabled.png'});

  } else {
    chrome.browserAction.setIcon({path: '../images/icon-disabled.png'});
  }
}

function onSetCurrentClick() {
  chrome.tabs.getSelected(null, tab => {
    const domain = (new URL(tab.url)).hostname;
    hostUrlElement.value = domain;
  });
}