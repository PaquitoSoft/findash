<script lang="ts" setup>
  import { computed } from 'vue';
  import { format as formatter } from 'date-fns';

  type TProps = {
    date?: Date;
    timestamp?: number;
    format?: string;
  };
  const props = defineProps<TProps>();

  // const formattedDate = formatter(props.date || props.timestamp || new Date(), props.format || 'dd/MM/yyyy');
  const formattedDate = computed(() => formatter(props.date || props.timestamp || new Date(), props.format || 'dd/MM/yyyy'));
</script>

<template>
  <span>{{ formattedDate }}</span>
</template>
