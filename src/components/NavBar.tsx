// src/components/NavBar.tsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setClientName(userData.clientName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
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
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link to="/transfer" style={{ color: "#fff", textDecoration: "none" }}>
          Transferir
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {clientName && <span>Hola, {clientName}</span>}
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
      </div>
    </nav>
  );
};

export default NavBar;
