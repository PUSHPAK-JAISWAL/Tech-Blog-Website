document.addEventListener('DOMContentLoaded', () => {
  // ————— THEME TOGGLE & PERSISTENCE —————
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function updateThemeIcon(isDark) {
    // CORRECTED: 🌙 for dark mode, 🌞 for light mode
    themeIcon.textContent = isDark ? '🌙' : '🌞';
  }

  // 1. Initialize theme
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const useDark = storedTheme
    ? (storedTheme === 'dark')
    : prefersDark;

  document.documentElement.classList.toggle('dark', useDark);
  updateThemeIcon(useDark);

  // 2. Toggle on button click
  themeToggle.addEventListener('click', () => {
    const isDarkNow = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', isDarkNow);
    localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
    updateThemeIcon(isDarkNow);
  });

  // ... rest of your existing code remains unchanged ...
  // ————— CATEGORY BUTTONS & INITIAL SETUP —————
  const buttons = document.querySelectorAll('.category-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // style active button
      buttons.forEach(b => b.classList.remove('bg-indigo-600','text-white'));
      btn.classList.add('bg-indigo-600','text-white');
      // fetch for that category
      fetchNews(btn.dataset.category);
    });
  });

  // make “All” active on first load
  if (buttons.length) {
    buttons[0].classList.add('bg-indigo-600','text-white');
  }


  // ————— SKELETON LOADER —————
  function renderSkeleton(count = 6) {
    const html = Array.from({length: count}, () => `
      <div class="animate-pulse space-y-4">
        <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    `).join('');
    document.getElementById('blog-grid').innerHTML = html;
  }


  // ————— FETCH & RENDER ARTICLES —————
  async function fetchNews(category = 'All') {
    renderSkeleton();
    const { GNEWS, NEWSAPI } = window.API_KEYS;

    let gnewsUrl, newsapiUrl;
    if (category === 'All') {
      gnewsUrl   = `https://gnews.io/api/v4/top-headlines?topic=technology&lang=en&max=6&apikey=${GNEWS}`;
      newsapiUrl = `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=6&apiKey=${NEWSAPI}`;
    } else {
      const q = encodeURIComponent(category);
      gnewsUrl   = `https://gnews.io/api/v4/search?q=${q}&lang=en&max=6&apikey=${GNEWS}`;
      newsapiUrl = `https://newsapi.org/v2/everything?q=${q}&language=en&pageSize=6&apiKey=${NEWSAPI}`;
    }

    try {
      const [gRes, nRes] = await Promise.all([ fetch(gnewsUrl), fetch(newsapiUrl) ]);
      const [gData, nData] = await Promise.all([ gRes.json(), nRes.json() ]);
      const articles = [ ...(gData.articles||[]), ...(nData.articles||[]) ]
        .slice(0, 6)
        .map(a => ({
          title:  a.title,
          desc:   a.description || a.content || '',
          url:    a.url,
          img:    a.image || a.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image',
          category
        }));

      renderArticles(articles);
    } catch (err) {
      console.error('Fetch error:', err);
      document.getElementById('blog-grid').innerHTML =
        `<p class="text-center text-red-500 col-span-full">Failed to load news.</p>`;
    }
  }

  function renderArticles(list) {
    const html = list.map(a => `
      <a href="${a.url}" target="_blank"
         class="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg
                hover:shadow-2xl transform hover:-translate-y-1 transition">
        <div class="relative">
          <img src="${a.img}" alt="${a.title}"
               class="w-full h-48 object-cover"
               loading="lazy"
               onload="this.nextElementSibling.style.display='none'"
          />
          <div class="loader absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
            <svg class="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
          </div>
        </div>
        <div class="p-4">
          <span class="inline-block px-2 py-1 text-xs font-semibold text-indigo-600
                       bg-indigo-100 dark:bg-indigo-900 rounded-full mb-2">
            ${a.category}
          </span>
          <h3 class="text-lg font-semibold mb-1 group-hover:text-indigo-600 transition">
            ${a.title}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
            ${a.desc}
          </p>
        </div>
      </a>
    `).join('');

    document.getElementById('blog-grid').innerHTML = html;
  }


  // ————— INITIAL LOAD —————
  fetchNews('All');
});