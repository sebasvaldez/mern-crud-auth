import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({ required_error: "El nombre de usuario es requerido" }),
  email: z
    .string({ required_error: "Correo electrónico es requerido" })
    .email({ message: "Correo electrónico invalido" }),
  password: z
    .string({
      required_error: "La contrasaseñaes requerida",
    })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(16, {
      message: "La contraseña debe tener un maximo de 16 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Correo electrónico es requerido" })
    .email({ message: "Correo electrónico invalido" }),

  password: z
    .string({
      required_error: "La contrasaseña es requerida ",
    })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(16, {
      message: "La contraseña debe tener un maximo de 16 caracteres",
    })
    
});
