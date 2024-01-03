<script lang="ts" setup>
  import { ref } from 'vue';
  import { useNuxtApp } from 'nuxt/app';
  import { useTransactionsStore } from '~/stores/transactions';
  import type { TTransactionCategory } from '~/types';

  const { $trpcClient } = useNuxtApp();
  const transactionsStore = useTransactionsStore();
  const { data: allTransactionCategories } = await $trpcClient.getTransactionTypes.useQuery();

  const availableCategories = ref(allTransactionCategories.value?.types || []);
  const selectedCategoriesIds = ref<string[]>([]);

  const toggleCategory = (category: TTransactionCategory) => {
    const index = selectedCategoriesIds.value.findIndex(categoryId => categoryId === category.id);
    if (index !== -1) {
      selectedCategoriesIds.value.splice(index, 1);
    } else {
      selectedCategoriesIds.value.push(category.id);
    }
    transactionsStore.updateFilters({
      categoriesIds: selectedCategoriesIds.value
    });
  };
</script>

<template>
  <div>
    <h2 class="mb-2">Transaction types filter</h2>
    <div class="flex flex-wrap gap-2">
      <FinancialCategoryChip
        v-for="category in availableCategories"
        :key="category.id"
        :category="category"
        :is-disabled="!selectedCategoriesIds.includes(category.id)"
        :is-highlighted="selectedCategoriesIds.includes(category.id)"
        @click="toggleCategory(category)"
      />
    </div>
  </div>
</template>
