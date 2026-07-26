export const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
  R: '#198CE7',
  Scala: '#c22d40',
  Elixir: '#6e4a7e',
  Lua: '#000080',
  Docker: '#384d54'
};

export const getLanguageColor = (lang) => {
  if (!lang) return '#94a3b8';
  return languageColors[lang] || '#3b82f6';
};
