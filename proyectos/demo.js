// Modo demostración para el portafolio: los avisos se muestran en pantalla
// y ningún formulario envía datos reales.
(function () {
  function aviso(texto) {
    var t = document.getElementById('demo-aviso');
    if (!t) {
      t = document.createElement('div');
      t.id = 'demo-aviso';
      t.setAttribute('role', 'status');
      t.style.cssText = 'position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:2147483647;' +
        'max-width:min(92vw,460px);padding:12px 16px;border-radius:10px;background:#15171C;color:#fff;' +
        'font:500 14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.3)';
      (document.body || document.documentElement).appendChild(t);
    }
    t.textContent = texto;
    t.hidden = false;
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.hidden = true; }, 3200);
  }

  window.alert = function (m) { aviso(String(m)); };

  var originalFetch = window.fetch;
  window.fetch = function (url, opts) {
    if (String(url).indexOf('demo://') === 0) {
      return new Promise(function (ok) { setTimeout(function () { ok(new Response('', { status: 200 })); }, 500); });
    }
    return originalFetch.apply(this, arguments);
  };

  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f && f.dataset && f.dataset.demo) {
      e.preventDefault();
      aviso(f.dataset.demo);
      f.reset();
    }
  }, true);
})();
