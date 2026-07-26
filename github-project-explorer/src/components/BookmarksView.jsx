import React, { useState } from 'react';
import { useExplorer } from '../context/ExplorerContext';
import { RepoCard } from './RepoCard';
import { Bookmark, Search, Filter, FolderX } from 'lucide-react';

export const BookmarksView = ({ onOpenNoteModal }) => {
  const { bookmarks } = useExplorer();
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');

  // Languages in bookmarks
  const languages = ['All', ...Array.from(new Set(bookmarks.map(r => r.language).filter(Boolean))).sort()];

  // Filter bookmarks
  let filtered = bookmarks.filter((repo) => {
    const matchesSearch = !searchFilter.trim() ||
      repo.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchFilter.toLowerCase()));
    const matchesLang = selectedLang === 'All' || repo.language === selectedLang;
    return matchesSearch && matchesLang;
  });

  return (
    <div>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(139, 92, 246, 0.1))', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', padding: '0.5rem', borderRadius: '10px', color: '#fff', display: 'flex' }}>
              <Bookmark size={22} fill="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#f8fafc', margin: 0 }}>
                Bookmarked Repositories ({bookmarks.length})
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', margin: 0 }}>
                Your saved repositories and personal notes stored locally in browser LocalStorage.
              </p>
            </div>
          </div>

          {/* Quick Filter Inputs */}
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                className="input-field"
                style={{ paddingLeft: '1.8rem', padding: '0.35rem 0.6rem 0.35rem 1.8rem', fontSize: '0.78rem', width: '180px' }}
                placeholder="Filter bookmarks..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>

            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="input-field"
              style={{ width: 'auto', padding: '0.35rem 0.6rem', fontSize: '0.78rem' }}
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Grid or Empty State */}
      {bookmarks.length === 0 ? (
        <div style={{ padding: '4rem 1rem', textAlign: 'center', color: '#94a3b8', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
          <Bookmark size={36} style={{ color: '#f59e0b', marginBottom: '0.8rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc', marginBottom: '0.4rem' }}>No Bookmarks Saved Yet</h3>
          <p style={{ fontSize: '0.85rem' }}>
            Click the bookmark icon <Bookmark size={14} style={{ display: 'inline', margin: '0 2px' }} /> on any repository card to save it for quick offline reference!
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: '3rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
          <FolderX size={32} style={{ marginBottom: '0.6rem' }} />
          <p>No bookmarked repositories match your filter criteria.</p>
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
