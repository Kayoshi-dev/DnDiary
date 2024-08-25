<script lang="ts">
  import { enhance } from "$app/forms";
  import Autocomplete from "$lib/components/Autocomplete.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

new ambience

<form method="post" use:enhance enctype="multipart/form-data">
  <div class="group">
    <div
      class="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg"
    >
      <h2 class="text-2xl font-bold mb-4 text-center text-red-600">
        Upload your ambience theme
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Name your ambience"
        class="block w-full mb-4 p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
        required
      />

      <textarea
        name="description"
        placeholder="Describe your ambience"
        class="block w-full mb-4 p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500"
        required
      ></textarea>

      <Autocomplete
        name="category"
        autocompleteValues={data.categories.map((el) => el.name)}
      />

      <div
        class="border-2 border-dashed border-gray-600 rounded-md p-4 mb-4 bg-gray-700 hover:border-red-500 hover:bg-gray-600"
      >
        <input
          type="file"
          id="file"
          name="fileToUpload"
          accept="audio/*"
          class="sr-only"
          required
        />
        <label for="file" class="block text-center text-gray-400 cursor-pointer"
          >Drag and drop your file here, or click to select a file</label
        >
      </div>

      <button
        type="submit"
        class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Submit
      </button>
    </div>
  </div>
</form>
