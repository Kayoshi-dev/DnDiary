import type { Ambience } from "@prisma/client";
import { writable } from "svelte/store";

export type AmbienceMixer = Ambience & {
  volume: number;
  loop: boolean;
};

const currentAmbiences = writable<AmbienceMixer[]>([]);

export { currentAmbiences };
