// src/pages/DashboardPage.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import accountService, { type Account } from "../services/accountService";

// Importa los componentes de Material UI
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Button,
} from "@mui/material";

const DashboardPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
        setError("No se pudieron cargar las cuentas.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleViewTransactions = (accountId: number, accountNumber: string) => {
    navigate(`/transactions/${accountId}`, { state: { accountNumber } });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mis Cuentas Bancarias
      </Typography>
      {accounts.length > 0 ? (
        <Box>
          {accounts.map((account) => (
            <Card key={account.id} sx={{ mb: 2 }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h6">
                    Número de Cuenta: {account.accountNumber}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Balance: ${account.balance.toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => handleViewTransactions(account.id, account.accountNumber)}
                >
                  Ver Movimientos
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No tienes cuentas asociadas.</Typography>
      )}
    </Container>
  );
};

export default DashboardPage;