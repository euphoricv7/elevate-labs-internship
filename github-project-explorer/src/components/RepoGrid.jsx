import React from 'react';
import { useExplorer } from '../context/ExplorerContext';
import { RepoCard } from './RepoCard';
import { FilterBar } from './FilterBar';
import { RefreshCw, AlertCircle, FolderX } from 'lucide-react';

export const RepoGrid = ({ onOpenNoteModal }) => {
  const {
    repos,
    loading,
    error,
    selectedLanguage,
    sortBy
  } = useExplorer();

  if (loading) {
    return (
      <div style={{ padding: '4rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
        <RefreshCw size={32} className="spin" style={{ color: '#3b82f6', marginBottom: '0.8rem' }} />
        <p style={{ fontSize: '0.95rem', fontWeight: '500' }}>Fetching repositories from GitHub API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: '#f87171', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
        <AlertCircle size={32} style={{ marginBottom: '0.6rem' }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc', marginBottom: '0.4rem' }}>Request Failed</h3>
        <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{error}</p>
      </div>
    );
  }

  // Apply Language Filter
  let filtered = repos;
  if (selectedLanguage && selectedLanguage !== 'All') {
    filtered = filtered.filter(r => r.language === selectedLanguage);
  }

  // Apply Sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'stars_desc') return (b.stargazers_count || 0) - (a.stargazers_count || 0);
    if (sortBy === 'stars_asc') return (a.stargazers_count || 0) - (b.stargazers_count || 0);
    if (sortBy === 'forks_desc') return (b.forks_count || 0) - (a.forks_count || 0);
    if (sortBy === 'updated_desc') return new Date(b.updated_at || 0) - new Date(a.updated_at || 0);
    if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div>
      <FilterBar totalCount={filtered.length} />

      {filtered.length === 0 ? (
        <div style={{ padding: '3rem 1rem', textAlign: 'center', color: '#94a3b8', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
          <FolderX size={32} style={{ marginBottom: '0.6rem' }} />
          <p style={{ fontSize: '0.9rem' }}>No repositories match the selected language filter.</p>
        </div>
      ) : (
        <div className="repo-grid">
          {filtered.map((repo) => (
            <RepoCard key={repo.id} repo={repo} onOpenNoteModal={onOpenNoteModal} />
          ))}
        </div>
      )}
    </div>
  );
};
