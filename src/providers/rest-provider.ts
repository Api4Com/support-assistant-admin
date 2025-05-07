import { DataProvider } from 'react-admin';
import { fetchUtils } from 'ra-core';

const restProvider = (apiUrl: string): DataProvider => ({
    getOne: async (resource, params) => {
        switch (resource) {
            case "customer-lookup":
                if (params.meta?.email) {
                    const { json } = await fetchUtils.fetchJson(
                        `${apiUrl}/api/validate?email=${encodeURIComponent(params.meta.email)}`
                    );
                    return {
                        data: {
                            id: 'lookup-email-result',
                            ...json
                        }
                    };
                }
                if (params.meta?.document) {
                    const { json } = await fetchUtils.fetchJson(
                        `${apiUrl}/api/validate?document=${encodeURIComponent(params.meta.document)}`
                    );
                    return {
                        data: {
                            id: 'lookup-document-result',
                            ...json
                        }
                    };
                }
                break;

            case "big-data-corp":
                if (params.meta?.document) {
                    const { json } = await fetchUtils.fetchJson(
                        `${apiUrl}/api/big-data-corp?document=${encodeURIComponent(params.meta.document)}`
                    );
                    return {
                        data: {
                            id: 'bigdatacorp-result',
                            ...json
                        }
                    };
                }
                break;
        }
        if (params.meta?.customerData) {
            return {
                data: {
                    id: params.id || 'lookup-email-result',
                    ...params.meta.customerData
                }
            };
        }

        if (params.meta?.documentData) {
            return {
                data: {
                    id: params.id || 'lookup-document-result',
                    ...params.meta.documentData
                }
            };
        }

        if (params.meta?.bigDataCorpData) {
            return {
                data: {
                    id: params.id || 'bigdatacorp-result',
                    ...params.meta.bigDataCorpData
                }
            };
        }


        const emptyData = {
            id: params.id || 'default-result',
            ...(resource === 'customer-lookup' && {
                api4com: {},
                bigDataCorp: { Result: [{}] },
                omie: { clientes_cadastro: [{}] },
                asaas: {}
            }),
            ...(resource === 'big-data-corp' && {
                Result: [{
                    RegistrationData: {
                        BasicData: {},
                        Addresses: { Primary: {} },
                        Phones: { Primary: {} }
                    }
                }]
            })
        };

        return { data: emptyData };
    },

    getList: (resource) => {
        switch (resource) {
            case "customer-lookup":
            case "big-data-corp":
                return Promise.resolve({
                    data: [],
                    total: 0
                });
            default:
                throw new Error(`Método getList não implementado para o recurso ${resource}`);
        }
    },
    create: async (resource, params) => {
        switch (resource) {
            case "cpf-without-address":
                try {
                    const { json } = await fetchUtils.fetchJson(`${apiUrl}/api/cpf-without-address`, {
                        method: 'POST',
                        body: JSON.stringify(params.data),
                        headers: new Headers({
                            'Content-Type': 'application/json',
                        }),
                    });

                    if (!json.success) {
                        throw new Error(json.message || 'Erro ao cadastrar CPF sem endereço');
                    }

                    return {
                        data: {
                            id: json.data?.id || 'cpf-without-address-result',
                            ...json
                        }
                    };
                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error(`Erro na requisição: ${error.message}`);
                    }
                    throw new Error('Erro desconhecido ao cadastrar CPF sem endereço');
                }

            default:
                throw new Error(`Método create não implementado para o recurso ${resource}`);
        }
    },
    getMany: () => Promise.reject('Not implemented'),
    getManyReference: () => Promise.reject('Not implemented'),
    update: () => Promise.reject('Not implemented'),
    updateMany: () => Promise.reject('Not implemented'),
    delete: () => Promise.reject('Not implemented'),
    deleteMany: () => Promise.reject('Not implemented'),
});

export default restProvider;