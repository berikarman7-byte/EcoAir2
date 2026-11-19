// ===== EcoAir — script.js =====

(function () {
  'use strict';

  // ---------- AQI деңгейлері ----------
  var levels = [
    {
      short: 'Жақсы',
      range: '0–50',
      name: 'Жақсы',
      color: 'var(--aqi-1)',
      text: '#ffffff',
      advice: 'Ауа таза. Далада серуендеуге, жүгіруге және терезені ашуға болады.'
    },
    {
      short: 'Орташа',
      range: '51–100',
      name: 'Орташа',
      color: 'var(--aqi-2)',
      text: '#0e2a33',
      advice: 'Көпшілік үшін қауіпсіз. Ластануға өте сезімтал адамдар ұзақ жүктемені азайтқаны жөн.'
    },
    {
      short: 'Сезімтал',
      range: '101–150',
      name: 'Сезімтал топтар үшін зиянды',
      color: 'var(--aqi-3)',
      text: '#0e2a33',
      advice: 'Балалар, егде адамдар, демікпесі, жүрек және өкпе ауруы бар адамдар далада ұзақ болмағаны дұрыс.'
    },
    {
      short: 'Зиянды',
      range: '151–200',
      name: 'Зиянды',
      color: 'var(--aqi-4)',
      text: '#ffffff',
      advice: 'Әркім әсерін сезуі мүмкін. Далада ауыр жаттығуды азайтыңыз, қажет болса FFP2/N95 респираторын киіңіз.'
    },
    {
      short: 'Өте зиянды',
      range: '201–300',
      name: 'Өте зиянды',
      color: 'var(--aqi-5)',
      text: '#ffffff',
      advice: 'Далада жүруді шектеңіз, терезелерді жабыңыз және мүмкін болса ауа тазартқышты қосыңыз.'
    },
    {
      short: 'Қауіпті',
      range: '301 және жоғары',
      name: 'Қауіпті',
      color: 'var(--aqi-6)',
      text: '#ffffff',
      advice: 'Үйде қалыңыз. Шығу міндетті болса, FFP2/N95 респираторын киіңіз. Ауа тазартқышты пайдаланыңыз.'
    }
  ];

  var scale = document.getElementById('aqiScale');
  var panel = document.getElementById('aqiPanel');
  var rangeEl = document.getElementById('aqiRange');
  var nameEl = document.getElementById('aqiName');
  var adviceEl = document.getElementById('aqiAdvice');
  var buttons = [];

  function selectLevel(index) {
    var level = levels[index];
    buttons.forEach(function (btn, i) {
      btn.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });
    panel.style.setProperty('--c', level.color);
    rangeEl.textContent = 'AQI ' + level.range;
    nameEl.textContent = level.name;
    adviceEl.textContent = level.advice;
  }

  if (scale && panel) {
    levels.forEach(function (level, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'aqi__btn';
      btn.style.setProperty('--c', level.color);
      btn.style.setProperty('--tc', level.text);
      btn.setAttribute('aria-pressed', 'false');

      var label = document.createElement('span');
      label.textContent = level.short;
      var small = document.createElement('small');
      small.textContent = level.range;
      btn.appendChild(label);
      btn.appendChild(small);

      btn.addEventListener('click', function () { selectLevel(i); });
      scale.appendChild(btn);
      buttons.push(btn);
    });
    selectLevel(0);
  }

  // ---------- Мобильді мәзір ----------
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  // ---------- Мәзірде белсенді бөлімді көрсету ----------
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  // ---------- FAQ: бір уақытта бір сұрақ ашық ----------
  var faqs = document.querySelectorAll('.faq');
  faqs.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqs.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
