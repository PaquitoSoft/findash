<script setup lang="ts">
  import { Pie } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import type { TFinancialRecord } from '~/types';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

  type TChartCardProps = {
    title: string;
    transactions?: TFinancialRecord[];
  };
  type TChartDataProps = {
    labels: string[];
    datasets: { data: number[]; }[];
  };
  const props = defineProps<TChartCardProps>();

  const chartData = (props.transactions || []).reduce<TChartDataProps>((acc, transaction) => {
    transaction.categories.forEach(transactionType => {
      const index = acc.labels.indexOf(transactionType.code);
      if (index !== -1) {
        acc.datasets[0].data[index] += transaction.amount;
      } else {
        acc.labels.push(transactionType.code);
        acc.datasets[0].data.push(transaction.amount);
      }
    });

    return acc;
  }, {
    labels: [],
    datasets: [ { data: [] }]
  });

  // const chartData = {
  //   labels: ['invoice', 'deposit', 'withdrawal', 'payment'],
  //   datasets: [ { data: [40, 20, 12, 8] } ],
  // };
  const chartOptions = {
    responsive: false,
  };
</script>

<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
    <div class="flex flex-col space-y-1.5 p-6">
      <p class="text-sm text-muted-foreground">{{ title }}</p>
    </div>
    <div class="p-6">
      <Pie
        id="cara"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
  </div>
</template>
