import sortBy from 'lodash/sortBy';
import { getTransactionTypes } from '~/server/dal/transaction-type';
import { publicProcedure } from '~/server/trpc/trpc';

export const getTransactionTypesProcedure = publicProcedure
    .query(async () => {
      const types = await getTransactionTypes();
      return { types: sortBy(types, (type) => type.code) };
    });
