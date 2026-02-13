import { useState, useEffect, useRef, useMemo } from 'react';
import { getDrafts, deleteDraft, saveDraft } from './services/api';
import LandingPage from './LandingPage';
import ContentDashboardV4 from './ContentDashboardV4';
import FeaturedProductsDashboard from './components/FeaturedProductsDashboard';
import RecommendedArticlesDashboard from './components/RecommendedArticlesDashboard';
import DraftLibrary from './components/DraftLibrary';
import GlitchDemo from './components/GlitchDemo';
import { useIsMobileOrTablet } from './hooks/useMediaQuery';
import ContentStyle1V4 from './components/ContentStyle1V4';
import ContentStyle2V4 from './components/ContentStyle2V4';
import ContentStyle3V4 from './components/ContentStyle3V4';
import { OpeningStyle1 } from './components/OpeningStyle1';
import ContentStyle4V4 from './components/ContentStyle4V4';
import { ProductCarousel } from './components/ProductCarousel';
import { RecommendedArticles } from './components/RecommendedArticles';
import { EFXWrapper } from './components/EFXWrapper';
import CoverThumbnailFeatureArticleColour from './imports/CoverThumbnailFeatureArticleColour';
import CoverThumbnailFeatureArticleBw from './imports/CoverThumbnailFeatureArticleBw';
import CoverThumbnailCreatorSpotlight from './imports/CoverThumbnailCreatorSpotlight';
import CoverThumbnailAnnouncement1 from './imports/CoverThumbnailAnnouncement1';
import { FlipBoardText } from './components/FlipBoardText';
import FeedExternal from './feedexternal/Feed';

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
      const s = Math.min(w / 1512, h / 851);
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

