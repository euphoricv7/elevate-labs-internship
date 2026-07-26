import React, { useState, useEffect } from 'react';
import { fetchTrendingRepos } from '../utils/githubApi';
import { useExplorer } from '../context/ExplorerContext';
import { RepoCard } from './RepoCard';
import { TrendingUp, RefreshCw, Flame, Filter } from 'lucide-react';

export const TrendingSection = ({ onOpenNoteModal }) => {
  const { patToken } = useExplorer();
  const [period, setPeriod] = useState('weekly'); // daily, weekly, monthly
  const [language, setLanguage] = useState('All');
  const [trendingRepos, setTrendingRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const popularLanguages = ['All', 'JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'C++', 'Java', 'HTML', 'PHP'];

  const loadTrending = async () => {
    setLoading(true);
    setError(null);
    const res = await fetchTrendingRepos(period, language, patToken);
    setLoading(false);
    if (res.success) {
      setTrendingRepos(res.data || []);
    } else {
      setError(res.message);
    }
  };

  useEffect(() => {
    loadTrending();
  }, [period, language]);

  return (
    <div>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.1))', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: '0.5rem', borderRadius: '10px', color: '#fff', display: 'flex' }}>
              <Flame size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#f8fafc', margin: 0 }}>
                Trending GitHub Repositories
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#cbd5e1', margin: 0 }}>
                Explore open source projects gaining massive star velocity on GitHub.
              </p>
            </div>
          </div>

          {/* Timeframe Selector Pills */}
          <div style={{ display: 'flex', gap: '0.3rem', background: 'rgba(9, 13, 22, 0.6)', padding: '3px', borderRadius: '8px' }}>
            {['daily', 'weekly', 'monthly'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  fontSize: '0.78rem',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  background: period === p ? '#10b981' : 'transparent',
                  color: period === p ? '#fff' : '#94a3b8',
                  fontWeight: period === p ? '600' : '400',
                  textTransform: 'capitalize'
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Language Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <Filter size={14} style={{ color: '#94a3b8' }} />
          <span style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>Language:</span>
          {popularLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              style={{
                fontSize: '0.72rem',
                padding: '0.2rem 0.55rem',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: language === lang ? '#10b981' : 'rgba(255,255,255,0.1)',
                background: language === lang ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                color: language === lang ? '#34d399' : '#94a3b8',
                cursor: 'pointer'
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ padding: '4rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
          <RefreshCw size={32} className="spin" style={{ color: '#10b981', marginBottom: '0.8rem' }} />
          <p style={{ fontSize: '0.9rem' }}>Fetching trending repositories...</p>
        </div>
      ) : error ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: '#f87171' }}>
          {error}
        </div>
      ) : (
        <div className="repo-grid">
          {trendingRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} onOpenNoteModal={onOpenNoteModal} />
          ))}
        </div>
      )}
    </div>
  );
};
