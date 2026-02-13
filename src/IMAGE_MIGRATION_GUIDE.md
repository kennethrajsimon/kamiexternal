# Image Asset Migration Guide

This guide helps you convert from Figma asset imports to local image imports.

---

## Understanding Figma Asset Imports

In Figma Make, images are imported like this:
```typescript
import imgCoverImage from "figma:asset/67d0f537221b199b259a2444a228f3a95653ff33.png";
```

This won't work in your local IDE because:
- `figma:asset` is a virtual module scheme specific to Figma Make
- The hash is a Figma-internal reference
- Your local Next.js has no way to resolve these

---

## Migration Strategy

### Option 1: Use Placeholders (Fastest ⚡)

**Best for**: Initial development, testing, when you don't have image assets yet

The `ImageWithFallback` component is already set up to handle missing images:

```typescript
// This will work automatically - no changes needed!
import imgCoverImage from "figma:asset/67d0f537221b199b259a2444a228f3a95653ff33.png";

// Component will show a colored placeholder if image not found
<img src={imgCoverImage} alt="Cover" />
```

Just start your dev server and placeholders will appear.

---

### Option 2: Convert to Local Imports (Production Ready 🎯)

**Best for**: Production builds, when you have exported images from Figma

#### Step 1: Export Images from Figma

Open your Figma file and export these assets:

| Figma Hash | Save As | Used In |
|------------|---------|---------|
| `67d0f537221b199b259a2444a228f3a95653ff33.png` | `cover-hero.png` | Cover pages |
| `1e2c0b75f3380f734d584408cd01b575701ebed4.png` | `male-designer.png` | Content Style 1 |
| `39c384392b8924f5f2b6d757fe522edd04101ed2.png` | `female-designer.png` | Content Style 1 |
| `f8364a5e1f572a61802f72d01f6eab70396e6bc7.png` | `camp-logo.png` | Content Style 2 |
| `57df19e0e769b6da97fd76228c7f13433332947b.png` | `soneium-logo.png` | Content Style 2 |
| `b0eb03c8bf3a51ca66cc1b87518c081d760dae4f.png` | `style3-image1.png` | Content Style 3 |
| `88b7a9c7b89b680757a69a6111f92ad0051f123b.png` | `style3-image2.png` | Content Style 3 |
| `931ef8e14bd8f3516acd9bea1676dbd4b8d4987d.png` | `cover-hero-default.png` | Default cover |
| `34c2e0eace15e343a1c923bac054f892ff3c7f6f.png` | `bw-hero.png` | B&W cover |
| `c5ce4e47ab90e08210a558deb1f6e4cba2392c2a.png` | `creator-spotlight.png` | Creator spotlight |
| `36a8297e1a2ddc90473646931c66462380d62ee9.png` | `announcement.png` | Announcement cover |
| `5a6d34f55aa6a2ffd4c21bc63ef106a349833da7.png` | `singkarpor1.png` | Content Style 4 |
| `c79bba76c09347c9a0a4a11787908716f7527a3a.png` | `singkarpor2.png` | Content Style 4 |

#### Step 2: Place in Public Directory

```bash
mkdir -p public/images
```

Move all exported images to `public/images/`

#### Step 3: Update Import Statements

**Before:**
```typescript
import imgCoverImage from "figma:asset/67d0f537221b199b259a2444a228f3a95653ff33.png";
```

**After:**
```typescript
import imgCoverImage from "@/public/images/cover-hero.png";
```

---

## Files That Need Updates

### 1. `/ContentDashboardV4.tsx`

**Original:**
```typescript
import imgCoverImage from "figma:asset/67d0f537221b199b259a2444a228f3a95653ff33.png";
import imgMaleDesigner from "figma:asset/1e2c0b75f3380f734d584408cd01b575701ebed4.png";
import imgFemaleDesigner from "figma:asset/39c384392b8924f5f2b6d757fe522edd04101ed2.png";
import imgCampLogo from "figma:asset/f8364a5e1f572a61802f72d01f6eab70396e6bc7.png";
import imgSoneiumLogo from "figma:asset/57df19e0e769b6da97fd76228c7f13433332947b.png";
import imgStyle3Image1 from "figma:asset/b0eb03c8bf3a51ca66cc1b87518c081d760dae4f.png";
import imgStyle3Image2 from "figma:asset/88b7a9c7b89b680757a69a6111f92ad0051f123b.png";
import imgDefaultCoverHero from "figma:asset/931ef8e14bd8f3516acd9bea1676dbd4b8d4987d.png";
import imgDefaultBWHero from "figma:asset/34c2e0eace15e343a1c923bac054f892ff3c7f6f.png";
import imgDefaultCreatorSpotlightHero from "figma:asset/c5ce4e47ab90e08210a558deb1f6e4cba2392c2a.png";
import imgDefaultAnnouncementSecond from "figma:asset/36a8297e1a2ddc90473646931c66462380d62ee9.png";
import imgSingkarpor from "figma:asset/5a6d34f55aa6a2ffd4c21bc63ef106a349833da7.png";
import imgSingkarpor2 from "figma:asset/c79bba76c09347c9a0a4a11787908716f7527a3a.png";
```

