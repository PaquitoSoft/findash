<script setup lang="ts">
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
  import type { TFinancialRecord } from '~/types';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

  type TChartCardProps = {
    transactions: TFinancialRecord[];
  };
  type TChartDataProps = {
    labels: string[];
    datasets: {
      label: string;
      backgroundColor: string[];
      data: number[];
    }[];
  };
  const props = defineProps<TChartCardProps>();

  const chartData = (props.transactions || []).reduce<TChartDataProps>((acc, transaction) => {
    const index = transaction.amount >= 0 ? 0 : 1;
    acc.datasets[0].data[index] += transaction.amount;

    return acc;
  }, {
    labels: ['income', 'expenses'],
    datasets: [
      {
        label: 'Totals',
        backgroundColor: ['rgb(34, 197, 94)', 'rgb(239, 68, 68)'],
        data: [0, 0]
      }
    ]
  });
  chartData.datasets[0].data[1] *= -1;
</script>

<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
    <div class="flex flex-col space-y-1.5 p-6">
      <p class="text-sm text-muted-foreground">Income and Expenses</p>
    </div>
    <div class="p-6">
      <Bar
        :data="chartData"
      />
    </div>
  </div>
</template>
