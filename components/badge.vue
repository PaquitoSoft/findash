<script setup lang="ts">
  import { computed } from 'vue';

  type TProps = {
    type?: 'success' | 'warning' | 'error' | 'info' | 'default';
  };
  const props = withDefaults(defineProps<TProps>(), {
    type: 'default',
  });
  const colorMapper = {
    'success': 'bg-green-500',
    'warning': 'bg-amber-500',
    'error': 'bg-red-500',
    'info': 'bg-blue-500',
    'default': 'bg-gray-900',
  };
  const badgeClassColor = computed(() => {
    return colorMapper[props.type] || colorMapper.default;
  });
</script>

<template>
  <div
    class="inline-flex items-center rounded-md border border-gray-200 border-transparent px-2.5 py-0.5 text-xs font-bold text-gray-50 shadow transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/80"
    :class="badgeClassColor"
  >
   <slot></slot>
  </div>
</template>
