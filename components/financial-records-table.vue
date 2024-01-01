<script lang="ts" setup>
  import type { TFinancialRecord } from '~/types';

  type TProps = {
    records: TFinancialRecord[];
  };

  defineProps<TProps>();
</script>

<template>
  <table class="w-full caption-bottom text-sm">
    <thead class="[&_tr]:border-b">
      <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Date</th>
        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Amount</th>
        <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Description</th>
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
        <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">{{ record.amount }}€</td>
        <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">{{ record.description }}</td>
        <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">
          <FinancialCategoryChip
            v-for="category in record.categories"
            :key="category.id"
            :category="category"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

