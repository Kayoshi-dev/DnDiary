<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import SoundBox from "$lib/components/SoundBox.svelte";
  import { getRandomId, slugify } from "$lib/utils/string";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<h1>Scenario Listing</h1>

<SoundBox icon={"/icons/bag_coin.jpg"} sound={"/sounds/coin-drop.mp3"} />

<Button>Reprendre l'aventure</Button>

<div class="flex flex-col items-center gap-2">
  <a href={`/scenario/new`}>New scenario</a>
  <br />
  {#each data.scenarios as scenario (scenario.id)}
    <a
      href={`/scenario/${slugify(scenario.title)}`}
      class="text-white w-64 bg-red-800 border-2 border-gray-500 rounded-lg px-6 py-3 text-lg font-bold shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-900 transition-transform transform hover:scale-105 antialiased font-smoothing"
    >
      {scenario.title}
    </a>
  {/each}
</div>
