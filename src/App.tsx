// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Importa ProtectedRoute
import NavBar from "./components/NavBar"; // Importa el menú de navegación
import TransactionsPage from "./pages/TransactionsPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* La página de inicio de sesión es una ruta pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Esta es la ruta protegida */}
        <Route
          path="/"
          element={
            <>
              <NavBar />{" "}
              {/* El menú solo se muestra dentro de esta ruta protegida */}
              <ProtectedRoute />
            </>
          }
        >
          {/* El Dashboard se anida aquí. Si el ProtectedRoute falla, esta ruta no se renderizará. */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
