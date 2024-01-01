<script setup lang="ts">
  import { computed } from 'vue';
  import { set as setDate, sub as substractDate } from 'date-fns';
  import { useTransactionsStore } from '~/stores/transactions';

  type TMonthSummaryCardProps = {
    monthIndex: number;
    year: number;
    income: number;
    expenses: number;
  };
  const props = defineProps<TMonthSummaryCardProps>();
  const transactionsStore = useTransactionsStore();
  const isTotalNegative = computed(() => props.income + props.expenses < 0);
  const expensesRate = computed(() => ((props.expenses * 100) / props.income) * -1);
  const badgeType = computed(() => {
    if (expensesRate.value >= 80) return 'error';
    if (expensesRate.value >= 67) return 'warning';
    if (expensesRate.value >= 50) return 'info';
    if (expensesRate.value >= 0) return 'success';

    return 'default';
  });

  const onCardClick = () => {
    const nextMonthFirstDate = setDate(new Date(), { year: props.year, month: props.monthIndex + 1, date: 1, hours: 23, minutes: 59 });
    transactionsStore.updateFilters({
      startDate: setDate(new Date(), { year: props.year, month: props.monthIndex , date: 1, hours: 4 }),
      endDate: substractDate(nextMonthFirstDate, { days: 1 }),
    });
  };
</script>

<template>
  <div
    class="relative rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-slate-100 cursor-pointer"
    @click="onCardClick"
  >
    <div class="flex flex-col space-y-1.5 p-5">
      <div class="flex justify-between">
        <h3 class="inline-block text-xl font-semibold leading-none tracking-tight mr-2">{{ $t('utilities.months.' + monthIndex) }}</h3>
        <Badge :type="badgeType">
          {{ (100 - (expensesRate || 100)).toFixed(2) }}%
        </Badge>
      </div>
      <div
        class="text-2xl font-bold mt-2"
        :class="{ 'text-red-500': isTotalNegative}"
      >
        <MoneyAmount :amount="income + expenses" />
      </div>
    </div>
    <div class="p-5">
      <div class="flex flex-col space-y-2">
        <div>Total Income: <span class="text-green-600">{{ income.toFixed(2) }}€</span></div>
        <div>Total Expenses: <span class="text-red-600">{{ expenses.toFixed(2) }}€</span></div>
      </div>
    </div>
  </div>
</template>
