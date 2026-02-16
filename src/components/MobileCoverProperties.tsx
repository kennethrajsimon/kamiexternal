'use client';

import { ChevronDown, X, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';
import { MobileImageUploader } from './MobileImageUploader';
import CoverThumbnailFeatureArticleColour from '../imports/CoverThumbnailFeatureArticleColour';
import CoverThumbnailFeatureArticleBw from '../imports/CoverThumbnailFeatureArticleBw';
import CoverThumbnailCreatorSpotlight from '../imports/CoverThumbnailCreatorSpotlight';
import CoverThumbnailAnnouncement from '../imports/CoverThumbnailAnnouncement1';

interface MobileCoverPropertiesProps {
  coverData: any;
  currentPage: any;
  updatePageField: (field: string, value: any) => void;
  updatePageImage: (field: string, value: any) => void;
  updatePageImageFit: (field: string, value: any) => void;
  updatePageSelectedStyle: (value: number) => void;
  styles: any;
  setShowStyleModal: (show: boolean) => void;
  getStyleLabel: () => string;
  savePage: () => void;
  currentPageIndex: number;
  pages: any[];
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  deletePage: () => void;
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
  productSets: any[];
  updatePageRoot: (key: string, value: any) => void;
}

const coverTemplates = [
  { 
    id: 'colour',
    name: 'Feature Article Colour',
    component: CoverThumbnailFeatureArticleColour,
    value: 1
  },
  { 
    id: 'bw',
    name: 'Feature Article BW',
    component: CoverThumbnailFeatureArticleBw,
    value: 2
  },
  { 
    id: 'spotlight',
    name: 'Creator Spotlight',
    component: CoverThumbnailCreatorSpotlight,
    value: 3
  },
  { 
    id: 'announcement',
    name: 'Announcement',
    component: CoverThumbnailAnnouncement,
    value: 4
  }
];

export function MobileCoverProperties({
  coverData,
  currentPage,
  updatePageField,
  updatePageImage,
  updatePageImageFit,
  updatePageSelectedStyle,
  styles,
  setShowStyleModal,
  getStyleLabel,
  savePage,
  currentPageIndex,
  pages,
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
  productSets,
  updatePageRoot
}: MobileCoverPropertiesProps) {
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const currentTemplate = coverTemplates.find(t => t.value === coverData.selectedStyle) || coverTemplates[0];

  return (
    <div className="space-y-4 pb-8">
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
          Cover
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
            className="px-3 py-2 rounded-[6px]"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a'
            }}
          >
            <span
              className="font-['Inter:Medium',sans-serif]"
              style={{
                fontSize: '13px',
                color: '#9e9e9d',
                fontWeight: '500'
              }}
            >
              {currentPageIndex + 1} / {pages.length}
            </span>
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
            onClick={deletePage}
            className="w-[36px] h-[36px] rounded-[6px] flex items-center justify-center transition-all active:scale-95"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a'
            }}
          >
            <Trash2 size={16} style={{ color: '#9e9e9d' }} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ALL PAGES Thumbnail Navigation */}
      <div className="mb-4">
        <div
          className="mb-3 font-['Inter:SemiBold',sans-serif]"
          style={{
            fontSize: '11px',
            color: '#9e9e9d',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}
        >
          ALL PAGES ({pages.length})
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => setCurrentPageIndex(index)}
              className="flex-shrink-0 rounded-lg transition-all active:scale-95 px-4 py-2"
              style={{
                backgroundColor: currentPageIndex === index ? styles.textAccent : '#2a2a2a',
                border: `1px solid ${currentPageIndex === index ? styles.textAccent : '#3a3a3a'}`,
                fontFamily: `'${styles.fontFamily}',sans-serif`,
                fontSize: '13px',
                fontWeight: '600',
                color: currentPageIndex === index ? '#1a1a1a' : '#9e9e9d'
              }}
            >
              {page.styleType === 'cover' ? 'COVER' : `PAGE ${index}`}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Article Button */}
      <button
        onClick={() => {
          setMobilePropertiesOpen(false);
          setTimeout(() => {
            setIsReadingMode(true);
          }, 350);
        }}
        className="w-full py-3 rounded-lg font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 mb-4"
        style={{
          backgroundColor: styles.textAccent,
          color: '#1a1a1a',
          fontSize: '15px'
        }}
      >
        <Eye size={18} strokeWidth={2.5} />
        PREVIEW ARTICLE
      </button>

      {/* EFX Visual Effects */}
      <div className="mb-4">
        <div
          className="mb-3 font-['Inter:SemiBold',sans-serif]"
          style={{
            fontSize: '11px',
            color: '#9e9e9d',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}
        >
          EFX
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {/* Glitch */}
          <button
            onClick={() => setEfxGlitch(!efxGlitch)}
            className="flex-shrink-0 px-4 py-2 rounded-lg transition-all active:scale-95 font-semibold"
            style={{
              backgroundColor: efxGlitch ? '#ff00ff' : '#2a2a2a',
              border: efxGlitch ? '1px solid #ff00ff' : '1px solid #3a3a3a',
              color: efxGlitch ? '#1a1a1a' : '#9e9e9d',
              fontSize: '12px'
            }}
          >
            GLITCH
          </button>

          {/* Blur */}
          <button
            onClick={() => setEfxBlur(!efxBlur)}
            className="flex-shrink-0 px-4 py-2 rounded-lg transition-all active:scale-95 font-semibold"
            style={{
              backgroundColor: efxBlur ? '#ff00ff' : '#2a2a2a',
              border: efxBlur ? '1px solid #ff00ff' : '1px solid #3a3a3a',
              color: efxBlur ? '#1a1a1a' : '#9e9e9d',
              fontSize: '12px'
            }}
          >
            BLUR
          </button>

          {/* Chrom */}
          <button
            onClick={() => setEfxChromatic(!efxChromatic)}
            className="flex-shrink-0 px-4 py-2 rounded-lg transition-all active:scale-95 font-semibold"
            style={{
              backgroundColor: efxChromatic ? '#ff00ff' : '#2a2a2a',
              border: efxChromatic ? '1px solid #ff00ff' : '1px solid #3a3a3a',
              color: efxChromatic ? '#1a1a1a' : '#9e9e9d',
              fontSize: '12px'
            }}
          >
            CHROM
          </button>

          {/* Shake */}
          <button
            onClick={() => setEfxShake(!efxShake)}
            className="flex-shrink-0 px-4 py-2 rounded-lg transition-all active:scale-95 font-semibold"
            style={{
              backgroundColor: efxShake ? '#ff00ff' : '#2a2a2a',
              border: efxShake ? '1px solid #ff00ff' : '1px solid #3a3a3a',
              color: efxShake ? '#1a1a1a' : '#9e9e9d',
              fontSize: '12px'
            }}
          >
            SHAKE
          </button>

          {/* Distort */}
          <button
            onClick={() => setEfxDistort(!efxDistort)}
            className="flex-shrink-0 px-4 py-2 rounded-lg transition-all active:scale-95 font-semibold"
            style={{
              backgroundColor: efxDistort ? '#ff00ff' : '#2a2a2a',
              border: efxDistort ? '1px solid #ff00ff' : '1px solid #3a3a3a',
              color: efxDistort ? '#1a1a1a' : '#9e9e9d',
              fontSize: '12px'
            }}
          >
            DISTORT
          </button>
        </div>
      </div>

      {/* Cover Template Selection */}
      <div>
        <label 
          className="block mb-3 font-['Inter:Medium',sans-serif] font-medium"
          style={{
            fontSize: '13px',
            color: '#9e9e9d',
            letterSpacing: '0.3px'
          }}
        >
          COVER TEMPLATE
        </label>
        
        <button
          onClick={() => setShowTemplateSelector(!showTemplateSelector)}
          className="w-full flex items-center justify-between p-4 rounded-lg transition-all active:scale-98"
          style={{
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a'
          }}
        >
          <span 
            className="font-['Inter:Medium',sans-serif] font-medium"
            style={{
              fontSize: '14px',
              color: styles.textPrimary
            }}
          >
            {currentTemplate.name}
          </span>
          <ChevronDown 
            size={18} 
            color="#9e9e9d"
            style={{
              transform: showTemplateSelector ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}
          />
        </button>

        {/* Template Dropdown */}
        {showTemplateSelector && (
          <div 
            className="mt-2 rounded-lg overflow-hidden"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a'
            }}
          >
            {coverTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  console.log('Template clicked:', template.name, 'value:', template.value);
                  updatePageSelectedStyle(template.value);
                  setShowTemplateSelector(false);
                }}
                className="w-full p-4 text-left transition-all active:scale-98"
                style={{
                  backgroundColor: coverData.selectedStyle === template.value ? '#3a3a3a' : 'transparent',
                  borderBottom: '1px solid #3a3a3a',
                  color: coverData.selectedStyle === template.value ? styles.textAccent : styles.textPrimary,
                  fontSize: '14px'
                }}
              >
                {template.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Hero Image with Toggle */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label 
            className="font-['Inter:SemiBold',sans-serif] font-semibold"
            style={{ fontSize: '14px', color: styles.textPrimary }}
          >
            Hero Image
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={currentPage.fields.showHeroImage !== false}
              onChange={(e) => updatePageField('showHeroImage', e.target.checked)}
              className="w-4 h-4"
              style={{ accentColor: styles.textAccent }}
            />
            <span 
              className="font-['Inter:Regular',sans-serif]"
              style={{ fontSize: '12px', color: styles.textPrimary }}
            >
              Show Hero Image
            </span>
          </label>
        </div>

        <MobileImageUploader
          value={currentPage.images.coverImage || ''}
          onChange={(url) => updatePageImage('coverImage', url)}
          accentColor={styles.textAccent}
          fontFamily={styles.fontFamily}
          objectFit={currentPage.imageFits.coverImageFit || 'cover'}
          onObjectFitChange={(fit) => updatePageImageFit('coverImageFit', fit)}
          customDetailText={currentPage.selectedStyle === 4 ? "Recommended size is 400 x 400 pixels" : "Transparent PNG or gif recommended.\\nFull size is 717 (W) x 750 (H) pixels"}
        />
      </div>

      {/* Second Image - Only for Announcement style */}
      {currentPage.selectedStyle === 4 && (
        <div>
          <label 
            className="block mb-3 font-['Inter:SemiBold',sans-serif] font-semibold"
            style={{ fontSize: '14px', color: styles.textPrimary }}
          >
            Second Image
          </label>
          <MobileImageUploader
            value={currentPage.images.coverImage2 || ''}
            onChange={(url) => updatePageImage('coverImage2', url)}
            accentColor={styles.textAccent}
            fontFamily={styles.fontFamily}
            objectFit={currentPage.imageFits.coverImageFit2 || 'cover'}
            onObjectFitChange={(fit) => updatePageImageFit('coverImageFit2', fit)}
            customDetailText="Recommended size is 400 x 400 pixels"
          />
        </div>
      )}

      {/* Category */}
      <div>
        <label 
          className="block mb-3 font-['Inter:SemiBold',sans-serif] font-semibold"
          style={{ fontSize: '14px', color: styles.textAccent }}
        >
          Category
        </label>
        <input
          type="text"
          value={currentPage.fields.coverCategory || ''}
          onChange={(e) => updatePageField('coverCategory', e.target.value.toUpperCase())}
          placeholder="CATEGORY TYPE"
          className="w-full px-4 py-3 rounded-lg uppercase"
          style={{
            fontFamily: `'${styles.fontFamily}',sans-serif`,
            fontSize: '14px',
            fontWeight: '300',
            backgroundColor: '#2a2a2a',
            border: '1px solid #2a2a2a',
            color: '#11ff49'
          }}
        />
      </div>

      {/* Title */}
      <div>
        <label 
          className="block mb-3 font-['Inter:SemiBold',sans-serif] font-semibold"
          style={{ fontSize: '14px', color: styles.textPrimary }}
        >
          Title
        </label>
        <textarea
          value={currentPage.fields.coverTitle || ''}
          onChange={(e) => updatePageField('coverTitle', e.target.value.toUpperCase())}
          placeholder="ENTER HEADLINE HERE"
          rows={4}
          className="w-full px-4 py-3 rounded-lg uppercase"
          style={{
            fontFamily: `'${styles.fontFamily}',sans-serif`,
            fontSize: '14px',
            fontWeight: '300',
            backgroundColor: '#2a2a2a',
            border: '1px solid #2a2a2a',
            color: '#f1f0eb',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Icon Counts */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label 
            className="block mb-3 font-['Inter:SemiBold',sans-serif] font-semibold"
            style={{ fontSize: '14px', color: styles.textPrimary }}
          >
            Icon Count 1
          </label>
          <input
            type="text"
            value={currentPage.fields.coverIconCount1 || ''}
            onChange={(e) => updatePageField('coverIconCount1', e.target.value)}
            placeholder="1.2M"
            className="w-full px-4 py-3 rounded-lg"
            style={{
              fontFamily: `'${styles.fontFamily}',sans-serif`,
              fontSize: '14px',
              backgroundColor: '#2a2a2a',
              border: '1px solid #2a2a2a',
              color: styles.textPrimary
            }}
          />
        </div>
        <div>
          <label 
            className="block mb-3 font-['Inter:SemiBold',sans-serif] font-semibold"
            style={{ fontSize: '14px', color: styles.textPrimary }}
          >
            Icon Count 2
          </label>
          <input
            type="text"
            value={currentPage.fields.coverIconCount2 || ''}
            onChange={(e) => updatePageField('coverIconCount2', e.target.value)}
            placeholder="847K"
            className="w-full px-4 py-3 rounded-lg"
            style={{
              fontFamily: `'${styles.fontFamily}',sans-serif`,
              fontSize: '14px',
              backgroundColor: '#2a2a2a',
              border: '1px solid #2a2a2a',
              color: styles.textPrimary
            }}
          />
        </div>
      </div>

      {/* Background Color with Toggle */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label 
            className="font-['Inter:SemiBold',sans-serif] font-semibold"
            style={{ fontSize: '14px', color: styles.textPrimary }}
          >
            Background Colour
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={currentPage.fields.showBackgroundColor !== false}
              onChange={(e) => updatePageField('showBackgroundColor', e.target.checked)}
              className="w-4 h-4"
              style={{ accentColor: styles.textAccent }}
            />
            <span 
              className="font-['Inter:Regular',sans-serif]"
              style={{ fontSize: '12px', color: styles.textPrimary }}
            >
              Show Background Color
            </span>
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={currentPage.fields.coverBackgroundColor || '#1a1a1a'}
            onChange={(e) => updatePageField('coverBackgroundColor', e.target.value)}
            className="w-14 h-10 rounded-lg cursor-pointer"
            style={{
              border: '1px solid #2a2a2a',
              backgroundColor: '#2a2a2a'
            }}
          />
          <input
            type="text"
            value={currentPage.fields.coverBackgroundColor || '#1a1a1a'}
            onChange={(e) => updatePageField('coverBackgroundColor', e.target.value)}
            placeholder="#1a1a1a"
            className="flex-1 px-4 py-3 rounded-lg"
            style={{
              fontFamily: `'${styles.fontFamily}',sans-serif`,
              fontSize: '14px',
              backgroundColor: '#2a2a2a',
              border: '1px solid #2a2a2a',
              color: styles.textPrimary
            }}
          />
        </div>
      </div>

      {/* Background Image Upload */}
      <div>
        <label 
          className="block mb-3 font-['Inter:SemiBold',sans-serif] font-semibold"
          style={{ fontSize: '14px', color: styles.textPrimary }}
        >
          Background Image
        </label>
        <MobileImageUploader
          value={currentPage.images.coverBackgroundImage || ''}
          onChange={(url) => updatePageImage('coverBackgroundImage', url)}
          accentColor={styles.textAccent}
          fontFamily={styles.fontFamily}
          objectFit={currentPage.imageFits.coverBackgroundImageFit || 'cover'}
          onObjectFitChange={(fit) => updatePageImageFit('coverBackgroundImageFit', fit)}
          customDetailText="Recommended size is 1512 x 851 pixels"
        />
      </div>

      {/* Background Text - Only for Feature Article Colour and BW */}
      {(currentPage.selectedStyle === 1 || currentPage.selectedStyle === 2) && (
        <>
          <div>
            <div className="flex justify-between items-center mb-3">
              <label 
                className="font-['Inter:SemiBold',sans-serif] font-semibold"
                style={{ fontSize: '14px', color: styles.textPrimary }}
              >
                Background Text
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentPage.fields.showBackgroundText !== false}
                  onChange={(e) => updatePageField('showBackgroundText', e.target.checked)}
                  className="w-4 h-4"
                  style={{ accentColor: styles.textAccent }}
                />
                <span 
                  className="font-['Inter:Regular',sans-serif]"
                  style={{ fontSize: '12px', color: styles.textPrimary }}
                >
                  Show Background Text
                </span>
              </label>
            </div>
            <input
              type="text"
              value={currentPage.fields.coverBackgroundText || ''}
              onChange={(e) => updatePageField('coverBackgroundText', e.target.value.toUpperCase())}
              placeholder={currentPage.selectedStyle === 1 ? 'FIGHTING!' : 'BUTTERFLY'}
              className="w-full px-4 py-3 rounded-lg uppercase"
              style={{
                fontFamily: `'${styles.fontFamily}',sans-serif`,
                fontSize: '14px',
                backgroundColor: '#2a2a2a',
                border: '1px solid #2a2a2a',
                color: styles.textPrimary
              }}
            />
          </div>

          {/* Background Text Color */}
          <div>
            <label 
              className="block mb-3 font-['Inter:SemiBold',sans-serif] font-semibold"
              style={{ fontSize: '14px', color: styles.textPrimary }}
            >
              Background Text Colour
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={currentPage.fields.coverBackgroundTextColor || '#fb00b8'}
                onChange={(e) => updatePageField('coverBackgroundTextColor', e.target.value)}
                className="w-14 h-10 rounded-lg cursor-pointer"
                style={{
                  border: '1px solid #2a2a2a',
                  backgroundColor: '#2a2a2a'
                }}
              />
              <input
                type="text"
                value={currentPage.fields.coverBackgroundTextColor || '#fb00b8'}
                onChange={(e) => updatePageField('coverBackgroundTextColor', e.target.value)}
                placeholder="#fb00b8"
                className="flex-1 px-4 py-3 rounded-lg"
                style={{
                  fontFamily: `'${styles.fontFamily}',sans-serif`,
                  fontSize: '14px',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #2a2a2a',
                  color: styles.textPrimary
                }}
              />
            </div>
          </div>

          {/* Background Text Style - Fill or Stroke */}
          <div>
            <label 
              className="block mb-3 font-['Inter:SemiBold',sans-serif] font-semibold"
              style={{ fontSize: '14px', color: styles.textPrimary }}
            >
              Background Text Style
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => updatePageField('coverBackgroundTextStyle', 'fill')}
                className="flex-1 py-3 rounded-lg transition-all active:scale-95"
                style={{
                  backgroundColor: (currentPage.fields.coverBackgroundTextStyle || 'fill') === 'fill' ? styles.textAccent : '#2a2a2a',
                  border: `1px solid ${(currentPage.fields.coverBackgroundTextStyle || 'fill') === 'fill' ? styles.textAccent : '#3a3a3a'}`,
                  color: (currentPage.fields.coverBackgroundTextStyle || 'fill') === 'fill' ? '#1a1a1a' : styles.textPrimary,
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                Fill
              </button>
              <button
                onClick={() => updatePageField('coverBackgroundTextStyle', 'stroke')}
                className="flex-1 py-3 rounded-lg transition-all active:scale-95"
                style={{
                  backgroundColor: currentPage.fields.coverBackgroundTextStyle === 'stroke' ? styles.textAccent : '#2a2a2a',
                  border: `1px solid ${currentPage.fields.coverBackgroundTextStyle === 'stroke' ? styles.textAccent : '#3a3a3a'}`,
                  color: currentPage.fields.coverBackgroundTextStyle === 'stroke' ? '#1a1a1a' : styles.textPrimary,
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                Stroke
              </button>
            </div>
          </div>
        </>
      )}

      {/* Featured Products Section */}
      <div className="space-y-3 pt-4 border-t border-[#333]">
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-medium text-[#f1f0eb]">Featured Products</label>
          <button
            onClick={() => {
              const newValue = !currentPage.hasFeaturedProducts;
              // We need to update the page object directly
              updatePageRoot('hasFeaturedProducts', newValue);
            }}
            className={`w-10 h-6 rounded-full relative transition-colors ${
              currentPage.hasFeaturedProducts ? 'bg-[#11ff49]' : 'bg-[#333]'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                currentPage.hasFeaturedProducts ? 'left-5' : 'left-1'
              }`}
            />
          </button>
        </div>
        
        {currentPage.hasFeaturedProducts && (
          <div className="space-y-2">
            <label className="text-[11px] font-medium text-[#888]">Select Product Set</label>
            <select
              value={currentPage.productSetId || ''}
              onChange={(e) => updatePageRoot('productSetId', e.target.value)}
              className="w-full h-10 bg-[#1a1a1a] border border-[#333] rounded-lg px-3 text-[13px] text-white focus:outline-none focus:border-[#555]"
            >
              <option value="">Select a set...</option>
              {productSets.map((set) => (
                <option key={set.id} value={set.id}>
                  {set.name} ({set.products?.length || 0} products)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="border-t pt-6 mt-6" style={{ borderColor: '#f1f0eb' }}>
        <div className="flex gap-3">
          <button
            onClick={() => setShowStyleModal(true)}
            className="flex-1 py-3 rounded-lg transition-all active:scale-95"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #a79755',
              color: '#a79755',
              fontSize: '15px',
              fontWeight: '600',
              fontFamily: `'${styles.fontFamily}',sans-serif`
            }}
          >
            + Add New Page
          </button>

          <button
            onClick={savePage}
            className="flex-1 py-3 rounded-lg transition-all active:scale-95"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #a79755',
              color: '#a79755',
              fontSize: '15px',
              fontWeight: '600',
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