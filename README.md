```markdown
# TechForge

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![Deployment](https://img.shields.io/badge/deployed-static-blue)]()

A **responsive**, **theme-aware**, and **API-driven** tech news blog—TechForge fetches the latest headlines from GNews & NewsAPI, and displays them in a clean, modern interface built with **Tailwind CSS**, **vanilla JavaScript**, and a sprinkle of 🚀 performance optimizations.

---

## 🚀 Live Demo

> _Coming soon…_  
> You can also serve the `dist/` folder with any static-file host (GitHub Pages, Netlify, Surge, etc.).

---

## ✨ Features

- **Real-time Tech Headlines** from GNews & NewsAPI  
- **Six Categories**: All, AI, Gadgets, Robotics, Mobile, Startups (customizable)  
- **Dark / Light Mode** toggle, with system-preference detection and `localStorage` persistence  
- **Skeleton Loading States** for smooth UX while articles load  
- **Responsive Grid**: adapts from mobile (1-col) to desktop (3-col)  
- **Lazy-loaded Images** to save bandwidth  
- **Clean, Accessible Markup** with semantic HTML and ARIA labels  

---

## 📁 Repository Structure

```

techforge/
├── public/
│   └── index.html
├── src/
│   ├── config.js           # your GNEWS & NEWSAPI keys
│   ├── script.js           # main theme + fetch + render logic
│   └── styles.css          # custom utilities (if any)
├── assets/
│   ├── logo.svg
│   └── placeholder.png
├── dist/                   # production-ready build (optional)
├── .gitignore
├── LICENSE
└── README.md

````

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/techforge.git
cd techforge
````

### 2. Install Dependencies

*No build step required—everything is vanilla.*
If you want to run a local dev server:

```bash
# Using http-server (install globally if needed)
npm install -g http-server
http-server public/ -c-1
```

Or with VS Code’s Live Server extension.

### 3. Configure Your API Keys

Create `src/config.js` (it’s gitignored) in the project root:

```js
// src/config.js
window.API_KEYS = {
  GNEWS:   'YOUR_GNEWS_API_KEY_HERE',
  NEWSAPI: 'YOUR_NEWSAPI_KEY_HERE'
};
```

### 4. Open in Browser

Navigate to `http://localhost:8080` (or your chosen port) to see TechForge in action!

---

## 🧩 How It Works

1. **Theme Initialization**
   Inline script in `<head>` reads `localStorage` + system settings, and immediately adds/removes the `dark` class to avoid flicker.
2. **Theme Toggle**
   A button toggles `document.documentElement.classList` and syncs state to `localStorage`, swapping 🌙 / 🌞 icons.
3. **Category Buttons**
   Click to highlight a category, then fire off `fetchNews(category)`.
4. **Data Fetching**
   Parallel calls to GNews & NewsAPI, merge and truncate to 6 articles, then `renderArticles()`.
5. **Skeleton Loader**
   While awaiting API data, placeholder cards animate to keep the UI feeling snappy.

---

## 🎨 Screenshots

![Light Mode – Desktop](docs/screenshots/light-desktop.png)
![Dark Mode – Mobile](docs/screenshots/dark-mobile.png)

---

## 🧭 Roadmap

* [ ] Add pagination or “Load more”
* [ ] Search bar for custom queries
* [ ] Article bookmarking (localStorage)
* [ ] Offline support with service workers
* [ ] Multi-language support

---

## 🤝 Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

---

## 📜 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 👤 Author

**Soham Babrekar**

* 🔗 [GitHub](https://github.com/SohamBabrekar))

---

> Built with ❤️ and ☕ by Soham Babrekar. Enjoy your daily dose of tech news!
