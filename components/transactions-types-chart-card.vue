<script setup lang="ts">
  import { Pie } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
  import { transactionTypeColor } from '~/utils/mappers';
  import type { TFinancialRecord } from '~/types';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

  // const transactionTypeColorMapping: Record<string, string> = {
  //   payment: '#22c55e',
  //   deposit: '#3b82f6 ',
  //   withdrawal: '#ec4899',
  //   invoice: '#f59e0b',
  //   default: '#6b7280',
  // };

  type TChartCardProps = {
    transactions: TFinancialRecord[];
  };
  type TChartDataProps = {
    labels: string[];
    datasets: {
      backgroundColor: string[];
      data: number[];
    }[];
  };
  const props = defineProps<TChartCardProps>();

  const chartData = (props.transactions || []).reduce<TChartDataProps>((acc, transaction) => {
    if (transaction.amount >= 0) return acc;

    transaction.categories.forEach(transactionType => {
      const index = acc.labels.indexOf(transactionType.code);
      if (index !== -1) {
        acc.datasets[0].data[index] += transaction.amount;
      } else {
        acc.labels.push(transactionType.code);
        acc.datasets[0].backgroundColor.push(transactionTypeColor(transactionType.code));
        acc.datasets[0].data.push(transaction.amount);
      }
    });

    return acc;
  }, {
    labels: [],
    datasets: [
      {
        backgroundColor: [],
        data: []
      }
    ]
  });
</script>

<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
    <div class="flex flex-col space-y-1.5 p-6">
      <p class="text-sm text-muted-foreground">Expenses by Type</p>
    </div>
    <div class="p-6">
      <Pie
        :data="chartData"
      />
    </div>
  </div>
</template>
