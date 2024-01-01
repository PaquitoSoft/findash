import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client';
import type { AppRouter } from '~/server/trpc/routes';

export default defineNuxtPlugin(() => {
  /*
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const trpcClient = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  });

  return {
    provide: {
      trpcClient,
    },
  };
});
