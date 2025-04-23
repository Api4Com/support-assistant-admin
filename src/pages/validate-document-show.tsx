import { 
  Show,
  useRecordContext,
  SimpleShowLayout,
  TextField,
} from 'react-admin';
import { Typography, Box, Paper, Stack } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const ValidateDocumentShow = () => {
  const record = useRecordContext();
  const location = useLocation();

  const documentData = record || location.state?.documentData;

  if (!documentData) {
    return <div>Carregando dados do cliente...</div>;
  }

  return (
    <Show resource="customer-lookup" id={documentData.id || 'lookup-document-result'}>
      <SimpleShowLayout record={documentData}>
        <TextField
          source=''
          label="Utilizado Por Outras Organizações"
        />
          {documentData?.usedInOtherOrganizations?.length > 0 ? (
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr))' },
              gap: 2
            }}>
              {documentData.usedInOtherOrganizations.map((org: any) => (
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
                    <Typography variant="body2">
                        <strong>Email:</strong>{' '}
                        <Link
                            to={`/customer-lookup?email=${encodeURIComponent(org.email)}`}
                            style={{ textDecoration: 'none', color: '#1976d2' }}
                        >
                            {org.email}
                        </Link>
                    </Typography>
                    <Typography variant="body2"><strong>Telefone:</strong> {org.phone}</Typography>
                    <Typography variant="body2"><strong>Plano:</strong> {org.is_unlimited ? 'Ilimitado' : 'Limitado'}</Typography>
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
      </SimpleShowLayout>
    </Show>
  );
};

export default ValidateDocumentShow;