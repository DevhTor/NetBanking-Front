// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  // Comprueba si el usuario tiene un token de autenticación en el almacenamiento local.
  const isAuthenticated = localStorage.getItem("user");

  // Si no hay token, redirige al usuario a la página de inicio de sesión.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, renderiza la ruta anidada (por ejemplo, el Dashboard).
  return <Outlet />;
};

export default ProtectedRoute;
