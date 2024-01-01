<script lang="ts" setup>
  const onDragEnter = (event: unknown) => {
    console.log('onDragEnter:', { event });
  };
  const onDragOver = (event: unknown) => {
    console.log('onDrop:', { event, items: event.dataTransfer.items, files: event.dataTransfer.files });
  };

  const onDrop = (event: Event) => {
    event.preventDefault();

    if (event.dataTransfer.files.length > 0) {
      console.log('Sending file to server:', event.dataTransfer.files[0]);
      const data = new FormData();
      data.append('transactions_file', event.dataTransfer.files[0]);
      fetch('/api/import', {
        method: 'POST',
        body: data,
      });
    }
    // console.log('onDrop:', { event, items: event.dataTransfer.items, files: event.dataTransfer.files });
    // const dropItem = event.dataTransfer.items[0];
    // const asString = dropItem.getAsString((contents: unknown) => {
    //   console.log({ contents });
    // });
    // console.log('drop-item:', { dropItem, getAsString: asString });
    // event.dataTransfer.items[0].getAsString((s) => {
    //   console.log('Drop file contents:', s);
    // });
  };

</script>

<template>
  <div class="flex flex-col w-full min-h-screen">
    <AppHeader />

    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div class="w-full h-full flex flex-col items-center justify-center p-4 md:p-6">
        <div class="w-full">
          <h1 class="text-2xl font-bold">File Upload</h1>

          <div class="flex items-center justify-center mt-8">
            <div
              @dragenter="onDragEnter"
              @drop="onDrop"
              class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded p-6 w-full h-64"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              <h2 class="mt-2 text-lg">Drag 'n' drop some files here, or click to select files</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
