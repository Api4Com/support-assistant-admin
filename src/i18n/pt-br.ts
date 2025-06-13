import ptBRMessages from "ra-language-pt-br";

export const ptBR = {
    ...ptBRMessages,
    customers: {
        lookup: {
            asaas: {
                id: "ID ASAAS",
                notFound: "Nenhum dado ASAAS encontrado"
            },
            customer: {
                cpfCnpj: {
                    notFound: "Documento não informado",
                },
                financialMails: {
                    notFound: "Nenhum email financeiro cadastrado",
                },
                isUnlimited: "Possui RateLimit Ilimitado?",
                needPrepaymentInvoice: "Precisa da Nota Fiscal na criação da cobrança?",
                notFound: "Nenhum dado API4COM encontrado",
                receivedBonusCredit: "Recebeu Crédito Bônus?",
                statusOptions: {
                    ACTIVE: "Ativo",
                    CANCELLED: "Cancelado",
                    null: "Cadastro não encontrado",
                    PENDING: "Pendente"
                },
                title: "Informações do Cliente",
                relatedOrganizations: {
                    name: "Documento Utilizado Por Outras Organizações",
                    notFound: "Nenhuma organização relacionada ao documento"
                }
            },
            documenTitle: "Informações do Documento",
            emailTitle: "Informações do Email",
            omie: {
                id: "ID OMIE",
                notFound: "Nenhum dado OMIE encontrado",
                phone1: "Telefone 1",
                phone2: "Telefone 2",

            },
            title: "Consulta de Clientes",
            tab: {
                asaas: "ASAAS",
                customer: "API4COM",
                omie: "OMIE"
            }
        }
    },
    documentLookup: {
        loading: "Carregando dados do documento...",
        title: "Consultar Documento"
    },
    errors: {
        BAD_REQUEST: "Requisição inválida",
        FORBIDDEN: "Proibido",
        INTERNAL_SERVER_ERROR: "Erro interno do servidor",
        INVALID_CREDENTIALS: "Credenciais inválidas",
        NETWORK_ERROR: "Erro de rede",
        NOT_FOUND: "Não encontrado",
        SERVICE_UNAVAILABLE: "Serviço indisponível",
        TIMEOUT: "Tempo limite excedido",
        UNAUTHORIZED: "Não autorizado",
        UNKNOWN_ERROR: "Erro desconhecido"
    },
    global: {
        actions: "Ações",
        active: "Ativo",
        address: {
            title: "Endereço",
            street: "Rua",
            number: "Número",
            complement: "Complemento",
            neighborhood: "Bairro",
            city: "Cidade",
            state: "Estado",
            postalCode: "CEP",
            country: "País",
        },
        back: "Voltar",
        cancel: "Cancelar",
        clearFilter: "Limpar Filtro",
        company: "Empresa",
        confirmDelete: "Você tem certeza que deseja excluir este item?",
        contacts: "Contatos",
        cpfCnpj: "Documento",
        create: "Criar",
        createdAt: "Criado em",
        delete: "Excluir",
        deselectAll: "Deselecionar Todos",
        domain: "Domínio",
        edit: "Editar",
        email: "Email",
        error: "Erro",
        excluded: "Excluído",
        externalReference: "Referência Externa",
        fantasyName: "Nome Fantasia",
        filter: "Filtrar",
        financialMails: "Emails Financeiros",
        fixedPhone: "Telefone Fixo",
        id: "ID",
        inactive: "Inativo",
        legalName: "Razão Social",
        legalPerson: "Pessoa Jurídica",
        loading: "Carregando...",
        mobilePhone: "Telefone Móvel",
        name: "Nome",
        naturalPerson: "Pessoa Física",
        next: "Próximo",
        no: "Não",
        noResults: "Nenhum resultado encontrado",
        notInformed: "Não Informado",
        observations: "Observações",
        organizationId: "ID Organização",
        organizationUuid: "UUID Organização",
        personType: "Tipo de Pessoa",
        phone: "Telefone",
        previous: "Anterior",
        refresh: "Atualizar",
        registrationData: "Dados Cadastrais",
        save: "Salvar",
        search: "Pesquisar",
        select: "Selecionar",
        selectAll: "Selecionar Todos",
        showLess: "Mostrar Menos",
        showMore: "Mostrar Mais",
        situation: "Situação",
        status: "Status",
        success: "Sucesso",
        view: "Visualizar",
        yes: "Sim"
    }
};
