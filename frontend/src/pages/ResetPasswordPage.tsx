import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");

    // Validação local
    if (!form.token || !form.newPassword || !form.confirmPassword) {
      setError("Preencha todos os campos");
      return;
    }
    if (form.newPassword.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setIsLoading(true);

    try {
      await api.post("/api/auth/reset-password", {
        token: form.token,
        newPassword: form.newPassword,
      });

      navigate("/login", {
        state: { message: "Senha redefinida com sucesso! Faça login." },
      });
    } catch (err: unknown) {
      const axiosError = err as any;
      if (axiosError?.response?.data?.message) {
        setError(axiosError.response.data.message);
      } else {
        setError("Erro ao redefinir senha");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <span style={styles.logoText}>AccessControl</span>

        <h2 style={styles.title}>Redefinir senha</h2>
        <p style={styles.subtitle}>
          Cole o token recebido e defina sua nova senha.
        </p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <AuthInput
            label="Token de redefinição"
            name="token"
            type="text"
            placeholder="Cole o token aqui"
            value={form.token}
            onChange={handleChange}
          />

          <AuthInput
            label="Nova senha"
            name="newPassword"
            type="password"
            placeholder="••••••••"
            value={form.newPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />

          <AuthInput
            label="Confirmar nova senha"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />

          <AuthButton type="submit" fullWidth isLoading={isLoading}>
            Redefinir senha
          </AuthButton>
        </form>

        <p style={styles.backLink}>
          <Link to="/login" style={styles.link}>
            Voltar ao login
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "var(--bg-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "var(--bg-card)",
    border: "1px solid var(--border-color)",
    borderRadius: "16px",
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  logoText: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "var(--text-primary)",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    textAlign: "center",
    lineHeight: 1.6,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  },
  errorBox: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    color: "#ef4444",
    fontSize: "0.875rem",
    width: "100%",
    textAlign: "center",
  },
  backLink: {
    fontSize: "0.875rem",
    color: "var(--text-secondary)",
    marginTop: "0.5rem",
  },
  link: {
    color: "var(--accent-blue)",
    textDecoration: "none",
    fontWeight: 600,
  },
};

export default ResetPasswordPage;
