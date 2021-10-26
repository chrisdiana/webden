export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function debounce(fn, wait) {
  var timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, (wait || 1));
  }
}

export function uuid() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export function downloadFile(filename, content, mimeType) {
  var link = document.createElement('a');
  mimeType = mimeType || 'text/plain';
  link.setAttribute('download', filename);
  link.setAttribute('href', `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`);
  link.setAttribute('target', '_blank');
  link.click();
}

export function getDateTimeStr() {
  var t = new Date();
  return [t.getMonth(), t.getDate(), t.getFullYear(),
    [t.getHours(), t.getMinutes(), t.getSeconds()].join('')
  ].join('-');
}

export function getLeftTab(current, tabs) {
  const i = tabs.findIndex(t => t === current);
  return (i > 0) ? tabs[i - 1] : tabs[0];
}

export function getRightTab(current, tabs) {
  const i = tabs.findIndex(t => t === current);
  return (i < (tabs.length - 1)) ? tabs[i + 1] : tabs[tabs.length - 1];
}

export function getDateTimeStamp() {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hour = date.getHours();
  return `${hour}:${minutes}:${seconds}`;
}

export function generateHtmlResult(html, css, js) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, inital-scale=1.0" />
<title></title>
<style type="text/css">
${css}
</style>
</head>
<body>
${html}
<script type="text/javascript">
(function() {
${js}
})();
</script>
</body>
</html>`;
}
