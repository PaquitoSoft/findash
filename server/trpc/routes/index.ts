import { createNuxtApiHandler } from 'trpc-nuxt';
import { publicProcedure, router } from '~/server/trpc/trpc';
import { z } from 'zod';
import { lastMonthsSumaryProcedure } from './last-months-summary';
import { getTransactionsProcedure } from './get-transactions';
import { getTransactionTypesProcedure } from './get-transaction-types';
import { updateTransactionProcedure } from './update-transaction';

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        name: z.string().nullish(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.name || 'world'}!`
      };
    }),
  lastMonthsSumary: lastMonthsSumaryProcedure,
  getTransactions: getTransactionsProcedure,
  getTransactionTypes: getTransactionTypesProcedure,
  updateTransaction: updateTransactionProcedure,
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
export default createNuxtApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
