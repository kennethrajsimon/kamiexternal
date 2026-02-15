import { useState, useEffect } from 'react';
import { FileText, Plus, FolderOpen, Trash2, Calendar, Eye } from 'lucide-react';
import { useIsMobileOrTablet } from './hooks/useMediaQuery';

interface SavedPage {
  id: string;
  name: string;
  content: any;
  styles: any;
  sectionVisibility: any;
  selectedStyle: string;
  isPublished: boolean;
  savedAt: Date;
}

interface LandingPageProps {
  onCreateNew: () => void;
  onLoadDraft: (pageId: string) => void;
  savedPages: SavedPage[];
  onDeleteDraft: (pageId: string) => void;
  onOpenFeaturedProducts?: () => void;
  onOpenRecommendedArticles?: () => void;
  onOpenDraftLibrary?: () => void;
  onOpenGlitchDemo?: () => void;
}

export default function LandingPage({ onCreateNew, onLoadDraft, savedPages, onDeleteDraft, onOpenFeaturedProducts, onOpenRecommendedArticles, onOpenDraftLibrary, onOpenGlitchDemo }: LandingPageProps) {
  const isMobileOrTablet = useIsMobileOrTablet();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredDraft, setHoveredDraft] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const templates = [
    'Article Cover Thumbnail Style 1',
    'Article Cover Thumbnail Style 2',
    'Creator Feature Cover Thumbnail Style 1',
    'Creator Feature Cover Thumbnail Style 2',
    'Announcement Cover Thumbnail Style 1',
    'Announcement Cover Thumbnail Style 2'
  ];

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    setShowTemplateDropdown(false);
    if (onCreateNew) {
      onCreateNew();
    }
  };

  const drafts = savedPages.filter(p => !p.isPublished);
  const published = savedPages.filter(p => p.isPublished);

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteDraft = (e: React.MouseEvent, draftId: string) => {
    e.stopPropagation();
    if (showDeleteConfirm === draftId) {
      onDeleteDraft(draftId);
      setShowDeleteConfirm(null);
    } else {
      setShowDeleteConfirm(draftId);
    }
  };

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center ${isMobileOrTablet ? 'p-[20px]' : 'p-[40px]'}`}
      style={{
        backgroundColor: '#1a1a1a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Header */}
      <div className="text-center mb-[60px]">
        <h1 
          className="m-0 mb-[16px]"
          style={{
            fontSize: isMobileOrTablet ? '32px' : '48px',
            fontWeight: '700',
            color: '#f1f0eb',
            letterSpacing: '-0.02em'
          }}
        >
          KAMI CONTENT DASHBOARD
        </h1>
        <p
          style={{
            fontSize: isMobileOrTablet ? '15px' : '18px',
            fontWeight: '400',
            color: '#9e9e9d',
            margin: 0
          }}
        >
          Create a new article or continue from a saved draft
        </p>
      </div>

      {/* Main Action Cards and Archive Section - Wrapped together for alignment */}
      <div className="flex flex-col items-start mb-[20px]">
        {/* Main Action Cards */}
        <div className={`${isMobileOrTablet ? 'grid grid-cols-2 gap-[12px]' : 'flex gap-[24px]'} mb-[80px]`}>
          {/* Create New V4 Card */}
          {onCreateNew && (
            <button
              onClick={onCreateNew}
              onMouseEnter={() => setHoveredCard('newV4')}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative border transition-all cursor-pointer overflow-hidden"
              style={{
                width: '140px',
                height: '98px',
                backgroundColor: hoveredCard === 'newV4' ? '#11ff49' : '#2a2a2a',
                borderColor: hoveredCard === 'newV4' ? '#11ff49' : '#3a3a3a',
                borderWidth: '2px',
                borderRadius: '12px'
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-[20px]">
                <div 
                  className="mb-[8px] transition-transform"
                  style={{
                    transform: hoveredCard === 'newV4' ? 'scale(1.1)' : 'scale(1)',
                    color: hoveredCard === 'newV4' ? '#1a1a1a' : '#11ff49'
                  }}
                >
                  <Plus className="size-[24px]" strokeWidth={2} />
                </div>
                <h2
                  className="m-0 mb-[4px]"
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: hoveredCard === 'newV4' ? '#1a1a1a' : '#f1f0eb',
                    letterSpacing: '-0.01em'
                  }}
                >
                  CREATE NEW
                </h2>
                <p
                  style={{
                    fontSize: '8px',
                    fontWeight: '400',
                    color: hoveredCard === 'newV4' ? '#1a1a1a' : '#9e9e9d',
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: '1.2'
                  }}
                >
                  Single page layout
                </p>
              </div>
            </button>
          )}

          {/* Featured Products Card */}
          {onOpenFeaturedProducts && (
            <button
              onClick={onOpenFeaturedProducts}
              onMouseEnter={() => setHoveredCard('products')}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative border transition-all cursor-pointer overflow-hidden"
              style={{
                width: '140px',
                height: '98px',
                backgroundColor: hoveredCard === 'products' ? '#a79755' : '#2a2a2a',
                borderColor: hoveredCard === 'products' ? '#a79755' : '#3a3a3a',
                borderWidth: '2px',
                borderRadius: '12px'
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-[20px]">
                <div 
                  className="mb-[8px] transition-transform"
                  style={{
                    transform: hoveredCard === 'products' ? 'scale(1.1)' : 'scale(1)',
                    color: hoveredCard === 'products' ? '#1a1a1a' : '#a79755'
                  }}
                >
                  <svg className="size-[24px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>
                <h2
                  className="m-0 mb-[4px]"
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: hoveredCard === 'products' ? '#1a1a1a' : '#f1f0eb',
                    letterSpacing: '-0.01em'
                  }}
                >
                  PRODUCTS
                </h2>
                <p
                  style={{
                    fontSize: '8px',
                    fontWeight: '400',
                    color: hoveredCard === 'products' ? '#1a1a1a' : '#9e9e9d',
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: '1.2'
                  }}
                >
                  Product showcase
                </p>
              </div>
            </button>
          )}

          {/* Recommended Articles Card */}
          {onOpenRecommendedArticles && (
            <button
              onClick={onOpenRecommendedArticles}
              onMouseEnter={() => setHoveredCard('articles')}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative border transition-all cursor-pointer overflow-hidden"
              style={{
                width: '140px',
                height: '98px',
                backgroundColor: hoveredCard === 'articles' ? '#4a90e2' : '#2a2a2a',
                borderColor: hoveredCard === 'articles' ? '#4a90e2' : '#3a3a3a',
                borderWidth: '2px',
                borderRadius: '12px'
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-[20px]">
                <div 
                  className="mb-[8px] transition-transform"
                  style={{
                    transform: hoveredCard === 'articles' ? 'scale(1.1)' : 'scale(1)',
                    color: hoveredCard === 'articles' ? '#1a1a1a' : '#4a90e2'
                  }}
                >
                  <svg className="size-[24px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <h2
                  className="m-0 mb-[4px]"
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: hoveredCard === 'articles' ? '#1a1a1a' : '#f1f0eb',
                    letterSpacing: '-0.01em'
                  }}
                >
                  ARTICLES
                </h2>
                <p
                  style={{
                    fontSize: '8px',
                    fontWeight: '400',
                    color: hoveredCard === 'articles' ? '#1a1a1a' : '#9e9e9d',
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: '1.2'
                  }}
                >
                  Article recommendations
                </p>
              </div>
            </button>
          )}

          {/* Load Draft Card */}
          <button
            onClick={onOpenDraftLibrary}
            onMouseEnter={() => setHoveredCard('load')}
            onMouseLeave={() => setHoveredCard(null)}
            className="relative border transition-all overflow-hidden cursor-pointer"
            style={{
              width: '140px',
              height: '98px',
              backgroundColor: hoveredCard === 'load' ? '#2f2f2f' : '#2a2a2a',
              borderColor: hoveredCard === 'load' ? '#11ff49' : '#3a3a3a',
              borderWidth: '2px',
              borderRadius: '12px'
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-[20px]">
              <div 
                className="mb-[8px] transition-transform"
                style={{
                  transform: hoveredCard === 'load' ? 'scale(1.1)' : 'scale(1)',
                  color: hoveredCard === 'load' ? '#11ff49' : '#9e9e9d'
                }}
              >
                <FolderOpen className="size-[24px]" strokeWidth={2} />
              </div>
              <h2
                className="m-0 mb-[4px]"
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#f1f0eb',
                  letterSpacing: '-0.01em'
                }}
              >
                LOAD DRAFT
              </h2>
              <p
                style={{
                  fontSize: '8px',
                  fontWeight: '400',
                  color: '#9e9e9d',
                  margin: 0,
                  textAlign: 'center',
                  marginBottom: '4px',
                  lineHeight: '1.2'
                }}
              >
                {drafts.length === 0 ? 'No drafts' : `${drafts.length} draft${drafts.length === 1 ? '' : 's'}`}
              </p>
              {drafts.length > 0 && (
                <div
                  style={{
                    fontSize: '8px',
                    fontWeight: '600',
                    color: '#11ff49',
                    letterSpacing: '0.05em'
                  }}
                >
                  VIEW ↓
                </div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Saved Drafts List */}
      {(drafts.length > 0 || published.length > 0) && (
        <div className="w-full max-w-[824px]">
          <h3
            className="m-0 mb-[24px]"
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#f1f0eb',
              letterSpacing: '-0.01em'
            }}
          >
            YOUR WORK
          </h3>

          {/* Published Articles */}
          {published.length > 0 && (
            <div className="mb-[32px]">
              <div
                className="mb-[12px] flex items-center gap-[8px]"
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#9e9e9d',
                  letterSpacing: '0.05em'
                }}
              >
                <Eye className="size-[14px]" strokeWidth={2} />
                PUBLISHED ({published.length})
              </div>
              <div className="space-y-[12px]">
                {published.map(page => (
                  <button
                    key={page.id}
                    onClick={() => onLoadDraft(page.id)}
                    onMouseEnter={() => setHoveredDraft(page.id)}
                    onMouseLeave={() => setHoveredDraft(null)}
                    className="w-full border transition-all cursor-pointer text-left flex items-center justify-between p-[20px] group"
                    style={{
                      backgroundColor: hoveredDraft === page.id ? '#2f2f2f' : 'transparent',
                      borderColor: hoveredDraft === page.id ? '#11ff49' : '#3a3a3a',
                      borderWidth: '1px'
                    }}
                  >
                    <div className="flex items-center gap-[16px] flex-1">
                      <div style={{ color: '#11ff49' }}>
                        <FileText className="size-[20px]" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <div
                          style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#f1f0eb',
                            marginBottom: '4px'
                          }}
                        >
                          {page.name}
                        </div>
                        <div
                          style={{
                            fontSize: '13px',
                            fontWeight: '400',
                            color: '#9e9e9d'
                          }}
                        >
                          <Calendar className="size-[12px] inline mr-[6px]" strokeWidth={2} />
                          {formatDate(page.savedAt)}
                        </div>
                      </div>
                      <div
                        className="px-[12px] py-[4px] border"
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          color: '#11ff49',
                          borderColor: '#11ff49',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {(
                          typeof page.selectedStyle === 'string'
                            ? page.selectedStyle
                            : typeof page.content?.selectedStyle === 'number'
                              ? `style${page.content.selectedStyle}`
                              : typeof page.selectedStyle === 'number'
                                ? `style${page.selectedStyle}`
                                : 'STYLE'
                        ).toUpperCase().replace('STYLE', 'STYLE ')}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Drafts */}
          {drafts.length > 0 && (
            <div>
              <div
                className="mb-[12px] flex items-center gap-[8px]"
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#9e9e9d',
                  letterSpacing: '0.05em'
                }}
              >
                <FileText className="size-[14px]" strokeWidth={2} />
                DRAFTS ({drafts.length})
              </div>
              <div className="space-y-[12px]">
                {drafts.map(page => (
                  <div
                    key={page.id}
                    onClick={() => onLoadDraft(page.id)}
                    onMouseEnter={() => setHoveredDraft(page.id)}
                    onMouseLeave={() => {
                      setHoveredDraft(null);
                      setShowDeleteConfirm(null);
                    }}
                    className="w-full border transition-all cursor-pointer text-left flex items-center justify-between p-[20px] group"
                    style={{
                      backgroundColor: hoveredDraft === page.id ? '#2f2f2f' : 'transparent',
                      borderColor: hoveredDraft === page.id ? '#11ff49' : '#3a3a3a',
                      borderWidth: '1px'
                    }}
                  >
                    <div className="flex items-center gap-[16px] flex-1">
                      <div style={{ color: '#9e9e9d' }}>
                        <FileText className="size-[20px]" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <div
                          style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#f1f0eb',
                            marginBottom: '4px'
                          }}
                        >
                          {page.name}
                        </div>
                        <div
                          style={{
                            fontSize: '13px',
                            fontWeight: '400',
                            color: '#9e9e9d'
                          }}
                        >
                          <Calendar className="size-[12px] inline mr-[6px]" strokeWidth={2} />
                          {formatDate(page.savedAt)}
                        </div>
                      </div>
                      <div
                        className="px-[12px] py-[4px] border"
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          color: '#9e9e9d',
                          borderColor: '#3a3a3a',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {(
                          typeof page.selectedStyle === 'string'
                            ? page.selectedStyle
                            : typeof page.content?.selectedStyle === 'number'
                              ? `style${page.content.selectedStyle}`
                              : typeof page.selectedStyle === 'number'
                                ? `style${page.selectedStyle}`
                                : 'STYLE'
                        ).toUpperCase().replace('STYLE', 'STYLE ')}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteDraft(e, page.id)}
                      className="ml-[16px] p-[8px] border transition-all opacity-0 group-hover:opacity-100"
                      style={{
                        backgroundColor: showDeleteConfirm === page.id ? '#ff4444' : 'transparent',
                        borderColor: showDeleteConfirm === page.id ? '#ff4444' : '#3a3a3a',
                        color: showDeleteConfirm === page.id ? '#ffffff' : '#9e9e9d'
                      }}
                      onMouseEnter={(e) => {
                        if (showDeleteConfirm !== page.id) {
                          e.currentTarget.style.borderColor = '#ff4444';
                          e.currentTarget.style.color = '#ff4444';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (showDeleteConfirm !== page.id) {
                          e.currentTarget.style.borderColor = '#3a3a3a';
                          e.currentTarget.style.color = '#9e9e9d';
                        }
                      }}
                    >
                      <Trash2 className="size-[16px]" strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div 
        className="mt-[0px] text-center"
        style={{
          fontSize: '13px',
          color: '#666',
          fontWeight: '400'
        }}
      >
        All Rights Reserved © KAMI
      </div>

      {/* Template Selection Modal */}
      {showTemplateDropdown && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }}
          onClick={() => setShowTemplateDropdown(false)}
        >
          <div
            className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-[12px] p-[40px] max-w-[600px] w-full"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "'Inter', sans-serif"
            }}
          >
            <h2
              className="m-0 mb-[12px]"
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#f1f0eb',
                letterSpacing: '-0.01em'
              }}
            >
              Select Article Template
            </h2>
            <p
              className="mb-[32px]"
              style={{
                fontSize: '15px',
                fontWeight: '400',
                color: '#9e9e9d',
                margin: 0,
                marginBottom: '32px'
              }}
            >
              Choose a template style for your article
            </p>

            <div className="grid grid-cols-2 gap-[16px] mb-[32px]">
              {templates.map((template, index) => (
                <button
                  key={template}
                  onClick={() => handleTemplateSelect(template)}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#11ff49'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#3a3a3a'}
                  className="border p-[20px] rounded-[8px] text-left transition-all cursor-pointer"
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderColor: '#3a3a3a',
                    borderWidth: '1px'
                  }}
                >
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#f1f0eb',
                      marginBottom: '8px'
                    }}
                  >
                    {template}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: '400',
                      color: '#9e9e9d'
                    }}
                  >
                    Template {index + 1}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowTemplateDropdown(false)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              className="w-full border p-[16px] rounded-[8px] transition-all cursor-pointer"
              style={{
                backgroundColor: 'transparent',
                borderColor: '#3a3a3a',
                borderWidth: '1px',
                fontSize: '15px',
                fontWeight: '600',
                color: '#9e9e9d'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
