/// <reference types="vite/client" />
// define type for environment variable
interface ImportMetaEnv {
  readonly VITE_LEGACY_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
