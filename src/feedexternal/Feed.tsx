"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';

import { useIsMobileOrTablet } from './hooks/useMediaQuery';
import { Heart, Send, ArrowUp } from 'lucide-react';

// Components from shared folder
import ContentStyle1V4 from './components/ContentStyle1V4';
import ContentStyle2V4 from './components/ContentStyle2V4';
import ContentStyle3V4 from './components/ContentStyle3V4';
import ContentStyle4V4 from './components/ContentStyle4V4';
import { OpeningStyle1 } from './components/OpeningStyle1';

// Components from local folder
import { FlipBoardText } from './components/FlipBoardText';
import { EFXWrapper } from './components/EFXWrapper';
import { ProductCarousel } from './components/ProductCarousel';
import { RecommendedArticles } from './components/RecommendedArticles';

// Imports from local imports folder
import CoverThumbnailFeatureArticleColour from './imports/CoverThumbnailFeatureArticleColour';
import CoverThumbnailFeatureArticleBw from './imports/CoverThumbnailFeatureArticleBw';
import CoverThumbnailCreatorSpotlight from './imports/CoverThumbnailCreatorSpotlight';
import CoverThumbnailAnnouncement1 from './imports/CoverThumbnailAnnouncement1';

import { likePage, sharePage, getProductSets, getRecommendedArticleSets } from '../services/api';

export interface SavedPage {
  id: string;
  name: string;
  content: any;
  pages?: any[];
  styles: any;
  sectionVisibility: any;
  selectedStyle: string;
  isPublished: boolean;
  savedAt: Date;
  likes?: number;
  shares?: number;
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
  productSetId?: string;
  hasRecommendedReading?: boolean;
  efxMode?: 'none' | 'glitch' | 'blur' | 'chromatic' | 'shake' | 'distort';
}

interface FeedPageItem {
  id: string;
  pageNumber: number | 'cover';
  styleType: 'cover' | 'intro' | 'content';
  selectedStyle: number;
  images: any;
  imageFits: any;
  fields: any;
  efx?: {
    glitch: boolean;
    blur: boolean;
    chromatic: boolean;
    shake: boolean;
    distort: boolean;
  };
}

function CoverComposite({ data }: { data: NonNullable<SavedPage['coverData']> }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.28);

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;

      // Calculate scale to "hug" (cover) the container
      // We want the content to fill the container, potentially cropping if aspect ratios differ
      const scaleX = w / 1512;
      const scaleY = h / 851;
      const s = Math.max(scaleX, scaleY); // Use max to ensure it covers the container (hugs)

      setScale(s);
    };
    update();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }
    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden flex items-center justify-center">
      <div style={{ width: '1512px', height: '851px', transform: `scale(${scale})`, transformOrigin: 'center center', flexShrink: 0 }}>
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

