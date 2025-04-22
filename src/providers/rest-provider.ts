import { DataProvider } from 'react-admin';
import { fetchUtils } from 'ra-core';

const restProvider = (apiUrl: string): DataProvider => ({
    // getOne: async (resource, params) => {
    //     // Consulta por email (customer-lookup)
    //     if (resource === "customer-lookup" && params.meta?.email) {
    //         const { json } = await fetchUtils.fetchJson(
    //             `${apiUrl}/api/validate?email=${encodeURIComponent(params.meta.email)}`
    //         );
            
    //         return {
    //             data: {
    //                 id: 'lookup-result',
    //                 ...json
    //             }
    //         };
    //     }
        
    //     // Consulta padrão (quando vem do Show)
    //     if (resource === "customer-lookup" && params.id) {
    //         // Se tiver dados no meta (pode vir do estado da navegação)
    //         if (params.meta?.customerData) {
    //             return {
    //                 data: {
    //                     id: params.id,
    //                     ...params.meta.customerData
    //                 }
    //             };
    //         }

    //         // throw new Error('Consulta de cliente requer parâmetro email ou dados pré-carregados');
            
    //         // // Ou faz uma nova consulta se necessário
    //         // const { json } = await fetchUtils.fetchJson(
    //         //     `${apiUrl}/customer-lookup/${params.id}`
    //         // );
            
    //         // return {
    //         //     data: {
    //         //         id: params.id,
    //         //         ...json
    //         //     }
    //         // };
    //     }

    //     throw new Error(`Método getOne não implementado para o recurso ${resource}`);
    // },
    getOne: async (resource, params) => {
        // Verifica se é o resource correto
        if (resource !== "customer-lookup") {
            throw new Error(`Método getOne não implementado para o recurso ${resource}`);
        }

        // Caso 1: Dados já estão disponíveis no meta (vindos da navegação)
        if (params.meta?.customerData) {
            return {
                data: {
                    id: params.id || 'lookup-result',
                    ...params.meta.customerData
                }
            };
        }

        // Caso 2: Consulta por email (fluxo inicial)
        if (params.meta?.email) {
            const { json } = await fetchUtils.fetchJson(
                `${apiUrl}/api/validate?email=${encodeURIComponent(params.meta.email)}`
            );
            
            return {
                data: {
                    id: 'lookup-result',
                    ...json
                }
            };
        }

        // Caso 3: Quando o React Admin faz chamada automática (sem meta)
        // Retorna um objeto vazio para evitar erros
        return {
            data: {
                id: params.id || 'lookup-result',
                // Campos mínimos esperados
                api4com: {},
                bigDataCorp: { Result: [{}] },
                omie: { clientes_cadastro: [{}] },
                asaas: {}
            }
        };
    },

    // Implementação mínima dos outros métodos necessários
    getList: (resource) => {
        if (resource === "customer-lookup") {
            return Promise.resolve({
                data: [],
                total: 0
            });
        }
        throw new Error(`Método getList não implementado para o recurso ${resource}`);
    },

    // Mantenha os outros métodos como estavam
    getMany: () => Promise.reject('Not implemented'),
    getManyReference: () => Promise.reject('Not implemented'),
    create: () => Promise.reject('Not implemented'),
    update: () => Promise.reject('Not implemented'),
    updateMany: () => Promise.reject('Not implemented'),
    delete: () => Promise.reject('Not implemented'),
    deleteMany: () => Promise.reject('Not implemented'),
});

export default restProvider;