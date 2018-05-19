let index = 0;

const POLL_INTERVAL = 100,
  targetSelector = 'body',
  POLL_LIMIT_MAX = POLL_INTERVAL * 200; // 20 seconds in total;

let intervalId = setInterval(function () {
  let targetElementExists = !!document.querySelector(targetSelector);

  if (targetElementExists || index === POLL_LIMIT_MAX) {
    clearInterval(intervalId);

    if (targetElementExists) {
      onInit();
    }
  }
  index++;
}, POLL_INTERVAL);


function onInit() {
  loadCssUrl();
}

function injectCss({cssUrl} = {}) {
  if (!cssUrl) return;

  let customScript = document.createElement('script');
  customScript.textContent = `(function() { 
      var link = document.createElement("link");
      link.href = "${cssUrl}";
      link.type = "text/css";
      link.rel = "stylesheet";
      document.getElementsByTagName("head")[0].appendChild(link);
    })();`;

  document.body.appendChild(customScript);
}

function loadCssUrl() {
  chrome.storage.sync.get('cssUrl', injectCss);
}
