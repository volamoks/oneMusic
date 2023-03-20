interface ImportMetaEnv {
    VITE_CLIENT_ID: string;
    VITE_REDIRECT_URI: string;
    VITE_SCOPES: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
