import { useEffect, useState } from "react";
import { useGetOne, useNotify, Button } from "react-admin";
import { useNavigate } from 'react-router-dom';
import { TextField, Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

export const CustomerLookup = () => {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(initialEmail);
  
  const [document, setDocument] = useState("");
  const notify = useNotify();
  const navigate = useNavigate();

  const { isLoading: isEmailLoading, refetch: refetchByEmail } = useGetOne(
    "customer-lookup",
    { id: "lookup", meta: { email } },
    {
      enabled: false,
      onSuccess: (data) => {
        navigate('/customer-lookup/result', { 
          state: { customerData: data },
          replace: true
        });
      },
      onError: () => {
        notify('Cliente não encontrado pelo email', { type: 'error' });
      }
    }
  );

  const { isLoading: isDocLoading, refetch: refetchByDocument } = useGetOne(
    "customer-lookup",
    { id: "document-lookup", meta: { document } },
    {
      enabled: false,
      onSuccess: (data) => {
        navigate('/document-lookup/result', { 
          state: { documentData: data },
          replace: true
        });
      },
      onError: () => {
        notify('Cliente não encontrado pelo documento', { type: 'error' });
      }
    }
  );

  useEffect(() => {
    if (initialEmail) {
      refetchByEmail();
    }
  }, [initialEmail]);

  const handleEmailConsult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      notify("Por favor, insira um email válido", { type: "error" });
      return;
    }
    refetchByEmail();
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
      <Box component="form" onSubmit={handleEmailConsult} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            label="Email do cliente"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
            autoComplete="off"
            disabled={isEmailLoading}
            placeholder="Informe o email do cliente"
            type="email"
            slotProps={{
              htmlInput: {
                inputMode: "email"
              }
            }}
          />
          <Button
            type="submit"
            label="Consultar"
            disabled={isEmailLoading}
            variant="contained"
          />
        </Box>
      </Box>

      <Box component="form" onSubmit={handleDocumentConsult} sx={{ p: 4, pt: 0 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            label="Documento do cliente"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
            autoComplete="off"
            disabled={isDocLoading}
            placeholder="Informe o documento do cliente"
            type="text"
            slotProps={{
              htmlInput: {
                inputMode: "text"
              }
            }}
          />
          <Button
            type="submit"
            label="Consultar"
            disabled={isDocLoading}
            variant="contained"
          />
        </Box>
      </Box>
    </>
  );
};