function FeedArticlePreview({
  page,
  meta,
  onCopyLink,
  likes,
  shares,
  onLike,
  onShare,
  productSets
}: {
  page: SavedPage;
  meta?: {
    title: string;
    category: string;
    savedAt: string;
  };
  onCopyLink?: () => void;
  likes: number;
  shares: number;
  onLike: () => void;
  onShare: () => void;
  productSets: any[];
}) {
  const copyShareLink = () => {
    onShare();
    const url = `${window.location.origin}${window.location.pathname}#article-${page.id}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        onCopyLink?.();
      }).catch(() => {
        onCopyLink?.();
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        onCopyLink?.();
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };
  const [scale, setScale] = useState(1);
  const pagesSource = Array.isArray(page.pages) && page.pages.length > 0 ? page.pages : page.content ? [page.content] : [];
  const coverPage = pagesSource.find((p) => p?.pageNumber === 'cover');
  const selectedProductSetId = page.productSetId ?? coverPage?.productSetId ?? null;
  const products = useMemo(() => {
    if (!productSets || productSets.length === 0) return undefined;
    
    if (selectedProductSetId) {
      const set = productSets.find(s => s.id === selectedProductSetId);
      if (set) return set.products;
    }
    
    return productSets[0].products;
  }, [selectedProductSetId, productSets]);
  const [mobileWidth, setMobileWidth] = useState<number | null>(null);
  const isMobileOrTablet = useIsMobileOrTablet();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [pageHeights, setPageHeights] = useState<Record<string, number>>({});
  const pages: FeedPageItem[] = pagesSource
    .filter((p) => p?.pageNumber !== 'cover')
    .map((p) => {
      if (p?.fields?.topLabel === undefined && p?.styleType === 'content') {
        return { ...p, fields: { ...p.fields, topLabel: '' } };
      }
      return p;
    });
  const coverId = `${page.id}-cover`;
  const hasCover = Boolean(page.coverData || page.coverImage);
  const productsId = `${page.id}-products`;
  const recommendedId = `${page.id}-recommended`;
  const hasFeaturedProducts = page.hasFeaturedProducts ?? coverPage?.hasFeaturedProducts;
  const showProducts = hasFeaturedProducts !== false;
  const pageIdsKey = useMemo(() => pages.map((p) => p.id).join('|'), [pages]);
  const pageIdList = useMemo(() => (pageIdsKey ? pageIdsKey.split('|') : []), [pageIdsKey]);
  const measuredKeys = useMemo(() => {
    const keys: string[] = [];
    if (hasCover) keys.push(coverId);
    pageIdList.forEach((id) => keys.push(id));
    if (showProducts) keys.push(productsId);
    return keys;
  }, [coverId, hasCover, pageIdList, productsId, showProducts]);
  const styles = {
    background: page.styles?.background || '#1a1a1a',
    textPrimary: page.styles?.textPrimary || '#f1f0eb',
    textAccent: page.styles?.textAccent || '#11ff49',
    textGold: page.styles?.textGold || '#a79755',
    fontFamily: page.styles?.fontFamily || 'Inter',
    topLabelFontSize: page.styles?.topLabelFontSize || page.styles?.topLabelSize || '12px',
    topLabelFontWeight: page.styles?.topLabelFontWeight || page.styles?.topLabelWeight || '400'
  };
  const desktopPageOverlap = isMobileOrTablet ? 0 : 44;
  const [isAnimating, setIsAnimating] = useState(false);

  // 8-second repeating animation loop for flipboard effect
  useEffect(() => {
    // Initial start
    setIsAnimating(true);

    const interval = setInterval(() => {
      // Reset briefly then restart to trigger animation
      setIsAnimating(false);
      setTimeout(() => {
        setIsAnimating(true);
      }, 100);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const update = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const w = el.clientWidth;
      if (!w) return;
      if (isMobileOrTablet) {
        setScale(1);
        setMobileWidth(w);
        return;
      }
      const zoomScale = typeof window !== 'undefined' ? window.visualViewport?.scale ?? 1 : 1;
      const adjustedWidth = w * zoomScale;
      setScale(Math.min(1, adjustedWidth / 1512));
    };
    update();
    window.addEventListener('resize', update);
    const visualViewport = typeof window !== 'undefined' ? window.visualViewport : null;
    visualViewport?.addEventListener('resize', update);
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(update);
      if (wrapperRef.current) observer.observe(wrapperRef.current);
    }
    return () => {
      window.removeEventListener('resize', update);
      visualViewport?.removeEventListener('resize', update);
      observer?.disconnect();
    };
  }, [isMobileOrTablet]);

  useEffect(() => {
    if (isMobileOrTablet) return;
    let frameId = 0;
    const measureOnce = () => {
      const nextHeights: Record<string, number> = {};
      measuredKeys.forEach((key) => {
        const el = pageRefs.current[key];
        if (!el) return;
        const containerRect = el.getBoundingClientRect();
        let maxBottom = containerRect.top;
        const descendants = el.querySelectorAll('*');
        descendants.forEach((node) => {
          const rect = (node as HTMLElement).getBoundingClientRect();
          if (rect.bottom > maxBottom) {
            maxBottom = rect.bottom;
          }
        });
        const measuredHeight = (maxBottom - containerRect.top) / Math.max(scale, 0.0001);
        const minHeight = key.endsWith('-cover') ? 851 : 0;
        nextHeights[key] = Math.max(minHeight, Math.ceil(measuredHeight));
      });
      setPageHeights(nextHeights);
    };
    frameId = window.requestAnimationFrame(measureOnce);
    const t1 = window.setTimeout(measureOnce, 300);
    const t2 = window.setTimeout(measureOnce, 1200);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [measuredKeys, scale]);

  const renderPageForReadingMode = (renderPage: FeedPageItem, index: number) => {
    if (renderPage.styleType === 'intro') {
      const isIntroWithoutImage = !renderPage.images.coverImage;
      return (
        <div
          className="w-full h-full relative flex items-center"
          style={{
            backgroundColor: styles.background
          }}
        >
          <div
            className="relative"
            style={{
              width: '1512px',
              height: isIntroWithoutImage ? 'auto' : '851px',
              minHeight: isIntroWithoutImage ? '851px' : undefined
            }}
          >
            {renderPage.selectedStyle === 1 && (
              <OpeningStyle1
                title={renderPage.fields.title || ''}
                topLabel={renderPage.fields.showTopLabel ? (renderPage.fields.topLabel || '') : ''}
                coverImage={renderPage.images.coverImage || null}
                imageFit={renderPage.imageFits.coverImageFit || 'cover'}
                author={renderPage.fields.author || ''}
                headline={renderPage.fields.headline || ''}
                description={renderPage.fields.description || ''}
                iconCount1={likes.toString()}
                iconCount2={shares.toString()}
                onLike={onLike}
                onShare={copyShareLink}
                textPrimary={styles.textPrimary}
                textAccent={styles.textAccent}
                fontFamily={styles.fontFamily}
                efx={renderPage.efx}
                hasFeaturedProducts={page.hasFeaturedProducts}
                productSetId={page.productSetId}
              />
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  if (!pages.length) {
    return (
      <div
        className="w-full rounded-[12px] border"
        style={{
          borderColor: '#2a2a2a',
          backgroundColor: '#0d0d0d',
          padding: '24px',
          color: '#9e9e9d'
        }}
      >
        Article content not available
      </div>
    );
  }

  const renderSequentialPage = (renderPage: FeedPageItem) => {
    if (renderPage.styleType === 'intro') {
      return renderPageForReadingMode(renderPage, 0);
    }
    if (renderPage.styleType === 'content') {
      if (renderPage.selectedStyle === 1) {
        return (
          <ContentStyle1V4
            topLabel={renderPage.fields.topLabel}
            introParagraph={renderPage.fields.bodyCopies?.[0]?.text}
            paragraphHeaders={renderPage.fields.paragraphHeaders}
            bodyCopies={renderPage.fields.bodyCopies?.slice(1)}
            image1={renderPage.images.image1}
            image2={renderPage.images.image2}
            image1Fit={renderPage.imageFits.image1Fit}
            image2Fit={renderPage.imageFits.image2Fit}
            isAnimating={false}
            fontFamily={styles.fontFamily}
            topLabelFontSize={styles.topLabelFontSize}
            topLabelFontWeight={styles.topLabelFontWeight}
            textPrimary={styles.textPrimary}
            efx={renderPage.efx}
          />
        );
      }
      if (renderPage.selectedStyle === 2) {
        return (
          <ContentStyle2V4
            topLabel={renderPage.fields.topLabel}
            paragraphHeaders={renderPage.fields.paragraphHeaders}
            bodyCopies={renderPage.fields.bodyCopies}
            image1={renderPage.images.image1}
            image2={renderPage.images.image2}
            image1Fit={renderPage.imageFits.image1Fit}
            image2Fit={renderPage.imageFits.image2Fit}
            isAnimating={false}
            fontFamily={styles.fontFamily}
            topLabelFontSize={styles.topLabelFontSize}
            topLabelFontWeight={styles.topLabelFontWeight}
            textPrimary={styles.textPrimary}
            efx={renderPage.efx}
          />
        );
      }
      if (renderPage.selectedStyle === 3) {
        return (
          <ContentStyle3V4
            topLabel={renderPage.fields.topLabel}
            paragraphHeaders={renderPage.fields.paragraphHeaders}
            bodyCopies={renderPage.fields.bodyCopies}
            image1={renderPage.images.image1}
            image2={renderPage.images.image2}
            image1Fit={renderPage.imageFits.image1Fit}
            image2Fit={renderPage.imageFits.image2Fit}
            isAnimating={false}
            fontFamily={styles.fontFamily}
            topLabelFontSize={styles.topLabelFontSize}
            topLabelFontWeight={styles.topLabelFontWeight}
            textPrimary={styles.textPrimary}
            efx={renderPage.efx}
          />
        );
      }
      if (renderPage.selectedStyle === 4) {
        return (
          <ContentStyle4V4
            topLabel={renderPage.fields.topLabel}
            image1={renderPage.images.image1}
            image2={renderPage.images.image2}
            image1Fit={renderPage.imageFits.image1Fit}
            image2Fit={renderPage.imageFits.image2Fit}
            caption1Title={renderPage.fields.caption1Title}
            caption1Subtitle={renderPage.fields.caption1Subtitle}
            caption2Title={renderPage.fields.caption2Title}
            caption2Subtitle={renderPage.fields.caption2Subtitle}
            showCaption1={renderPage.fields.showCaption1}
            showCaption2={renderPage.fields.showCaption2}
            isAnimating={false}
            fontFamily={styles.fontFamily}
            topLabelFontSize={styles.topLabelFontSize}
            topLabelFontWeight={styles.topLabelFontWeight}
            textPrimary={styles.textPrimary}
            efx={renderPage.efx}
          />
        );
      }
    }
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ color: styles.textPrimary }}>
        Unsupported page style
      </div>
    );
  };

  const ensureLinkTargets = (html: string) =>
    html.replace(/<a\b([^>]*?)>/gi, (_match, attrs) => {
      let next = attrs;
      if (/target\s*=/i.test(next)) {
        next = next.replace(/target\s*=\s*(['"])(.*?)\1/i, 'target="_blank"');
      } else {
        next = `${next} target="_blank"`;
      }
      const relMatch = next.match(/rel\s*=\s*(['"])(.*?)\1/i);
      if (relMatch) {
        const relParts = relMatch[2].split(/\s+/).filter(Boolean);
        if (!relParts.some(part => part.toLowerCase() === 'noopener')) relParts.push('noopener');
        if (!relParts.some(part => part.toLowerCase() === 'noreferrer')) relParts.push('noreferrer');
        const relValue = relParts.join(' ');
        next = next.replace(relMatch[0], `rel="${relValue}"`);
      } else {
        next = `${next} rel="noopener noreferrer"`;
      }
      const styleMatch = next.match(/style\s*=\s*(['"])(.*?)\1/i);
      const linkStyles = 'color: #11ff49; text-decoration: underline;';
      if (styleMatch) {
        const cleaned = styleMatch[2]
          .replace(/color\s*:\s*[^;]+;?/gi, '')
          .replace(/text-decoration\s*:\s*[^;]+;?/gi, '')
          .trim();
        const merged = `${cleaned}${cleaned && !cleaned.endsWith(';') ? ';' : ''} ${linkStyles}`.trim();
        next = next.replace(styleMatch[0], `style="${merged}"`);
      } else {
        next = `${next} style="${linkStyles}"`;
      }
      return `<a${next}>`;
    });

  const renderMobileTextBlocks = (paragraphHeaders?: { id: string; text: string }[], bodyCopies?: { afterHeaderId?: string; text: string }[]) => {
    const standalone = bodyCopies?.filter((b) => !b.afterHeaderId) || [];
    return (
      <div className="flex flex-col gap-[12px]">
        {standalone.map((copy, index) => (
          <motion.div
            key={`standalone-${index}`}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-[15px] leading-[24px] rich-preview-content"
            style={{ color: styles.textPrimary, whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: ensureLinkTargets(copy.text || '') }}
          />
        ))}
        {paragraphHeaders?.map((header, index) => {
          const bodyCopy = bodyCopies?.find((b) => b.afterHeaderId === header.id);
          const addHeaderSpacing = index > 0 || standalone.length > 0;
          return (
            <div
              key={header.id}
              className={`flex flex-col gap-[8px] ${addHeaderSpacing ? 'mt-[12px]' : ''}`}
            >
              {header.text && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5 }}
                  className="text-[16px] font-semibold tracking-wider leading-[18px]" style={{ color: styles.textAccent }}
                >
                  {header.text}
                </motion.div>
              )}
              {bodyCopy?.text && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5 }}
                  className="text-[15px] leading-[24px] rich-preview-content"
                  style={{ color: styles.textPrimary, whiteSpace: 'pre-wrap' }}
                  dangerouslySetInnerHTML={{ __html: ensureLinkTargets(bodyCopy.text) }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderMobilePage = (renderPage: FeedPageItem) => {
    if (renderPage.styleType === 'intro') {
      const coverImage = renderPage.images?.coverImage || null;
      const topLabel = renderPage.fields?.showTopLabel ? renderPage.fields?.topLabel : page.coverData?.category;
      return (
        <div className="flex flex-col gap-[14px] relative" style={{ padding: '18px 16px 10px', backgroundColor: styles.background }}>
          {/* Icons positioned to the right */}
          <div className="absolute right-[16px] top-[18px] flex items-center gap-[16px] z-10">
            <div
              className="flex flex-col items-center gap-[4px] cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={onLike}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onLike();
                }
              }}
              title="Like article"
              aria-label="Like article"
            >
              <Heart size={18} strokeWidth={1.5} color={styles.textPrimary} />
              <div style={{ fontSize: '12px', color: styles.textPrimary }}>
                {likes}
              </div>
            </div>
            <div
              className="flex flex-col items-center gap-[4px] cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={copyShareLink}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  copyShareLink();
                }
              }}
              title="Copy article link"
              aria-label="Copy article link"
            >
              <Send size={18} strokeWidth={1.5} color={styles.textPrimary} />
              <div style={{ fontSize: '12px', color: styles.textPrimary }}>
                {shares}
              </div>
            </div>
          </div>
          {topLabel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="text-[11px] font-semibold tracking-wider" style={{ color: styles.textGold }}
            >
              {topLabel}
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-[34px] font-light leading-[40px]" style={{ color: styles.textPrimary }}
          >
            <FlipBoardText
              text={renderPage.fields?.title || page.coverData?.title || page.name || 'Untitled'}
              isAnimating={isAnimating}
              fontFamily={styles.fontFamily}
              fontSize="34px"
              fontWeight="300"
              color={styles.textPrimary}
              lineHeight="40px"
            />
          </motion.div>
          {renderPage.fields?.author && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="text-[12px] font-semibold" style={{ color: styles.textPrimary }}
            >
              {renderPage.fields.author}
            </motion.div>
          )}
          {coverImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="w-full overflow-hidden mb-[30px]"
              style={{
                borderRadius: '6px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a'
              }}
            >
              <EFXWrapper
                glitchEnabled={!!renderPage.efx?.glitch}
                blurEnabled={!!renderPage.efx?.blur}
                chromaticEnabled={!!renderPage.efx?.chromatic}
                shakeEnabled={!!renderPage.efx?.shake}
                distortEnabled={!!renderPage.efx?.distort}
              >
                <img
                  src={coverImage}
                  alt=""
                  className="w-full h-auto block"
                  style={{ objectFit: renderPage.imageFits?.coverImageFit || page.coverData?.imageFit || 'cover' }}
                />
              </EFXWrapper>
            </motion.div>
          )}
          {renderPage.fields?.headline && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="text-[16px] font-semibold leading-[22px] mb-[30px]" style={{ color: styles.textAccent }}
            >
              {renderPage.fields.headline}
            </motion.div>
          )}
          {renderPage.fields?.description && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="text-[14px] leading-[22px]"
              style={{ color: styles.textPrimary, whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{ __html: renderPage.fields.description }}
            />
          )}
        </div>
      );
    }
    if (renderPage.styleType === 'content') {
      if (renderPage.selectedStyle === 1) {
        return (
          <div className="flex flex-col gap-[16px]" style={{ padding: '12px 16px 18px', backgroundColor: styles.background }}>
            {renderPage.fields?.topLabel && (
              <motion.div initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} viewport={{ once: false }} transition={{ duration: 0.5 }} className="text-[11px] font-semibold tracking-wider" style={{ color: styles.textGold }}>
                {renderPage.fields.topLabel}
              </motion.div>
            )}
            {renderPage.fields?.bodyCopies?.[0]?.text && (
              <motion.div initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} viewport={{ once: false }} transition={{ duration: 0.5 }}
                className="text-[22px] font-light leading-[30px]"
                style={{
                  color: styles.textPrimary,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Inter, sans-serif'
                }}
                dangerouslySetInnerHTML={{ __html: renderPage.fields.bodyCopies[0].text }}
              />
            )}
            {renderMobileTextBlocks(renderPage.fields?.paragraphHeaders, renderPage.fields?.bodyCopies?.slice(1))}
            {renderPage.images?.image1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <EFXWrapper
                  glitchEnabled={!!renderPage.efx?.glitch}
                  blurEnabled={!!renderPage.efx?.blur}
                  chromaticEnabled={!!renderPage.efx?.chromatic}
                  shakeEnabled={!!renderPage.efx?.shake}
                  distortEnabled={!!renderPage.efx?.distort}
                >
                  <img
                    src={renderPage.images.image1}
                    alt=""
                    className="w-full h-auto block rounded-[6px]"
                    style={{ objectFit: renderPage.imageFits?.image1Fit || 'cover' }}
                  />
                </EFXWrapper>
              </motion.div>
            )}
            {renderPage.images?.image2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <EFXWrapper
                  glitchEnabled={!!renderPage.efx?.glitch}
                  blurEnabled={!!renderPage.efx?.blur}
                  chromaticEnabled={!!renderPage.efx?.chromatic}
                  shakeEnabled={!!renderPage.efx?.shake}
                  distortEnabled={!!renderPage.efx?.distort}
                >
                  <img
                    src={renderPage.images.image2}
                    alt=""
                    className="w-full h-auto block rounded-[6px]"
                    style={{ objectFit: renderPage.imageFits?.image2Fit || 'cover' }}
                  />
                </EFXWrapper>
              </motion.div>
            )}
          </div>
        );
      }
      if (renderPage.selectedStyle === 2) {
        return (
          <div className="flex flex-col gap-[16px]" style={{ padding: '12px 16px 18px', backgroundColor: styles.background }}>
            {renderPage.fields?.topLabel && (
              <motion.div initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} viewport={{ once: false }} transition={{ duration: 0.5 }} className="text-[11px] font-semibold tracking-wider" style={{ color: styles.textGold }}>
                {renderPage.fields.topLabel}
              </motion.div>
            )}
            {renderMobileTextBlocks(renderPage.fields?.paragraphHeaders, renderPage.fields?.bodyCopies)}
            {renderPage.images?.image1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="w-1/2 mx-auto"
              >
                <EFXWrapper
                  glitchEnabled={!!renderPage.efx?.glitch}
                  blurEnabled={!!renderPage.efx?.blur}
                  chromaticEnabled={!!renderPage.efx?.chromatic}
                  shakeEnabled={!!renderPage.efx?.shake}
                  distortEnabled={!!renderPage.efx?.distort}
                >
                  <img
                    src={renderPage.images.image1}
                    alt=""
                    className="w-full h-auto block rounded-[6px]"
                    style={{ objectFit: renderPage.imageFits?.image1Fit || 'cover' }}
                  />
                </EFXWrapper>
              </motion.div>
            )}
            {renderPage.images?.image2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="w-1/2 mx-auto"
              >
                <EFXWrapper
                  glitchEnabled={!!renderPage.efx?.glitch}
                  blurEnabled={!!renderPage.efx?.blur}
                  chromaticEnabled={!!renderPage.efx?.chromatic}
                  shakeEnabled={!!renderPage.efx?.shake}
                  distortEnabled={!!renderPage.efx?.distort}
                >
                  <img
                    src={renderPage.images.image2}
                    alt=""
                    className="w-full h-auto block rounded-[6px]"
                    style={{ objectFit: renderPage.imageFits?.image2Fit || 'cover' }}
                  />
                </EFXWrapper>
              </motion.div>
            )}
          </div>
        );
      }
      if (renderPage.selectedStyle === 3) {
        return (
          <div className="flex flex-col gap-[16px]" style={{ padding: '12px 16px 18px', backgroundColor: styles.background }}>
            {renderPage.fields?.topLabel && (
              <motion.div initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} viewport={{ once: false }} transition={{ duration: 0.5 }} className="text-[11px] font-semibold tracking-wider" style={{ color: styles.textGold }}>
                {renderPage.fields.topLabel}
              </motion.div>
            )}
            {renderMobileTextBlocks(renderPage.fields?.paragraphHeaders, renderPage.fields?.bodyCopies)}
            {renderPage.images?.image1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <EFXWrapper
                  glitchEnabled={!!renderPage.efx?.glitch}
                  blurEnabled={!!renderPage.efx?.blur}
                  chromaticEnabled={!!renderPage.efx?.chromatic}
                  shakeEnabled={!!renderPage.efx?.shake}
                  distortEnabled={!!renderPage.efx?.distort}
                >
                  <img
                    src={renderPage.images.image1}
                    alt=""
                    className="w-full h-auto block rounded-[6px]"
                    style={{ objectFit: renderPage.imageFits?.image1Fit || 'cover' }}
                  />
                </EFXWrapper>
              </motion.div>
            )}
            {renderPage.images?.image2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <EFXWrapper
                  glitchEnabled={!!renderPage.efx?.glitch}
                  blurEnabled={!!renderPage.efx?.blur}
                  chromaticEnabled={!!renderPage.efx?.chromatic}
                  shakeEnabled={!!renderPage.efx?.shake}
                  distortEnabled={!!renderPage.efx?.distort}
                >
                  <img
                    src={renderPage.images.image2}
                    alt=""
                    className="w-full h-auto block rounded-[6px]"
                    style={{ objectFit: renderPage.imageFits?.image2Fit || 'cover' }}
                  />
                </EFXWrapper>
              </motion.div>
            )}
          </div>
        );
      }
      if (renderPage.selectedStyle === 4) {
        return (
          <div className="flex flex-col gap-[16px]" style={{ padding: '12px 16px 18px', backgroundColor: styles.background }}>
            {renderPage.fields?.topLabel && (
              <motion.div initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} viewport={{ once: false }} transition={{ duration: 0.5 }} className="text-[11px] font-semibold tracking-wider" style={{ color: styles.textGold }}>
                {renderPage.fields.topLabel}
              </motion.div>
            )}
            {renderPage.images?.image1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col gap-[6px]"
              >
                <EFXWrapper
                  glitchEnabled={!!renderPage.efx?.glitch}
                  blurEnabled={!!renderPage.efx?.blur}
                  chromaticEnabled={!!renderPage.efx?.chromatic}
                  shakeEnabled={!!renderPage.efx?.shake}
                  distortEnabled={!!renderPage.efx?.distort}
                >
                  <img
                    src={renderPage.images.image1}
                    alt=""
                    className="w-full h-auto block rounded-[6px]"
                    style={{ objectFit: renderPage.imageFits?.image1Fit || 'cover' }}
                  />
                </EFXWrapper>
                {(renderPage.fields?.caption1Title || renderPage.fields?.caption1Subtitle) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                    className="text-[12px]" style={{ color: styles.textPrimary, whiteSpace: 'pre-wrap' }}
                  >
                    <div className="font-semibold">{renderPage.fields?.caption1Title}</div>
                    <div className="opacity-80">{renderPage.fields?.caption1Subtitle}</div>
                  </motion.div>
                )}
              </motion.div>
            )}
            {renderPage.images?.image2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col gap-[6px]"
              >
                <EFXWrapper
                  glitchEnabled={!!renderPage.efx?.glitch}
                  blurEnabled={!!renderPage.efx?.blur}
                  chromaticEnabled={!!renderPage.efx?.chromatic}
                  shakeEnabled={!!renderPage.efx?.shake}
                  distortEnabled={!!renderPage.efx?.distort}
                >
                  <img
                    src={renderPage.images.image2}
                    alt=""
                    className="w-full h-auto block rounded-[6px]"
                    style={{ objectFit: renderPage.imageFits?.image2Fit || 'cover' }}
                  />
                </EFXWrapper>
                {(renderPage.fields?.caption2Title || renderPage.fields?.caption2Subtitle) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                    className="text-[12px]" style={{ color: styles.textPrimary, whiteSpace: 'pre-wrap' }}
                  >
                    <div className="font-semibold">{renderPage.fields?.caption2Title}</div>
                    <div className="opacity-80">{renderPage.fields?.caption2Subtitle}</div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  const mobileScale = mobileWidth ? mobileWidth / 375 : 1;

  if (isMobileOrTablet) {
    return (
      <div ref={wrapperRef} className="w-full" style={{ backgroundColor: styles.background }}>
        {hasCover && (
          <div className="w-full" style={{ padding: '16px 16px 8px' }}>
            {page.coverData ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="w-full relative overflow-hidden"
                style={{
                  aspectRatio: '1512 / 851',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '6px',
                  border: '1px solid #2a2a2a'
                }}
              >
                <CoverComposite data={page.coverData} />
              </motion.div>
            ) : page.coverImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="w-full overflow-hidden"
                style={{
                  borderRadius: '6px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a'
                }}
              >
                <img
                  src={page.coverImage}
                  alt=""
                  className="w-full h-auto block"
                  style={{ objectFit: page.coverData?.imageFit || 'cover' }}
                />
              </motion.div>
            ) : null}
          </div>
        )}
        {pages.map((renderPage) => (
          <div
            key={`mobile-${renderPage.id}`}
          >
            {renderMobilePage(renderPage)}
          </div>
        ))}
        {showProducts && (
          <div
            className="w-full"
            style={{ backgroundColor: styles.background, paddingBottom: '8px' }}
          >
            <ProductCarousel products={products} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-[14px] border"
      style={{
        backgroundColor: '#0d0d0d',
        borderColor: '#2a2a2a',
        padding: '20px'
      }}
    >
      <div
        ref={wrapperRef}
        className="w-full"
        style={{
          backgroundColor: styles.background,
          overflow: 'hidden',
          marginTop: meta ? '20px' : '0px',
          borderRadius: '12px'
        }}
      >
        <div className="flex flex-col gap-0">
          {hasCover && (
            <div style={{ width: `${1512 * scale}px`, height: `${(pageHeights[coverId] || 851) * scale}px` }}>
              <div
                ref={(node) => {
                  pageRefs.current[coverId] = node;
                }}
                className="relative"
                style={{
                  width: '1512px',
                  height: `${pageHeights[coverId] || 851}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.75 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative"
                  style={{
                    backgroundColor: '#1a1a1a'
                  }}
                >
                  {page.coverData ? (
                    <CoverComposite data={page.coverData} />
                  ) : page.coverImage ? (
                    <img src={page.coverImage} alt="" className="w-full h-full object-cover" />
                  ) : null}
                </motion.div>
              </div>
            </div>
          )}
          {hasCover && meta ? (
            <div className="flex items-center gap-[12px]" style={{ marginTop: '12px' }}>
              <span className="text-[11px] font-bold tracking-wider" style={{ color: '#a79755' }}>
                {meta.category}
              </span>
            </div>
          ) : null}
          {pages.map((renderPage, index) => (
            <div
              key={renderPage.id}
              style={{
                width: `${1512 * scale}px`,
                height: `${(pageHeights[renderPage.id] || 851) * scale}px`,
                marginTop: desktopPageOverlap && (hasCover || index > 0) ? -desktopPageOverlap : 0
              }}
            >
              <div
                ref={(node) => {
                  pageRefs.current[renderPage.id] = node;
                }}
                className="relative"
                style={{
                  width: '1512px',
                  height: `${pageHeights[renderPage.id] || 851}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  {renderSequentialPage(renderPage)}
                </motion.div>
              </div>
            </div>
          ))}
          {showProducts && (
            <div
              style={{
                width: `${1512 * scale}px`,
                height: `${(pageHeights[productsId] || 851) * scale}px`,
                marginTop: desktopPageOverlap && (hasCover || pages.length > 0) ? -desktopPageOverlap : 0
              }}
            >
              <div
                ref={(node) => {
                  pageRefs.current[productsId] = node;
                }}
                className="relative"
                style={{
                  width: '1512px',
                  height: `${pageHeights[productsId] || 851}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex items-start justify-center"
                  style={{
                    backgroundColor: styles.background,
                    paddingTop: isMobileOrTablet ? '0px' : '50px',
                    paddingBottom: isMobileOrTablet ? '0px' : '20px'
                  }}
                >
                  <ProductCarousel products={products} />
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeedPage({
  onBackToLanding,
  savedPages
}: {
  onBackToLanding: () => void;
  savedPages: SavedPage[];
}) {
  const isMobileOrTablet = useIsMobileOrTablet();
  const [productSets, setProductSets] = useState<any[]>([]);
  const [recommendedArticleSets, setRecommendedArticleSets] = useState<any[]>([]);

  useEffect(() => {
    getProductSets().then(setProductSets).catch(console.error);
  }, []);

  useEffect(() => {
    getRecommendedArticleSets().then(setRecommendedArticleSets).catch(console.error);
  }, []);

  const publishedPages = savedPages
    .filter(page => page.isPublished)
    .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
  const recommendedArticles = useMemo(() => {
    const publishedById = new Map(publishedPages.map((page) => [page.id, page]));
    const activeSet = recommendedArticleSets.find((set) => set?.isActive) || recommendedArticleSets[0];
    const idsFromSet = Array.isArray(activeSet?.articleIds) ? activeSet.articleIds : [];
    const pagesFromSet = idsFromSet
      .map((id: string) => publishedById.get(id))
      .filter(Boolean) as SavedPage[];
    const source = pagesFromSet.length > 0 ? pagesFromSet : publishedPages;
    return source.map((page) => ({
      id: page.id,
      title: page.coverData?.title || page.name || 'Untitled',
      category: page.coverData?.category || 'UNCATEGORIZED',
      coverData: page.coverData || null,
      coverImage: page.coverImage || null
    }));
  }, [publishedPages, recommendedArticleSets]);
  const handleRecommendedSelect = (id: string) => {
    if (!id) return;
    const idx = publishedPages.findIndex((page) => page.id === id);
    if (idx !== -1 && visibleCount < idx + 1) {
      setVisibleCount(idx + 1);
    }
    const nextHash = `#article-${id}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
      return;
    }
    const el = document.getElementById(`article-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [pageStats, setPageStats] = useState<Record<string, { likes: number; shares: number }>>({});

  useEffect(() => {
    const stats: Record<string, { likes: number; shares: number }> = {};
    savedPages.forEach((p) => {
      stats[p.id] = { likes: p.likes || 0, shares: p.shares || 0 };
    });
    setPageStats(stats);
  }, [savedPages]);

  const handleLike = async (id: string) => {
    try {
      setPageStats((prev) => ({
        ...prev,
        [id]: { ...prev[id], likes: (prev[id]?.likes || 0) + 1 },
      }));
      await likePage(id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async (id: string) => {
    try {
      setPageStats((prev) => ({
        ...prev,
        [id]: { ...prev[id], shares: (prev[id]?.shares || 0) + 1 },
      }));
      await sharePage(id);
    } catch (e) {
      console.error(e);
    }
  };

  const [visibleCount, setVisibleCount] = useState(5);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const hasHashScrolledRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 5, publishedPages.length));
        }
      },
      { threshold: 0.1, rootMargin: '500px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [publishedPages.length]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (message: string) => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 1800);
  };

  useEffect(() => {
    const waitAndScroll = () => {
      if (hasHashScrolledRef.current) return;
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.slice(1);
      if (!id.startsWith('article-')) return;
      if (publishedPages.length === 0) return;
      const articleId = id.replace('article-', '');
      const idx = publishedPages.findIndex(p => p.id === articleId);
      const targetIndex = idx === -1 ? 0 : idx;
      const targetId = `article-${publishedPages[targetIndex].id}`;
      if (idx !== -1 && visibleCount < idx + 1) {
        setVisibleCount(idx + 1);
      }
      let cancelled = false;
      const isArticleReady = (el: HTMLElement | null) => {
        if (!el) return false;
        if (el.offsetHeight <= 0) return false;
        const imgs = Array.from(el.querySelectorAll('img'));
        const allComplete = imgs.every(img => (img as HTMLImageElement).complete);
        return allComplete;
      };
      const pollUntilReady = (timeoutMs: number, intervalMs: number) => {
        const start = Date.now();
        let stableCount = 0;
        const prevHeights: Record<string, number> = {};
        const tick = () => {
          if (cancelled) return;
          // Ensure all prior articles (including target) exist and are ready
          let allReady = true;
          for (let i = 0; i <= targetIndex; i++) {
            const id = `article-${publishedPages[i].id}`;
            const el = document.getElementById(id) as HTMLElement | null;
            if (!isArticleReady(el)) {
              allReady = false;
              break;
            }
          }
          // Check height stability across the set
          if (allReady) {
            let stable = true;
            for (let i = 0; i <= targetIndex; i++) {
              const id = `article-${publishedPages[i].id}`;
              const el = document.getElementById(id) as HTMLElement | null;
              const h = el ? el.getBoundingClientRect().height : 0;
              const prev = prevHeights[id];
              prevHeights[id] = h;
              if (prev !== undefined && Math.abs(prev - h) > 1) {
                stable = false;
              }
            }
            if (stable) {
              stableCount += 1;
            } else {
              stableCount = 0;
            }
            if (stableCount >= 3) {
              const targetEl = document.getElementById(targetId);
              if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
                hasHashScrolledRef.current = true;
                return;
              }
            }
          }
          if (Date.now() - start < timeoutMs) {
            window.setTimeout(tick, intervalMs);
          } else {
            const fallback = document.getElementById(targetId);
            if (fallback) {
              fallback.scrollIntoView({ behavior: 'smooth' });
              hasHashScrolledRef.current = true;
            }
          }
        };
        tick();
        return () => { cancelled = true; };
      };
      const cancel = pollUntilReady(12000, 200);
      return cancel;
    };
    const cancel = waitAndScroll();
    const onHashChange = () => {
      hasHashScrolledRef.current = false;
      const cancelInner = waitAndScroll();
      if (typeof cancelInner === 'function') {
        // no-op: kept for symmetry if needed
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      if (typeof cancel === 'function') {
        cancel();
      }
    };
  }, [publishedPages, visibleCount]);

  const copyShareLink = (id: string) => {
    // Track share count
    handleShare(id);

    const url = `${window.location.origin}${window.location.pathname}#article-${id}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        showToast('Link copied to clipboard');
      }).catch(() => {
        showToast('Link copied to clipboard');
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast('Link copied to clipboard');
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  const formatSavedAt = (value: SavedPage['savedAt']) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Unknown date';
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
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
      <div
        className="border-b"
        style={{
          backgroundColor: '#0d0d0d',
          borderColor: '#2a2a2a'
        }}
      >
        <div
          style={{
            padding: isMobileOrTablet ? '20px' : '10px 60px'
          }}
        >
          {/* Back button removed or optional for external feed */}

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
              <p className="text-[15px]" style={{ color: '#9e9e9d' }}>
                {publishedPages.length} published {publishedPages.length === 1 ? 'article' : 'articles'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: isMobileOrTablet ? '24px 20px' : '36px 60px'
        }}
      >
        {publishedPages.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-[12px] border-2 border-dashed text-center"
            style={{
              borderColor: '#3a3a3a',
              backgroundColor: '#0d0d0d',
              padding: isMobileOrTablet ? '60px 16px' : '100px 0'
            }}
          >
            <h3 className="text-[20px] font-bold mb-[8px]" style={{ color: '#9e9e9d' }}>
              No published articles yet
            </h3>
            <p className="text-[14px]" style={{ color: '#6e6e6d' }}>
              Publish a draft to see it in the feed
            </p>
          </div>
        ) : (
          <div
            className="flex flex-col"
            style={{
              width: isMobileOrTablet ? '100%' : '80%',
              margin: '0 auto'
            }}
          >
            {publishedPages.slice(0, visibleCount).map((page, index) => {
              const title = page.coverData?.title || page.name || 'Untitled';
              const category = page.coverData?.category || 'PUBLISHED';

              return (
                <div
                  key={page.id}
                  id={`article-${page.id}`}
                >
                  {index > 0 && (
                    <div
                      style={{
                        height: '1px',
                        backgroundColor: '#6e6e6e',
                        margin: isMobileOrTablet ? '24px 0' : '40px 0',
                        width: '100%'
                      }}
                    />
                  )}
                  <FeedArticlePreview
                    page={page}
                    meta={{
                      title,
                      category,
                      savedAt: formatSavedAt(page.savedAt)
                    }}
                    likes={pageStats[page.id]?.likes || 0}
                    shares={pageStats[page.id]?.shares || 0}
                    onLike={() => handleLike(page.id)}
                    onShare={() => handleShare(page.id)}
                    onCopyLink={() => showToast('Link copied to clipboard')}
                    productSets={productSets}
                  />
                  <div className="flex justify-center w-full mt-6 mb-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyShareLink(page.id)}
                        className="flex items-center gap-2 px-4 h-[36px] text-sm transition-colors rounded-full hover:bg-[#2a2a2a]"
                        style={{ color: '#6e6e6e', border: '1px solid #6e6e6e' }}
                        title="Copy article link"
                        aria-label="Copy article link"
                      >
                        <Send size={16} />
                      </button>
                      <button
                        onClick={() => {
                          const el = document.getElementById(`article-${page.id}`);
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex items-center gap-2 px-4 h-[36px] text-sm transition-colors rounded-full hover:bg-[#2a2a2a]"
                        style={{ color: '#6e6e6e', border: '1px solid #6e6e6e' }}
                      >
                        <ArrowUp size={16} />
                        Back to top of article
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Sentinel element for infinite scroll */}
            {visibleCount < publishedPages.length && (
              <div ref={loadMoreRef} style={{ height: '20px', width: '100%' }} />
            )}
          </div>
        )}
      </div>
      <div
        className="w-full"
        style={{
          padding: isMobileOrTablet ? '20px' : '36px 60px',
          paddingBottom: isMobileOrTablet ? '20px' : '0',
          borderTop: '1px solid #2a2a2a',
          marginTop: '40px',
          backgroundColor: '#1a1a1a'
        }}
      >
        <div style={{ maxWidth: '1512px', margin: '0 auto' }}>
          <RecommendedArticles
            articles={recommendedArticles}
            onArticleSelect={handleRecommendedSelect}
          />
        </div>
      </div>
      {toastMessage && (
        <div
          className="fixed z-50"
          style={{
            left: '50%',
            bottom: isMobileOrTablet ? '16px' : '24px',
            transform: 'translateX(-50%)'
          }}
        >
          <div
            className="rounded-full px-4 py-2 text-sm"
            style={{
              backgroundColor: 'rgba(42, 42, 42, 0.95)',
              border: '1px solid #3a3a3a',
              color: '#f1f0eb',
              boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
              textAlign: 'center'
            }}
          >
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
