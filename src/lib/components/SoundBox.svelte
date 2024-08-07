<script lang="ts">
  export let icon = "";
  export let sound: string;
</script>

<button
  on:click={() => new Audio(sound).play()}
  class="relative cursor-pointer inline-block rounded-lg overflow-hidden w-20 h-20 before:absolute before:inset-0 before:border-4 before:border-yellow-500 before:rounded-lg after:absolute after:inset-0 after:border-2 after:border-black after:rounded-lg after:opacity-50 active:transform active:scale-95"
>
  <img class="w-full h-full object-cover" src={icon} alt="Spell Icon" />
</button>
