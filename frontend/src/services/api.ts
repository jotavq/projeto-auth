import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: injects auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor: handles 401 errors for expired tokens
api.interceptors.response.use(
  (response) => response,

  (err) => {
    // Endpoints de autenticação podem retornar 401 por credenciais inválidas,
    // não devem redirecionar para login
    const isAuthEndpoint =
      err.config?.url?.includes("/auth/login") ||
      err.config?.url?.includes("/auth/register") ||
      err.config?.url?.includes("/auth/forgot-password") ||
      err.config?.url?.includes("/auth/reset-password");

    if (err.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

export default api;
