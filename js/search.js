(function () {
  let lunrIndex, pagesData;

  async function initSearch() {
    const response = await fetch('/fravora/search.json');
    pagesData = await response.json();

    lunrIndex = lunr(function () {
      this.ref('url');
      this.field('title');
      this.field('content');

      pagesData.forEach((doc) => {
        this.add(doc);
      });
    });

    const searchInput = document.getElementById('manualSearch');
    const resultsDiv = document.getElementById('searchResults');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length < 2) {
          resultsDiv.style.display = 'none';
          return;
        }

        const results = lunrIndex.search(query);
        displayResults(results, resultsDiv);
      });
    }
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
