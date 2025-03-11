<script>
  import { clickedMarker } from '$lib/state/clickableMarker.svelte'
  import { Marker } from 'svelte-maplibre-gl'
</script>

{#if clickedMarker.point}
  <Marker lnglat={clickedMarker.point} />
{/if}
