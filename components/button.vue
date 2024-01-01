<script lang="ts" setup>
  type TButtonProps = {
    isDisabled?: boolean;
    onClick?: (event: MouseEvent) => void;
  };
  withDefaults(defineProps<TButtonProps>(), {
    isDisabled: false,
    onClick: () => false,
  });
</script>

<template>
  <button
    class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:bg-slate-100 active:bg-slate-200 h-10 w-10"
    :disabled="isDisabled"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

