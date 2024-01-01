import { publicProcedure } from '~/server/trpc/trpc';
import { getLastMonthsSummary } from '~/server/dal/transaction';
import { TMonthSummary } from '~/types';

type TResultProps = {
  monthsSummaries: TMonthSummary[];
};

export const lastMonthsSumaryProcedure = publicProcedure
  .query<TResultProps>(async () => {
    const monthsSummaries = await getLastMonthsSummary();

    return {
      monthsSummaries,
    };
  });
