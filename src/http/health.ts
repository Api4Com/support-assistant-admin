import { authHttpClient, billingServiceApiKey, billingServiceUrl, connectorsServiceApiKey, connectorsServiceUrl, coreServiceApiKey, coreServiceUrl, interactionsServiceApiKey, interactionsServiceUrl, summariesServiceApiKey, summariesServiceUrl, transcriptionsServiceApiKey, transcriptionsServiceUrl } from './client';

const services = [
    { name: 'Core', url: coreServiceUrl, apiKey: coreServiceApiKey },
    { name: 'Billing', url: billingServiceUrl, apiKey: billingServiceApiKey },
    { name: 'Interactions', url: interactionsServiceUrl, apiKey: interactionsServiceApiKey },
    { name: 'Connectors', url: connectorsServiceUrl, apiKey: connectorsServiceApiKey },
    { name: 'Transcriptions', url: transcriptionsServiceUrl, apiKey: transcriptionsServiceApiKey },
    { name: 'Summaries', url: summariesServiceUrl, apiKey: summariesServiceApiKey },
];

const healthCheck = async ( url: string, apiKey: string ): Promise<any> => {
    try {
        const response = await authHttpClient(`${url}/health`, apiKey);
        return response.json;
    } catch (error) {
        return {}
    }
};

const rootCheck = async ( url: string, apiKey: string ): Promise<any> => {
    try {
        const response = await authHttpClient(`${url}/`, apiKey);
        return response.body;
    } catch (error) {
        return error instanceof Error ? `${error.message}` : 'Unknown error';
    }
};

export const checkServices = async (): Promise<{ name: string; health: any; root: any; }[]> => {
    const servicesCheckeds = [];

    for (const service of services) {        
        const rootResponse = await rootCheck(service.url, service.apiKey);
        const healthResponse = await healthCheck(service.url, service.apiKey);
        servicesCheckeds.push(
            { name: service.name, health: healthResponse, root: rootResponse },
        );        
    }

    return servicesCheckeds;
}