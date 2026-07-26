import React, { useState } from 'react';
import { useExplorer } from '../context/ExplorerContext';
import { X, FileText, Save, Trash2 } from 'lucide-react';

export const RepoNoteModal = ({ repo, onClose }) => {
  const { notesMap, updateNote } = useExplorer();
  const existingNote = notesMap[repo?.id]?.text || '';
  const [noteText, setNoteText] = useState(existingNote);

  if (!repo) return null;

  const handleSave = () => {
    updateNote(repo.id, noteText);
    onClose();
  };

  const handleDelete = () => {
    updateNote(repo.id, '');
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', padding: '1.5rem', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <FileText size={22} style={{ color: '#c084fc' }} />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
              Personal Note: {repo.name}
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
              Attached to repository • Persisted in LocalStorage
            </p>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '1.2rem' }}>
          <textarea
            className="input-field"
            style={{ minHeight: '130px', lineHeight: '1.5', fontSize: '0.85rem' }}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your custom notes, use cases, or setup tips for this repository..."
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {existingNote ? (
            <button className="btn btn-secondary btn-sm" onClick={handleDelete} style={{ color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
              <Trash2 size={14} /> Delete Note
            </button>
          ) : <div />}

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              <Save size={14} /> Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
