<script lang="ts">
  import { page } from "$app/stores";
  import { PlusCircle } from "lucide-svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  // Need to fix typing here, and probably load the data in a clever way
  const playSoundscape = (x: any) => {
    const baba = x.soundscape.ambiences.map((a: any) => {
      return {
        loop: a.loop,
        volume: a.volume,
        path: a.ambience.path,
      };
    });

    baba.forEach((c: any) => {
      const audio = new Audio(c.path);
      audio.volume = c.volume;
      audio.loop = c.loop;

      audio.play();
    });
  };
</script>

<h2>Ambience Manager</h2>

<div class="flex justify-center">
  <a
    href=""
    class="inline-block bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
    >New chapter</a
  >

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

<div class="flex flex-col items-center">
  {#each data.chapters as chapter}
    <h2
      class="text-xl md:text-2xl font-semibold tracking-wide text-gray-500 drop-shadow-sm italic"
    >
      {chapter.title}
    </h2>

    <div class="flex flex-wrap justify-center">
      <button>
        <PlusCircle size="24" />
      </button>

      {#each chapter.soundscapes as soundscapeChapter}
        <!-- <span class="text-lg font-bold text-gray-700 italic drop-shadow-md">
          {soundscapeChapter.soundscape.name}
        </span> -->
        <button
          on:click={() => playSoundscape(soundscapeChapter)}
          class="w-20 h-20 rounded-full bg-red-700 border-2 border-red-700 shadow-lg transform hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        >
          <img
            src={soundscapeChapter.soundscape.iconPath}
            alt={soundscapeChapter.soundscape.name}
            class="w-full h-full rounded-full"
          />
        </button>
      {/each}
    </div>
  {/each}
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap");
  h2 {
    font-family: "Cinzel", serif;
  }
</style>
