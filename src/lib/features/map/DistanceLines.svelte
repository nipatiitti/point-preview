<script lang="ts">
  import { closestPoints, excelClosestPoints, excelHoveredMast, hoveredMast, marker } from '$lib/state/features.svelte'
  import { stringToNumber } from '$lib/utils/stringToNumber'
  import { FeatureState, GeoJSONSource, LineLayer } from 'svelte-maplibre-gl'

  let from = $derived(marker.point)

  let lines = $derived({
    type: 'FeatureCollection',
    features: from
      ? closestPoints.points.map(
          (point) =>
            ({
              type: 'Feature',
              properties: point[0],
              id: point[0].id,
              geometry: {
                type: 'LineString',
                coordinates: [from, point[0].geometry.coordinates]
              }
            }) as GeoJSON.Feature
        )
      : []
  } as const)

  let excelLines = $derived({
    type: 'FeatureCollection',
    features: from
      ? excelClosestPoints.points.map(
          (point) =>
            ({
              type: 'Feature',
              properties: point[0],
              id: stringToNumber(point[0].kohde),
              geometry: {
                type: 'LineString',
                coordinates: [from, point[0].coordinates]
              }
            }) as GeoJSON.Feature
        )
      : []
  } as const)
</script>

<GeoJSONSource id="excel-lines" data={excelLines}>
  <LineLayer
    id="excel-lines"
    paint={{
      'line-width': 2,
      'line-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#ff0000', '#39bf00'],
      'line-opacity': 1
    }}
  />
  {#if excelHoveredMast.mast}
    <FeatureState id={stringToNumber(excelHoveredMast.mast.kohde)} state={{ hover: true }} />
  {/if}
</GeoJSONSource>

<GeoJSONSource id="lines" data={lines}>
  <LineLayer
    id="lines"
    paint={{
      'line-width': 2,
      'line-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#ff0000', '#007cbf'],
      'line-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.5]
    }}
  />
  {#if hoveredMast.mast}
    <FeatureState id={hoveredMast.mast.id} state={{ hover: true }} />
  {/if}
</GeoJSONSource>
