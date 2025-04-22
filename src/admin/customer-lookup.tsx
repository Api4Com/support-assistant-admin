import { useState } from "react";
import { useGetOne, useNotify, Button } from "react-admin";
import { useNavigate } from 'react-router-dom';
import { TextField, Box } from '@mui/material';

export const CustomerLookup = () => {
  const [email, setEmail] = useState("");
  const notify = useNotify();
  const navigate = useNavigate();

  const { isLoading, refetch } = useGetOne(
    "customer-lookup",
    { 
      id: "lookup",
      meta: { email },
    },
    {
      enabled: false,
      onSuccess: (data) => {
        navigate('/customer-lookup/result', { 
          state: { customerData: data },
          replace: true
        });
      },
      onError: () => {
        notify('Cliente não encontrado', { type: 'error' });
      }
    }
  );

  const handleConsult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      notify("Por favor, insira um email válido", { type: "error" });
      return;
    }
    refetch();
  };

  return (
    <Box component="form" onSubmit={handleConsult} sx={{ p: 4 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          label="Email do cliente"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ width: 300 }}
          autoComplete="off"
          disabled={isLoading}
        />
        <Button
          type="submit"
          label="Consultar"
          disabled={isLoading}
          variant="contained"
        />
      </Box>
    </Box>
  );
};