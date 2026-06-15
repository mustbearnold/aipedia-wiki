-- Reviews table for user-submitted tool reviews.
-- Apply to the Vercel/Neon database with:
-- npm run db:migrate -- --apply --env .env.local

CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  tool_slug TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email_hash TEXT,
  ip_hash TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  approved INTEGER NOT NULL DEFAULT 0,
  approved_at TIMESTAMPTZ,
  spam_score DOUBLE PRECISION NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_reviews_tool_approved
  ON reviews (tool_slug, approved, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_reviews_pending
  ON reviews (approved, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_reviews_ip_recent
  ON reviews (ip_hash, created_at);
