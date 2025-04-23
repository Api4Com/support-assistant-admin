import { useState } from "react";
import { useGetOne, useNotify, Button } from "react-admin";
import { useNavigate } from 'react-router-dom';
import { TextField, Box } from '@mui/material';

export const BigDataCorp = () => {
  const [document, setDocument] = useState("");
  const notify = useNotify();
  const navigate = useNavigate();

  const { isLoading, refetch } = useGetOne(
    "big-data-corp",
    { 
      id: "big-data-corp-lookup",
      meta: { document },
    },
    {
      enabled: false,
      onSuccess: (data) => {
        navigate('/big-data-corp/result', { 
          state: { bigDataCorpData: data },
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
    if (!document.trim()) {
      notify("Por favor, insira um documento válido", { type: "error" });
      return;
    }
    refetch();
  };

  return (
    <Box component="form" onSubmit={handleConsult} sx={{ p: 4 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          label="Documento do cliente"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ width: 300 }}
          autoComplete="off"
          disabled={isLoading}
          placeholder="Digite apenas números"
          slotProps={{
            htmlInput: {
              maxLength: 14,
              pattern: "[0-9]*",
              inputMode: "numeric"
            }
          }}
        />
        <Button
          type="submit"
          label="Consultar"
          disabled={isLoading || document.length < 11}
          variant="contained"
        />
      </Box>
    </Box>
  );
};