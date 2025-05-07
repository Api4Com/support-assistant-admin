import {
    Show, 
    TabbedShowLayout,
    Tab,
    TextField,
    BooleanField,
    FunctionField,
    useRecordContext,
  } from 'react-admin';
  import { Typography, Chip, Box, Paper, Stack } from '@mui/material';
  import { useLocation } from 'react-router-dom';
  
  const CpfWithoutAddressShow = () => {
    const record = useRecordContext();
    const location = useLocation();

    const resultData = record || location.state?.resultData;
  
    if (!resultData) {
      return <div>Carregando dados do cadastro...</div>;
    }

    return (
      <Show resource="cpf-without-address" id={resultData.id || 'cpf-without-address-result'}>
        <TabbedShowLayout record={resultData} syncWithLocation={false}>
          <Tab label="Resumo">
            <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
              Resultado do Cadastro
            </Typography>

            <BooleanField source="success" label="Sucesso na Operação" />
            <BooleanField source="omieUpdated" label="Atualizado no OMIE" />
            <TextField source="totalAsaasAccountsUpdated" label="Contas Asaas Atualizadas" />
            <FunctionField
              source="bonusAdded"
              label="Valor de Bônus Adicionado"
              render={(record) => 
                new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
                }).format(record.bonusAdded || 0)
              }
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
              Dados de Endereço Cadastrados
            </Typography>

            <TextField source="addressData.cep" label="CEP" />
            <TextField source="addressData.logradouro" label="Logradouro" />
            <TextField source="addressData.number" label="Número" />
            <TextField source="addressData.complement" label="Complemento" />
            <TextField source="addressData.bairro" label="Bairro" />
            <TextField source="addressData.localidade" label="Cidade" />
            <TextField source="addressData.uf" label="UF" />
            <TextField source="addressData.estado" label="Estado" />
          </Tab>

          <Tab label="Contas Asaas">
            <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
              Contas Atualizadas ({resultData.asaasResults?.length || 0})
            </Typography>
            
            {resultData.asaasResults?.length > 0 ? (
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 2
              }}>
                {resultData.asaasResults.map((account: any, index: number) => (
                  <Paper key={index} elevation={1} sx={{ 
                    p: 2,
                    border: '1px solid',
                    borderColor: account.success ? 'success.light' : 'error.light',
                    borderRadius: 1,
                    bgcolor: 'background.paper'
                  }}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2">
                        <strong>#{index + 1}</strong> - {account.email}
                      </Typography>
                      <Chip 
                        label={account.success ? 'Sucesso' : 'Falha'} 
                        size="small" 
                        color={account.success ? 'success' : 'error'}
                        sx={{ width: 'fit-content' }}
                      />
                      <TextField source="customerId" label="ID Cliente" record={account} />
                      <TextField source="observations" label="Observações" record={account} />
                    </Stack>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Nenhuma conta Asaas foi atualizada
              </Typography>
            )}
          </Tab>

          <Tab label="Detalhes Técnicos">
            <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
              Informações Técnicas
            </Typography>

            <FunctionField
              label="Dados Completos"
              render={() => (
                <Box sx={{ 
                  p: 2,
                  bgcolor: 'background.default',
                  borderRadius: 1,
                  overflow: 'auto',
                  maxHeight: '500px'
                }}>
                  <pre style={{ margin: 0 }}>
                    {JSON.stringify(resultData, null, 2)}
                  </pre>
                </Box>
              )}
            />
          </Tab>
        </TabbedShowLayout>
      </Show>
    );
  };
  
  export default CpfWithoutAddressShow;