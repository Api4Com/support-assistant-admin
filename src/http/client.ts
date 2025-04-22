import { fetchUtils } from 'ra-core';

export const authHttpClient = (url: string, apiKey: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('api-key', apiKey);
    return fetchUtils.fetchJson(url, options);
};

export const supportAssistantApiUrl = import.meta.env.SUPPORT_ASSISTANT_API_URL || 'http://localhost:3000'