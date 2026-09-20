/* Progressive enhancement for the static comparison and calculator directories. */
(function () {
  'use strict';
  function normalize(value) {
    return String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function matches(text, query) {
    const haystack = normalize(text);
    return normalize(query).split(/\s+/).filter(Boolean).every(word => haystack.includes(word));
  }
  function initDirectory(root, view) {
    const controls = root.querySelector('[data-directory-controls]');
    const search = root.querySelector('[data-directory-query]');
    const topic = root.querySelector('[data-directory-topic]');
    const clear = root.querySelector('[data-directory-clear]');
    const status = root.querySelector('[data-directory-status]');
    const empty = root.querySelector('[data-directory-empty]');
    const groups = Array.from(root.querySelectorAll('[data-directory-group]')).map(element => ({
      element, count: element.querySelector('[data-directory-count]'),
      items: Array.from(element.querySelectorAll('[data-directory-item]')).map(item => ({
        element: item, text: item.textContent + ' ' + (item.getAttribute('data-keywords') || '')
      }))
    }));
    if (!controls || !search || !topic || !clear || !status || !empty || !groups.length) return;
    const total = groups.reduce((sum, group) => sum + group.items.length, 0);
    let filtered = false;
    let previousOpen = [];
    groups.forEach(group => { group.element.open = false; });
    function openAnchor() {
      const id = (view.location.hash || '').slice(1);
      const target = groups.find(group => group.element.id === id);
      if (target) {
        if (target.element.hidden) { search.value = ''; topic.value = ''; update(); }
        target.element.open = true;
      }
    }
    function update() {
      const active = !!normalize(search.value) || !!topic.value;
      if (active && !filtered) previousOpen = groups.map(group => group.element.open);
      let shown = 0;
      groups.forEach((group, index) => {
        let count = 0;
        const topicMatches = !topic.value || topic.value === group.element.getAttribute('data-directory-group');
        group.items.forEach(item => {
          const show = topicMatches && matches(item.text, search.value);
          item.element.hidden = !show;
          if (show) count++;
        });
        group.element.hidden = count === 0;
        group.count.textContent = String(count);
        if (active) group.element.open = count > 0;
        else if (filtered) group.element.open = previousOpen[index];
        shown += count;
      });
      filtered = active;
      status.textContent = `${shown} of ${total} links shown`;
      empty.hidden = shown !== 0;
    }
    search.addEventListener('input', update);
    topic.addEventListener('change', update);
    controls.addEventListener('submit', event => event.preventDefault());
    clear.addEventListener('click', () => {
      search.value = ''; topic.value = ''; update(); openAnchor(); search.focus();
    });
    view.addEventListener('hashchange', openAnchor);
    // Read restored form values, including after browser back navigation.
    view.addEventListener('pageshow', update);
    controls.hidden = false;
    update();
    openAnchor();
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { normalize, matches, initDirectory };
  if (typeof document !== 'undefined') {
    document.querySelectorAll('[data-guide-directory]').forEach(root => initDirectory(root, window));
  }
})();
