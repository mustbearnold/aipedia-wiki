-- Reviews table for user-submitted tool reviews.
-- Applied via: wrangler d1 execute aipedia-reviews --file=./migrations/0001_reviews.sql

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool_slug TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email_hash TEXT,
  ip_hash TEXT,
  user_agent TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  approved INTEGER NOT NULL DEFAULT 0,
  approved_at INTEGER,
  spam_score REAL NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_reviews_tool_approved
  ON reviews (tool_slug, approved, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_reviews_pending
  ON reviews (approved, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_reviews_ip_recent
  ON reviews (ip_hash, created_at);
