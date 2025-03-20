<script lang="ts">
  import { excelFeatures, excelHoveredMast } from '$lib/state/features.svelte'
  import { stringToNumber } from '$lib/utils/stringToNumber'
  import { CircleLayer, FeatureState, GeoJSONSource, Popup } from 'svelte-maplibre-gl'

  let points = $derived({
    type: 'FeatureCollection',
    features: excelFeatures.data.map(
      (mast) =>
        ({
          type: 'Feature',
          properties: mast,
          id: stringToNumber(mast.kohde),
          geometry: {
            type: 'Point',
            coordinates: mast.coordinates
          }
        }) as GeoJSON.Feature
    )
  } as const)
</script>

<GeoJSONSource id="excel-points" data={points}>
  <CircleLayer
    id="excel-points"
    paint={{
      'circle-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#ff0000', '#39bf00'],
      'circle-opacity': 1,
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 7, 5, 22, 10],
      'circle-stroke-width': 1,
      'circle-stroke-color': '#ffffff'
    }}
    onmouseenter={({ features }) => {
      if (features?.length) {
        const properties = features[0].properties as { kohde: string; sitehunter: string }
        const coords = (features[0].geometry as GeoJSON.Point).coordinates
        excelHoveredMast.mast = {
          kohde: properties.kohde,
          sitehunter: properties.sitehunter,
          coordinates: [coords[0], coords[1]] as [number, number]
        }
      }
    }}
    onmouseleave={() => {
      excelHoveredMast.mast = null
    }}
  >
    {#if excelHoveredMast.mast}
      <FeatureState id={stringToNumber(excelHoveredMast.mast.kohde)} state={{ hover: true }} />
      <Popup lnglat={excelHoveredMast.mast.coordinates} closeButton={false} offset={[0, -20]}>
        <div class="p-2 space-y-2 bg-white/20">
          <div>
            <strong>Kohde:</strong>
            {excelHoveredMast.mast.kohde}
          </div>
          <div>
            <strong>Sitehunter:</strong>
            {excelHoveredMast.mast.sitehunter}
          </div>
          <div>
            <strong>Latitude:</strong>
            {excelHoveredMast.mast.coordinates[1]}
          </div>
          <div>
            <strong>Longitude:</strong>
            {excelHoveredMast.mast.coordinates[0]}
          </div>
        </div>
      </Popup>
    {/if}
  </CircleLayer>
</GeoJSONSource>
