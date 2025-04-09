import { authHttpClient, coreServiceApiKey, coreServiceUrl } from './client';

export const findAggregatedSettings = async ( accountId: string ): Promise<any> => {
    try {
        const response = await authHttpClient(`${coreServiceUrl}/setup/settings/aggregated?accountId=${accountId}`, coreServiceApiKey);
        return response.json;
    } catch (error) {
        if (error instanceof Error) {
            return `${error.message}`;
        }
        return 'An unknown error occurred';
    }
};