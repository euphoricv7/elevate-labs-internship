import React, { useState } from 'react';
import { useExplorer } from '../context/ExplorerContext';
import { Search, Compass, TrendingUp, Bookmark, GitCompare, Key, Github, Sparkles } from 'lucide-react';

export const Navbar = ({ onOpenPatModal, onOpenCompareModal }) => {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    searchMode,
    handleSearch,
    bookmarks,
    patToken
  } = useExplorer();

  const [inputVal, setInputVal] = useState(searchQuery);
  const [mode, setMode] = useState(searchMode);

  const onSubmitSearch = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setActiveTab('explorer');
      handleSearch(inputVal, mode);
    }
  };

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, padding: '0.8rem 1.5rem', zIndex: 50, position: 'sticky', top: 0 }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '0.45rem', borderRadius: '10px', display: 'flex', color: '#fff' }}>
            <Github size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f8fafc', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              GitHub Explorer
              <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', fontWeight: '600' }}>
                PRO
              </span>
            </h1>
            <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>
              Search • Analytics • Compare • Bookmarks
            </p>
          </div>
        </div>

        {/* Global Search Input Bar */}
        <form onSubmit={onSubmitSearch} style={{ flex: 1, maxWidth: '480px', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              className="input-field"
              style={{ paddingLeft: '2.2rem', paddingRight: '4.5rem' }}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={mode === 'user' ? "Search username or organization..." : "Search topic or keyword..."}
            />
            {/* Mode Switcher pill inside input */}
            <div style={{ position: 'absolute', right: '0.4rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', background: 'rgba(255,255,255,0.06)', padding: '2px', borderRadius: '6px' }}>
              <button
                type="button"
                onClick={() => setMode('user')}
                style={{ fontSize: '0.68rem', padding: '2px 6px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: mode === 'user' ? '#3b82f6' : 'transparent', color: mode === 'user' ? '#fff' : '#94a3b8', fontWeight: mode === 'user' ? '600' : '400' }}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => setMode('topic')}
                style={{ fontSize: '0.68rem', padding: '2px 6px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: mode === 'topic' ? '#3b82f6' : 'transparent', color: mode === 'topic' ? '#fff' : '#94a3b8', fontWeight: mode === 'topic' ? '600' : '400' }}
              >
                Topic
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0.55rem 0.9rem' }}>
            Search
          </button>
        </form>

        {/* View Navigation Tabs & Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('explorer')}
            className={`btn btn-sm ${activeTab === 'explorer' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Compass size={15} />
            <span>Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab('trending')}
            className={`btn btn-sm ${activeTab === 'trending' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <TrendingUp size={15} style={{ color: '#10b981' }} />
            <span>Trending</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`btn btn-sm ${activeTab === 'bookmarks' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Bookmark size={15} style={{ color: '#f59e0b' }} />
            <span>Bookmarks</span>
            {bookmarks.length > 0 && (
              <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.25)', color: '#fbbf24', fontSize: '0.68rem', padding: '1px 5px', borderRadius: '10px', fontWeight: '700' }}>
                {bookmarks.length}
              </span>
            )}
          </button>

          {/* Compare Profiles Button */}
          <button onClick={onOpenCompareModal} className="btn btn-gradient btn-sm" title="Compare two GitHub profiles side-by-side">
            <GitCompare size={15} />
            <span>Compare</span>
          </button>

          {/* PAT Token Settings */}
          <button onClick={onOpenPatModal} className="btn btn-secondary btn-sm" title="GitHub Personal Access Token">
            <Key size={15} style={{ color: patToken ? '#10b981' : '#f59e0b' }} />
          </button>
        </div>
      </div>
    </header>
  );
};
