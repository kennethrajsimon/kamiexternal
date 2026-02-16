'use client';

import { useState, useRef, useEffect } from 'react';
import { Settings, X, Upload, Download, ArrowLeft, ChevronDown, Trash2, Palette, Type, Eye } from 'lucide-react';
import { RichTextEditor } from './components/RichTextEditor';
import { ImageUploader } from './components/ImageUploader';
import { SimpleSelect } from './components/SimpleSelect';
import { ReadingModeV4 } from './components/ReadingModeV4';
import { ContentStyle1BackgroundLayer, ContentStyle1ImageLayer, ContentStyle1TextLayer } from './components/content-styles/ContentStyle1V4Layers';
import { ContentStyle2BackgroundLayer, ContentStyle2ImageLayer, ContentStyle2TextLayer } from './components/content-styles/ContentStyle2V4Layers';
import { ContentStyle3BackgroundLayer, ContentStyle3ImageLayer, ContentStyle3TextLayer } from './components/content-styles/ContentStyle3V4Layers';
import { ContentStyle4BackgroundLayer, ContentStyle4ImageLayer, ContentStyle4TextLayer } from './components/content-styles/ContentStyle4V4Layers';
import { OpeningStyle1BackgroundLayer, OpeningStyle1ImageLayer, OpeningStyle1TextLayer } from './components/opening-styles/OpeningStyle1V4Layers';
import CoverThumbnailFeatureArticleColour from './imports/CoverThumbnailFeatureArticleColour';
import CoverThumbnailFeatureArticleBw from './imports/CoverThumbnailFeatureArticleBw';
import CoverThumbnailCreatorSpotlight from './imports/CoverThumbnailCreatorSpotlight';
import CoverThumbnailAnnouncement from './imports/CoverThumbnailAnnouncement1';
import { OpeningStyle1 } from './components/OpeningStyle1';
import ContentStyle1V4 from './components/ContentStyle1V4';
import ContentStyle2V4 from './components/ContentStyle2V4';
import ContentStyle3V4 from './components/ContentStyle3V4';
import ContentStyle4V4 from './components/ContentStyle4V4';
import { useIsMobile, useIsMobileOrTablet } from './hooks/useMediaQuery';
import { MobileCoverCarousel } from './components/MobileCoverCarousel';
import { MobilePropertiesSheet } from './components/MobilePropertiesSheet';
import { MobilePropertiesContent } from './components/MobilePropertiesContent_NEW';
import { MobileCoverProperties } from './components/MobileCoverProperties';
import { MobileContentStyle1Properties } from './components/MobileContentStyle1Properties';
import { MobileNav } from './components/MobileNav';
import { saveDraft, getDrafts, getDraftById, getProductSets } from './services/api';
import _imgCoverImage from "./assets/67d0f537221b199b259a2444a228f3a95653ff33.png";
import _imgMaleDesigner from "./assets/1e2c0b75f3380f734d584408cd01b575701ebed4.png";
import _imgFemaleDesigner from "./assets/39c384392b8924f5f2b6d757fe522edd04101ed2.png";
import _imgCampLogo from "./assets/f8364a5e1f572a61802f72d01f6eab70396e6bc7.png";
import _imgSoneiumLogo from "./assets/57df19e0e769b6da97fd76228c7f13433332947b.png";
import _imgStyle3Image1 from "./assets/b0eb03c8bf3a51ca66cc1b87518c081d760dae4f.png";
import _imgStyle3Image2 from "./assets/88b7a9c7b89b680757a69a6111f92ad0051f123b.png";
import _imgDefaultCoverHero from "./assets/931ef8e14bd8f3516acd9bea1676dbd4b8d4987d.png";
import _imgDefaultBWHero from "./assets/34c2e0eace15e343a1c923bac054f892ff3c7f6f.png";
import _imgDefaultCreatorSpotlightHero from "./assets/c5ce4e47ab90e08210a558deb1f6e4cba2392c2a.png";
import _imgDefaultAnnouncementSecond from "./assets/36a8297e1a2ddc90473646931c66462380d62ee9.png";
import _imgSingkarpor from "./assets/5a6d34f55aa6a2ffd4c21bc63ef106a349833da7.png";
import _imgSingkarpor2 from "./assets/c79bba76c09347c9a0a4a11787908716f7527a3a.png";
const imgCoverImage = (_imgCoverImage as any).src || _imgCoverImage;
const imgMaleDesigner = (_imgMaleDesigner as any).src || _imgMaleDesigner;
const imgFemaleDesigner = (_imgFemaleDesigner as any).src || _imgFemaleDesigner;
const imgCampLogo = (_imgCampLogo as any).src || _imgCampLogo;
const imgSoneiumLogo = (_imgSoneiumLogo as any).src || _imgSoneiumLogo;
const imgStyle3Image1 = (_imgStyle3Image1 as any).src || _imgStyle3Image1;
const imgStyle3Image2 = (_imgStyle3Image2 as any).src || _imgStyle3Image2;
const imgDefaultCoverHero = (_imgDefaultCoverHero as any).src || _imgDefaultCoverHero;
const imgDefaultBWHero = (_imgDefaultBWHero as any).src || _imgDefaultBWHero;
const imgDefaultCreatorSpotlightHero = (_imgDefaultCreatorSpotlightHero as any).src || _imgDefaultCreatorSpotlightHero;
const imgDefaultAnnouncementSecond = (_imgDefaultAnnouncementSecond as any).src || _imgDefaultAnnouncementSecond;
const imgSingkarpor = (_imgSingkarpor as any).src || _imgSingkarpor;
const imgSingkarpor2 = (_imgSingkarpor2 as any).src || _imgSingkarpor2;

interface ParagraphHeader {
  id: string;
  text: string;
}

interface BodyCopy {
  id: string;
  afterHeaderId?: string;
  text: string;
}

interface Page {
  id: string;
  pageNumber: number | 'cover'; // 'cover' for Cover Thumbnail, numbers for PAGE 1, 2, 3...
  styleType: 'cover' | 'intro' | 'content';
  selectedStyle: number;
  images: {
    coverImage?: string | null;
    coverImage2?: string | null;
    coverBackgroundImage?: string | null;
    image1?: string | null;
    image2?: string | null;
  };
  imageFits: {
    coverImageFit?: 'cover' | 'contain';
    coverImageFit2?: 'cover' | 'contain';
    coverBackgroundImageFit?: 'cover' | 'contain';
    image1Fit?: 'cover' | 'contain';
    image2Fit?: 'cover' | 'contain';
  };
  fields: {
    // Cover Thumbnail fields
    coverCategory?: string;
    coverTitle?: string;
    coverBackgroundColor?: string;
    coverBackgroundText?: string;
    coverBackgroundTextColor?: string;
    coverBackgroundTextStyle?: 'fill' | 'stroke';
    coverIconCount1?: string;
    coverIconCount2?: string;

    // Cover Thumbnail visibility options
    showHeroImage?: boolean;
    showBackgroundText?: boolean;
    showBackgroundColor?: boolean;

    // Intro page fields (PAGE 1)
    title?: string;
    author?: string;
    headline?: string;
    description?: string;
    subheader?: string; // deprecated, use headline instead
    bodyCopy1?: string; // deprecated, use description instead
    iconCount1?: string;
    iconCount2?: string;
    showHeadline?: boolean;
    showTopLabel?: boolean; // Toggle to show/hide top label on page 1

    // Content page fields (PAGE 2+)
    topLabel?: string;
    paragraphHeaders?: ParagraphHeader[];
    bodyCopies?: BodyCopy[];

    // Content Style 4 caption fields
    caption1Title?: string;
    caption1Subtitle?: string;
    caption2Title?: string;
    caption2Subtitle?: string;
    showCaption1?: boolean;
    showCaption2?: boolean;
  };
  efx?: {
    glitch: boolean;
    blur: boolean;
    chromatic: boolean;
    shake: boolean;
    distort: boolean;
  };
  hasFeaturedProducts?: boolean;
  productSetId?: string;
}

interface ContentDashboardV4Props {
  onBackToLanding?: () => void;
  loadedPageId?: string | null;
  savedPages?: any[];
  onUpdateSavedPages?: (pages: any[]) => void;
}

