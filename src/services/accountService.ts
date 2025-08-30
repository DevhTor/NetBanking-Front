import axios from "axios";

const API_URL = "https://localhost:7115/api/accounts";

// Debes exportar la interfaz para que sea visible desde otros archivos.
export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  clientId: number;
}

const getAccountsByClientId = async (clientId: number): Promise<Account[]> => {
  try {
    const response = await axios.get<Account[]>(
      `${API_URL}/client/${clientId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener las cuentas:", error);
    throw error;
  }
};

const accountService = {
  getAccountsByClientId,
};

export default accountService;
