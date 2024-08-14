<script lang="ts">
  import { firstLetterUppercase } from "$lib/utils/string";
  import { FolderIcon } from "lucide-svelte";

  export let folder: string;

  $: uppercasedFolder = firstLetterUppercase(folder);

  let isCollapsed = true;

  function toggleCollapse() {
    isCollapsed = !isCollapsed;
  }
</script>

<div>
  <button class="inline-flex items-center gap-2" on:click={toggleCollapse}>
    <FolderIcon size={18} />
    <h2 class="font-bold">
      {uppercasedFolder}
    </h2>
  </button>

  {#if !isCollapsed}
    <slot />
  {/if}
</div>

<style>
</style>
