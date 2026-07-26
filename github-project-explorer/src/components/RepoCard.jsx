import React from 'react';
import { useExplorer } from '../context/ExplorerContext';
import { getLanguageColor } from '../utils/languageColors';
import { Star, GitFork, AlertCircle, Bookmark, FileText, ExternalLink, Calendar } from 'lucide-react';

export const RepoCard = ({ repo, onOpenNoteModal }) => {
  const { toggleBookmark, isBookmarked, notesMap } = useExplorer();
  const bookmarked = isBookmarked(repo.id);
  const noteObj = notesMap[repo.id];

  const updatedDate = new Date(repo.updated_at || Date.now()).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
      <div>
        {/* Card Header: Title & Bookmark Button */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0, wordBreak: 'break-word' }}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#60a5fa', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              {repo.name} <ExternalLink size={13} style={{ opacity: 0.7 }} />
            </a>
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            {/* Note Button */}
            <button
              onClick={() => onOpenNoteModal(repo)}
              title={noteObj ? "Edit Personal Note" : "Add Personal Note"}
              style={{
                background: noteObj ? 'rgba(139, 92, 246, 0.2)' : 'none',
                border: noteObj ? '1px solid rgba(139, 92, 246, 0.4)' : 'none',
                color: noteObj ? '#c084fc' : '#64748b',
                cursor: 'pointer',
                padding: '0.3rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <FileText size={16} />
            </button>

            {/* Bookmark Button */}
            <button
              onClick={() => toggleBookmark(repo)}
              title={bookmarked ? "Remove Bookmark" : "Bookmark Repo"}
              style={{
                background: bookmarked ? 'rgba(245, 158, 11, 0.2)' : 'none',
                border: bookmarked ? '1px solid rgba(245, 158, 11, 0.4)' : 'none',
                color: bookmarked ? '#f59e0b' : '#64748b',
                cursor: 'pointer',
                padding: '0.3rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Bookmark size={16} fill={bookmarked ? '#f59e0b' : 'none'} />
            </button>
          </div>
        </div>

        {/* Repo Description */}
        <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '1rem', lineHeight: '1.45', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {repo.description || 'No description provided.'}
        </p>

        {/* Existing Note Snippet Badge */}
        {noteObj && noteObj.text && (
          <div style={{ background: 'rgba(139, 92, 246, 0.15)', borderLeft: '3px solid #8b5cf6', padding: '0.35rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', color: '#e9d5ff', marginBottom: '0.8rem', fontStyle: 'italic' }}>
            "{noteObj.text.length > 70 ? noteObj.text.substring(0, 70) + '...' : noteObj.text}"
          </div>
        )}
      </div>

      {/* Card Footer: Metadata & Language */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem', fontSize: '0.78rem', color: '#94a3b8' }}>
        {/* Language Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '500' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: getLanguageColor(repo.language) }} />
          <span style={{ color: '#e2e8f0' }}>{repo.language || 'Plain Text'}</span>
        </div>

        {/* Metrics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#fbbf24', fontWeight: '600' }} title="Stars">
            <Star size={13} fill="#fbbf24" /> {repo.stargazers_count ? repo.stargazers_count.toLocaleString() : 0}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }} title="Forks">
            <GitFork size={13} /> {repo.forks_count ? repo.forks_count.toLocaleString() : 0}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }} title="Updated Date">
            <Calendar size={13} /> {updatedDate}
          </span>
        </div>
      </div>
    </div>
  );
};
