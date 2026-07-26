const GITHUB_API_BASE = 'https://api.github.com';

const getHeaders = (token) => {
  const headers = { 'Accept': 'application/vnd.github.v3+json' };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  return headers;
};

// Local storage caching helper to save GitHub rate limit quota
const getCache = (key) => {
  try {
    const item = sessionStorage.getItem('gh_cache_' + key);
    if (!item) return null;
    const { data, expiry } = JSON.parse(item);
    if (Date.now() > expiry) return null;
    return data;
  } catch (e) {
    return null;
  }
};

const setCache = (key, data, ttlMs = 5 * 60 * 1000) => {
  try {
    sessionStorage.setItem('gh_cache_' + key, JSON.stringify({
      data,
      expiry: Date.now() + ttlMs
    }));
  } catch (e) {
    // Ignore quota exceeded
  }
};

// Fetch User Profile
export const fetchUserProfile = async (username, token = '') => {
  const cacheKey = `user_${username.toLowerCase()}`;
  const cached = getCache(cacheKey);
  if (cached) return { success: true, data: cached, fromCache: true };

  try {
    const res = await fetch(`${GITHUB_API_BASE}/users/${encodeURIComponent(username)}`, {
      headers: getHeaders(token)
    });

    if (res.status === 404) {
      return { success: false, message: `GitHub user or organization "${username}" not found.` };
    }

    if (!res.ok) {
      return { success: false, message: `GitHub API error (${res.status}): ${res.statusText}` };
    }

    const data = await res.json();
    setCache(cacheKey, data);
    return { success: true, data, fromCache: false };
  } catch (error) {
    console.error('API Error fetchUserProfile:', error);
    return { success: false, message: error.message };
  }
};

// Fetch User Public Repositories
export const fetchUserRepos = async (username, token = '') => {
  const cacheKey = `repos_${username.toLowerCase()}`;
  const cached = getCache(cacheKey);
  if (cached) return { success: true, data: cached, fromCache: true };

  try {
    const res = await fetch(`${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, {
      headers: getHeaders(token)
    });

    if (!res.ok) {
      return { success: false, message: `GitHub API error (${res.status}): ${res.statusText}` };
    }

    const data = await res.json();
    setCache(cacheKey, data);
    return { success: true, data, fromCache: false };
  } catch (error) {
    console.error('API Error fetchUserRepos:', error);
    return { success: false, message: error.message };
  }
};

// Search Repositories by Keyword / Topic
export const searchRepositories = async (query, token = '') => {
  const cacheKey = `search_${query.toLowerCase()}`;
  const cached = getCache(cacheKey);
  if (cached) return { success: true, data: cached.items, fromCache: true };

  try {
    const res = await fetch(`${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=40`, {
      headers: getHeaders(token)
    });

    if (!res.ok) {
      return { success: false, message: `Search API error (${res.status}): ${res.statusText}` };
    }

    const data = await res.json();
    setCache(cacheKey, data);
    return { success: true, data: data.items || [], fromCache: false };
  } catch (error) {
    console.error('API Error searchRepositories:', error);
    return { success: false, message: error.message };
  }
};

// Fetch Trending Repositories
export const fetchTrendingRepos = async (period = 'weekly', language = '', token = '') => {
  const now = new Date();
  let daysAgo = 7;
  if (period === 'daily') daysAgo = 1;
  if (period === 'monthly') daysAgo = 30;

  const date = new Date(now.setDate(now.getDate() - daysAgo)).toISOString().split('T')[0];
  let q = `created:>${date}`;
  if (language && language !== 'All') {
    q += ` language:${language.toLowerCase()}`;
  }

  const cacheKey = `trending_${period}_${language}`;
  const cached = getCache(cacheKey);
  if (cached) return { success: true, data: cached, fromCache: true };

  try {
    const res = await fetch(`${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=30`, {
      headers: getHeaders(token)
    });

    if (!res.ok) {
      return { success: false, message: `Trending API error (${res.status}): ${res.statusText}` };
    }

    const data = await res.json();
    setCache(cacheKey, data.items || []);
    return { success: true, data: data.items || [], fromCache: false };
  } catch (error) {
    console.error('API Error fetchTrendingRepos:', error);
    return { success: false, message: error.message };
  }
};
