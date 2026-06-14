// Interface Base do Usuario (dados puro)

export interface IUser {
  name: string;
  email: string;
  password: string;
  resetToken: string | null;
  resetTokenExpiry: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Dados retornado pela API (sem senha)

export interface IUserPublic {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Payload do JWT

export interface IJwtPayload {
  id: string;
}

// Corpo da requisicao de registro

export interface IRegisterBody {
  name: string;
  email: string;
  password: string;
}

// Corpo da requisição de login

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IForgotPasswordBody {
  email: string;
}

export interface IResetPasswordBody {
  token: string;
  newPassword: string;
}
