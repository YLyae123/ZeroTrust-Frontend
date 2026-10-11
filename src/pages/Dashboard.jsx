
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const esAdmin = user?.role === "admin";
  const nombre = user?.name || "Usuario";
  const primerNombre = nombre.trim().split(/\s+/)[0];
  const rol = esAdmin ? "Administrador" : "Usuario";

  useEffect(() => {
    const controller = new AbortController();

    async function verificarAcceso() {
      try {
        const response = await fetch("/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("No fue posible validar la sesión");
        }

        const data = await response.json();

        if (controller.signal.aborted) return;

        setMessage(data.message || "Acceso autorizado");
        setStatus("success");
      } catch (err) {
        if (controller.signal.aborted) return;

        setError("Tu sesión no es válida o ha expirado.");
        setStatus("error");
      }
    }

    if (token) {
      verificarAcceso();
    } else {
      setError("No hay una sesión activa.");
      setStatus("error");
    }

    return () => controller.abort();
  }, [token]);

  function cerrarSesion() {
    logout();
    navigate("/login", { replace: true });
  }

  if (status === "loading") {
    return (
      <main className="dashboard" style={{
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div role="status">
          <h2>Zero Trust Security</h2>
          <p>Verificando identidad y permisos...</p>
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="dashboard" style={{
        alignItems: "center",
        justifyContent: "center",
        padding: "24px"
      }}>
        <div className="dashboard-panel">
          <h2>Acceso no autorizado</h2>
          <p>{error}</p>

          <button
            className="dashboard-logout"
            onClick={cerrarSesion}
            style={{ marginTop: "20px" }}
          >
            Volver al inicio de sesión
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">🛡️</div>

          <div>
            <strong>ZERO TRUST</strong>
            <small>SECURITY PLATFORM</small>
          </div>
        </div>

        <nav className="dashboard-nav" aria-label="Navegación principal">
          <span className="dashboard-nav-label">
            MENÚ PRINCIPAL
          </span>

          <div className="dashboard-nav-item active">
            ◈ &nbsp; Panel de control
          </div>
        </nav>

        <div className="dashboard-sidebar-footer">
          Zero Trust Security
          <br />
          Plataforma de acceso seguro · v1.0
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <span className="dashboard-breadcrumb">
            Inicio / Panel de control
          </span>

          <button
            type="button"
            className="dashboard-logout"
            onClick={cerrarSesion}
          >
            Cerrar sesión ↗
          </button>
        </header>

        <section className="dashboard-heading">
          <div className="dashboard-status">
            <span className="dashboard-dot"></span>
            Sesión verificada
          </div>

          <h1>
            Hola, {primerNombre} 👋
          </h1>

          <p>
            {esAdmin
              ? "Bienvenido a tu panel de administración y control de acceso."
              : "Bienvenido a tu espacio personal de acceso seguro."}
          </p>
        </section>

        <section
          className="dashboard-cards"
          aria-label="Información de la sesión"
        >
          <article className="dashboard-card">
            <div className="dashboard-card-icon">👤</div>

            <p className="dashboard-card-label">
              Identidad autenticada
            </p>

            <div className="dashboard-card-value">
              {nombre}
            </div>

            <p className="dashboard-card-detail">
              {user?.email || "Sin correo disponible"}
            </p>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-icon">🛡️</div>

            <p className="dashboard-card-label">
              Nivel de acceso
            </p>

            <div className="dashboard-card-value">
              {rol}
            </div>

            <p className="dashboard-card-detail">
              {esAdmin
                ? "Cuenta con rol administrativo"
                : "Cuenta con rol de usuario"}
            </p>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-icon">🔑</div>

            <p className="dashboard-card-label">
              Autenticación
            </p>

            <div className="dashboard-card-value">
              JWT validado
            </div>

            <p className="dashboard-card-detail">
              Sesión comprobada por la API
            </p>
          </article>
        </section>

        <section className="dashboard-panel">
          <h2>
            {esAdmin
              ? "Centro de administración"
              : "Centro de usuario"}
          </h2>

          <div className="dashboard-check">
            <span className="dashboard-check-icon">✓</span>

            <div>
              <strong>Identidad verificada</strong>
              <p>
                Tu sesión fue validada por el Backend
                mediante un token JWT.
              </p>
            </div>
          </div>

          <div className="dashboard-check">
            <span className="dashboard-check-icon">✓</span>

            <div>
              <strong>Perfil identificado</strong>
              <p>
                {esAdmin
                  ? "Tu cuenta tiene asignado el rol de administrador."
                  : "Tu cuenta tiene asignado el rol de usuario."}
              </p>
            </div>
          </div>

          <div className="dashboard-check">
            <span className="dashboard-check-icon">✓</span>

            <div>
              <strong>Comunicación con la API</strong>
              <p>
                La aplicación recibió una respuesta
                satisfactoria del servicio protegido.
              </p>
            </div>
          </div>

          <p className="dashboard-message" role="status">
            Respuesta del servidor: {message}
          </p>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
