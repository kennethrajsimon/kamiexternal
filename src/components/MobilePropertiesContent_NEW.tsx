'use client';

import { ChevronDown, Eye, X, Trash2, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProductSets } from '../services/api';
import { MobileImageUploader } from './MobileImageUploader';
import { RichTextEditor } from './RichTextEditor';
import _imgDefaultCoverHero from "../assets/931ef8e14bd8f3516acd9bea1676dbd4b8d4987d.png";
import _imgDefaultBWHero from "../assets/34c2e0eace15e343a1c923bac054f892ff3c7f6f.png";
import _imgDefaultCreatorSpotlightHero from "../assets/c5ce4e47ab90e08210a558deb1f6e4cba2392c2a.png";
import _imgDefaultAnnouncementSecond from "../assets/36a8297e1a2ddc90473646931c66462380d62ee9.png";
const imgDefaultCoverHero = (_imgDefaultCoverHero as any).src;
const imgDefaultBWHero = (_imgDefaultBWHero as any).src;
const imgDefaultCreatorSpotlightHero = (_imgDefaultCreatorSpotlightHero as any).src;
const imgDefaultAnnouncementSecond = (_imgDefaultAnnouncementSecond as any).src;

interface MobilePropertiesContentProps {
  currentPage: any;
  currentPageIndex: number;
  pages: any[];
  styles: any;
  setStyles: (styles: any) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  deletePage: (id: string) => void;
  setCurrentPageIndex: (index: number) => void;
  setMobilePropertiesOpen: (open: boolean) => void;
  setIsReadingMode: (mode: boolean) => void;
  efxGlitch: boolean;
  efxBlur: boolean;
  efxChromatic: boolean;
  efxShake: boolean;
  efxDistort: boolean;
  setEfxGlitch: (value: boolean) => void;
  setEfxBlur: (value: boolean) => void;
  setEfxChromatic: (value: boolean) => void;
  setEfxShake: (value: boolean) => void;
  setEfxDistort: (value: boolean) => void;
  updatePageField: (field: string, value: any) => void;
  setPages: (pages: any[]) => void;
  setShowStyleModal: (show: boolean) => void;
  getStyleLabel: () => string;
  onSaveToLibrary?: () => void;
}

