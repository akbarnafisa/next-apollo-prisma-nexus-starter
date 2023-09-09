import { PrismaClient } from '@prisma/client';
import { Claims, Session } from "@auth0/nextjs-auth0";

export interface Context {
  prisma: PrismaClient;
  user?: Claims
  accessToken?: Session['accessToken']
}
