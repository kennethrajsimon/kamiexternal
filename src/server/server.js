const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

const dbPath = path.join(__dirname, 'app.sqlite');
const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS saved_pages (
    id TEXT PRIMARY KEY,
    name TEXT,
    content_json TEXT,
    pages_json TEXT,
    styles_json TEXT,
    section_visibility_json TEXT,
    selected_style TEXT,
    current_page_index INTEGER,
    cover_image TEXT,
    cover_data_json TEXT,
    is_published INTEGER DEFAULT 0,
    saved_at TEXT,
    efx_mode TEXT,
    has_featured_products INTEGER DEFAULT 1,
    has_recommended_reading INTEGER DEFAULT 0,
    product_set_id TEXT
  )
`).run();

const existingColumns = db.prepare(`PRAGMA table_info(saved_pages)`).all().map((c) => c.name);
const addColumnIfMissing = (name, type) => {
  if (!existingColumns.includes(name)) {
    db.prepare(`ALTER TABLE saved_pages ADD COLUMN ${name} ${type}`).run();
  }
};
addColumnIfMissing('section_visibility_json', 'TEXT');
addColumnIfMissing('selected_style', 'TEXT');
addColumnIfMissing('has_featured_products', 'INTEGER DEFAULT 1');
addColumnIfMissing('has_recommended_reading', 'INTEGER DEFAULT 0');
addColumnIfMissing('product_set_id', 'TEXT');
addColumnIfMissing('likes', 'INTEGER DEFAULT 0');
addColumnIfMissing('shares', 'INTEGER DEFAULT 0');

db.prepare(`
  CREATE TABLE IF NOT EXISTS product_sets (
    id TEXT PRIMARY KEY,
    name TEXT,
    products_json TEXT,
    created_at TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS recommended_article_sets (
    id TEXT PRIMARY KEY,
    name TEXT,
    article_ids_json TEXT,
    created_at TEXT,
    is_active INTEGER DEFAULT 0
  )
`).run();

const existingRecommendedColumns = db
  .prepare(`PRAGMA table_info(recommended_article_sets)`)
  .all()
  .map((c) => c.name);
const addRecommendedColumnIfMissing = (name, type) => {
  if (!existingRecommendedColumns.includes(name)) {
    db.prepare(`ALTER TABLE recommended_article_sets ADD COLUMN ${name} ${type}`).run();
  }
};
addRecommendedColumnIfMissing('is_active', 'INTEGER DEFAULT 0');

app.get('/api/product-sets', (req, res) => {
  const rows = db.prepare('SELECT * FROM product_sets ORDER BY created_at DESC').all();
  const sets = rows.map(r => ({
    id: r.id,
    name: r.name,
    products: JSON.parse(r.products_json),
    createdAt: r.created_at
  }));
  res.json(sets);
});

app.post('/api/product-sets', (req, res) => {
  const { id, name, products, createdAt } = req.body;
  
  // Check if exists
  const existing = db.prepare('SELECT id FROM product_sets WHERE id = ?').get(id);
  
  if (existing) {
    const stmt = db.prepare(`
      UPDATE product_sets
      SET name = ?, products_json = ?
      WHERE id = ?
    `);
    stmt.run(name, JSON.stringify(products), id);
  } else {
    const stmt = db.prepare(`
      INSERT INTO product_sets (id, name, products_json, created_at)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(id, name, JSON.stringify(products), createdAt || new Date().toISOString());
  }
  
  res.json({ success: true, id });
});

app.delete('/api/product-sets/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM product_sets WHERE id = ?').run(id);
  res.json({ success: true });
});

app.get('/api/recommended-article-sets', (req, res) => {
  const rows = db.prepare('SELECT * FROM recommended_article_sets ORDER BY created_at DESC').all();
  const sets = rows.map(r => ({
    id: r.id,
    name: r.name,
    articleIds: r.article_ids_json ? JSON.parse(r.article_ids_json) : [],
    createdAt: r.created_at,
    isActive: !!r.is_active
  }));
  res.json(sets);
});

