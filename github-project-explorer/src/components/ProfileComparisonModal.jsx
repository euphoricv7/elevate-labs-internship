import React, { useState } from 'react';
import { fetchUserProfile, fetchUserRepos } from '../utils/githubApi';
import { useExplorer } from '../context/ExplorerContext';
import { X, GitCompare, Trophy, RefreshCw, Star, FolderGit2, Users, Calendar } from 'lucide-react';

export const ProfileComparisonModal = ({ onClose }) => {
  const { patToken } = useExplorer();
  const [user1Input, setUser1Input] = useState('facebook');
  const [user2Input, setUser2Input] = useState('vercel');

  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCompare = async () => {
    if (!user1Input.trim() || !user2Input.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const [u1, u2] = await Promise.all([
        fetchUserProfile(user1Input.trim(), patToken),
        fetchUserProfile(user2Input.trim(), patToken)
      ]);

      if (!u1.success) {
        setError(`User 1 (${user1Input}): ${u1.message}`);
        setLoading(false);
        return;
      }
      if (!u2.success) {
        setError(`User 2 (${user2Input}): ${u2.message}`);
        setLoading(false);
        return;
      }

      const [r1, r2] = await Promise.all([
        fetchUserRepos(user1Input.trim(), patToken),
        fetchUserRepos(user2Input.trim(), patToken)
      ]);

      const repos1 = r1.data || [];
      const repos2 = r2.data || [];

      const stars1 = repos1.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
      const stars2 = repos2.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

      // Top Language calculation
      const getTopLang = (reposList) => {
        const counts = {};
        reposList.forEach(r => {
          if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
        });
        const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
        return sorted[0] || 'N/A';
      };

      setData1({
        profile: u1.data,
        repos: repos1,
        totalStars: stars1,
        topLanguage: getTopLang(repos1)
      });

      setData2({
        profile: u2.data,
        repos: repos2,
        totalStars: stars2,
        topLanguage: getTopLang(repos2)
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
          <GitCompare size={24} style={{ color: '#ec4899' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#f8fafc', margin: 0 }}>
            Side-by-Side Profile Comparison
          </h2>
        </div>

        {/* Input Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.8rem', marginBottom: '1.5rem', alignItems: 'center' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Username 1 (e.g. facebook)"
            value={user1Input}
            onChange={(e) => setUser1Input(e.target.value)}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Username 2 (e.g. vercel)"
            value={user2Input}
            onChange={(e) => setUser2Input(e.target.value)}
          />
          <button className="btn btn-gradient btn-sm" onClick={handleCompare} disabled={loading} style={{ height: '38px', padding: '0 1.2rem' }}>
            {loading ? <RefreshCw size={15} className="spin" /> : 'Compare'}
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#f87171', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        {/* Comparison Grid */}
        {data1 && data2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {/* User 1 Card */}
            <div className="glass-card" style={{ padding: '1.2rem', borderColor: data1.totalStars > data2.totalStars ? '#3b82f6' : 'var(--border-color)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <img src={data1.profile.avatar_url} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', marginBottom: '0.4rem', border: '2px solid #3b82f6' }} />
                <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', margin: 0 }}>{data1.profile.name || data1.profile.login}</h3>
                <span style={{ fontSize: '0.78rem', color: '#60a5fa' }}>@{data1.profile.login}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} style={{ color: '#f59e0b' }} /> Total Stars</span>
                  <strong style={{ color: data1.totalStars >= data2.totalStars ? '#10b981' : '#f8fafc', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {data1.totalStars.toLocaleString()} {data1.totalStars > data2.totalStars && <Trophy size={14} style={{ color: '#f59e0b' }} />}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><FolderGit2 size={14} style={{ color: '#3b82f6' }} /> Public Repos</span>
                  <strong style={{ color: data1.profile.public_repos >= data2.profile.public_repos ? '#10b981' : '#f8fafc' }}>
                    {data1.profile.public_repos}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} style={{ color: '#8b5cf6' }} /> Followers</span>
                  <strong style={{ color: data1.profile.followers >= data2.profile.followers ? '#10b981' : '#f8fafc' }}>
                    {data1.profile.followers.toLocaleString()}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Top Language</span>
                  <strong style={{ color: '#38bdf8' }}>{data1.topLanguage}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> Joined</span>
                  <strong>{new Date(data1.profile.created_at).getFullYear()}</strong>
                </div>
              </div>
            </div>

            {/* User 2 Card */}
            <div className="glass-card" style={{ padding: '1.2rem', borderColor: data2.totalStars > data1.totalStars ? '#ec4899' : 'var(--border-color)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <img src={data2.profile.avatar_url} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', marginBottom: '0.4rem', border: '2px solid #ec4899' }} />
                <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', margin: 0 }}>{data2.profile.name || data2.profile.login}</h3>
                <span style={{ fontSize: '0.78rem', color: '#f472b6' }}>@{data2.profile.login}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} style={{ color: '#f59e0b' }} /> Total Stars</span>
                  <strong style={{ color: data2.totalStars >= data1.totalStars ? '#10b981' : '#f8fafc', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {data2.totalStars.toLocaleString()} {data2.totalStars > data1.totalStars && <Trophy size={14} style={{ color: '#f59e0b' }} />}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><FolderGit2 size={14} style={{ color: '#3b82f6' }} /> Public Repos</span>
                  <strong style={{ color: data2.profile.public_repos >= data1.profile.public_repos ? '#10b981' : '#f8fafc' }}>
                    {data2.profile.public_repos}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} style={{ color: '#8b5cf6' }} /> Followers</span>
                  <strong style={{ color: data2.profile.followers >= data1.profile.followers ? '#10b981' : '#f8fafc' }}>
                    {data2.profile.followers.toLocaleString()}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Top Language</span>
                  <strong style={{ color: '#38bdf8' }}>{data2.topLanguage}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                  <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> Joined</span>
                  <strong>{new Date(data2.profile.created_at).getFullYear()}</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
