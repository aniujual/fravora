(function () {
  let lunrIndex;
  let pagesData = [];
  const searchInstances = [];

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

  function displayResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = '<p class="no-results">No pages found.</p>';
      container.style.display = 'block';
      return;
    }

    const html = results.map((result) => {
      const page = pagesData.find((item) => item.url === result.ref);
      if (!page) return '';
      return `
        <div class="search-result-item">
          <a href="${page.url}">
            <h4>${page.title}</h4>
            <p>${page.content.substring(0, 140)}...</p>
          </a>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
    container.style.display = 'block';
  }

  function bindSearchInput(searchInput, resultsDiv) {
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
      if (event.key === 'Escape') {
        event.preventDefault();
        searchInput.value = '';
        resultsDiv.innerHTML = '';
        resultsDiv.style.display = 'none';
        return;
      }

      if (event.key !== 'Enter') return;
      const query = searchInput.value.trim();
      if (query.length < 2) return;
      event.preventDefault();
      const searchPage = searchInput.dataset.searchPage || '/search-site.html';
      window.location.href = `${searchPage}?q=${encodeURIComponent(query)}`;
    });
  }

  function closeSearchPanelsOnOutsideClick(event) {
    searchInstances.forEach(({ searchInput, resultsDiv }) => {
      if (!resultsDiv.contains(event.target) && event.target !== searchInput) {
        resultsDiv.style.display = 'none';
      }
    });
  }

  function runQueryFromUrlIfPresent() {
    const pageInput = document.getElementById('siteSearch');
    const pageResults = document.getElementById('siteSearchResults');
    if (!pageInput || !pageResults) return;

    const query = new URLSearchParams(window.location.search).get('q');
    if (!query || query.trim().length < 2) return;

    pageInput.value = query.trim();
    const results = safeSearch(query.trim());
    displayResults(results, pageResults);
  }

  async function initSearch() {
    const instances = [
      {
        searchInput: document.getElementById('navSiteSearch'),
        resultsDiv: document.getElementById('navSiteSearchResults')
      },
      {
        searchInput: document.getElementById('siteSearch'),
        resultsDiv: document.getElementById('siteSearchResults')
      }
    ].filter((instance) => instance.searchInput && instance.resultsDiv);

    if (instances.length === 0) return;

    try {
      const response = await fetch(getSearchJsonUrl());
      if (!response.ok) {
        throw new Error(`Search index load failed: ${response.status}`);
      }
      pagesData = await response.json();
    } catch (error) {
      console.error(error);
      instances.forEach(({ resultsDiv }) => {
        resultsDiv.innerHTML = '<p class="no-results">Site search is currently unavailable.</p>';
        resultsDiv.style.display = 'block';
      });
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

    instances.forEach(({ searchInput, resultsDiv }) => {
      bindSearchInput(searchInput, resultsDiv);
      searchInstances.push({ searchInput, resultsDiv });
    });

    document.addEventListener('click', closeSearchPanelsOnOutsideClick);
    runQueryFromUrlIfPresent();
  }

  const script = document.createElement('script');
  script.src = 'https://unpkg.com/lunr/lunr.js';
  script.onload = initSearch;
  document.head.appendChild(script);
})();
