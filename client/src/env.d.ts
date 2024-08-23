/// <reference types="vite/client" />
// define type for environment variable
interface ImportMetaEnv {
  readonly TEST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
