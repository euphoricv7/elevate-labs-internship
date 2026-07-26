const BOOKMARKS_KEY = 'gh_explorer_bookmarks';
const NOTES_KEY = 'gh_explorer_notes';
const TOKEN_KEY = 'gh_explorer_pat_token';

// Bookmarks
export const getBookmarks = () => {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveBookmarks = (bookmarks) => {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (e) {
    console.error('Error saving bookmarks:', e);
  }
};

export const toggleBookmarkRepo = (repo) => {
  const current = getBookmarks();
  const index = current.findIndex(item => item.id === repo.id);
  let updated;
  if (index >= 0) {
    updated = current.filter(item => item.id !== repo.id);
  } else {
    updated = [repo, ...current];
  }
  saveBookmarks(updated);
  return updated;
};

// Notes on repos
export const getNotesMap = () => {
  try {
    const data = localStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
};

export const saveRepoNote = (repoId, noteText) => {
  const notes = getNotesMap();
  if (!noteText || noteText.trim() === '') {
    delete notes[repoId];
  } else {
    notes[repoId] = {
      text: noteText,
      updatedAt: new Date().toISOString()
    };
  }
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('Error saving repo note:', e);
  }
  return notes;
};

// PAT Token
export const getPatToken = () => {
  return localStorage.getItem(TOKEN_KEY) || '';
};

export const setPatToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};
