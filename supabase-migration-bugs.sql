-- Bug reports table v2
-- Run this in the Supabase SQL editor
-- If you already created the old table, drop it first:
-- DROP TABLE IF EXISTS bug_reports;

CREATE TABLE bug_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  lesson_id TEXT,
  exercise_id TEXT,
  exercise_type TEXT,
  exercise_number INTEGER,
  exercise_content TEXT,
  message TEXT NOT NULL,
  user_agent TEXT,
  url TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit bug reports"
  ON bug_reports FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read own bug reports"
  ON bug_reports FOR SELECT
  USING (auth.uid() = user_id);
