<script lang="ts">
  import { currentTrack } from "$lib/store/AudioPlayerStore";
  import { Play } from "lucide-svelte";
  import { onMount } from "svelte";

  export let asset: { file: string; path: string };

  onMount(() => {
    console.log(asset.file);
  });

  const setCurrentTrack = () => {
    console.log(asset.path);
    currentTrack.set(`${asset.path}`);
  };
</script>

<div class="flex items-center justify-between group">
  <h2 title={asset.file} class="pl-2 text-slate-700 truncate">
    {asset.file}
  </h2>
  <span class="hidden group-hover:inline" on:click={setCurrentTrack}>
    <Play size={18} color="#334155" />
  </span>
</div>