**Replace with:**
```typescript
import imgCoverImage from "@/public/images/cover-hero.png";
import imgMaleDesigner from "@/public/images/male-designer.png";
import imgFemaleDesigner from "@/public/images/female-designer.png";
import imgCampLogo from "@/public/images/camp-logo.png";
import imgSoneiumLogo from "@/public/images/soneium-logo.png";
import imgStyle3Image1 from "@/public/images/style3-image1.png";
import imgStyle3Image2 from "@/public/images/style3-image2.png";
import imgDefaultCoverHero from "@/public/images/cover-hero-default.png";
import imgDefaultBWHero from "@/public/images/bw-hero.png";
import imgDefaultCreatorSpotlightHero from "@/public/images/creator-spotlight.png";
import imgDefaultAnnouncementSecond from "@/public/images/announcement.png";
import imgSingkarpor from "@/public/images/singkarpor1.png";
import imgSingkarpor2 from "@/public/images/singkarpor2.png";
```

### 2. `/components/content-styles/ContentStyle1V4Layers.tsx`

**Original:**
```typescript
import imgMaleDesigner from "figma:asset/1e2c0b75f3380f734d584408cd01b575701ebed4.png";
import imgFemaleDesigner from "figma:asset/39c384392b8924f5f2b6d757fe522edd04101ed2.png";
import imgMaleDesigner1 from "figma:asset/1e2c0b75f3380f734d584408cd01b575701ebed4.png";
```

**Replace with:**
```typescript
import imgMaleDesigner from "@/public/images/male-designer.png";
import imgFemaleDesigner from "@/public/images/female-designer.png";
import imgMaleDesigner1 from "@/public/images/male-designer.png";
```

### 3. `/components/content-styles/ContentStyle2V4Layers.tsx`

**Original:**
```typescript
import imgSoneiumLogo from "figma:asset/f46efe55dd65a91d4b7585ba69e8324dfa102a49.png";
```

**Replace with:**
```typescript
import imgSoneiumLogo from "@/public/images/soneium-logo.png";
```

### 4. `/components/content-styles/ContentStyle3V4Layers.tsx`

**Original:**
```typescript
import imgMaleDesigner from "figma:asset/b0eb03c8bf3a51ca66cc1b87518c081d760dae4f.png";
import imgFemaleDesigner from "figma:asset/88b7a9c7b89b680757a69a6111f92ad0051f123b.png";
import imgMaleDesigner1 from "figma:asset/b0eb03c8bf3a51ca66cc1b87518c081d760dae4f.png";
```

**Replace with:**
```typescript
import imgMaleDesigner from "@/public/images/style3-image1.png";
import imgFemaleDesigner from "@/public/images/style3-image2.png";
import imgMaleDesigner1 from "@/public/images/style3-image1.png";
```

### 5. `/components/content-styles/ContentStyle4V4Layers.tsx`

**Original:**
```typescript
import imgSingkarpor from "figma:asset/afc31b38da74d54c3e2154f43a91a43f67e29eca.png";
import imgFemaleDesigner1 from "figma:asset/9c0c5fa3a2dfdf99e27b6e7b40e3667d6f0c85f6.png";
```

**Replace with:**
```typescript
import imgSingkarpor from "@/public/images/singkarpor1.png";
import imgFemaleDesigner1 from "@/public/images/singkarpor2.png";
```

### 6. `/components/MobilePropertiesContent_NEW.tsx`

**Original:**
```typescript
import imgDefaultCoverHero from "figma:asset/931ef8e14bd8f3516acd9bea1676dbd4b8d4987d.png";
import imgDefaultBWHero from "figma:asset/34c2e0eace15e343a1c923bac054f892ff3c7f6f.png";
import imgDefaultCreatorSpotlightHero from "figma:asset/c5ce4e47ab90e08210a558deb1f6e4cba2392c2a.png";
import imgDefaultAnnouncementSecond from "figma:asset/36a8297e1a2ddc90473646931c66462380d62ee9.png";
```

