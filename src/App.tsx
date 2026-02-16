import { useState, useEffect, useRef } from 'react';
import { getDrafts, deleteDraft, saveDraft } from './services/api';
import LandingPage from './LandingPage';
import ContentDashboardV4 from './ContentDashboardV4';
import FeaturedProductsDashboard from './components/FeaturedProductsDashboard';
import RecommendedArticlesDashboard from './components/RecommendedArticlesDashboard';
import DraftLibrary from './components/DraftLibrary';
import GlitchDemo from './components/GlitchDemo';
import FeedPage from './feedexternal/Feed';

interface SavedPage {
  id: string;
  name: string;
  content: any;
  pages?: any[];
  styles: any;
  sectionVisibility: any;
  selectedStyle: string;
  isPublished: boolean;
  savedAt: Date;
  coverImage?: string;
  coverData?: {
    id: string;
    category: string;
    title: string;
    backgroundText: string;
    backgroundColor: string;
    backgroundTextColor: string;
    backgroundImage: string | null;
    backgroundImageFit: 'cover' | 'contain';
    imageFit: 'cover' | 'contain';
    imageFit2?: 'cover' | 'contain';
    heroImage: string | null;
    heroImage2: string | null;
    showHeroImage: boolean;
    showBackgroundText: boolean;
    showBackgroundColor: boolean;
    backgroundTextStyle: 'fill' | 'stroke';
    selectedStyle: number;
  };
  hasFeaturedProducts?: boolean;
  hasRecommendedReading?: boolean;
  likes?: number;
  shares?: number;
  efxMode?: 'none' | 'glitch' | 'blur' | 'chromatic' | 'shake' | 'distort';
}



