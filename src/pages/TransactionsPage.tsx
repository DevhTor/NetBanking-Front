// src/pages/TransactionsPage.tsx

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import transactionService, {
  type Transaction,
} from "../services/transactionService";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const TransactionsPage: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const location = useLocation();
  const accountNumber = (location.state as { accountNumber: string })
    ?.accountNumber;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!accountId) {
        setError("ID de cuenta no proporcionado.");
        setLoading(false);
        return;
      }

      try {
        const data = await transactionService.getTransactionsByAccountId(
          parseInt(accountId)
        );
        setTransactions(data);
      } catch (err) {
        setError("No se pudieron cargar las transacciones.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [accountId]);

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
        Movimientos de la Cuenta #{accountNumber}
      </Typography>
      <Card>
        <CardContent>
          {transactions.length > 0 ? (
            <List>
              {transactions.map((transaction) => (
                <ListItem key={transaction.id} divider>
                  <ListItemText
                    primary={`Monto: $${transaction.amount.toFixed(2)}`}
                    secondary={`Fecha: ${new Date(
                      transaction.transactionDate
                    ).toLocaleDateString()} | Descripción: ${
                      transaction.description
                    }`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No hay transacciones para esta cuenta.</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default TransactionsPage;
