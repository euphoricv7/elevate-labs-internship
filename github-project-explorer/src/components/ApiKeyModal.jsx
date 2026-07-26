import React, { useState } from 'react';
import { useExplorer } from '../context/ExplorerContext';
import { X, Key, ShieldCheck } from 'lucide-react';

export const ApiKeyModal = ({ onClose }) => {
  const { patToken, setPatToken } = useExplorer();
  const [tokenInput, setTokenInput] = useState(patToken);

  const handleSave = () => {
    setPatToken(tokenInput.trim());
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '1.5rem', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
          <Key size={22} style={{ color: '#f59e0b' }} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
            GitHub Token Settings
          </h3>
        </div>

        <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '1rem', lineHeight: '1.5' }}>
          GitHub allows <strong>60 unauthenticated requests/hour</strong>. Enter an optional Personal Access Token (PAT) to unlock <strong>5,000 requests/hour</strong>!
        </p>

        <div className="form-group" style={{ marginBottom: '1.2rem' }}>
          <label className="form-label">GitHub Personal Access Token (PAT)</label>
          <input
            type="password"
            className="input-field"
            placeholder="ghp_1234567890abcdef..."
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#10b981', marginBottom: '1.2rem' }}>
          <ShieldCheck size={16} /> Token is stored strictly locally in your browser's LocalStorage.
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary btn-sm" onClick={handleSave}>Save Token</button>
        </div>
      </div>
    </div>
  );
};
