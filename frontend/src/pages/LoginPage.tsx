// src/pages/LoginPage.tsx

import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import type { ILoginForm } from "../types/index";

const LoginPage = () => {
  const [form, setForm] = useState<ILoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(form);
    } catch (err: unknown) {
      const axiosError = err as any;
      if (axiosError?.response?.data?.message) {
        setError(axiosError.response.data.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao fazer login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.leftPanel}>
        <div style={styles.leftContent}>
          <h1 style={styles.leftTitle}>
            Projeto de autenticação
            <br />
            <span style={styles.leftTitleAccent}>FullStack</span>
          </h1>

          <p style={styles.leftSubtitle}>
            Node.js · Express · MongoDB
            <br />
            JWT · Argon2 · TypeScript
          </p>

          <div style={styles.mark}>
            <div style={styles.markIcon}>
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="var(--accent-blue)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <div style={styles.markLines}>
              <div style={{ ...styles.markLine, width: "80px" }} />
              <div
                style={{ ...styles.markLine, width: "52px", opacity: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <div style={styles.logoContainer}>
            <span style={styles.logoText}>Login</span>
          </div>

          <div style={styles.toggleContainer}>
            <button style={{ ...styles.toggleBtn, ...styles.toggleBtnActive }}>
              Entrar
            </button>
            <Link to="/register" style={{ textDecoration: "none", flex: 1 }}>
              <button style={{ ...styles.toggleBtn, width: "100%" }}>
                Criar conta
              </button>
            </Link>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <AuthInput
              label="Email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <AuthInput
              label="Senha"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />

            <div style={styles.forgotContainer}>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Esqueceu a senha?
              </Link>
            </div>

            <AuthButton type="submit" fullWidth isLoading={isLoading}>
              Entrar
            </AuthButton>
          </form>
        </div>
      </div>
    </div>
  );
};

// ── Estilos ────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  pageContainer: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "var(--bg-primary)",
  },

  leftPanel: {
    flex: 1.3,
    backgroundColor: "var(--bg-secondary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem",
    position: "relative",
    overflow: "hidden",
  },
  leftContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "420px",
  },
  leftTitle: {
    fontSize: "3rem",
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "-0.5px",
    color: "var(--text-primary)",
    marginBottom: "1rem",
  },
  leftTitleAccent: {
    color: "var(--accent-blue)",
  },
  leftSubtitle: {
    fontSize: "1rem",
    color: "var(--text-secondary)",
    lineHeight: 1.7,
    marginBottom: "4rem",
  },

  mark: {
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",
  },
  markIcon: {
    width: "56px",
    height: "56px",
    border: "1px solid var(--border-strong)",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  markLines: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  markLine: {
    height: "1px",
    backgroundColor: "var(--border-strong)",
    borderRadius: "1px",
  },

  rightPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem",
    backgroundColor: "var(--bg-primary)",
    boxShadow: "-20px 0px 60px rgba(0, 0, 0, 0.5)",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "transparent",
    borderRadius: "16px",
    padding: "2.5rem",
    border: "none",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  logoText: {
    fontSize: "0.78rem",
    fontWeight: 500,
    color: "var(--text-primary)",
    letterSpacing: "2.5px",
    textTransform: "uppercase",
  },

  toggleContainer: {
    display: "flex",
    backgroundColor: "var(--bg-card)",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    padding: "3px",
    marginBottom: "1.75rem",
    // Mesmo efeito afundado dos cards do dashboard
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)",
  },
  toggleBtn: {
    flex: 1,
    padding: "0.55rem",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "transparent",
    color: "var(--text-secondary)",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: 500,
    transition: "var(--transition)",
  },
  toggleBtnActive: {
    backgroundColor: "var(--accent-blue)",
    color: "#ffffff",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  forgotContainer: {
    textAlign: "right",
    marginTop: "-0.25rem",
  },
  forgotLink: {
    color: "var(--text-muted)",
    fontSize: "0.78rem",
    textDecoration: "none",
  },

  errorBox: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    color: "#ef4444",
    fontSize: "0.875rem",
    marginBottom: "1rem",
  },
};

export default LoginPage;
