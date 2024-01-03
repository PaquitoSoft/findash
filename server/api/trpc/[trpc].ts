import { createNuxtApiHandler } from 'trpc-nuxt';
import { createContext } from '~/server/trpc/context';
import { appRouter } from '~/server/trpc/routes';

// export API handler
export default createNuxtApiHandler({
  router: appRouter,
  createContext,
  responseMeta: (options) => {
    // console.log('===> responseMeta#', { options });

    if (options.paths?.[0] === 'getTransactionTypes') {
      return {
        headers: {
          // Cache the result 5 minutes in the browser and allow to use
          // a stale value for an hour. After that hour, the browser
          // will need to wait for a fresh value when requesting again
          'cache-control': 'max-age=300, stale-while-revalidate=3600'
        }
      };
    }

    return {};
  },
});
