import type { InputHTMLAttributes } from "react";

// 1 — Interface das props estendendo o input HTML nativo
interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string; // mensagem de erro opcional
  icon?: string; // emoji ou símbolo opcional
}

// 2 — Componente funcional tipado
const AuthInput = ({ label, error, icon, ...rest }: AuthInputProps) => {
  return (
    <div style={styles.wrapper}>
      {/* Label do campo */}
      <label style={styles.label}>{label}</label>

      {/* Container do input com ícone */}
      <div style={styles.inputContainer}>
        {icon && <span style={styles.icon}>{icon}</span>}
        <input
          style={{
            ...styles.input,
            paddingLeft: icon ? "2.5rem" : "1rem",
            borderColor: error ? "#ef4444" : "var(--border-color)",
          }}
          {...rest}
        />
      </div>

      {/* Mensagem de erro */}
      {error && <span style={styles.error}>{error}</span>}
    </div>
  );
};

// 7 — Estilos inline com tipagem
const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "100%",
  },
  label: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    fontWeight: 500,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  icon: {
    position: "absolute",
    left: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "0.9rem",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    backgroundColor: "var(--bg-input)",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
    transition: "var(--transition)",
  },
  error: {
    fontSize: "0.8rem",
    color: "#ef4444",
  },
};

export default AuthInput;
