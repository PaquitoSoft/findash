<script lang="ts" setup>
  import type { TTransactionCategory } from '~/types';

  const props = defineProps<{ category: TTransactionCategory }>();

  const categoryColorMapping: Record<string, string> = {
    payment: 'green',
    deposit: 'blue',
    withdrawal: 'pink',
    invoice: 'amber',
    default: 'grey',
  };

  const categoryColor = categoryColorMapping[props.category.code] || categoryColorMapping.default;
  const className = `inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-${categoryColor}-100 text-${categoryColor}-800`;
</script>

<template>
  <span class="mr-2" :class="className">{{ $t('utilities.transactionTypes.' + category.code) }}</span>
</template>
