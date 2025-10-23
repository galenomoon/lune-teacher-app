import { z } from "zod";

export const loginSchema = z.object({
  cpf: z.string().min(1, "CPF é obrigatório"),
  password: z.string().min(4, "Senha deve ter pelo menos 4 caracteres").min(1, "Senha é obrigatória"),
});

export type LoginSchema = z.infer<typeof loginSchema>;