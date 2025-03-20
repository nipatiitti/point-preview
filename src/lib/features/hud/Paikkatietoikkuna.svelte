<script lang="ts">
  import type { Mast } from '$lib/api/masts'
  import { closestPoints, features, hoveredMast, marker } from '$lib/state/features.svelte'
  import { degToCompass, direction, distance } from '$lib/utils/distance'
  import { twMerge } from 'tailwind-merge'

  let open = $derived(!!marker.point)

  $effect(() => {
    if (!open) return

    const from = marker.point!
    const sorted = features.points.features
      .map((point) => [point, distance(from, point.geometry.coordinates)] as [Mast, number])
      .sort((a, b) => a[1] - b[1])

    closestPoints.points = sorted.slice(0, 5)
  })
</script>

{#if open}
  <div class="bg-sky-100 p-4 rounded shadow">
    <h2 class="text-lg font-bold">Paikkatietoikkunan <a href="/mast-data" class="underline">mastot</a></h2>
    <ul class="space-y-2">
      {#each closestPoints.points as [point, d], i (point)}
        {@const dir = direction(marker.point!, point.geometry.coordinates)}
        {@const bearing = degToCompass(dir)}
        {@const distance = d.toFixed(2) + ' km'}
        <li
          class={twMerge(
            'flex justify-between hover:bg-blue-200 p-2 rounded gap-2',
            d < 2 ? 'bg-yellow-200 hover:bg-yellow-300' : '',
            d < 1 ? 'bg-red-200 hover:bg-red-300' : ''
          )}
          onmouseenter={() => (hoveredMast.mast = point)}
          onmouseleave={() => (hoveredMast.mast = null)}
        >
          <span>
            <span>{i + 1}.</span>
            <span class="font-bold">{distance}</span>
          </span>
          <span>{bearing} {dir.toFixed(1).padStart(3, '0')}°</span>
        </li>
      {/each}
    </ul>
  </div>
{/if}
