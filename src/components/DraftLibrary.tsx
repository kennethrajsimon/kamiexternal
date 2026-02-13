'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Trash2, Plus, FolderOpen, Search, Calendar, ShoppingCart, BookOpen, Edit2, Settings } from 'lucide-react';
import CoverThumbnailFeatureArticleColour from '../imports/CoverThumbnailFeatureArticleColour';
import CoverThumbnailFeatureArticleBw from '../imports/CoverThumbnailFeatureArticleBw';
import CoverThumbnailCreatorSpotlight from '../imports/CoverThumbnailCreatorSpotlight';
import CoverThumbnailAnnouncement1 from '../imports/CoverThumbnailAnnouncement1';
import { useIsMobileOrTablet } from '../hooks/useMediaQuery';

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
  efxMode?: 'none' | 'glitch' | 'blur' | 'chromatic' | 'shake' | 'distort';
}

function CoverPreview({ data }: { data: NonNullable<SavedPage['coverData']> }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.28);
  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const s = Math.min(w / 1512, h / 851);
      setScale(s);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [data.selectedStyle]);
  return (
    <div ref={containerRef} className="absolute inset-0">
      <div style={{ width: '1512px', height: '851px', transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {data.selectedStyle === 2 ? (
          <CoverThumbnailFeatureArticleBw
            category={data.category}
            title={data.title}
            coverImage={data.heroImage}
            imageFit={data.imageFit}
            backgroundColor={data.backgroundColor}
            backgroundImage={data.backgroundImage}
            backgroundImageFit={data.backgroundImageFit}
            backgroundText={data.backgroundText}
            backgroundTextColor={data.backgroundTextColor}
            backgroundTextStyle={data.backgroundTextStyle}
            iconCount1={''}
            iconCount2={''}
            showHeroImage={data.showHeroImage}
            showBackgroundText={data.showBackgroundText}
            showBackgroundColor={data.showBackgroundColor}
          />
        ) : data.selectedStyle === 3 ? (
          <CoverThumbnailCreatorSpotlight
            category={data.category}
            title={data.title}
            coverImage={data.heroImage}
            imageFit={data.imageFit}
            backgroundColor={data.backgroundColor}
            backgroundImage={data.backgroundImage}
            backgroundImageFit={data.backgroundImageFit}
            iconCount1={''}
            iconCount2={''}
            showHeroImage={data.showHeroImage}
            showBackgroundColor={data.showBackgroundColor}
          />
        ) : data.selectedStyle === 4 ? (
          <CoverThumbnailAnnouncement1
            category={data.category}
            title={data.title}
            coverImage1={data.heroImage}
            imageFit1={data.imageFit}
            coverImage2={data.heroImage2}
            imageFit2={data.imageFit2 || 'cover'}
            backgroundColor={data.backgroundColor}
            backgroundImage={data.backgroundImage}
            backgroundImageFit={data.backgroundImageFit}
            iconCount1={''}
            iconCount2={''}
            showHeroImage={data.showHeroImage}
            showBackgroundColor={data.showBackgroundColor}
          />
        ) : (
          <CoverThumbnailFeatureArticleColour
            category={data.category}
            title={data.title}
            coverImage={data.heroImage}
            imageFit={data.imageFit}
            backgroundColor={data.backgroundColor}
            backgroundImage={data.backgroundImage}
            backgroundImageFit={data.backgroundImageFit}
            backgroundText={data.backgroundText}
            backgroundTextColor={data.backgroundTextColor}
            backgroundTextStyle={data.backgroundTextStyle}
            iconCount1={''}
            iconCount2={''}
            showHeroImage={data.showHeroImage}
            showBackgroundText={data.showBackgroundText}
            showBackgroundColor={data.showBackgroundColor}
          />
        )}
      </div>
    </div>
  );
}

interface DraftLibraryProps {
  savedPages: SavedPage[];
  onBackToLanding: () => void;
  onLoadDraft: (pageId: string) => void;
  onDeleteDraft: (pageId: string) => void;
  onOpenFeaturedProducts: () => void;
  onOpenRecommendedArticles: () => void;
  onCreateNew: () => void;
  libraryType?: 'draft' | 'published';
  onPublishDraft?: (page: SavedPage) => Promise<void> | void;
  onOpenPublishedLibrary?: () => void;
  onUnpublishDraft?: (page: SavedPage) => Promise<void> | void;
  onOpenDraftLibrary?: () => void;
}

export default function DraftLibrary({
  savedPages,
  onBackToLanding,
  onLoadDraft,
  onDeleteDraft,
  onOpenFeaturedProducts,
  onOpenRecommendedArticles,
  onCreateNew,
  libraryType = 'draft',
  onPublishDraft,
  onOpenPublishedLibrary,
  onUnpublishDraft,
  onOpenDraftLibrary
}: DraftLibraryProps) {
  const isMobileOrTablet = useIsMobileOrTablet();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredDraft, setHoveredDraft] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showModuleMenu, setShowModuleMenu] = useState<string | null>(null);

  const isDraftLibrary = libraryType !== 'published';
  const allArticles = savedPages.filter(page =>
    isDraftLibrary ? !page.isPublished : page.isPublished
  );

  // Filter drafts based on search
  const filteredDrafts = allArticles.filter(page =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort by most recent
  const sortedDrafts = [...filteredDrafts].sort((a, b) => 
    new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
  );

  const formatDate = (date: Date) => {
    const now = new Date();
    const savedDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - savedDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return savedDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: savedDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: '#1a1a1a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Header */}
      <div 
        className="border-b"
        style={{
          backgroundColor: '#0d0d0d',
          borderColor: '#2a2a2a'
        }}
      >
        <div
          style={{
            padding: isMobileOrTablet ? '20px' : '30px 60px'
          }}
        >
          <div
            className="flex mb-[24px]"
            style={{
              flexDirection: isMobileOrTablet ? 'column' : 'row',
              alignItems: isMobileOrTablet ? 'stretch' : 'center',
              justifyContent: isMobileOrTablet ? 'flex-start' : 'space-between',
              gap: isMobileOrTablet ? '16px' : undefined
            }}
          >
            <button
              onClick={onBackToLanding}
              className="flex items-center justify-center gap-[12px] px-[20px] py-[12px] rounded-[8px] transition-all hover:opacity-80"
              style={{
                backgroundColor: '#2a2a2a',
                border: '1px solid #3a3a3a',
                color: '#f1f0eb',
                fontSize: '14px',
                fontWeight: '600',
                width: isMobileOrTablet ? '100%' : 'auto'
              }}
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>

            <div
              className="flex items-center gap-[12px]"
              style={{
                width: isMobileOrTablet ? '100%' : 'auto'
              }}
            >
              <button
                onClick={onCreateNew}
                className="flex items-center justify-center gap-[10px] px-[24px] py-[12px] rounded-[8px] transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#11ff49',
                  color: '#1a1a1a',
                  fontSize: '14px',
                  fontWeight: '600',
                  width: isMobileOrTablet ? '100%' : 'auto'
                }}
              >
                <Plus size={16} strokeWidth={3} />
                New Article
              </button>
              {isDraftLibrary && onOpenPublishedLibrary && (
                <button
                  onClick={onOpenPublishedLibrary}
                  className="flex items-center justify-center gap-[10px] px-[24px] py-[12px] rounded-[8px] transition-all hover:opacity-90"
                  style={{
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #3a3a3a',
                    color: '#f1f0eb',
                    fontSize: '14px',
                    fontWeight: '600',
                    width: isMobileOrTablet ? '100%' : 'auto'
                  }}
                >
                  Published Library
                </button>
              )}
              {!isDraftLibrary && onOpenDraftLibrary && (
                <button
                  onClick={onOpenDraftLibrary}
                  className="flex items-center justify-center gap-[10px] px-[24px] py-[12px] rounded-[8px] transition-all hover:opacity-90"
                  style={{
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #3a3a3a',
                    color: '#f1f0eb',
                    fontSize: '14px',
                    fontWeight: '600',
                    width: isMobileOrTablet ? '100%' : 'auto'
                  }}
                >
                  Draft Library
                </button>
              )}
            </div>
          </div>

          <div
            className="flex"
            style={{
              flexDirection: isMobileOrTablet ? 'column' : 'row',
              alignItems: isMobileOrTablet ? 'stretch' : 'center',
              justifyContent: isMobileOrTablet ? 'flex-start' : 'space-between',
              gap: isMobileOrTablet ? '16px' : undefined
            }}
          >
            <div>
              <h1 
                className="font-bold mb-[8px]"
                style={{ color: '#f1f0eb', letterSpacing: '-0.02em', fontSize: isMobileOrTablet ? '28px' : '36px' }}
              >
                {isDraftLibrary ? 'Draft Library' : 'Published Library'}
              </h1>
              <p
                className="text-[15px]"
                style={{ color: '#9e9e9d' }}
              >
                {sortedDrafts.length}{' '}
                {isDraftLibrary
                  ? sortedDrafts.length === 1
                    ? 'draft'
                    : 'drafts'
                  : sortedDrafts.length === 1
                    ? 'published article'
                    : 'published articles'}{' '}
                saved
              </p>
            </div>

            {/* Search */}
            <div
              className="relative"
              style={{
                width: isMobileOrTablet ? '100%' : 'auto'
              }}
            >
              <Search 
                size={18} 
                className="absolute left-[16px] top-1/2 transform -translate-y-1/2"
                style={{ color: '#9e9e9d' }}
              />
              <input
                type="text"
                placeholder={isDraftLibrary ? 'Search drafts...' : 'Search published...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-[48px] pr-[20px] py-[12px] rounded-[8px] border"
                style={{
                  backgroundColor: '#2a2a2a',
                  borderColor: '#3a3a3a',
                  color: '#f1f0eb',
                  fontSize: '14px',
                  outline: 'none',
                  width: isMobileOrTablet ? '100%' : '320px'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          padding: isMobileOrTablet ? '28px 20px' : '40px 60px'
        }}
      >
        {/* Drafts Grid */}
        <div className="mb-[20px]">
          <h2 
            className="text-[18px] font-bold mb-[20px]"
            style={{ color: '#f1f0eb' }}
          >
            {isDraftLibrary ? 'Your Drafts' : 'Published Articles'}
          </h2>
        </div>

        {sortedDrafts.length === 0 ? (
          <div 
            className="flex flex-col items-center justify-center rounded-[12px] border-2 border-dashed text-center"
            style={{
              borderColor: '#3a3a3a',
              backgroundColor: '#0d0d0d',
              padding: isMobileOrTablet ? '60px 16px' : '100px 0'
            }}
          >
            <FolderOpen 
              size={64} 
              strokeWidth={1.5}
              style={{ color: '#3a3a3a', marginBottom: '24px' }}
            />
            <h3 
              className="text-[20px] font-bold mb-[8px]"
              style={{ color: '#9e9e9d' }}
            >
              {isDraftLibrary
                ? searchQuery
                  ? 'No drafts found'
                  : 'No drafts yet'
                : searchQuery
                  ? 'No published articles found'
                  : 'No published articles yet'}
            </h3>
            <p
              className="text-[14px] mb-[24px]"
              style={{ color: '#6e6e6d' }}
            >
              {searchQuery
                ? 'Try a different search term'
                : isDraftLibrary
                  ? 'Create your first article to get started'
                  : 'Publish a draft to see it here'}
            </p>
            {!searchQuery && isDraftLibrary && (
              <button
                onClick={onCreateNew}
                className="flex items-center gap-[10px] px-[24px] py-[12px] rounded-[8px] transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#11ff49',
                  color: '#1a1a1a',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                <Plus size={16} strokeWidth={3} />
                Create Article
              </button>
            )}
          </div>
        ) : (
          <div
            className="grid"
            style={{
              gridTemplateColumns: isMobileOrTablet ? 'repeat(1, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))',
              gap: isMobileOrTablet ? '16px' : '24px'
            }}
          >
            {sortedDrafts.map((page) => (
              <div
                key={page.id}
                onMouseEnter={() => setHoveredDraft(page.id)}
                onMouseLeave={() => setHoveredDraft(null)}
                className="group relative"
              >
                {/* Draft Card */}
                <div
                  className="rounded-[12px] overflow-hidden border-2 transition-all cursor-pointer"
                  style={{
                    backgroundColor: '#0d0d0d',
                    borderColor: hoveredDraft === page.id ? '#11ff49' : '#2a2a2a',
                    transform: hoveredDraft === page.id ? 'translateY(-4px)' : 'translateY(0)'
                  }}
                  onClick={() => onLoadDraft(page.id)}
                >
                  {/* Cover Thumbnail */}
                  <div 
                    className="w-full aspect-[1512/851] relative overflow-hidden"
                    style={{ backgroundColor: '#1a1a1a' }}
                  >
                    {page.coverData ? (
                      <CoverPreview data={page.coverData} />
                    ) : page.coverImage ? (
                      <img 
                        src={page.coverImage} 
                        alt={page.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div 
                          className="text-[14px] font-semibold"
                          style={{ color: '#3a3a3a' }}
                        >
                          No Preview
                        </div>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    {hoveredDraft === page.id && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(17, 255, 73, 0.9)' }}
                      >
                        <span 
                          className="text-[14px] font-bold"
                          style={{ color: '#1a1a1a' }}
                        >
                          OPEN DRAFT
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Draft Info */}
                  <div className="p-[16px]">
                    <h3 
                      className="text-[15px] font-bold mb-[8px] truncate"
                      style={{ color: '#f1f0eb' }}
                    >
                      {page.coverData?.title || page.name}
                    </h3>
                    
                    <div className="flex items-center gap-[8px] mb-[12px]">
                      <Calendar size={12} style={{ color: '#9e9e9d' }} />
                      <span 
                        className="text-[12px]"
                        style={{ color: '#9e9e9d' }}
                      >
                        {formatDate(page.savedAt)}
                      </span>
                    </div>

                    {/* Module Indicators */}
                    <div className="flex items-center gap-[8px] flex-wrap">
                      {page.hasFeaturedProducts && (
                        <div 
                          className="flex items-center gap-[4px] px-[8px] py-[4px] rounded-[4px]"
                          style={{ backgroundColor: '#2a2a2a' }}
                        >
                          <ShoppingCart size={10} style={{ color: '#a79755' }} />
                          <span 
                            className="text-[10px] font-semibold"
                            style={{ color: '#a79755' }}
                          >
                            Products
                          </span>
                        </div>
                      )}
                      {page.hasRecommendedReading && (
                        <div 
                          className="flex items-center gap-[4px] px-[8px] py-[4px] rounded-[4px]"
                          style={{ backgroundColor: '#2a2a2a' }}
                        >
                          <BookOpen size={10} style={{ color: '#4a90e2' }} />
                          <span 
                            className="text-[10px] font-semibold"
                            style={{ color: '#4a90e2' }}
                          >
                            Articles
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                {isDraftLibrary && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(page.id);
                    }}
                    className="absolute top-[12px] right-[12px] p-[8px] rounded-[6px] transition-all opacity-0 group-hover:opacity-100 z-10"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      opacity: isMobileOrTablet ? 1 : undefined
                    }}
                  >
                    <Trash2 
                      size={16} 
                      style={{ color: '#ff4949' }}
                    />
                  </button>
                )}

                {/* Module Settings Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModuleMenu(showModuleMenu === page.id ? null : page.id);
                  }}
                  className="absolute top-[12px] left-[12px] p-[8px] rounded-[6px] transition-all opacity-0 group-hover:opacity-100 z-10"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    opacity: isMobileOrTablet ? 1 : undefined
                  }}
                >
                  <Settings 
                    size={16} 
                    style={{ color: '#11ff49' }}
                  />
                </button>

                {/* Module Menu */}
                {showModuleMenu === page.id && (
                  <div 
                    className="absolute top-[52px] left-[12px] rounded-[8px] z-20"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.95)',
                      border: '1px solid #3a3a3a',
                      minWidth: '220px'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-[12px]">
                      <div 
                        className="text-[11px] font-bold mb-[12px] px-[8px]"
                        style={{ color: '#9e9e9d', letterSpacing: '0.05em' }}
                      >
                        ARTICLE MODULES
                      </div>
                      {isDraftLibrary && onPublishDraft && (
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            await onPublishDraft(page);
                            setShowModuleMenu(null);
                          }}
                          className="w-full flex items-center justify-center gap-[8px] px-[12px] py-[10px] rounded-[6px] transition-all mb-[6px]"
                          style={{
                            backgroundColor: '#11ff49',
                            border: '1px solid #11ff49',
                            color: '#1a1a1a'
                          }}
                        >
                          <Plus size={14} strokeWidth={3} />
                          <span className="text-[13px] font-semibold">Publish</span>
                        </button>
                      )}
                      {!isDraftLibrary && onUnpublishDraft && (
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            await onUnpublishDraft(page);
                            setShowModuleMenu(null);
                          }}
                          className="w-full flex items-center justify-center gap-[8px] px-[12px] py-[10px] rounded-[6px] transition-all mb-[6px]"
                          style={{
                            backgroundColor: 'transparent',
                            border: '1px solid #ff4949',
                            color: '#ff4949'
                          }}
                        >
                          <span className="text-[13px] font-semibold">Unpublish</span>
                        </button>
                      )}
                      
                      {/* Featured Products */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenFeaturedProducts();
                          setShowModuleMenu(null);
                        }}
                        className="w-full flex items-center justify-between px-[12px] py-[10px] rounded-[6px] transition-all mb-[6px]"
                        style={{
                          backgroundColor: page.hasFeaturedProducts ? '#2a2a2a' : 'transparent',
                          border: page.hasFeaturedProducts ? '1px solid #a79755' : '1px solid #3a3a3a'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#2a2a2a';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = page.hasFeaturedProducts ? '#2a2a2a' : 'transparent';
                        }}
                      >
                        <div className="flex items-center gap-[8px]">
                          <ShoppingCart 
                            size={14} 
                            style={{ color: page.hasFeaturedProducts ? '#a79755' : '#9e9e9d' }}
                          />
                          <span 
                            className="text-[13px] font-semibold"
                            style={{ color: page.hasFeaturedProducts ? '#a79755' : '#f1f0eb' }}
                          >
                            Featured Products
                          </span>
                        </div>
                        {page.hasFeaturedProducts ? (
                          <Edit2 size={12} style={{ color: '#a79755' }} />
                        ) : (
                          <Plus size={12} style={{ color: '#9e9e9d' }} />
                        )}
                      </button>

                      {/* Recommended Reading */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenRecommendedArticles();
                          setShowModuleMenu(null);
                        }}
                        className="w-full flex items-center justify-between px-[12px] py-[10px] rounded-[6px] transition-all"
                        style={{
                          backgroundColor: page.hasRecommendedReading ? '#2a2a2a' : 'transparent',
                          border: page.hasRecommendedReading ? '1px solid #4a90e2' : '1px solid #3a3a3a'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#2a2a2a';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = page.hasRecommendedReading ? '#2a2a2a' : 'transparent';
                        }}
                      >
                        <div className="flex items-center gap-[8px]">
                          <BookOpen 
                            size={14} 
                            style={{ color: page.hasRecommendedReading ? '#4a90e2' : '#9e9e9d' }}
                          />
                          <span 
                            className="text-[13px] font-semibold"
                            style={{ color: page.hasRecommendedReading ? '#4a90e2' : '#f1f0eb' }}
                          >
                            Recommended Reading
                          </span>
                        </div>
                        {page.hasRecommendedReading ? (
                          <Edit2 size={12} style={{ color: '#4a90e2' }} />
                        ) : (
                          <Plus size={12} style={{ color: '#9e9e9d' }} />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Delete Confirmation */}
                {showDeleteConfirm === page.id && (
                  <div 
                    className="absolute top-[12px] right-[12px] p-[8px] rounded-[6px] transition-all opacity-100 z-10"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="flex items-center gap-[8px]">
                      <Trash2 
                        size={16} 
                        style={{ color: '#ff4949' }}
                      />
                      <span 
                        className="text-[14px] font-bold"
                        style={{ color: '#ff4949' }}
                      >
                        Delete
                      </span>
                    </div>
                    <div className="flex items-center gap-[8px] mt-[4px]">
                      <button
                        onClick={() => {
                          onDeleteDraft(page.id);
                          setShowDeleteConfirm(null);
                        }}
                        className="p-[4px] rounded-[4px] transition-all"
                        style={{
                          backgroundColor: '#ff4949',
                          color: '#1a1a1a',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="p-[4px] rounded-[4px] transition-all"
                        style={{
                          backgroundColor: '#1a1a1a',
                          color: '#ff4949',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
