/**
 * @overview  Settings popup window
 */

const submitBtn = document.getElementById('submit'),
      cssUrlElement = document.getElementById('cssUrl');


init();

function init() {
  chrome.storage.sync.get('cssUrl', fillData);
  submitBtn.addEventListener('click', onSubmit, false);
}

function fillData({cssUrl} = {}) {
  cssUrlElement.value = cssUrl;
}

function onSubmit() {
  chrome.storage.sync.set({
    cssUrl: cssUrlElement.value
  });
}
