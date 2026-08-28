(function () {
  let lunrIndex, pagesData;

  function getSearchJsonUrl() {
    if (document.currentScript && document.currentScript.src) {
      const scriptUrl = new URL(document.currentScript.src, window.location.href);
      return new URL('../search.json', scriptUrl).toString();
    }

    return new URL('/search.json', window.location.origin).toString();
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

  async function initSearch() {
    const searchInput = document.getElementById('manualSearch');
    const resultsDiv = document.getElementById('searchResults');

    if (!searchInput || !resultsDiv) return;

    try {
      const response = await fetch(getSearchJsonUrl());
      if (!response.ok) {
        throw new Error(`Search index load failed: ${response.status}`);
      }
      pagesData = await response.json();
    } catch (error) {
      console.error(error);
      resultsDiv.innerHTML = '<p class="no-results">Search is currently unavailable.</p>';
      resultsDiv.style.display = 'none';
      return;
    }

    lunrIndex = lunr(function () {
      this.ref('url');
      this.field('title');
      this.field('content');

      pagesData.forEach((doc) => {
        this.add(doc);
      });
    });

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      if (query.length < 2) {
        resultsDiv.style.display = 'none';
        return;
      }

      const results = safeSearch(query);
      displayResults(results, resultsDiv);
    });
  }

  function displayResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = '<p class="no-results">No matches found.</p>';
      container.style.display = 'block';
      return;
    }

    const html = results.map(result => {
      const page = pagesData.find(p => p.url === result.ref);
      return `
        <div class="search-result-item">
          <a href="${page.url}">
            <h4>${page.title}</h4>
            <p>${page.content.substring(0, 100)}...</p>
          </a>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
    container.style.display = 'block';
  }

  // Load Lunr and init
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/lunr/lunr.js';
  script.onload = initSearch;
  document.head.appendChild(script);
})();
