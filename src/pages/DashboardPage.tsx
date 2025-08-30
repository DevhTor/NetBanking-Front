// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from "react";
import accountService, { type Account } from "../services/accountService";

const DashboardPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // Obtén la información del usuario del almacenamiento local
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        // Asume que la información del usuario contiene el clientId
        const clientId = user.clientId;

        if (!clientId) {
          throw new Error("No se pudo encontrar el ID del cliente.");
        }

        // Llama a la API para obtener las cuentas del cliente
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
              }}
            >
              <p>
                <strong>Número de Cuenta:</strong> {account.accountNumber}
              </p>
              <p>
                <strong>Balance:</strong> ${account.balance.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes cuentas asociadas.</p>
      )}
    </div>
  );
};

export default DashboardPage;