**Replace with:**
```typescript
import imgDefaultCoverHero from "@/public/images/cover-hero-default.png";
import imgDefaultBWHero from "@/public/images/bw-hero.png";
import imgDefaultCreatorSpotlightHero from "@/public/images/creator-spotlight.png";
import imgDefaultAnnouncementSecond from "@/public/images/announcement.png";
```

### 7. `/components/ContentStyle1V4.tsx`

**Original:**
```typescript
import imgMaleDesigner1 from "figma:asset/b0eb03c8bf3a51ca66cc1b87518c081d760dae4f.png";
import imgFemaleDesigner1 from "figma:asset/88b7a9c7b89b680757a69a6111f92ad0051f123b.png";
```

**Replace with:**
```typescript
import imgMaleDesigner1 from "@/public/images/style3-image1.png";
import imgFemaleDesigner1 from "@/public/images/style3-image2.png";
```

### 8. `/components/ContentStyle4V4.tsx`

**Original:**
```typescript
import imgSingkarpor from "figma:asset/5a6d34f55aa6a2ffd4c21bc63ef106a349833da7.png";
import imgFemaleDesigner1 from "figma:asset/ffb8568917ac841308fb721014290304cb8f89b0.png";
import imgSingkarpor2 from "figma:asset/c79bba76c09347c9a0a4a11787908716f7527a3a.png";
```

**Replace with:**
```typescript
import imgSingkarpor from "@/public/images/singkarpor1.png";
import imgFemaleDesigner1 from "@/public/images/singkarpor2.png";
import imgSingkarpor2 from "@/public/images/singkarpor2.png";
```

### 9. Import Components (Various)

Files in `/imports/` directory also use figma:asset. Update similarly:

- `ContentStyle1-1-967.tsx`
- `ContentStyle1-2-254.tsx`
- `CoverThumbnailAnnouncement1.tsx`
- `CoverThumbnailCreatorSpotlight.tsx`
- `CoverThumbnailFeatureArticleBw.tsx`
- `CoverThumbnailFeatureArticleColour.tsx`
- `Frame1000003555.tsx`
- `Frame1000003555-198-158.tsx`

---

## Automated Search & Replace

You can use VS Code's "Find and Replace" feature:

### Find:
```regex
from "figma:asset/[a-f0-9]+\.png"
```

### Replace (manually based on context):
```typescript
from "@/public/images/[appropriate-name].png"
```

---

## Using Next.js Image Component (Optional)

For better performance, use Next.js `<Image>` component:

**Before:**
```typescript
<img src={imgCoverImage} alt="Cover" />
```

**After:**
```typescript
import Image from 'next/image';

<Image 
  src={imgCoverImage} 
  alt="Cover"
  width={1200}
  height={800}
  priority
/>
```

Benefits:
- Automatic image optimization
- Lazy loading
- Responsive images
- WebP conversion
- Blur placeholder

---

## Verification Checklist

After migration:

- [ ] All images placed in `/public/images/`
- [ ] All imports updated to use `@/public/images/`
- [ ] No `figma:asset` references remain (search project)
- [ ] TypeScript compiles: `npx tsc --noEmit`
- [ ] Dev server runs: `npm run dev`
- [ ] All images load in browser
- [ ] Build succeeds: `npm run build`

---

## Troubleshooting

### Images not loading after migration

1. Check file paths are correct:
   ```typescript
   // Good
   import img from "@/public/images/cover-hero.png";
   
   // Bad
   import img from "/public/images/cover-hero.png";
   import img from "public/images/cover-hero.png";
   import img from "../public/images/cover-hero.png";
   ```

2. Verify images exist in `/public/images/`

3. Check file names match exactly (case-sensitive)

4. Restart dev server

### TypeScript errors after migration

Run:
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Build fails

Check `next.config.js` doesn't have figma-specific webpack config.

Should be:
```javascript
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

---

## Summary

**Quick Migration (with placeholders):**
- ✅ Keep figma:asset imports as-is
- ✅ ImageWithFallback handles missing images
- ✅ Start developing immediately

**Full Migration (production-ready):**
1. Export images from Figma
2. Place in `/public/images/`
3. Update all imports
4. Test and verify

Choose based on your needs! 🎯

---

Version 4.0.0 - Image Asset Migration
Last Updated: February 10, 2026
