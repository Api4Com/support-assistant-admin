import { fetchUtils, Options } from "ra-core";

export const authHttpClient = (url: string, apiKey: string, options: Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    } else if (!(options.headers instanceof Headers)) {
        options.headers = new Headers(options.headers as HeadersInit);
    }
    (options.headers as Headers).set("api-key", apiKey);
    return fetchUtils.fetchJson(url, options);
};

export const supportAssistantApiUrl = import.meta.env.VITE_SUPPORT_ASSISTANT_API_URL || "http://localhost:3000"
