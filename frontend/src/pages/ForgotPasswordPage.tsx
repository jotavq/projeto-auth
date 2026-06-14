import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/api/auth/forgot-password", { email });

      setToken(response.data.resetToken);
      setSubmitted(true);
    } catch (err: unknown) {
      const axiosError = err as any;
      if (axiosError?.response?.data?.message) {
        setError(axiosError.response.data.message);
      } else {
        setError("Erro ao processar solicitação");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted && token) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.card}>
          <span style={styles.logoText}>AccessControl</span>

          <div style={styles.successIcon}>✅</div>

          <h2 style={styles.title}>Token gerado!</h2>
          <p style={styles.subtitle}>
            Em produção, este token seria enviado para seu email. Copie-o abaixo
            para redefinir sua senha.
          </p>

          {/* Exibe o token para copiar */}
          <div style={styles.tokenBox}>
            {" "}
            {/* 6 */}
            <span style={styles.tokenLabel}>Seu token:</span>
            <code style={styles.tokenValue}>{token}</code>
          </div>

          <Link
            to="/reset-password"
            style={{ textDecoration: "none", width: "100%" }}
          >
            <AuthButton fullWidth>Redefinir minha senha</AuthButton>
          </Link>

          <p style={styles.backLink}>
            <Link to="/login" style={styles.link}>
              Voltar ao login
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <span style={styles.logoText}>AccessControl</span>

        <h2 style={styles.title}>Esqueceu a senha?</h2>
        <p style={styles.subtitle}>
          Digite seu email e enviaremos um token para redefinir sua senha.
        </p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <AuthInput
            label="Email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <AuthButton type="submit" fullWidth isLoading={isLoading}>
            Gerar token de redefinição
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
  successIcon: {
    fontSize: "2.5rem",
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
  // Caixa que exibe o token
  tokenBox: {
    backgroundColor: "var(--bg-input)",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    padding: "1rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  tokenLabel: {
    fontSize: "0.75rem",
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tokenValue: {
    fontSize: "0.75rem",
    color: "var(--accent-blue)",
    wordBreak: "break-all", // 7
    fontFamily: "monospace",
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

export default ForgotPasswordPage;
