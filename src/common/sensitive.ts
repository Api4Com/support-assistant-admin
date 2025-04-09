export const SENSITIVE_KEYS = ['password', 'apiKey', 'token', 'authHttpHeaderValue', 'api4comAccessToken'];

export const maskSensitiveData = (data: any): any => {
    const keysToMask: string[] = SENSITIVE_KEYS
    if (Array.isArray(data)) {
        return data.map((item) => maskSensitiveData(item));
    } else if (typeof data === 'object' && data !== null) {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
                key,
                keysToMask.includes(key) ? '***' : maskSensitiveData(value),
            ])
        );
    }
    return data;
};

