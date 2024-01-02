<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import { useNuxtApp } from 'nuxt/app';
  import { VueFinalModal } from 'vue-final-modal';
  import cloneDeep from 'lodash/cloneDeep';
  import sortBy from 'lodash/sortBy';
  import type { TFinancialRecord, TTransactionCategory } from '~/types';

  const props = defineProps<{
    transaction: TFinancialRecord;
  }>();

  const emit = defineEmits<{
    // (e: 'confirm'): void
    confirm: [updatedTransaction: TFinancialRecord]
  }>();

  const localTransaction = reactive(cloneDeep(props.transaction));
  const { $trpcClient } = useNuxtApp();
  const { data: allTransactionCategories } = await $trpcClient.getTransactionTypes.useQuery();

  const availableCategories = computed(() => {
    const transactionCategoriesCodes = localTransaction.categories.map(category => category.code);
    const filteredCategories = allTransactionCategories.value?.types
      .filter(category => !transactionCategoriesCodes.includes(category.code));
    return sortBy(filteredCategories, (category) => category.code);
  });

  const removeCategoryFromTransaction = (transaction: TFinancialRecord, category: Omit<TTransactionCategory, 'tokens'>) => {
    transaction.categories = localTransaction.categories.filter(_category => _category.code !== category.code);
  };
  const addCategoryToTransaction = (transaction: TFinancialRecord, category: Omit<TTransactionCategory, 'tokens'>) => {
    transaction.categories.push(category);
  };
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col w-1/3 mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
  >
    <header class="border-b">
      <h1 class="text-xl pb-2">Transaction categories</h1>
    </header>
    <main class="py-4">
      <div>
        <h2>Assigned categories</h2>
        <div>
          <FinancialCategoryChip
            v-for="category in localTransaction.categories"
            :key="category.id"
            :category="category"
            @click="removeCategoryFromTransaction(localTransaction, category)"
          />
        </div>
      </div>
      <div class="mt-4">
        <h2>Available categories</h2>
        <div>
          <FinancialCategoryChip
            v-for="category in availableCategories"
            :key="category.id"
            :category="category"
            @click="addCategoryToTransaction(localTransaction, category)"
          />
        </div>
      </div>
    </main>
    <footer class="border-t pt-2 text-right">
      <Button @click="emit('confirm', localTransaction)">Confirm</Button>
    </footer>
  </VueFinalModal>
</template>
