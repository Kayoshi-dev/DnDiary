<script>
  import { goto } from "$app/navigation";
  import { Plus } from "lucide-svelte";

  const newSoundscape = () => {
    goto(window.location.pathname + "/new");
  };
</script>

<button on:click={newSoundscape}>
  <Plus />
</button>
