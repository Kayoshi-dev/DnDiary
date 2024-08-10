<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    const getAssets: Record<string, string> = import.meta.glob(
      "$static/ambience/**/*.mp3",
      {
        query: "?url",
        import: "default",
        eager: true,
      }
    );

    console.log(getAssets);
  });
</script>

<h2>Ambience Manager</h2>

<button
  class="bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
>
  Create a new soundscape
</button>
