import { useState } from "react";
import { useGetOne, useNotify, Button, Title, Translate } from "react-admin";
import { useNavigate } from "react-router-dom";
import { TextField, Box } from "@mui/material";

export const DocumentLookup = () => {
    const [document, setDocument] = useState("");
    const notify = useNotify();
    const navigate = useNavigate();

    // const ERROR_CODE_MAPPER: { [key: string]: string } = {
    //     "INVALID_PARAMETER": "Documento inválido"
    // };

    const { isLoading, refetch } = useGetOne(
        "documentLookup",
        {
            id: "document-lookup",
            meta: { document },
        },
        {
            enabled: false,
            retry: false,
            onSuccess: (documentData) => {
                navigate("/document-lookup/result", {
                    state: { documentData },
                    replace: true
                });
            },
            // onError: (error) => {
            //     const message: string = ERROR_CODE_MAPPER[error?.cause?.code] || "Erro ao consultar o documento";
            //     notify(message, { type: "error" });
            // }
        }
    );

    const handleConsult = (e: React.FormEvent) => {
        e.preventDefault();
        if (!document.trim()) {
            notify("Por favor, insira um documento válido", { type: "error" });
            return;
        }
        refetch();
    };

    return (
        <>
            <Title
                title={<Translate
                    i18nKey="documentLookup.title" />} />
            <Box
                component="form"
                sx={{ p: 4 }}
                onSubmit={handleConsult}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center"
                    }}>
                    <TextField
                        autoComplete="off"
                        disabled={isLoading}
                        label="Documento do cliente"
                        placeholder="Digite o CPF ou CNPJ"
                        size="small"
                        sx={{ width: 300 }}
                        value={document}
                        variant="outlined"
                        slotProps={{
                            htmlInput: {
                                maxLength: 14,
                                pattern: "[0-9]*",
                                inputMode: "numeric"
                            }
                        }}
                        onChange={(e) => setDocument(e.target.value.replace(/\D/g, ""))}
                        onPaste={(e) => {
                            const pastedData = e.clipboardData.getData("text");
                            setDocument(pastedData.replace(/\D/g, ""));
                        }}
                    />
                    <Button
                        disabled={isLoading || document.length < 11}
                        label="Consultar"
                        type="submit"
                        variant="contained"
                    />
                </Box>
            </Box>
        </>
    );
};