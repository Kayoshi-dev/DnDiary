<script>
  import AudioPlayer from "$lib/components/AudioPlayer.svelte";
  import Button from "$lib/components/Button.svelte";
  import SoundBox from "$lib/components/SoundBox.svelte";
</script>

<h1>Scenario Listing</h1>

<SoundBox icon={"/icons/bag_coin.jpg"} sound={"/sounds/coin-drop.mp3"} />

<Button>Reprendre l'aventure</Button>

<AudioPlayer />
