<script lang="ts" setup>
  // const selectedFilters = [];
</script>

<template>
  <div>
    <div class="mb-4">
      <button type="button" role="combobox" aria-controls="radix-:Rmurnnnla:" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" data-placeholder="" class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <span style="pointer-events:none">Filter by type</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 opacity-50" aria-hidden="true">
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>
    </div>
    <div class="flex items-center space-x-2 mb-4">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">Groceries</span>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">Transportation</span>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800">Health</span>
    </div>
  </div>
</template>
