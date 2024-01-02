<script lang="ts" setup>
  import type { TTransactionCategory } from '~/types';

  const props = defineProps<{
    category: Omit<TTransactionCategory, 'tokens'>;
    onClick?: (category: Omit<TTransactionCategory, 'tokens'>) => void;
  }>();

  const categoryColorMapping: Record<string, string> = {
    payment: 'green',
    deposit: 'blue',
    withdrawal: 'pink',
    invoice: 'amber',
    default: 'grey',
  };

  const categoryColor = categoryColorMapping[props.category.code] || categoryColorMapping.default;
  const customClasses = {
    [`bg-${categoryColor}-100`]: true,
    [`text-${categoryColor}-800`]: true,
    'cursor-pointer': !!props.onClick,
  };
  const clickHandler = () => props.onClick && props.onClick(props.category);
</script>

<template>
  <!-- <span class="mr-2" :class="className">{{ $t('utilities.transactionTypes.' + category.code) }}</span> -->
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium"
    :class="customClasses"
    @click="clickHandler"
  >{{ category.code }}</span>
</template>
