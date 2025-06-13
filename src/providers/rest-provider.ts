import { DataProvider } from "react-admin";
import { fetchUtils } from "ra-core";

export interface DataProviderWithCustomMethods extends DataProvider {
    lookupOne: (resource: string, params: {
        id: string;
        meta: { [key: string]: string | number | boolean; };
    }) => Promise<{
        data: { id: string;[key: string]: string | number | boolean | object | undefined };
    }>;
}

const restProvider = (apiUrl: string): DataProviderWithCustomMethods => ({
    lookupOne: async (resource, params) => {
        if (resource && params.meta) {
            const metaKeys = Object.keys(params.meta);
            let queryParams = "";
            if (metaKeys.length > 0) {
                queryParams = metaKeys
                    .filter(key => params.meta[key] !== "")
                    .map(key => `${key}=${encodeURIComponent(params.meta[key])}`).join("&");
            }
            let url = `${apiUrl}/api/searcher/${resource}`;
            if (queryParams) {
                url += `?${queryParams}`;
                const { json } = await fetchUtils.fetchJson(url);
                return Promise.resolve({
                    data: {
                        id: params.id || `${resource}-lookup`,
                        ...json
                    }
                });
            }
        }
        return Promise.reject(`no data found for resource: ${resource} with params: ${JSON.stringify(params)}`);
    },

    getOne: () => Promise.reject("Not implemented"),
    getList: () => Promise.reject("Not implemented"),
    getMany: () => Promise.reject("Not implemented"),
    getManyReference: () => Promise.reject("Not implemented"),
    create: () => Promise.reject("Not implemented"),
    update: () => Promise.reject("Not implemented"),
    updateMany: () => Promise.reject("Not implemented"),
    delete: () => Promise.reject("Not implemented"),
    deleteMany: () => Promise.reject("Not implemented"),

});

export default restProvider;