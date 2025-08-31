// src/pages/TransferPage.tsx

import React, { useEffect, useState, type FormEvent } from "react";
import accountService, { type Account } from "../services/accountService";
import transactionService from "../services/transactionService";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Alert,
  MenuItem,
} from "@mui/material";

const TransferPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [transferStatus, setTransferStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    sourceAccountId: "",
    destinationAccountNumber: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const clientId = user.clientId;

        if (!clientId) {
          throw new Error("No se pudo encontrar el ID del cliente.");
        }

        const clientAccounts = await accountService.getAccountsByClientId(
          clientId
        );
        setAccounts(clientAccounts);
      } catch (err) {
        setError("No se pudieron cargar las cuentas para la transferencia.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setTransferStatus(null);
    setError(null);
    setLoading(true);

    try {
      const payload = {
        sourceAccountId: parseInt(formData.sourceAccountId),
        destinationAccountNumber: formData.destinationAccountNumber,
        amount: parseFloat(formData.amount),
        description: formData.description,
      };

      await transactionService.transferFunds(payload);
      setTransferStatus("Transferencia realizada con éxito.");
      setFormData({
        sourceAccountId: "",
        destinationAccountNumber: "",
        amount: "",
        description: "",
      });
    } catch (err) {
      setError(
        "Error en la transferencia. Por favor, revisa los datos e inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Realizar Transferencia
      </Typography>
      <Card>
        <CardContent>
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          {transferStatus && <Alert severity="success">{transferStatus}</Alert>}
          {!loading && accounts.length > 0 ? (
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  select
                  label="Selecciona la cuenta de origen"
                  name="sourceAccountId"
                  value={formData.sourceAccountId}
                  onChange={handleSelectChange}
                  required
                >
                  {accounts.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.accountNumber} - ${account.balance.toFixed(2)}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Número de Cuenta de Destino"
                  name="destinationAccountNumber"
                  value={formData.destinationAccountNumber}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Monto"
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  inputProps={{ min: "0.01", step: "0.01" }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Transferir
              </Button>
            </form>
          ) : (
            <Typography>No se pudieron cargar las cuentas.</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default TransferPage;
