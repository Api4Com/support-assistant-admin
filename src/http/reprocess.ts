import { authHttpClient, connectorsServiceApiKey, connectorsServiceUrl, interactionsServiceApiKey, interactionsServiceUrl, summariesServiceApiKey, summariesServiceUrl, transcriptionsServiceApiKey, transcriptionsServiceUrl } from './client';

export const activityRePublish = async (publicId: string): Promise<any> => {
    const response = await authHttpClient(`${interactionsServiceUrl}/reprocess/activities/${publicId}/publish`, interactionsServiceApiKey, {
        method: 'POST',
    });
    return response.json;
};

export const rawInputReProcess = async (publicId: string, createNewDigitalInteraction: boolean = false): Promise<any> => {
    const response = await authHttpClient(`${connectorsServiceUrl}/reprocess/inputs/${publicId}?createNewDigitalInteraction=${createNewDigitalInteraction}`, connectorsServiceApiKey, {
        method: 'POST',
    });
    return response.json;
};

export const rawOutputReProcess = async (publicId: string): Promise<any> => {
    const response = await authHttpClient(`${connectorsServiceUrl}/reprocess/outputs/${publicId}`, connectorsServiceApiKey,{
        method: 'POST',
    });
    return response.json;
};

export const rawOutputReForward = async (publicId: string): Promise<any> => {
    const response = await authHttpClient(`${connectorsServiceUrl}/reprocess/outputs/${publicId}/forward`, connectorsServiceApiKey, {
        method: 'POST',
    });
    return response.json;
};

export const transcriptionReProcess = async (publicId: string): Promise<any> => {
    const response = await authHttpClient(`${transcriptionsServiceUrl}/reprocess/${publicId}`, transcriptionsServiceApiKey, {
        method: 'POST',
    });
    return response.json;
};

export const transcriptionReForward = async (publicId: string): Promise<any> => {
    const response = await authHttpClient(`${transcriptionsServiceUrl}/reprocess/${publicId}/forward`, transcriptionsServiceApiKey,{
        method: 'POST',
    });
    return response.json;
};

export const summaryReProcess = async (publicId: string): Promise<any> => {
    const response = await authHttpClient(`${summariesServiceUrl}/reprocess/${publicId}`, summariesServiceApiKey, {
        method: 'POST',
    });
    return response.json;
};

export const summaryReForward = async (publicId: string): Promise<any> => {
    const response = await authHttpClient(`${summariesServiceUrl}/reprocess/${publicId}/forward`, summariesServiceApiKey,{
        method: 'POST',
    });
    return response.json;
};