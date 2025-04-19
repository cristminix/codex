-- Initial migration for Codex app

-- Create users table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    marked_for_deletion INTEGER DEFAULT 0,
    verification_code TEXT,
    verification_code_expires_at TEXT,
    email_verified INTEGER DEFAULT 0 NOT NULL,
    oauth_provider TEXT,
    oauth_id TEXT
);
CREATE TABLE sessions (
     id TEXT PRIMARY KEY,
     user_id TEXT NOT NULL,
     "active_expires" TEXT NOT NULL,
     "idle_expires" TEXT NULL,
     "expires_at" INTEGER DEFAULT 0 NULL,
     FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE TABLE auth_keys (
   id TEXT PRIMARY KEY,
   user_id TEXT NOT NULL,
   hashed_password TEXT,
   provider_id TEXT,
   provider_user_id TEXT,
   FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create prompts table
CREATE TABLE prompts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT,
  content_preview TEXT NOT NULL,
  content_blob_key TEXT NOT NULL,
  is_public INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  tags TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create responses table
CREATE TABLE responses (
  id TEXT PRIMARY KEY,
  prompt_id TEXT NOT NULL,
  model_name TEXT NOT NULL,
  content_preview TEXT NOT NULL,
  content_blob_key TEXT NOT NULL,
  is_markdown INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (prompt_id) REFERENCES prompts(id)
);

-- Create indexes for common queries
CREATE INDEX idx_prompts_userId ON prompts(user_id);
CREATE INDEX idx_responses_promptId ON responses(prompt_id);

-- Index for faster lookups
CREATE INDEX idx_auth_keys_user_id ON auth_keys(user_id);
CREATE INDEX idx_auth_keys_provider ON auth_keys(provider_id, provider_user_id);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);