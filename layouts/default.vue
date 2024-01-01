<script setup lang="ts">
  import { ModalsContainer } from 'vue-final-modal';
</script>

<template>
  <div>
    <slot></slot>
    <ModalsContainer />
  </div>
</template>
