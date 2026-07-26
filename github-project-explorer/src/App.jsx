import React, { useState } from 'react';
import { ExplorerProvider, useExplorer } from './context/ExplorerContext';
import { Navbar } from './components/Navbar';
import { UserProfileCard } from './components/UserProfileCard';
import { LanguageChart } from './components/LanguageChart';
import { RepoGrid } from './components/RepoGrid';
import { TrendingSection } from './components/TrendingSection';
import { BookmarksView } from './components/BookmarksView';
import { ProfileComparisonModal } from './components/ProfileComparisonModal';
import { RepoNoteModal } from './components/RepoNoteModal';
import { ApiKeyModal } from './components/ApiKeyModal';

export function AppContent() {
  const { activeTab, searchMode } = useExplorer();

  const [showPatModal, setShowPatModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [activeNoteRepo, setActiveNoteRepo] = useState(null);

  return (
    <div className="app-layout">
      {/* Navbar Header */}
      <Navbar
        onOpenPatModal={() => setShowPatModal(true)}
        onOpenCompareModal={() => setShowCompareModal(true)}
      />

      {/* Main Container */}
      <main className="main-container">
        {activeTab === 'explorer' && (
          <div>
            {searchMode === 'user' && <UserProfileCard />}
            <LanguageChart />
            <RepoGrid onOpenNoteModal={(repo) => setActiveNoteRepo(repo)} />
          </div>
        )}

        {activeTab === 'trending' && (
          <TrendingSection onOpenNoteModal={(repo) => setActiveNoteRepo(repo)} />
        )}

        {activeTab === 'bookmarks' && (
          <BookmarksView onOpenNoteModal={(repo) => setActiveNoteRepo(repo)} />
        )}
      </main>

      {/* Modals */}
      {showPatModal && <ApiKeyModal onClose={() => setShowPatModal(false)} />}
      {showCompareModal && <ProfileComparisonModal onClose={() => setShowCompareModal(false)} />}
      {activeNoteRepo && <RepoNoteModal repo={activeNoteRepo} onClose={() => setActiveNoteRepo(null)} />}
    </div>
  );
}

export default function App() {
  return (
    <ExplorerProvider>
      <AppContent />
    </ExplorerProvider>
  );
}
