import { z } from 'zod';
import { sub } from 'date-fns';
import { publicProcedure } from '~/server/trpc/trpc';
import { getTransactions } from '~/server/dal/transaction';

export const getTransactionsProcedure = publicProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }).optional(),
    )
    .query(async ({ input }) => {
      const startDate = input?.startDate ? new Date(input.startDate) : sub(new Date(), { months: 1 });
      const endDate = input?.endDate ? new Date(input.endDate) : new Date();

      console.log('===> Transactions filter dates:', { startDate, endDate });

      const transactions = await getTransactions({
        startDate,
        endDate,
      });

      return {
        transactions
      };
    });
