<script lang="ts">
  import type { Snippet } from "svelte";
  import { fly } from "svelte/transition";

  type Props = {
    children: Snippet;
    isOpen: boolean;
    hasOverlay?: boolean;
  };

  let { children, isOpen = false, hasOverlay = false }: Props = $props();
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="flex flex-row min-h-screen">
    <!-- Black overlay only on the left -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    {#if hasOverlay}
      <div
        class="fixed inset-0 z-50 bg-black bg-opacity-50"
        style="width: calc(100% - 16rem); display: {isOpen ? 'block' : 'none'};"
        onclick={() => (isOpen = false)}
      ></div>
    {/if}

    <!-- Drawer on the right -->
    <div
      id="drawer-navigation"
      class="fixed top-0 right-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800"
      tabindex="-1"
      aria-labelledby="drawer-navigation-label"
      transition:fly={{ x: 300, duration: 300 }}
    >
      <h5
        id="drawer-navigation-label"
        class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        Menu
      </h5>
      <button
        class="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-900 dark:hover:text-white"
        onclick={() => (isOpen = false)}
      >
        Close
      </button>
      <div class="py-4">
        {@render children()}
      </div>
    </div>
  </div>
{/if}
