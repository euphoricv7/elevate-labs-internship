import React from 'react';
import { useExplorer } from '../context/ExplorerContext';
import { Users, Star, FolderGit2, MapPin, Link as LinkIcon, ExternalLink, Building, Twitter } from 'lucide-react';

export const UserProfileCard = () => {
  const { userProfile, repos } = useExplorer();

  if (!userProfile) return null;

  // Calculate total stars across user repos
  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <img
            src={userProfile.avatar_url}
            alt={userProfile.login}
            style={{ width: '76px', height: '76px', borderRadius: '50%', border: '2px solid rgba(59, 130, 246, 0.5)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#f8fafc', margin: 0 }}>
                {userProfile.name || userProfile.login}
              </h2>
              <a
                href={userProfile.html_url}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#60a5fa', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '2px', fontSize: '0.8rem' }}
              >
                @{userProfile.login} <ExternalLink size={13} />
              </a>
            </div>
            {userProfile.bio && (
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.3rem', maxWidth: '600px' }}>
                {userProfile.bio}
              </p>
            )}

            {/* Meta details */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem', fontSize: '0.78rem', color: '#94a3b8' }}>
              {userProfile.location && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} style={{ color: '#f43f5e' }} /> {userProfile.location}
                </span>
              )}
              {userProfile.company && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Building size={13} style={{ color: '#3b82f6' }} /> {userProfile.company}
                </span>
              )}
              {userProfile.blog && (
                <a href={userProfile.blog.startsWith('http') ? userProfile.blog : `https://${userProfile.blog}`} target="_blank" rel="noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <LinkIcon size={13} style={{ color: '#10b981' }} /> {userProfile.blog}
                </a>
              )}
              {userProfile.twitter_username && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Twitter size={13} style={{ color: '#38bdf8' }} /> @{userProfile.twitter_username}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* User Statistics Grid */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="glass-card" style={{ padding: '0.75rem 1.1rem', textAlign: 'center', minWidth: '90px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.75rem', fontWeight: '600' }}>
              <Star size={14} /> Total Stars
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#f8fafc', marginTop: '2px' }}>
              {totalStars.toLocaleString()}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '0.75rem 1.1rem', textAlign: 'center', minWidth: '90px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#3b82f6', fontSize: '0.75rem', fontWeight: '600' }}>
              <FolderGit2 size={14} /> Repositories
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#f8fafc', marginTop: '2px' }}>
              {userProfile.public_repos}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '0.75rem 1.1rem', textAlign: 'center', minWidth: '90px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#8b5cf6', fontSize: '0.75rem', fontWeight: '600' }}>
              <Users size={14} /> Followers
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#f8fafc', marginTop: '2px' }}>
              {userProfile.followers.toLocaleString()}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '0.75rem 1.1rem', textAlign: 'center', minWidth: '90px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#06b6d4', fontSize: '0.75rem', fontWeight: '600' }}>
              <Users size={14} /> Following
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#f8fafc', marginTop: '2px' }}>
              {userProfile.following.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
