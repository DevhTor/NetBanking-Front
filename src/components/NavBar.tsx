// src/components/NavBar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa 'useNavigate'

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el usuario del almacenamiento local
    localStorage.removeItem("user");
    // Redirige al usuario a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#333",
        padding: "1rem",
        marginBottom: "2rem",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between", // Alinea los elementos a los extremos
        alignItems: "center", // Centra verticalmente los elementos
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link
          to="/transactions"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Transacciones
        </Link>
        <Link to="/transfer" style={{ color: "#fff", textDecoration: "none" }}>
          Transferir
        </Link>
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: "none",
          border: "1px solid #fff",
          color: "#fff",
          padding: "8px 16px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default NavBar;
