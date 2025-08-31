// src/App.tsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import TransactionsPage from "./pages/TransactionsPage";
import TransferPage from "./pages/TransferPage";

// 1. Importa los componentes de Material UI
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

// 2. Define un tema oscuro
const darkTheme = createTheme({
  palette: {
    mode: "dark", // Esto activa el modo oscuro
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#121212", // Un tono oscuro para el fondo
      paper: "#1d1d1d", // Un tono un poco más claro para las "tarjetas"
    },
  },
});

const App: React.FC = () => {
  return (
    // 3. Envuelve toda tu aplicación con ThemeProvider
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* 4. Componente para un fondo oscuro consistente */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <>
                <NavBar />
                <ProtectedRoute />
              </>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="transfer" element={<TransferPage />} />
            <Route path="transactions/:accountId" element={<TransactionsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;