export default function ContentDashboardV4({ onBackToLanding, loadedPageId: _loadedPageId, savedPages: _savedPages, onUpdateSavedPages: _onUpdateSavedPages }: ContentDashboardV4Props) {
  // Track the saved page ID so subsequent saves update the same article
  const savedPageIdRef = useRef<string | null>(_loadedPageId || null);
  // Sync ref when the prop changes (e.g. navigating to edit a different article)
  useEffect(() => { savedPageIdRef.current = _loadedPageId || null; }, [_loadedPageId]);

  // Responsive hooks
  const isMobile = useIsMobile();
  const isMobileOrTablet = useIsMobileOrTablet();
  const [windowSize, setWindowSize] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 375, height: typeof window !== 'undefined' ? window.innerHeight : 667 });

  // Window resize handler for mobile scaling
  useEffect(() => {
    if (!isMobileOrTablet) return;

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileOrTablet]);

  const [propertiesPanelOpen, setPropertiesPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [isReadingMode, setIsReadingMode] = useState(false);

  // Debug: Track showStyleModal changes
  useEffect(() => {
    console.log('showStyleModal state changed to:', showStyleModal);
  }, [showStyleModal]);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isTitleAnimating, setIsTitleAnimating] = useState(false);

  // Mobile-specific state
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);

  // Transition animation state for Cover → Reading Mode
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [_transitionPhase, setTransitionPhase] = useState<'idle' | 'scaleUp' | 'zoom' | 'fade'>('idle');

  // Product Sets State
  const [productSets, setProductSets] = useState<any[]>([]);

  useEffect(() => {
    getProductSets().then(setProductSets).catch(err => console.error('Failed to load product sets', err));
  }, []);


  // Page management - Start with Cover Thumbnail
  const [docPages, setDocPages] = useState<Page[]>([
    {
      id: 'cover',
      pageNumber: 'cover',
      styleType: 'cover',
      selectedStyle: 1,
      images: {
        coverImage: imgDefaultCoverHero,
        coverImage2: null,
        coverBackgroundImage: null
      },
      imageFits: {
        coverImageFit: 'cover',
        coverImageFit2: 'contain',
        coverBackgroundImageFit: 'cover'
      },
      fields: {
        coverCategory: 'CATEGORY TYPE',
        coverTitle: 'ENTER HEADLINE HERE',
        coverBackgroundText: 'FIGHTING!',
        coverBackgroundColor: '#fb00b8',
        coverBackgroundTextColor: '#f1f0eb',
        coverBackgroundTextStyle: 'stroke',
        coverIconCount1: '1.2M',
        coverIconCount2: '847K',
        showHeroImage: true,
        showBackgroundText: true,
        showBackgroundColor: true
      },
      hasFeaturedProducts: false,
      efx: {
        glitch: true,
        blur: false,
        chromatic: false,
        shake: false,
        distort: false
      }
    },
    {
      id: '1',
      pageNumber: 1,
      styleType: 'intro',
      selectedStyle: 1,
      images: {
        coverImage: imgCoverImage,
        coverImage2: null
      },
      imageFits: {
        coverImageFit: 'cover',
        coverImageFit2: 'contain'
      },
      fields: {
        title: 'BEYOND THE SCREENSHOT',
        topLabel: '',
        author: 'KAMI Editorial Team',
        headline: 'How KAMI, Soneium and Camp Network are building the global fortress for creator IP.',
        description: 'Until now, "protecting your work" was just another way of saying "fingers crossed." KAMI is ending the era of creative theft and replacing it with unshakeable onchain infrastructure powered by the world\'s biggest names in creativity.',
        showTopLabel: false
      }
    }
  ]);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const setPages = setDocPages;
  const currentPage = docPages[currentPageIndex];

  // EFX Visual Effects state - Derived from current page
  const getCurrentEfx = () => {
    return docPages[currentPageIndex]?.efx || {
      glitch: false,
      blur: false,
      chromatic: false,
      shake: false,
      distort: false
    };
  };

  const updateCurrentPageEfx = (key: 'glitch' | 'blur' | 'chromatic' | 'shake' | 'distort', value: boolean) => {
    setDocPages(prev => {
      const newPages = [...prev];
      if (!newPages[currentPageIndex]) return prev;

      const page = { ...newPages[currentPageIndex] };
      page.efx = {
        ...(page.efx || {
          glitch: false,
          blur: false,
          chromatic: false,
          shake: false,
          distort: false
        }),
        [key]: value
      };
      newPages[currentPageIndex] = page;
      return newPages;
    });
  };

  const efxGlitch = getCurrentEfx().glitch;
  const efxBlur = getCurrentEfx().blur;
  const efxChromatic = getCurrentEfx().chromatic;
  const efxShake = getCurrentEfx().shake;
  const efxDistort = getCurrentEfx().distort;

  const setEfxGlitch = (val: boolean) => updateCurrentPageEfx('glitch', val);
  const setEfxBlur = (val: boolean) => updateCurrentPageEfx('blur', val);
  const setEfxChromatic = (val: boolean) => updateCurrentPageEfx('chromatic', val);
  const setEfxShake = (val: boolean) => updateCurrentPageEfx('shake', val);
  const setEfxDistort = (val: boolean) => updateCurrentPageEfx('distort', val);


  // Global styles
  const [styles, setStyles] = useState({
    background: '#1a1a1a',
    backgroundColor: '#1a1a1a',
    textPrimary: '#f1f0eb',
    textAccent: '#11ff49',
    textGold: '#a79755',
    fontFamily: 'Inter',
    secondaryColor1: '#fb00b8',
    secondaryColor2: '#a79755',
    coverTitleSize: '60px',
    coverTitleWeight: '400',
    headlineSize: '20px',
    headlineWeight: '400',
    authorSize: '13px',
    authorWeight: '400',
    descriptionSize: '15px',
    descriptionWeight: '400',
    iconCountSize: '10px',
    topLabelSize: '12px',
    topLabelWeight: '400',
    introFontSize: '20px',
    introWeight: '400'
  });

  useEffect(() => {
    if (_onUpdateSavedPages) {
      getDrafts().then((list) => {
        _onUpdateSavedPages(list);
      }).catch(() => { });
    }
  }, []);

  // Load saved draft into dashboard
  useEffect(() => {
    if (!_loadedPageId) return;
    const loadFromSaved = (saved: any) => {
      if (!saved) return;
      try {
        if (saved.pages && Array.isArray(saved.pages)) {
          const normalizedPages = normalizePagesForSave(saved.pages);
          // Ensure cover page has heroImage from coverData if its own is missing
          const coverIdx = normalizedPages.findIndex((p: any) => p.pageNumber === 'cover');
          if (coverIdx >= 0 && !normalizedPages[coverIdx].images?.coverImage && saved.coverData?.heroImage) {
            normalizedPages[coverIdx] = {
              ...normalizedPages[coverIdx],
              images: { ...normalizedPages[coverIdx].images, coverImage: saved.coverData.heroImage }
            };
          }
          setDocPages(normalizedPages);
          setCurrentPageIndex(saved.currentPageIndex ?? 0);
        } else if (saved.content) {
          const coverDefaults = {
            id: 'cover',
            pageNumber: 'cover' as const,
            styleType: 'cover' as const,
            selectedStyle: saved.coverData?.selectedStyle ?? 1,
            images: {
              coverImage: saved.coverData?.heroImage ?? null,
              coverImage2: saved.coverData?.heroImage2 ?? null,
              coverBackgroundImage: saved.coverData?.backgroundImage ?? null
            },
            imageFits: {
              coverImageFit: saved.coverData?.imageFit ?? 'cover',
              coverImageFit2: 'contain',
              coverBackgroundImageFit: saved.coverData?.backgroundImageFit ?? 'cover'
            },
            fields: {
              coverCategory: saved.coverData?.category ?? 'CATEGORY TYPE',
              coverTitle: saved.coverData?.title ?? 'ENTER HEADLINE HERE',
              coverBackgroundText: saved.coverData?.backgroundText ?? '',
              coverBackgroundColor: saved.coverData?.backgroundColor ?? '#fb00b8',
              coverBackgroundTextColor: saved.coverData?.backgroundTextColor ?? '#f1f0eb',
              coverBackgroundTextStyle: saved.coverData?.backgroundTextStyle ?? 'fill',
              coverIconCount1: '',
              coverIconCount2: '',
              showHeroImage: saved.coverData?.showHeroImage ?? true,
              showBackgroundText: saved.coverData?.showBackgroundText ?? true,
              showBackgroundColor: saved.coverData?.showBackgroundColor ?? true
            }
          };
          const restoredPage = normalizePagesForSave([saved.content])[0];
          setDocPages([coverDefaults, restoredPage]);
          setCurrentPageIndex(1);
        }
        if (saved.styles) setStyles(saved.styles);
      } catch (err) {
        console.error('Error loading draft into dashboard:', err);
      }
    };
    if (_savedPages && Array.isArray(_savedPages)) {
      const fromList = _savedPages.find((p: any) => p.id === _loadedPageId);
      loadFromSaved(fromList);
    } else {
      getDraftById(_loadedPageId)
        .then(loadFromSaved)
        .catch((err) => console.error('Failed to fetch draft by id:', err));
    }
  }, [_loadedPageId, _savedPages]);

  // Animation Effect - Flip board animation loop for Top Label
  useEffect(() => {
    const animationDuration = 2000; // 2 seconds for animation
    const pauseDuration = 5000; // 5 seconds pause
    const totalCycleDuration = animationDuration + pauseDuration; // 7 seconds total

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), animationDuration);
    }, totalCycleDuration);

    return () => clearInterval(interval);
  }, []); // Run once on mount and keep looping

  // Mobile content pages - auto-enable reading mode
  useEffect(() => {
    if (isMobileOrTablet && currentPage.styleType !== 'cover' && !isReadingMode) {
      setIsReadingMode(true);
    }
  }, [isMobileOrTablet, currentPage.styleType, isReadingMode]);

  // Title Animation Effect - Play once when entering reading mode on Page 1
  useEffect(() => {
    const animationDuration = 3000; // 3 seconds for animation

    // Only trigger if we're in reading mode and on Page 1 (index 0)
    if (isReadingMode && currentPageIndex === 0 && !isTitleAnimating) {
      const timer = setTimeout(() => {
        setIsTitleAnimating(true);
        setTimeout(() => setIsTitleAnimating(false), animationDuration);
      }, 300); // Small delay to ensure page is rendered

      return () => clearTimeout(timer);
    }
  }, [isReadingMode, currentPageIndex]); // Trigger when entering reading mode or changing page

  // Update root field for current page
  const updatePageRoot = (key: string, value: any) => {
    setDocPages(prev => {
      const newPages = [...prev];
      const page = { ...newPages[currentPageIndex], [key]: value };
      newPages[currentPageIndex] = page;
      return newPages;
    });
  };

  // Update field for current page
  const updatePageField = (fieldPath: string, value: any) => {
    setDocPages(prev => {
      const newPages = [...prev];
      const page = { ...newPages[currentPageIndex] };
      const fields = { ...page.fields };

      if (fieldPath.includes('.')) {
        const [parent, child] = fieldPath.split('.');
        (fields as any)[parent] = {
          ...(fields as any)[parent],
          [child]: value
        };
      } else {
        (fields as any)[fieldPath] = value;
      }

      // Auto-sync topLabel with title for PAGE 2
      if (fieldPath === 'title' && page.pageNumber === 2) {
        (fields as any)['topLabel'] = value;
      }

      page.fields = fields;
      newPages[currentPageIndex] = page;
      return newPages;
    });
  };

  const normalizePagesForSave = (pagesToNormalize: Page[]) =>
    pagesToNormalize.map((page) => {
      if (page.styleType !== 'content') return page;
      return {
        ...page,
        fields: {
          ...page.fields,
          topLabel: page.fields?.topLabel ?? ''
        }
      };
    });

  // Image upload handler
  const handleImageUpload = async (imageKey: 'coverImage' | 'coverImage2' | 'image1' | 'image2', file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setDocPages(prev => {
          const newPages = [...prev];
          const page = { ...newPages[currentPageIndex] };
          page.images = {
            ...page.images,
            [imageKey]: data.url
          };
          newPages[currentPageIndex] = page;
          return newPages;
        });
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Delete image
  const deleteImage = (imageKey: 'coverImage' | 'coverImage2' | 'image1' | 'image2') => {
    setDocPages(prev => {
      const newPages = [...prev];
      const page = { ...newPages[currentPageIndex] };
      page.images = {
        ...page.images,
        [imageKey]: null
      };
      newPages[currentPageIndex] = page;
      return newPages;
    });
  };

  // Delete current page
  const deletePage = () => {
    if (docPages.length <= 1) {
      alert('Cannot delete the last page');
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete this page?`);
    if (!confirmDelete) return;

    setDocPages(prev => prev.filter((_, index) => index !== currentPageIndex));
    setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
  };

  // Add paragraph header
  const addParagraphHeader = () => {
    if (currentPage.styleType !== 'content') return;

    const newHeader: ParagraphHeader = {
      id: `header-${Date.now()}`,
      text: ''
    };

    const newBodyCopy: BodyCopy = {
      id: `body-${Date.now()}`,
      afterHeaderId: newHeader.id,
      text: ''
    };

    setDocPages(prev => {
      const newPages = [...prev];
      const page = { ...newPages[currentPageIndex] };
      const fields = { ...page.fields };

      fields.paragraphHeaders = [...(fields.paragraphHeaders || []), newHeader];
      fields.bodyCopies = [...(fields.bodyCopies || []), newBodyCopy];

      page.fields = fields;
      newPages[currentPageIndex] = page;
      return newPages;
    });
  };

  // Add new page
  const addPage = (styleNumber: number) => {
    console.log('Adding page with style:', styleNumber);
    const newPageNumber = docPages.filter(p => typeof p.pageNumber === 'number').length + 1;

    // Determine if this is the first page after cover (PAGE 1 - intro) or subsequent pages (content)
    const isIntroPage = newPageNumber === 1;

    // Get PAGE 1's title to use as default topLabel for PAGE 2
    const page1 = docPages.find(p => p.pageNumber === 1);
    const defaultTopLabel = page1?.fields?.title || 'BEYOND THE SCREENSHOT';

    // Default content based on style
    let defaultFields: any = {};
    let defaultImages: any = {};

    if (isIntroPage) {
      defaultFields = {
        title: 'BEYOND THE SCREENSHOT',
        topLabel: '',
        author: 'KAMI Editorial Team',
        headline: 'How KAMI, Soneium and Camp Network are building the global fortress for creator IP.',
        description: 'Until now, "protecting your work" was just another way of saying "fingers crossed." KAMI is ending the era of creative theft and replacing it with unshakeable onchain infrastructure powered by the world\'s biggest names in creativity.',
        iconCount1: '1.2M',
        iconCount2: '847K',
        showHeadline: true,
        showTopLabel: false // Default to OFF
      };
      defaultImages = { coverImage: imgCoverImage };
    } else {
      // Content pages - different defaults based on style
      // For PAGE 2, use empty string for topLabel by default
      const topLabelValue = '';

      if (styleNumber === 1) {
        defaultFields = {
          topLabel: topLabelValue,
          paragraphHeaders: [
            {
              id: 'header-1',
              text: 'The Digital Paper Trail'
            }
          ],
          bodyCopies: [
            {
              id: 'body-1',
              text: 'In the traditional creative world, your Intellectual Property (IP) is a ghost. It lives in the metadata of a Photoshop file, the "sent" folder of an email thread, or the timestamp of a voice memo.'
            },
            {
              id: 'body-2',
              afterHeaderId: 'header-1',
              text: 'We believe that IP shouldn\'t be a reactive legal headache; it should be a proactive digital shield. On KAMI, the creative process itself generates the protection.\n\nEvery sketch, every draft, every beat, and every conceptual pivot becomes a timestamped, immutable, and verifiable trail of authorship. By anchoring these assets onchain, we transform a "file" into a Cultural RWA (Real World Asset) a programmable unit of value that carries its rights and its history wherever it goes.'
            }
          ]
        };
        defaultImages = { image1: imgMaleDesigner, image2: imgFemaleDesigner };
      } else if (styleNumber === 2) {
        defaultFields = {
          topLabel: topLabelValue,
          paragraphHeaders: [
            {
              id: 'header-1',
              text: 'Mainstream Power: The Soneium Integration'
            },
            {
              id: 'header-2',
              text: 'The IP Infrastructure Layer: Camp Network'
            }
          ],
          bodyCopies: [
            {
              id: 'body-1',
              text: 'To bring this vision to billions, we have aligned with Soneium, the next-generation Ethereum Layer-2 developed by Sony Block Solutions Labs.'
            },
            {
              id: 'body-2',
              afterHeaderId: 'header-1',
              text: 'Soneium\'s ethos "Realise the Open Internet that Transcends Boundaries" is the perfect home for KAMI. Sony has spent decades "filling the world with emotion through the power of creativity and technology," and now, KAMI creators can leverage that same institutional-grade infrastructure.\n\nBy building on Soneium, KAMI ensures that creator rights aren\'t just protected in a niche corner of the web, they are protected on a chain designed for mainstream adoption – high-throughput and global distribution. Whether you are launching an iconic anime IP or a community-driven meme, Soneium provides the "heartbeat" for the value loop where creators finally get paid fairly.'
            },
            {
              id: 'body-3',
              afterHeaderId: 'header-2',
              text: 'While Soneium provides the global reach, our partnership with Camp Network provides the specialised "value layer." Camp is the modular infrastructure built specifically for the future of digital ownership.'
            }
          ]
        };
        defaultImages = { image1: imgCampLogo, image2: imgSoneiumLogo };
      } else if (styleNumber === 3) {
        defaultFields = {
          topLabel: topLabelValue,
          paragraphHeaders: [
            {
              id: 'header-1',
              text: 'This is IP Done Right'
            }
          ],
          bodyCopies: [
            {
              id: 'body-1',
              text: 'The old way of protecting work was gatekept by expensive lawyers and opaque systems. The KAMI way is permissionless and transparent.'
            },
            {
              id: 'body-2',
              afterHeaderId: 'header-1',
              text: 'We aren\'t just giving you a platform to share your work; we\'re giving you the fortress to own it. Because we know that if you don\'t own your IP, you don\'t own your future.\n\n<strong>OWN YOUR LEGACY.</strong>\n\nWith KAMI\'s IP-first creative ecosystem, you can stop hoping your work is safe and start knowing it is.\n\n\n[SECURE YOUR IP ON SONEIUM]  |  [EXPLORE THE ECOSYSTEM]'
            }
          ]
        };
        defaultImages = { image1: imgStyle3Image1, image2: imgStyle3Image2 };
      } else if (styleNumber === 4) {
        defaultFields = {
          topLabel: topLabelValue,
          caption1Title: 'ARTWORK TITLE',
          caption1Subtitle: 'Brief description',
          caption2Title: 'ARTWORK TITLE',
          caption2Subtitle: 'Brief description',
          showCaption1: true,
          showCaption2: true
        };
        defaultImages = {
          image1: imgSingkarpor,
          image2: imgSingkarpor2
        };
      } else {
        defaultFields = {
          topLabel: '',
          paragraphHeaders: [],
          bodyCopies: [{ id: `body-${Date.now()}`, text: '' }]
        };
        defaultImages = { image1: null, image2: null };
      }
    }

    const newPage: Page = {
      id: `${Date.now()}`,
      pageNumber: newPageNumber,
      styleType: isIntroPage ? 'intro' : 'content',
      selectedStyle: styleNumber,
      images: defaultImages,
      imageFits: isIntroPage ? {
        coverImageFit: 'cover'
      } : {
        image1Fit: 'cover',
        image2Fit: 'cover'
      },
      fields: defaultFields,
      hasFeaturedProducts: false
    };

    setDocPages(prev => [...prev, newPage]);
    setCurrentPageIndex(docPages.length);
    setShowStyleModal(false);
  };

  // Helper: upload image to server if it's not already an /uploads/ path
  const ensureImageUploaded = async (imageUrl: string | null | undefined): Promise<string | null> => {
    if (!imageUrl) return null;
    // Already an uploaded server path — no action needed
    if (imageUrl.startsWith('/uploads/')) return imageUrl;
    try {
      // Fetch the image (works for both base64 data URIs and Vite dev URLs)
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      // Derive a reasonable extension from the MIME type
      const ext = blob.type.split('/')[1]?.split('+')[0] || 'png';
      const filename = `default-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      const file = new File([blob], filename, { type: blob.type });
      const formData = new FormData();
      formData.append('file', file);
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      if (uploadRes.ok) {
        const data = await uploadRes.json();
        return data.url; // e.g. "/uploads/file-123456.png"
      }
      console.error('Upload failed for default image, keeping original URL');
      return imageUrl;
    } catch (err) {
      console.error('Error uploading default image:', err);
      return imageUrl;
    }
  };

  // Upload all images in a page's images object, returning a new images object with /uploads/ paths
  const uploadPageImages = async (images: Record<string, any>): Promise<Record<string, any>> => {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(images)) {
      if (typeof value === 'string' && value.length > 0) {
        result[key] = await ensureImageUploaded(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  };

  // Save page
  const savePage = async () => {
    const normalizedPages = normalizePagesForSave(docPages);

    // Upload all non-server images to /uploads/ before saving
    const uploadedPages = await Promise.all(
      normalizedPages.map(async (page) => {
        const uploadedImages = page.images ? await uploadPageImages(page.images) : page.images;
        return { ...page, images: uploadedImages };
      })
    );

    const currentPageSnapshot = uploadedPages[currentPageIndex] || currentPage;
    const coverPage = uploadedPages.find(p => p.pageNumber === 'cover');
    const pageName =
      coverPage?.fields?.coverTitle ||
      (currentPageSnapshot.styleType === 'intro'
        ? currentPageSnapshot.fields.title || 'Untitled Intro'
        : currentPageSnapshot.fields.topLabel || currentPageSnapshot.fields.paragraphHeaders?.[0]?.text || 'Untitled Content');
    const rawHeroImage = coverPage?.images.coverImage || (coverPage?.fields.showHeroImage !== false ? imgDefaultCoverHero : null);
    const effectiveHeroImage = await ensureImageUploaded(rawHeroImage);
    // Sync the effective hero image back into the cover page so pages_json has the correct value
    if (coverPage && effectiveHeroImage && !coverPage.images.coverImage) {
      const coverIdx = uploadedPages.findIndex(p => p.pageNumber === 'cover');
      if (coverIdx >= 0) {
        uploadedPages[coverIdx] = {
          ...uploadedPages[coverIdx],
          images: { ...uploadedPages[coverIdx].images, coverImage: effectiveHeroImage }
        };
      }
    }
    const rawCoverImage =
      coverPage
        ? ((coverPage.fields.showHeroImage !== false && effectiveHeroImage)
          ? effectiveHeroImage
          : (coverPage.images.coverBackgroundImage || null))
        : null;
    const coverImage = await ensureImageUploaded(rawCoverImage);
    const coverData = coverPage ? {
      id: coverPage.id,
      category: coverPage.fields.coverCategory || 'CATEGORY',
      title: coverPage.fields.coverTitle || 'TITLE',
      backgroundText: coverPage.fields.coverBackgroundText || 'TEXT',
      backgroundColor: coverPage.fields.coverBackgroundColor || '#fb00b8',
      backgroundTextColor: coverPage.fields.coverBackgroundTextColor || '#f1f0eb',
      backgroundImage: coverPage.images.coverBackgroundImage || null,
      backgroundImageFit: coverPage.imageFits.coverBackgroundImageFit || 'cover',
      imageFit: coverPage.imageFits.coverImageFit || 'cover',
      imageFit2: coverPage.imageFits.coverImageFit2 || 'cover',
      heroImage: effectiveHeroImage || null,
      heroImage2: coverPage.images.coverImage2 || null,
      showHeroImage: coverPage.fields.showHeroImage !== false,
      showBackgroundText: coverPage.fields.showBackgroundText !== false,
      showBackgroundColor: coverPage.fields.showBackgroundColor !== false,
      backgroundTextStyle: coverPage.fields.coverBackgroundTextStyle || 'fill',
      selectedStyle: coverPage.selectedStyle
    } : null;
    const effectivePageId = savedPageIdRef.current;
    const hasExistingId = !!effectivePageId;
    const original = (_savedPages || []).find((p: any) => p.id === effectivePageId) || null;
    const newId = hasExistingId ? effectivePageId : `${Date.now()}`;
    const saved = {
      id: newId,
      name: pageName,
      content: currentPageSnapshot,
      pages: uploadedPages,
      currentPageIndex,
      styles,
      sectionVisibility: {},
      selectedStyle: `style${currentPageSnapshot.selectedStyle}`,
      isPublished: original?.isPublished ?? false,
      savedAt: new Date(),
      coverImage,
      coverData,
      hasFeaturedProducts: coverPage?.hasFeaturedProducts ?? currentPageSnapshot.hasFeaturedProducts ?? (original?.hasFeaturedProducts ?? true),
      productSetId: coverPage?.productSetId ?? currentPageSnapshot.productSetId ?? (original?.productSetId ?? null),
      hasRecommendedReading: original?.hasRecommendedReading ?? false,
      efxMode: efxGlitch ? 'glitch' : efxBlur ? 'blur' : efxChromatic ? 'chromatic' : efxShake ? 'shake' : efxDistort ? 'distort' : 'none'
    };
    const next = hasExistingId
      ? ((_savedPages || []).some((p: any) => p.id === newId)
          ? (_savedPages || []).map((p: any) => (p.id === newId ? saved : p))
          : [...(_savedPages || []), saved])
      : [...(_savedPages || []), saved];
    try {
      const res = await saveDraft(saved);
      const serverId = res?.id || newId;
      savedPageIdRef.current = serverId;
      // Update local state with uploaded image paths so subsequent saves don't re-upload
      setDocPages(uploadedPages);
      const drafts = await getDrafts();
      _onUpdateSavedPages?.(drafts.length ? drafts : next);
      alert(hasExistingId ? 'Draft updated' : 'Page saved to Draft Library');
    } catch (e) {
      _onUpdateSavedPages?.(next);
      alert('Network save failed, saved locally in memory');
    }
  };

  // Download all
  const handleDownloadAll = () => {
    const dataStr = JSON.stringify({ pages: docPages, styles }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kami-dashboard-v4.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Upload data
  const handleUploadData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.pages) setDocPages(data.pages);
        alert('Data loaded successfully!');
      } catch (error) {
        alert('Error loading data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  // Get page label
  const getPageLabel = () => {
    if (currentPage.pageNumber === 'cover') return 'Cover Thumbnail';
    return `PAGE ${currentPage.pageNumber}`;
  };

  // Get style label
  const getStyleLabel = () => {
    if (currentPage.styleType === 'cover') return 'Cover Style';
    if (currentPage.styleType === 'intro') return 'Opening Style';
    return 'Content Style';
  };

  // Page navigation functions
  const goToPreviousPage = () => {
    setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
  };

  const goToNextPage = () => {
    setCurrentPageIndex(Math.min(docPages.length - 1, currentPageIndex + 1));
  };

  // Update style
  const updateStyle = (key: string, value: string) => {
    setStyles(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle entering reading mode from cover click
  // Cinematic blur-dissolve transition: cover scales up + blurs, then reveals reading mode
  // Single continuous animation — no discrete phase jumps
  // Total duration: ~1500ms
  const handleEnterReadingMode = () => {
    setIsTransitioning(true);
    setTransitionPhase('scaleUp');
    setMobilePropertiesOpen(false);

    // At ~800ms the overlay is fully opaque — safely switch content behind it
    setTimeout(() => {
      setIsReadingMode(true);
      setTransitionPhase('fade');
    }, 800);

    // At 1600ms animation is complete — clean up
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionPhase('idle');
    }, 1600);
  };

  // Handle exiting reading mode
  const handleExitReadingMode = () => {
    setIsReadingMode(false);
    setIsTransitioning(false);
    setTransitionPhase('idle');
  };

  // Handle going back to cover
  const handleBackToCover = () => {
    setIsReadingMode(false);
    setIsTransitioning(false);
    setTransitionPhase('idle');
    setCurrentPageIndex(0); // Go to cover page
  };

  // Handle opening properties from reading mode
  const handleOpenPropertiesFromReading = () => {
    setIsReadingMode(false);
    setIsTransitioning(false);
    setTransitionPhase('idle');
    // Small delay to allow reading mode to exit before opening properties
    setTimeout(() => {
      setMobilePropertiesOpen(true);
    }, 100);
  };

  // Render page content for reading mode
  const renderPageForReadingMode = (page: Page, index: number, parallaxOffset: number = 0) => {
    if (page.styleType === 'intro') {
      const isIntroWithoutImage = !page.images.coverImage;
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
              minHeight: isIntroWithoutImage ? '851px' : '851px',
              transform: 'scale(0.85)',
              transformOrigin: 'left center'
            }}
          >
            {page.selectedStyle === 1 && (
              <OpeningStyle1
                title={page.fields.title || ''}
                topLabel={page.fields.showTopLabel ? (page.fields.topLabel || '') : ''}
                coverImage={page.images.coverImage || null}
                imageFit={page.imageFits.coverImageFit || 'cover'}
                author={page.fields.author || ''}
                headline={page.fields.headline || ''}
                description={page.fields.description || ''}
                iconCount1={page.fields.iconCount1 || '0'}
                iconCount2={page.fields.iconCount2 || '0'}
                textPrimary={styles.textPrimary}
                textAccent={styles.textAccent}
                fontFamily={styles.fontFamily}
                hasFeaturedProducts={page.hasFeaturedProducts}
                productSetId={page.productSetId}
              />
            )}
          </div>
        </div>
      );
    } else if (page.styleType === 'content') {
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
              height: '851px',
              transform: 'scale(0.85)',
              transformOrigin: 'left center'
            }}
          >
            {page.selectedStyle === 1 && (
              <ContentStyle1V4
                topLabel={page.fields.topLabel}
                introParagraph={page.fields.bodyCopies?.[0]?.text}
                paragraphHeaders={page.fields.paragraphHeaders}
                bodyCopies={page.fields.bodyCopies?.slice(1)}
                image1={page.images.image1}
                image2={page.images.image2}
                image1Fit={page.imageFits.image1Fit}
                image2Fit={page.imageFits.image2Fit}
                isAnimating={page.pageNumber === 2 ? isAnimating : false}
                fontFamily={styles.fontFamily}
                topLabelFontSize={styles.topLabelFontSize}
                topLabelFontWeight={styles.topLabelFontWeight}
                textPrimary={styles.textPrimary}
              />
            )}
            {page.selectedStyle === 2 && (
              <ContentStyle2V4
                topLabel={page.fields.topLabel}
                paragraphHeaders={page.fields.paragraphHeaders}
                bodyCopies={page.fields.bodyCopies}
                image1={page.images.image1}
                image2={page.images.image2}
                image1Fit={page.imageFits.image1Fit}
                image2Fit={page.imageFits.image2Fit}
                isAnimating={page.pageNumber === 2 ? isAnimating : false}
                fontFamily={styles.fontFamily}
                topLabelFontSize={styles.topLabelFontSize}
                topLabelFontWeight={styles.topLabelFontWeight}
                textPrimary={styles.textPrimary}
              />
            )}
            {page.selectedStyle === 3 && (
              <ContentStyle3V4
                topLabel={page.fields.topLabel}
                paragraphHeaders={page.fields.paragraphHeaders}
                bodyCopies={page.fields.bodyCopies}
                image1={page.images.image1}
                image2={page.images.image2}
                image1Fit={page.imageFits.image1Fit}
                image2Fit={page.imageFits.image2Fit}
                isAnimating={page.pageNumber === 2 ? isAnimating : false}
                fontFamily={styles.fontFamily}
                topLabelFontSize={styles.topLabelFontSize}
                topLabelFontWeight={styles.topLabelFontWeight}
                textPrimary={styles.textPrimary}
              />
            )}
            {page.selectedStyle === 4 && (
              <ContentStyle4V4
                topLabel={page.fields.topLabel}
                image1={page.images.image1}
                image2={page.images.image2}
                image1Fit={page.imageFits.image1Fit}
                image2Fit={page.imageFits.image2Fit}
                caption1Title={page.fields.caption1Title}
                caption1Subtitle={page.fields.caption1Subtitle}
                caption2Title={page.fields.caption2Title}
                caption2Subtitle={page.fields.caption2Subtitle}
                showCaption1={page.fields.showCaption1}
                showCaption2={page.fields.showCaption2}
                isAnimating={page.pageNumber === 2 ? isAnimating : false}
                fontFamily={styles.fontFamily}
                topLabelFontSize={styles.topLabelFontSize}
                topLabelFontWeight={styles.topLabelFontWeight}
                textPrimary={styles.textPrimary}
              />
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // V4 MASKING ARCHITECTURE - Layer separation render functions
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Render background layer (completely static, no animation)
  const renderBackgroundLayer = (page: Page, index: number) => {
    // All styles use the same dark background
    if (page.styleType === 'intro' && page.selectedStyle === 1) {
      return <OpeningStyle1BackgroundLayer />;
    }
    if (page.styleType === 'content') {
      if (page.selectedStyle === 2) return <ContentStyle2BackgroundLayer />;
      if (page.selectedStyle === 3) return <ContentStyle3BackgroundLayer />;
      if (page.selectedStyle === 4) return <ContentStyle4BackgroundLayer />;
    }
    return <ContentStyle1BackgroundLayer />;
  };

  // Render image layer (animated via transforms based on scroll)
  const renderImageLayer = (page: Page, index: number) => {
    const contentPages = docPages.filter(p => p.pageNumber !== 'cover');

    // Opening Style 1
    if (page.styleType === 'intro' && page.selectedStyle === 1) {
      return (
        <OpeningStyle1ImageLayer
          pageIndex={index}
          totalPages={contentPages.length}
          scrollContainerRef={scrollContainerRef}
          coverImage={page.images.coverImage}
          imageFit={page.imageFits.coverImageFit}
        />
      );
    }

    // Content Styles
    if (page.styleType === 'content') {
      if (page.selectedStyle === 1) {
        return (
          <ContentStyle1ImageLayer
            pageIndex={index}
            totalPages={contentPages.length}
            scrollContainerRef={scrollContainerRef}
            image1={page.images.image1}
            image2={page.images.image2}
            image1Fit={page.imageFits.image1Fit}
            image2Fit={page.imageFits.image2Fit}
          />
        );
      }
      if (page.selectedStyle === 2) {
        return (
          <ContentStyle2ImageLayer
            pageIndex={index}
            totalPages={contentPages.length}
            scrollContainerRef={scrollContainerRef}
            image1={page.images.image1}
            image2={page.images.image2}
            image1Fit={page.imageFits.image1Fit}
            image2Fit={page.imageFits.image2Fit}
          />
        );
      }
      if (page.selectedStyle === 3) {
        return (
          <ContentStyle3ImageLayer
            pageIndex={index}
            totalPages={contentPages.length}
            scrollContainerRef={scrollContainerRef}
            image1={page.images.image1}
            image2={page.images.image2}
            image1Fit={page.imageFits.image1Fit}
            image2Fit={page.imageFits.image2Fit}
          />
        );
      }
      if (page.selectedStyle === 4) {
        return (
          <ContentStyle4ImageLayer
            pageIndex={index}
            totalPages={contentPages.length}
            scrollContainerRef={scrollContainerRef}
            image1={page.images.image1}
            image2={page.images.image2}
            image1Fit={page.imageFits.image1Fit}
            image2Fit={page.imageFits.image2Fit}
            caption1Title={page.fields.caption1Title}
            caption1Subtitle={page.fields.caption1Subtitle}
            caption2Title={page.fields.caption2Title}
            caption2Subtitle={page.fields.caption2Subtitle}
            showCaption1={page.fields.showCaption1}
            showCaption2={page.fields.showCaption2}
          />
        );
      }
    }

    return null;
  };

  // Render text layer (scrolls naturally in the viewport mask)
  const renderTextLayer = (page: Page, index: number) => {
    const contentPages = docPages.filter(p => p.pageNumber !== 'cover');

    // Opening Style 1
    if (page.styleType === 'intro' && page.selectedStyle === 1) {
      return (
        <OpeningStyle1TextLayer
          pageIndex={index}
          totalPages={contentPages.length}
          scrollContainerRef={scrollContainerRef}
          title={page.fields.title}
          topLabel={page.fields.topLabel}
          coverImage={page.images.coverImage}
          imageFit={page.imageFits.coverImageFit}
          author={page.fields.author}
          headline={page.fields.headline}
          description={page.fields.description}
          iconCount1={page.fields.iconCount1}
          iconCount2={page.fields.iconCount2}
          isTitleAnimating={isTitleAnimating}
          textPrimary={styles.textPrimary}
          textAccent={styles.textAccent}
          fontFamily={styles.fontFamily}
          hasFeaturedProducts={page.hasFeaturedProducts}
          productSetId={page.productSetId}
        />
      );
    }

    // Content Styles
    if (page.styleType === 'content') {
      if (page.selectedStyle === 1) {
        return (
          <ContentStyle1TextLayer
            pageIndex={index}
            totalPages={contentPages.length}
            scrollContainerRef={scrollContainerRef}
            topLabel={page.fields.topLabel}
            paragraphHeaders={page.fields.paragraphHeaders}
            bodyCopies={page.fields.bodyCopies}
            fontFamily={styles.fontFamily}
            topLabelFontSize={styles.topLabelFontSize}
            topLabelFontWeight={styles.topLabelFontWeight}
            textPrimary={styles.textPrimary}
          />
        );
      }
      if (page.selectedStyle === 2) {
        return (
          <ContentStyle2TextLayer
            pageIndex={index}
            totalPages={contentPages.length}
            scrollContainerRef={scrollContainerRef}
            topLabel={page.fields.topLabel}
            paragraphHeaders={page.fields.paragraphHeaders}
            bodyCopies={page.fields.bodyCopies}
            image1={page.images.image1}
            image2={page.images.image2}
            image1Fit={page.imageFits.image1Fit}
            image2Fit={page.imageFits.image2Fit}
            fontFamily={styles.fontFamily}
            topLabelFontSize={styles.topLabelFontSize}
            topLabelFontWeight={styles.topLabelFontWeight}
            textPrimary={styles.textPrimary}
          />
        );
      }
      if (page.selectedStyle === 3) {
        return (
          <ContentStyle3TextLayer
            pageIndex={index}
            totalPages={contentPages.length}
            scrollContainerRef={scrollContainerRef}
            topLabel={page.fields.topLabel}
            paragraphHeaders={page.fields.paragraphHeaders}
            bodyCopies={page.fields.bodyCopies}
            image1={page.images.image1}
            image2={page.images.image2}
            image1Fit={page.imageFits.image1Fit}
            image2Fit={page.imageFits.image2Fit}
            fontFamily={styles.fontFamily}
            topLabelFontSize={styles.topLabelFontSize}
            topLabelFontWeight={styles.topLabelFontWeight}
            textPrimary={styles.textPrimary}
          />
        );
      }
      if (page.selectedStyle === 4) {
        return (
          <ContentStyle4TextLayer
            pageIndex={index}
            totalPages={contentPages.length}
            scrollContainerRef={scrollContainerRef}
            topLabel={page.fields.topLabel}
            image1={page.images.image1}
            image2={page.images.image2}
            image1Fit={page.imageFits.image1Fit}
            image2Fit={page.imageFits.image2Fit}
            caption1Title={page.fields.caption1Title}
            caption1Subtitle={page.fields.caption1Subtitle}
            caption2Title={page.fields.caption2Title}
            caption2Subtitle={page.fields.caption2Subtitle}
            showCaption1={page.fields.showCaption1}
            showCaption2={page.fields.showCaption2}
            fontFamily={styles.fontFamily}
            topLabelFontSize={styles.topLabelFontSize}
            topLabelFontWeight={styles.topLabelFontWeight}
            textPrimary={styles.textPrimary}
          />
        );
      }
    }

    // For all other styles (Opening 2, 3), render the full page content (temporary fallback)
    return renderPageForReadingMode(page, index, 0);
  };

  // Render Style Selection Modal (must be before any early returns!)
  const renderStyleModal = () => {
    if (!showStyleModal) return null;

    console.log('MODAL RENDERING - showStyleModal is:', showStyleModal);
    const nextPageNumber = docPages.filter(p => typeof p.pageNumber === 'number').length + 1;
    const isAddingIntroPage = nextPageNumber === 1;
    const styleOptions = isAddingIntroPage ? [1, 2, 3] : [1, 2, 3, 4];
    const modalTitle = isAddingIntroPage ? 'Select Opening Style' : 'Select Content Style';
    const stylePrefix = isAddingIntroPage ? 'Opening Style' : 'Content Style';
    console.log('MODAL COMPUTED - nextPageNumber:', nextPageNumber, 'isIntro:', isAddingIntroPage);

    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-[10000] px-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        onClick={() => {
          console.log('Modal backdrop clicked - closing modal');
          setShowStyleModal(false);
        }}
      >
        <div
          className="w-full max-w-[500px] p-[32px] rounded-[12px]"
          style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
          onClick={(e) => {
            console.log('Modal content clicked - preventing close');
            e.stopPropagation();
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: styles.textPrimary, marginBottom: '24px' }}>
            {modalTitle}
          </h3>

          <div className="grid grid-cols-2 gap-[16px] mb-[24px]">
            {styleOptions.map((styleNum) => (
              <button
                key={styleNum}
                onClick={() => {
                  console.log('Style button clicked:', styleNum);
                  addPage(styleNum);
                }}
                className="p-[20px] rounded-[8px] border-2 transition-all active:scale-95"
                style={{
                  backgroundColor: '#2a2a2a',
                  borderColor: '#3a3a3a',
                  color: styles.textPrimary
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = styles.textAccent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#3a3a3a';
                }}
              >
                <p style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
                  {stylePrefix} {styleNum}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              console.log('Cancel button clicked - closing modal');
              setShowStyleModal(false);
            }}
            className="w-full py-[12px] rounded-[8px] active:scale-95 transition-all"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a',
              color: '#9e9e9d',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  // Mobile Layout
  if (isMobileOrTablet && currentPage.styleType === 'cover' && !isReadingMode) {
    const coverData = {
      id: currentPage.id,
      category: currentPage.fields.coverCategory || 'CATEGORY',
      title: currentPage.fields.coverTitle || 'TITLE',
      backgroundText: currentPage.fields.coverBackgroundText || 'TEXT',
      backgroundColor: currentPage.fields.coverBackgroundColor || '#fb00b8',
      backgroundTextColor: currentPage.fields.coverBackgroundTextColor || '#f1f0eb',
      heroImage: currentPage.images.coverImage || imgDefaultCoverHero,
      heroImage2: currentPage.images.coverImage2 || null,
      backgroundImage: currentPage.images.coverBackgroundImage || null,
      imageFit: currentPage.imageFits.coverImageFit || 'cover',
      showHeroImage: currentPage.fields.showHeroImage !== false,
      showBackgroundText: currentPage.fields.showBackgroundText !== false,
      showBackgroundColor: currentPage.fields.showBackgroundColor !== false,
      backgroundTextStyle: currentPage.fields.coverBackgroundTextStyle || 'fill',
      selectedStyle: currentPage.selectedStyle,
      iconCount1: currentPage.fields.coverIconCount1 || '',
      iconCount2: currentPage.fields.coverIconCount2 || ''
    };

    return (
      <>
        {renderStyleModal()}
        <div
          className="relative w-full h-screen flex flex-col overflow-hidden"
          style={{
            backgroundColor: styles.background,
            fontFamily: `'${styles.fontFamily}',sans-serif`
          }}
        >
          {/* Mobile Cover Carousel with scale-up + blur transition */}
          <div
            style={{
              transform: isTransitioning ? 'scale(1.12)' : 'scale(1)',
              filter: isTransitioning ? 'blur(6px)' : 'blur(0px)',
              transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              transformOrigin: 'center center',
              width: '100%',
              height: '100%',
            }}
          >
            <MobileCoverCarousel
              covers={[coverData]}
              onCoverClick={handleEnterReadingMode}
              styles={styles}
            />
          </div>

          {/* Mobile Navigation */}
          <MobileNav
            onPropertiesClick={() => setMobilePropertiesOpen(true)}
            onDownload={handleDownloadAll}
            onUpload={() => document.getElementById('file-input')?.click()}
            onPreview={handleEnterReadingMode}
            onHome={onBackToLanding || (() => { })}
            isReadingMode={isReadingMode}
            styles={styles}
          />

          {/* Hidden file input for upload */}
          <input
            id="file-input"
            type="file"
            accept=".json"
            onChange={handleUploadData}
            style={{ display: 'none' }}
          />

          {/* Mobile Properties Sheet */}
          <MobilePropertiesSheet
            isOpen={mobilePropertiesOpen}
            onClose={() => setMobilePropertiesOpen(false)}
            title={currentPage.styleType === 'cover' ? 'Edit Cover' : `Edit Page ${currentPageIndex}`}
          >
            {currentPage.styleType === 'cover' && (
              <MobileCoverProperties
                coverData={coverData}
                currentPage={currentPage}
                updatePageField={updatePageField}
                updatePageImage={(imageKey, value) => {
                  setPages(prev => {
                    const newPages = [...prev];
                    const page = { ...newPages[currentPageIndex] };
                    page.images = {
                      ...page.images,
                      [imageKey]: value
                    };
                    newPages[currentPageIndex] = page;
                    return newPages;
                  });
                }}
                updatePageImageFit={(imageKey, value) => {
                  setPages(prev => {
                    const newPages = [...prev];
                    const page = { ...newPages[currentPageIndex] };
                    page.imageFits = {
                      ...page.imageFits,
                      [imageKey]: value
                    };
                    newPages[currentPageIndex] = page;
                    return newPages;
                  });
                }}
                updatePageSelectedStyle={(value) => {
                  console.log('updatePageSelectedStyle called with value:', value);
                  setPages(prev => {
                    const newPages = [...prev];
                    const newStyle = value;

                    // Set default values based on Cover Thumbnail style selection
                    let updatedFields = { ...newPages[currentPageIndex].fields };
                    let updatedImages = { ...newPages[currentPageIndex].images };

                    if (newPages[currentPageIndex].styleType === 'cover') {
                      if (newStyle === 1) {
                        // Feature Article Colour defaults
                        updatedFields = {
                          ...updatedFields,
                          coverBackgroundColor: '#fb00b8',
                          coverBackgroundText: 'FIGHTING!',
                          coverBackgroundTextColor: '#f1f0eb',
                          coverBackgroundTextStyle: 'stroke'
                        };
                        // Set default hero image only for Feature Article Colour
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
                        // Set default hero image for Feature Article BW
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
                        // Set default hero image for Creator Spotlight
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
                        // Set default logo as Image 1 for Announcement
                        updatedImages = {
                          ...updatedImages,
                          coverImage: imgDefaultAnnouncementSecond,
                          coverImage2: null
                        };
                      }
                    }

                    newPages[currentPageIndex] = {
                      ...newPages[currentPageIndex],
                      selectedStyle: newStyle,
                      fields: updatedFields,
                      images: updatedImages
                    };
                    console.log('Updated page:', newPages[currentPageIndex]);
                    return newPages;
                  });
                }}
                styles={styles}
                setShowStyleModal={setShowStyleModal}
                getStyleLabel={getStyleLabel}
                savePage={savePage}
                currentPageIndex={currentPageIndex}
                pages={docPages}
                goToPreviousPage={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
                goToNextPage={() => setCurrentPageIndex(Math.min(docPages.length - 1, currentPageIndex + 1))}
                deletePage={deletePage}
                setCurrentPageIndex={setCurrentPageIndex}
                setMobilePropertiesOpen={setMobilePropertiesOpen}
                setIsReadingMode={setIsReadingMode}
                efxGlitch={efxGlitch}
                efxBlur={efxBlur}
                efxChromatic={efxChromatic}
                efxShake={efxShake}
                efxDistort={efxDistort}
                setEfxGlitch={setEfxGlitch}
                setEfxBlur={setEfxBlur}
                setEfxChromatic={setEfxChromatic}
                setEfxShake={setEfxShake}
              setEfxDistort={setEfxDistort}
              productSets={productSets}
              updatePageRoot={updatePageRoot}
            />
            )}

            {currentPage.styleType === 'content' && currentPage.selectedStyle === 1 && (
              <MobileContentStyle1Properties
                currentPage={currentPage}
                updatePageField={updatePageField}
                updatePageImage={(imageKey, value) => {
                  setDocPages(prev => {
                    const newPages = [...prev];
                    const page = { ...newPages[currentPageIndex] };
                    page.images = {
                      ...page.images,
                      [imageKey]: value
                    };
                    newPages[currentPageIndex] = page;
                    return newPages;
                  });
                }}
                updatePageImageFit={(imageKey, value) => {
                  setDocPages(prev => {
                    const newPages = [...prev];
                    const page = { ...newPages[currentPageIndex] };
                    page.imageFits = {
                      ...page.imageFits,
                      [imageKey]: value
                    };
                    newPages[currentPageIndex] = page;
                    return newPages;
                  });
                }}
                updatePageSelectedStyle={(value) => {
                  setDocPages(prev => {
                    const newPages = [...prev];
                    newPages[currentPageIndex] = {
                      ...newPages[currentPageIndex],
                      selectedStyle: value
                    };
                    return newPages;
                  });
                }}
                styles={styles}
                setShowStyleModal={setShowStyleModal}
                getStyleLabel={getStyleLabel}
                savePage={savePage}
                currentPageIndex={currentPageIndex}
                pages={docPages}
                goToPreviousPage={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
                goToNextPage={() => setCurrentPageIndex(Math.min(docPages.length - 1, currentPageIndex + 1))}
                deletePage={deletePage}
                setCurrentPageIndex={setCurrentPageIndex}
                setMobilePropertiesOpen={setMobilePropertiesOpen}
                setIsReadingMode={setIsReadingMode}
                efxGlitch={efxGlitch}
                efxBlur={efxBlur}
                efxChromatic={efxChromatic}
                efxShake={efxShake}
                efxDistort={efxDistort}
                setEfxGlitch={setEfxGlitch}
                setEfxBlur={setEfxBlur}
                setEfxChromatic={setEfxChromatic}
                setEfxShake={setEfxShake}
                setEfxDistort={setEfxDistort}
                setPages={setDocPages}
              />
            )}
          </MobilePropertiesSheet>

          {/* Cinematic blur-dissolve transition overlay (mobile) */}
          {isTransitioning && (
            <div
              className="fixed inset-0"
              style={{
                zIndex: 10000,
                pointerEvents: 'none',
                animation: 'cinematicTransition 1500ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
              }}
            />
          )}
          <style>{`
          @keyframes cinematicTransition {
            0% {
              background-color: rgba(0, 0, 0, 0);
              backdrop-filter: blur(0px);
              -webkit-backdrop-filter: blur(0px);
            }
            35% {
              background-color: rgba(0, 0, 0, 0.7);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
            }
            50% {
              background-color: rgba(0, 0, 0, 1);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
            }
            60% {
              background-color: rgba(0, 0, 0, 1);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
            }
            100% {
              background-color: rgba(0, 0, 0, 0);
              backdrop-filter: blur(0px);
              -webkit-backdrop-filter: blur(0px);
            }
          }
        `}</style>
        </div>
      </>
    );
  }

  // Desktop Layout
  return (
    <div
      className="relative w-full h-screen flex"
      style={{
        backgroundColor: styles.background,
        fontFamily: `'${styles.fontFamily}',sans-serif`
      }}
    >
      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar - Hide on mobile */}
        <div
          className={`h-[60px] border-b flex items-center px-[24px] max-[1023px]:hidden ${isMobileOrTablet && isReadingMode ? 'hidden' : ''}`}
          style={{ borderColor: '#2a2a2a' }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-[16px]">
              {onBackToLanding && (
                <button
                  onClick={onBackToLanding}
                  className="flex items-center gap-[8px] transition-colors"
                  style={{ color: '#9e9e9d' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = styles.textAccent}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9e9e9d'}
                >
                  <ArrowLeft className="size-[16px]" strokeWidth={2} />
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>BACK TO LANDING</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div
          className="flex-1 overflow-y-auto flex items-center justify-start relative"
          style={{
            paddingLeft: isMobileOrTablet ? '0' : '24px',
            paddingRight: isMobileOrTablet ? '0' : '40px',
            paddingTop: isMobileOrTablet ? '0' : '40px',
            paddingBottom: isMobileOrTablet ? '0' : '40px'
          }}
        >
          {/* Show Properties Button - Desktop only, positioned inside black area, right-aligned with 80px margin */}
          {!propertiesPanelOpen && !isMobileOrTablet && (
            <button
              onClick={() => setPropertiesPanelOpen(true)}
              className="absolute flex items-center gap-[8px] px-[12px] py-[8px] border transition-all z-50"
              style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#9e9e9d',
                borderColor: '#2a2a2a',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                right: '80px',
                top: '40px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = styles.textAccent;
                e.currentTarget.style.borderColor = styles.textAccent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9e9e9d';
                e.currentTarget.style.borderColor = '#2a2a2a';
              }}
            >
              <Settings className="size-[14px]" strokeWidth={2} />
              SHOW PROPERTIES
            </button>
          )}

          {currentPage.styleType === 'cover' ? (
            <div
              style={{
                perspective: '2000px',
                perspectiveOrigin: 'center center',
                width: isMobileOrTablet ? '100vw' : 'auto',
                height: isMobileOrTablet ? '100vh' : 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                className="w-[1512px] h-[851px] relative cursor-pointer group"
                style={{
                  transform: isMobileOrTablet
                    ? `scale(${isTransitioning ? Math.min(windowSize.width / 1512, windowSize.height / 851) * 1.12 : Math.min(windowSize.width / 1512, windowSize.height / 851)})`
                    : isTransitioning ? 'scale(0.56)' : 'scale(0.5)',
                  transformOrigin: 'center center',
                  filter: isTransitioning ? 'blur(6px)' : 'blur(0px)',
                  transition: isTransitioning
                    ? 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    : 'transform 0.3s ease, filter 0.3s ease',
                  pointerEvents: isTransitioning ? 'none' : 'auto',
                }}
                onClick={handleEnterReadingMode}
                onMouseEnter={(e) => !isTransitioning && !isMobileOrTablet && (e.currentTarget.style.transform = 'scale(0.52)')}
                onMouseLeave={(e) => !isTransitioning && !isMobileOrTablet && (e.currentTarget.style.transform = 'scale(0.5)')}
              >
                {/* Hover overlay with "Read Article" indicator */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center z-10 pointer-events-none">
                  <div
                    className="opacity-0 group-hover:opacity-100 transition-all px-8 py-4 rounded-full flex items-center gap-3"
                    style={{ backgroundColor: styles.textAccent }}
                  >
                    <Eye size={24} color="#1a1a1a" />
                    <span className="text-[18px] font-bold" style={{ color: '#1a1a1a' }}>
                      Read Article
                    </span>
                  </div>
                </div>
                {currentPage.selectedStyle === 1 && (
                  <CoverThumbnailFeatureArticleColour
                    category={currentPage.fields.coverCategory}
                    title={currentPage.fields.coverTitle}
                    coverImage={currentPage.images.coverImage}
                    imageFit={currentPage.imageFits.coverImageFit}
                    backgroundColor={currentPage.fields.coverBackgroundColor}
                    backgroundImage={currentPage.images.coverBackgroundImage}
                    backgroundImageFit={currentPage.imageFits.coverBackgroundImageFit}
                    backgroundText={currentPage.fields.coverBackgroundText}
                    backgroundTextColor={currentPage.fields.coverBackgroundTextColor}
                    backgroundTextStyle={currentPage.fields.coverBackgroundTextStyle}
                    iconCount1={currentPage.fields.coverIconCount1}
                    iconCount2={currentPage.fields.coverIconCount2}
                    showHeroImage={currentPage.fields.showHeroImage}
                    showBackgroundText={currentPage.fields.showBackgroundText}
                    showBackgroundColor={currentPage.fields.showBackgroundColor}
                  />
                )}
                {currentPage.selectedStyle === 2 && (
                  <CoverThumbnailFeatureArticleBw
                    category={currentPage.fields.coverCategory}
                    title={currentPage.fields.coverTitle}
                    coverImage={currentPage.images.coverImage}
                    imageFit={currentPage.imageFits.coverImageFit}
                    backgroundColor={currentPage.fields.coverBackgroundColor}
                    backgroundImage={currentPage.images.coverBackgroundImage}
                    backgroundImageFit={currentPage.imageFits.coverBackgroundImageFit}
                    backgroundText={currentPage.fields.coverBackgroundText}
                    backgroundTextColor={currentPage.fields.coverBackgroundTextColor}
                    backgroundTextStyle={currentPage.fields.coverBackgroundTextStyle}
                    iconCount1={currentPage.fields.coverIconCount1}
                    iconCount2={currentPage.fields.coverIconCount2}
                    showHeroImage={currentPage.fields.showHeroImage}
                    showBackgroundText={currentPage.fields.showBackgroundText}
                    showBackgroundColor={currentPage.fields.showBackgroundColor}
                  />
                )}
                {currentPage.selectedStyle === 3 && (
                  <CoverThumbnailCreatorSpotlight
                    category={currentPage.fields.coverCategory}
                    title={currentPage.fields.coverTitle}
                    coverImage={currentPage.images.coverImage}
                    imageFit={currentPage.imageFits.coverImageFit}
                    backgroundColor={currentPage.fields.coverBackgroundColor}
                    backgroundImage={currentPage.images.coverBackgroundImage}
                    backgroundImageFit={currentPage.imageFits.coverBackgroundImageFit}
                    iconCount1={currentPage.fields.coverIconCount1}
                    iconCount2={currentPage.fields.coverIconCount2}
                    showHeroImage={currentPage.fields.showHeroImage}
                    showBackgroundColor={currentPage.fields.showBackgroundColor}
                  />
                )}
                {currentPage.selectedStyle === 4 && (
                  <CoverThumbnailAnnouncement
                    category={currentPage.fields.coverCategory}
                    title={currentPage.fields.coverTitle}
                    coverImage1={currentPage.images.coverImage}
                    imageFit1={currentPage.imageFits.coverImageFit}
                    coverImage2={currentPage.images.coverImage2}
                    imageFit2={currentPage.imageFits.coverImageFit2}
                    backgroundColor={currentPage.fields.coverBackgroundColor}
                    backgroundImage={currentPage.images.coverBackgroundImage}
                    backgroundImageFit={currentPage.imageFits.coverBackgroundImageFit}
                    iconCount1={currentPage.fields.coverIconCount1}
                    iconCount2={currentPage.fields.coverIconCount2}
                    showHeroImage={currentPage.fields.showHeroImage}
                    showBackgroundColor={currentPage.fields.showBackgroundColor}
                  />
                )}
              </div>
            </div>
          ) : currentPage.styleType === 'intro' ? (
            <div
              className={`w-[1440px] ${!currentPage.images.coverImage ? 'h-auto min-h-[900px]' : 'h-[900px]'} relative`}
              style={{
                transform: isMobileOrTablet
                  ? `scale(${Math.min(windowSize.width / 1440, windowSize.height / 900)})`
                  : 'scale(0.75)',
                transformOrigin: isMobileOrTablet ? 'center center' : 'left center'
              }}
            >
              {currentPage.selectedStyle === 1 && (
                <OpeningStyle1
                  title={currentPage.fields.title || ''}
                  topLabel={currentPage.fields.topLabel || ''}
                  coverImage={currentPage.images.coverImage || null}
                  imageFit={currentPage.imageFits.coverImageFit || 'cover'}
                  author={currentPage.fields.author || ''}
                  headline={currentPage.fields.headline || ''}
                  description={currentPage.fields.description || ''}
                  iconCount1={currentPage.fields.iconCount1 || '0'}
                  iconCount2={currentPage.fields.iconCount2 || '0'}
                  textPrimary={styles.textPrimary}
                  textAccent={styles.textAccent}
                  fontFamily={styles.fontFamily}
                  hasFeaturedProducts={currentPage.hasFeaturedProducts}
                  productSetId={currentPage.productSetId}
                />
              )}
              {currentPage.selectedStyle === 2 && (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: '#1a1a1a' }}
                >
                  <p style={{ color: '#9e9e9d', fontSize: '16px' }}>Opening Style 2 - Coming Soon</p>
                </div>
              )}
              {currentPage.selectedStyle === 3 && (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: '#1a1a1a' }}
                >
                  <p style={{ color: '#9e9e9d', fontSize: '16px' }}>Opening Style 3 - Coming Soon</p>
                </div>
              )}
            </div>
          ) : (
            <div
              className="w-[1440px] h-[900px] relative"
              style={{
                transform: isMobileOrTablet
                  ? `scale(${Math.min(windowSize.width / 1440, windowSize.height / 900)})`
                  : 'scale(0.75)',
                transformOrigin: isMobileOrTablet ? 'center center' : 'left center'
              }}
            >
              {currentPage.selectedStyle === 1 && (
                <ContentStyle1V4
                  topLabel={currentPage.fields.topLabel}
                  introParagraph={currentPage.fields.bodyCopies?.[0]?.text}
                  paragraphHeaders={currentPage.fields.paragraphHeaders}
                  bodyCopies={currentPage.fields.bodyCopies?.slice(1)}
                  image1={currentPage.images.image1}
                  image2={currentPage.images.image2}
                  image1Fit={currentPage.imageFits.image1Fit}
                  image2Fit={currentPage.imageFits.image2Fit}
                  isAnimating={currentPage.pageNumber === 2 ? isAnimating : false}
                  fontFamily={styles.fontFamily}
                  topLabelFontSize={styles.topLabelFontSize}
                  topLabelFontWeight={styles.topLabelFontWeight}
                  textPrimary={styles.textPrimary}
                />
              )}
              {currentPage.selectedStyle === 2 && (
                <ContentStyle2V4
                  topLabel={currentPage.fields.topLabel}
                  paragraphHeaders={currentPage.fields.paragraphHeaders}
                  bodyCopies={currentPage.fields.bodyCopies}
                  image1={currentPage.images.image1}
                  image2={currentPage.images.image2}
                  image1Fit={currentPage.imageFits.image1Fit}
                  image2Fit={currentPage.imageFits.image2Fit}
                  isAnimating={currentPage.pageNumber === 2 ? isAnimating : false}
                  fontFamily={styles.fontFamily}
                  topLabelFontSize={styles.topLabelFontSize}
                  topLabelFontWeight={styles.topLabelFontWeight}
                  textPrimary={styles.textPrimary}
                />
              )}
              {currentPage.selectedStyle === 3 && (
                <ContentStyle3V4
                  topLabel={currentPage.fields.topLabel}
                  paragraphHeaders={currentPage.fields.paragraphHeaders}
                  bodyCopies={currentPage.fields.bodyCopies}
                  image1={currentPage.images.image1}
                  image2={currentPage.images.image2}
                  image1Fit={currentPage.imageFits.image1Fit}
                  image2Fit={currentPage.imageFits.image2Fit}
                  isAnimating={currentPage.pageNumber === 2 ? isAnimating : false}
                  fontFamily={styles.fontFamily}
                  topLabelFontSize={styles.topLabelFontSize}
                  topLabelFontWeight={styles.topLabelFontWeight}
                  textPrimary={styles.textPrimary}
                />
              )}
              {currentPage.selectedStyle === 4 && (
                <ContentStyle4V4
                  topLabel={currentPage.fields.topLabel}
                  image1={currentPage.images.image1}
                  image2={currentPage.images.image2}
                  image1Fit={currentPage.imageFits.image1Fit}
                  image2Fit={currentPage.imageFits.image2Fit}
                  caption1Title={currentPage.fields.caption1Title}
                  caption1Subtitle={currentPage.fields.caption1Subtitle}
                  caption2Title={currentPage.fields.caption2Title}
                  caption2Subtitle={currentPage.fields.caption2Subtitle}
                  showCaption1={currentPage.fields.showCaption1}
                  showCaption2={currentPage.fields.showCaption2}
                  isAnimating={currentPage.pageNumber === 2 ? isAnimating : false}
                  fontFamily={styles.fontFamily}
                  topLabelFontSize={styles.topLabelFontSize}
                  topLabelFontWeight={styles.topLabelFontWeight}
                  textPrimary={styles.textPrimary}
                />
              )}
            </div>
          )}
        </div>
      </div>



      {/* Properties Panel - Desktop Only */}
      {propertiesPanelOpen && !isMobileOrTablet && (
        <div
          className="fixed right-0 top-0 h-screen w-[471px] border-l overflow-y-auto max-[1023px]:hidden"
          style={{
            backgroundColor: styles.background,
            borderColor: '#2a2a2a'
          }}
        >
          {/* Properties Panel Toggle Button (on left edge) */}
          <button
            onClick={() => setPropertiesPanelOpen(false)}
            className="absolute left-[-40px] top-[50%] -translate-y-1/2 w-[40px] h-[80px] flex items-center justify-center transition-all hover:bg-opacity-90 rounded-l-[8px]"
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #3a3a3a',
              borderRight: 'none',
              color: '#9e9e9d'
            }}
            title="Hide Properties Panel"
          >
            <ChevronDown size={20} className="rotate-90" />
          </button>

          <div className="p-[24px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-[24px]">
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary }}>
                PROPERTIES PANEL
              </h3>
              <button
                onClick={() => setPropertiesPanelOpen(false)}
                className="transition-colors"
                style={{ color: '#9e9e9d' }}
                onMouseEnter={(e) => e.currentTarget.style.color = styles.textPrimary}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9e9e9d'}
              >
                <X className="size-[20px]" strokeWidth={2} />
              </button>
            </div>

            {/* Page Indicator with Delete */}
            <div
              className="mb-[24px] p-[16px] rounded-[8px] relative"
              style={{ backgroundColor: '#2a2a2a' }}
            >
              <div className="flex items-center justify-between">
                <p
                  style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    color: styles.textGold,
                    margin: 0
                  }}
                >
                  {getPageLabel()}
                </p>
                <div className="flex items-center gap-[8px]">
                  {docPages.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
                        disabled={currentPageIndex === 0}
                        className="px-[12px] py-[6px] rounded-[4px]"
                        style={{
                          backgroundColor: '#1a1a1a',
                          color: currentPageIndex === 0 ? '#666' : styles.textPrimary,
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        ←
                      </button>
                      <span style={{ fontFamily: 'Inter,sans-serif', color: '#9e9e9d', fontSize: '12px', fontWeight: '600' }}>
                        {currentPageIndex + 1} / {docPages.length}
                      </span>
                      <button
                        onClick={() => setCurrentPageIndex(Math.min(docPages.length - 1, currentPageIndex + 1))}
                        disabled={currentPageIndex === docPages.length - 1}
                        className="px-[12px] py-[6px] rounded-[4px]"
                        style={{
                          backgroundColor: '#1a1a1a',
                          color: currentPageIndex === docPages.length - 1 ? '#666' : styles.textPrimary,
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        →
                      </button>

                      {/* Delete Page Button - Right of arrows */}
                      <button
                        onClick={deletePage}
                        className="transition-colors"
                        style={{ color: styles.textGold }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ff4444'}
                        onMouseLeave={(e) => e.currentTarget.style.color = styles.textGold}
                      >
                        <Trash2 className="size-[28px]" strokeWidth={2} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Page Thumbnail Navigator */}
              {docPages.length > 1 && (
                <div className="mt-[16px] pt-[16px] border-t" style={{ borderColor: '#3a3a3a' }}>
                  <div className="flex items-center justify-between mb-[8px]">
                    <p style={{ fontSize: '11px', color: '#9e9e9d', margin: 0, fontWeight: '600' }}>
                      ALL PAGES ({docPages.length})
                    </p>
                  </div>
                  <div className="flex gap-[8px] overflow-x-auto pb-[4px] mb-[12px]" style={{ scrollbarWidth: 'thin' }}>
                    {docPages.map((page, index) => (
                      <button
                        key={page.id}
                        onClick={() => setCurrentPageIndex(index)}
                        className="flex-shrink-0 px-[12px] py-[8px] rounded-[6px] transition-all"
                        style={{
                          backgroundColor: currentPageIndex === index ? styles.textAccent : '#1a1a1a',
                          border: `1px solid ${currentPageIndex === index ? styles.textAccent : '#3a3a3a'}`,
                          color: currentPageIndex === index ? '#1a1a1a' : styles.textPrimary,
                          fontSize: '11px',
                          fontWeight: '600'
                        }}
                      >
                        {page.pageNumber === 'cover' ? 'COVER' : `PAGE ${page.pageNumber}`}
                      </button>
                    ))}
                  </div>

                  {/* Preview Article Button */}
                  <button
                    onClick={handleEnterReadingMode}
                    className="w-full flex items-center justify-center gap-[8px] py-[12px] rounded-[8px] transition-all hover:scale-[1.02]"
                    title="Preview all pages as one complete article with scroll experience"
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

                  {/* EFX Buttons */}
                  <div className="w-full mt-[12px]">
                    <div
                      className="text-[10px] font-bold mb-[8px] px-[4px]"
                      style={{ color: '#9e9e9d', letterSpacing: '0.05em' }}
                    >
                      EFX
                    </div>
                    <div className="flex gap-[6px]">
                      <button
                        className="flex-1 py-[8px] rounded-[6px] transition-all hover:scale-[1.05]"
                        style={{
                          backgroundColor: efxGlitch ? '#ff00ff' : '#2a2a2a',
                          border: efxGlitch ? '1px solid #ff00ff' : '1px solid #3a3a3a',
                          fontSize: '10px',
                          fontWeight: '700',
                          color: efxGlitch ? '#1a1a1a' : '#9e9e9d',
                          letterSpacing: '0.02em'
                        }}
                        onClick={() => {
                          // Toggle GLITCH, turn off all others
                          const newValue = !efxGlitch;
                          setEfxGlitch(newValue);
                          if (newValue) {
                            setEfxBlur(false);
                            setEfxChromatic(false);
                            setEfxShake(false);
                            setEfxDistort(false);
                          }
                        }}
                        title="Toggle glitch effect on images"
                      >
                        GLITCH
                      </button>
                      <button
                        className="flex-1 py-[8px] rounded-[6px] transition-all hover:scale-[1.05]"
                        style={{
                          backgroundColor: efxBlur ? '#00ffff' : '#2a2a2a',
                          border: efxBlur ? '1px solid #00ffff' : '1px solid #3a3a3a',
                          fontSize: '10px',
                          fontWeight: '700',
                          color: efxBlur ? '#1a1a1a' : '#9e9e9d',
                          letterSpacing: '0.02em'
                        }}
                        onClick={() => {
                          // Toggle BLUR, turn off all others
                          const newValue = !efxBlur;
                          setEfxBlur(newValue);
                          if (newValue) {
                            setEfxGlitch(false);
                            setEfxChromatic(false);
                            setEfxShake(false);
                            setEfxDistort(false);
                          }
                        }}
                        title="Toggle blur effect on images"
                      >
                        BLUR
                      </button>
                      <button
                        className="flex-1 py-[8px] rounded-[6px] transition-all hover:scale-[1.05]"
                        style={{
                          backgroundColor: efxChromatic ? '#ffff00' : '#2a2a2a',
                          border: efxChromatic ? '1px solid #ffff00' : '1px solid #3a3a3a',
                          fontSize: '10px',
                          fontWeight: '700',
                          color: efxChromatic ? '#1a1a1a' : '#9e9e9d',
                          letterSpacing: '0.02em'
                        }}
                        onClick={() => {
                          // Toggle CHROM, turn off all others
                          const newValue = !efxChromatic;
                          setEfxChromatic(newValue);
                          if (newValue) {
                            setEfxGlitch(false);
                            setEfxBlur(false);
                            setEfxShake(false);
                            setEfxDistort(false);
                          }
                        }}
                        title="Toggle chromatic aberration on images"
                      >
                        CHROM
                      </button>
                      <button
                        className="flex-1 py-[8px] rounded-[6px] transition-all hover:scale-[1.05]"
                        style={{
                          backgroundColor: efxShake ? '#ff6600' : '#2a2a2a',
                          border: efxShake ? '1px solid #ff6600' : '1px solid #3a3a3a',
                          fontSize: '10px',
                          fontWeight: '700',
                          color: efxShake ? '#1a1a1a' : '#9e9e9d',
                          letterSpacing: '0.02em'
                        }}
                        onClick={() => {
                          // Toggle SHAKE, turn off all others
                          const newValue = !efxShake;
                          setEfxShake(newValue);
                          if (newValue) {
                            setEfxGlitch(false);
                            setEfxBlur(false);
                            setEfxChromatic(false);
                            setEfxDistort(false);
                          }
                        }}
                        title="Toggle shake effect on images"
                      >
                        SHAKE
                      </button>
                      <button
                        className="flex-1 py-[8px] rounded-[6px] transition-all hover:scale-[1.05]"
                        style={{
                          backgroundColor: efxDistort ? '#11ff49' : '#2a2a2a',
                          border: efxDistort ? '1px solid #11ff49' : '1px solid #3a3a3a',
                          fontSize: '10px',
                          fontWeight: '700',
                          color: efxDistort ? '#1a1a1a' : '#9e9e9d',
                          letterSpacing: '0.02em'
                        }}
                        onClick={() => {
                          // Toggle DISTORT, turn off all others
                          const newValue = !efxDistort;
                          setEfxDistort(newValue);
                          if (newValue) {
                            setEfxGlitch(false);
                            setEfxBlur(false);
                            setEfxChromatic(false);
                            setEfxShake(false);
                          }
                        }}
                        title="Toggle distortion effect on images"
                      >
                        DISTORT
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-[8px] mb-[24px] border-b" style={{ borderColor: '#2a2a2a' }}>
              <button
                onClick={() => setActiveTab('content')}
                className="px-[16px] py-[12px] transition-all"
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
                className="px-[16px] py-[12px] transition-all"
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

            {activeTab === 'content' && (
              <div className="space-y-[24px]">
                {/* Style Selector */}
                <div>
                  <label
                    className="block mb-[8px]"
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: styles.textPrimary
                    }}
                  >
                    {getStyleLabel()}:
                  </label>
                  <div className="relative">
                    <select
                      value={currentPage.selectedStyle}
                      onChange={(e) => {
                        const newPages = [...docPages];
                        const newStyle = parseInt(e.target.value);

                        // Set default values based on Cover Thumbnail style selection
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
                            // Set default hero image only for Feature Article Colour
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
                            // Set default hero image for Feature Article BW
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
                            // Set default hero image for Creator Spotlight
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
                            // Set default second image for Announcement
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
                        setDocPages(newPages);
                      }}
                      className="w-full px-[16px] py-[12px] border rounded-[8px] appearance-none"
                      style={{
                        backgroundColor: '#2a2a2a',
                        borderColor: '#9e9e9d',
                        color: '#9e9e9d',
                        fontSize: '16px',
                        fontWeight: '400',
                        fontFamily: `'${styles.fontFamily}',sans-serif`
                      }}
                    >
                      {currentPage.styleType === 'cover' ? (
                        <>
                          <option value={1}>Feature Article Colour</option>
                          <option value={2}>Feature Article BW</option>
                          <option value={3}>Creator Spotlight</option>
                          <option value={4}>Announcement</option>
                        </>
                      ) : currentPage.styleType === 'intro' ? (
                        <>
                          <option value={1}>Opening Style 1</option>
                          <option value={2}>Opening Style 2</option>
                          <option value={3}>Opening Style 3</option>
                        </>
                      ) : (
                        <>
                          <option value={1}>Content Style 1</option>
                          <option value={2}>Content Style 2</option>
                          <option value={3}>Content Style 3</option>
                          <option value={4}>Content Style 4</option>
                        </>
                      )}
                    </select>
                    <ChevronDown
                      className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: '#9e9e9d' }}
                      size={16}
                    />
                  </div>
                </div>

                {/* Cover Thumbnail Fields */}
                {currentPage.styleType === 'cover' && (
                  <>
                    {/* Hero Image Title with Toggle */}
                    <div className="flex justify-between items-end mb-[8px]">
                      <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary }}>
                        Hero Image
                      </label>
                      <label className="flex items-center gap-[8px] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentPage.fields.showHeroImage !== false}
                          onChange={(e) => updatePageField('showHeroImage', e.target.checked)}
                          className="w-[16px] h-[16px] cursor-pointer"
                          style={{ accentColor: styles.textAccent }}
                        />
                        <span style={{ fontSize: '13px', fontWeight: '400', color: styles.textPrimary }}>
                          Show Hero Image
                        </span>
                      </label>
                    </div>

                    <ImageUploader
                      value={currentPage.images.coverImage || ''}
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
                      fontFamily={styles.fontFamily}
                      objectFit={currentPage.imageFits.coverImageFit || 'cover'}
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
                      customDetailText={currentPage.selectedStyle === 4 ? "Recommended size is 400 x 400 pixels" : "Transparent PNG or gif recommended.\\nFull size is 717 (W) x 750 (H) pixels"}
                    />

                    {/* Second Image - Only for Announcement style */}
                    {currentPage.selectedStyle === 4 && (
                      <ImageUploader
                        value={currentPage.images.coverImage2 || ''}
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
                        fontFamily={styles.fontFamily}
                        objectFit={currentPage.imageFits.coverImageFit2 || 'cover'}
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
                    )}

                    <div>
                      <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textAccent, display: 'block', marginBottom: '8px' }}>
                        Category
                      </label>
                      <input
                        type="text"
                        value={currentPage.fields.coverCategory || ''}
                        onChange={(e) => updatePageField('coverCategory', e.target.value.toUpperCase())}
                        placeholder="CATEGORY TYPE"
                        className="w-full px-[16px] py-[12px] border rounded-[8px] uppercase"
                        style={{
                          fontFamily: `'${styles.fontFamily}',sans-serif`,
                          fontSize: '16px',
                          fontWeight: '300',
                          backgroundColor: '#2a2a2a',
                          borderColor: '#2a2a2a',
                          color: '#11ff49'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                        Title
                      </label>
                      <textarea
                        value={currentPage.fields.coverTitle || ''}
                        onChange={(e) => updatePageField('coverTitle', e.target.value.toUpperCase())}
                        placeholder="ENTER HEADLINE HERE"
                        rows={4}
                        className="w-full px-[16px] py-[12px] border rounded-[8px] uppercase"
                        style={{
                          fontFamily: `'${styles.fontFamily}',sans-serif`,
                          fontSize: '16px',
                          fontWeight: '300',
                          backgroundColor: '#2a2a2a',
                          borderColor: '#2a2a2a',
                          color: '#f1f0eb',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    {/* Icon Counts */}
                    <div className="grid grid-cols-2 gap-[12px]">
                      <div>
                        <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                          Icon Count 1
                        </label>
                        <input
                          type="text"
                          value={currentPage.fields.coverIconCount1 || ''}
                          onChange={(e) => updatePageField('coverIconCount1', e.target.value)}
                          placeholder="1.2M"
                          className="w-full px-[16px] py-[12px] border rounded-[8px]"
                          style={{
                            fontFamily: `'${styles.fontFamily}',sans-serif`,
                            fontSize: '16px',
                            backgroundColor: '#2a2a2a',
                            borderColor: '#2a2a2a',
                            color: styles.textPrimary
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                          Icon Count 2
                        </label>
                        <input
                          type="text"
                          value={currentPage.fields.coverIconCount2 || ''}
                          onChange={(e) => updatePageField('coverIconCount2', e.target.value)}
                          placeholder="847K"
                          className="w-full px-[16px] py-[12px] border rounded-[8px]"
                          style={{
                            fontFamily: `'${styles.fontFamily}',sans-serif`,
                            fontSize: '16px',
                            backgroundColor: '#2a2a2a',
                            borderColor: '#2a2a2a',
                            color: styles.textPrimary
                          }}
                        />
                      </div>
                    </div>

                    {/* Background Color with Toggle */}
                    <div>
                      <div className="flex justify-between items-end mb-[8px]">
                        <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary }}>
                          Background Colour
                        </label>
                        <label className="flex items-center gap-[8px] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentPage.fields.showBackgroundColor !== false}
                            onChange={(e) => updatePageField('showBackgroundColor', e.target.checked)}
                            className="w-[16px] h-[16px] cursor-pointer"
                            style={{ accentColor: styles.textAccent }}
                          />
                          <span style={{ fontSize: '13px', fontWeight: '400', color: styles.textPrimary }}>
                            Show Background Color
                          </span>
                        </label>
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <input
                          type="color"
                          value={currentPage.fields.coverBackgroundColor || '#1a1a1a'}
                          onChange={(e) => updatePageField('coverBackgroundColor', e.target.value)}
                          className="w-[60px] h-[40px] rounded-[8px] cursor-pointer"
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
                          className="flex-1 px-[16px] py-[12px] border rounded-[8px]"
                          style={{
                            fontFamily: `'${styles.fontFamily}',sans-serif`,
                            fontSize: '16px',
                            backgroundColor: '#2a2a2a',
                            borderColor: '#2a2a2a',
                            color: styles.textPrimary
                          }}
                        />
                      </div>
                    </div>

                    {/* Background Image Upload */}
                    <ImageUploader
                      value={currentPage.images.coverBackgroundImage || ''}
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
                      fontFamily={styles.fontFamily}
                      objectFit={currentPage.imageFits.coverBackgroundImageFit || 'cover'}
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
                      customLabel="Background Image:"
                      customDetailText="Recommended size is 1512 x 851 pixels"
                    />

                    {/* Background Text - Only for Feature Article Colour and BW */}
                    {(currentPage.selectedStyle === 1 || currentPage.selectedStyle === 2) && (
                      <>
                        <div>
                          <div className="flex justify-between items-end mb-[8px]">
                            <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary }}>
                              Background Text
                            </label>
                            <label className="flex items-center gap-[8px] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={currentPage.fields.showBackgroundText !== false}
                                onChange={(e) => updatePageField('showBackgroundText', e.target.checked)}
                                className="w-[16px] h-[16px] cursor-pointer"
                                style={{ accentColor: styles.textAccent }}
                              />
                              <span style={{ fontSize: '13px', fontWeight: '400', color: styles.textPrimary }}>
                                Show Background Text
                              </span>
                            </label>
                          </div>
                          <input
                            type="text"
                            value={currentPage.fields.coverBackgroundText || ''}
                            onChange={(e) => updatePageField('coverBackgroundText', e.target.value.toUpperCase())}
                            placeholder={currentPage.selectedStyle === 1 ? 'FIGHTING!' : 'BUTTERFLY'}
                            className="w-full px-[16px] py-[12px] border rounded-[8px] uppercase"
                            style={{
                              fontFamily: `'${styles.fontFamily}',sans-serif`,
                              fontSize: '16px',
                              backgroundColor: '#2a2a2a',
                              borderColor: '#2a2a2a',
                              color: styles.textPrimary
                            }}
                          />
                        </div>

                        {/* Background Text Color */}
                        <div>
                          <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                            Background Text Colour
                          </label>
                          <div className="flex items-center gap-[12px]">
                            <input
                              type="color"
                              value={currentPage.fields.coverBackgroundTextColor || '#fb00b8'}
                              onChange={(e) => updatePageField('coverBackgroundTextColor', e.target.value)}
                              className="w-[60px] h-[40px] rounded-[8px] cursor-pointer"
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
                              className="flex-1 px-[16px] py-[12px] border rounded-[8px]"
                              style={{
                                fontFamily: `'${styles.fontFamily}',sans-serif`,
                                fontSize: '16px',
                                backgroundColor: '#2a2a2a',
                                borderColor: '#2a2a2a',
                                color: styles.textPrimary
                              }}
                            />
                          </div>
                        </div>

                        {/* Background Text Style - Fill or Stroke */}
                        <div>
                          <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                            Background Text Style
                          </label>
                          <div className="flex gap-[12px]">
                            <button
                              onClick={() => updatePageField('coverBackgroundTextStyle', 'fill')}
                              className="flex-1 py-[12px] rounded-[8px] transition-all"
                              style={{
                                backgroundColor: (currentPage.fields.coverBackgroundTextStyle || 'fill') === 'fill' ? styles.textAccent : '#2a2a2a',
                                border: `1px solid ${(currentPage.fields.coverBackgroundTextStyle || 'fill') === 'fill' ? styles.textAccent : '#3a3a3a'}`,
                                color: (currentPage.fields.coverBackgroundTextStyle || 'fill') === 'fill' ? '#1a1a1a' : styles.textPrimary,
                                fontSize: '14px',
                                fontWeight: '600'
                              }}
                            >
                              Fill
                            </button>
                            <button
                              onClick={() => updatePageField('coverBackgroundTextStyle', 'stroke')}
                              className="flex-1 py-[12px] rounded-[8px] transition-all"
                              style={{
                                backgroundColor: currentPage.fields.coverBackgroundTextStyle === 'stroke' ? styles.textAccent : '#2a2a2a',
                                border: `1px solid ${currentPage.fields.coverBackgroundTextStyle === 'stroke' ? styles.textAccent : '#3a3a3a'}`,
                                color: currentPage.fields.coverBackgroundTextStyle === 'stroke' ? '#1a1a1a' : styles.textPrimary,
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

                    {/* Featured Products Toggle */}
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
                            checked={!!currentPage.hasFeaturedProducts}
                            onChange={(e) => {
                              const newPages = [...docPages];
                              const page = { ...newPages[currentPageIndex] };
                              page.hasFeaturedProducts = e.target.checked;
                              newPages[currentPageIndex] = page;
                              setDocPages(newPages);
                            }}
                            className="w-5 h-5 cursor-pointer"
                            style={{ accentColor: '#11ff49' }}
                          />
                          <span
                            className="font-['Inter:Medium',sans-serif]"
                            style={{ fontSize: '14px', fontWeight: '500', color: styles.textPrimary }}
                          >
                            {!!currentPage.hasFeaturedProducts ? 'On' : 'Off'}
                          </span>
                        </label>
                      </div>
                      
                      {!!currentPage.hasFeaturedProducts && (
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
                                const newPages = [...docPages];
                                const page = { ...newPages[currentPageIndex] };
                                page.productSetId = e.target.value;
                                newPages[currentPageIndex] = page;
                                setDocPages(newPages);
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
                              size={18} 
                              style={{ color: '#9e9e9d', position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Intro Page Fields */}
                {currentPage.styleType === 'intro' && (
                  <>

                    <ImageUploader
                      value={currentPage.images.coverImage || ''}
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
                      fontFamily={styles.fontFamily}
                      objectFit={currentPage.imageFits.coverImageFit || 'cover'}
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
                    />

                    <div>
                      <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                        Title
                      </label>
                      <textarea
                        value={currentPage.fields.title || ''}
                        onChange={(e) => updatePageField('title', e.target.value)}
                        rows={3}
                        className="w-full px-[16px] py-[12px] border rounded-[8px]"
                        style={{
                          fontFamily: `'${styles.fontFamily}',sans-serif`,
                          fontSize: '16px',
                          backgroundColor: '#2a2a2a',
                          borderColor: '#2a2a2a',
                          color: styles.textPrimary,
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                        Author
                      </label>
                      <input
                        type="text"
                        value={currentPage.fields.author || ''}
                        onChange={(e) => updatePageField('author', e.target.value)}
                        className="w-full px-[16px] py-[12px] border rounded-[8px]"
                        style={{
                          fontFamily: `'${styles.fontFamily}',sans-serif`,
                          fontSize: '16px',
                          backgroundColor: '#2a2a2a',
                          borderColor: '#2a2a2a',
                          color: styles.textPrimary
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textAccent, display: 'block', marginBottom: '8px' }}>
                        Headline
                      </label>
                      <textarea
                        value={currentPage.fields.headline || ''}
                        onChange={(e) => updatePageField('headline', e.target.value)}
                        rows={3}
                        className="w-full px-[16px] py-[12px] border rounded-[8px]"
                        style={{
                          fontFamily: `'${styles.fontFamily}',sans-serif`,
                          fontSize: '16px',
                          backgroundColor: '#2a2a2a',
                          borderColor: '#2a2a2a',
                          color: styles.textPrimary,
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                        Body Copy 1
                      </label>
                      <textarea
                        value={currentPage.fields.description || ''}
                        onChange={(e) => updatePageField('description', e.target.value)}
                        rows={5}
                        className="w-full px-[16px] py-[12px] border rounded-[8px]"
                        style={{
                          fontFamily: `'${styles.fontFamily}',sans-serif`,
                          fontSize: '16px',
                          backgroundColor: '#2a2a2a',
                          borderColor: '#2a2a2a',
                          color: styles.textPrimary,
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    {/* Icon Counts for Intro Page */}
                    <div className="flex gap-[12px]">
                      <div className="flex-1">
                        <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                          Icon Count 1
                        </label>
                        <input
                          type="text"
                          value={currentPage.fields.iconCount1 || ''}
                          onChange={(e) => updatePageField('iconCount1', e.target.value)}
                          placeholder="e.g. 1.2M"
                          className="w-full px-[16px] py-[12px] border rounded-[8px]"
                          style={{
                            fontFamily: `'${styles.fontFamily}',sans-serif`,
                            fontSize: '16px',
                            backgroundColor: '#2a2a2a',
                            borderColor: '#2a2a2a',
                            color: styles.textPrimary
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                          Icon Count 2
                        </label>
                        <input
                          type="text"
                          value={currentPage.fields.iconCount2 || ''}
                          onChange={(e) => updatePageField('iconCount2', e.target.value)}
                          placeholder="e.g. 847K"
                          className="w-full px-[16px] py-[12px] border rounded-[8px]"
                          style={{
                            fontFamily: `'${styles.fontFamily}',sans-serif`,
                            fontSize: '16px',
                            backgroundColor: '#2a2a2a',
                            borderColor: '#2a2a2a',
                            color: styles.textPrimary
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Content Page Fields */}
                {currentPage.styleType === 'content' && (
                  <>
                    <div>
                      <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                        Image 1
                      </label>
                      <ImageUploader
                        value={currentPage.images.image1 || ''}
                        onChange={(url) => {
                          setPages(prev => {
                            const newPages = [...prev];
                            newPages[currentPageIndex] = {
                              ...newPages[currentPageIndex],
                              images: { ...newPages[currentPageIndex].images, image1: url }
                            };
                            return newPages;
                          });
                        }}
                        accentColor={styles.textAccent}
                        fontFamily={styles.fontFamily}
                        objectFit={currentPage.imageFits.image1Fit || 'cover'}
                        onObjectFitChange={(fit) => {
                          setPages(prev => {
                            const newPages = [...prev];
                            newPages[currentPageIndex] = {
                              ...newPages[currentPageIndex],
                              imageFits: { ...newPages[currentPageIndex].imageFits, image1Fit: fit }
                            };
                            return newPages;
                          });
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                        Image 2
                      </label>
                      <ImageUploader
                        value={currentPage.images.image2 || ''}
                        onChange={(url) => {
                          setPages(prev => {
                            const newPages = [...prev];
                            newPages[currentPageIndex] = {
                              ...newPages[currentPageIndex],
                              images: { ...newPages[currentPageIndex].images, image2: url }
                            };
                            return newPages;
                          });
                        }}
                        accentColor={styles.textAccent}
                        fontFamily={styles.fontFamily}
                        objectFit={currentPage.imageFits.image2Fit || 'cover'}
                        onObjectFitChange={(fit) => {
                          setPages(prev => {
                            const newPages = [...prev];
                            newPages[currentPageIndex] = {
                              ...newPages[currentPageIndex],
                              imageFits: { ...newPages[currentPageIndex].imageFits, image2Fit: fit }
                            };
                            return newPages;
                          });
                        }}
                      />
                    </div>

                    {/* Top Label - Only show on Page 1 (intro page) */}
                    {currentPage.styleType === 'intro' && (
                      <>
                        {/* Toggle for Top Label Visibility */}
                        <div>
                          <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                            Show Top Label on Page 1
                          </label>
                          <button
                            onClick={() => updatePageField('showTopLabel', !currentPage.fields.showTopLabel)}
                            className="w-full py-[12px] rounded-[8px] transition-all"
                            style={{
                              backgroundColor: currentPage.fields.showTopLabel ? styles.textAccent : '#2a2a2a',
                              border: `1px solid ${currentPage.fields.showTopLabel ? styles.textAccent : '#3a3a3a'}`,
                              color: currentPage.fields.showTopLabel ? '#1a1a1a' : styles.textPrimary,
                              fontSize: '14px',
                              fontWeight: '600'
                            }}
                          >
                            {currentPage.fields.showTopLabel ? 'ON' : 'OFF'}
                          </button>
                        </div>

                        {/* Top Label Input - Only show when toggle is ON */}
                        {currentPage.fields.showTopLabel && (
                          <div>
                            <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                              Top Label (locked for all pages in Reading Mode)
                            </label>
                            <input
                              type="text"
                              value={currentPage.fields.topLabel || ''}
                              onChange={(e) => updatePageField('topLabel', e.target.value.toUpperCase())}
                              placeholder="KAMI EDITORIAL"
                              className="w-full px-[16px] py-[12px] border rounded-[8px] uppercase"
                              style={{
                                fontFamily: `'${styles.fontFamily}',sans-serif`,
                                fontSize: '12px',
                                fontWeight: '600',
                                backgroundColor: '#2a2a2a',
                                borderColor: '#2a2a2a',
                                color: styles.textPrimary,
                                letterSpacing: '0.05em'
                              }}
                            />
                          </div>
                        )}
                      </>
                    )}

                    {/* Top Label - Only show on Page 2+ (content pages) */}
                    {currentPage.styleType === 'content' && (
                      <div>
                        <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                          Top Label
                        </label>
                        <input
                          type="text"
                          value={currentPage.fields.topLabel || ''}
                          onChange={(e) => updatePageField('topLabel', e.target.value)}
                          placeholder={currentPage.selectedStyle === 1 ? 'BEYOND THE SCREENSHOT' : ''}
                          className="w-full px-[16px] py-[12px] border rounded-[8px]"
                          style={{
                            fontFamily: `'${styles.fontFamily}',sans-serif`,
                            fontSize: '16px',
                            backgroundColor: '#2a2a2a',
                            borderColor: '#2a2a2a',
                            color: styles.textPrimary
                          }}
                        />
                      </div>
                    )}

                    {/* First Body Copy - Not for Style 4 */}
                    {currentPage.selectedStyle !== 4 && (
                      <div>
                        <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                          Body Copy {currentPage.selectedStyle}-1
                        </label>
                        <RichTextEditor
                          key={`body-copy-${currentPage.id}-intro-or-first`}
                          value={currentPage.fields.bodyCopies?.[0]?.text || ''}
                          onChange={(value) => {
                            const newBodies = [...(currentPage.fields.bodyCopies || [{ id: 'body-1', text: '' }])];
                            // Explicitly ensure first body copy has NO afterHeaderId
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

                    {/* Dynamic Paragraph Headers and Body Copies - Not for Style 4 */}
                    {currentPage.selectedStyle !== 4 && currentPage.fields.paragraphHeaders?.map((header, index) => (
                      <div key={header.id} style={{ marginTop: index > 0 ? '32px' : '16px' }}>
                        <div className="mb-[16px]">
                          <div className="flex items-center justify-between mb-[8px]">
                            <label style={{ fontSize: '16px', fontWeight: '600', color: '#11ff49', display: 'block' }}>
                              Paragraph Header {index + 1}
                            </label>
                            <button
                              onClick={() => {
                                const newHeaders = currentPage.fields.paragraphHeaders?.filter(h => h.id !== header.id) || [];
                                // Keep body copies but clear the association so they remain visible independently
                                const newBodies = (currentPage.fields.bodyCopies || []).map(b =>
                                  b.afterHeaderId === header.id ? { ...b, afterHeaderId: undefined } : b
                                );
                                setPages(prev => {
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
                              className="p-[6px] transition-all"
                              style={{
                                color: '#ff4444',
                                backgroundColor: 'transparent'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#ff444420';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                              title="Delete Paragraph Header"
                              type="button"
                            >
                              <Trash2 className="size-[16px]" strokeWidth={1.5} />
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
                            placeholder={currentPage.selectedStyle === 1 ? 'The Digital Paper Trail' : ''}
                            className="w-full px-[16px] py-[12px] border rounded-[8px]"
                            style={{
                              fontFamily: `'${styles.fontFamily}',sans-serif`,
                              fontSize: '16px',
                              backgroundColor: '#2a2a2a',
                              borderColor: '#2a2a2a',
                              color: '#11ff49'
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                            Body Copy {currentPage.selectedStyle}-{index + 2}
                          </label>
                          <RichTextEditor
                            key={`body-copy-${currentPage.id}-${header.id}`}
                            value={currentPage.fields.bodyCopies?.find(b => b.afterHeaderId === header.id)?.text || ''}
                            onChange={(value) => {
                              const newBodies = [...(currentPage.fields.bodyCopies || [])];
                              console.log('🔍 Before update - All bodies:', JSON.stringify(newBodies.map(b => ({ id: b.id, afterHeaderId: b.afterHeaderId, textPreview: b.text.substring(0, 30) })), null, 2));
                              console.log('🎯 Updating header ID:', header.id);
                              const bodyIndex = newBodies.findIndex(b => b.afterHeaderId === header.id);
                              if (bodyIndex >= 0) {
                                newBodies[bodyIndex] = {
                                  id: newBodies[bodyIndex].id,
                                  afterHeaderId: header.id,
                                  text: value
                                };
                              } else {
                                // Create new body copy if it doesn't exist
                                newBodies.push({
                                  id: `body-${Date.now()}`,
                                  afterHeaderId: header.id,
                                  text: value
                                });
                              }
                              console.log('✅ After update - All bodies:', JSON.stringify(newBodies.map(b => ({ id: b.id, afterHeaderId: b.afterHeaderId, textPreview: b.text.substring(0, 30) })), null, 2));
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

                    {/* Content Style 4 Caption Fields - Only show for Style 4 */}
                    {currentPage.selectedStyle === 4 && (
                      <>
                        <div style={{ marginTop: '32px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#11ff49', margin: 0 }}>
                              Image 1 Caption
                            </h3>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={currentPage.fields.showCaption1 !== false}
                                onChange={(e) => updatePageField('showCaption1', e.target.checked)}
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  cursor: 'pointer',
                                  accentColor: '#11ff49'
                                }}
                              />
                              <span style={{ fontSize: '14px', fontWeight: '500', color: styles.textPrimary }}>
                                Show
                              </span>
                            </label>
                          </div>

                          {currentPage.fields.showCaption1 !== false && (
                            <>
                              <div style={{ marginBottom: '16px' }}>
                                <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                                  Caption Title
                                </label>
                                <input
                                  type="text"
                                  value={currentPage.fields.caption1Title || ''}
                                  onChange={(e) => updatePageField('caption1Title', e.target.value)}
                                  placeholder="ARTWORK TITLE"
                                  className="w-full px-[16px] py-[12px] border rounded-[8px]"
                                  style={{
                                    fontFamily: `'${styles.fontFamily}',sans-serif`,
                                    fontSize: '16px',
                                    backgroundColor: '#2a2a2a',
                                    borderColor: '#2a2a2a',
                                    color: styles.textPrimary
                                  }}
                                />
                              </div>
                              <div>
                                <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                                  Caption Subtitle
                                </label>
                                <input
                                  type="text"
                                  value={currentPage.fields.caption1Subtitle || ''}
                                  onChange={(e) => updatePageField('caption1Subtitle', e.target.value)}
                                  placeholder="Brief description"
                                  className="w-full px-[16px] py-[12px] border rounded-[8px]"
                                  style={{
                                    fontFamily: `'${styles.fontFamily}',sans-serif`,
                                    fontSize: '16px',
                                    backgroundColor: '#2a2a2a',
                                    borderColor: '#2a2a2a',
                                    color: styles.textPrimary
                                  }}
                                />
                              </div>
                            </>
                          )}
                        </div>

                        <div style={{ marginTop: '32px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#11ff49', margin: 0 }}>
                              Image 2 Caption
                            </h3>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={currentPage.fields.showCaption2 !== false}
                                onChange={(e) => updatePageField('showCaption2', e.target.checked)}
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  cursor: 'pointer',
                                  accentColor: '#11ff49'
                                }}
                              />
                              <span style={{ fontSize: '14px', fontWeight: '500', color: styles.textPrimary }}>
                                Show
                              </span>
                            </label>
                          </div>

                          {currentPage.fields.showCaption2 !== false && (
                            <>
                              <div style={{ marginBottom: '16px' }}>
                                <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                                  Caption Title
                                </label>
                                <input
                                  type="text"
                                  value={currentPage.fields.caption2Title || ''}
                                  onChange={(e) => updatePageField('caption2Title', e.target.value)}
                                  placeholder="ARTWORK TITLE"
                                  className="w-full px-[16px] py-[12px] border rounded-[8px]"
                                  style={{
                                    fontFamily: `'${styles.fontFamily}',sans-serif`,
                                    fontSize: '16px',
                                    backgroundColor: '#2a2a2a',
                                    borderColor: '#2a2a2a',
                                    color: styles.textPrimary
                                  }}
                                />
                              </div>
                              <div>
                                <label style={{ fontSize: '16px', fontWeight: '600', color: styles.textPrimary, display: 'block', marginBottom: '8px' }}>
                                  Caption Subtitle
                                </label>
                                <input
                                  type="text"
                                  value={currentPage.fields.caption2Subtitle || ''}
                                  onChange={(e) => updatePageField('caption2Subtitle', e.target.value)}
                                  placeholder="Brief description"
                                  className="w-full px-[16px] py-[12px] border rounded-[8px]"
                                  style={{
                                    fontFamily: `'${styles.fontFamily}',sans-serif`,
                                    fontSize: '16px',
                                    backgroundColor: '#2a2a2a',
                                    borderColor: '#2a2a2a',
                                    color: styles.textPrimary
                                  }}
                                />
                              </div>
                            </>
                          )}
                        </div>
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
                              const newPages = [...docPages];
                              const page = { ...newPages[currentPageIndex] };
                              page.hasFeaturedProducts = e.target.checked;
                              newPages[currentPageIndex] = page;
                              setDocPages(newPages);
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
                      </div>
                    )}
                  </>
                )}

                {/* Action Buttons Section */}
                <div className="border-t pt-[24px] space-y-[16px]" style={{ borderColor: '#2a2a2a' }}>
                  {/* Add Paragraph Header Button - Only for content pages (not Style 4) */}
                  {currentPage.styleType === 'content' && currentPage.selectedStyle !== 4 && (
                    <>
                      <button
                        onClick={addParagraphHeader}
                        className="w-full h-[40px] rounded-[8px] transition-colors"
                        style={{
                          backgroundColor: '#2a2a2a',
                          border: '1px solid #11ff49',
                          color: '#11ff49',
                          fontSize: '16px',
                          fontWeight: '600',
                          fontFamily: `'${styles.fontFamily}',sans-serif`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#1f2a1f';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#2a2a2a';
                        }}
                      >
                        Add Paragraph Header
                      </button>

                      {/* Separator Line */}
                      <div style={{ height: '1px', backgroundColor: '#f1f0eb' }} />
                    </>
                  )}

                  {/* Separator for Cover and Intro pages */}
                  {(currentPage.styleType === 'cover' || currentPage.styleType === 'intro') && (
                    <div style={{ height: '1px', backgroundColor: '#f1f0eb' }} />
                  )}

                  {/* Add Page and Save Page Buttons */}
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex gap-[11px]">
                      <button
                        onClick={() => {
                          console.log('Add New Page button clicked');
                          setShowStyleModal(true);
                        }}
                        className="flex-1 h-[40px] rounded-[8px] transition-colors relative group"
                        style={{
                          backgroundColor: '#2a2a2a',
                          border: '1px solid #a79755',
                          color: '#a79755',
                          fontSize: '16px',
                          fontWeight: '600',
                          fontFamily: `'${styles.fontFamily}',sans-serif`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#2a261f';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#2a2a2a';
                        }}
                      >
                        + Add New Page
                      </button>

                      <button
                        onClick={savePage}
                        className="flex-1 h-[40px] rounded-[8px] transition-colors"
                        style={{
                          backgroundColor: '#2a2a2a',
                          border: '1px solid #a79755',
                          color: '#a79755',
                          fontSize: '16px',
                          fontWeight: '600',
                          fontFamily: `'${styles.fontFamily}',sans-serif`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#2a261f';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#2a2a2a';
                        }}
                      >
                        Save Page
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'style' && (
              <div className="space-y-[32px]">
                {/* Colors */}
                <div className="space-y-[16px]">
                  <div className="flex items-center gap-[10px]">
                    <Palette className="size-[16px]" strokeWidth={1.5} style={{ color: styles.textAccent }} />
                    <h4
                      className="m-0"
                      style={{
                        fontWeight: '700',
                        fontSize: '15px',
                        color: styles.textPrimary
                      }}
                    >
                      Colors
                    </h4>
                  </div>

                  <div>
                    <label
                      className="block mb-[8px]"
                      style={{
                        fontSize: '13px',
                        color: '#9e9e9d'
                      }}
                    >
                      Background
                    </label>
                    <div className="flex gap-[10px]">
                      <div
                        className="w-[50px] h-[44px] border-2"
                        style={{
                          backgroundColor: styles.background,
                          borderColor: '#2a2a2a'
                        }}
                      />
                      <input
                        type="text"
                        value={styles.background}
                        onChange={(e) => updateStyle('background', e.target.value)}
                        className="flex-1 bg-transparent border px-[16px] py-[12px] focus:outline-none transition-all uppercase"
                        style={{
                          fontSize: '13px',
                          borderColor: '#2a2a2a',
                          color: styles.textPrimary,
                          fontFamily: 'monospace'
                        }}
                        onFocus={(e) => e.target.style.borderColor = styles.textAccent}
                        onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block mb-[8px]"
                      style={{
                        fontSize: '13px',
                        color: '#9e9e9d'
                      }}
                    >
                      Primary Text
                    </label>
                    <div className="flex gap-[10px]">
                      <div
                        className="w-[50px] h-[44px] border-2"
                        style={{
                          backgroundColor: styles.textPrimary,
                          borderColor: '#2a2a2a'
                        }}
                      />
                      <input
                        type="text"
                        value={styles.textPrimary}
                        onChange={(e) => updateStyle('textPrimary', e.target.value)}
                        className="flex-1 bg-transparent border px-[16px] py-[12px] focus:outline-none transition-all uppercase"
                        style={{
                          fontSize: '13px',
                          borderColor: '#2a2a2a',
                          color: styles.textPrimary,
                          fontFamily: 'monospace'
                        }}
                        onFocus={(e) => e.target.style.borderColor = styles.textAccent}
                        onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block mb-[8px]"
                      style={{
                        fontSize: '13px',
                        color: '#9e9e9d'
                      }}
                    >
                      Accent Color
                    </label>
                    <div className="flex gap-[10px]">
                      <div
                        className="w-[50px] h-[44px] border-2"
                        style={{
                          backgroundColor: styles.textAccent,
                          borderColor: '#2a2a2a'
                        }}
                      />
                      <input
                        type="text"
                        value={styles.textAccent}
                        onChange={(e) => updateStyle('textAccent', e.target.value)}
                        className="flex-1 bg-transparent border px-[16px] py-[12px] focus:outline-none transition-all uppercase"
                        style={{
                          fontSize: '13px',
                          borderColor: '#2a2a2a',
                          color: styles.textPrimary,
                          fontFamily: 'monospace'
                        }}
                        onFocus={(e) => e.target.style.borderColor = styles.textAccent}
                        onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block mb-[8px]"
                      style={{
                        fontSize: '13px',
                        color: '#9e9e9d'
                      }}
                    >
                      Secondary Colours
                    </label>
                    <div className="space-y-[10px]">
                      <div className="flex gap-[10px] items-center">
                        <div
                          className="size-[44px] border-2"
                          style={{
                            backgroundColor: '#9E9E9D',
                            borderColor: '#2a2a2a'
                          }}
                        />
                        <input
                          type="text"
                          value="#9E9E9D"
                          readOnly
                          className="flex-1 bg-transparent border px-[16px] py-[12px] focus:outline-none transition-all uppercase"
                          style={{
                            fontSize: '13px',
                            borderColor: '#2a2a2a',
                            color: styles.textPrimary,
                            fontFamily: 'monospace'
                          }}
                        />
                      </div>
                      <div className="flex gap-[10px] items-center">
                        <div
                          className="size-[44px] border-2"
                          style={{
                            backgroundColor: '#A79755',
                            borderColor: '#2a2a2a'
                          }}
                        />
                        <input
                          type="text"
                          value="#A79755"
                          readOnly
                          className="flex-1 bg-transparent border px-[16px] py-[12px] focus:outline-none transition-all uppercase"
                          style={{
                            fontSize: '13px',
                            borderColor: '#2a2a2a',
                            color: styles.textPrimary,
                            fontFamily: 'monospace'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-[16px]">
                  <div className="flex items-center gap-[10px]">
                    <Type className="size-[16px]" strokeWidth={1.5} style={{ color: styles.textAccent }} />
                    <h4
                      className="m-0"
                      style={{
                        fontWeight: '700',
                        fontSize: '15px',
                        color: styles.textPrimary
                      }}
                    >
                      Typography
                    </h4>
                  </div>

                  <div>
                    <label
                      className="block mb-[8px]"
                      style={{
                        fontSize: '13px',
                        color: '#9e9e9d'
                      }}
                    >
                      Font Family
                    </label>
                    <div className="space-y-[8px]">
                      <div
                        className="w-full border px-[16px] py-[12px]"
                        style={{
                          fontSize: '13px',
                          borderColor: '#2a2a2a',
                          color: styles.textPrimary,
                          backgroundColor: 'transparent'
                        }}
                      >
                        Inter
                      </div>
                      <div
                        className="w-full border px-[16px] py-[12px]"
                        style={{
                          fontSize: '13px',
                          borderColor: '#2a2a2a',
                          color: styles.textPrimary,
                          backgroundColor: 'transparent'
                        }}
                      >
                        Humane
                      </div>
                    </div>
                  </div>

                  {/* Cover Typography */}
                  {currentPage.styleType === 'cover' && (
                    <>
                      <div className="grid grid-cols-2 gap-[12px]">
                        <SimpleSelect
                          label="Cover Title Size"
                          value={styles.coverTitleFontSize}
                          onChange={(value) => updateStyle('coverTitleFontSize', value)}
                          options={[
                            { value: '60px', label: '60px' },
                            { value: '48px', label: '48px' }
                          ]}
                        />
                        <SimpleSelect
                          label="Cover Title Weight"
                          value={styles.coverTitleFontWeight}
                          onChange={(value) => updateStyle('coverTitleFontWeight', value)}
                          options={[
                            { value: '100', label: 'Thin (100)' },
                            { value: '200', label: 'Extra Light (200)' },
                            { value: '300', label: 'Light (300)' },
                            { value: '400', label: 'Regular (400)' },
                            { value: '500', label: 'Medium (500)' },
                            { value: '600', label: 'Semi Bold (600)' },
                            { value: '700', label: 'Bold (700)' },
                            { value: '800', label: 'Extra Bold (800)' },
                            { value: '900', label: 'Black (900)' }
                          ]}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-[12px]">
                        <SimpleSelect
                          label="Headline Size"
                          value={styles.coverHeadlineFontSize}
                          onChange={(value) => updateStyle('coverHeadlineFontSize', value)}
                          options={[
                            { value: '20px', label: '20px' },
                            { value: '18px', label: '18px' }
                          ]}
                        />
                        <SimpleSelect
                          label="Headline Weight"
                          value={styles.coverHeadlineFontWeight}
                          onChange={(value) => updateStyle('coverHeadlineFontWeight', value)}
                          options={[
                            { value: '100', label: 'Thin (100)' },
                            { value: '200', label: 'Extra Light (200)' },
                            { value: '300', label: 'Light (300)' },
                            { value: '400', label: 'Regular (400)' },
                            { value: '500', label: 'Medium (500)' },
                            { value: '600', label: 'Semi Bold (600)' },
                            { value: '700', label: 'Bold (700)' },
                            { value: '800', label: 'Extra Bold (800)' },
                            { value: '900', label: 'Black (900)' }
                          ]}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-[12px]">
                        <SimpleSelect
                          label="Author Size"
                          value={styles.coverAuthorFontSize}
                          onChange={(value) => updateStyle('coverAuthorFontSize', value)}
                          options={[
                            { value: '13px', label: '13px' },
                            { value: '12px', label: '12px' },
                            { value: '11px', label: '11px' }
                          ]}
                        />
                        <SimpleSelect
                          label="Author Weight"
                          value={styles.coverAuthorFontWeight}
                          onChange={(value) => updateStyle('coverAuthorFontWeight', value)}
                          options={[
                            { value: '100', label: 'Thin (100)' },
                            { value: '200', label: 'Extra Light (200)' },
                            { value: '300', label: 'Light (300)' },
                            { value: '400', label: 'Regular (400)' },
                            { value: '500', label: 'Medium (500)' },
                            { value: '600', label: 'Semi Bold (600)' },
                            { value: '700', label: 'Bold (700)' },
                            { value: '800', label: 'Extra Bold (800)' },
                            { value: '900', label: 'Black (900)' }
                          ]}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-[12px]">
                        <SimpleSelect
                          label="Description Size"
                          value={styles.coverDescriptionFontSize}
                          onChange={(value) => updateStyle('coverDescriptionFontSize', value)}
                          options={[
                            { value: '15px', label: '15px' },
                            { value: '14px', label: '14px' },
                            { value: '13px', label: '13px' }
                          ]}
                        />
                        <SimpleSelect
                          label="Description Weight"
                          value={styles.coverDescriptionFontWeight}
                          onChange={(value) => updateStyle('coverDescriptionFontWeight', value)}
                          options={[
                            { value: '100', label: 'Thin (100)' },
                            { value: '200', label: 'Extra Light (200)' },
                            { value: '300', label: 'Light (300)' },
                            { value: '400', label: 'Regular (400)' },
                            { value: '500', label: 'Medium (500)' },
                            { value: '600', label: 'Semi Bold (600)' },
                            { value: '700', label: 'Bold (700)' },
                            { value: '800', label: 'Extra Bold (800)' },
                            { value: '900', label: 'Black (900)' }
                          ]}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-[12px]">
                        <SimpleSelect
                          label="Icon Count Size"
                          value={styles.coverIconCountFontSize}
                          onChange={(value) => updateStyle('coverIconCountFontSize', value)}
                          options={[
                            { value: '10px', label: '10px' },
                            { value: '9px', label: '9px' },
                            { value: '8px', label: '8px' }
                          ]}
                        />
                        <div>
                          {/* Empty to maintain grid layout */}
                        </div>
                      </div>
                    </>
                  )}

                  {/* General Typography - Top Label */}
                  <div className="grid grid-cols-2 gap-[12px]">
                    <SimpleSelect
                      label="Top Label Size"
                      value={styles.topLabelFontSize}
                      onChange={(value) => updateStyle('topLabelFontSize', value)}
                      options={[
                        { value: '12px', label: '12px' },
                        { value: '10px', label: '10px' }
                      ]}
                    />
                    <SimpleSelect
                      label="Top Label Weight"
                      value={styles.topLabelFontWeight}
                      onChange={(value) => updateStyle('topLabelFontWeight', value)}
                      options={[
                        { value: '100', label: 'Thin (100)' },
                        { value: '200', label: 'Extra Light (200)' },
                        { value: '300', label: 'Light (300)' },
                        { value: '400', label: 'Regular (400)' },
                        { value: '500', label: 'Medium (500)' },
                        { value: '600', label: 'Semi Bold (600)' },
                        { value: '700', label: 'Bold (700)' },
                        { value: '800', label: 'Extra Bold (800)' },
                        { value: '900', label: 'Black (900)' }
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-[12px]">
                    <SimpleSelect
                      label="Intro Font Size"
                      value={styles.introFontSize}
                      onChange={(value) => updateStyle('introFontSize', value)}
                      options={[
                        { value: '24px', label: '24px' },
                        { value: '22px', label: '22px' }
                      ]}
                    />
                    <SimpleSelect
                      label="Intro Weight"
                      value={styles.introFontWeight}
                      onChange={(value) => updateStyle('introFontWeight', value)}
                      options={[
                        { value: '100', label: 'Thin (100)' },
                        { value: '200', label: 'Extra Light (200)' },
                        { value: '300', label: 'Light (300)' },
                        { value: '400', label: 'Regular (400)' },
                        { value: '500', label: 'Medium (500)' },
                        { value: '600', label: 'Semi Bold (600)' },
                        { value: '700', label: 'Bold (700)' },
                        { value: '800', label: 'Extra Bold (800)' },
                        { value: '900', label: 'Black (900)' }
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-[12px]">
                    <SimpleSelect
                      label="Heading Size"
                      value={styles.headingFontSize}
                      onChange={(value) => updateStyle('headingFontSize', value)}
                      options={[
                        { value: '16px', label: '16px' },
                        { value: '15px', label: '15px' }
                      ]}
                    />
                    <SimpleSelect
                      label="Heading Weight"
                      value={styles.headingFontWeight}
                      onChange={(value) => updateStyle('headingFontWeight', value)}
                      options={[
                        { value: '100', label: 'Thin (100)' },
                        { value: '200', label: 'Extra Light (200)' },
                        { value: '300', label: 'Light (300)' },
                        { value: '400', label: 'Regular (400)' },
                        { value: '500', label: 'Medium (500)' },
                        { value: '600', label: 'Semi Bold (600)' },
                        { value: '700', label: 'Bold (700)' },
                        { value: '800', label: 'Extra Bold (800)' },
                        { value: '900', label: 'Black (900)' }
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-[12px]">
                    <SimpleSelect
                      label="Body Font Size"
                      value={styles.bodyFontSize}
                      onChange={(value) => updateStyle('bodyFontSize', value)}
                      options={[
                        { value: '15px', label: '15px' },
                        { value: '14px', label: '14px' },
                        { value: '13px', label: '13px' }
                      ]}
                    />
                    <SimpleSelect
                      label="Body Weight"
                      value={styles.bodyFontWeight}
                      onChange={(value) => updateStyle('bodyFontWeight', value)}
                      options={[
                        { value: '100', label: 'Thin (100)' },
                        { value: '200', label: 'Extra Light (200)' },
                        { value: '300', label: 'Light (300)' },
                        { value: '400', label: 'Regular (400)' },
                        { value: '500', label: 'Medium (500)' },
                        { value: '600', label: 'Semi Bold (600)' },
                        { value: '700', label: 'Bold (700)' },
                        { value: '800', label: 'Extra Bold (800)' },
                        { value: '900', label: 'Black (900)' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Style Selection Modal */}
      {renderStyleModal()}

      {/* Reading Mode Overlay - V4 with Masking Architecture */}
      {isReadingMode && (
        <div
          className="fixed inset-0 z-[9999]"
          style={{
            animation: 'fadeInReading 150ms ease-out forwards',
            animationDelay: '0ms'
          }}
        >
          {(() => {
            const coverPage = docPages.find(p => p.pageNumber === 'cover');
            // Cast to any to access dynamic properties added by updatePageRoot
            const hasFeaturedProducts = (coverPage as any)?.hasFeaturedProducts;
            const productSetId = (coverPage as any)?.productSetId;
            
            // Logic to determine products with fallback
            let products: any[] = [];
            if (productSets && productSets.length > 0) {
              if (productSetId) {
                const set = productSets.find(s => s.id === productSetId);
                if (set) {
                  products = set.products;
                } else {
                  // Fallback to first set if ID not found
                  products = productSets[0].products;
                }
              } else {
                // Fallback to first set if no ID selected
                products = productSets[0].products;
              }
            }
            
            return (
              <ReadingModeV4
                pages={docPages}
                styles={styles}
                onClose={handleExitReadingMode}
                onBackToCover={handleBackToCover}
                onBackToLanding={undefined}
                onPropertiesClick={undefined}
                renderBackgroundLayer={renderBackgroundLayer}
                renderImageLayer={renderImageLayer}
                renderTextLayer={renderTextLayer}
                scrollContainerRef={scrollContainerRef}
                hasFeaturedProducts={hasFeaturedProducts}
                products={products}
              />
            );
          })()}
        </div>
      )}

      {/* Cinematic blur-dissolve transition overlay (desktop) */}
      {isTransitioning && (
        <div
          className="fixed inset-0"
          style={{
            zIndex: 10000,
            pointerEvents: 'none',
            animation: 'cinematicTransition 1500ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        />
      )}

      {/* CSS Keyframes for transition animations */}
      <style>{`
        @keyframes fadeInReading {
          0% {
            opacity: 0;
            transform: scale(0.98);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes cinematicTransition {
          0% {
            background-color: rgba(0, 0, 0, 0);
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
          }
          35% {
            background-color: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          }
          50% {
            background-color: rgba(0, 0, 0, 1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
          60% {
            background-color: rgba(0, 0, 0, 1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
          100% {
            background-color: rgba(0, 0, 0, 0);
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
          }
        }
      `}</style>

      {/* Mobile Properties Sheet - Global for both cover and reading modes */}
      {isMobileOrTablet && (
        <MobilePropertiesSheet
          isOpen={mobilePropertiesOpen}
          onClose={() => setMobilePropertiesOpen(false)}
          title="PROPERTIES PANEL"
        >
          <MobilePropertiesContent
            currentPage={currentPage}
            currentPageIndex={currentPageIndex}
            pages={docPages}
            styles={styles}
            setStyles={setStyles}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            deletePage={deletePage}
            setCurrentPageIndex={setCurrentPageIndex}
            setMobilePropertiesOpen={setMobilePropertiesOpen}
            setIsReadingMode={setIsReadingMode}
            efxGlitch={efxGlitch}
            efxBlur={efxBlur}
            efxChromatic={efxChromatic}
            efxShake={efxShake}
            efxDistort={efxDistort}
            setEfxGlitch={setEfxGlitch}
            setEfxBlur={setEfxBlur}
            setEfxChromatic={setEfxChromatic}
            setEfxShake={setEfxShake}
            setEfxDistort={setEfxDistort}
            updatePageField={updatePageField}
            setPages={setDocPages}
            setShowStyleModal={setShowStyleModal}
            getStyleLabel={getStyleLabel}
            onSaveToLibrary={handleDownloadAll}
          />
        </MobilePropertiesSheet>
      )}
    </div>
  );
}
