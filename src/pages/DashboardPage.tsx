// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import accountService, { type Account } from "../services/accountService";

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

  const handleViewTransactions = (accountId: number) => {
    navigate(`/transactions/${accountId}`);
  };

  if (loading) {
    return <div>Cargando cuentas...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Mis Cuentas Bancarias</h1>
      {accounts.length > 0 ? (
        <ul>
          {accounts.map((account) => (
            <li
              key={account.id}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p>
                  <strong>Número de Cuenta:</strong> {account.accountNumber}
                </p>
                <p>
                  <strong>Balance:</strong> ${account.balance.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleViewTransactions(account.id)}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  border: "1px solid #007bff",
                  background: "#007bff",
                  color: "#fff",
                }}
              >
                Ver Movimientos
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay cuentas disponibles.</p>
      )}
    </div>
  );
};

export default DashboardPage;
