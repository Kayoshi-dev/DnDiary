<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
</script>

<h2>Ambience Manager</h2>

<div class="flex justify-center">
  <a
    href={`/scenario/${$page.params.slug}/editor/ambience/new`}
    class="inline-block bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
  >
    Drop an ambience
  </a>

  <a
    href={`/scenario/${$page.params.slug}/editor/soundscape/new`}
    class="inline-block bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
  >
    Create a new soundscape
  </a>
</div>
