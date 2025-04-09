import { stringify } from 'query-string';
import { DataProvider } from 'ra-core';
import { authHttpClient } from '../http/client';

const getRoute = (resource: string, mapRoute: Map<string, string>) => {
    const route = mapRoute.get(resource);
    if (!route) {
        return resource;
    }
    return route;
};

export default (
    apiUrl: string,
    apiKey: string,
    httpClient = authHttpClient,
    countHeader: string = 'Content-Range',
    mapRoute: Map<string, string> = new Map(),
): DataProvider => ({
    getList: (resource, params) => {
        const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
        const { field, order } = params.sort || { field: 'id', order: 'ASC' };

        const rangeStart = (page - 1) * perPage;
        const rangeEnd = page * perPage;

        const query = {
            sort: JSON.stringify([field, order]),
            offset: JSON.stringify(rangeStart),
            limit: JSON.stringify(rangeEnd),
            ...params.filter,
        };
        const url = `${apiUrl}/${getRoute(resource,mapRoute)}?${stringify(query)}`;
        const options =
            countHeader === 'Content-Range'
                ? {
                      // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
                      headers: new Headers({
                          Range: `${resource}=${rangeStart}-${rangeEnd}`,
                      }),
                      signal: params?.signal,
                  }
                : { signal: params?.signal };

        return httpClient(url, apiKey, options).then(({ headers, json }) => {
            if (!headers.has(countHeader)) {
                throw new Error(
                    `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
                );
            }
            return {
                data: json,
                total:
                    countHeader === 'Content-Range'
                        ? parseInt(
                              headers.get('content-range')!.split('/').pop() ||
                                  '',
                              10
                          )
                        : parseInt(headers.get(countHeader.toLowerCase())!),
            };
        });
    },

    getOne: (resource, params) => {
        let query = {}
        let extraPath = '';
        if (params.meta?.queryParams) {
            query = { ...params.meta.queryParams };
        }
        if (params.meta?.extraPath) {
            extraPath = `${params.meta.extraPath}/`;
        }
        
        return httpClient(`${apiUrl}/${getRoute(resource,mapRoute)}/${extraPath}${encodeURIComponent(params.id)}?${stringify(query)}`, apiKey, {
            signal: params?.signal,
        }).then(({ json }) => ({
            data: json,
        }))
    },

    getMany: (resource, params) => {        
        if (params.ids && params.ids.length === 1) {
            let query = {}
            let extraPath = '';
            if (params.meta?.queryParams) {
                query = { ...params.meta.queryParams };
            }
            if (params.meta?.extraPath) {
                extraPath = `${params.meta.extraPath}/`;
            }            

            return httpClient(`${apiUrl}/${getRoute(resource,mapRoute)}/${extraPath}${encodeURIComponent(params.ids[0])}?${stringify(query)}`, apiKey, {
                signal: params?.signal,
            }).then(({ json }) => ({
                data: [json],
            }));
        }
        let query = {
            ids: params.ids,
        };
        if (params.meta?.queryParams) {
            query = { 
                ids: params.ids,
                ...params.meta.queryParams 
            };
        }
        const url = `${apiUrl}/${getRoute(resource,mapRoute)}?${stringify(query)}`;
        return httpClient(url, apiKey, { signal: params?.signal }).then(({ json }) => ({
            data: json,
        }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const rangeStart = (page - 1) * perPage;
        const rangeEnd = page * perPage;

        const query = {
            sort: JSON.stringify([field, order]),
            offset: JSON.stringify(rangeStart),
            limit: JSON.stringify(rangeEnd),
            ...params.filter,
            [params.target]: params.id,
        };
        const url = `${apiUrl}/${getRoute(resource,mapRoute)}?${stringify(query)}`;
        const options =
            countHeader === 'Content-Range'
                ? {
                      // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
                      headers: new Headers({
                          Range: `${resource}=${rangeStart}-${rangeEnd}`,
                      }),
                      signal: params?.signal,
                  }
                : { signal: params?.signal };

        return httpClient(url, apiKey, options).then(({ headers, json }) => {
            if (!headers.has(countHeader)) {
                throw new Error(
                    `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
                );
            }
            return {
                data: json,
                total:
                    countHeader === 'Content-Range'
                        ? parseInt(
                              headers.get('content-range')!.split('/').pop() ||
                                  '',
                              10
                          )
                        : parseInt(headers.get(countHeader.toLowerCase())!),
            };
        });
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${encodeURIComponent(params.id)}`, apiKey, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
    updateMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${encodeURIComponent(id)}`, apiKey, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                })
            )
        ).then(responses => ({
            data: responses.map(({ json }) => json.id),
        })),

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, apiKey, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${encodeURIComponent(params.id)}`, apiKey, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'text/plain',
            }),
        }).then(({ json }) => ({ data: json })),

    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${encodeURIComponent(id)}`, apiKey, {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-Type': 'text/plain',
                    }),
                })
            )
        ).then(responses => ({
            data: responses.map(({ json }) => json.id),
        })),
});