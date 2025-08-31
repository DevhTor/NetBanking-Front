// src/pages/TransferPage.tsx

import React, { useEffect, useState } from "react";
import accountService, { type Account } from "../services/accountService";
import transactionService from "../services/transactionService"; // Crearemos este servicio

const TransferPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [transferStatus, setTransferStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    sourceAccountId: "",
    destinationAccountNumber: "", // Usaremos el número de cuenta en el frontend
    amount: "",
    description: "",
  });

  // Fetch accounts for the logged-in client
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const clientId = user.clientId; // The ID of the logged-in client

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransferStatus("Transfiriendo fondos...");
    setError(null);

    // Find the destination account ID from the accounts list
    // You might need to add a new endpoint to your API to get a destination account by its number
    // For now, let's assume we can find it on the client side if the number is known.
    // In a real application, you should call a backend endpoint to validate the destination account number.

    try {
      const transferData = {
        sourceAccountId: parseInt(formData.sourceAccountId),
        destinationAccountNumber: formData.destinationAccountNumber,
        amount: parseFloat(formData.amount),
        description: formData.description,
      };
      await transactionService.transferFunds(transferData);
      setTransferStatus("Transferencia realizada con éxito.");
      setFormData({
        sourceAccountId: "",
        destinationAccountNumber: "",
        amount: "",
        description: "",
      }); // Clear form
    } catch (err) {
      setError(
        "Error en la transferencia. Verifica los datos e inténtalo de nuevo."
      );
      setTransferStatus(null);
    }
  };

  if (loading) {
    return <div>Cargando cuentas...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Realizar Transferencia</h1>
      {transferStatus && <p style={{ color: "green" }}>{transferStatus}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label htmlFor="sourceAccountId">Cuenta de Origen:</label>
          <select
            id="sourceAccountId"
            name="sourceAccountId"
            value={formData.sourceAccountId}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">Selecciona una cuenta</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.accountNumber} - ${account.balance.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="destinationAccountNumber">
            Número de Cuenta de Destino:
          </label>
          <input
            id="destinationAccountNumber"
            type="text"
            name="destinationAccountNumber"
            value={formData.destinationAccountNumber}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div>
          <label htmlFor="amount">Monto:</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Transferir
        </button>
      </form>
    </div>
  );
};

export default TransferPage;
