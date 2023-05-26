import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const noteRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ input }) =>
     await prisma.note.create({
        data: {
        note: input.title,
      }
      })
    ),
  list: publicProcedure.query(async () => await prisma.note.findMany()),
  remove: publicProcedure
    .input(
      z.object({
        id: z.bigint(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.note.delete({
        where: {
          id: input.id
        }
      })
    }),
});
