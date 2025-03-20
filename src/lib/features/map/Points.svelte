<script lang="ts">
  import type { Mast } from '$lib/api/masts'
  import { features, hoveredMast, setPoints } from '$lib/state/features.svelte'
  import { CircleLayer, FeatureState, GeoJSONSource, Popup } from 'svelte-maplibre-gl'

  $effect(() => {
    setPoints()
  })
</script>

<GeoJSONSource id="points" data={features.points}>
  <CircleLayer
    id="points"
    paint={{
      'circle-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#ff0000', '#007cbf'],
      'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0.1, 10, 1],
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 7, 5, 22, 10]
    }}
    onmouseenter={({ features }) => {
      if (features?.length) {
        hoveredMast.mast = {
          id: features[0].id || '',
          properties: features[0].properties as Mast['properties'],
          geometry: features[0].geometry as Mast['geometry'],
          type: features[0].type
        }
      }
    }}
    onmouseleave={() => {
      hoveredMast.mast = null
    }}
  >
    {#if hoveredMast.mast}
      <FeatureState id={hoveredMast.mast.id} state={{ hover: true }} />
      <Popup
        lnglat={hoveredMast.mast.geometry.coordinates}
        closeButton={false}
        offset={[0, -20]}
        class="backdrop-opacity-20"
      >
        <div class="p-2 space-y-2 bg-white/20">
          {#each Object.entries(hoveredMast.mast.properties) as [key, value]}
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
