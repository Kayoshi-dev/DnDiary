<script lang="ts">
  import { goto } from "$app/navigation";
  import { slugify } from "$lib/utils/string";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  const redirectToScenario = (scenarioTitle: string) => {
    goto(`/scenario/${slugify(scenarioTitle)}`, { replaceState: true });
  };
</script>

{#await data.scenario}
  <div class="min-h-screen flex flex-col items-center justify-center">
    <img
      src="/images/dragon.gif"
      alt="A dragon in the air"
      class="aspect-auto w-48"
    />

    Creating a new scenario...
  </div>
{:then { scenario }}
  {#if scenario.title}
    {redirectToScenario(scenario.title)}
  {/if}
{:catch error}
  <p>Error loading scenario: {error.message}</p>
{/await}
