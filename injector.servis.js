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
  loadAssets();
}

function injectAssets({cssUrl, jsUrl, hostUrl} = {}) {
  if (!cssUrl && !jsUrl) return;

  // Filter hostname by stored URL
  if (hostUrl && (location.host !== hostUrl && location.hostname !== hostUrl && location.origin !== hostUrl)) return;

  let script = cssUrl ? insertCssScript(cssUrl) : '';
      script += jsUrl ? insertJsScript(jsUrl) : '';

  let customScript = document.createElement('script');
  customScript.textContent = `(function() {
      ${script}
    })();`;

  document.body.appendChild(customScript);
}

function loadAssets() {
  chrome.storage.sync.get(['cssUrl', 'jsUrl', 'hostUrl'], injectAssets);
}

function insertCssScript(cssUrl) {
  return `
    var link = document.createElement("link");
    link.href = "${cssUrl}";
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
  `;
}

function insertJsScript(jsUrl) {
  return `
    var script = document.createElement("script");
    script.src = "${jsUrl}";
    document.getElementsByTagName("body")[0].appendChild(script);
  `;
}
