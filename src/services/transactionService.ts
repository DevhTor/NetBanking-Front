// src/services/transactionService.ts

import axios from "axios";

const API_URL = "https://localhost:7115/api/transactions";

export interface Transaction {
    id: number;
    amount: number;
    transactionDate: string;
    description: string;
    sourceAccountId: number;
    destinationAccountId: number;
}

interface TransferRequest {
  sourceAccountId: number;
  destinationAccountNumber: string;
  amount: number;
  description: string;
}

const getTransactionsByAccountId = async (accountId: number): Promise<Transaction[]> => {
  try {
    const response = await axios.get<Transaction[]>(`${API_URL}/${accountId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las transacciones:", error);
    throw error;
  }
};

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
  getTransactionsByAccountId,
  transferFunds,
};

export default transactionService;