function FeedArticlePreview({
  page,
  meta
}: {
  page: SavedPage;
  meta?: {
    title: string;
    category: string;
    savedAt: string;
  };
}) {
  const [scale, setScale] = useState(1);
  const [mobileWidth, setMobileWidth] = useState<number | null>(null);
  const isMobileOrTablet = useIsMobileOrTablet();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [pageHeights, setPageHeights] = useState<Record<string, number>>({});
  const pagesSource = Array.isArray(page.pages) && page.pages.length > 0 ? page.pages : page.content ? [page.content] : [];
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
  const showProducts = page.hasFeaturedProducts !== false;
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
      setScale(Math.min(1, w / 1512));
    };
    update();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }
    const observer = new ResizeObserver(update);
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [isMobileOrTablet]);

  useEffect(() => {
    if (isMobileOrTablet) return;
    let frameId = 0;
    const measure = () => {
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
        // Only enforce 851px minimum height for standard pages and covers, not for products
        const minHeight = key.endsWith('-products') ? 0 : 851;
        nextHeights[key] = Math.max(minHeight, Math.ceil(measuredHeight));
      });
      setPageHeights((prev) => {
        const prevKeys = Object.keys(prev);
        const nextKeys = Object.keys(nextHeights);
        if (prevKeys.length !== nextKeys.length) {
          return nextHeights;
        }
        for (const key of nextKeys) {
          if (prev[key] !== nextHeights[key]) {
            return nextHeights;
          }
        }
        return prev;
      });
    };
    frameId = window.requestAnimationFrame(measure);
    return () => window.cancelAnimationFrame(frameId);
  }, [measuredKeys, scale]);

  const renderPageForReadingMode = (renderPage: FeedPageItem, index: number) => {
    if (renderPage.styleType === 'intro') {
      const isIntroWithoutImage = !renderPage.images.coverImage;
      return (
        <div
          className="w-full h-full relative flex items-center"
          style={{
            backgroundColor: styles.background,
            paddingLeft: '20.6px'
          }}
        >
          <div
            className="relative"
            style={{
              width: '1512px',
              height: isIntroWithoutImage ? 'auto' : '851px',
              minHeight: isIntroWithoutImage ? '851px' : undefined,
              transform: 'scale(0.85)',
              transformOrigin: 'left center'
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
                iconCount1={renderPage.fields.iconCount1 || ''}
                iconCount2={renderPage.fields.iconCount2 || ''}
                textPrimary={styles.textPrimary}
                textAccent={styles.textAccent}
                fontFamily={styles.fontFamily}
                efx={renderPage.efx}
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

  const renderMobileTextBlocks = (paragraphHeaders?: { id: string; text: string }[], bodyCopies?: { afterHeaderId?: string; text: string }[]) => {
    const standalone = bodyCopies?.filter((b) => !b.afterHeaderId) || [];
    return (
      <div className="flex flex-col gap-[12px]">
        {standalone.map((copy, index) => (
          <div
            key={`standalone-${index}`}
            className="text-[15px] leading-[24px]"
            style={{ color: styles.textPrimary, whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: copy.text || '' }}
          />
        ))}
        {paragraphHeaders?.map((header) => {
          const bodyCopy = bodyCopies?.find((b) => b.afterHeaderId === header.id);
          return (
            <div key={header.id} className="flex flex-col gap-[8px]">
              {header.text && (
                <div className="text-[13px] font-semibold tracking-wider" style={{ color: styles.textAccent }}>
                  {header.text}
                </div>
              )}
              {bodyCopy?.text && (
                <div
                  className="text-[15px] leading-[24px]"
                  style={{ color: styles.textPrimary, whiteSpace: 'pre-wrap' }}
                  dangerouslySetInnerHTML={{ __html: bodyCopy.text }}
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
        <div className="flex flex-col gap-[14px]" style={{ padding: '18px 16px 10px', backgroundColor: styles.background }}>
          {topLabel && (
            <div className="text-[11px] font-semibold tracking-wider" style={{ color: styles.textGold }}>
              {topLabel}
            </div>
          )}
          <div className="text-[34px] font-light leading-[40px]" style={{ color: styles.textPrimary }}>
            <FlipBoardText
              text={renderPage.fields?.title || page.coverData?.title || page.name || 'Untitled'}
              isAnimating={isAnimating}
              fontFamily={styles.fontFamily}
              fontSize="34px"
              fontWeight="300"
              color={styles.textPrimary}
              lineHeight="40px"
            />
          </div>
          {renderPage.fields?.author && (
            <div className="text-[12px] font-semibold" style={{ color: styles.textPrimary }}>
              {renderPage.fields.author}
            </div>
          )}
          {coverImage && (
            <div
              className="w-full overflow-hidden"
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
            </div>
          )}
          {renderPage.fields?.headline && (
            <div className="text-[16px] font-semibold leading-[22px]" style={{ color: styles.textAccent }}>
              {renderPage.fields.headline}
            </div>
          )}
          {renderPage.fields?.description && (
            <div
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
              <div className="text-[11px] font-semibold tracking-wider" style={{ color: styles.textGold }}>
                {renderPage.fields.topLabel}
              </div>
            )}
            {renderPage.fields?.bodyCopies?.[0]?.text && (
              <div
                className="text-[16px] leading-[24px]"
                style={{ color: styles.textPrimary, whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{ __html: renderPage.fields.bodyCopies[0].text }}
              />
            )}
            {renderMobileTextBlocks(renderPage.fields?.paragraphHeaders, renderPage.fields?.bodyCopies?.slice(1))}
            {renderPage.images?.image1 && (
              <div className="w-full">
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
              </div>
            )}
            {renderPage.images?.image2 && (
              <div className="w-full">
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
              </div>
            )}
          </div>
        );
      }
      if (renderPage.selectedStyle === 2 || renderPage.selectedStyle === 3) {
        return (
          <div className="flex flex-col gap-[16px]" style={{ padding: '12px 16px 18px', backgroundColor: styles.background }}>
            {renderPage.fields?.topLabel && (
              <div className="text-[11px] font-semibold tracking-wider" style={{ color: styles.textGold }}>
                {renderPage.fields.topLabel}
              </div>
            )}
            {renderMobileTextBlocks(renderPage.fields?.paragraphHeaders, renderPage.fields?.bodyCopies)}
            {renderPage.images?.image1 && (
              <div className="w-full">
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
              </div>
            )}
            {renderPage.images?.image2 && (
              <div className="w-full">
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
              </div>
            )}
          </div>
        );
      }
      if (renderPage.selectedStyle === 4) {
        return (
          <div className="flex flex-col gap-[16px]" style={{ padding: '12px 16px 18px', backgroundColor: styles.background }}>
            {renderPage.fields?.topLabel && (
              <div className="text-[11px] font-semibold tracking-wider" style={{ color: styles.textGold }}>
                {renderPage.fields.topLabel}
              </div>
            )}
            {renderPage.images?.image1 && (
              <div className="w-full flex flex-col gap-[6px]">
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
                  <div className="text-[12px]" style={{ color: styles.textPrimary, whiteSpace: 'pre-wrap' }}>
                    <div className="font-semibold">{renderPage.fields?.caption1Title}</div>
                    <div className="opacity-80">{renderPage.fields?.caption1Subtitle}</div>
                  </div>
                )}
              </div>
            )}
            {renderPage.images?.image2 && (
              <div className="w-full flex flex-col gap-[6px]">
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
                  <div className="text-[12px]" style={{ color: styles.textPrimary, whiteSpace: 'pre-wrap' }}>
                    <div className="font-semibold">{renderPage.fields?.caption2Title}</div>
                    <div className="opacity-80">{renderPage.fields?.caption2Subtitle}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  const mobileScale = mobileWidth ? mobileWidth / 375 : 1;
  const recommendedMinHeight = Math.ceil(420 * mobileScale);

  if (isMobileOrTablet) {
    return (
      <div ref={wrapperRef} className="w-full" style={{ backgroundColor: styles.background }}>
        {hasCover && (
          <div className="w-full" style={{ padding: '16px 16px 8px' }}>
            {page.coverData ? (
              <div
                className="w-full relative overflow-hidden"
                style={{
                  aspectRatio: '1512 / 851',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '6px',
                  border: '1px solid #2a2a2a'
                }}
              >
                <CoverComposite data={page.coverData} />
              </div>
            ) : page.coverImage ? (
              <div
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
              </div>
            ) : null}
          </div>
        )}
        {pages.map((renderPage) => (
          <div key={`mobile-${renderPage.id}`}>{renderMobilePage(renderPage)}</div>
        ))}
        {showProducts && (
          <div className="w-full" style={{ backgroundColor: styles.background, paddingBottom: '8px' }}>
            <ProductCarousel />
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
      {meta ? (
        <div>
          <div className="flex items-center gap-[12px] mb-[12px]">
            <span className="text-[11px] font-bold tracking-wider" style={{ color: '#a79755' }}>
              {meta.category}
            </span>
            <span className="text-[11px]" style={{ color: '#9e9e9d' }}>
              •
            </span>
            <span className="text-[11px]" style={{ color: '#9e9e9d' }}>
              {meta.savedAt}
            </span>
          </div>
          <h3
            className="font-bold"
            style={{
              color: '#f1f0eb',
              fontSize: '22px'
            }}
          >
            {meta.title}
          </h3>
        </div>
      ) : null}
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
                <div
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
                </div>
              </div>
            </div>
          )}
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
                {renderSequentialPage(renderPage)}
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
                <div
                  className="w-full flex items-start justify-center"
                  style={{
                    backgroundColor: styles.background,
                    paddingTop: isMobileOrTablet ? '0px' : '50px',
                    paddingBottom: isMobileOrTablet ? '0px' : '20px'
                  }}
                >
                  <ProductCarousel />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeedPage({
  onBackToLanding,
  savedPages
}: {
  onBackToLanding: () => void;
  savedPages: SavedPage[];
}) {
  const isMobileOrTablet = useIsMobileOrTablet();
  const publishedPages = savedPages
    .filter(page => page.isPublished)
    .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());

  const [visibleCount, setVisibleCount] = useState(5);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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
              Back to Dashboard
            </button>
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
                style={{
                  color: '#f1f0eb',
                  letterSpacing: '-0.02em',
                  fontSize: isMobileOrTablet ? '28px' : '36px'
                }}
              >
                Feed
              </h1>
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
                <div key={page.id}>
                  {index > 0 && (
                    <div 
                      style={{ 
                        height: '1px', 
                        backgroundColor: '#2a2a2a', 
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
                  />
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
          <RecommendedArticles />
        </div>
      </div>
    </div>
  );
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
      if (path.startsWith('/feed')) {
        setCurrentView('feed');
      } else if (path === '/' || path === '') {
        setCurrentView('landing');
      }
    };
    syncFromPath();
    window.addEventListener('popstate', syncFromPath);
    return () => window.removeEventListener('popstate', syncFromPath);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname.toLowerCase();
    if (currentView === 'feed' && !path.startsWith('/feed')) {
      window.history.pushState({}, '', '/feed');
    }
    if (currentView !== 'feed' && path.startsWith('/feed')) {
      window.history.pushState({}, '', '/');
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

  const handleOpenFeedTest = () => {
    setCurrentView('feedTest');
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
        onOpenFeedTest={handleOpenFeedTest}
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

  if (currentView === 'feedTest') {
    return (
      <div className="min-h-screen bg-[#1a1a1a]">
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={handleBackToLanding}
            className="px-4 py-2 bg-black/50 text-white rounded-md hover:bg-black/70 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
        <FeedExternal />
      </div>
    );
  }

  return null;
}
