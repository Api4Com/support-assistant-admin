import restProvider from '../rest-provider'

describe('restProvider', () => {
  const apiUrl = 'http://localhost:3000'
  const provider = restProvider(apiUrl)

  beforeAll(() => {
    global.fetch = jest.fn()
  })

  it('should return complete response for email validation', async () => {
    const mockData = {
        api4com: {
            domain: "teste.api4com.com",
            cpfCnpj: "12345678900",
            receivedBonusCredit: "true",
            needPrepaymentInvoice: "false",
            financialMails: "teste@api4com.com",
            statusAsaas: "ACTIVE",
            organizationId: 1,
            usedInOtherOrganizations: [
                {
                    id: 10,
                    domain: "testeUsedMock.api4com.com",
                    name: "Conta para Testes",
                    email: "testeUsedMock@gmail.com",
                    phone: "48999999999",
                    created_at: "2019-04-22T19:55:06.000Z",
                    updated_at: "2023-06-20T02:39:09.349Z",
                    uuid: "cd72e4d1-804c-5397-8bb7-4d6ddc539bf7",
                    is_unlimited: false
                }
            ]
        },
        omie: {
            clientes_cadastro: [
                {
                    email: "teste@api4com.com"
                }
            ]
        },
        asaas: {
            email: "teste@api4com.com"
        }
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData),
        text: () => Promise.resolve(JSON.stringify(mockData)),
    });

    const result = await provider.getOne('customer-lookup', {
        id: 'lookup-email-result',
        meta: {
            email: 'leonardo.caon@api4com.com',
        },
    });

    expect(result.data).toEqual({
        id: 'lookup-email-result',
        ...mockData
    });

    expect(result.data.api4com).toBeDefined();
    expect(result.data.omie).toBeDefined();
    expect(result.data.asaas).toBeDefined();
});

  it('should return valid response for document validation', async () => {
    const mockData = {
        usedInOtherOrganizations: [
            {
                id: 10,
                domain: "mock.api4com.com",
                name: "Conta para Testes",
                email: "test@example.com",
                phone: "48999999999",
                created_at: "2019-04-22T19:55:06.000Z",
                updated_at: "2023-06-20T02:39:09.349Z",
                uuid: "cd72e4d1-804c-5397-8bb7-4d6ddc539bf7",
                is_unlimited: false,
            }
        ]
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData),
        text: () => Promise.resolve(JSON.stringify(mockData)),
    });

    const result = await provider.getOne('customer-lookup', {
        id: 'lookup-document-result',
        meta: {
            document: '12345678900',
        },
    });

    expect(result.data).toEqual({
        id: 'lookup-document-result',
        ...mockData
    });
  });

  it('should return empty data structure when no meta is provided', async () => {
    const result = await provider.getOne('customer-lookup', { id: 'default-result' })

    expect(result.data).toEqual({
      id: 'default-result',
      api4com: {},
      bigDataCorp: { Result: [{}] },
      omie: { clientes_cadastro: [{}] },
      asaas: {},
    });
  });

  it('should return valid response for BigDataCorp document validation', async () => {
    const mockData = {
        Result: [
            {
                RegistrationData: {
                    BasicData: {
                        TaxIdNumber: "12345678900",
                        Name: "FULANO DA SILVA",
                        BirthDate: "1980-01-01",
                        DeathDate: null,
                        MotherName: "MARIA DA SILVA",
                        Gender: "M",
                        Nationality: "Brasileiro",
                        MaritalStatus: "Casado",
                    },
                    Addresses: {
                        Primary: {
                            Street: "RUA DAS FLORES",
                            Number: "123",
                            Complement: "APTO 101",
                            District: "CENTRO",
                            City: "SÃO PAULO",
                            State: "SP",
                            ZipCode: "01001000",
                            Country: "Brasil"
                        }
                    },
                    Phones: {
                        Primary: {
                            CountryCode: "55",
                            AreaCode: "11",
                            Number: "999999999",
                            Type: "Celular"
                        }
                    },
                    Emails: {
                        Primary: "fulano@example.com"
                    }
                }
            }
        ]
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData),
        text: () => Promise.resolve(JSON.stringify(mockData)),
    });

    const result = await provider.getOne('big-data-corp', {
        id: 'bigdatacorp-result',
        meta: {
            document: '12345678900',
        },
    });

    expect(result.data).toEqual({
        id: 'bigdatacorp-result',
        ...mockData
    });
  });

  it('should handle document not found in BigDataCorp', async () => {
    const mockData = {
        Result: []
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData),
        text: () => Promise.resolve(JSON.stringify(mockData)),
    });

    const result = await provider.getOne('big-data-corp', {
        id: 'bigdatacorp-result',
        meta: {
            document: '00000000000',
        },
    });

    expect(result.data).toEqual({
        id: 'bigdatacorp-result',
        Result: []
    });
  });

  it('should handle API error for BigDataCorp validation', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('Internal Server Error')),
        text: () => Promise.reject(new Error('Internal Server Error')),
    });

    await expect(
        provider.getOne('big-data-corp', {
            id: 'bigdatacorp-result',
            meta: {
                document: 'error-document',
            },
        })
    ).rejects.toThrow();
  });

  it('should return empty structure when no meta is provided for BigDataCorp', async () => {
    const result = await provider.getOne('big-data-corp', { 
        id: 'bigdatacorp-empty-result' 
    });

    expect(result.data).toEqual({
        id: 'bigdatacorp-empty-result',
        Result: [{
            RegistrationData: {
                BasicData: {},
                Addresses: { Primary: {} },
                Phones: { Primary: {} }
            }
        }]
    });
  });
})
