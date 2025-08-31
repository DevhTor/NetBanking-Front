import axios from "axios";

// Define the interfaces for the data types
interface ILoginRequest {
  username: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  clientId: number;
  clientName: string;
  // Add other user data returned by your API here, if any
}

const API_URL = "https://localhost:7115/api/auth";

const login = async (data: ILoginRequest): Promise<ILoginResponse> => {
  try {
    const response = await axios.post<ILoginResponse>(`${API_URL}/login`, data);

    if (response.data.token) {
      // Store the token in local storage for later use
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    // Here we check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      // Now TypeScript knows that 'error' has a 'response' property
      if (error.response) {
        console.error("Error del servidor:", error.response.data);
        throw new Error(
          error.response.data.message || "Error en la solicitud."
        );
      }
    }

    console.error("Error desconocido:", error);
    throw new Error("Ocurrió un error inesperado.");
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
