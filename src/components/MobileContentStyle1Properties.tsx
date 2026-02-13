'use client';

import { ChevronDown, X, Trash2, Eye, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { MobileImageUploader } from './MobileImageUploader';
import { RichTextEditor } from './RichTextEditor';

interface MobileContentStyle1PropertiesProps {
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
  setPages: (pages: any) => void;
}

const contentStyleOptions = [
  { value: 1, label: 'Content Style 1' },
  { value: 2, label: 'Content Style 2' },
  { value: 3, label: 'Content Style 3' },
  { value: 4, label: 'Content Style 4' }
];

export function MobileContentStyle1Properties({
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
  setPages
}: MobileContentStyle1PropertiesProps) {
  const [showStyleSelector, setShowStyleSelector] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');

  const currentStyleOption = contentStyleOptions.find(s => s.value === currentPage.selectedStyle) || contentStyleOptions[0];

  return (
    <div className="space-y-6 pb-24">
      {/* Page Header with Title and Navigation */}
      <div className="flex items-center justify-between">
        <h2
          className="font-['Inter:SemiBold',sans-serif]"
          style={{
            fontSize: '32px',
            color: '#a79755',
            fontWeight: '600',
            letterSpacing: '-0.02em'
          }}
        >
          PAGE {currentPageIndex}
        </h2>
        <div className="flex items-center gap-2">
          {/* Previous Page Button */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPageIndex === 0}
            className="w-[44px] h-[44px] rounded-[8px] flex items-center justify-center transition-all disabled:opacity-30 active:scale-95"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a'
            }}
          >
            <span style={{ color: '#9e9e9d', fontSize: '18px' }}>←</span>
          </button>

          {/* Page Counter */}
          <div
            className="px-4 py-2 rounded-[8px]"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a'
            }}
          >
            <span
              className="font-['Inter:Medium',sans-serif]"
              style={{
                fontSize: '15px',
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
            className="w-[44px] h-[44px] rounded-[8px] flex items-center justify-center transition-all disabled:opacity-30 active:scale-95"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a'
            }}
          >
            <span style={{ color: '#9e9e9d', fontSize: '18px' }}>→</span>
          </button>

          {/* Delete Page Button */}
          <button
            onClick={deletePage}
            className="w-[44px] h-[44px] rounded-[8px] flex items-center justify-center transition-all active:scale-95"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a'
            }}
          >
            <Trash2 size={18} style={{ color: '#9e9e9d' }} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', backgroundColor: '#3a3a3a' }} />

      {/* ALL PAGES Thumbnail Navigation */}
      <div>
        <div
          className="mb-3 font-['Inter:SemiBold',sans-serif]"
          style={{
            fontSize: '11px',
            color: '#9e9e9d',
            fontWeight: '600',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}
        >
          ALL PAGES ({pages.length})
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => setCurrentPageIndex(index)}
              className="flex-shrink-0 rounded-lg transition-all active:scale-95 px-5 py-3"
              style={{
                backgroundColor: currentPageIndex === index ? '#11ff49' : '#2a2a2a',
                border: `1px solid ${currentPageIndex === index ? '#11ff49' : '#3a3a3a'}`,
                fontFamily: `'Inter',sans-serif`,
                fontSize: '14px',
                fontWeight: '600',
                color: currentPageIndex === index ? '#1a1a1a' : '#9e9e9d',
                textTransform: 'uppercase'
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
        className="w-full py-4 rounded-lg font-semibold transition-all active:scale-95 flex items-center justify-center gap-3"
        style={{
          backgroundColor: '#11ff49',
          color: '#1a1a1a',
          fontSize: '16px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.02em'
        }}
      >
        <Eye size={20} strokeWidth={2.5} />
        PREVIEW ARTICLE
      </button>

      {/* EFX Visual Effects */}
      <div>
        <div
          className="mb-3 font-['Inter:SemiBold',sans-serif]"
          style={{
            fontSize: '11px',
            color: '#9e9e9d',
            fontWeight: '600',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}
        >
          EFX
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {/* Glitch */}
          <button
            onClick={() => setEfxGlitch(!efxGlitch)}
            className="flex-shrink-0 px-5 py-3 rounded-lg transition-all active:scale-95 font-bold"
            style={{
              backgroundColor: efxGlitch ? '#ff00ff' : '#2a2a2a',
              border: efxGlitch ? '1px solid #ff00ff' : '1px solid #3a3a3a',
              color: efxGlitch ? '#1a1a1a' : '#9e9e9d',
              fontSize: '13px',
              textTransform: 'uppercase'
            }}
          >
            GLITCH
          </button>

          {/* Blur */}
          <button
            onClick={() => setEfxBlur(!efxBlur)}
            className="flex-shrink-0 px-5 py-3 rounded-lg transition-all active:scale-95 font-bold"
            style={{
              backgroundColor: efxBlur ? '#ff00ff' : '#2a2a2a',
              border: efxBlur ? '1px solid #ff00ff' : '1px solid #3a3a3a',
              color: efxBlur ? '#1a1a1a' : '#9e9e9d',
              fontSize: '13px',
              textTransform: 'uppercase'
            }}
          >
            BLUR
          </button>

          {/* Chrom */}
          <button
            onClick={() => setEfxChromatic(!efxChromatic)}
            className="flex-shrink-0 px-5 py-3 rounded-lg transition-all active:scale-95 font-bold"
            style={{
              backgroundColor: efxChromatic ? '#ff00ff' : '#2a2a2a',
              border: efxChromatic ? '1px solid #ff00ff' : '1px solid #3a3a3a',
              color: efxChromatic ? '#1a1a1a' : '#9e9e9d',
              fontSize: '13px',
              textTransform: 'uppercase'
            }}
          >
            CHROM
          </button>

          {/* Shake */}
          <button
            onClick={() => setEfxShake(!efxShake)}
            className="flex-shrink-0 px-5 py-3 rounded-lg transition-all active:scale-95 font-bold"
            style={{
              backgroundColor: efxShake ? '#ff00ff' : '#2a2a2a',
              border: efxShake ? '1px solid #ff00ff' : '1px solid #3a3a3a',
              color: efxShake ? '#1a1a1a' : '#9e9e9d',
              fontSize: '13px',
              textTransform: 'uppercase'
            }}
          >
            SHAKE
          </button>

          {/* Distort */}
          <button
            onClick={() => setEfxDistort(!efxDistort)}
            className="flex-shrink-0 px-5 py-3 rounded-lg transition-all active:scale-95 font-bold"
            style={{
              backgroundColor: efxDistort ? '#ff00ff' : '#2a2a2a',
              border: efxDistort ? '1px solid #ff00ff' : '1px solid #3a3a3a',
              color: efxDistort ? '#1a1a1a' : '#9e9e9d',
              fontSize: '13px',
              textTransform: 'uppercase'
            }}
          >
            DISTORT
          </button>
        </div>
      </div>

      {/* Content / Style Tabs */}
      <div>
        <div className="flex border-b-2" style={{ borderColor: '#2a2a2a' }}>
          <button
            onClick={() => setActiveTab('content')}
            className="flex-1 py-3 font-bold transition-all"
            style={{
              borderBottom: activeTab === 'content' ? `3px solid #11ff49` : '3px solid transparent',
              color: activeTab === 'content' ? '#11ff49' : '#9e9e9d',
              fontSize: '16px',
              marginBottom: '-2px'
            }}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className="flex-1 py-3 font-bold transition-all"
            style={{
              borderBottom: activeTab === 'style' ? `3px solid #11ff49` : '3px solid transparent',
              color: activeTab === 'style' ? '#11ff49' : '#9e9e9d',
              fontSize: '16px',
              marginBottom: '-2px'
            }}
          >
            Style
          </button>
        </div>
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* TEST: TOP OF CONTENT TAB */}
          <div style={{ 
            backgroundColor: '#0000ff', 
            color: '#ffffff', 
            padding: '20px', 
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            🔵 START OF CONTENT TAB
          </div>

          {/* Content Style Selection */}
          <div>
            <label 
              className="block mb-3 font-['Inter:SemiBold',sans-serif]"
              style={{ fontSize: '16px', color: '#f1f0eb', fontWeight: '600' }}
            >
              Content Style:
            </label>
            
            <button
              onClick={() => setShowStyleSelector(!showStyleSelector)}
              className="w-full flex items-center justify-between p-4 rounded-lg transition-all active:scale-98"
              style={{
                backgroundColor: '#2a2a2a',
                border: '1px solid #3a3a3a'
              }}
            >
              <span 
                className="font-['Inter:Medium',sans-serif]"
                style={{
                  fontSize: '15px',
                  color: '#9e9e9d',
                  fontWeight: '500'
                }}
              >
                {currentStyleOption.label}
              </span>
              <ChevronDown 
                size={20} 
                color="#9e9e9d"
                style={{
                  transform: showStyleSelector ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}
              />
            </button>

            {/* Style Dropdown */}
            {showStyleSelector && (
              <div 
                className="mt-2 rounded-lg overflow-hidden"
                style={{
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #3a3a3a'
                }}
              >
                {contentStyleOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      updatePageSelectedStyle(option.value);
                      setShowStyleSelector(false);
                    }}
                    className="w-full p-4 text-left transition-all active:scale-98"
                    style={{
                      backgroundColor: currentPage.selectedStyle === option.value ? '#3a3a3a' : 'transparent',
                      borderBottom: '1px solid #3a3a3a',
                      color: currentPage.selectedStyle === option.value ? '#11ff49' : '#9e9e9d',
                      fontSize: '15px'
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Image 1 */}
          <div>
            <label 
              className="block mb-3 font-['Inter:SemiBold',sans-serif]"
              style={{ fontSize: '16px', color: '#f1f0eb', fontWeight: '600' }}
            >
              Image 1
            </label>
            <MobileImageUploader
              value={currentPage.images.image1 || ''}
              onChange={(url) => updatePageImage('image1', url)}
              accentColor={styles.textAccent}
              fontFamily={styles.fontFamily}
              objectFit={currentPage.imageFits.image1Fit || 'cover'}
              onObjectFitChange={(fit) => updatePageImageFit('image1Fit', fit)}
              customDetailText=""
            />
          </div>

          {/* Image 2 */}
          <div>
            <label 
              className="block mb-3 font-['Inter:SemiBold',sans-serif]"
              style={{ fontSize: '16px', color: '#f1f0eb', fontWeight: '600' }}
            >
              Image 2
            </label>
            <MobileImageUploader
              value={currentPage.images.image2 || ''}
              onChange={(url) => updatePageImage('image2', url)}
              accentColor={styles.textAccent}
              fontFamily={styles.fontFamily}
              objectFit={currentPage.imageFits.image2Fit || 'cover'}
              onObjectFitChange={(fit) => updatePageImageFit('image2Fit', fit)}
              customDetailText=""
            />
          </div>

          {/* Top Label */}
          <div>
            <label 
              className="block mb-3 font-['Inter:SemiBold',sans-serif]"
              style={{ fontSize: '16px', color: '#f1f0eb', fontWeight: '600' }}
            >
              Top Label
            </label>
            <input
              type="text"
              value={currentPage.fields.topLabel || ''}
              onChange={(e) => updatePageField('topLabel', e.target.value)}
              placeholder="BEYOND THE SCREENSHOT"
              className="w-full px-4 py-3 rounded-lg"
              style={{
                fontFamily: `'${styles.fontFamily}',sans-serif`,
                fontSize: '15px',
                backgroundColor: '#2a2a2a',
                border: '1px solid #3a3a3a',
                color: '#f1f0eb'
              }}
            />
          </div>

          {/* Body Copy 1-1 */}
          <div>
            <label 
              className="block mb-3 font-['Inter:SemiBold',sans-serif]"
              style={{ fontSize: '16px', color: '#f1f0eb', fontWeight: '600' }}
            >
              Body Copy 1-1
            </label>
            <RichTextEditor
              key={`body-copy-${currentPage.id}-intro-or-first`}
              value={currentPage.fields.bodyCopies?.[0]?.text || ''}
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
              rows={3}
              mainColors={['#f1f0eb', '#11ff49', '#9E9E9D', '#A79755']}
              fontSizeOptions={['22px', '24px']}
            />
          </div>

          {/* TEST MARKER - DELETE THIS */}
          <div style={{ 
            backgroundColor: '#ff0000', 
            color: '#ffffff', 
            padding: '20px', 
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            🔴 TEST MARKER - SCROLL CHECK
          </div>

          {/* Dynamic Paragraph Headers and Body Copies */}
          {currentPage.fields.paragraphHeaders?.map((header: any, index: number) => (
            <div key={header.id}>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <label 
                    className="font-['Inter:SemiBold',sans-serif]"
                    style={{ fontSize: '16px', color: '#11ff49', fontWeight: '600' }}
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
                    className="p-2 rounded-lg transition-all active:scale-95"
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
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    fontFamily: `'${styles.fontFamily}',sans-serif`,
                    fontSize: '15px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #3a3a3a',
                    color: '#11ff49'
                  }}
                />
              </div>
              
              <div>
                <label 
                  className="block mb-3 font-['Inter:SemiBold',sans-serif]"
                  style={{ fontSize: '16px', color: '#f1f0eb', fontWeight: '600' }}
                >
                  Body Copy 1-{index + 2}
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
          <button
            onClick={() => {
              const newHeader = {
                id: `header-${Date.now()}`,
                text: ''
              };
              const newHeaders = [...(currentPage.fields.paragraphHeaders || []), newHeader];
              updatePageField('paragraphHeaders', newHeaders);
            }}
            className="w-full py-4 rounded-lg font-bold transition-all active:scale-95"
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

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#3a3a3a', margin: '8px 0' }} />

          {/* Bottom Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowStyleModal(true)}
              className="flex-1 py-4 rounded-lg transition-all active:scale-95 font-bold"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #a79755',
                color: '#a79755',
                fontSize: '15px'
              }}
            >
              + Add New Page
            </button>

            <button
              onClick={savePage}
              className="flex-1 py-4 rounded-lg transition-all active:scale-95 font-bold"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #a79755',
                color: '#a79755',
                fontSize: '15px'
              }}
            >
              Save Page
            </button>
          </div>
        </div>
      )}

      {/* Style Tab */}
      {activeTab === 'style' && (
        <div className="space-y-4">
          <p style={{ fontSize: '15px', color: '#9e9e9d', textAlign: 'center', padding: '60px 20px' }}>
            Style options coming soon
          </p>
        </div>
      )}
    </div>
  );
}