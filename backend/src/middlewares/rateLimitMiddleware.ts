import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    message: "Muitas requisições, tente novamente em 15 minutos",
  },
  standardHeaders: true, 
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: {
    message: "Muitas tentativas, tente novamente em 15 minutos",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
