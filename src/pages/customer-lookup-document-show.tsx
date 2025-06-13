import {
    Show,
    useRecordContext,
    SimpleShowLayout,
    TextField,
} from "react-admin";
import { Typography, Box, Paper, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const CustomerLookupDocumentShow = () => {
    const record = useRecordContext();
    const location = useLocation();

    const customerDocumentData = record || location.state?.customerDocumentData;

    if (!customerDocumentData) {
        return <div>Carregando dados do cliente...</div>;
    }

    return (
        <Show
            id={customerDocumentData.id || "lookup-document-result"}
            resource="customerLookup">
            <SimpleShowLayout
                record={customerDocumentData}>
                <TextField
                    label="Utilizado Por Outras Organizações"
                    source=""
                />
                {customerDocumentData?.usedInOtherOrganizations?.length > 0 ? (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, 1fr)",
                                md: "repeat(3, 1fr))"
                            },
                            gap: 2
                        }}>
                        {customerDocumentData.usedInOtherOrganizations.map((org: {
                            id: string;
                            domain: string;
                            name: string;
                            email: string;
                            phone: string;
                            is_unlimited: boolean;
                            created_at: string;
                        }) => (
                            <Paper
                                key={org.id}
                                elevation={0}
                                sx={{
                                    p: 2,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 1,
                                    bgcolor: "background.default"
                                }}>
                                <Stack
                                    spacing={1}>
                                    <Typography
                                        variant="body2"><strong>ID:</strong> {org.id}</Typography>
                                    <Typography
                                        variant="body2"><strong>Domínio:</strong> {org.domain}</Typography>
                                    <Typography
                                        variant="body2"><strong>Nome:</strong> {org.name}</Typography>
                                    <Typography
                                        variant="body2">
                                        <strong>Email:</strong>{" "}
                                        <Link
                                            to={`/customer-lookup?email=${encodeURIComponent(org.email)}`}
                                            style={{
                                                textDecoration: "none",
                                                color: "#1976d2"
                                            }}
                                        >
                                            {org.email}
                                        </Link>
                                    </Typography>
                                    <Typography
                                        variant="body2"><strong>Telefone:</strong> {org.phone}</Typography>
                                    <Typography
                                        variant="body2"><strong>Plano:</strong> {org.is_unlimited ? "Ilimitado" : "Limitado"}</Typography>
                                    <Typography
                                        variant="body2">
                                        <strong>Criado em:</strong> {new Date(org.created_at).toLocaleDateString()}
                                    </Typography>
                                </Stack>
                            </Paper>
                        ))}
                    </Box>
                ) : (
                    <Typography
                        color="textSecondary"
                        variant="body2">
                        Nenhuma organização relacionada
                    </Typography>
                )}
            </SimpleShowLayout>
        </Show>
    );
};

export default CustomerLookupDocumentShow;