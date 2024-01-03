<script lang="ts" setup>
  import { computed } from 'vue';
  import type { TTransactionCategory } from '~/types';

  const props = defineProps<{
    category: Omit<TTransactionCategory, 'tokens'>;
    isDisabled?: boolean;
    isHighlighted?: boolean;
    onClick?: (category: Omit<TTransactionCategory, 'tokens'>) => void;
  }>();

  const customClasses = computed(() => ({
    'cursor-pointer': !!props.onClick,
    'opacity-60': props.isDisabled,
    'border': props.isHighlighted,
  }));
  const customStyles = computed(() => ({
    'color': props.category.color.replace('<alpha>', '1'),
    'borderColor': props.category.color.replace('<alpha>', '1'),
    'backgroundColor': props.category.color.replace('<alpha>', '0.1'),
  }));
  const clickHandler = () => props.onClick && props.onClick(props.category);
</script>

<template>
  <!-- <span class="mr-2" :class="className">{{ $t('utilities.transactionTypes.' + category.code) }}</span> -->
  <span
    class="px-2.5 py-1 rounded-full text-sm font-medium"
    :class="customClasses"
    :style="customStyles"
    @click="clickHandler"
  >{{ category.code }}</span>
</template>
