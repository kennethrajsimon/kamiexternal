'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Check, Edit2, FolderOpen, Save, Star, Trash2 } from 'lucide-react';
import { deleteRecommendedArticleSet, getRecommendedArticleSets, saveRecommendedArticleSet, setActiveRecommendedArticleSet } from '../services/api';
import CoverThumbnailFeatureArticleColour from '../imports/CoverThumbnailFeatureArticleColour';
import CoverThumbnailFeatureArticleBw from '../imports/CoverThumbnailFeatureArticleBw';
import CoverThumbnailCreatorSpotlight from '../imports/CoverThumbnailCreatorSpotlight';
import CoverThumbnailAnnouncement1 from '../imports/CoverThumbnailAnnouncement1';

interface ArticleSet {
  id: string;
  name: string;
  articleIds: string[];
  createdAt: string;
  isActive?: boolean;
}

type SavedPage = any;

interface RecommendedArticlesDashboardProps {
  onBackToLanding: () => void;
  savedPages: SavedPage[];
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
    observer.observe(containerRef.current as HTMLDivElement);
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

export default function RecommendedArticlesDashboard({ onBackToLanding, savedPages }: RecommendedArticlesDashboardProps) {
  const [articleSets, setArticleSets] = useState<ArticleSet[]>([]);
  const [currentSetName, setCurrentSetName] = useState('New Article Set');
  const [currentSetId, setCurrentSetId] = useState<string | null>(null);
  const [selectedArticleIds, setSelectedArticleIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hoveredSelected, setHoveredSelected] = useState<string | null>(null);

  const publishedPages = useMemo(
    () => savedPages.filter((page: any) => page.isPublished),
    [savedPages]
  );

  const publishedById = useMemo(() => {
    return new Map(publishedPages.map((page: any) => [page.id, page]));
  }, [publishedPages]);

  const loadArticleSets = useCallback(async () => {
    try {
      const sets = await getRecommendedArticleSets();
      setArticleSets(sets);
      if (!currentSetId) {
        const activeSet = sets.find((set: ArticleSet) => set.isActive);
        if (activeSet) {
          setCurrentSetId(activeSet.id);
          setCurrentSetName(activeSet.name);
          setSelectedArticleIds(activeSet.articleIds || []);
        }
      }
    } catch (error) {
      console.error('Failed to load article sets', error);
    }
  }, [currentSetId]);

  useEffect(() => {
    loadArticleSets();
  }, [loadArticleSets]);

  const handleToggleArticle = (id: string) => {
    setSelectedArticleIds(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
  };

  const handleSaveSet = async () => {
    if (!currentSetName.trim()) return;
    setLoading(true);
    const idToUse = currentSetId || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));
    try {
      await saveRecommendedArticleSet({
        id: idToUse,
        name: currentSetName.trim(),
        articleIds: selectedArticleIds,
        createdAt: new Date().toISOString()
      });
      await loadArticleSets();
      setCurrentSetId(idToUse);
    } catch (error) {
      console.error('Failed to save set', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSet = (set: ArticleSet) => {
    setCurrentSetId(set.id);
    setCurrentSetName(set.name);
    setSelectedArticleIds(set.articleIds || []);
  };

  const handleDeleteSet = async (id: string) => {
    setLoading(true);
    try {
      await deleteRecommendedArticleSet(id);
      await loadArticleSets();
      if (currentSetId === id) {
        setCurrentSetId(null);
        setCurrentSetName('New Article Set');
        setSelectedArticleIds([]);
      }
    } catch (error) {
      console.error('Failed to delete set', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetActive = async (set: ArticleSet) => {
    setLoading(true);
    try {
      await setActiveRecommendedArticleSet(set.id);
      await loadArticleSets();
    } catch (error) {
      console.error('Failed to set active set', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: '#1a1a1a',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="p-[40px]">
          <div className="mb-[40px] flex items-center justify-between">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-[12px] px-[20px] py-[12px] rounded-[8px] transition-all hover:opacity-80"
              style={{
                backgroundColor: '#2a2a2a',
                border: '1px solid #3a3a3a',
                color: '#f1f0eb',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>

            <h1 className="text-[32px] font-bold" style={{ color: '#f1f0eb' }}>
              RECOMMENDED ARTICLES
            </h1>

            <div className="flex items-center gap-[12px]">
              <button
                onClick={handleSaveSet}
                disabled={loading}
                className="flex items-center gap-[12px] px-[20px] py-[12px] rounded-[8px] transition-all hover:opacity-80 disabled:opacity-50"
                style={{
                  backgroundColor: '#11ff49',
                  color: '#1a1a1a',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                <Save size={16} />
                Save Set
              </button>
            </div>
          </div>

          <div className="w-full rounded-[12px] border p-[24px]" style={{ backgroundColor: '#0d0d0d', borderColor: '#2a2a2a' }}>
            <div className="text-[16px] font-semibold mb-[16px]" style={{ color: '#f1f0eb' }}>
              Selected Articles
            </div>
            {selectedArticleIds.length === 0 ? (
              <div className="text-[12px]" style={{ color: '#9e9e9d' }}>
                Select articles from the right panel to build a set.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-[10px]">
                {selectedArticleIds.map(id => {
                  const page = publishedById.get(id);
                  return (
                    <div
                      key={id}
                      onMouseEnter={() => setHoveredSelected(id)}
                      onMouseLeave={() => setHoveredSelected(null)}
                      className="group relative"
                    >
                      <div
                        className="rounded-[8px] overflow-hidden border-2 transition-all"
                        style={{
                          backgroundColor: '#0d0d0d',
                          borderColor: hoveredSelected === id ? '#11ff49' : '#2a2a2a',
                          transform: hoveredSelected === id ? 'translateY(-4px)' : 'translateY(0)'
                        }}
                      >
                        <div
                          className="w-full aspect-[1512/851] relative overflow-hidden"
                          style={{ backgroundColor: '#1a1a1a' }}
                        >
                          {page?.coverData ? (
                            <CoverPreview data={page.coverData} />
                          ) : page?.coverImage ? (
                            <div
                              className="absolute inset-0"
                              style={{
                                backgroundImage: `url(${page.coverImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-[14px] font-semibold" style={{ color: '#3a3a3a' }}>
                                No Preview
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-[10px]">
                          <h3 className="text-[11px] font-bold mb-[4px] truncate" style={{ color: '#f1f0eb' }}>
                            {page?.coverData?.title || page?.name || 'Untitled'}
                          </h3>
                          <div className="text-[10px]" style={{ color: '#9e9e9d' }}>
                            {page?.coverData?.category || 'PUBLISHED'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-[420px] overflow-y-auto border-l" style={{ backgroundColor: '#0d0d0d', borderColor: '#2a2a2a' }}>
        <div className="p-[30px]">
          <div className="mb-[24px]">
            <h2 className="text-[18px] font-bold mb-[8px]" style={{ color: '#f1f0eb' }}>
              Article Sets
            </h2>
            <p className="text-[12px]" style={{ color: '#9e9e9d' }}>
              Build sets from published articles.
            </p>
          </div>

          <div className="mb-[20px]">
            <label className="block text-[11px] font-semibold mb-[6px]" style={{ color: '#f1f0eb' }}>
              Set Name
            </label>
            <input
              type="text"
              value={currentSetName}
              onChange={(e) => setCurrentSetName(e.target.value)}
              className="w-full px-[10px] py-[8px] rounded-[6px] text-[12px] outline-none"
              style={{
                backgroundColor: '#2a2a2a',
                color: '#f1f0eb',
                border: '1px solid #3a3a3a'
              }}
            />
          </div>

          <div className="mb-[24px] flex gap-[10px]">
            <button
              onClick={handleSaveSet}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-[8px] py-[10px] rounded-[8px] transition-all hover:opacity-80 disabled:opacity-50"
              style={{
                backgroundColor: '#11ff49',
                color: '#1a1a1a',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              <Save size={14} />
              Save
            </button>
            <button
              onClick={() => {
                setCurrentSetId(null);
                setCurrentSetName('New Article Set');
                setSelectedArticleIds([]);
              }}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-[8px] py-[10px] rounded-[8px] transition-all hover:opacity-80 disabled:opacity-50"
              style={{
                backgroundColor: '#2a2a2a',
                color: '#f1f0eb',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              <FolderOpen size={14} />
              New
            </button>
          </div>

          <div className="mb-[24px]">
            <div className="text-[12px] font-semibold mb-[10px]" style={{ color: '#f1f0eb' }}>
              Saved Sets
            </div>
            {articleSets.length === 0 ? (
              <div className="text-[11px]" style={{ color: '#9e9e9d' }}>
                No saved sets yet.
              </div>
            ) : (
              <div className="space-y-[10px]">
                {articleSets.map((set) => (
                  <div key={set.id} className="rounded-[8px] border px-[10px] py-[8px]" style={{ borderColor: '#2a2a2a', backgroundColor: '#1a1a1a' }}>
                    <div className="flex items-center justify-between gap-[8px]">
                      <button
                        onClick={() => handleLoadSet(set)}
                        className="flex-1 text-left text-[12px] font-semibold"
                        style={{ color: '#f1f0eb' }}
                      >
                        {set.name}
                      </button>
                      {set.isActive ? (
                        <div className="flex items-center gap-[4px] text-[10px] font-semibold" style={{ color: '#11ff49' }}>
                          <Star size={12} />
                          Active
                        </div>
                      ) : null}
                      <button
                        onClick={() => handleDeleteSet(set.id)}
                        disabled={loading}
                        className="p-[4px] rounded-full transition-all hover:bg-[#2a2a2a] disabled:opacity-50"
                        style={{ color: '#9e9e9d' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="mt-[8px] flex items-center gap-[8px]">
                      <button
                        onClick={() => handleSetActive(set)}
                        disabled={loading || set.isActive}
                        className="flex items-center gap-[6px] px-[10px] py-[6px] rounded-[6px] text-[10px] font-semibold transition-all hover:opacity-80 disabled:opacity-50"
                        style={{
                          backgroundColor: set.isActive ? '#2a2a2a' : '#11ff49',
                          color: set.isActive ? '#9e9e9d' : '#1a1a1a'
                        }}
                      >
                        {set.isActive ? <Check size={12} /> : <Star size={12} />}
                        {set.isActive ? 'Active' : 'Set Active'}
                      </button>
                      <button
                        onClick={() => handleLoadSet(set)}
                        disabled={loading}
                        className="flex items-center gap-[6px] px-[10px] py-[6px] rounded-[6px] text-[10px] font-semibold transition-all hover:opacity-80 disabled:opacity-50"
                        style={{
                          backgroundColor: '#2a2a2a',
                          color: '#f1f0eb'
                        }}
                      >
                        <Edit2 size={12} />
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="text-[12px] font-semibold mb-[10px]" style={{ color: '#f1f0eb' }}>
              Published Articles
            </div>
            <div className="space-y-[10px]">
              {publishedPages.map((page: any) => {
                const isSelected = selectedArticleIds.includes(page.id);
                return (
                  <button
                    key={page.id}
                    onClick={() => handleToggleArticle(page.id)}
                    className="w-full flex items-center justify-between gap-[10px] rounded-[8px] border px-[10px] py-[8px] transition-all"
                    style={{
                      borderColor: isSelected ? '#11ff49' : '#2a2a2a',
                      backgroundColor: isSelected ? 'rgba(17, 255, 73, 0.08)' : '#1a1a1a',
                      color: '#f1f0eb'
                    }}
                  >
                    <div className="text-left">
                      <div className="text-[12px] font-semibold">
                        {page.coverData?.title || page.name || 'Untitled'}
                      </div>
                      <div className="text-[10px]" style={{ color: '#9e9e9d' }}>
                        {page.coverData?.category || 'PUBLISHED'}
                      </div>
                    </div>
                    <div className="text-[11px]" style={{ color: isSelected ? '#11ff49' : '#9e9e9d' }}>
                      {isSelected ? 'Added' : 'Add'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
