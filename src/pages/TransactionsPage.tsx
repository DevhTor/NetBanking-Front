// src/pages/TransactionsPage.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import transactionService, {
  type Transaction,
} from "../services/transactionService";

const TransactionsPage: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
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
    return <div>Cargando transacciones...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Movimientos de la Cuenta {accountId}</h1>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #eee",
                borderRadius: "4px",
              }}
            >
              <p>
                <strong>Monto:</strong> ${transaction.amount.toFixed(2)}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(transaction.transactionDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Descripción:</strong> {transaction.description}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay transacciones para esta cuenta.</p>
      )}
    </div>
  );
};

export default TransactionsPage;
