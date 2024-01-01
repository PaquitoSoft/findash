<script setup lang="ts">
  import { ref } from 'vue';
  import { useTransactionsStore } from '~/stores/transactions';

  const transactionsStore = useTransactionsStore();
  const dates = ref({
    start: transactionsStore.filters.startDate,
    end: transactionsStore.filters.endDate,
  });
  const showCalendar = ref(false);

  const toggleCalendar = () => {
    showCalendar.value = !showCalendar.value;
    console.log('Show Calendar: ', showCalendar.value);
  };

  const onDatesSelected = (params: { start: Date; end: Date }) => {
    console.log('OnDatesSelected:', { params, dates: dates.value });
    transactionsStore.updateFilters({
      startDate: params.start,
      endDate: params.end,
    });
    toggleCalendar();
  };
</script>

<template>
  <header class="relative flex items-center h-16 px-4 border-b md:px-6">
      <Button>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
        <span class="sr-only">Back</span>
      </Button>
      <h1 class="font-semibold text-lg md:text-xl ml-4">My Finance</h1>
      <div class="ml-auto flex space-x-4">
        <button
          type="button"
          role="combobox"
          aria-expanded="false"
          aria-autocomplete="none"
          class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          @click="toggleCalendar"
          >
          <span v-if="dates.start && dates.end" class="mr-4">
            <FormattedDate :date="dates.start" />
            <span class="mx-2">-</span>
            <FormattedDate :date="dates.end" />
          </span>
          <span v-else class="mr-4">Select Start and End Dates</span>

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 opacity-50" aria-hidden="true">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        <div
          class="absolute top-16 right-6 bg-color-white z-10"
          v-if="showCalendar"
        >
          <VDatePicker
            v-model.range="dates"
            @update:modelValue="onDatesSelected"
          />
        </div>
      </div>
    </header>
</template>
