
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim(),
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          response.status === 401
            ? "Correo o contraseña incorrectos."
            : data.message || "No fue posible iniciar sesión."
        );
        return;
      }

      if (!data.token || !data.user) {
        setError("La respuesta del servidor no es válida.");
        return;
      }

      login(data.user, data.token);
      navigate("/dashboard", { replace: true });

    } catch (err) {
      setError(
        "No se pudo conectar con el servidor. Inténtalo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">

      {/* PANEL IZQUIERDO */}
      <section className="login-showcase">

        <div className="login-brand">
          <div className="login-brand-icon">
            🛡️
          </div>

          <div>
            <div className="login-brand-name">
              ZERO TRUST
            </div>

            <div className="login-brand-subtitle">
              SECURITY PLATFORM
            </div>
          </div>
        </div>

        <div className="login-showcase-content">

          <div className="login-eyebrow">
            ◈ PLATAFORMA DE CONTROL DE ACCESO
          </div>

          <h1>
            La seguridad comienza
            <span> con tu identidad.</span>
          </h1>

          <p>
            Una plataforma diseñada bajo los principios
            de Zero Trust para gestionar el acceso
            a recursos protegidos mediante autenticación
            y autorización.
          </p>

          <div className="login-features">

            <div className="login-feature">
              <div className="login-feature-icon">
                🔐
              </div>

              <div>
                <strong>Autenticación basada en JWT</strong>
                <p>
                  Validación de sesiones mediante
                  tokens de acceso.
                </p>
              </div>
            </div>

            <div className="login-feature">
              <div className="login-feature-icon">
                🛡️
              </div>

              <div>
                <strong>Control de acceso por roles</strong>
                <p>
                  Permisos diferenciados para
                  administradores y usuarios.
                </p>
              </div>
            </div>

            <div className="login-feature">
              <div className="login-feature-icon">
                🌐
              </div>

              <div>
                <strong>Arquitectura distribuida</strong>
                <p>
                  Comunicación entre Frontend y
                  Backend a través de una red privada.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="login-showcase-footer">
          Zero Trust Security · Proyecto de arquitectura segura
        </div>

      </section>

      {/* PANEL DERECHO */}
      <section className="login-form-section">

        <div className="login-form-container">

          <div className="login-form-header">
            <h2>Bienvenido de nuevo</h2>

            <p>
              Introduce tus credenciales para acceder
              a tu panel de control.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="login-field">
              <label htmlFor="login-email">
                Correo electrónico
              </label>

              <div className="login-input-wrap">
                <input
                  id="login-email"
                  className="login-input"
                  type="email"
                  placeholder="nombre@universidad.edu.mx"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  maxLength={254}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="login-password">
                Contraseña
              </label>

              <div className="login-input-wrap">
                <input
                  id="login-password"
                  className="login-input login-password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                />

                <button
                  type="button"
                  className="login-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                  aria-pressed={showPassword}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error" role="alert">
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading
                ? "Verificando credenciales..."
                : "Iniciar sesión →"}
            </button>

          </form>

          <div className="login-security-note">
            <span>🔒</span>
            Acceso sujeto a verificación de identidad y permisos
          </div>

          <div className="login-form-footer">
            Zero Trust Security Platform
            <p>
              Acceso exclusivo para usuarios autorizados.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}

export default Login;
