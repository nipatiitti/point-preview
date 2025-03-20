<script lang="ts">
  import { PUBLIC_MAP_KEY } from '$env/static/public'
  import { marker } from '$lib/state/features.svelte'
  import { map } from '$lib/state/map.svelte'
  import { START_CENTER, START_ZOOM } from '$lib/utils/constants'
  import { toEPSG3067 } from '$lib/utils/transformations'
  import type { Snippet } from 'svelte'
  import { MapLibre } from 'svelte-maplibre-gl'

  type Props = {
    children?: Snippet
  }
  let { children }: Props = $props()

  let baseUrl = 'https://avoin-karttakuva.maanmittauslaitos.fi'
  let style = `${baseUrl}/vectortiles/stylejson/v21/backgroundmap.json?TileMatrixSet=WGS84_Pseudo-Mercator&api-key=${PUBLIC_MAP_KEY}`

  $effect(() => {
    if (map.instance) {
      const bbox = map.instance.getBounds().toArray()

      // BBOX in ESPG:3857
      console.log(bbox.map((coord) => toEPSG3067(coord)))

      // BBOX in WSG84
      console.log(bbox)
    }
  })
</script>

<MapLibre
  bind:map={map.instance}
  class="h-full w-full"
  {style}
  zoom={START_ZOOM}
  center={START_CENTER}
  attributionControl={false}
  onclick={(e) => {
    marker.point = [e.lngLat.lng, e.lngLat.lat]
  }}
>
  {@render children?.()}
</MapLibre>
