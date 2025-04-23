import { 
  Show, 
  TabbedShowLayout,
  Tab,
  TextField, 
  DateField, 
  BooleanField,
  FunctionField,
  useRecordContext,
} from 'react-admin';
import { Typography, Chip, Box, Paper, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ValidateShow = () => {
  const record = useRecordContext();
  const location = useLocation();

  const customerData = record || location.state?.customerData;

  if (!customerData) {
    return <div>Carregando dados do cliente...</div>;
  }

  return (
    <Show resource="customer-lookup" id={customerData.id || 'lookup-email-result'}>
      <TabbedShowLayout record={customerData} syncWithLocation={false}>
        <Tab label="API4COM">
          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
            Informações API4Com
          </Typography>
          <TextField source="api4com.domain" label="Domínio" />
          <TextField source="api4com.cpfCnpj" label="CPF/CNPJ" />
          <FunctionField
            source="api4com.receivedBonusCredit"
            label="Recebeu Bônus"
            render={(record: any) => record.api4com.receivedBonusCredit === "true" ? "Sim" : "Não"}
          />
          <FunctionField
            source="api4com.needPrepaymentInvoice"
            label="Requer Pré-pagamento"
            render={(record: any) => record.api4com.needPrepaymentInvoice === "true" ? "Sim" : "Não"}
          />
          <TextField source="api4com.financialMails" label="Emails Financeiros" />
          <TextField source="api4com.statusAsaas" label="Status Asaas" />
          <TextField source="api4com.organizationId" label="ID Organização" />
          <TextField
            source=''
            label="Utilizado Por Outras Organizações"
          />
          {customerData.api4com?.usedInOtherOrganizations?.length > 0 ? (
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr))' },
              gap: 2
            }}>
              {customerData.api4com.usedInOtherOrganizations.map((org: any) => (
                <Paper key={org.id} elevation={0} sx={{ 
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  bgcolor: 'background.default'
                }}>
                  <Stack spacing={1}>
                    <Typography variant="body2"><strong>ID:</strong> {org.id}</Typography>
                    <Typography variant="body2"><strong>Domínio:</strong> {org.domain}</Typography>
                    <Typography variant="body2"><strong>Nome:</strong> {org.name}</Typography>
                    <Typography variant="body2"><strong>Email:</strong> {org.email}</Typography>
                    <Typography variant="body2"><strong>Telefone:</strong> {org.phone}</Typography>
                    <Typography variant="body2"><strong>Plano:</strong> {org.is_unlimited ? 'Ilimitado' : 'Limitado'}`</Typography>
                    <Typography variant="body2">
                      <strong>Criado em:</strong> {new Date(org.created_at).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Nenhuma organização relacionada
            </Typography>
          )}
        </Tab>

        <Tab label="OMIE">
          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
            Dados Cadastrais
          </Typography>
          <TextField source="omie.clientes_cadastro[0].codigo_cliente_omie" label="Código Cliente OMIE" />
          <TextField source="omie.clientes_cadastro[0].nome_fantasia" label="Nome Fantasia" />
          <TextField source="omie.clientes_cadastro[0].razao_social" label="Razão Social" />
          <TextField source="omie.clientes_cadastro[0].cnpj_cpf" label="CPF/CNPJ" />
          <FunctionField
            label="Tipo Cliente"
            render={(record: any) => 
              record.omie.clientes_cadastro[0].pessoa_fisica === 'S' ? 'Pessoa Física' : 'Pessoa Jurídica'
            }
          />
          <TextField source="omie.clientes_cadastro[0].email" label="E-mail" />

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
            Endereço
          </Typography>
          <TextField source="omie.clientes_cadastro[0].endereco" label="Logradouro" />
          <TextField source="omie.clientes_cadastro[0].endereco_numero" label="Número" />
          <TextField source="omie.clientes_cadastro[0].complemento" label="Complemento" />
          <TextField source="omie.clientes_cadastro[0].bairro" label="Bairro" />
          <TextField source="omie.clientes_cadastro[0].cidade" label="Cidade" />
          <TextField source="omie.clientes_cadastro[0].estado" label="Estado" />
          <TextField source="omie.clientes_cadastro[0].cep" label="CEP" />
          <TextField source="omie.clientes_cadastro[0].codigo_pais" label="Código País" />

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
            Status
          </Typography>
          <FunctionField
            label="Situação"
            render={(record: any) => 
              record.omie.clientes_cadastro[0].inativo === 'N' ? 'Ativo' : 'Inativo'
            }
          />
          <FunctionField
            label="Bloqueio Faturamento"
            render={(record: any) => 
              record.omie.clientes_cadastro[0].bloquear_faturamento === 'N' ? 'Liberado' : 'Bloqueado'
            }
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
            Dados Bancários
          </Typography>
          <TextField source="omie.clientes_cadastro[0].dadosBancarios.codigo_banco" label="Banco" />
          <TextField source="omie.clientes_cadastro[0].dadosBancarios.agencia" label="Agência" />
          <TextField source="omie.clientes_cadastro[0].dadosBancarios.conta_corrente" label="Conta Corrente" />
          <TextField source="omie.clientes_cadastro[0].dadosBancarios.nome_titular" label="Titular" />
          <TextField source="omie.clientes_cadastro[0].dadosBancarios.doc_titular" label="CPF Titular" />
          <FunctionField
            label="Transferência Padrão"
            render={(record: any) => 
              record.omie.clientes_cadastro[0].dadosBancarios.transf_padrao === 'N' ? 'Não' : 'Sim'
            }
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
            Tags
          </Typography>
          <FunctionField
            label="Tags"
            render={() => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {customerData.omie?.clientes_cadastro[0]?.tags?.map((tag: any, index: number) => (
                  <Chip 
                    key={index} 
                    label={tag.tag} 
                    size="small" 
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
            Informações Adicionais
          </Typography>
          <FunctionField
            label="Data de Cadastro"
            render={(record: any) => 
              `${record.omie.clientes_cadastro[0].info.dInc} às ${record.omie.clientes_cadastro[0].info.hInc}`
            }
          />
          <FunctionField
            label="Última Atualização"
            render={(record: any) => 
              `${record.omie.clientes_cadastro[0].info.dAlt} às ${record.omie.clientes_cadastro[0].info.hAlt}`
            }
          />
          <TextField 
            source="omie.clientes_cadastro[0].info.uAlt" 
            label="Usuário da Última Alteração"
          />
        </Tab>

        <Tab label="ASAAS">
          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
            Dados do Cliente
          </Typography>
          <TextField source="asaas.id" label="ID ASAAS" />
          <TextField source="asaas.name" label="Nome Completo" />
          <TextField source="asaas.email" label="E-mail Principal" />
          <TextField source="asaas.additionalEmails" label="E-mails Adicionais" />
          <TextField source="asaas.company" label="Nome Empresarial" />
          <FunctionField
            label="Tipo de Pessoa"
            render={(record: any) => 
              record.asaas.personType === 'FISICA' ? 'Pessoa Física' : 'Pessoa Jurídica'
            }
          />
          <TextField source="asaas.cpfCnpj" label="CPF/CNPJ" />

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
            Contatos
          </Typography>
          <FunctionField
            label="Telefone Fixo"
            render={(record: any) => 
              record.asaas.phone ? `(${record.asaas.phone.substring(0,2)}) ${record.asaas.phone.substring(2)}` : 'Não informado'
            }
          />
          <FunctionField
            label="Celular"
            render={(record: any) => 
              record.asaas.mobilePhone ? `(${record.asaas.mobilePhone.substring(0,2)}) ${record.asaas.mobilePhone.substring(2)}` : 'Não informado'
            }
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
            Status
          </Typography>
          <DateField source="asaas.dateCreated" label="Data de Criação" />
          <FunctionField
            label="Situação"
            render={(record: any) => 
              record.asaas.deleted ? 'Excluído' : 'Ativo'
            }
          />
          <BooleanField 
            source="asaas.notificationDisabled" 
            label="Notificações Habilitadas?" 
            valueLabelTrue="Sim" 
            valueLabelFalse="Não"
          />
          <TextField source="asaas.externalReference" label="Referência Externa" />
          <TextField source="asaas.observations" label="Observações"/>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
            Endereço
          </Typography>
          
          <TextField source="asaas.address" label="Logradouro" />
          <TextField source="asaas.addressNumber" label="Número" />
          <TextField source="asaas.complement" label="Complemento" />
          <TextField source="asaas.province" label="Bairro" />
          <TextField source="asaas.cityName" label="Cidade" />
          <TextField source="asaas.state" label="Estado" />
          <TextField source="asaas.postalCode" label="CEP" />
          <TextField source="asaas.country" label="País" />

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
            Permissões
          </Typography>
          
          <BooleanField 
            source="asaas.canDelete" 
            label="Pode ser Excluído?" 
            valueLabelTrue="Sim" 
            valueLabelFalse="Não"
          />
          
          <TextField source="asaas.cannotBeDeletedReason" label="Motivo para não Excluir" />
          
          <BooleanField 
            source="asaas.canEdit" 
            label="Pode ser Editado?" 
            valueLabelTrue="Sim" 
            valueLabelFalse="Não"
          />
          
          <TextField source="asaas.cannotEditReason" label="Motivo para não Editar" />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export default ValidateShow;