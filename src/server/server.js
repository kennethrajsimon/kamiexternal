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
    has_recommended_reading INTEGER DEFAULT 0
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

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Construct full URL
  const protocol = req.protocol;
  const host = req.get('host');
  const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
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
    hasRecommendedReading: !!r.has_recommended_reading
  }));
  res.json(result);
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
    hasRecommendedReading: !!row.has_recommended_reading
  };
  res.json(item);
});

app.post('/api/saved-pages', (req, res) => {
  const payload = req.body || {};
  const now = new Date().toISOString();
  const id = payload.id || String(Date.now());
  db.prepare(`
    INSERT INTO saved_pages (
      id, name, content_json, pages_json, styles_json, section_visibility_json, selected_style, current_page_index,
      cover_image, cover_data_json, is_published, saved_at, efx_mode,
      has_featured_products, has_recommended_reading
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      has_recommended_reading=excluded.has_recommended_reading
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
    payload.hasRecommendedReading ? 1 : 0
  );
  res.json({ ok: true, id });
});

app.delete('/api/saved-pages/:id', (req, res) => {
  db.prepare(`DELETE FROM saved_pages WHERE id = ?`).run(req.params.id);
  res.json({ ok: true });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`SQLite API server listening on http://localhost:${port}`);
});
