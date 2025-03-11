<script lang="ts">
  import { clickedMarker } from '$lib/state/clickableMarker.svelte'
  import { hoveringPoint } from '$lib/state/points.svelte'
  import { GeoJSONSource, LineLayer } from 'svelte-maplibre-gl'

  let from = $derived(clickedMarker.point)
  let to = $derived(hoveringPoint.point)
</script>

{#if from && to}
  <GeoJSONSource
    id="hover-line"
    data={{
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [from.lng, from.lat],
          [to.lng, to.lat]
        ]
      }
    }}
  >
    <LineLayer
      id="hover-line"
      paint={{
        'line-color': 'red',
        'line-width': 2
      }}
    />
  </GeoJSONSource>
{/if}
