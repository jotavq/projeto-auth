import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { IAuthContext } from "../types/index";

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }

  return context;
};
