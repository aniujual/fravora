(function () {
  let lunrIndex;
  let sectionsData = [];

  function collectManualSections() {
    const sectionEls = document.querySelectorAll('.manual-content .section[id]');
    return Array.from(sectionEls).map((section) => {
      const id = section.id;
      const heading = section.querySelector('h2');
      const title = heading ? heading.textContent.trim() : id;
      const content = section.textContent.replace(/\s+/g, ' ').trim();
      return {
        url: `#${id}`,
        title,
        content
      };
    });
  }

  function safeSearch(query) {
    try {
      return lunrIndex.search(query);
    } catch {
      const escapedQuery = query.replace(/[+\-!(){}\[\]^"~*?:\\/]/g, '\\$&');
      try {
        return lunrIndex.search(escapedQuery);
      } catch {
        return [];
      }
    }
  }

  function displayResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = '<p class="no-results">No manual sections found.</p>';
      container.style.display = 'block';
      return;
    }

    const html = results.map((result) => {
      const section = sectionsData.find((item) => item.url === result.ref);
      if (!section) return '';
      return `
        <div class="search-result-item">
          <a href="${section.url}">
            <h4>${section.title}</h4>
            <p>${section.content.substring(0, 120)}...</p>
          </a>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
    container.style.display = 'block';
  }

  function initSearch() {
    const searchInput = document.getElementById('manualSearch');
    const resultsDiv = document.getElementById('searchResults');
    if (!searchInput || !resultsDiv) return;

    sectionsData = collectManualSections();
    if (sectionsData.length === 0) return;

    lunrIndex = lunr(function () {
      this.ref('url');
      this.field('title');
      this.field('content');

      sectionsData.forEach((doc) => {
        this.add(doc);
      });
    });

    searchInput.addEventListener('input', (event) => {
      const query = event.target.value.trim();
      if (query.length < 2) {
        resultsDiv.style.display = 'none';
        return;
      }

      const results = safeSearch(query);
      displayResults(results, resultsDiv);
    });

    searchInput.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      searchInput.value = '';
      resultsDiv.innerHTML = '';
      resultsDiv.style.display = 'none';
    });

    resultsDiv.addEventListener('click', (event) => {
      const resultLink = event.target.closest('a');
      if (!resultLink) return;
      searchInput.value = '';
      resultsDiv.innerHTML = '';
      resultsDiv.style.display = 'none';
      searchInput.blur();
    });

    document.addEventListener('click', (event) => {
      if (!resultsDiv.contains(event.target) && event.target !== searchInput) {
        resultsDiv.style.display = 'none';
      }
    });
  }

  const script = document.createElement('script');
  script.src = 'https://unpkg.com/lunr/lunr.js';
  script.onload = initSearch;
  document.head.appendChild(script);
})();
