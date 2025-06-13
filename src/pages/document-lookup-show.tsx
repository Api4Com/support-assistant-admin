import {
    Show,
    SimpleShowLayout,
    TextField,
    ArrayField,
    Datagrid,
} from "react-admin";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const DocumentLookupShow = () => {
    const location = useLocation();

    const documentData = location.state?.searcherDocumentData;

    const IS_CNPJ = documentData?.personType === "Pessoa Jurídica";

    if (!documentData?.status) {
        return <div>Carregando dados do cliente...</div>;
    }

    return (
        <Show
            id={documentData.id || "searcher-document-result"}
            resource="searcher-document">
            <SimpleShowLayout
                record={documentData}>
                <Typography
                    gutterBottom
                    variant="h6"
                    sx={{
                        mt: 2,
                        fontWeight: "bold"
                    }}>
                    Dados do Cadastro
                </Typography>
                <TextField
                    label={IS_CNPJ ? "CNPJ" : "CPF"}
                    source="cpfCnpj" />
                <TextField
                    label="Situação do Documento"
                    source="status" />
                <TextField
                    label={IS_CNPJ ? "Razão Social" : "Nome Completo"}
                    source="name" />
                <TextField
                    hidden={!IS_CNPJ}
                    label="Nome Fantasia"
                    source="fantasyName" />
                <Typography
                    gutterBottom
                    variant="h6"
                    sx={{
                        mt: 3,
                        fontWeight: "bold"
                    }}>
                    Endereços
                </Typography>
                <ArrayField
                    label={false}
                    source="addresses">
                    <Datagrid
                        bulkActionButtons={false}>
                        <TextField
                            label="Logradouro"
                            source="address" />
                        <TextField
                            label="Número"
                            source="number" />
                        <TextField
                            label="Complemento"
                            source="complement" />
                        <TextField
                            label="Bairro"
                            source="neighborhood" />
                        <TextField
                            label="Cidade"
                            source="city" />
                        <TextField
                            label="Estado"
                            source="state" />
                        <TextField
                            label="CEP"
                            source="zipCode" />
                        <TextField
                            label="País"
                            source="country" />
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    );
};

export default DocumentLookupShow;  
