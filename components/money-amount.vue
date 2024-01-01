<script setup lang="ts">
  type TProps = {
    amount: number;
  }
  defineProps<TProps>();

  const formatter = Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  });
</script>

<template>
  <span>{{ formatter.format(amount) }}</span>
</template>
