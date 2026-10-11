import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Más adelante conectaremos el formulario al Backend.
    alert("Formulario listo para conectar con la API");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#1e293b",
        padding: "40px",
        borderRadius: "12px",
        width: "350px",
        color: "white"
      }}>
        <h2>Zero Trust Security</h2>
        <p>Iniciar sesión</p>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px", boxSizing: "border-box" }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px", boxSizing: "border-box" }}
        />

        <button type="submit" style={{
          width: "100%",
          padding: "12px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
