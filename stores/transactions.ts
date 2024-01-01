import { defineStore } from 'pinia';
import { sub } from 'date-fns';
import type { TFinancialRecord } from '~/types';

const START_DATE_STORAGE_KEY = '_tf-sd';
const END_DATE_STORAGE_KEY = '_tf-ed';

type TTransactionsState = {
  transactions: TFinancialRecord[],
  filters: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

const isBrowser = () => typeof window !== 'undefined';

const fakeIdleCallback = (callback: () => void) => setTimeout(callback, 500);
const executeOnIdle = typeof window !== 'undefined' ? (window.requestIdleCallback || fakeIdleCallback) : fakeIdleCallback;

const writeFilters = (filters: TTransactionsState['filters']): void => {
  filters.startDate && localStorage.setItem(START_DATE_STORAGE_KEY, filters.startDate.getTime().toString());
  filters.endDate && localStorage.setItem(END_DATE_STORAGE_KEY, filters.endDate.getTime().toString());
};

const readFilters = (): TTransactionsState['filters'] => {
  const startDateRaw = localStorage.getItem(START_DATE_STORAGE_KEY);
  const endDateRaw = localStorage.getItem(END_DATE_STORAGE_KEY);
  return {
    startDate: startDateRaw ? new Date(parseInt(startDateRaw, 10)) : null,
    endDate: endDateRaw ? new Date(parseInt(endDateRaw, 10)) : null,
  };
};

export const useTransactionsStore = defineStore('transactionsStore', {
  state: (): TTransactionsState => {
    const filters = isBrowser() ? readFilters() : { startDate: null, endDate: null };
    if (!filters.startDate) {
      filters.endDate = new Date();
      filters.startDate = sub(filters.endDate, { months: 1 });
    }
    return {
      transactions: [],
      filters,
    };
  },
  getters: {
    totalIncome: (state) => state.transactions.reduce((acc, transaction) => acc + (transaction.amount > 0 ? transaction.amount : 0), 0),
    totalExpenses: (state) => state.transactions.reduce((acc, transaction) => acc + (transaction.amount < 0 ? (transaction.amount * -1) : 0), 0),
    totalAmount: (state) => state.transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
  },
  actions: {
    async fetch() {
      const { $trpcClient } = useNuxtApp();
      const { data } = await $trpcClient.getTransactions.useQuery({
        startDate: this.filters.startDate?.toISOString(),
        endDate: this.filters.endDate?.toISOString(),
      });

      this.transactions = data.value?.transactions || [];
    },
    updateFilters(dates: { startDate: Date, endDate: Date }) {
      this.filters = dates;
      this.fetch();
      executeOnIdle(() => writeFilters(dates));
      console.log('Filters updated:', { dates });
    }
  }
});
