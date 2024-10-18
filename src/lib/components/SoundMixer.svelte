<script lang="ts">
  import { currentAmbiences } from "$lib/store/SoundMixer";
  import { X } from "lucide-svelte";

  let audios: HTMLAudioElement[] = [];

  const setVolume = (
    index: number,
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) => {
    const target = event.target as HTMLInputElement;
    audios[index].volume = parseFloat(target.value);
    $currentAmbiences[index].volume = parseFloat(target.value);
  };
</script>

<div class="grid grid-cols-2 gap-4">
  {#each $currentAmbiences as ambience, index (ambience.id)}
    <div class="flex flex-col items-center">
      <audio
        src={ambience.path}
        autoplay
        class="hidden"
        bind:this={audios[index]}
      ></audio>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        class="mt-2 vertical-range bg-red-700"
        on:input={(e) => setVolume(index, e)}
      />
      <div class="mt-2 text-black font-bold">{ambience.name}</div>
      <!-- {#if audios.length > 0}
        
      {/if} -->

      <div>
        <span class="text-black">Volume: </span>
        <span class="text-black">{$currentAmbiences[index].volume}</span>
      </div>
      <div>
        <span class="text-black">Loop: </span>
        <input
          type="checkbox"
          class="text-black"
          bind:checked={$currentAmbiences[index].loop}
        />
      </div>
      <button
        on:click={() =>
          currentAmbiences.update((ambiences) =>
            ambiences.filter((a) => a !== ambience)
          )}
        class="flex-1 px-6 py-2 font-semibold select-none rounded-md text-white bg-red-700 hover:bg-red-800 shadow-lg transform hover:scale-105 transition-transform duration-300"
      >
        <X size={16} color="#ffffff" />
      </button>
    </div>
  {/each}
</div>

<style>
  .vertical-range {
    writing-mode: vertical-lr;
    direction: rtl;
    width: 8px;
    height: 150px;
    -webkit-appearance: none;
    appearance: none;
    background: #c53030; /* Slightly lighter reddish background color */
    border-radius: 8px;
    outline: none;
    transition: background 0.3s;
  }

  .vertical-range:hover {
    background: #f87171; /* Lighter reddish background color on hover */
  }

  .vertical-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #dc2626; /* Reddish thumb color */
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
    transition: background 0.3s;
  }

  .vertical-range::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #dc2626; /* Reddish thumb color */
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
    transition: background 0.3s;
  }

  .vertical-range::-webkit-slider-thumb:hover {
    background: #ef4444; /* Lighter reddish thumb color on hover */
  }

  .vertical-range::-moz-range-thumb:hover {
    background: #ef4444; /* Lighter reddish thumb color on hover */
  }
</style>
