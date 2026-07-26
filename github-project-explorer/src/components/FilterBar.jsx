import React from 'react';
import { useExplorer } from '../context/ExplorerContext';
import { Filter, ArrowUpDown } from 'lucide-react';

export const FilterBar = ({ totalCount }) => {
  const {
    repos,
    selectedLanguage,
    setSelectedLanguage,
    sortBy,
    setSortBy
  } = useExplorer();

  // Extract unique languages from current repos set
  const languages = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean))).sort()];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.2rem', padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
      {/* Language Filter Pills / Select */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Filter size={15} style={{ color: '#94a3b8' }} />
        <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: '500' }}>Language:</span>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="input-field"
          style={{ width: 'auto', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {/* Sorting Selector & Total Count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ArrowUpDown size={15} style={{ color: '#94a3b8' }} />
          <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: '500' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
            style={{ width: 'auto', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
          >
            <option value="stars_desc">Most Stars ⭐</option>
            <option value="stars_asc">Fewest Stars</option>
            <option value="forks_desc">Most Forks 🍴</option>
            <option value="updated_desc">Recently Updated 🕒</option>
            <option value="name_asc">Name (A-Z)</option>
          </select>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          Showing <strong style={{ color: '#38bdf8' }}>{totalCount}</strong> repositories
        </div>
      </div>
    </div>
  );
};
