<script lang="ts" setup>
  import { ModalsContainer, useModal } from 'vue-final-modal';
  import TransactionTypesModal from './transaction-types-modal.vue';
  import type { TFinancialRecord } from '~/types';

  type TProps = {
    records: TFinancialRecord[];
  };

  defineProps<TProps>();
  const emit = defineEmits<{
    transactionCategoriesUpdated: [updatedTransaction: TFinancialRecord]
  }>();

  const { open, close, patchOptions } = useModal({
    component: TransactionTypesModal,
    attrs: {
      // @ts-ignore
      transaction: {},
      onConfirm(updatedTransaction: TFinancialRecord) {
        emit('transactionCategoriesUpdated', updatedTransaction);
        close();
      },
    },
    // slots: {
    //   default: '<p>UseModal: The content of the modal</p>',
    // },
  });

  const openTransactionCategoriesModal = (transaction: TFinancialRecord) => {
    patchOptions({
      attrs: { transaction }
    });
    open();
  };
</script>

<template>
  <table class="w-full caption-bottom text-sm">
    <thead class="[&_tr]:border-b">
      <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Date</th>
        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Description</th>
        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Amount</th>
        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Types</th>
      </tr>
    </thead>
    <tbody class="[&_tr:last-child]:border-0">
      <tr
        v-for="record in records"
        :key="record.id"
        class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
      >
        <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">
          <FormattedDate :timestamp="record.timestamp" />
        </td>
        <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">{{ record.description }}</td>
        <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-bold"><MoneyAmount :amount="record.amount" /></td>
        <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">
          <div class="flex justify-between">
            <div class="flex flex-wrap gap-2">
              <FinancialCategoryChip
                v-for="category in record.categories"
                :key="category.id"
                :category="category"
              />
            </div>
            <div class>
              <Button
                shape="circle"
                size="small"
                @click="() => openTransactionCategoriesModal(record)"
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              </Button>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ModalsContainer />
</template>

