<script lang="ts">
  import { Pause, Play, Square } from "lucide-svelte";

  let audioElement: HTMLAudioElement;
  let isPlaying = false;
  let currentTime = 0;
  let duration = 0;
  let volume = 1;

  const playOrPauseAudio = () => {
    if (audioElement.paused) {
      audioElement.play();
      isPlaying = true;
    } else {
      // Fade out the volume
      let fadeInterval = setInterval(() => {
        if (audioElement.volume > 0.1) {
          audioElement.volume -= 0.1;
        } else {
          clearInterval(fadeInterval);
          audioElement.pause();
          isPlaying = false;
        }
      }, 100);
    }
  };

  const updateTime = () => {
    currentTime = audioElement.currentTime;
    duration = audioElement.duration;
  };

  const seek = (event: Event) => {
    const target = event.target as HTMLInputElement;
    audioElement.currentTime = parseFloat(target.value);
  };
</script>

<div class="p-6 w-full fixed bottom-0">
  <audio bind:this={audioElement} id="audio" on:timeupdate={updateTime}>
    <source src="/ambience/mill_town.mp3" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>

  <div class="progress-bar-container">
    <div class="range">
      <input
        on:input={seek}
        type="range"
        min="0"
        max={duration}
        step=".1"
        value={currentTime}
        id="range2"
        class="range-input"
      />
    </div>
  </div>

  <div class="flex items-center justify-between">
    <div class="text-xs text-gray-700 mt-2">
      {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)
        .toString()
        .padStart(2, "0")} / {Math.floor(duration / 60)}:{Math.floor(
        duration % 60
      )
        .toString()
        .padStart(2, "0")}
    </div>

    <button
      on:click={playOrPauseAudio}
      class="button-style py-2 px-4 rounded-lg inline-flex items-center"
    >
      <span class="icon">
        {#if isPlaying}
          <Pause />
        {:else}
          <Play />
        {/if}
      </span>
    </button>

    <div class="flex items-center justify-end gap-2">
      <img src="/icons/volume.png" alt="Volume" class="w-6 h-6" />
      <input
        type="range"
        min="0"
        max="1"
        step=".01"
        bind:value={volume}
        on:input={() => (audioElement.volume = volume)}
        class="range-input volume-input"
      />
    </div>
  </div>
</div>

<style>
  .button-style {
    border: 2px solid #b58900;
    background-color: #fdf6e3;
    color: #b58900;
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  .button-style:hover {
    background-color: #b58900;
    color: #fdf6e3;
  }

  .progress-bar-container {
    position: relative;
    width: 100%;
    height: 30px;
    margin-top: 10px;
  }

  .range-input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    cursor: pointer;
    outline: none;
    border-radius: 15px;
    height: 6px;
    background: linear-gradient(90deg, #4f4f4f, #b0b0b0, #4f4f4f);
    box-shadow: 0 0 5px #000;
  }

  .range-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    background: linear-gradient(145deg, #6e6e6e, #a0a0a0);
    background-image: url("/icons/luth.png");
    background-size: cover;
    border: 0;
  }

  .range-input::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: linear-gradient(145deg, #6e6e6e, #a0a0a0);
    background-image: url("/icons/luth.png");
    background-size: cover;
    border: 0;
  }

  .range-input::-ms-thumb {
    width: 24px;
    height: 24px;
    background: linear-gradient(145deg, #6e6e6e, #a0a0a0);
    background-image: url("/icons/luth.png");
    background-size: cover;
    border: 0;
  }

  .volume-input {
    width: 60%;
  }
</style>
