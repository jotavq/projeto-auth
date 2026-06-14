import { useAuth } from "../hooks/useAuth";


// paga dados de usuario e função de logout do contexto
const DashboardPage = () => {
  const { user, logout } = useAuth();

  // formata data
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("pt-BR")
    : "-";

  return (
    <div style={styles.page}>
      {/* ── Navbar ── */}
      <nav style={styles.navbar}>
        <span style={styles.navLogo}>AccessControl</span>

        <div style={styles.navRight}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span style={styles.userName}>{user?.name}</span>
          </div>
          <button onClick={logout} style={styles.logoutBtn}>
            Sair
          </button>
        </div>
      </nav>

      {/* ── Conteúdo principal ── */}
      <main style={styles.main}>
        {/* Saudação */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            Bem-vindo, <span style={styles.titleAccent}>{user?.name}</span>!
          </h1>
          <p style={styles.subtitle}>Resumo da sua conta.</p>
        </div>

        {/* Cards de status — efeito afundado */}
        <div style={styles.cardsGrid}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>✓</div>
            <div style={styles.cardInfo}>
              <span style={styles.cardLabel}>Status</span>
              <span style={styles.cardValue}>Conta Ativa</span>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon}>@</div>
            <div style={styles.cardInfo}>
              <span style={styles.cardLabel}>Email</span>
              <span style={styles.cardValue}>Verificado</span>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon}>#</div>
            <div style={styles.cardInfo}>
              <span style={styles.cardLabel}>Membro desde</span>
              <span style={styles.cardValue}>{memberSince}</span>
            </div>
          </div>
        </div>

        {/* Card de detalhes */}
        <div style={styles.detailsCard}>
          <h2 style={styles.detailsTitle}>Informações da conta</h2>

          <div style={styles.detailsGrid}>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Nome completo</span>
              <span style={styles.detailValue}>{user?.name}</span>
            </div>
            <div style={styles.divider} />

            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Email</span>
              <span style={styles.detailValue}>{user?.email}</span>
            </div>
            <div style={styles.divider} />

            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>ID da conta</span>
              <span
                style={{ ...styles.detailValue, ...styles.detailValueMono }}
              >
                {user?.id}
              </span>
            </div>
            <div style={styles.divider} />

            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Membro desde</span>
              <span style={styles.detailValue}>{memberSince}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// ── Estilos ────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "var(--bg-primary)",
  },

  // Navbar
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.85rem 1.5rem",
    backgroundColor: "var(--bg-secondary)",
    borderBottom: "1px solid var(--border-color)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navLogo: {
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "var(--text-primary)",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "var(--accent-blue)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: 500,
    color: "#fff",
  },
  userName: {
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
  },
  logoutBtn: {
    padding: "0.3rem 0.75rem",
    backgroundColor: "transparent",
    border: "1px solid var(--border-strong)",
    borderRadius: "6px",
    color: "var(--text-muted)",
    cursor: "pointer",
    fontSize: "0.75rem",
    transition: "var(--transition)",
  },

  // Conteúdo
  main: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
  },
  header: {
    marginBottom: "1.75rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 500,
    color: "var(--text-primary)",
    marginBottom: "0.25rem",
  },
  titleAccent: {
    color: "var(--accent-blue)",
  },
  subtitle: {
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
  },

  // Cards de status — afundados
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0.75rem",
    marginBottom: "0.75rem",
  },
  card: {
    backgroundColor: "var(--bg-card)",
    border: "1px solid var(--border-color)",
    borderRadius: "10px",
    padding: "1rem 1.1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
    // Efeito afundado: sombra vai pra dentro do elemento
    boxShadow:
      "inset 0 2px 6px rgba(0,0,0,0.5), inset 0 1px 2px rgba(0,0,0,0.8)",
  },
  cardIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    backgroundColor: "rgba(45, 127, 249, 0.08)",
    border: "1px solid rgba(45, 127, 249, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--accent-blue)",
    fontSize: "0.9rem",
    flexShrink: 0,
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  cardLabel: {
    fontSize: "0.65rem",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  cardValue: {
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "var(--text-primary)",
  },

  // Card de detalhes
  detailsCard: {
    backgroundColor: "var(--bg-elevated)",
    border: "1px solid var(--border-color)",
    borderRadius: "10px",
    padding: "1.25rem 1.4rem",
    marginTop: "0.75rem",
  },
  detailsTitle: {
    fontSize: "0.7rem",
    fontWeight: 500,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    marginBottom: "1rem",
  },
  detailsGrid: {
    display: "flex",
    flexDirection: "column",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.6rem 0",
  },
  detailLabel: {
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
  },
  detailValue: {
    fontSize: "0.8rem",
    color: "var(--text-primary)",
    fontWeight: 500,
  },
  // Aplicado junto com detailValue via spread no ID da conta
  detailValueMono: {
    fontFamily: "monospace",
    fontSize: "0.7rem",
    color: "var(--text-muted)",
    fontWeight: 400,
  },
  divider: {
    height: "1px",
    backgroundColor: "var(--border-color)",
  },
};

export default DashboardPage;
