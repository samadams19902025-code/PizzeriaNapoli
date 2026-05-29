/* Pizzeria Napoli — bilingual EN/DE engine, shared across pages */
(function () {
  function apply(lang) {
    if (lang !== 'en' && lang !== 'de') lang = 'en';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang);
      if (v !== null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-en-aria]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang + '-aria');
      if (v !== null) el.setAttribute('aria-label', v);
    });
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem('napoli_lang', lang); } catch (e) {}
    if (typeof window.onLangChange === 'function') window.onLangChange(lang);
  }
  window.napoliSetLang = apply;
  window.napoliLang = function () {
    try { return localStorage.getItem('napoli_lang') || 'en'; } catch (e) { return 'en'; }
  };
  function init() {
    apply(window.napoliLang());
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-lang')); });
    });
  }
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
