// Usuario retornado pela API

export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: string; // create precisa ser string, porque o JSON vai converter Date para string
}

// Dados do formulario de Login

export interface ILoginForm {
  email: string;
  password: string;
}

// Dados formulario de Registro

export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string; // validar a confirmação de senha de envia pra API
}

// reposta da API de auth

export interface IAuthResponse {
  message: string;
  token: string;
  user: IUser;
}

// Estado do contexto de autenticação

export interface IAuthContext {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: ILoginForm) => Promise<void>;
  register: (data: IRegisterForm) => Promise<void>;
  logout: () => void;
}
