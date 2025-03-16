<script lang="ts">
  import type { Mast } from '$lib/api/masts'
  import { features, setPoints } from '$lib/state/features.svelte'
  import { CircleLayer, FeatureState, GeoJSONSource, Popup } from 'svelte-maplibre-gl'

  $effect(() => {
    setPoints()
  })

  let hoveredFeature = $state.raw<Mast | undefined>()
</script>

<GeoJSONSource id="points" data={features.points}>
  <CircleLayer
    id="points"
    paint={{
      'circle-radius': 5,
      // 'circle-color': '#007cbf',
      'circle-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#ff0000', '#007cbf']
    }}
    onmouseenter={({ features }) => {
      if (features?.length) {
        hoveredFeature = {
          id: features[0].id || '',
          properties: features[0].properties as Mast['properties'],
          geometry: features[0].geometry as Mast['geometry'],
          type: features[0].type
        }
      }
    }}
    onmouseleave={() => {
      hoveredFeature = undefined
    }}
  >
    {#if hoveredFeature}
      <FeatureState id={hoveredFeature.id} state={{ hover: true }} />
      <Popup lnglat={hoveredFeature.geometry.coordinates} closeButton={false}>
        <div class="p-2 space-y-2">
          {#each Object.entries(hoveredFeature.properties) as [key, value]}
            <div>
              <strong>{key}:</strong>
              {value}
            </div>
          {/each}
        </div>
      </Popup>
    {/if}
  </CircleLayer>
</GeoJSONSource>
