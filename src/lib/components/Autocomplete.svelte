<script lang="ts">
  import { onMount } from "svelte";

  export let autocompleteValues: Array<string> = [];
  export let name: string;

  let input = "";
  let filteredSuggestions: Array<string> = [];

  let isOpen = false;

  onMount(() => {
    filteredSuggestions = autocompleteValues;
  });

  function handleClickOutside(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest(".autocomplete-container")) {
      isOpen = false;
    }
  }

  function filterSuggestions() {
    filteredSuggestions = autocompleteValues.filter((suggestion) => {
      if (input === "") {
        return autocompleteValues;
      }

      suggestion.toLowerCase().includes(input.toLowerCase());
    });
  }

  function selectSuggestion(suggestion: string) {
    input = suggestion;
    isOpen = false;
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="relative autocomplete-container">
  {isOpen}
  <input
    on:click={() => (isOpen = !isOpen)}
    on:input={filterSuggestions}
    type="text"
    bind:value={input}
    placeholder="Type to search..."
    {name}
    class="block w-full p-2 border text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  />

  {#if filteredSuggestions.length > 0 && isOpen}
    <ul
      class="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1"
    >
      {#each filteredSuggestions as suggestion}
        <li
          class="p-2 cursor-pointer text-black hover:bg-indigo-500 hover:text-white"
          on:click={() => selectSuggestion(suggestion)}
        >
          {suggestion}
        </li>
      {/each}
    </ul>
  {/if}
</div>
