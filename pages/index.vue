<script setup lang="ts">
  import { useNuxtApp } from 'nuxt/app';
  import { useTransactionsStore } from '~/stores/transactions';

  const { $trpcClient } = useNuxtApp();
  const transactionsStore = useTransactionsStore();
  const { data: monthsSummaryData } = await $trpcClient.lastMonthsSumary.useQuery();
  transactionsStore.fetch();
</script>
<template>
  <div class="flex flex-col w-full min-h-screen">
    <AppHeader />

    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div class="grid gap-6 md:grid-cols-6">
        <MonthSummaryCard
          v-for="summary in monthsSummaryData?.monthsSummaries"
          :key="summary.index"
          :monthIndex="summary.index"
          :year="summary.year"
          :income="summary.income"
          :expenses="summary.expenses"
        />
      </div>

      <!-- <div class="grid gap-6 md:grid-cols-2">
        <TotalsChartCard :transactions="transactionsStore.transactions" />
        <TransactionsTypesChartCard :transactions="transactionsStore.transactions" />
      </div> -->

      <ExpensesDetailsPanel />
    </main>
  </div>
</template>
