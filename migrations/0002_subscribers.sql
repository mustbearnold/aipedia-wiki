-- Subscribers table for email signups (newsletter / digest).
-- Apply to the Vercel/Neon database with:
-- npm run db:migrate -- --apply --env .env.local

CREATE TABLE IF NOT EXISTS subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  ip_hash TEXT,
  source TEXT DEFAULT 'unknown',
  confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email
  ON subscribers (email);

CREATE INDEX IF NOT EXISTS idx_subscribers_confirmed
  ON subscribers (confirmed, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_subscribers_ip_recent
  ON subscribers (ip_hash, created_at);
