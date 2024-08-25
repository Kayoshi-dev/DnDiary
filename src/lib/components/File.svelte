<script lang="ts">
  import { currentTrack } from "$lib/store/AudioPlayerStore";
  import { currentAmbiences, type AmbienceMixer } from "$lib/store/SoundMixer";
  import type { Ambience } from "@prisma/client";
  import { AudioLines, ListMusic, Play } from "lucide-svelte";
  import { onMount } from "svelte";

  export let ambience: AmbienceMixer;

  const setCurrentTrack = () => {
    currentTrack.set(`${ambience.path}`);
  };

  const addToList = () => {
    currentAmbiences.update((ambiences) => {
      return [...ambiences, ambience];
    });
  };
</script>

<div class="flex items-center justify-between group">
  <h2 title={ambience.name} class="pl-3 text-slate-700 truncate">
    <div class="flex gap-2">
      <AudioLines />
      {ambience.name}
    </div>
  </h2>
  <div class="flex">
    <span class="hidden group-hover:inline" on:click={setCurrentTrack}>
      <Play size={18} color="#334155" />
    </span>
    <span class="hidden group-hover:inline" on:click={addToList}>
      <ListMusic size={18} color="#334155" />
    </span>
  </div>
</div>
