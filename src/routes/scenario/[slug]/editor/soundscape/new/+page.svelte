<script lang="ts">
  import Collapsable from "$lib/components/Collapsable.svelte";
  import File from "$lib/components/File.svelte";
  import { extractFolderAndFile } from "$lib/utils/fileExtract";
  import { UnfoldVertical } from "lucide-svelte";
  import { onMount } from "svelte";
  import type { PageServerData } from "./$types";

  interface GroupedAsset {
    file: string;
    path: string;
  }

  interface GroupedAssets {
    [folder: string]: GroupedAsset[];
  }

  let assets: string[] = [];
  let groupedAssets: GroupedAssets = {};

  export let data: PageServerData;

  onMount(() => {
    console.log(data);

    const categories = data.ambiences.map((ambience) => {
      return {
        category: ambience.category?.name,
        file: ambience.name,
        path: ambience.path,
      };
    });

    groupedAssets = categories.reduce<GroupedAssets>(
      (acc, { category, file, path }) => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({ file, path });
        return acc;
      },
      {}
    );

    console.log(groupedAssets);
  });
</script>

<div class="flex h-screen">
  <div class="w-64 bg-gray-200 p-4 shadow-md">
    <!-- Sidebar content goes here -->
    <div class="flex justify-between items-center pb-4">
      <h1 class="text-xl font-bold">Ambiences</h1>

      <UnfoldVertical size={18} />
    </div>

    <div class="flex flex-col">
      {#each Object.entries(groupedAssets) as [folder, files]}
        <Collapsable {folder}>
          {#each files as asset}
            <File {asset} />
          {/each}
        </Collapsable>
      {/each}
    </div>
  </div>
  <div class="flex-grow p-4">
    <p>Composition panel</p>
  </div>
</div>
