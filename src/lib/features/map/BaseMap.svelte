<script lang="ts">
  import { PUBLIC_MAP_KEY } from '$env/static/public'
  import { clickedMarker } from '$lib/state/clickableMarker.svelte'
  import { START_CENTER, START_ZOOM } from '$lib/utils/constants'
  import type { Map } from 'maplibre-gl'
  import type { Snippet } from 'svelte'
  import { MapLibre } from 'svelte-maplibre-gl'

  type Props = {
    children?: Snippet
  }
  let { children }: Props = $props()

  let baseUrl = 'https://avoin-karttakuva.maanmittauslaitos.fi'
  let style = `${baseUrl}/vectortiles/stylejson/v20/taustakartta.json?TileMatrixSet=WGS84_Pseudo-Mercator&api-key=${PUBLIC_MAP_KEY}`

  let map = $state<Map>()
</script>

<MapLibre
  bind:map
  class="h-full w-full"
  {style}
  zoom={START_ZOOM}
  center={START_CENTER}
  attributionControl={false}
  onclick={(e) => (clickedMarker.point = e.lngLat)}
>
  {@render children?.()}
</MapLibre>
