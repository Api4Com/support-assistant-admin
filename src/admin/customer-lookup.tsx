import { useState } from "react";
import { useDataProvider, Button, Title, useNotify, useGetOne } from "react-admin";
import { useNavigate } from "react-router-dom";
import { TextField, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { DataProviderWithCustomMethods } from "../providers/rest-provider";


export const CustomerLookup = () => {
    const dataProvider = useDataProvider<DataProviderWithCustomMethods>();
    const notify = useNotify();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const initialEmail = searchParams.get("email");
    const [email, setEmail] = useState(initialEmail || "");
    const [document, setDocument] = useState("");

    const { mutate, isPending } = useMutation({
        mutationFn: () => dataProvider.lookupOne(
            "customers",
            {
                id: "customer-email-lookup",
                meta: { email }
            },
        ).then(({ data }) => {
            navigate("/customers/lookup/email", {
                state: { customerEmailData: { ...data } },
                replace: true
            });
        })
    });

    const { isLoading: isDocLoading, refetch: refetchByDocument } = useGetOne(
        "customerLookup",
        {
            id: "customer-document-lookup",
            meta: { document }
        },
        {
            enabled: false,
            onSuccess: (data) => {
                navigate("/customer-lookup/document", {
                    state: { customerDocumentData: data },
                    replace: true
                });
            },
            onError: () => {
                notify("Cliente não encontrado pelo documento", { type: "error" });
            }
        }
    );

    const handleEmailConsult = (e: React.FormEvent) => {
        e.preventDefault();
        mutate();
    };

    const handleDocumentConsult = (e: React.FormEvent) => {
        e.preventDefault();
        if (!document.trim()) {
            notify("Por favor, insira um documento válido", { type: "error" });
            return;
        }
        refetchByDocument();
    };

    return (
        <>
            <Title
                title="customers.lookup.title" />
            <Box
                component="form"
                sx={{ p: 4 }}

                onSubmit={handleEmailConsult}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center"
                    }}>
                    <TextField
                        autoComplete="off"
                        disabled={isPending}
                        label="Email do cliente"
                        placeholder="Informe o email do cliente"
                        size="small"
                        sx={{ width: 300 }}
                        type="email"
                        value={email}
                        variant="outlined"
                        slotProps={{
                            htmlInput: {
                                inputMode: "email"
                            }
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        disabled={isPending}
                        label="Consultar"
                        type="submit"
                        variant="contained"
                    />
                </Box>
            </Box>

            <Box
                component="form"
                sx={{
                    p: 4,
                    pt: 0
                }}
                onSubmit={handleDocumentConsult}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center"
                    }}>
                    <TextField
                        autoComplete="off"
                        disabled={isDocLoading}
                        label="Documento do cliente"
                        placeholder="Informe o documento do cliente"
                        size="small"
                        sx={{ width: 300 }}
                        type="text"
                        value={document}
                        variant="outlined"
                        slotProps={{
                            htmlInput: {
                                inputMode: "text"
                            }
                        }}
                        onChange={(e) => setDocument(e.target.value)}
                    />
                    <Button
                        disabled={isDocLoading}
                        label="Consultar"
                        type="submit"
                        variant="contained"
                    />
                </Box>
            </Box>
        </>
    );
};
