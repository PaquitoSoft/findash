import { z } from 'zod';
import { updateTransaction } from '~/server/dal/transaction';
import { publicProcedure } from '~/server/trpc/trpc';
import { TFinancialRecord } from '~/types';

type TOutput = {
  updatedTransaction: TFinancialRecord;
};

export const updateTransactionProcedure = publicProcedure
  .input(
    z.object({
      id: z.string(),
      timestamp: z.number(),
      amount: z.number(),
      description: z.string(),
      categories: z.object({
        id: z.string(),
        code: z.string(),
        color: z.string()
      }).array(),
    }).optional(),
  )
  .mutation<TOutput>(async ({ input }) => {
    const financialRecord = input as TFinancialRecord;
    await updateTransaction(financialRecord);
    return { updatedTransaction: financialRecord };
  });
