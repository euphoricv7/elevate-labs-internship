import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserProfile, fetchUserRepos, searchRepositories } from '../utils/githubApi';
import { getBookmarks, toggleBookmarkRepo, getNotesMap, saveRepoNote, getPatToken, setPatToken } from '../utils/storage';

const ExplorerContext = createContext();

export const ExplorerProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('explorer'); // 'explorer', 'trending', 'bookmarks', 'compare'
  const [searchQuery, setSearchQuery] = useState('facebook');
  const [searchMode, setSearchMode] = useState('user'); // 'user' or 'topic'

  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters & Sorting
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortBy, setSortBy] = useState('stars_desc');

  // Bookmarks & Notes
  const [bookmarks, setBookmarks] = useState(getBookmarks());
  const [notesMap, setNotesMap] = useState(getNotesMap());

  // PAT Token
  const [patToken, setPatTokenState] = useState(getPatToken());

  const handleSetPatToken = (token) => {
    setPatTokenState(token);
    setPatToken(token);
  };

  // Perform search (User or Topic)
  const handleSearch = async (query, mode = searchMode) => {
    if (!query || query.trim() === '') return;
    const cleanQuery = query.trim();
    setSearchQuery(cleanQuery);
    setSearchMode(mode);
    setLoading(true);
    setError(null);

    if (mode === 'user') {
      const userRes = await fetchUserProfile(cleanQuery, patToken);
      if (!userRes.success) {
        setLoading(false);
        setError(userRes.message);
        setUserProfile(null);
        setRepos([]);
        return;
      }
      setUserProfile(userRes.data);

      const reposRes = await fetchUserRepos(cleanQuery, patToken);
      setLoading(false);
      if (reposRes.success) {
        setRepos(reposRes.data || []);
      } else {
        setError(reposRes.message);
      }
    } else {
      // Topic/Keyword search
      setUserProfile(null);
      const searchRes = await searchRepositories(cleanQuery, patToken);
      setLoading(false);
      if (searchRes.success) {
        setRepos(searchRes.data || []);
      } else {
        setError(searchRes.message);
      }
    }
  };

  // Initial load
  useEffect(() => {
    handleSearch('facebook', 'user');
  }, []);

  // Bookmark Toggle
  const toggleBookmark = (repo) => {
    const updated = toggleBookmarkRepo(repo);
    setBookmarks(updated);
  };

  const isBookmarked = (repoId) => {
    return bookmarks.some(b => b.id === repoId);
  };

  // Note save
  const updateNote = (repoId, text) => {
    const updatedNotes = saveRepoNote(repoId, text);
    setNotesMap({ ...updatedNotes });
  };

  return (
    <ExplorerContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        searchMode,
        setSearchMode,
        userProfile,
        repos,
        loading,
        error,
        selectedLanguage,
        setSelectedLanguage,
        sortBy,
        setSortBy,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        notesMap,
        updateNote,
        patToken,
        setPatToken: handleSetPatToken,
        handleSearch
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
};

export const useExplorer = () => useContext(ExplorerContext);
