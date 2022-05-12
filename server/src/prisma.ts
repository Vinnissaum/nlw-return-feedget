import { PrismaClient } from "@prisma/client";

//Mostra o log do que esta sendo enviado ao backend
export const prisma = new PrismaClient({
  log: ['query'],
});