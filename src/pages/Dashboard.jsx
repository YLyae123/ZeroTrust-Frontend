import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
  logout();
  navigate("/login", { replace: true });
 };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "40px",
      boxSizing: "border-box"
    }}>
      <h1>Zero Trust Security</h1>
      <h2>Dashboard</h2>

      <p>Bienvenido al panel de administración.</p>
      <p>Sistema de seguridad basado en Zero Trust.</p>

      <button
        onClick={cerrarSesion}
        style={{
          padding: "12px 20px",
          background: "#dc2626",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;
