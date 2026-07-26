# 🚀 GitHub Project Explorer & Analytics Dashboard

An interactive, high-performance web dashboard built with **React**, **Vite**, **Chart.js**, and the **GitHub REST API**. Explore repositories, analyze language distributions, compare developer profiles side-by-side, discover trending projects, and persist bookmarked repositories with custom personal notes.

---

## Key Features

- **🔍 Global Search Engine**: Search any GitHub username/organization (e.g., `facebook`, `torvalds`, `vercel`) or search open-source repositories by topic/keyword (e.g., `react`, `machine-learning`, `rust`).
- **📊 Language Analytics & Visualizations**:
  - **Bar Chart**: Visual count of repositories per language.
  - **Doughnut Chart**: Percentage distribution of languages with official GitHub color codes.
- **🏷️ Interactive Filtering & Sorting**:
  - Filter repositories by primary programming language.
  - Sort by *Most Stars*, *Fewest Stars*, *Most Forks*, *Recently Updated*, or *Alphabetical Name*.
- **🔖 Bookmarks & Personal Notes (LocalStorage)**:
  - Save/bookmark repositories with a single click.
  - Dedicated **Bookmarks View** with filtering and search.
  - Write, edit, and attach custom personal notes to any repository (persisted across sessions).
- **⚔️ Side-by-Side Profile Comparator**:
  - Compare 2 GitHub accounts (e.g. `facebook` vs `vercel`) across total accumulated stars, public repos, followers, and top language with leader trophies.
- **🔥 Trending Repositories Page**:
  - Discover projects gaining rapid star velocity across **Daily**, **Weekly**, or **Monthly** timeframes.
- **🔑 Custom PAT Support**:
  - Input an optional GitHub Personal Access Token (PAT) to expand rate limits from 60 to 5,000 requests/hour.

---

## 🛠️ Tech Stack & Libraries

- **Frontend Core**: React 18, Vite
- **Styling**: Vanilla CSS3 (Custom Glassmorphism Dark Design System, CSS Grid/Flexbox)
- **Charts & Visualization**: Chart.js, `react-chartjs-2`
- **Icons**: Lucide React (`lucide-react`)
- **API**: GitHub REST API v3
- **Storage**: Browser `localStorage` & `sessionStorage`

---

## 📁 Project Structure

```
github-project-explorer/
├── public/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx                  # Top navigation & global search bar
    │   ├── UserProfileCard.jsx          # Profile header with stats & links
    │   ├── FilterBar.jsx               # Language filters & sorting dropdowns
    │   ├── RepoCard.jsx                # Repository item card with actions
    │   ├── RepoGrid.jsx                # Responsive repository grid
    │   ├── LanguageChart.jsx           # Chart.js Bar & Doughnut charts
    │   ├── ProfileComparisonModal.jsx  # Side-by-side profile comparator modal
    │   ├── TrendingSection.jsx         # Trending projects view (Daily/Weekly/Monthly)
    │   ├── BookmarksView.jsx           # Saved repositories manager
    │   ├── RepoNoteModal.jsx           # Personal note drawer modal
    │   └── ApiKeyModal.jsx             # Personal Access Token input modal
    ├── utils/
    │   ├── githubApi.js                # REST API queries & client-side caching
    │   ├── languageColors.js           # GitHub language color mappings
    │   └── storage.js                  # LocalStorage bookmark & notes helper
    └── context/
        └── ExplorerContext.jsx         # Global state & Context provider
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher)

### Installation

1. Navigate to the project directory:
   ```bash
   cd /Users/vratikakumawat/Desktop/elevate-labs-internship/github-project-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3001
   ```

---

## ⚡ Available Scripts

- **`npm run dev`**: Starts the development server on `http://localhost:3001`.
- **`npm run build`**: Compiles production assets into the `dist/` directory.
- **`npm run preview`**: Previews the built production assets locally.

---

## 💡 Usage Tips for Demonstrations & Interviews

1. **Search**: Type `torvalds` or `facebook` in the search bar to load real-time GitHub data.
2. **Analytics**: Scroll down to inspect the Bar and Doughnut charts reflecting language breakdown.
3. **Compare**: Click the **Compare** button in the header and compare `facebook` vs `vercel`.
4. **Bookmarks & Notes**: Click the star icon on a repository, add a note like *"Inspect auth module"*, and switch to the **Bookmarks** tab to see your note persisted!