export function MobilePropertiesContent({
  currentPage,
  currentPageIndex,
  pages,
  styles,
  setStyles,
  activeTab,
  setActiveTab,
  goToPreviousPage,
  goToNextPage,
  deletePage,
  setCurrentPageIndex,
  setMobilePropertiesOpen,
  setIsReadingMode,
  efxGlitch,
  efxBlur,
  efxChromatic,
  efxShake,
  efxDistort,
  setEfxGlitch,
  setEfxBlur,
  setEfxChromatic,
  setEfxShake,
  setEfxDistort,
  updatePageField,
  setPages,
  setShowStyleModal,
  getStyleLabel,
  onSaveToLibrary
}: MobilePropertiesContentProps) {
  const [productSets, setProductSets] = useState<any[]>([]);

  useEffect(() => {
    getProductSets().then(setProductSets).catch(err => console.error('Failed to load product sets', err));
  }, []);

  return (
    <div className="space-y-4">
      {/* Page Header with Title and Navigation */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="font-['Inter:SemiBold',sans-serif] flex-1"
          style={{
            fontSize: '18px',
            color: '#a79755',
            fontWeight: '600',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap'
          }}
        >
          {currentPage.styleType === 'cover' ? 'Cover Thumbnail' : `Page ${currentPageIndex}`}
        </h2>
        <div className="flex items-center gap-2">
          {/* Previous Page Button */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPageIndex === 0}
            className="w-[36px] h-[36px] rounded-[6px] flex items-center justify-center transition-all disabled:opacity-30"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a'
            }}
          >
            <span style={{ color: '#9e9e9d', fontSize: '16px' }}>←</span>
          </button>
          
          {/* Page Counter */}
          <div
            className="px-3 py-2 rounded-[6px] font-['Inter:Medium',sans-serif]"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a',
              color: '#9e9e9d',
              fontSize: '12px',
              fontWeight: '500'
            }}
          >
            {currentPageIndex + 1} / {pages.length}
          </div>
          
          {/* Next Page Button */}
          <button
            onClick={goToNextPage}
            disabled={currentPageIndex === pages.length - 1}
            className="w-[36px] h-[36px] rounded-[6px] flex items-center justify-center transition-all disabled:opacity-30"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a'
            }}
          >
            <span style={{ color: '#9e9e9d', fontSize: '16px' }}>→</span>
          </button>
          
          {/* Delete Page Button */}
          <button
            onClick={() => deletePage(currentPage.id)}
            className="w-[36px] h-[36px] rounded-[6px] flex items-center justify-center transition-all hover:scale-105"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a'
            }}
            title="Delete this page"
          >
            <Trash2 size={16} style={{ color: '#a79755' }} />
          </button>
        </div>
      </div>

      {/* ALL PAGES Navigation */}
      <div className="mb-4">
        <div 
          className="text-[10px] font-bold mb-2 px-1"
          style={{ color: '#9e9e9d', letterSpacing: '0.05em' }}
        >
          ALL PAGES ({pages.length})
        </div>
        <div className="flex gap-2 flex-wrap">
          {pages.map((page, idx) => (
            <button
              key={page.id}
              onClick={() => setCurrentPageIndex(idx)}
              className="px-4 py-2 rounded-[6px] font-['Inter:Bold',sans-serif] transition-all"
              style={{
                backgroundColor: idx === currentPageIndex ? styles.textAccent : '#2a2a2a',
                border: `1px solid ${idx === currentPageIndex ? styles.textAccent : '#3a3a3a'}`,
                color: idx === currentPageIndex ? '#1a1a1a' : '#9e9e9d',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.02em'
              }}
            >
              {page.styleType === 'cover' ? 'COVER' : `PAGE ${idx}`}
            </button>
          ))}
        </div>
      </div>

      {/* PREVIEW ARTICLE Button */}
      <button
        onClick={() => {
          setMobilePropertiesOpen(false);
          setIsReadingMode(true);
        }}
        className="w-full py-3 rounded-[8px] flex items-center justify-center gap-2 transition-all font-['Inter:SemiBold',sans-serif]"
        style={{
          backgroundColor: styles.textAccent,
          color: '#1a1a1a',
          fontSize: '13px',
          fontWeight: '600',
          border: 'none'
        }}
      >
        <Eye className="size-[16px]" strokeWidth={2} />
        PREVIEW ARTICLE
      </button>

      {/* EFX Buttons - Single Row */}
      <div className="w-full">
        <div 
          className="text-[10px] font-bold mb-2 px-1"
          style={{ color: '#9e9e9d', letterSpacing: '0.05em' }}
        >
          EFX
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          <button
            className="py-2 px-1 rounded-[6px] transition-all text-[9px]"
            style={{
              backgroundColor: efxGlitch ? '#ff00ff' : '#2a2a2a',
              border: efxGlitch ? '1px solid #ff00ff' : '1px solid #3a3a3a',
              fontWeight: '700',
              color: efxGlitch ? '#1a1a1a' : '#9e9e9d',
              letterSpacing: '0.02em'
            }}
            onClick={() => {
              const newValue = !efxGlitch;
              setEfxGlitch(newValue);
              if (newValue) {
                setEfxBlur(false);
                setEfxChromatic(false);
                setEfxShake(false);
                setEfxDistort(false);
              }
            }}
          >
            GLITCH
          </button>
          <button
            className="py-2 px-1 rounded-[6px] transition-all text-[9px]"
            style={{
              backgroundColor: efxBlur ? '#00ffff' : '#2a2a2a',
              border: efxBlur ? '1px solid #00ffff' : '1px solid #3a3a3a',
              fontWeight: '700',
              color: efxBlur ? '#1a1a1a' : '#9e9e9d',
              letterSpacing: '0.02em'
            }}
            onClick={() => {
              const newValue = !efxBlur;
              setEfxBlur(newValue);
              if (newValue) {
                setEfxGlitch(false);
                setEfxChromatic(false);
                setEfxShake(false);
                setEfxDistort(false);
              }
            }}
          >
            BLUR
          </button>
          <button
            className="py-2 px-1 rounded-[6px] transition-all text-[9px]"
            style={{
              backgroundColor: efxChromatic ? '#ffff00' : '#2a2a2a',
              border: efxChromatic ? '1px solid #ffff00' : '1px solid #3a3a3a',
              fontWeight: '700',
              color: efxChromatic ? '#1a1a1a' : '#9e9e9d',
              letterSpacing: '0.02em'
            }}
            onClick={() => {
              const newValue = !efxChromatic;
              setEfxChromatic(newValue);
              if (newValue) {
                setEfxGlitch(false);
                setEfxBlur(false);
                setEfxShake(false);
                setEfxDistort(false);
              }
            }}
          >
            CHROM
          </button>
          <button
            className="py-2 px-1 rounded-[6px] transition-all text-[9px]"
            style={{
              backgroundColor: efxShake ? '#ff6600' : '#2a2a2a',
              border: efxShake ? '1px solid #ff6600' : '1px solid #3a3a3a',
              fontWeight: '700',
              color: efxShake ? '#1a1a1a' : '#9e9e9d',
              letterSpacing: '0.02em'
            }}
            onClick={() => {
              const newValue = !efxShake;
              setEfxShake(newValue);
              if (newValue) {
                setEfxGlitch(false);
                setEfxBlur(false);
                setEfxChromatic(false);
                setEfxDistort(false);
              }
            }}
          >
            SHAKE
          </button>
          <button
            className="py-2 px-1 rounded-[6px] transition-all text-[9px]"
            style={{
              backgroundColor: efxDistort ? '#11ff49' : '#2a2a2a',
              border: efxDistort ? '1px solid #11ff49' : '1px solid #3a3a3a',
              fontWeight: '700',
              color: efxDistort ? '#1a1a1a' : '#9e9e9d',
              letterSpacing: '0.02em'
            }}
            onClick={() => {
              const newValue = !efxDistort;
              setEfxDistort(newValue);
              if (newValue) {
                setEfxGlitch(false);
                setEfxBlur(false);
                setEfxChromatic(false);
                setEfxShake(false);
              }
            }}
          >
            DISTORT
          </button>
        </div>
      </div>

      {/* Content/Style Tabs */}
      <div className="flex gap-2 border-b pt-4" style={{ borderColor: '#2a2a2a' }}>
        <button
          onClick={() => setActiveTab('content')}
          className="px-4 py-3 transition-all font-['Inter:SemiBold',sans-serif]"
          style={{
            fontSize: '13px',
            fontWeight: '600',
            color: activeTab === 'content' ? styles.textAccent : '#9e9e9d',
            borderBottom: activeTab === 'content' ? `2px solid ${styles.textAccent}` : '2px solid transparent',
            background: 'transparent'
          }}
        >
          Content
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className="px-4 py-3 transition-all font-['Inter:SemiBold',sans-serif]"
          style={{
            fontSize: '13px',
            fontWeight: '600',
            color: activeTab === 'style' ? styles.textAccent : '#9e9e9d',
            borderBottom: activeTab === 'style' ? `2px solid ${styles.textAccent}` : '2px solid transparent',
            background: 'transparent'
          }}
        >
          Style
        </button>
      </div>

      {/* Content Tab - All Form Fields */}
      {activeTab === 'content' && (
        <div className="space-y-4 pt-2">
          {/* Style Selector for all page types */}
          <div className="pb-2">
            <label 
              className="block mb-2 font-['Inter:Medium',sans-serif]"
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#9e9e9d',
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}
            >
              {getStyleLabel()}
            </label>
            <div className="relative">
              <select
                value={currentPage.selectedStyle}
                onChange={(e) => {
                  const newPages = [...pages];
                  const newStyle = parseInt(e.target.value);
                  
                  //Set default values based on Cover Thumbnail style selection
                  let updatedFields = { ...newPages[currentPageIndex].fields };
                  let updatedImages = { ...newPages[currentPageIndex].images };
                  
                  if (currentPage.styleType === 'cover') {
                    if (newStyle === 1) {
                      // Feature Article Colour defaults
                      updatedFields = {
                        ...updatedFields,
                        coverBackgroundColor: '#fb00b8',
                        coverBackgroundText: 'FIGHTING!',
                        coverBackgroundTextColor: '#f1f0eb',
                        coverBackgroundTextStyle: 'stroke'
                      };
                      updatedImages = {
                        ...updatedImages,
                        coverImage: imgDefaultCoverHero,
                        coverImage2: null
                      };
                    } else if (newStyle === 2) {
                      // Feature Article BW defaults
                      updatedFields = {
                        ...updatedFields,
                        coverBackgroundColor: '#1a1a1a',
                        coverBackgroundText: 'BUTTERFLY',
                        coverBackgroundTextColor: '#f1f0eb',
                        coverBackgroundTextStyle: 'fill'
                      };
                      updatedImages = {
                        ...updatedImages,
                        coverImage: imgDefaultBWHero,
                        coverImage2: null
                      };
                    } else if (newStyle === 3) {
                      // Creator Spotlight defaults
                      updatedFields = {
                        ...updatedFields,
                        coverBackgroundColor: '#fb00b8',
                        coverBackgroundText: 'FIGHTING!',
                        coverBackgroundTextColor: '#f1f0eb',
                        coverBackgroundTextStyle: 'stroke'
                      };
                      updatedImages = {
                        ...updatedImages,
                        coverImage: imgDefaultCreatorSpotlightHero,
                        coverImage2: null
                      };
                    } else if (newStyle === 4) {
                      // Announcement defaults
                      updatedFields = {
                        ...updatedFields,
                        coverBackgroundColor: '#1a1a1a',
                        coverCategory: 'Announcement'
                      };
                      updatedImages = {
                        ...updatedImages,
                        coverImage: null,
                        coverImage2: imgDefaultAnnouncementSecond
                      };
                    }
                  }
                  
                  newPages[currentPageIndex] = {
                    ...newPages[currentPageIndex],
                    selectedStyle: newStyle,
                    fields: updatedFields,
                    images: updatedImages
                  };
                  setPages(newPages);
                }}
                className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer font-['Inter:Medium',sans-serif]"
                style={{
                  backgroundColor: '#2a2a2a',
                  borderColor: '#3a3a3a',
                  color: styles.textPrimary,
                  fontSize: '15px'
                }}
              >
                {currentPage.styleType === 'cover' ? (
                  <>
                    <option value="1">Feature Article Colour</option>
                    <option value="2">Feature Article B&W</option>
                    <option value="3">Creator Spotlight</option>
                    <option value="4">Announcement</option>
                  </>
                ) : currentPage.styleType === 'intro' ? (
                  <>
                    <option value="1">Opening Style 1</option>
                    <option value="2">Opening Style 2</option>
                    <option value="3">Opening Style 3</option>
                  </>
                ) : (
                  <>
                    <option value="1">Content Style 1</option>
                    <option value="2">Content Style 2</option>
                    <option value="3">Content Style 3</option>
                    <option value="4">Content Style 4</option>
                  </>
                )}
              </select>
              <ChevronDown 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" 
                size={20} 
                style={{ color: '#9e9e9d' }}
              />
            </div>
          </div>

          {/* COVER PAGE FIELDS */}
          {currentPage.styleType === 'cover' && (
            <>
              {/* Hero Image Section with Toggle */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="font-['Inter:Medium',sans-serif]"
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#9e9e9d',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Hero Image
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentPage.fields?.showHeroImage !== false}
                      onChange={(e) => updatePageField('showHeroImage', e.target.checked)}
                      className="w-4 h-4 cursor-pointer"
                      style={{ accentColor: styles.textAccent }}
                    />
                    <span style={{ fontSize: '13px', fontWeight: '400', color: styles.textPrimary }}>
                      Show Hero Image
                    </span>
                  </label>
                </div>
                <MobileImageUploader
                  value={currentPage.images?.coverImage || ''}
                  onChange={(url) => {
                    setPages(prev => {
                      const newPages = [...prev];
                      newPages[currentPageIndex] = {
                        ...newPages[currentPageIndex],
                        images: { ...newPages[currentPageIndex].images, coverImage: url }
                      };
                      return newPages;
                    });
                  }}
                  accentColor={styles.textAccent}
                  objectFit={currentPage.imageFits?.coverImageFit || 'cover'}
                  onObjectFitChange={(fit) => {
                    setPages(prev => {
                      const newPages = [...prev];
                      newPages[currentPageIndex] = {
                        ...newPages[currentPageIndex],
                        imageFits: { ...newPages[currentPageIndex].imageFits, coverImageFit: fit }
                      };
                      return newPages;
                    });
                  }}
                  customDetailText={currentPage.selectedStyle === 4 ? "Recommended size is 400 x 400 pixels" : "Transparent PNG or gif recommended. Full size is 717 (W) x 750 (H) pixels"}
                />
              </div>

              {/* Second Image - Only for Announcement style */}
              {currentPage.selectedStyle === 4 && (
                <div>
                  <label
                    className="block mb-2 font-['Inter:Medium',sans-serif]"
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#9e9e9d',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Second Image
                  </label>
                  <MobileImageUploader
                    value={currentPage.images?.coverImage2 || ''}
                    onChange={(url) => {
                      setPages(prev => {
                        const newPages = [...prev];
                        newPages[currentPageIndex] = {
                          ...newPages[currentPageIndex],
                          images: { ...newPages[currentPageIndex].images, coverImage2: url }
                        };
                        return newPages;
                      });
                    }}
                    accentColor={styles.textAccent}
                    objectFit={currentPage.imageFits?.coverImageFit2 || 'cover'}
                    onObjectFitChange={(fit) => {
                      setPages(prev => {
                        const newPages = [...prev];
                        newPages[currentPageIndex] = {
                          ...newPages[currentPageIndex],
                          imageFits: { ...newPages[currentPageIndex].imageFits, coverImageFit2: fit }
                        };
                        return newPages;
                      });
                    }}
                    customDetailText="Recommended size is 400 x 400 pixels"
                  />
                </div>
              )}

              {/* Background Color with Toggle */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="font-['Inter:Medium',sans-serif]"
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#9e9e9d',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Background Colour
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentPage.fields?.showBackgroundColor !== false}
                      onChange={(e) => updatePageField('showBackgroundColor', e.target.checked)}
                      className="w-4 h-4 cursor-pointer"
                      style={{ accentColor: styles.textAccent }}
                    />
                    <span style={{ fontSize: '13px', fontWeight: '400', color: styles.textPrimary }}>
                      Show Background Color
                    </span>
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={currentPage.fields?.coverBackgroundColor || '#1a1a1a'}
                    onChange={(e) => updatePageField('coverBackgroundColor', e.target.value)}
                    className="w-16 h-12 rounded-lg cursor-pointer"
                    style={{
                      border: '1px solid #2a2a2a',
                      backgroundColor: '#2a2a2a'
                    }}
                  />
                  <input
                    type="text"
                    value={currentPage.fields?.coverBackgroundColor || '#1a1a1a'}
                    onChange={(e) => updatePageField('coverBackgroundColor', e.target.value)}
                    placeholder="#1a1a1a"
                    className="flex-1 px-4 py-3 rounded-lg border"
                    style={{
                      backgroundColor: '#2a2a2a',
                      borderColor: '#3a3a3a',
                      color: styles.textPrimary,
                      fontSize: '15px'
                    }}
                  />
                </div>
              </div>

              {/* Background Image Upload - FOR ALL STYLES */}
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#9e9e9d',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase'
                  }}
                >
                  Background Image
                </label>
                <MobileImageUploader
                  value={currentPage.images?.coverBackgroundImage || ''}
                  onChange={(url) => {
                    setPages(prev => {
                      const newPages = [...prev];
                      newPages[currentPageIndex] = {
                        ...newPages[currentPageIndex],
                        images: { ...newPages[currentPageIndex].images, coverBackgroundImage: url }
                      };
                      return newPages;
                    });
                  }}
                  accentColor={styles.textAccent}
                  objectFit={currentPage.imageFits?.coverBackgroundImageFit || 'cover'}
                  onObjectFitChange={(fit) => {
                    setPages(prev => {
                      const newPages = [...prev];
                      newPages[currentPageIndex] = {
                        ...newPages[currentPageIndex],
                        imageFits: { ...newPages[currentPageIndex].imageFits, coverBackgroundImageFit: fit }
                      };
                      return newPages;
                    });
                  }}
                  customDetailText="Recommended size is 1512 x 851 pixels"
                />
              </div>

              {/* Background Text - Only for styles 1 and 2 */}
              {(currentPage.selectedStyle === 1 || currentPage.selectedStyle === 2) && (
                <>
                  {/* Background Text with Toggle */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label
                        className="font-['Inter:Medium',sans-serif]"
                        style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: styles.textPrimary
                        }}
                      >
                        Background Text
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentPage.fields?.showBackgroundText !== false}
                          onChange={(e) => updatePageField('showBackgroundText', e.target.checked)}
                          className="w-4 h-4 cursor-pointer"
                          style={{ accentColor: styles.textAccent }}
                        />
                        <span style={{ fontSize: '13px', fontWeight: '400', color: styles.textPrimary }}>
                          Show Background Text
                        </span>
                      </label>
                    </div>
                    <input
                      type="text"
                      value={currentPage.fields?.coverBackgroundText || ''}
                      onChange={(e) => updatePageField('coverBackgroundText', e.target.value.toUpperCase())}
                      placeholder={currentPage.selectedStyle === 1 ? 'FIGHTING!' : 'BUTTERFLY'}
                      className="w-full px-4 py-3 rounded-lg border uppercase"
                      style={{
                        backgroundColor: '#2a2a2a',
                        borderColor: '#3a3a3a',
                        color: styles.textPrimary,
                        fontSize: '15px'
                      }}
                    />
                  </div>

                  {/* Background Text Color */}
                  <div>
                    <label
                      className="block mb-2 font-['Inter:Medium',sans-serif]"
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: styles.textPrimary
                      }}
                    >
                      Background Text Colour
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={currentPage.fields?.coverBackgroundTextColor || '#fb00b8'}
                        onChange={(e) => updatePageField('coverBackgroundTextColor', e.target.value)}
                        className="w-16 h-12 rounded-lg cursor-pointer"
                        style={{
                          border: '1px solid #2a2a2a',
                          backgroundColor: '#2a2a2a'
                        }}
                      />
                      <input
                        type="text"
                        value={currentPage.fields?.coverBackgroundTextColor || '#fb00b8'}
                        onChange={(e) => updatePageField('coverBackgroundTextColor', e.target.value)}
                        placeholder="#fb00b8"
                        className="flex-1 px-4 py-3 rounded-lg border"
                        style={{
                          backgroundColor: '#2a2a2a',
                          borderColor: '#3a3a3a',
                          color: styles.textPrimary,
                          fontSize: '15px'
                        }}
                      />
                    </div>
                  </div>

                  {/* Background Text Style - Fill or Stroke */}
                  <div>
                    <label
                      className="block mb-2 font-['Inter:Medium',sans-serif]"
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: styles.textPrimary
                      }}
                    >
                      Background Text Style
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => updatePageField('coverBackgroundTextStyle', 'fill')}
                        className="flex-1 py-3 rounded-lg transition-all"
                        style={{
                          backgroundColor: (currentPage.fields?.coverBackgroundTextStyle || 'fill') === 'fill' ? styles.textAccent : '#2a2a2a',
                          border: `1px solid ${(currentPage.fields?.coverBackgroundTextStyle || 'fill') === 'fill' ? styles.textAccent : '#3a3a3a'}`,
                          color: (currentPage.fields?.coverBackgroundTextStyle || 'fill') === 'fill' ? '#1a1a1a' : styles.textPrimary,
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        Fill
                      </button>
                      <button
                        onClick={() => updatePageField('coverBackgroundTextStyle', 'stroke')}
                        className="flex-1 py-3 rounded-lg transition-all"
                        style={{
                          backgroundColor: currentPage.fields?.coverBackgroundTextStyle === 'stroke' ? styles.textAccent : '#2a2a2a',
                          border: `1px solid ${currentPage.fields?.coverBackgroundTextStyle === 'stroke' ? styles.textAccent : '#3a3a3a'}`,
                          color: currentPage.fields?.coverBackgroundTextStyle === 'stroke' ? '#1a1a1a' : styles.textPrimary,
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        Stroke
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Category */}
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#9e9e9d',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase'
                  }}
                >
                  Category
                </label>
                <input
                  type="text"
                  value={currentPage.fields?.coverCategory || ''}
                  onChange={(e) => updatePageField('coverCategory', e.target.value.toUpperCase())}
                  placeholder="CATEGORY TYPE"
                  className="w-full px-4 py-3 rounded-lg border uppercase"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: '#11ff49',
                    fontSize: '15px'
                  }}
                />
              </div>

              {/* Title */}
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#9e9e9d',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase'
                  }}
                >
                  Title
                </label>
                <textarea
                  value={currentPage.fields?.coverTitle || ''}
                  onChange={(e) => updatePageField('coverTitle', e.target.value.toUpperCase())}
                  placeholder="ENTER HEADLINE HERE"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border resize-vertical uppercase"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '15px'
                  }}
                />
              </div>

              {/* Icon Counts */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="block mb-2 font-['Inter:Medium',sans-serif]"
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: styles.textPrimary
                    }}
                  >
                    Icon Count 1
                  </label>
                  <input
                    type="text"
                    value={currentPage.fields?.coverIconCount1 || ''}
                    onChange={(e) => updatePageField('coverIconCount1', e.target.value)}
                    placeholder="1.2M"
                    className="w-full px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: '#2a2a2a',
                      borderColor: '#3a3a3a',
                      color: styles.textPrimary,
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 font-['Inter:Medium',sans-serif]"
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: styles.textPrimary
                    }}
                  >
                    Icon Count 2
                  </label>
                  <input
                    type="text"
                    value={currentPage.fields?.coverIconCount2 || ''}
                    onChange={(e) => updatePageField('coverIconCount2', e.target.value)}
                    placeholder="847K"
                    className="w-full px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: '#2a2a2a',
                      borderColor: '#3a3a3a',
                      color: styles.textPrimary,
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* INTRO PAGE FIELDS */}
          {currentPage.styleType === 'intro' && (
            <>
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: styles.textPrimary
                  }}
                >
                  Title
                </label>
                <textarea
                  value={currentPage.fields?.title || ''}
                  onChange={(e) => updatePageField('title', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border resize-vertical"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '15px'
                  }}
                />
              </div>

              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: styles.textPrimary
                  }}
                >
                  Author
                </label>
                <input
                  type="text"
                  value={currentPage.fields?.author || ''}
                  onChange={(e) => updatePageField('author', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '15px'
                  }}
                />
              </div>

              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: styles.textAccent
                  }}
                >
                  Headline
                </label>
                <textarea
                  value={currentPage.fields?.headline || ''}
                  onChange={(e) => updatePageField('headline', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border resize-vertical"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '15px'
                  }}
                />
              </div>

              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: styles.textPrimary
                  }}
                >
                  Body Copy 1
                </label>
                <textarea
                  value={currentPage.fields?.description || ''}
                  onChange={(e) => updatePageField('description', e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border resize-vertical"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '15px',
                    lineHeight: '1.6'
                  }}
                />
              </div>
            </>
          )}

          {/* CONTENT PAGE FIELDS */}
          {currentPage.styleType === 'content' && (
            <>
              {/* Image 1 */}
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: styles.textPrimary
                  }}
                >
                  Image 1
                </label>
                <MobileImageUploader
                  value={currentPage.images?.image1 || ''}
                  onChange={(url) => {
                    const newPages = [...pages];
                    newPages[currentPageIndex] = {
                      ...newPages[currentPageIndex],
                      images: { ...newPages[currentPageIndex].images, image1: url }
                    };
                    setPages(newPages);
                  }}
                  accentColor={styles.textAccent}
                  fontFamily={styles.fontFamily}
                  objectFit={currentPage.imageFits?.image1Fit || 'cover'}
                  onObjectFitChange={(fit) => {
                    const newPages = [...pages];
                    newPages[currentPageIndex] = {
                      ...newPages[currentPageIndex],
                      imageFits: { ...newPages[currentPageIndex].imageFits, image1Fit: fit }
                    };
                    setPages(newPages);
                  }}
                  customDetailText=""
                />
              </div>

              {/* Image 2 */}
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: styles.textPrimary
                  }}
                >
                  Image 2
                </label>
                <MobileImageUploader
                  value={currentPage.images?.image2 || ''}
                  onChange={(url) => {
                    const newPages = [...pages];
                    newPages[currentPageIndex] = {
                      ...newPages[currentPageIndex],
                      images: { ...newPages[currentPageIndex].images, image2: url }
                    };
                    setPages(newPages);
                  }}
                  accentColor={styles.textAccent}
                  fontFamily={styles.fontFamily}
                  objectFit={currentPage.imageFits?.image2Fit || 'cover'}
                  onObjectFitChange={(fit) => {
                    const newPages = [...pages];
                    newPages[currentPageIndex] = {
                      ...newPages[currentPageIndex],
                      imageFits: { ...newPages[currentPageIndex].imageFits, image2Fit: fit }
                    };
                    setPages(newPages);
                  }}
                  customDetailText=""
                />
              </div>

              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: styles.textPrimary
                  }}
                >
                  Top Label
                </label>
                <input
                  type="text"
                  value={currentPage.fields?.topLabel || ''}
                  onChange={(e) => updatePageField('topLabel', e.target.value)}
                  placeholder={currentPage.selectedStyle === 1 ? 'BEYOND THE SCREENSHOT' : ''}
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '15px'
                  }}
                />
              </div>

              {currentPage.selectedStyle !== 4 && (
                <div>
                  <label
                    className="block mb-2 font-['Inter:Medium',sans-serif]"
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: styles.textPrimary
                    }}
                  >
                    Body Copy {currentPage.selectedStyle}-1
                  </label>
                  <RichTextEditor
                    key={`body-copy-${currentPage.id}-intro-or-first`}
                    value={currentPage.fields?.bodyCopies?.[0]?.text || ''}
                    onChange={(value) => {
                      const newBodies = [...(currentPage.fields.bodyCopies || [{ id: 'body-1', text: '' }])];
                      const { afterHeaderId, ...rest } = newBodies[0] || {};
                      newBodies[0] = { id: rest.id || 'body-1', text: value };
                      updatePageField('bodyCopies', newBodies);
                    }}
                    fontFamily={styles.fontFamily}
                    fontSize="15px"
                    textColor={styles.textPrimary}
                    accentColor={styles.textAccent}
                    rows={currentPage.selectedStyle === 1 ? 3 : 5}
                    mainColors={['#f1f0eb', '#11ff49', '#9E9E9D', '#A79755']}
                    fontSizeOptions={currentPage.selectedStyle === 1 ? ['22px', '24px'] : ['13px', '14px', '15px']}
                  />
                </div>
              )}

              {/* Dynamic Paragraph Headers and Body Copies */}
              {currentPage.fields.paragraphHeaders?.map((header: any, index: number) => (
                <div 
                  key={header.id} 
                  className="space-y-3"
                  style={{ marginTop: index > 0 ? '32px' : '16px' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label 
                        className="font-['Inter:Medium',sans-serif]"
                        style={{ 
                          fontSize: '16px', 
                          fontWeight: '600',
                          color: '#11ff49' 
                        }}
                      >
                        Paragraph Header {index + 1}
                      </label>
                      <button
                        onClick={() => {
                          const newHeaders = currentPage.fields.paragraphHeaders?.filter((h: any) => h.id !== header.id) || [];
                          const newBodies = currentPage.fields.bodyCopies?.filter((b: any) => b.afterHeaderId !== header.id) || [];
                          setPages((prev: any) => {
                            const newPages = [...prev];
                            newPages[currentPageIndex] = {
                              ...newPages[currentPageIndex],
                              fields: {
                                ...newPages[currentPageIndex].fields,
                                paragraphHeaders: newHeaders,
                                bodyCopies: newBodies
                              }
                            };
                            return newPages;
                          });
                        }}
                        className="p-2 rounded-lg transition-all"
                        style={{
                          color: '#ff4444',
                          backgroundColor: 'transparent'
                        }}
                      >
                        <Trash2 size={18} strokeWidth={2} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={header.text}
                      onChange={(e) => {
                        const newHeaders = [...(currentPage.fields.paragraphHeaders || [])];
                        newHeaders[index] = { ...newHeaders[index], text: e.target.value };
                        updatePageField('paragraphHeaders', newHeaders);
                      }}
                      placeholder="The Digital Paper Trail"
                      className="w-full px-4 py-3 rounded-lg border"
                      style={{
                        backgroundColor: '#2a2a2a',
                        borderColor: '#3a3a3a',
                        color: '#11ff49',
                        fontSize: '15px'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label 
                      className="block mb-2 font-['Inter:Medium',sans-serif]"
                      style={{ 
                        fontSize: '16px', 
                        fontWeight: '600',
                        color: styles.textPrimary 
                      }}
                    >
                      Body Copy {currentPage.selectedStyle}-{index + 2}
                    </label>
                    <RichTextEditor
                      key={`body-copy-${currentPage.id}-${header.id}`}
                      value={currentPage.fields.bodyCopies?.find((b: any) => b.afterHeaderId === header.id)?.text || ''}
                      onChange={(value) => {
                        const newBodies = [...(currentPage.fields.bodyCopies || [])];
                        const bodyIndex = newBodies.findIndex((b: any) => b.afterHeaderId === header.id);
                        if (bodyIndex >= 0) {
                          newBodies[bodyIndex] = { 
                            id: newBodies[bodyIndex].id, 
                            afterHeaderId: header.id, 
                            text: value 
                          };
                        } else {
                          newBodies.push({
                            id: `body-${Date.now()}`,
                            afterHeaderId: header.id,
                            text: value
                          });
                        }
                        updatePageField('bodyCopies', newBodies);
                      }}
                      fontFamily={styles.fontFamily}
                      fontSize="15px"
                      textColor={styles.textPrimary}
                      accentColor={styles.textAccent}
                      rows={5}
                      mainColors={['#f1f0eb', '#11ff49', '#9E9E9D', '#A79755']}
                      fontSizeOptions={['13px', '14px', '15px']}
                    />
                  </div>
                </div>
              ))}

              {/* Add Paragraph Header Button */}
              {currentPage.selectedStyle !== 4 && (
                <button
                  onClick={() => {
                    const newHeader = {
                      id: `header-${Date.now()}`,
                      text: ''
                    };
                    const newHeaders = [...(currentPage.fields.paragraphHeaders || []), newHeader];
                    updatePageField('paragraphHeaders', newHeaders);
                  }}
                  className="w-full py-4 rounded-lg font-bold transition-all"
                  style={{
                    backgroundColor: 'transparent',
                    border: `2px solid #11ff49`,
                    color: '#11ff49',
                    fontSize: '16px',
                    textTransform: 'capitalize'
                  }}
                >
                  Add Paragraph Header
                </button>
              )}

              {/* Content Style 4 Caption Fields - Only show for Style 4 */}
              {currentPage.selectedStyle === 4 && (
                <>
                  <div style={{ marginTop: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <h3 
                        className="font-['Inter:SemiBold',sans-serif]"
                        style={{ fontSize: '18px', fontWeight: '600', color: '#11ff49', margin: 0 }}
                      >
                        Image 1 Caption
                      </h3>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={currentPage.fields?.showCaption1 !== false}
                          onChange={(e) => updatePageField('showCaption1', e.target.checked)}
                          className="w-5 h-5 cursor-pointer"
                          style={{ accentColor: '#11ff49' }}
                        />
                        <span 
                          className="font-['Inter:Medium',sans-serif]"
                          style={{ fontSize: '14px', fontWeight: '500', color: styles.textPrimary }}
                        >
                          Show
                        </span>
                      </label>
                    </div>

                    {currentPage.fields?.showCaption1 !== false && (
                      <>
                        <div style={{ marginBottom: '16px' }}>
                          <label 
                            className="block mb-2 font-['Inter:Medium',sans-serif]"
                            style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary }}
                          >
                            Caption Title
                          </label>
                          <input
                            type="text"
                            value={currentPage.fields?.caption1Title || ''}
                            onChange={(e) => updatePageField('caption1Title', e.target.value)}
                            placeholder="ARTWORK TITLE"
                            className="w-full px-4 py-3 rounded-lg border"
                            style={{
                              backgroundColor: '#2a2a2a',
                              borderColor: '#3a3a3a',
                              color: styles.textPrimary,
                              fontSize: '15px'
                            }}
                          />
                        </div>
                        <div>
                          <label 
                            className="block mb-2 font-['Inter:Medium',sans-serif]"
                            style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary }}
                          >
                            Caption Subtitle
                          </label>
                          <input
                            type="text"
                            value={currentPage.fields?.caption1Subtitle || ''}
                            onChange={(e) => updatePageField('caption1Subtitle', e.target.value)}
                            placeholder="Brief description"
                            className="w-full px-4 py-3 rounded-lg border"
                            style={{
                              backgroundColor: '#2a2a2a',
                              borderColor: '#3a3a3a',
                              color: styles.textPrimary,
                              fontSize: '15px'
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div style={{ marginTop: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <h3 
                        className="font-['Inter:SemiBold',sans-serif]"
                        style={{ fontSize: '18px', fontWeight: '600', color: '#11ff49', margin: 0 }}
                      >
                        Image 2 Caption
                      </h3>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={currentPage.fields?.showCaption2 !== false}
                          onChange={(e) => updatePageField('showCaption2', e.target.checked)}
                          className="w-5 h-5 cursor-pointer"
                          style={{ accentColor: '#11ff49' }}
                        />
                        <span 
                          className="font-['Inter:Medium',sans-serif]"
                          style={{ fontSize: '14px', fontWeight: '500', color: styles.textPrimary }}
                        >
                          Show
                        </span>
                      </label>
                    </div>

                    {currentPage.fields?.showCaption2 !== false && (
                      <>
                        <div style={{ marginBottom: '16px' }}>
                          <label 
                            className="block mb-2 font-['Inter:Medium',sans-serif]"
                            style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary }}
                          >
                            Caption Title
                          </label>
                          <input
                            type="text"
                            value={currentPage.fields?.caption2Title || ''}
                            onChange={(e) => updatePageField('caption2Title', e.target.value)}
                            placeholder="ARTWORK TITLE"
                            className="w-full px-4 py-3 rounded-lg border"
                            style={{
                              backgroundColor: '#2a2a2a',
                              borderColor: '#3a3a3a',
                              color: styles.textPrimary,
                              fontSize: '15px'
                            }}
                          />
                        </div>
                        <div>
                          <label 
                            className="block mb-2 font-['Inter:Medium',sans-serif]"
                            style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary }}
                          >
                            Caption Subtitle
                          </label>
                          <input
                            type="text"
                            value={currentPage.fields?.caption2Subtitle || ''}
                            onChange={(e) => updatePageField('caption2Subtitle', e.target.value)}
                            placeholder="Brief description"
                            className="w-full px-4 py-3 rounded-lg border"
                            style={{
                              backgroundColor: '#2a2a2a',
                              borderColor: '#3a3a3a',
                              color: styles.textPrimary,
                              fontSize: '15px'
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {/* Product Carousel Visibility Toggle */}
          {currentPage.styleType === 'cover' && (
            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#2a2a2a', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 
                    className="font-['Inter:SemiBold',sans-serif]"
                    style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, margin: 0 }}
                  >
                    Featured Products
                  </h3>
                  <p 
                    className="font-['Inter:Regular',sans-serif]"
                    style={{ fontSize: '13px', color: '#9e9e9d', marginTop: '4px' }}
                  >
                    Show product carousel in this article
                  </p>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={currentPage.hasFeaturedProducts !== false}
                    onChange={(e) => {
                      const newPages = [...pages];
                      const page = { ...newPages[currentPageIndex] };
                      page.hasFeaturedProducts = e.target.checked;
                      newPages[currentPageIndex] = page;
                      setPages(newPages);
                    }}
                    className="w-5 h-5 cursor-pointer"
                    style={{ accentColor: '#11ff49' }}
                  />
                  <span 
                    className="font-['Inter:Medium',sans-serif]"
                    style={{ fontSize: '14px', fontWeight: '500', color: styles.textPrimary }}
                  >
                    {currentPage.hasFeaturedProducts !== false ? 'On' : 'Off'}
                  </span>
                </label>
              </div>

              {currentPage.hasFeaturedProducts !== false && (
                <div style={{ marginTop: '16px' }}>
                  <label 
                    className="block mb-2 font-['Inter:Medium',sans-serif]"
                    style={{ fontSize: '13px', fontWeight: '600', color: '#9e9e9d', textTransform: 'uppercase' }}
                  >
                    Select Product Set
                  </label>
                  <div className="relative">
                    <select
                      value={currentPage.productSetId || ''}
                      onChange={(e) => {
                        const newPages = [...pages];
                        const page = { ...newPages[currentPageIndex] };
                        page.productSetId = e.target.value;
                        newPages[currentPageIndex] = page;
                        setPages(newPages);
                      }}
                      className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer font-['Inter:Medium',sans-serif]"
                      style={{
                        backgroundColor: '#2a2a2a',
                        borderColor: '#3a3a3a',
                        color: styles.textPrimary,
                        fontSize: '15px'
                      }}
                    >
                      <option value="">Select a product set...</option>
                      {productSets.map(set => (
                        <option key={set.id} value={set.id}>{set.name}</option>
                      ))}
                    </select>
                    <ChevronDown 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" 
                      size={20} 
                      style={{ color: '#9e9e9d' }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Style Tab */}
      {activeTab === 'style' && (
        <div className="space-y-5 pt-2">
          {/* COLORS SECTION */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                border: `2px solid ${styles.textAccent}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  backgroundColor: styles.textAccent 
                }} />
              </div>
              <h3
                className="font-['Inter:SemiBold',sans-serif]"
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: styles.textPrimary
                }}
              >
                Colors
              </h3>
            </div>

            {/* Background Color */}
            <div className="mb-4">
              <label
                className="block mb-2 font-['Inter:Medium',sans-serif]"
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#9e9e9d'
                }}
              >
                Background
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={styles.backgroundColor}
                  onChange={(e) => setStyles({ ...styles, backgroundColor: e.target.value })}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                  style={{
                    border: '1px solid #2a2a2a',
                    backgroundColor: '#2a2a2a'
                  }}
                />
                <input
                  type="text"
                  value={styles.backgroundColor}
                  onChange={(e) => setStyles({ ...styles, backgroundColor: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-lg border uppercase"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Primary Text Color */}
            <div className="mb-4">
              <label
                className="block mb-2 font-['Inter:Medium',sans-serif]"
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#9e9e9d'
                }}
              >
                Primary Text
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={styles.textPrimary}
                  onChange={(e) => setStyles({ ...styles, textPrimary: e.target.value })}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                  style={{
                    border: '1px solid #2a2a2a',
                    backgroundColor: '#2a2a2a'
                  }}
                />
                <input
                  type="text"
                  value={styles.textPrimary}
                  onChange={(e) => setStyles({ ...styles, textPrimary: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-lg border uppercase"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Accent Color */}
            <div className="mb-4">
              <label
                className="block mb-2 font-['Inter:Medium',sans-serif]"
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#9e9e9d'
                }}
              >
                Accent Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={styles.textAccent}
                  onChange={(e) => setStyles({ ...styles, textAccent: e.target.value })}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                  style={{
                    border: '1px solid #2a2a2a',
                    backgroundColor: '#2a2a2a'
                  }}
                />
                <input
                  type="text"
                  value={styles.textAccent}
                  onChange={(e) => setStyles({ ...styles, textAccent: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-lg border uppercase"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Secondary Colours Header */}
            <div 
              className="mb-2 font-['Inter:Medium',sans-serif]"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#9e9e9d'
              }}
            >
              Secondary Colours
            </div>

            {/* Secondary Color 1 */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={styles.secondaryColor1}
                  onChange={(e) => setStyles({ ...styles, secondaryColor1: e.target.value })}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                  style={{
                    border: '1px solid #2a2a2a',
                    backgroundColor: '#2a2a2a'
                  }}
                />
                <input
                  type="text"
                  value={styles.secondaryColor1}
                  onChange={(e) => setStyles({ ...styles, secondaryColor1: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-lg border uppercase"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Secondary Color 2 */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={styles.secondaryColor2}
                  onChange={(e) => setStyles({ ...styles, secondaryColor2: e.target.value })}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                  style={{
                    border: '1px solid #2a2a2a',
                    backgroundColor: '#2a2a2a'
                  }}
                />
                <input
                  type="text"
                  value={styles.secondaryColor2}
                  onChange={(e) => setStyles({ ...styles, secondaryColor2: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-lg border uppercase"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* TYPOGRAPHY SECTION */}
          <div className="pt-4 border-t" style={{ borderColor: '#2a2a2a' }}>
            <div className="flex items-center gap-2 mb-4">
              <span style={{ fontSize: '20px', color: styles.textAccent }}>T</span>
              <h3
                className="font-['Inter:SemiBold',sans-serif]"
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: styles.textPrimary
                }}
              >
                Typography
              </h3>
            </div>

            {/* Font Family */}
            <div className="mb-4">
              <label
                className="block mb-2 font-['Inter:Medium',sans-serif]"
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#9e9e9d'
                }}
              >
                Font Family
              </label>
              <div className="space-y-2">
                <div
                  className="px-4 py-3 rounded-lg border"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                >
                  Inter
                </div>
                <div
                  className="px-4 py-3 rounded-lg border"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px',
                    fontFamily: 'Humane, sans-serif'
                  }}
                >
                  Humane
                </div>
              </div>
            </div>

            {/* Cover Title Size & Weight */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#9e9e9d'
                  }}
                >
                  Cover Title Size
                </label>
                <select
                  value={styles.coverTitleSize}
                  onChange={(e) => setStyles({ ...styles, coverTitleSize: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                >
                  <option value="40px">40px</option>
                  <option value="50px">50px</option>
                  <option value="60px">60px</option>
                  <option value="70px">70px</option>
                  <option value="80px">80px</option>
                </select>
              </div>
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#9e9e9d'
                  }}
                >
                  Cover Title Weight
                </label>
                <select
                  value={styles.coverTitleWeight}
                  onChange={(e) => setStyles({ ...styles, coverTitleWeight: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                >
                  <option value="100">Thin (100)</option>
                  <option value="200">Extra Light (200)</option>
                  <option value="300">Light (300)</option>
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semi Bold (600)</option>
                  <option value="700">Bold (700)</option>
                </select>
              </div>
            </div>

            {/* Headline Size & Weight */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#9e9e9d'
                  }}
                >
                  Headline Size
                </label>
                <select
                  value={styles.headlineSize}
                  onChange={(e) => setStyles({ ...styles, headlineSize: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                >
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                  <option value="22px">22px</option>
                  <option value="24px">24px</option>
                </select>
              </div>
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#9e9e9d'
                  }}
                >
                  Headline Weight
                </label>
                <select
                  value={styles.headlineWeight}
                  onChange={(e) => setStyles({ ...styles, headlineWeight: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                >
                  <option value="100">Thin (100)</option>
                  <option value="200">Extra Light (200)</option>
                  <option value="300">Light (300)</option>
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semi Bold (600)</option>
                  <option value="700">Bold (700)</option>
                </select>
              </div>
            </div>

            {/* Author Size & Weight */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#9e9e9d'
                  }}
                >
                  Author Size
                </label>
                <select
                  value={styles.authorSize}
                  onChange={(e) => setStyles({ ...styles, authorSize: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                >
                  <option value="11px">11px</option>
                  <option value="12px">12px</option>
                  <option value="13px">13px</option>
                  <option value="14px">14px</option>
                  <option value="15px">15px</option>
                </select>
              </div>
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#9e9e9d'
                  }}
                >
                  Author Weight
                </label>
                <select
                  value={styles.authorWeight}
                  onChange={(e) => setStyles({ ...styles, authorWeight: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                >
                  <option value="100">Thin (100)</option>
                  <option value="200">Extra Light (200)</option>
                  <option value="300">Light (300)</option>
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semi Bold (600)</option>
                  <option value="700">Bold (700)</option>
                </select>
              </div>
            </div>

            {/* Description Size & Weight */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#9e9e9d'
                  }}
                >
                  Description Size
                </label>
                <select
                  value={styles.descriptionSize}
                  onChange={(e) => setStyles({ ...styles, descriptionSize: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                >
                  <option value="13px">13px</option>
                  <option value="14px">14px</option>
                  <option value="15px">15px</option>
                  <option value="16px">16px</option>
                  <option value="17px">17px</option>
                </select>
              </div>
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#9e9e9d'
                  }}
                >
                  Description Weight
                </label>
                <select
                  value={styles.descriptionWeight}
                  onChange={(e) => setStyles({ ...styles, descriptionWeight: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                >
                  <option value="100">Thin (100)</option>
                  <option value="200">Extra Light (200)</option>
                  <option value="300">Light (300)</option>
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semi Bold (600)</option>
                  <option value="700">Bold (700)</option>
                </select>
              </div>
            </div>

            {/* Icon Count Size */}
            <div className="mb-4">
              <label
                className="block mb-2 font-['Inter:Medium',sans-serif]"
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#9e9e9d'
                }}
              >
                Icon Count Size
              </label>
              <select
                value={styles.iconCountSize}
                onChange={(e) => setStyles({ ...styles, iconCountSize: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer"
                style={{
                  backgroundColor: '#2a2a2a',
                  borderColor: '#3a3a3a',
                  color: styles.textPrimary,
                  fontSize: '14px'
                }}
              >
                <option value="8px">8px</option>
                <option value="9px">9px</option>
                <option value="10px">10px</option>
                <option value="11px">11px</option>
                <option value="12px">12px</option>
              </select>
            </div>

            {/* Top Label Size & Weight */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#9e9e9d'
                  }}
                >
                  Top Label Size
                </label>
                <select
                  value={styles.topLabelSize}
                  onChange={(e) => setStyles({ ...styles, topLabelSize: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                >
                  <option value="10px">10px</option>
                  <option value="11px">11px</option>
                  <option value="12px">12px</option>
                  <option value="13px">13px</option>
                  <option value="14px">14px</option>
                </select>
              </div>
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#9e9e9d'
                  }}
                >
                  Top Label Weight
                </label>
                <select
                  value={styles.topLabelWeight}
                  onChange={(e) => setStyles({ ...styles, topLabelWeight: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                >
                  <option value="100">Thin (100)</option>
                  <option value="200">Extra Light (200)</option>
                  <option value="300">Light (300)</option>
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semi Bold (600)</option>
                  <option value="700">Bold (700)</option>
                </select>
              </div>
            </div>

            {/* Intro Font Size & Weight */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#9e9e9d'
                  }}
                >
                  Intro Font Size
                </label>
                <select
                  value={styles.introFontSize}
                  onChange={(e) => setStyles({ ...styles, introFontSize: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                >
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                  <option value="22px">22px</option>
                  <option value="24px">24px</option>
                </select>
              </div>
              <div>
                <label
                  className="block mb-2 font-['Inter:Medium',sans-serif]"
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#9e9e9d'
                  }}
                >
                  Intro Weight
                </label>
                <select
                  value={styles.introWeight}
                  onChange={(e) => setStyles({ ...styles, introWeight: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border appearance-none cursor-pointer"
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderColor: '#3a3a3a',
                    color: styles.textPrimary,
                    fontSize: '14px'
                  }}
                >
                  <option value="100">Thin (100)</option>
                  <option value="200">Extra Light (200)</option>
                  <option value="300">Light (300)</option>
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semi Bold (600)</option>
                  <option value="700">Bold (700)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Buttons */}
      <div className="pt-6 border-t mt-6" style={{ borderColor: '#f1f0eb' }}>
        <div className="flex gap-3">
          {/* Add New Page Button */}
          <button
            onClick={() => {
              setMobilePropertiesOpen(false);
              setTimeout(() => {
                setShowStyleModal(true);
              }, 350);
            }}
            className="flex-1 py-3 rounded-lg font-semibold transition-all active:scale-95"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #a79755',
              color: '#a79755',
              fontSize: '15px',
              fontFamily: `'${styles.fontFamily}',sans-serif`
            }}
          >
            + Add New Page
          </button>

          {/* Save Page Button */}
          <button
            onClick={onSaveToLibrary}
            className="flex-1 py-3 rounded-lg font-semibold transition-all active:scale-95"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #a79755',
              color: '#a79755',
              fontSize: '15px',
              fontFamily: `'${styles.fontFamily}',sans-serif`
            }}
          >
            Save Page
          </button>
        </div>
      </div>
    </div>
  );
}
