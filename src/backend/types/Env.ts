import { D1Database } from '@cloudflare/workers-types';
  
  /**
   * Define the environment bindings expected by the Worker.
   * Add specific types for KV, R2, D1, Services, Secrets etc. as needed.
   * Example: DB: D1Database; MY_KV: KVNamespace; SECRET_KEY: string;
   */
  export interface Env {
    ENVIRONMENT?: 'development' | 'production' | 'staging';
    // This binding is used for Pages Functions or specific service bindings.
    // If using standard Workers KV/R2 assets, this might be different
    // (e.g., __STATIC_CONTENT: KVNamespace for KV assets).
    ASSETS?: { fetch: (request: Request) => Promise<Response> };
    DB: D1Database; // Placeholder: Replace with D1Database if using D1
    AUTH_STORE?: unknown; // Placeholder: Replace if using a specific binding (e.g., KVNamespace)
    // Add other expected environment variables and bindings here
    AUTH_SECRET?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    ALLOWED_ORIGINS?: string;
    [key: string]: unknown; // Allows for flexibility but specific types are preferred
  }