import { z } from 'zod';
import { sub } from 'date-fns';
import { publicProcedure } from '~/server/trpc/trpc';
import { getTransactions } from '~/server/dal/transaction';
import { TFinancialRecord } from '~/types';
import { getTransactionTypesMap } from '~/server/dal/transaction-type';

type TOutput = {
  transactions: TFinancialRecord[];
};

export const getTransactionsProcedure = publicProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        transactionTypesIds: z.string().array().optional(),
      }).optional(),
    )
    .query<TOutput>(async ({ input }) => {
      const startDate = input?.startDate ? new Date(input.startDate) : sub(new Date(), { months: 1 });
      const endDate = input?.endDate ? new Date(input.endDate) : new Date();
      const transactionTypesIds = input?.transactionTypesIds;

      const [transactions, typesMap] = await Promise.all([
        getTransactions({
          startDate,
          endDate,
          transactionTypesIds: transactionTypesIds && transactionTypesIds.length > 0 ? transactionTypesIds : undefined,
        }),
        getTransactionTypesMap(),
      ]);

      return {
        transactions: transactions.map(transaction => ({
          id: transaction.id,
          timestamp: transaction.timestamp,
          amount: transaction.amount,
          description: transaction.description,
          categories: transaction.categoriesIds.map(categoryId => typesMap[categoryId]),
        }))
      };
    });
