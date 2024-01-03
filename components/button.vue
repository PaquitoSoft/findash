<script lang="ts" setup>
  import { computed } from 'vue';
  type TButtonProps = {
    isDisabled?: boolean;
    shape?: 'square' | 'circle';
    size?: 'small' | 'medium' | 'large';
    onClick?: (event: MouseEvent) => void;
  };

  const props = withDefaults(defineProps<TButtonProps>(), {
    isDisabled: false,
    shape: 'square',
    size: 'medium',
    onClick: () => false,
  });

const customClasses = computed(() => ({
  'rounded-md': props.shape === 'square',
  'rounded-full': props.shape === 'circle',
  'px-2 py-1': props.size === 'small',
  'px-4 py-2': props.size === 'medium',
  'px-6 py-4': props.size === 'large',
}));
</script>

<template>
  <button
    class="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:bg-slate-100 active:bg-slate-200"
    :class="customClasses"
    :disabled="isDisabled"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

