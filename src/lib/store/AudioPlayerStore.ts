import { writable } from "svelte/store";

const currentTrack = writable<string | null>(null);

export { currentTrack };
