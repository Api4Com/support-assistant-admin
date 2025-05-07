import { useState } from "react";
import { useNotify, Button, useCreate } from "react-admin";
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Box, Stack} from '@mui/material';

export const CpfWithoutAddress = () => {
  const location = useLocation();
  const initialData = location.state?.initialData || {};

  const [email, setEmail] = useState(initialData.email || "");
  const [cpf, setCpf] = useState(initialData.cpf || "");
  const [cep, setCep] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  
  const notify = useNotify();
  const navigate = useNavigate();
  const [create, { isLoading }] = useCreate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !cpf.trim() || !cep.trim() || !number.trim()) {
      notify("Por favor, preencha todos os campos obrigatórios", { type: "error" });
      return;
    }

    if (!email.includes('@')) {
      notify("Por favor, insira um email válido", { type: "error" });
      return;
    }

    create(
      'cpf-without-address',
      { data: { email, cpf, cep, number, complement } },
      {
        onSuccess: (data) => {
          notify("Dados cadastrados com sucesso!", { type: "success" });
          navigate('/cpf-without-address/result', {
            state: { resultData: data.data }
          });
        },
        onError: (error: unknown) => {
          const apiError = error as { message?: string };
          notify(`Erro ao cadastrar: ${apiError.message || 'Erro desconhecido'}`, { 
            type: "error" 
          });
        }
      }
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            required
            disabled={isLoading}
            placeholder="exemplo@email.com"
            type="email"
          />
          
          <TextField
            label="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            variant="outlined"
            fullWidth
            required
            disabled={isLoading}
            placeholder="Apenas números, exemplo: 00000000000"
            inputProps={{ maxLength: 11 }}
          />
          
          <TextField
            label="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            variant="outlined"
            fullWidth
            required
            disabled={isLoading}
            placeholder="Apenas números, exemplo: 00000000"
            inputProps={{ maxLength: 8 }}
          />
          
          <TextField
            label="Número"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            variant="outlined"
            fullWidth
            required
            disabled={isLoading}
            placeholder="Número do endereço"
            type="text"
          />
          
          <TextField
            label="Complemento"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
            variant="outlined"
            fullWidth
            disabled={isLoading}
            placeholder="Complemento (opcional)"
          />
          
          <Button
            type="submit"
            label="Enviar"
            disabled={isLoading}
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          />
        </Stack>
      </Box>
    </Box>
  );
};