export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'featuredProducts' | 'recommendedArticles' | 'draftLibrary' | 'publishedLibrary' | 'glitchDemo' | 'feed'>('landing');
  const [savedPages, setSavedPages] = useState<SavedPage[]>([]);
  const [loadedPageId, setLoadedPageId] = useState<string | null>(null);

  // Load saved pages from backend on mount
  useEffect(() => {
    const loadPages = async () => {
      try {
        const pages = await getDrafts();
        setSavedPages(pages);
      } catch (error) {
        console.error('Error loading saved pages:', error);
      }
    };
    loadPages();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const syncFromPath = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash;
      if (path.startsWith('/feed') || hash.startsWith('#article-')) {
        setCurrentView('feed');
      } else if (path === '/' || path === '') {
        setCurrentView('landing');
      }
    };
    syncFromPath();
    window.addEventListener('popstate', syncFromPath);
    return () => window.removeEventListener('popstate', syncFromPath);
  }, []);

  // Capture the original hash from the initial page load so it survives
  // the URL sync effect's pushState calls.
  const initialHashRef = useRef(typeof window !== 'undefined' ? window.location.hash : '');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname.toLowerCase();
    // Use the live hash if available, otherwise fall back to the initial hash
    const hash = window.location.hash || initialHashRef.current || '';
    if (currentView === 'feed' && !path.startsWith('/feed')) {
      window.history.pushState({}, '', '/feed' + hash);
      // Clear the initial hash ref after it's been used
      initialHashRef.current = '';
    }
    if (currentView !== 'feed' && path.startsWith('/feed')) {
      // Don't push '/' if the syncFromPath effect hasn't had a chance to
      // detect the /feed path yet — that would strip the hash.
      // syncFromPath runs in the same render cycle and will set currentView
      // to 'feed', so skipping here avoids the race.
    }
  }, [currentView]);

  const handleCreateNew = () => {
    setLoadedPageId(null);
    setCurrentView('dashboard');
  };

  const handleLoadDraft = (pageId: string) => {
    setLoadedPageId(pageId);
    setCurrentView('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setLoadedPageId(null);
  };

  const handleDeleteDraft = async (pageId: string) => {
    try {
      await deleteDraft(pageId);
      setSavedPages(prev => prev.filter(p => p.id !== pageId));
    } catch (error) {
      console.error('Failed to delete draft:', error);
      alert('Failed to delete draft');
    }
  };

  const handlePublishDraft = async (page: SavedPage) => {
    try {
      const updated = { ...page, isPublished: true };
      await saveDraft(updated);
      try {
        const drafts = await getDrafts();
        if (Array.isArray(drafts)) {
          setSavedPages(drafts);
        } else {
          setSavedPages(prev => prev.map(p => (p.id === page.id ? updated : p)));
        }
      } catch {
        setSavedPages(prev => prev.map(p => (p.id === page.id ? updated : p)));
      }
      setCurrentView('publishedLibrary');
    } catch (error) {
      console.error('Failed to publish draft:', error);
      alert('Failed to publish draft');
    }
  };

  const handleUnpublishDraft = async (page: SavedPage) => {
    try {
      const updated = { ...page, isPublished: false };
      await saveDraft(updated);
      try {
        const drafts = await getDrafts();
        if (Array.isArray(drafts)) {
          setSavedPages(drafts);
        } else {
          setSavedPages(prev => prev.map(p => (p.id === page.id ? updated : p)));
        }
      } catch {
        setSavedPages(prev => prev.map(p => (p.id === page.id ? updated : p)));
      }
      setCurrentView('draftLibrary');
    } catch (error) {
      console.error('Failed to unpublish draft:', error);
      alert('Failed to unpublish draft');
    }
  };

  const handleUpdateSavedPages = (pages: SavedPage[]) => {
    setSavedPages(pages);
  };

  const handleOpenFeaturedProducts = () => {
    setCurrentView('featuredProducts');
  };

  const handleOpenRecommendedArticles = () => {
    setCurrentView('recommendedArticles');
  };

  const handleOpenDraftLibrary = () => {
    setCurrentView('draftLibrary');
  };

  const handleOpenPublishedLibrary = () => {
    setCurrentView('publishedLibrary');
  };

  const handleOpenGlitchDemo = () => {
    setCurrentView('glitchDemo');
  };

  if (currentView === 'landing') {
    return (
      <LandingPage
        onCreateNew={handleCreateNew}
        onLoadDraft={handleLoadDraft}
        savedPages={savedPages}
        onDeleteDraft={handleDeleteDraft}
        onOpenFeaturedProducts={handleOpenFeaturedProducts}
        onOpenRecommendedArticles={handleOpenRecommendedArticles}
        onOpenDraftLibrary={handleOpenDraftLibrary}
        onOpenGlitchDemo={handleOpenGlitchDemo}
      />
    );
  }

  if (currentView === 'dashboard') {
    return (
      <ContentDashboardV4
        onBackToLanding={handleBackToLanding}
        loadedPageId={loadedPageId}
        savedPages={savedPages}
        onUpdateSavedPages={handleUpdateSavedPages}
      />
    );
  }

  if (currentView === 'featuredProducts') {
    return (
      <FeaturedProductsDashboard
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  if (currentView === 'recommendedArticles') {
    return (
      <RecommendedArticlesDashboard
        onBackToLanding={handleBackToLanding}
        savedPages={savedPages}
      />
    );
  }

  if (currentView === 'draftLibrary') {
    return (
      <DraftLibrary
        onBackToLanding={handleBackToLanding}
        savedPages={savedPages}
        onLoadDraft={handleLoadDraft}
        onDeleteDraft={handleDeleteDraft}
        onOpenFeaturedProducts={handleOpenFeaturedProducts}
        onOpenRecommendedArticles={handleOpenRecommendedArticles}
        onCreateNew={handleCreateNew}
        onPublishDraft={handlePublishDraft}
        libraryType="draft"
        onOpenPublishedLibrary={handleOpenPublishedLibrary}
      />
    );
  }

  if (currentView === 'publishedLibrary') {
    return (
      <DraftLibrary
        onBackToLanding={handleBackToLanding}
        savedPages={savedPages}
        onLoadDraft={handleLoadDraft}
        onDeleteDraft={handleDeleteDraft}
        onOpenFeaturedProducts={handleOpenFeaturedProducts}
        onOpenRecommendedArticles={handleOpenRecommendedArticles}
        onCreateNew={handleCreateNew}
        libraryType="published"
        onOpenPublishedLibrary={handleOpenPublishedLibrary}
        onUnpublishDraft={handleUnpublishDraft}
        onOpenDraftLibrary={handleOpenDraftLibrary}
      />
    );
  }

  if (currentView === 'glitchDemo') {
    return (
      <GlitchDemo
        onBack={handleOpenDraftLibrary}
      />
    );
  }

  if (currentView === 'feed') {
    return (
      <FeedPage
        savedPages={savedPages}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  return null;
}
