import crypto from "crypto";
import { Request, Response } from "express";
import argon2 from "argon2";
import User from "../models/User";
import { generateToken } from "../utils/tokenUtils";
import {
  IRegisterBody,
  ILoginBody,
  IUserPublic,
  IForgotPasswordBody,
  IResetPasswordBody,
} from "../types/index";

//===========================
// Registro de usuarios
//===========================

export const register = async (
  req: Request<{}, {}, IRegisterBody>,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Preencha todos os campos" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        message: "Senha deve ter no minimo 6 caracteres",
      });
      return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(409).json({ message: "Este email já esta em uso" });
      return;
    }

    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const userPublic: IUserPublic = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: userPublic,
    });
  } catch (err) {
    if (err instanceof Error && err.message.includes("E11000")) {
      res.status(409).json({ message: "Este email já está em uso" });
      return;
    }

    const message =
      err instanceof Error ? err.message : "Erro interno servidor";
    res.status(500).json({ message });
  }
};

// =================================
//            Login
//==================================

export const login = async (
  req: Request<{}, {}, ILoginBody>,
  res: Response,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email ou senha são obrigatorios" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Email ou senha incorretos" });
      return;
    }

    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Email ou senha incorretos" });
      return;
    }

    const token = generateToken(user._id.toString());

    const userPublic: IUserPublic = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: userPublic,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro interno do servidor";
    res.status(500).json({ message });
  }
};

// =========================
//    GET ME
//==========================

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      res.status(400).json({ message: "Usuario não encontrado" });
      return;
    }

    res.status(200).json({ user });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro interno no servidor";
    res.status(500).json({ message });
  }
};

// =====================================
// FORGOT PASSWORD
// ====================================

export const forgotPassword = async (
  req: Request<{}, {}, IForgotPasswordBody>,
  res: Response,
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email é obrigatorio" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(200).json({
        message: "Se este email estiver cadastro, você recebera as intruções",
      });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 30 * 60 * 1000);
    const hashedResetToken = await argon2.hash(resetToken);

    user.resetToken = hashedResetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    res.status(200).json({
      message: "Token de redefinição gerado com sucesso.",
      resetToken,
      expiresIn: "30m",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro interno do servidor";
    res.status(500).json({ message });
  }
};

//====================================
// RESET PASSWORD
//====================================

export const resetPassword = async (
  req: Request<{}, {}, IResetPasswordBody>,
  res: Response,
): Promise<void> => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({ message: "Token e nova senha são obrigatorios" });
      return;
    }

    if (newPassword.length < 6) {
      res
        .status(400)
        .json({ message: "Senha deve ter no minimo 6 caracteres" });
      return;
    }

    const user = await User.findOne({
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      res.status(400).json({ message: "Token invalido ou expirado" });
      return;
    }

    const isTokenValid = await argon2.verify(user.resetToken ?? "", token);

    if (!isTokenValid) {
      res.status(400).json({ message: "Token invalido ou expirado" });
      return;
    }

    const hashedPassword = await argon2.hash(newPassword);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: "Sua senha foi redefinida com sucesso." });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro interno do servidor";
    res.status(500).json({ message });
  }
};
