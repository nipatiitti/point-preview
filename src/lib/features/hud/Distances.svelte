<script lang="ts">
  import type { Mast } from '$lib/api/masts'
  import { clickedMarker } from '$lib/state/clickableMarker.svelte'
  import { features } from '$lib/state/features.svelte'
  import { distance } from '$lib/utils/distance'

  let open = $derived(!!clickedMarker.point)
  let distances = $state<Map<Mast, number>>(new Map())
  let sorted = $derived(Array.from(distances.entries()).sort((a, b) => a[1] - b[1]))
  let loading = $state(false)

  $effect(() => {
    loading = true
    distances = new Map()

    const calculate = async () => {
      if (!clickedMarker.point) return
      const newDistances = new Map<Mast, number>()

      for (const point of features.points) {
        const d = distance(clickedMarker.point, point.geometry.coordinates)
        newDistances.set(point, d)
      }

      distances = newDistances
    }

    // This will run the calculations without blocking the UI
    new Promise<void>((resolve) => {
      calculate()
      resolve()
    }).then(() => {
      loading = false
    })
  })
</script>

{#if open}
  <div
    class="bg-blue-100 p-4 m-8 rounded shadow absolute top-0 right-0 overflow-y-auto z-10"
    style="max-height: calc(100vh - 4rem);"
  >
    {#if loading}
      <p>Loading...</p>
    {:else}
      <ul class="space-y-2">
        {#each sorted as [point, d] (point)}
          <li class="flex justify-between hover:bg-blue-200 p-2 rounded">
            <span class="font-bold"> {point.properties.mtk_id}</span>
            <span>{d.toFixed(2)} km</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
{/if}
