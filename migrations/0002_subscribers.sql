-- Subscribers table for email signups (newsletter / digest).
-- Applied via: wrangler d1 execute aipedia-reviews --file=./migrations/0002_subscribers.sql

CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  ip_hash TEXT,
  source TEXT,
  confirmed INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  confirmed_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email
  ON subscribers (email);

CREATE INDEX IF NOT EXISTS idx_subscribers_confirmed
  ON subscribers (confirmed, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_subscribers_ip_recent
  ON subscribers (ip_hash, created_at);
