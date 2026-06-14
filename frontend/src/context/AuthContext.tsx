import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type {
  IAuthContext,
  ILoginForm,
  IRegisterForm,
  IUser,
} from "../types/index";

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAuthFromStorage = async () => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (!savedToken || !savedUser) {
        setIsLoading(false);
        return;
      }

      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        await api.get("/api/auth/me");
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthFromStorage();
  }, []);

  // ==============================
  //     FUNÇÃO DE LOGIN
  // ==============================

  const login = async (data: ILoginForm): Promise<void> => {
    const response = await api.post("/api/auth/login", data);
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
    navigate("/dashboard");
  };

  const register = async (data: IRegisterForm): Promise<void> => {
    const { confirmPassword, ...registerData } = data; // removendo o confirmPassword a API não vai precisar
    await api.post("/api/auth/register", registerData);
    navigate("/login");
  };
  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  const value: IAuthContext = {
    user,
    token,
    isAuthenticated: !!token, // converte para boolean null vira false, string vira true
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
