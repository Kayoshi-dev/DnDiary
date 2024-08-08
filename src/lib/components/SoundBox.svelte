<script lang="ts">
  import { onMount } from "svelte";

  export let icon = "";
  export let sound: string;

  let audioAssets: string[] = [];

  onMount(() => {
    const getAssets: Record<string, string> = import.meta.glob(
      "$static/sounds/coins/*.mp3",
      {
        query: "?url",
        import: "default",
        eager: true,
      }
    );

    audioAssets = Object.values(getAssets).map((asset) =>
      asset.replace("/static", "")
    );
  });

  const playRandomSound = () => {
    console.log(audioAssets);
    const randomSound =
      audioAssets[Math.floor(Math.random() * audioAssets.length)];

    new Audio(randomSound).play();
  };
</script>

<button
  on:click={playRandomSound}
  class="relative cursor-pointer inline-block rounded-lg overflow-hidden w-20 h-20 before:absolute before:inset-0 before:border-4 before:border-yellow-500 before:rounded-lg after:absolute after:inset-0 after:border-2 after:border-black after:rounded-lg after:opacity-50 active:transform active:scale-95"
>
  <img class="w-full h-full object-cover" src={icon} alt="Spell Icon" />
</button>
