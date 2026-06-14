import type { ButtonHTMLAttributes, ReactNode } from "react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const AuthButton = ({
  children,
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  disabled,
  ...rest
}: AuthButtonProps) => {
  const isPrimary = variant === "primary";

  return (
    <button
      style={{
        ...styles.base,
        ...(isPrimary ? styles.primary : styles.secondary),
        ...(fullWidth ? { width: "100%" } : {}),
        opacity: disabled || isLoading ? 0.7 : 1,
        cursor: disabled || isLoading ? "not-allowed" : "pointer",
      }}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? "..." : children} 
    </button>
  );
};

const styles: Record<string, React.CSSProperties> = {
  base: {
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    fontSize: "0.95rem",
    fontWeight: 600,
    transition: "var(--transition)",
    cursor: "pointer",
    letterSpacing: "0.3px",
  },
  primary: {
    backgroundColor: "var(--accent-blue)",
    color: "#ffffff",
  },
  secondary: {
    backgroundColor: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid var(--border-color)",
  },
};

export default AuthButton;
