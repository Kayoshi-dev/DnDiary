<script lang="ts">
  import Collapsable from "$lib/components/Collapsable.svelte";
  import File from "$lib/components/File.svelte";
  import { SearchIcon, Settings, UnfoldVertical } from "lucide-svelte";
  import { onMount } from "svelte";
  import type { PageServerData } from "./$types";
  import SoundMixer from "$lib/components/SoundMixer.svelte";
  import type { Ambience } from "@prisma/client";
  import { enhance } from "$app/forms";
  import { currentAmbiences, type AmbienceMixer } from "$lib/store/SoundMixer";

  interface GroupedAssets {
    [folder: string]: Ambience[];
  }

  let selectedFiles: FileList | null = null;
  let previewImage: string | null = null;

  let formattedAmbiences: string[];
  let localAmbiences: Ambience[] = [];

  // Subscribe to the store to get the object
  currentAmbiences.subscribe((value) => {
    formattedAmbiences = value.map((ambience) => ambience.id);
    localAmbiences = value;
  });

  let groupedAssets: GroupedAssets = {};

  export let data: PageServerData;

  onMount(() => {
    console.log(data);

    const categories = data.ambiences.map((ambience) => {
      return {
        category: ambience.category?.name,
        ambience,
      };
    });

    groupedAssets = categories.reduce<GroupedAssets>(
      (acc, { category, ambience }) => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(ambience);
        return acc;
      },
      {}
    );
  });

  $: console.log(previewImage);

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(typeof e.target?.result);
        previewImage = (e.target as FileReader).result as string;
      };
      reader.readAsDataURL(file);
    }
  }
</script>

<div class="flex h-screen">
  <!-- Left Sidebar -->
  <div class="w-64 bg-gray-200 p-4 shadow-md">
    <!-- Sidebar content goes here -->
    <div class="flex justify-between items-center pb-4">
      <h1 class="text-xl font-bold">Ambiences</h1>
      <UnfoldVertical size={18} />
    </div>

    <div class="flex flex-col">
      <div class="pb-2 relative">
        <input
          type="text"
          placeholder="Search..."
          class="w-full p-2 pl-10 rounded-md bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-700 h-8"
        />
        <SearchIcon class="absolute left-2 top-2 text-gray-500" size={16} />
      </div>

      {#each Object.entries(groupedAssets) as [folder, ambiences]}
        <Collapsable {folder}>
          {#each ambiences as ambience}
            <File {ambience} />
          {/each}
        </Collapsable>
      {/each}
    </div>
  </div>

  <!-- Main Content -->
  <div class="flex-grow p-4">
    <SoundMixer />
  </div>

  <!-- Right Sidebar -->
  <div class="w-64 bg-gray-200 p-4 shadow-md">
    <!-- Right sidebar content goes here -->
    <div class="flex justify-between items-center pb-4">
      <h1 class="text-xl font-bold">Settings</h1>
      <Settings size={18} />
    </div>

    <div class="flex flex-col">
      <form method="post" use:enhance enctype="multipart/form-data">
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
          >Name</label
        >
        <input
          type="text"
          id="name"
          name="name"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700 sm:text-sm"
        />

        <label
          for="description"
          class="block text-sm font-medium text-gray-700 mt-4 mb-1"
          >Description</label
        >
        <textarea
          id="description"
          name="description"
          rows="4"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700 sm:text-sm"
        ></textarea>

        <label
          for="chapter"
          class="block text-sm font-medium text-gray-700 mt-4 mb-1"
          >Chapter</label
        >
        <select
          id="chapter"
          name="chapter"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700 sm:text-sm"
        >
          {#if data.scenario && data.scenario.chapters}
            {#each data.scenario.chapters as chapter}
              <option value={chapter.id}>{chapter.title}</option>
            {/each}
          {/if}
        </select>

        <label
          for="ambiences"
          class="block text-sm font-medium text-gray-700 mt-4 mb-1"
          >Ambiences</label
        >
        <input
          type="text"
          id="ambiences"
          name="ambiences"
          value={formattedAmbiences}
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700 sm:text-sm bg-gray-100 cursor-not-allowed text-gray-500"
        />
        {formattedAmbiences}

        <label
          for="image"
          class="block text-sm font-medium text-gray-700 mt-4 mb-1">Image</label
        >
        <div
          class="relative mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-red-700 focus-within:border-red-700 sm:text-sm"
        >
          <div class="flex items-center justify-center h-36">
            {#if selectedFiles}
              <img
                src={previewImage}
                alt="Selected file"
                class="w-full h-full object-cover rounded-md"
              />
            {:else}
              <span class="text-gray-500">Select a file</span>
            {/if}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              bind:files={selectedFiles}
              on:change={handleFileChange}
            />
          </div>
        </div>

        <button
          class="bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</div>
