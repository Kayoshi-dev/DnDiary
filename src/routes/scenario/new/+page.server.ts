import type { Scenario } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ fetch }) => {
  async function fetchScenario() {
    const res = await fetch("/api/scenarios/new");
    const { scenario }: { scenario: Scenario } = await res.json();

    return scenario;
  }

  // Create the promise
  const scenario = new Promise<{ scenario: Scenario }>((resolve, reject) => {
    fetchScenario()
      .then((scenario) => {
        resolve({ scenario });
      })
      .catch((error) => {
        reject(error);
      });
  });

  return { scenario };
};
