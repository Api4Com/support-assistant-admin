import { fetchUtils } from 'ra-core';

export const authHttpClient = (url: string, apiKey: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('api-key', apiKey);
    return fetchUtils.fetchJson(url, options);
};

export const coreServiceUrl = import.meta.env.VITE_CORE_SERVICE_URL || 'http://localhost:3001';
export const billingServiceUrl = import.meta.env.VITE_BILLING_SERVICE_URL || 'http://localhost:3002';
export const interactionsServiceUrl = import.meta.env.VITE_INTERACTIONS_SERVICE_URL || 'http://localhost:3010';
export const connectorsServiceUrl = import.meta.env.VITE_CONNECTORS_SERVICE_URL || 'http://localhost:3011';
export const transcriptionsServiceUrl = import.meta.env.VITE_TRANSCRIPTIONS_SERVICE_URL || 'http://localhost:3020';
export const summariesServiceUrl = import.meta.env.VITE_SUMMARIES_SERVICE_URL || 'http://localhost:3021';

export const coreServiceApiKey = import.meta.env.VITE_CORE_SERVICE_API_KEY || 'local-docker';
export const billingServiceApiKey = import.meta.env.VITE_BILLING_SERVICE_API_KEY || 'local-docker';
export const interactionsServiceApiKey = import.meta.env.VITE_INTERACTIONS_SERVICE_API_KEY || 'local-docker';
export const connectorsServiceApiKey = import.meta.env.VITE_CONNECTORS_SERVICE_API_KEY || 'local-docker';
export const transcriptionsServiceApiKey = import.meta.env.VITE_TRANSCRIPTIONS_SERVICE_API_KEY || 'local-docker';
export const summariesServiceApiKey = import.meta.env.VITE_SUMMARIES_SERVICE_API_KEY || 'local-docker';