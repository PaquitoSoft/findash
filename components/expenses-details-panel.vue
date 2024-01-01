<script setup lang="ts">
  // import type { TFinancialRecord } from '~/types';

  import { useTransactionsStore } from '~/stores/transactions';

  // type TProps = {
  //   totalAmount: number;
  //   transactions: TFinancialRecord[];
  // };
  const transactionsStore = useTransactionsStore();

  // defineProps<TProps>();
</script>

<template>
  <div>
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div class="flex-col space-y-1.5 p-6 flex justify-between items-center">
        <h3 class="text-2xl font-semibold leading-none tracking-tight text-left mb-4">Expenses Details</h3>
        <!-- <div
          class="text-4xl font-semibold text-right"
          :class="{ 'text-red-600': totalAmount < 0, 'text-green-600': totalAmount >= 0}"
        >
          <MoneyAmount :amount="totalAmount" />
        </div> -->
        <div class="flex gap-8">
          <div class="flex flex-col items-center border p-4 rounded">
            <span class="text-2xl font-semibold text-right">{{ transactionsStore.transactions.length }}</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">Transactions</span>
          </div>
          <div class="flex flex-col items-center border p-4 rounded">
            <span class="text-2xl font-semibold text-right">
              <MoneyAmount :amount="transactionsStore.totalIncome" />
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">Income</span>
          </div>
          <div class="flex flex-col items-center border p-4 rounded">
            <span class="text-2xl font-semibold text-right">
              <MoneyAmount :amount="transactionsStore.totalExpenses" />
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">Expenses</span>
          </div>
          <div class="flex flex-col items-center border p-4 rounded">
            <span
              class="text-2xl font-semibold text-right"
              :class="{ 'text-red-600': transactionsStore.totalAmount < 0, 'text-green-600': transactionsStore.totalAmount >= 0}"
            >
              <MoneyAmount :amount="transactionsStore.totalAmount" />
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">Balance</span>
          </div>
        </div>
      </div>
      <div class="p-6">
        <FilterByCategoryControl />
        <div class="relative w-full overflow-auto mt-8">
          <FinancialRecordsTable :records="transactionsStore.transactions"/>
        </div>
      </div>
    </div>
  </div>
</template>