app.post('/api/recommended-article-sets', (req, res) => {
  const { id, name, articleIds, createdAt, isActive } = req.body;
  const existing = db.prepare('SELECT id FROM recommended_article_sets WHERE id = ?').get(id);
  if (isActive) {
    db.prepare('UPDATE recommended_article_sets SET is_active = 0').run();
  }
  if (existing) {
    const stmt = db.prepare(`
      UPDATE recommended_article_sets
      SET name = ?, article_ids_json = ?, is_active = ?
      WHERE id = ?
    `);
    stmt.run(name, JSON.stringify(articleIds || []), isActive ? 1 : 0, id);
  } else {
    const stmt = db.prepare(`
      INSERT INTO recommended_article_sets (id, name, article_ids_json, created_at, is_active)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(id, name, JSON.stringify(articleIds || []), createdAt || new Date().toISOString(), isActive ? 1 : 0);
  }
  res.json({ success: true, id });
});

app.post('/api/recommended-article-sets/:id/active', (req, res) => {
  const { id } = req.params;
  const existing = db.prepare('SELECT id FROM recommended_article_sets WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'Set not found' });
  }
  db.prepare('UPDATE recommended_article_sets SET is_active = 0').run();
  db.prepare('UPDATE recommended_article_sets SET is_active = 1 WHERE id = ?').run(id);
  res.json({ success: true, id });
});

app.delete('/api/recommended-article-sets/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM recommended_article_sets WHERE id = ?').run(id);
  res.json({ success: true });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Return relative URL
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

app.get('/api/saved-pages', (req, res) => {
  const rows = db.prepare(`SELECT * FROM saved_pages ORDER BY saved_at DESC`).all();
  const result = rows.map(r => ({
    id: r.id,
    name: r.name,
    content: JSON.parse(r.content_json),
    pages: JSON.parse(r.pages_json),
    styles: JSON.parse(r.styles_json),
    sectionVisibility: r.section_visibility_json ? JSON.parse(r.section_visibility_json) : {},
    selectedStyle: r.selected_style ?? null,
    currentPageIndex: r.current_page_index,
    coverImage: r.cover_image,
    coverData: r.cover_data_json ? JSON.parse(r.cover_data_json) : null,
    isPublished: !!r.is_published,
    savedAt: r.saved_at,
    efxMode: r.efx_mode,
    hasFeaturedProducts: !!r.has_featured_products,
    productSetId: r.product_set_id,
    hasRecommendedReading: !!r.has_recommended_reading,
    likes: r.likes || 0,
    shares: r.shares || 0
  }));
  res.json(result);
});

app.post('/api/pages/:id/like', (req, res) => {
  const { id } = req.params;
  try {
    const info = db.prepare('UPDATE saved_pages SET likes = likes + 1 WHERE id = ?').run(id);
    if (info.changes === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }
    const row = db.prepare('SELECT likes FROM saved_pages WHERE id = ?').get(id);
    res.json({ likes: row.likes });
  } catch (error) {
    console.error('Error updating likes:', error);
    res.status(500).json({ error: 'Failed to update likes' });
  }
});

app.post('/api/pages/:id/share', (req, res) => {
  const { id } = req.params;
  try {
    const info = db.prepare('UPDATE saved_pages SET shares = shares + 1 WHERE id = ?').run(id);
    if (info.changes === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }
    const row = db.prepare('SELECT shares FROM saved_pages WHERE id = ?').get(id);
    res.json({ shares: row.shares });
  } catch (error) {
    console.error('Error updating shares:', error);
    res.status(500).json({ error: 'Failed to update shares' });
  }
});

app.get('/api/saved-pages/:id', (req, res) => {
  const row = db.prepare(`SELECT * FROM saved_pages WHERE id = ?`).get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  const item = {
    id: row.id,
    name: row.name,
    content: JSON.parse(row.content_json),
    pages: JSON.parse(row.pages_json),
    styles: JSON.parse(row.styles_json),
    sectionVisibility: row.section_visibility_json ? JSON.parse(row.section_visibility_json) : {},
    selectedStyle: row.selected_style ?? null,
    currentPageIndex: row.current_page_index,
    coverImage: row.cover_image,
    coverData: row.cover_data_json ? JSON.parse(row.cover_data_json) : null,
    isPublished: !!row.is_published,
    savedAt: row.saved_at,
    efxMode: row.efx_mode,
    hasFeaturedProducts: !!row.has_featured_products,
    productSetId: row.product_set_id,
    hasRecommendedReading: !!row.has_recommended_reading
  };
  res.json(item);
});

app.post('/api/saved-pages', (req, res) => {
  const payload = req.body || {};
  const now = new Date().toISOString();
  const id = payload.id || String(Date.now());

  // Helper: collect all uploaded image URLs from a saved page record
  const collectImageUrls = (record) => {
    const urls = new Set();
    const addUrl = (url) => {
      if (url && typeof url === 'string' && url.includes('/uploads/')) urls.add(url);
    };
    addUrl(record.cover_image);
    if (record.cover_data_json) {
      try {
        const cd = JSON.parse(record.cover_data_json);
        addUrl(cd.heroImage); addUrl(cd.heroImage2); addUrl(cd.backgroundImage);
      } catch (e) { }
    }
    if (record.pages_json) {
      try {
        const pages = JSON.parse(record.pages_json);
        if (Array.isArray(pages)) pages.forEach(p => {
          if (p.images) Object.values(p.images).forEach(v => addUrl(v));
        });
      } catch (e) { }
    }
    return urls;
  };

  // Collect old image URLs before updating
  const existing = db.prepare('SELECT * FROM saved_pages WHERE id = ?').get(id);
  const oldUrls = existing ? collectImageUrls(existing) : new Set();

  db.prepare(`
    INSERT INTO saved_pages (
      id, name, content_json, pages_json, styles_json, section_visibility_json, selected_style, current_page_index,
      cover_image, cover_data_json, is_published, saved_at, efx_mode,
      has_featured_products, has_recommended_reading, product_set_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name=excluded.name,
      content_json=excluded.content_json,
      pages_json=excluded.pages_json,
      styles_json=excluded.styles_json,
      section_visibility_json=excluded.section_visibility_json,
      selected_style=excluded.selected_style,
      current_page_index=excluded.current_page_index,
      cover_image=excluded.cover_image,
      cover_data_json=excluded.cover_data_json,
      is_published=excluded.is_published,
      saved_at=excluded.saved_at,
      efx_mode=excluded.efx_mode,
      has_featured_products=excluded.has_featured_products,
      has_recommended_reading=excluded.has_recommended_reading,
      product_set_id=excluded.product_set_id
  `).run(
    id,
    payload.name || 'Untitled',
    JSON.stringify(payload.content || {}),
    JSON.stringify(payload.pages || []),
    JSON.stringify(payload.styles || {}),
    JSON.stringify(payload.sectionVisibility || {}),
    payload.selectedStyle || null,
    payload.currentPageIndex ?? 0,
    payload.coverImage || null,
    payload.coverData ? JSON.stringify(payload.coverData) : null,
    payload.isPublished ? 1 : 0,
    payload.savedAt || now,
    payload.efxMode || 'none',
    payload.hasFeaturedProducts ? 1 : 0,
    payload.hasRecommendedReading ? 1 : 0,
    payload.productSetId || null
  );

  // Delete orphaned image files (old images no longer in the new payload)
  if (oldUrls.size > 0) {
    const updated = db.prepare('SELECT * FROM saved_pages WHERE id = ?').get(id);
    const newUrls = updated ? collectImageUrls(updated) : new Set();
    oldUrls.forEach(url => {
      if (!newUrls.has(url)) {
        const filename = url.split('/uploads/').pop();
        if (filename) {
          const filePath = path.join(uploadsDir, filename);
          if (fs.existsSync(filePath)) {
            try {
              fs.unlinkSync(filePath);
              console.log(`Cleaned up replaced image: ${filename}`);
            } catch (err) {
              console.error(`Failed to delete replaced image ${filename}:`, err);
            }
          }
        }
      }
    });
  }

  res.json({ ok: true, id });
});

app.delete('/api/saved-pages/:id', (req, res) => {
  try {
    // Get the page data first to find associated images
    const page = db.prepare('SELECT * FROM saved_pages WHERE id = ?').get(req.params.id);

    if (page) {
      const imagesToDelete = new Set();

      // Helper to add image path to delete set
      const addImage = (url) => {
        if (!url || typeof url !== 'string') return;
        // Check if it's an uploaded file (contains /uploads/)
        if (url.includes('/uploads/')) {
          const filename = url.split('/uploads/').pop();
          if (filename) {
            imagesToDelete.add(filename);
          }
        }
      };

      // 1. Check cover image
      addImage(page.cover_image);

      // 2. Check cover data
      if (page.cover_data_json) {
        try {
          const coverData = JSON.parse(page.cover_data_json);
          addImage(coverData.heroImage);
          addImage(coverData.heroImage2);
          addImage(coverData.backgroundImage);
        } catch (e) {
          console.error('Error parsing cover_data_json:', e);
        }
      }

      // 3. Check pages content
      if (page.pages_json) {
        try {
          const pages = JSON.parse(page.pages_json);
          if (Array.isArray(pages)) {
            pages.forEach(p => {
              if (p.images) {
                Object.values(p.images).forEach(imgUrl => addImage(imgUrl));
              }
            });
          }
        } catch (e) {
          console.error('Error parsing pages_json:', e);
        }
      }

      // Delete the files
      console.log(`Deleting ${imagesToDelete.size} images for page ${req.params.id}`);
      imagesToDelete.forEach(filename => {
        const filePath = path.join(uploadsDir, filename);
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
            console.log(`Deleted file: ${filename}`);
          } catch (err) {
            console.error(`Failed to delete file ${filename}:`, err);
          }
        }
      });
    }

    // Delete the database record
    db.prepare(`DELETE FROM saved_pages WHERE id = ?`).run(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ error: 'Failed to delete page' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`SQLite API server listening on http://localhost:${port}`);
});
