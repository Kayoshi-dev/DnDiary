<script lang="ts">
  import { page } from "$app/stores";
  import { PlusCircle } from "lucide-svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
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
  {#each data.scenario.chapters as chapter}
    <h2
      class="text-xl md:text-2xl font-semibold tracking-wide text-gray-500 drop-shadow-sm italic"
    >
      {chapter.title}
    </h2>

    <div class="flex flex-wrap justify-center">
      <button>
        <PlusCircle size="24" />
      </button>
      <!-- {#each chapter.ambiences as ambience}
        <div class="m-4">
          <a
            href={`/scenario/${$page.params.slug}/editor/ambience/${ambience.id}`}
            class="bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            {ambience.title}
          </a>
        </div>
      {/each} -->
    </div>
  {/each}
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap");
  h2 {
    font-family: "Cinzel", serif;
  }
</style>
