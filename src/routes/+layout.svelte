<script>
  import AudioPlayer from "$lib/components/AudioPlayer.svelte";
  import { currentTrack } from "$lib/store/AudioPlayerStore";
  import "../app.css";
</script>

<main class="min-h-screen">
  <slot />
</main>

<AudioPlayer />
