import { PrismaClient } from '@prisma/client';

// Using const to silence ESLint (no-var) while still maintaining global access
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
} 