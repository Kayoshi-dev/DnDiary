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
