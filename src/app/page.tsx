'use client';

import { useState, useEffect } from 'react';
import LandingPage from '../components/LandingPage';
import ContentDashboardV4 from '../ContentDashboardV4';
import FeaturedProductsDashboard from '../components/FeaturedProductsDashboard';
import RecommendedArticlesDashboard from '../components/RecommendedArticlesDashboard';
import DraftLibrary from '../components/DraftLibrary';
import GlitchDemo from '../components/GlitchDemo';
import { getDrafts, saveDraft } from '../services/api';

interface SavedPage {
  id: string;
  name: string;
  content: any;
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
    heroImage: string | null;
    heroImage2: string | null;
    showHeroImage: boolean;
    showBackgroundText: boolean;
    showBackgroundColor: boolean;
    backgroundTextStyle: 'fill' | 'stroke';
    selectedStyle: number;
  };
}

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'featuredProducts' | 'recommendedArticles' | 'draftLibrary' | 'publishedLibrary' | 'glitchDemo'>('landing');
  const [savedPages, setSavedPages] = useState<SavedPage[]>([]);
  const [loadedPageId, setLoadedPageId] = useState<string | null>(null);

  // Load summaries from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kami_saved_pages');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedPages(prev => {
            const merged = [...prev];
            parsed.forEach((s: any) => {
              if (!merged.some(p => p.id === s.id)) {
                merged.push({
                  id: s.id,
                  name: s.name,
                  content: {},
                  styles: {},
                  sectionVisibility: {},
                  selectedStyle: s.selectedStyle,
                  isPublished: !!s.isPublished,
                  savedAt: s.savedAt
                });
              }
            });
            return merged;
          });
        }
      }
    } catch {}
  }, []);

  // Save lightweight summaries to localStorage with guard
  useEffect(() => {
    try {
      if (savedPages.length > 0) {
        const summaries = savedPages.map(p => ({
          id: p.id,
          name: p.name,
          savedAt: p.savedAt,
          isPublished: p.isPublished,
          selectedStyle:
            typeof p.selectedStyle === 'string'
              ? p.selectedStyle
              : typeof p.content?.selectedStyle === 'number'
                ? `style${p.content.selectedStyle}`
                : typeof p.selectedStyle === 'number'
                  ? `style${p.selectedStyle}`
                  : 'style1'
        }));
        const data = JSON.stringify(summaries);
        localStorage.setItem('kami_saved_pages', data);
      } else {
        localStorage.removeItem('kami_saved_pages');
      }
    } catch {
      try {
        localStorage.removeItem('kami_saved_pages');
      } catch {}
    }
  }, [savedPages]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (currentView !== 'draftLibrary' && currentView !== 'publishedLibrary' && currentView !== 'landing') return;
      try {
        const drafts = await getDrafts();
        if (!cancelled && Array.isArray(drafts)) {
          setSavedPages(drafts);
        }
      } catch (err) {
        // keep local summaries if API fails
      }
    };
    load();
    return () => {
      cancelled = true;
    };
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

  const handleDeleteDraft = (pageId: string) => {
    setSavedPages(prev => prev.filter(p => p.id !== pageId));
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
        loadedPageId={loadedPageId}
        onBackToLanding={handleBackToLanding}
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

  return null;
}
