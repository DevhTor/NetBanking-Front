// src/services/transactionService.ts

import axios from "axios";

const API_URL = "https://localhost:7115/api/transactions";

interface TransferRequest {
  sourceAccountId: number;
  destinationAccountNumber: string;
  amount: number;
  description: string;
}

const transferFunds = async (data: TransferRequest): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/transfer`, data);
    return response.data;
  } catch (error) {
    console.error("Error al transferir fondos:", error);
    throw error;
  }
};

const transactionService = {
  transferFunds,
};

export default transactionService;
